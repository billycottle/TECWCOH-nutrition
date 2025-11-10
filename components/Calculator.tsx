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
        <p style={styles.subtitle}>Find out how many calories your body burns each day</p>
      </div>

      <form onSubmit={handleCalculate} style={styles.form}>
        {/* Unit System Toggle */}
        <div style={styles.fieldContainer}>
          <label style={styles.label}>Measurement System</label>
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
              <span style={styles.radioText}>US (pounds, feet/inches)</span>
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
              <span style={styles.radioText}>Metric (kilograms, centimeters)</span>
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
                value="female"
                checked={gender === 'female'}
                onChange={(e) => setGender(e.target.value as Gender)}
                style={styles.radio}
              />
              <span style={styles.radioText}>Female</span>
            </label>
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
            placeholder="55"
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
              placeholder="180"
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
              placeholder="82"
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
                  placeholder="6"
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
              placeholder="168"
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
            <option value="sedentary">Sedentary - Desk job, little exercise</option>
            <option value="light">Lightly Active - Light exercise 1-3 days/week</option>
            <option value="moderate">Moderately Active - Exercise 3-5 days/week</option>
            <option value="very_active">Very Active - Exercise 6-7 days/week</option>
            <option value="extremely_active">Extremely Active - Intense daily exercise plus physical job</option>
          </select>
        </div>

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
          Calculate My Daily Calories
        </button>
      </form>

      {/* Step 1 Results */}
      {results && (
        <div style={styles.resultsSection}>
          <div style={styles.resultBox}>
            <h2 style={styles.h2}>Your Daily Calorie Burn</h2>

            <div style={styles.resultRow}>
              <span style={styles.resultLabel}>Resting Calories (no activity):</span>
              <span style={styles.resultValue}>{results.bmr.toLocaleString()} cal/day</span>
            </div>

            <div style={styles.resultRow}>
              <span style={styles.resultLabel}>Total Daily Calories Burned:</span>
              <span style={styles.resultValue}>{results.tdee.toLocaleString()} cal/day</span>
            </div>

            <p style={styles.resultDescription}>
              This is how many calories your body burns each day, including your exercise and activity. Rounded to the nearest 50 for simplicity.
            </p>
          </div>

          {/* Step 2: Deficit Selection */}
          <div style={styles.deficitBox}>
            <h2 style={styles.h2}>Step 2: Choose Your Calorie Deficit</h2>

            <p style={styles.resultDescription}>
              The larger the calorie deficit, the faster you'll lose weight. The catch? You'll feel hungrier and risk losing muscle along with fat. Start with one option and adjust based on comfort and results.
            </p>

            <div style={{ ...styles.form, gap: '16px', marginTop: '24px' }}>
              <div style={styles.fieldContainer}>
                <label htmlFor="deficit" style={styles.label}>Pick a Calorie Deficit</label>
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
                  <option value="none">Choose an option...</option>
                  <option value="15">Light (15% reduction)</option>
                  <option value="20">Moderate (20% reduction)</option>
                  <option value="25">Significant (25% reduction)</option>
                  <option value="30">Aggressive (30% reduction)</option>
                </select>
              </div>

              {selectedDeficit !== 'none' && (
                <>
                  <div style={styles.deficitDescription}>
                    <p style={{ fontSize: '13px', color: 'rgb(55, 65, 81)', lineHeight: 1.5 }}>
                      {selectedDeficit === '15' && 'Slow burn, great for preserving muscle while burning fat'}
                      {selectedDeficit === '20' && "You want to see results faster, but don't want to be too hungry. If you have moderate body fat and want a sustainable plan, this is it."}
                      {selectedDeficit === '25' && 'If you have high body fat, but want fast results without the extreme discomfort of an aggressive deficit, choose this one'}
                      {selectedDeficit === '30' && "Faster results. Best if you have a deadline or significant body fat to lose. You'll feel hungry, but it's still safe."}
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
                    Calculate My Calorie Target
                  </button>
                </>
              )}
            </div>

            {/* Deficit Results */}
            {deficitCalories && (
              <div style={styles.deficitResultBox}>
                <h3 style={styles.h3}>Your Daily Calorie Target</h3>

                <div style={styles.resultRow}>
                  <span style={styles.resultLabel}>Eat This Many Calories:</span>
                  <span style={styles.resultValue}>{deficitCalories.toLocaleString()} cal/day</span>
                </div>

                {(() => {
                  const fatLossRate = Math.round((((results.tdee - deficitCalories) * 7) / 3500) * 10) / 10;
                  return (
                    <div style={styles.resultRow}>
                      <span style={styles.resultLabel}>Expected Weight Loss Per Week:</span>
                      <span style={styles.resultValue}>{fatLossRate} lbs/week</span>
                    </div>
                  );
                })()}

                <p style={styles.resultDescription}>
                  Eat this amount each day to lose weight. You burn {results.tdee.toLocaleString()} calories per day and should eat {deficitCalories.toLocaleString()} calories per day. A {selectedDeficit}% calorie deficit.
                </p>
              </div>
            )}
          </div>

          {/* Step 3: Flexibility */}
          {deficitCalories && (
            <div style={styles.deficitBox}>
              <h2 style={styles.h2}>Step 3: Make It Work for Your Life</h2>

              <p style={styles.resultDescription}>
                Don't want to eat the same amount every day? You don't have to. Think about your week as a whole. Eat a bit less on weekdays so you can enjoy more on weekends.
              </p>

              <div style={{ marginTop: '24px' }}>
                {(() => {
                  const weeklyDeficit = (results.tdee - deficitCalories) * 7;
                  const weeklyIntake = deficitCalories * 7;
                  return (
                    <>
                      <div style={styles.resultRow}>
                        <span style={styles.resultLabel}>Weekly Calorie Reduction:</span>
                        <span style={styles.resultValue}>{weeklyDeficit.toLocaleString()} cal/week</span>
                      </div>
                      <div style={styles.resultRow}>
                        <span style={styles.resultLabel}>Total Weekly Calories to Eat:</span>
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
                    <h3 style={{ ...styles.h3, fontSize: '16px', marginBottom: '16px' }}>Same Amount Every Day</h3>
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
                          <td style={{ padding: '8px', color: '#383838' }}>Weekly Total</td>
                          <td style={{ textAlign: 'right', padding: '8px', fontFamily: "'Aeonik Mono', sans-serif", color: '#383838' }}>{(deficitCalories * 7).toLocaleString()}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Flexible Table */}
                  <div style={{ flex: '1', minWidth: '280px' }}>
                    <h3 style={{ ...styles.h3, fontSize: '16px', marginBottom: '16px' }}>Flexible Plan (Eat Less Weekdays, More Weekends)</h3>
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
                          <td style={{ padding: '8px', color: '#383838' }}>Weekly Total</td>
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
