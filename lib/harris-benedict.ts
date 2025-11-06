/**
 * Harris-Benedict Equation for calculating Basal Metabolic Rate (BMR)
 * and Total Daily Energy Expenditure (TDEE)
 */

export type Gender = 'male' | 'female';

export type ActivityLevel =
  | 'sedentary'        // Little or no exercise, desk job
  | 'light'            // Light exercise 1-3 days/week
  | 'moderate'         // Moderate exercise 3-5 days/week
  | 'very_active'      // Hard exercise 6-7 days/week
  | 'extremely_active' // Hard daily exercise & physical job or 2X day training
  | 'custom';          // Custom value

// Activity multipliers for TDEE calculation
const ACTIVITY_MULTIPLIERS: Record<Exclude<ActivityLevel, 'custom'>, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  very_active: 1.725,
  extremely_active: 1.9,
};

export interface CalorieInputs {
  age: number;          // in years
  weight: number;       // in kg
  height: number;       // in cm
  gender: Gender;
  activityLevel: ActivityLevel;
  customActivityMultiplier?: number; // Optional custom multiplier
}

export interface CalorieResults {
  bmr: number;          // Basal Metabolic Rate (calories at rest)
  tdee: number;         // Total Daily Energy Expenditure (with activity)
}

/**
 * Calculate BMR using the original Harris-Benedict Equation
 *
 * For men: BMR = 66 + (13.7 × weight in kg) + (5 × height in cm) - (6.8 × age in years)
 * For women: BMR = 655 + (9.6 × weight in kg) + (1.8 × height in cm) - (4.7 × age in years)
 */
function calculateBMR(inputs: CalorieInputs): number {
  const { age, weight, height, gender } = inputs;

  if (gender === 'male') {
    return 66 + (13.7 * weight) + (5 * height) - (6.8 * age);
  } else {
    return 655 + (9.6 * weight) + (1.8 * height) - (4.7 * age);
  }
}

/**
 * Calculate TDEE by multiplying BMR by activity level
 */
function calculateTDEE(bmr: number, activityLevel: ActivityLevel, customMultiplier?: number): number {
  if (activityLevel === 'custom' && customMultiplier !== undefined) {
    return bmr * customMultiplier;
  }
  return bmr * ACTIVITY_MULTIPLIERS[activityLevel as Exclude<ActivityLevel, 'custom'>];
}

/**
 * Main function to calculate daily calorie requirements
 */
export function calculateCalories(inputs: CalorieInputs): CalorieResults {
  const bmr = calculateBMR(inputs);
  const tdee = calculateTDEE(bmr, inputs.activityLevel, inputs.customActivityMultiplier);

  return {
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
  };
}
