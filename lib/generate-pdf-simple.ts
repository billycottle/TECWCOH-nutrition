// Simple PDF generation using pdf-lib (works in Next.js API routes)

import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export interface PDFData {
  email: string;
  age: number;
  gender: string;
  weight: string;
  height: string;
  activityLevel: string;
  bmr: number;
  tdee: number;
  selectedDeficit: string;
  targetCalories: number;
  weeklyCalories: number;
}

function getActivityDescription(level: string): string {
  const descriptions: Record<string, string> = {
    sedentary: 'Desk job, little exercise',
    light: 'Light exercise 1-3 days/week',
    moderate: 'Exercise 3-5 days/week',
    very_active: 'Exercise 6-7 days/week',
    extremely_active: 'Intense daily exercise plus physical job',
  };
  return descriptions[level] || level;
}

function getDeficitDescription(deficit: string): string {
  const descriptions: Record<string, string> = {
    '15': 'Light (15% reduction) - Slow burn, great for preserving muscle',
    '20': 'Moderate (20% reduction) - Balanced approach for sustainable results',
    '25': 'Significant (25% reduction) - Faster results with manageable hunger',
    '30': 'Aggressive (30% reduction) - Fastest results, requires discipline',
  };
  return descriptions[deficit] || `${deficit}% calorie reduction`;
}

