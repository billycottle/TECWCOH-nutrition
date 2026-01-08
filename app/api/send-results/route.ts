import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { generatePDFBuffer, type PDFData } from '@/lib/generate-pdf-simple';

const resend = new Resend(process.env.RESEND_API_KEY);

// Rate limiting map (in production, use Redis or similar)
const rateLimitMap = new Map<string, number[]>();

function checkRateLimit(email: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(email) || [];

  // Remove timestamps older than 1 hour
  const recentTimestamps = timestamps.filter(t => now - t < 3600000);

  // Allow max 3 requests per hour per email
  if (recentTimestamps.length >= 3) {
    return false;
  }

  recentTimestamps.push(now);
  rateLimitMap.set(email, recentTimestamps);
  return true;
}

export async function POST(request: NextRequest) {
  console.log('API route called: /api/send-results');
  try {
    const body = await request.json();
    console.log('Received body:', JSON.stringify(body).substring(0, 100));

    const {
      email,
      age,
      gender,
      weight,
      height,
      activityLevel,
      bmr,
      tdee,
      selectedDeficit,
      targetCalories,
    } = body;

    // Validation
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email address is required' },
        { status: 400 }
      );
    }

    if (!bmr || !tdee || !targetCalories || !selectedDeficit) {
      return NextResponse.json(
        { error: 'Missing required calculator data' },
        { status: 400 }
      );
    }

    // Check rate limit
    if (!checkRateLimit(email)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // Check if API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured');
      return NextResponse.json(
        { error: 'Email service is not configured. Please contact support.' },
        { status: 500 }
      );
    }

    // Prepare PDF data
    const pdfData: PDFData = {
      email,
      age: Number(age),
      gender,
      weight,
      height,
      activityLevel,
      bmr: Number(bmr),
      tdee: Number(tdee),
      selectedDeficit,
      targetCalories: Number(targetCalories),
      weeklyCalories: Number(targetCalories) * 7,
    };

    // Generate PDF
    const pdfBytes = await generatePDFBuffer(pdfData);

    // Convert Uint8Array to Buffer for Resend
    const pdfBuffer = Buffer.from(pdfBytes);

    // Get current date for filename
    const today = new Date().toISOString().split('T')[0];
    const filename = `calorie-plan-${today}.pdf`;

    // Send email via Resend
    const { data, error } = await resend.emails.send({
      from: 'Nutrition Tools <onboarding@resend.dev>', // Use your verified domain in production
      to: [email],
      subject: 'Your Calorie Calculator Results',
      html: `
        <p>Hey there,</p>

        <p>Here are your calorie calculator results:</p>

        <ul>
          <li>Your body burns <strong>${tdee.toLocaleString()} calories</strong> per day</li>
          <li>To lose weight, eat <strong>${targetCalories.toLocaleString()} calories</strong> per day</li>
          <li>That's a <strong>${selectedDeficit}%</strong> calorie reduction</li>
        </ul>

        <p>Your personalized plan is attached as a PDF. Print it, save it, or share it with your coach.</p>

        <p>Questions? Hit reply.</p>

        <p>Your Nutrition Coaches</p>

        <hr style="margin: 30px 0; border: none; border-top: 1px solid #ccc;" />

        <p style="font-size: 12px; color: #666;">
          <a href="https://yourwebsite.com/privacy" style="color: #666;">Privacy Policy</a>
        </p>
      `,
      attachments: [
        {
          filename,
          content: pdfBuffer,
        },
      ],
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email. Please try again.' },
        { status: 500 }
      );
    }

    // Store lead (call the store-lead endpoint)
    try {
      await fetch(`${request.nextUrl.origin}/api/store-lead`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pdfData),
      });
    } catch (error) {
      // Log but don't fail the request if lead storage fails
      console.error('Failed to store lead:', error);
    }

    return NextResponse.json({
      success: true,
      message: 'Email sent successfully',
      emailId: data?.id,
    });

  } catch (error) {
    console.error('Error in send-results:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
