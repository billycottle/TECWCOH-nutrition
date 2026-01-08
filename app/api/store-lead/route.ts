import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

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
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Check if KV is configured
    if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
      console.warn('Vercel KV is not configured. Lead will not be stored.');
      // Don't fail the request - just log and return success
      return NextResponse.json({ success: true, stored: false });
    }

    const leadData = {
      email,
      timestamp: new Date().toISOString(),
      calculatorData: {
        age: Number(age),
        gender,
        weight,
        height,
        activityLevel,
        bmr: Number(bmr),
        tdee: Number(tdee),
        selectedDeficit,
        targetCalories: Number(targetCalories),
      },
    };

    // Store in Vercel KV with email as key and timestamp
    // Use a hash to store all leads with unique keys
    const leadKey = `lead:${email}:${Date.now()}`;
    await kv.set(leadKey, leadData);

    // Also maintain a set of all lead emails for easy querying
    await kv.sadd('leads:emails', email);

    // Increment total leads counter
    await kv.incr('leads:total');

    return NextResponse.json({
      success: true,
      stored: true,
      message: 'Lead stored successfully',
    });

  } catch (error) {
    console.error('Error storing lead:', error);
    // Don't fail the request if lead storage fails
    // The email was already sent successfully
    return NextResponse.json(
      { success: true, stored: false, error: 'Failed to store lead data' },
      { status: 200 }
    );
  }
}

// Optional: GET endpoint to retrieve leads (for admin use)
export async function GET(request: NextRequest) {
  try {
    // Check for admin authentication (you should add proper auth here)
    const authHeader = request.headers.get('authorization');
    if (!authHeader || authHeader !== `Bearer ${process.env.ADMIN_SECRET}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
      return NextResponse.json(
        { error: 'Vercel KV is not configured' },
        { status: 500 }
      );
    }

    // Get total count
    const total = await kv.get('leads:total') || 0;

    // Get all unique emails
    const emails = await kv.smembers('leads:emails') || [];

    return NextResponse.json({
      success: true,
      total,
      uniqueEmails: emails.length,
      emails,
    });

  } catch (error) {
    console.error('Error retrieving leads:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve leads' },
      { status: 500 }
    );
  }
}
