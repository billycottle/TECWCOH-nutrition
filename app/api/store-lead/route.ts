import { NextRequest, NextResponse } from 'next/server';
import { createClient } from 'redis';

// Create Redis client lazily to avoid build-time errors
function getRedisClient() {
  return createClient({
    url: process.env.REDIS_URL,
  });
}

export async function POST(request: NextRequest) {
  let redis = null;
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

    // Check if Redis is configured
    if (!process.env.REDIS_URL) {
      console.warn('REDIS_URL is not configured. Lead will not be stored.');
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

    // Connect to Redis
    redis = getRedisClient();
    await redis.connect();

    // Store lead with unique key
    const leadKey = `lead:${email}:${Date.now()}`;
    await redis.set(leadKey, JSON.stringify(leadData));

    // Maintain a set of all lead emails for easy querying
    await redis.sAdd('leads:emails', email);

    // Increment total leads counter
    await redis.incr('leads:total');

    await redis.disconnect();

    return NextResponse.json({
      success: true,
      stored: true,
      message: 'Lead stored successfully',
    });

  } catch (error) {
    console.error('Error storing lead:', error);
    // Make sure to disconnect on error
    if (redis) {
      try {
        await redis.disconnect();
      } catch (e) {
        // Ignore disconnect errors
      }
    }
    // Don't fail the request if lead storage fails
    return NextResponse.json(
      { success: true, stored: false, error: 'Failed to store lead data' },
      { status: 200 }
    );
  }
}

// Optional: GET endpoint to retrieve leads (for admin use)
export async function GET(request: NextRequest) {
  let redis = null;
  try {
    // Check for admin authentication
    const authHeader = request.headers.get('authorization');
    if (!authHeader || authHeader !== `Bearer ${process.env.ADMIN_SECRET}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    if (!process.env.REDIS_URL) {
      return NextResponse.json(
        { error: 'Redis is not configured' },
        { status: 500 }
      );
    }

    // Connect to Redis
    redis = getRedisClient();
    await redis.connect();

    // Get total count
    const total = await redis.get('leads:total') || '0';

    // Get all unique emails
    const emails = await redis.sMembers('leads:emails') || [];

    await redis.disconnect();

    return NextResponse.json({
      success: true,
      total: parseInt(total, 10),
      uniqueEmails: emails.length,
      emails,
    });

  } catch (error) {
    console.error('Error retrieving leads:', error);
    if (redis) {
      try {
        await redis.disconnect();
      } catch (e) {
        // Ignore disconnect errors
      }
    }
    return NextResponse.json(
      { error: 'Failed to retrieve leads' },
      { status: 500 }
    );
  }
}
