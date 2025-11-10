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
    e.preventDefault();

    let weightInKg: number;
    let heightInCm: number;

    if (unitSystem === 'imperial') {
      weightInKg = Number(weightLbs) / 2.2046;
      const totalInches = (Number(heightFeet) * 12) + Number(heightInches);
      heightInCm = totalInches * 2.54;
    } else {
      weightInKg = Number(weightKg);
      heightInCm = Number(heightCm);
    }

    const inputs: CalorieInputs = {
      age: Number(age),
      weight: weightInKg,
      height: heightInCm,
      gender,
      activityLevel,
      customActivityMultiplier: activityLevel === 'custom' ? Number(customMultiplier) : undefined,
    };

    const calculated = calculateCalories(inputs);
    // Round BMR and TDEE to nearest 50 for simplicity
    const roundedResults = {
      bmr: Math.round(calculated.bmr / 50) * 50,
      tdee: Math.round(calculated.tdee / 50) * 50,
    };
    setResults(roundedResults);

    setSelectedDeficit('none');
    setDeficitCalories(null);
  };

  const handleCalculateDeficit = () => {
    if (results && selectedDeficit !== 'none') {
      const deficit = Number(selectedDeficit) / 100;
      const target = results.tdee * (1 - deficit);
      // Round to nearest 50 for simplicity
      const roundedTarget = Math.round(target / 50) * 50;
      setDeficitCalories(roundedTarget);
    }
  };

  // Inline styles following updated STYLE_GUIDE.md
  const styles = {
    container: {
      maxWidth: '680px',
      margin: '0 auto',
      background: 'white',
      borderRadius: '0px', // Flat design - zero border radius
      border: '1px solid #383838',
      padding: '48px 32px',
    },
    header: {
      marginBottom: '32px',
      borderBottom: '1px solid #383838',
      paddingBottom: '24px',
    },
    h1: {
      fontFamily: "'Aeonik Mono', sans-serif",
      fontSize: '30px',
      fontWeight: 400,
      color: '#383838',
      marginBottom: '8px',
      lineHeight: '140%',
      textTransform: 'uppercase' as const,
    },
    subtitle: {
      fontFamily: "'Inter', Arial, sans-serif",
      fontSize: '16px',
      fontWeight: 300,
      color: '#383838',
      lineHeight: '140%',
      letterSpacing: '0.02em',
    },
    form: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '24px',
    },
    fieldContainer: {
      display: 'block',
    },
    label: {
      display: 'block',
      fontFamily: "'Inter', Arial, sans-serif",
      fontSize: '14px',
      fontWeight: 400,
      color: '#383838',
      marginBottom: '8px',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.02em',
    },
    radioGroup: {
      display: 'flex',
      gap: '24px',
    },
    radioLabel: {
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
      fontFamily: "'Inter', Arial, sans-serif",
      fontSize: '14px',
      fontWeight: 300,
      color: '#383838',
    },
    radio: {
      width: '18px',
      height: '18px',
      marginRight: '8px',
      cursor: 'pointer',
      accentColor: '#2BA5FF',
    },
    radioText: {
      fontFamily: "'Inter', Arial, sans-serif",
      fontSize: '14px',
      fontWeight: 300,
      color: '#383838',
      letterSpacing: '0.02em',
    },
    input: {
      width: '100%',
      padding: '12px 16px',
      border: '1px solid #383838',
      borderRadius: '0px', // Flat design
      fontSize: '14px',
      fontFamily: "'Aeonik Mono', sans-serif",
      color: '#383838',
      background: 'white',
      transition: 'border-color 0.15s ease',
      outline: 'none',
      boxSizing: 'border-box' as const,
    },
    heightRow: {
      display: 'flex',
      gap: '16px',
    },
    heightField: {
      flex: 1,
    },
    helperText: {
      display: 'block',
      fontFamily: "'Inter', Arial, sans-serif",
      fontSize: '12px',
      fontWeight: 300,
      color: '#383838',
      marginTop: '4px',
      letterSpacing: '0.02em',
    },
    select: {
      width: '100%',
      padding: '12px 16px',
      border: '1px solid #383838',
      borderRadius: '0px', // Flat design
      fontSize: '14px',
      fontFamily: "'Aeonik Mono', sans-serif",
      color: '#383838',
      background: 'white',
      cursor: 'pointer',
      transition: 'border-color 0.15s ease',
      outline: 'none',
      boxSizing: 'border-box' as const,
    },
    button: {
      width: '100%',
      padding: '14px 24px',
      background: '#383838',
      color: 'white',
      border: 'none',
      borderRadius: '0px', // Flat design
      fontSize: '16px',
      fontFamily: "'Aeonik Mono', sans-serif",
      fontWeight: 400,
      textTransform: 'uppercase' as const,
      cursor: 'pointer',
      transition: 'all 0.15s ease',
      marginTop: '16px',
    },
    resultsSection: {
      marginTop: '48px',
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '32px',
    },
    resultBox: {
      padding: '32px',
      background: 'white',
      border: '2px solid #383838',
      borderRadius: '0px', // Flat design
    },
    h2: {
      fontFamily: "'Aeonik Mono', sans-serif",
      fontSize: '24px',
      fontWeight: 400,
      color: '#383838',
      marginBottom: '24px',
      textTransform: 'uppercase' as const,
      lineHeight: '140%',
    },
    resultRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '16px',
      paddingBottom: '16px',
      borderBottom: '1px solid #383838',
    },
    resultLabel: {
      fontFamily: "'Inter', Arial, sans-serif",
      fontSize: '14px',
      fontWeight: 400,
      color: '#383838',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.02em',
    },
    resultValue: {
      fontFamily: "'Aeonik Mono', sans-serif",
      fontSize: '24px',
      fontWeight: 400,
      color: '#383838',
    },
    resultDescription: {
      marginTop: '16px',
      fontFamily: "'Inter', Arial, sans-serif",
      fontSize: '14px',
      fontWeight: 300,
      color: '#383838',
      lineHeight: '140%',
      letterSpacing: '0.02em',
    },
    deficitBox: {
      padding: '32px',
      background: 'white',
      border: '2px solid #383838',
      borderRadius: '0px', // Flat design
    },
    deficitDescription: {
      padding: '16px',
      background: '#F4EFEA',
      border: '1px solid #383838',
      borderRadius: '0px',
      marginTop: '16px',
      marginBottom: '16px',
    },
    deficitButton: {
      width: '100%',
      padding: '14px 24px',
      background: '#383838',
      color: 'white',
      border: 'none',
      borderRadius: '0px',
      fontSize: '16px',
      fontFamily: "'Aeonik Mono', sans-serif",
      fontWeight: 400,
      textTransform: 'uppercase' as const,
      cursor: 'pointer',
      transition: 'all 0.15s ease',
    },
    deficitResultBox: {
      marginTop: '24px',
      padding: '32px',
      background: 'white',
      border: '2px solid #383838',
      borderRadius: '0px',
    },
    h3: {
      fontFamily: "'Aeonik Mono', sans-serif",
      fontSize: '18px',
      fontWeight: 400,
      color: '#383838',
      marginBottom: '16px',
      textTransform: 'uppercase' as const,
      lineHeight: '140%',
    },
    targetValue: {
      fontFamily: "'Aeonik Mono', sans-serif",
      fontSize: '28px',
      fontWeight: 400,
      color: '#383838',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.h1}>Daily Calorie Calculator</h1>
        <p style={styles.subtitle}>Calculate your daily calorie needs using the Harris-Benedict equation</p>
      </div>

      <form onSubmit={handleCalculate} style={styles.form}>
        {/* Unit System Toggle */}
        <div style={styles.fieldContainer}>
          <label style={styles.label}>Unit System</label>
          <div style={styles.radioGroup}>
            <label style={styles.radioLabel}>
              <input
                type="radio"
                name="units"
                value="imperial"
                checked={unitSystem === 'imperial'}
                onChange={(e) => setUnitSystem(e.target.value as UnitSystem)}
                style={styles.radio}
              />
              <span style={styles.radioText}>Imperial (lbs, ft/in)</span>
            </label>
            <label style={styles.radioLabel}>
              <input
                type="radio"
                name="units"
                value="metric"
                checked={unitSystem === 'metric'}
                onChange={(e) => setUnitSystem(e.target.value as UnitSystem)}
                style={styles.radio}
              />
              <span style={styles.radioText}>Metric (kg, cm)</span>
            </label>
          </div>
        </div>

        {/* Gender Selection */}
        <div style={styles.fieldContainer}>
          <label style={styles.label}>Gender</label>
          <div style={styles.radioGroup}>
            <label style={styles.radioLabel}>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={gender === 'male'}
                onChange={(e) => setGender(e.target.value as Gender)}
                style={styles.radio}
              />
              <span style={styles.radioText}>Male</span>
            </label>
            <label style={styles.radioLabel}>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={gender === 'female'}
                onChange={(e) => setGender(e.target.value as Gender)}
                style={styles.radio}
              />
              <span style={styles.radioText}>Female</span>
            </label>
          </div>
        </div>

        {/* Age Input */}
        <div style={styles.fieldContainer}>
          <label htmlFor="age" style={styles.label}>Age (years)</label>
          <input
            id="age"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
            min="1"
            max="120"
            placeholder="25"
            style={styles.input}
            onFocus={(e) => {
              e.target.style.borderColor = '#2BA5FF';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#383838';
            }}
          />
        </div>

        {/* Weight Input */}
        {unitSystem === 'imperial' ? (
          <div style={styles.fieldContainer}>
            <label htmlFor="weight" style={styles.label}>Weight (lbs)</label>
            <input
              id="weight"
              type="number"
              value={weightLbs}
              onChange={(e) => setWeightLbs(e.target.value)}
              required
              min="1"
              step="0.1"
              placeholder="154"
              style={styles.input}
              onFocus={(e) => {
                e.target.style.borderColor = '#007aff';
                e.target.style.boxShadow = '0 0 0 3px rgba(0, 122, 255, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgb(209, 213, 219)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>
        ) : (
          <div style={styles.fieldContainer}>
            <label htmlFor="weight" style={styles.label}>Weight (kg)</label>
            <input
              id="weight"
              type="number"
              value={weightKg}
              onChange={(e) => setWeightKg(e.target.value)}
              required
              min="1"
              step="0.1"
              placeholder="70"
              style={styles.input}
              onFocus={(e) => {
                e.target.style.borderColor = '#007aff';
                e.target.style.boxShadow = '0 0 0 3px rgba(0, 122, 255, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgb(209, 213, 219)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>
        )}

        {/* Height Input */}
        {unitSystem === 'imperial' ? (
          <div style={styles.fieldContainer}>
            <label style={styles.label}>Height</label>
            <div style={styles.heightRow}>
              <div style={styles.heightField}>
                <input
                  id="height-feet"
                  type="number"
                  value={heightFeet}
                  onChange={(e) => setHeightFeet(e.target.value)}
                  required
                  min="0"
                  max="8"
                  placeholder="5"
                  style={styles.input}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#007aff';
                    e.target.style.boxShadow = '0 0 0 3px rgba(0, 122, 255, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgb(209, 213, 219)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                <label htmlFor="height-feet" style={styles.helperText}>Feet</label>
              </div>
              <div style={styles.heightField}>
                <input
                  id="height-inches"
                  type="number"
                  value={heightInches}
                  onChange={(e) => setHeightInches(e.target.value)}
                  required
                  min="0"
                  max="11"
                  placeholder="9"
                  style={styles.input}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#007aff';
                    e.target.style.boxShadow = '0 0 0 3px rgba(0, 122, 255, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgb(209, 213, 219)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                <label htmlFor="height-inches" style={styles.helperText}>Inches</label>
              </div>
            </div>
          </div>
        ) : (
          <div style={styles.fieldContainer}>
            <label htmlFor="height-cm" style={styles.label}>Height (cm)</label>
            <input
              id="height-cm"
              type="number"
              value={heightCm}
              onChange={(e) => setHeightCm(e.target.value)}
              required
              min="1"
              max="300"
              placeholder="175"
              style={styles.input}
              onFocus={(e) => {
                e.target.style.borderColor = '#007aff';
                e.target.style.boxShadow = '0 0 0 3px rgba(0, 122, 255, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgb(209, 213, 219)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>
        )}

        {/* Activity Level Selection */}
        <div style={styles.fieldContainer}>
          <label htmlFor="activity" style={styles.label}>Activity Level</label>
          <select
            id="activity"
            value={activityLevel}
            onChange={(e) => setActivityLevel(e.target.value as ActivityLevel)}
            style={styles.select}
            onFocus={(e) => {
              e.target.style.borderColor = '#2BA5FF';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#383838';
            }}
          >
            <option value="sedentary">Sedentary (little or no exercise, desk job) - 1.2</option>
            <option value="light">Lightly Active (light exercise/sports 1-3 d/wk) - 1.375</option>
            <option value="moderate">Moderately Active (moderate exercise/sports 3-5 d/wk) - 1.55</option>
            <option value="very_active">Very Active (hard exercise/sports 6-7 d/wk) - 1.725</option>
            <option value="extremely_active">Extremely Active (hard daily exercise/sports & physical job or 2X day training) - 1.9</option>
            <option value="custom">Custom (enter your own multiplier)</option>
          </select>
        </div>

        {/* Custom Activity Multiplier */}
        {activityLevel === 'custom' && (
          <div style={styles.fieldContainer}>
            <label htmlFor="custom-multiplier" style={styles.label}>Custom Activity Multiplier</label>
            <input
              id="custom-multiplier"
              type="number"
              value={customMultiplier}
              onChange={(e) => setCustomMultiplier(e.target.value)}
              required
              min="1"
              max="3"
              step="0.01"
              placeholder="1.5"
              style={styles.input}
              onFocus={(e) => {
                e.target.style.borderColor = '#007aff';
                e.target.style.boxShadow = '0 0 0 3px rgba(0, 122, 255, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgb(209, 213, 219)';
                e.target.style.boxShadow = 'none';
              }}
            />
            <p style={styles.helperText}>
              Enter a number between 1.0 and 3.0 (e.g., 1.5 for activity between Lightly and Moderately Active)
            </p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          style={styles.button}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#2BA5FF';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#383838';
          }}
        >
          Calculate TDEE
        </button>
      </form>

      {/* Step 1 Results */}
      {results && (
        <div style={styles.resultsSection}>
          <div style={styles.resultBox}>
            <h2 style={styles.h2}>Step 1: Your Maintenance Calories</h2>

            <div style={styles.resultRow}>
              <span style={styles.resultLabel}>BMR (Basal Metabolic Rate):</span>
              <span style={styles.resultValue}>{results.bmr.toLocaleString()} cal/day</span>
            </div>

            <div style={styles.resultRow}>
              <span style={styles.resultLabel}>TDEE (Total Daily Energy Expenditure):</span>
              <span style={styles.resultValue}>{results.tdee.toLocaleString()} cal/day</span>
            </div>

            <p style={styles.resultDescription}>
              Your TDEE is the number of calories you burn per day including your activity level. Numbers rounded to the nearest 50 for simplicity.
            </p>
          </div>

          {/* Step 2: Deficit Selection */}
          <div style={styles.deficitBox}>
            <h2 style={styles.h2}>Step 2: Calculate your Daily Calorie Target</h2>

            <div style={{ ...styles.form, gap: '16px' }}>
              <div style={styles.fieldContainer}>
                <label htmlFor="deficit" style={styles.label}>Select Your Deficit</label>
                <select
                  id="deficit"
                  value={selectedDeficit}
                  onChange={(e) => setSelectedDeficit(e.target.value)}
                  style={styles.select}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#007aff';
                    e.target.style.boxShadow = '0 0 0 3px rgba(0, 122, 255, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgb(209, 213, 219)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  <option value="none">Select a deficit...</option>
                  <option value="15">15% - Very Conservative Deficit</option>
                  <option value="20">20% - Conservative Deficit</option>
                  <option value="25">25% - Moderate Deficit</option>
                  <option value="30">30% - Aggressive Deficit</option>
                </select>
              </div>

              {selectedDeficit !== 'none' && (
                <>
                  <div style={styles.deficitDescription}>
                    <p style={{ fontSize: '13px', color: 'rgb(55, 65, 81)', lineHeight: 1.5 }}>
                      {selectedDeficit === '15' && 'Slow weight loss, but good for maximum muscle retention'}
                      {selectedDeficit === '20' && 'Slow to moderate weight loss; good for people with slightly high body fat and not in a big hurry to reach goal'}
                      {selectedDeficit === '25' && 'Moderate to quick rate of fat loss; good for people with high body fat who want brisk results but without high risk or discomfort'}
                      {selectedDeficit === '30' && 'Faster weight loss; good for very overweight people or anyone on a deadline. Hunger or minor risks possible, but still safe'}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleCalculateDeficit}
                    style={styles.deficitButton}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#2BA5FF';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#383838';
                    }}
                  >
                    Calculate Target Calories
                  </button>
                </>
              )}
            </div>

            {/* Deficit Results */}
            {deficitCalories && (
              <div style={styles.deficitResultBox}>
                <h3 style={styles.h3}>Your Weight Loss Target</h3>

                <div style={styles.resultRow}>
                  <span style={styles.resultLabel}>Target Calories ({selectedDeficit}% deficit):</span>
                  <span style={styles.resultValue}>{deficitCalories.toLocaleString()} cal/day</span>
                </div>

                {(() => {
                  const fatLossRate = Math.round((((results.tdee - deficitCalories) * 7) / 3500) * 10) / 10;
                  return (
                    <div style={styles.resultRow}>
                      <span style={styles.resultLabel}>Fat Loss Rate:</span>
                      <span style={styles.resultValue}>{fatLossRate} lbs/week</span>
                    </div>
                  );
                })()}

                <p style={styles.resultDescription}>
                  Eat this amount daily to achieve your weight loss goal. Your TDEE is {results.tdee.toLocaleString()} cal/day (what you burn),
                  and your target is {deficitCalories.toLocaleString()} cal/day (what you should eat).
                </p>
              </div>
            )}
          </div>

          {/* Step 3: Flexibility */}
          {deficitCalories && (
            <div style={styles.deficitBox}>
              <h2 style={styles.h2}>Step 3: Give yourself some Flexibility</h2>

              <p style={styles.resultDescription}>
                The key for a sustainable eating plan, is being flexible. Instead of targeting a daily calorie deficit, target a weekly calorie deficit. Eat less on certain days, to eat more on other, for example the weekends.
              </p>

              <div style={{ marginTop: '24px' }}>
                {(() => {
                  const weeklyDeficit = (results.tdee - deficitCalories) * 7;
                  const weeklyIntake = deficitCalories * 7;
                  return (
                    <>
                      <div style={styles.resultRow}>
                        <span style={styles.resultLabel}>Weekly Calorie Deficit:</span>
                        <span style={styles.resultValue}>{weeklyDeficit.toLocaleString()} cal/week</span>
                      </div>
                      <div style={styles.resultRow}>
                        <span style={styles.resultLabel}>Weekly Calorie Intake:</span>
                        <span style={styles.resultValue}>{weeklyIntake.toLocaleString()} cal/week</span>
                      </div>
                    </>
                  );
                })()}
              </div>

              {/* Tables Section */}
              <div style={{ marginTop: '32px' }}>
                <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                  {/* Linear Table */}
                  <div style={{ flex: '1', minWidth: '280px' }}>
                    <h3 style={{ ...styles.h3, fontSize: '16px', marginBottom: '16px' }}>Linear Weekly Calorie Intake</h3>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: "'Inter', Arial, sans-serif", fontSize: '13px' }}>
                      <thead>
                        <tr style={{ borderBottom: '2px solid #383838' }}>
                          <th style={{ textAlign: 'left', padding: '8px', fontWeight: 600, color: '#383838' }}>Day</th>
                          <th style={{ textAlign: 'right', padding: '8px', fontWeight: 600, color: '#383838' }}>Calories</th>
                        </tr>
                      </thead>
                      <tbody>
                        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                          <tr key={day} style={{ borderBottom: '1px solid #383838' }}>
                            <td style={{ padding: '8px', color: '#383838' }}>{day}</td>
                            <td style={{ textAlign: 'right', padding: '8px', fontFamily: "'Aeonik Mono', sans-serif", color: '#383838' }}>{deficitCalories.toLocaleString()}</td>
                          </tr>
                        ))}
                        <tr style={{ borderTop: '2px solid #383838', fontWeight: 600 }}>
                          <td style={{ padding: '8px', color: '#383838' }}>Total calories</td>
                          <td style={{ textAlign: 'right', padding: '8px', fontFamily: "'Aeonik Mono', sans-serif", color: '#383838' }}>{(deficitCalories * 7).toLocaleString()}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Flexible Table */}
                  <div style={{ flex: '1', minWidth: '280px' }}>
                    <h3 style={{ ...styles.h3, fontSize: '16px', marginBottom: '16px' }}>Flexible Weekly Calorie Intake</h3>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: "'Inter', Arial, sans-serif", fontSize: '13px' }}>
                      <thead>
                        <tr style={{ borderBottom: '2px solid #383838' }}>
                          <th style={{ textAlign: 'left', padding: '8px', fontWeight: 600, color: '#383838' }}>Day</th>
                          <th style={{ textAlign: 'right', padding: '8px', fontWeight: 600, color: '#383838' }}>Calories</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { day: 'Monday', cal: deficitCalories - 160 },
                          { day: 'Tuesday', cal: deficitCalories - 160 },
                          { day: 'Wednesday', cal: deficitCalories - 160 },
                          { day: 'Thursday', cal: deficitCalories - 160 },
                          { day: 'Friday', cal: deficitCalories + 400 },
                          { day: 'Saturday', cal: deficitCalories + 400 },
                          { day: 'Sunday', cal: deficitCalories - 160 },
                        ].map(({ day, cal }) => (
                          <tr key={day} style={{ borderBottom: '1px solid #383838' }}>
                            <td style={{ padding: '8px', color: '#383838' }}>{day}</td>
                            <td style={{ textAlign: 'right', padding: '8px', fontFamily: "'Aeonik Mono', sans-serif", color: '#383838' }}>{cal.toLocaleString()}</td>
                          </tr>
                        ))}
                        <tr style={{ borderTop: '2px solid #383838', fontWeight: 600 }}>
                          <td style={{ padding: '8px', color: '#383838' }}>Total calories</td>
                          <td style={{ textAlign: 'right', padding: '8px', fontFamily: "'Aeonik Mono', sans-serif", color: '#383838' }}>{(deficitCalories * 7).toLocaleString()}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
