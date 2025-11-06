'use client';

import { useState } from 'react';
import {
  calculateCalories,
  type CalorieInputs,
  type Gender,
  type ActivityLevel,
} from '@/lib/harris-benedict';

type UnitSystem = 'metric' | 'imperial';

export default function Calculator() {
  // Unit system toggle
  const [unitSystem, setUnitSystem] = useState<UnitSystem>('imperial');

  // Form state - tracking user inputs
  const [age, setAge] = useState<string>('');
  const [gender, setGender] = useState<Gender>('male');
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>('moderate');
  const [customMultiplier, setCustomMultiplier] = useState<string>('');

  // Metric inputs
  const [weightKg, setWeightKg] = useState<string>('');
  const [heightCm, setHeightCm] = useState<string>('');

  // Imperial inputs
  const [weightLbs, setWeightLbs] = useState<string>('');
  const [heightFeet, setHeightFeet] = useState<string>('');
  const [heightInches, setHeightInches] = useState<string>('');

  // Results state - BMR and TDEE
  const [results, setResults] = useState<{ bmr: number; tdee: number } | null>(null);

  // Deficit selection for weight loss (step 2)
  const [selectedDeficit, setSelectedDeficit] = useState<string>('none');
  const [deficitCalories, setDeficitCalories] = useState<number | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload on form submit

    // Convert imperial to metric if needed
    let weightInKg: number;
    let heightInCm: number;

    if (unitSystem === 'imperial') {
      // Convert pounds to kg: kg = lbs / 2.2046
      weightInKg = Number(weightLbs) / 2.2046;

      // Convert feet and inches to cm: 1 inch = 2.54 cm
      const totalInches = (Number(heightFeet) * 12) + Number(heightInches);
      heightInCm = totalInches * 2.54;
    } else {
      weightInKg = Number(weightKg);
      heightInCm = Number(heightCm);
    }

    // Calculate using the formula
    const inputs: CalorieInputs = {
      age: Number(age),
      weight: weightInKg,
      height: heightInCm,
      gender,
      activityLevel,
      customActivityMultiplier: activityLevel === 'custom' ? Number(customMultiplier) : undefined,
    };

    const calculated = calculateCalories(inputs);
    setResults(calculated);

    // Reset deficit calculations when recalculating TDEE
    setSelectedDeficit('none');
    setDeficitCalories(null);
  };

  const handleCalculateDeficit = () => {
    if (results && selectedDeficit !== 'none') {
      const deficit = Number(selectedDeficit) / 100;
      const target = Math.round(results.tdee * (1 - deficit));
      setDeficitCalories(target);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Daily Calorie Calculator
        </h1>
        <p className="text-gray-600 mb-8">
          Calculate your daily calorie needs using the Harris-Benedict equation
        </p>

        <form onSubmit={handleCalculate} className="space-y-6">
          {/* Unit System Toggle */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Unit System
            </label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="imperial"
                  checked={unitSystem === 'imperial'}
                  onChange={(e) => setUnitSystem(e.target.value as UnitSystem)}
                  className="mr-2"
                />
                Imperial (lbs, ft/in)
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="metric"
                  checked={unitSystem === 'metric'}
                  onChange={(e) => setUnitSystem(e.target.value as UnitSystem)}
                  className="mr-2"
                />
                Metric (kg, cm)
              </label>
            </div>
          </div>

          {/* Gender Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gender
            </label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="male"
                  checked={gender === 'male'}
                  onChange={(e) => setGender(e.target.value as Gender)}
                  className="mr-2"
                />
                Male
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="female"
                  checked={gender === 'female'}
                  onChange={(e) => setGender(e.target.value as Gender)}
                  className="mr-2"
                />
                Female
              </label>
            </div>
          </div>

          {/* Age Input */}
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">
              Age (years)
            </label>
            <input
              id="age"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
              min="1"
              max="120"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-500 text-gray-700"
              placeholder="25"
            />
          </div>

          {/* Weight Input - Changes based on unit system */}
          {unitSystem === 'imperial' ? (
            <div>
              <label htmlFor="weight-lbs" className="block text-sm font-medium text-gray-700 mb-2">
                Weight (lbs)
              </label>
              <input
                id="weight-lbs"
                type="number"
                value={weightLbs}
                onChange={(e) => setWeightLbs(e.target.value)}
                required
                min="1"
                step="0.1"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-500 text-gray-700"
                placeholder="154"
              />
            </div>
          ) : (
            <div>
              <label htmlFor="weight-kg" className="block text-sm font-medium text-gray-700 mb-2">
                Weight (kg)
              </label>
              <input
                id="weight-kg"
                type="number"
                value={weightKg}
                onChange={(e) => setWeightKg(e.target.value)}
                required
                min="1"
                step="0.1"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-500 text-gray-700"
                placeholder="70"
              />
            </div>
          )}

          {/* Height Input - Changes based on unit system */}
          {unitSystem === 'imperial' ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Height
              </label>
              <div className="flex gap-4">
                <div className="flex-1">
                  <input
                    id="height-feet"
                    type="number"
                    value={heightFeet}
                    onChange={(e) => setHeightFeet(e.target.value)}
                    required
                    min="0"
                    max="8"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-500 text-gray-700"
                    placeholder="5"
                  />
                  <label htmlFor="height-feet" className="block text-xs text-gray-500 mt-1">
                    Feet
                  </label>
                </div>
                <div className="flex-1">
                  <input
                    id="height-inches"
                    type="number"
                    value={heightInches}
                    onChange={(e) => setHeightInches(e.target.value)}
                    required
                    min="0"
                    max="11"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-500 text-gray-700"
                    placeholder="9"
                  />
                  <label htmlFor="height-inches" className="block text-xs text-gray-500 mt-1">
                    Inches
                  </label>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <label htmlFor="height-cm" className="block text-sm font-medium text-gray-700 mb-2">
                Height (cm)
              </label>
              <input
                id="height-cm"
                type="number"
                value={heightCm}
                onChange={(e) => setHeightCm(e.target.value)}
                required
                min="1"
                max="300"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-500 text-gray-700"
                placeholder="175"
              />
            </div>
          )}

          {/* Activity Level Selection */}
          <div>
            <label htmlFor="activity" className="block text-sm font-medium text-gray-700 mb-2">
              Activity Level
            </label>
            <select
              id="activity"
              value={activityLevel}
              onChange={(e) => setActivityLevel(e.target.value as ActivityLevel)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
            >
              <option value="sedentary">Sedentary (little or no exercise, desk job) - 1.2</option>
              <option value="light">Lightly Active (light exercise/sports 1-3 d/wk) - 1.375</option>
              <option value="moderate">Moderately Active (moderate exercise/sports 3-5 d/wk) - 1.55</option>
              <option value="very_active">Very Active (hard exercise/sports 6-7 d/wk) - 1.725</option>
              <option value="extremely_active">Extremely Active (hard daily exercise/sports & physical job or 2X day training) - 1.9</option>
              <option value="custom">Custom (enter your own multiplier)</option>
            </select>
          </div>

          {/* Custom Activity Multiplier Input - Only shows when custom is selected */}
          {activityLevel === 'custom' && (
            <div>
              <label htmlFor="custom-multiplier" className="block text-sm font-medium text-gray-700 mb-2">
                Custom Activity Multiplier
              </label>
              <input
                id="custom-multiplier"
                type="number"
                value={customMultiplier}
                onChange={(e) => setCustomMultiplier(e.target.value)}
                required
                min="1"
                max="3"
                step="0.01"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-500 text-gray-700"
                placeholder="1.5"
              />
              <p className="mt-1 text-xs text-gray-500">
                Enter a number between 1.0 and 3.0 (e.g., 1.5 for activity between Lightly and Moderately Active)
              </p>
            </div>
          )}

          {/* Submit Button - Step 1: Calculate TDEE */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-md font-medium hover:bg-blue-700 transition-colors"
          >
            Calculate TDEE
          </button>
        </form>

        {/* Step 1 Results: TDEE Display */}
        {results && (
          <div className="mt-8 space-y-6">
            <div className="p-6 bg-blue-50 rounded-lg border border-blue-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Step 1: Your Maintenance Calories</h2>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">BMR (Basal Metabolic Rate):</span>
                  <span className="text-2xl font-bold text-blue-600">{results.bmr} cal/day</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-700">TDEE (Total Daily Energy Expenditure):</span>
                  <span className="text-2xl font-bold text-blue-600">{results.tdee} cal/day</span>
                </div>
              </div>

              <p className="mt-4 text-sm text-gray-600">
                Your TDEE is the number of calories you burn per day including your activity level.
              </p>
            </div>

            {/* Step 2: Deficit Selection - Only shows after TDEE is calculated */}
            <div className="p-6 bg-white rounded-lg border-2 border-gray-300">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Step 2: Calculate Weight Loss Target (Optional)</h2>

              <div className="space-y-4">
                {/* Deficit Selection Dropdown */}
                <div>
                  <label htmlFor="deficit" className="block text-sm font-medium text-gray-700 mb-2">
                    Select Your Deficit
                  </label>
                  <select
                    id="deficit"
                    value={selectedDeficit}
                    onChange={(e) => setSelectedDeficit(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
                  >
                    <option value="none">Select a deficit...</option>
                    <option value="15">15% - Very Conservative Deficit</option>
                    <option value="20">20% - Conservative Deficit</option>
                    <option value="25">25% - Moderate Deficit</option>
                    <option value="30">30% - Aggressive Deficit</option>
                  </select>
                </div>

                {/* Deficit Description Box */}
                {selectedDeficit !== 'none' && (
                  <>
                    <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                      <p className="text-sm text-gray-700">
                        {selectedDeficit === '15' && 'Slow weight loss, but good for maximum muscle retention'}
                        {selectedDeficit === '20' && 'Slow to moderate weight loss; good for people with slightly high body fat and not in a big hurry to reach goal'}
                        {selectedDeficit === '25' && 'Moderate to quick rate of fat loss; good for people with high body fat who want brisk results but without high risk or discomfort'}
                        {selectedDeficit === '30' && 'Faster weight loss; good for very overweight people or anyone on a deadline. Hunger or minor risks possible, but still safe'}
                      </p>
                    </div>

                    {/* Calculate Deficit Button */}
                    <button
                      onClick={handleCalculateDeficit}
                      className="w-full bg-green-600 text-white py-3 px-6 rounded-md font-medium hover:bg-green-700 transition-colors"
                    >
                      Calculate Target Calories
                    </button>
                  </>
                )}
              </div>

              {/* Deficit Results */}
              {deficitCalories && (
                <div className="mt-6 p-6 bg-green-50 rounded-lg border border-green-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Your Weight Loss Target</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">
                      Target Calories ({selectedDeficit}% deficit):
                    </span>
                    <span className="text-3xl font-bold text-green-600">
                      {deficitCalories} cal/day
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-gray-600">
                    Eat this amount daily to achieve your weight loss goal. Your TDEE is {results.tdee} cal/day (what you burn),
                    and your target is {deficitCalories} cal/day (what you should eat).
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