export async function generatePDFBuffer(data: PDFData): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  let page = pdfDoc.addPage([595, 842]); // A4 size
  const { width, height } = page.getSize();

  // Load fonts
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const margin = 50;
  let y = height - margin;

  const deficitAmount = data.tdee - data.targetCalories;
  const weeklyDeficit = deficitAmount * 7;
  const expectedWeightLoss = Math.round((weeklyDeficit / 3500) * 10) / 10;

  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Header
  const titleText = 'YOUR PERSONALIZED CALORIE PLAN';
  const titleWidth = boldFont.widthOfTextAtSize(titleText, 20);
  page.drawText(titleText, {
    x: (width - titleWidth) / 2,
    y: y,
    size: 20,
    font: boldFont,
    color: rgb(0.22, 0.22, 0.22),
  });
  y -= 30;

  const dateText = `Generated on ${today}`;
  const dateWidth = regularFont.widthOfTextAtSize(dateText, 10);
  page.drawText(dateText, {
    x: (width - dateWidth) / 2,
    y: y,
    size: 10,
    font: regularFont,
    color: rgb(0.22, 0.22, 0.22),
  });
  y -= 40;

  // Profile Section
  page.drawText('YOUR PROFILE', {
    x: margin,
    y: y,
    size: 14,
    font: boldFont,
    color: rgb(0.22, 0.22, 0.22),
  });
  y -= 25;

  page.drawText(`Age: ${data.age} years`, { x: margin, y: y, size: 11, font: regularFont, color: rgb(0.22, 0.22, 0.22) });
  y -= 18;
  page.drawText(`Gender: ${data.gender === 'male' ? 'Male' : 'Female'}`, { x: margin, y: y, size: 11, font: regularFont, color: rgb(0.22, 0.22, 0.22) });
  y -= 18;
  page.drawText(`Weight: ${data.weight}`, { x: margin, y: y, size: 11, font: regularFont, color: rgb(0.22, 0.22, 0.22) });
  y -= 18;
  page.drawText(`Height: ${data.height}`, { x: margin, y: y, size: 11, font: regularFont, color: rgb(0.22, 0.22, 0.22) });
  y -= 18;
  page.drawText(`Activity Level: ${getActivityDescription(data.activityLevel)}`, { x: margin, y: y, size: 11, font: regularFont, color: rgb(0.22, 0.22, 0.22) });
  y -= 35;

  // Daily Calorie Burn
  page.drawText('YOUR DAILY CALORIE BURN', {
    x: margin,
    y: y,
    size: 14,
    font: boldFont,
    color: rgb(0.22, 0.22, 0.22),
  });
  y -= 25;

  page.drawText(`Resting Calories (BMR): ${data.bmr.toLocaleString()} cal/day`, { x: margin, y: y, size: 11, font: regularFont, color: rgb(0.22, 0.22, 0.22) });
  y -= 18;
  page.drawText(`Total Daily Calories Burned (TDEE): ${data.tdee.toLocaleString()} cal/day`, { x: margin, y: y, size: 11, font: regularFont, color: rgb(0.22, 0.22, 0.22) });
  y -= 25;

  // Description text
  const desc1 = 'This is how many calories your body burns each day, including your exercise and';
  page.drawText(desc1, { x: margin, y: y, size: 9, font: regularFont, color: rgb(0.22, 0.22, 0.22) });
  y -= 13;
  const desc2 = 'activity. Rounded to the nearest 50 for simplicity.';
  page.drawText(desc2, { x: margin, y: y, size: 9, font: regularFont, color: rgb(0.22, 0.22, 0.22) });
  y -= 35;

  // Calorie Target
  page.drawText('YOUR CALORIE TARGET FOR WEIGHT LOSS', {
    x: margin,
    y: y,
    size: 14,
    font: boldFont,
    color: rgb(0.22, 0.22, 0.22),
  });
  y -= 25;

  // Highlighted box
  const boxHeight = 70;
  page.drawRectangle({
    x: margin,
    y: y - boxHeight + 10,
    width: width - 2 * margin,
    height: boxHeight,
    color: rgb(0.96, 0.94, 0.92),
    borderColor: rgb(0.22, 0.22, 0.22),
    borderWidth: 1,
  });

  page.drawText(`Daily Calorie Target: ${data.targetCalories.toLocaleString()} cal/day`, { x: margin + 10, y: y, size: 11, font: boldFont, color: rgb(0.22, 0.22, 0.22) });
  y -= 18;
  page.drawText(`Calorie Deficit: ${getDeficitDescription(data.selectedDeficit)}`, { x: margin + 10, y: y, size: 10, font: regularFont, color: rgb(0.22, 0.22, 0.22) });
  y -= 18;
  page.drawText(`Expected Weight Loss: ${expectedWeightLoss} lbs/week`, { x: margin + 10, y: y, size: 10, font: regularFont, color: rgb(0.22, 0.22, 0.22) });
  y -= 30;

  const targetDesc1 = `Eat ${data.targetCalories.toLocaleString()} calories per day to create a calorie deficit and lose weight. You burn`;
  page.drawText(targetDesc1, { x: margin, y: y, size: 9, font: regularFont, color: rgb(0.22, 0.22, 0.22) });
  y -= 13;
  const targetDesc2 = `${data.tdee.toLocaleString()} calories per day, so eating ${data.targetCalories.toLocaleString()} creates a ${data.selectedDeficit}% deficit.`;
  page.drawText(targetDesc2, { x: margin, y: y, size: 9, font: regularFont, color: rgb(0.22, 0.22, 0.22) });
  y -= 35;

  // Weekly Plan
  page.drawText('MAKE IT WORK FOR YOUR LIFE', {
    x: margin,
    y: y,
    size: 14,
    font: boldFont,
    color: rgb(0.22, 0.22, 0.22),
  });
  y -= 25;

  const plan1 = 'Think about your week as a whole. You can eat the same amount every day, or eat a bit';
  page.drawText(plan1, { x: margin, y: y, size: 9, font: regularFont, color: rgb(0.22, 0.22, 0.22) });
  y -= 13;
  const plan2 = 'less on weekdays so you can enjoy more on weekends. Both approaches work - pick what';
  page.drawText(plan2, { x: margin, y: y, size: 9, font: regularFont, color: rgb(0.22, 0.22, 0.22) });
  y -= 13;
  const plan3 = 'fits your lifestyle.';
  page.drawText(plan3, { x: margin, y: y, size: 9, font: regularFont, color: rgb(0.22, 0.22, 0.22) });
  y -= 30;

  // Option 1 Table
  page.drawText('Option 1: Same Amount Every Day', {
    x: margin,
    y: y,
    size: 12,
    font: boldFont,
    color: rgb(0.22, 0.22, 0.22),
  });
  y -= 25;

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  // Table header
  page.drawText('Day', { x: margin, y: y, size: 10, font: boldFont, color: rgb(0.22, 0.22, 0.22) });
  page.drawText('Calories', { x: width - margin - 80, y: y, size: 10, font: boldFont, color: rgb(0.22, 0.22, 0.22) });
  y -= 20;

  // Table rows
  days.forEach(day => {
    page.drawText(day, { x: margin, y: y, size: 9, font: regularFont, color: rgb(0.22, 0.22, 0.22) });
    page.drawText(data.targetCalories.toLocaleString(), { x: width - margin - 80, y: y, size: 9, font: regularFont, color: rgb(0.22, 0.22, 0.22) });
    y -= 15;
  });

  // Total
  page.drawText('Weekly Total', { x: margin, y: y, size: 10, font: boldFont, color: rgb(0.22, 0.22, 0.22) });
  page.drawText(data.weeklyCalories.toLocaleString(), { x: width - margin - 80, y: y, size: 10, font: boldFont, color: rgb(0.22, 0.22, 0.22) });
  y -= 35;

  // Check if we need a new page
  if (y < 250) {
    page = pdfDoc.addPage([595, 842]);
    y = height - margin;
  }

  // Option 2 Table
  page.drawText('Option 2: Flexible Plan (Less Weekdays, More Weekends)', {
    x: margin,
    y: y,
    size: 12,
    font: boldFont,
    color: rgb(0.22, 0.22, 0.22),
  });
  y -= 25;

  const flexPlan = [
    { day: 'Monday', cal: data.targetCalories - 160 },
    { day: 'Tuesday', cal: data.targetCalories - 160 },
    { day: 'Wednesday', cal: data.targetCalories - 160 },
    { day: 'Thursday', cal: data.targetCalories - 160 },
    { day: 'Friday', cal: data.targetCalories + 400 },
    { day: 'Saturday', cal: data.targetCalories + 400 },
    { day: 'Sunday', cal: data.targetCalories - 160 },
  ];

  // Table header
  page.drawText('Day', { x: margin, y: y, size: 10, font: boldFont, color: rgb(0.22, 0.22, 0.22) });
  page.drawText('Calories', { x: width - margin - 80, y: y, size: 10, font: boldFont, color: rgb(0.22, 0.22, 0.22) });
  y -= 20;

  // Table rows
  flexPlan.forEach(({ day, cal }) => {
    page.drawText(day, { x: margin, y: y, size: 9, font: regularFont, color: rgb(0.22, 0.22, 0.22) });
    page.drawText(cal.toLocaleString(), { x: width - margin - 80, y: y, size: 9, font: regularFont, color: rgb(0.22, 0.22, 0.22) });
    y -= 15;
  });

  // Total
  page.drawText('Weekly Total', { x: margin, y: y, size: 10, font: boldFont, color: rgb(0.22, 0.22, 0.22) });
  page.drawText(data.weeklyCalories.toLocaleString(), { x: width - margin - 80, y: y, size: 10, font: boldFont, color: rgb(0.22, 0.22, 0.22) });

  // Footer on the last page
  const footerText = 'Generated by Nutrition Tools • Questions? Contact your coach • NutritionTools.com';
  const footerWidth = regularFont.widthOfTextAtSize(footerText, 8);
  page.drawText(footerText, {
    x: (width - footerWidth) / 2,
    y: 30,
    size: 8,
    font: regularFont,
    color: rgb(0.22, 0.22, 0.22),
  });

  return await pdfDoc.save();
}
