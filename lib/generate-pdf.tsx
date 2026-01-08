import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Define types for our calculator data
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

// PDF Styles matching the brand design system
const styles = StyleSheet.create({
  page: {
    backgroundColor: '#FFFFFF',
    padding: 40,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 30,
    borderBottom: '1px solid #383838',
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    color: '#383838',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 12,
    color: '#383838',
    fontFamily: 'Helvetica',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 16,
    color: '#383838',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
    fontFamily: 'Helvetica-Bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottom: '1px solid #383838',
    marginBottom: 8,
  },
  label: {
    fontSize: 11,
    color: '#383838',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  value: {
    fontSize: 14,
    color: '#383838',
    fontFamily: 'Helvetica-Bold',
  },
  largeValue: {
    fontSize: 20,
    color: '#383838',
    fontFamily: 'Helvetica-Bold',
  },
  description: {
    fontSize: 10,
    color: '#383838',
    lineHeight: 1.5,
    marginTop: 10,
  },
  highlightBox: {
    backgroundColor: '#F4EFEA',
    border: '1px solid #383838',
    padding: 15,
    marginVertical: 10,
  },
  table: {
    marginTop: 15,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottom: '1px solid #383838',
    paddingVertical: 6,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottom: '2px solid #383838',
    paddingVertical: 8,
    marginBottom: 5,
    backgroundColor: '#F4EFEA',
  },
  tableCol: {
    flex: 1,
    fontSize: 10,
    color: '#383838',
  },
  tableColBold: {
    flex: 1,
    fontSize: 10,
    color: '#383838',
    fontFamily: 'Helvetica-Bold',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    borderTop: '1px solid #383838',
    paddingTop: 10,
    fontSize: 8,
    color: '#383838',
    textAlign: 'center',
  },
});

// Helper function to get activity level description
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

// Helper function to get deficit description
function getDeficitDescription(deficit: string): string {
  const descriptions: Record<string, string> = {
    '15': 'Light (15% reduction) - Slow burn, great for preserving muscle',
    '20': 'Moderate (20% reduction) - Balanced approach for sustainable results',
    '25': 'Significant (25% reduction) - Faster results with manageable hunger',
    '30': 'Aggressive (30% reduction) - Fastest results, requires discipline',
  };
  return descriptions[deficit] || `${deficit}% calorie reduction`;
}

export function CaloriePlanDocument({ data }: { data: PDFData }) {
  const deficitAmount = data.tdee - data.targetCalories;
  const weeklyDeficit = deficitAmount * 7;
  const expectedWeightLoss = Math.round((weeklyDeficit / 3500) * 10) / 10;

  // Flexible weekly plan
  const flexiblePlan = [
    { day: 'Monday', calories: data.targetCalories - 160 },
    { day: 'Tuesday', calories: data.targetCalories - 160 },
    { day: 'Wednesday', calories: data.targetCalories - 160 },
    { day: 'Thursday', calories: data.targetCalories - 160 },
    { day: 'Friday', calories: data.targetCalories + 400 },
    { day: 'Saturday', calories: data.targetCalories + 400 },
    { day: 'Sunday', calories: data.targetCalories - 160 },
  ];

  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Your Personalized Calorie Plan</Text>
          <Text style={styles.subtitle}>Generated on {today}</Text>
        </View>

        {/* Your Profile */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Profile</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Age</Text>
            <Text style={styles.value}>{data.age} years</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Gender</Text>
            <Text style={styles.value}>{data.gender === 'male' ? 'Male' : 'Female'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Weight</Text>
            <Text style={styles.value}>{data.weight}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Height</Text>
            <Text style={styles.value}>{data.height}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Activity Level</Text>
            <Text style={styles.value}>{getActivityDescription(data.activityLevel)}</Text>
          </View>
        </View>

        {/* Daily Calorie Burn */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Daily Calorie Burn</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Resting Calories (BMR)</Text>
            <Text style={styles.largeValue}>{data.bmr.toLocaleString()} cal/day</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Total Daily Calories Burned (TDEE)</Text>
            <Text style={styles.largeValue}>{data.tdee.toLocaleString()} cal/day</Text>
          </View>
          <Text style={styles.description}>
            This is how many calories your body burns each day, including your exercise and
            activity. Rounded to the nearest 50 for simplicity.
          </Text>
        </View>

        {/* Your Calorie Target */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Calorie Target for Weight Loss</Text>
          <View style={styles.highlightBox}>
            <View style={styles.row}>
              <Text style={styles.label}>Daily Calorie Target</Text>
              <Text style={styles.largeValue}>{data.targetCalories.toLocaleString()} cal/day</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Calorie Deficit</Text>
              <Text style={styles.value}>{getDeficitDescription(data.selectedDeficit)}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Expected Weight Loss</Text>
              <Text style={styles.value}>{expectedWeightLoss} lbs/week</Text>
            </View>
          </View>
          <Text style={styles.description}>
            Eat {data.targetCalories.toLocaleString()} calories per day to create a calorie deficit
            and lose weight. You burn {data.tdee.toLocaleString()} calories per day, so eating{' '}
            {data.targetCalories.toLocaleString()} creates a {data.selectedDeficit}% deficit.
          </Text>
        </View>

        {/* Weekly Plan */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Make It Work for Your Life</Text>
          <Text style={styles.description}>
            Think about your week as a whole. You can eat the same amount every day, or eat a bit
            less on weekdays so you can enjoy more on weekends. Both approaches work - pick what
            fits your lifestyle.
          </Text>

          {/* Linear Table */}
          <View style={styles.table}>
            <Text style={{ fontSize: 12, marginBottom: 8, fontFamily: 'Helvetica-Bold' }}>
              Option 1: Same Amount Every Day
            </Text>
            <View style={styles.tableHeader}>
              <Text style={styles.tableColBold}>Day</Text>
              <Text style={[styles.tableColBold, { textAlign: 'right' }]}>Calories</Text>
            </View>
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(
              (day) => (
                <View key={day} style={styles.tableRow}>
                  <Text style={styles.tableCol}>{day}</Text>
                  <Text style={[styles.tableCol, { textAlign: 'right' }]}>
                    {data.targetCalories.toLocaleString()}
                  </Text>
                </View>
              )
            )}
            <View style={styles.tableHeader}>
              <Text style={styles.tableColBold}>Weekly Total</Text>
              <Text style={[styles.tableColBold, { textAlign: 'right' }]}>
                {data.weeklyCalories.toLocaleString()}
              </Text>
            </View>
          </View>

          {/* Flexible Table */}
          <View style={styles.table}>
            <Text style={{ fontSize: 12, marginBottom: 8, fontFamily: 'Helvetica-Bold' }}>
              Option 2: Flexible Plan (Less Weekdays, More Weekends)
            </Text>
            <View style={styles.tableHeader}>
              <Text style={styles.tableColBold}>Day</Text>
              <Text style={[styles.tableColBold, { textAlign: 'right' }]}>Calories</Text>
            </View>
            {flexiblePlan.map(({ day, calories }) => (
              <View key={day} style={styles.tableRow}>
                <Text style={styles.tableCol}>{day}</Text>
                <Text style={[styles.tableCol, { textAlign: 'right' }]}>
                  {calories.toLocaleString()}
                </Text>
              </View>
            ))}
            <View style={styles.tableHeader}>
              <Text style={styles.tableColBold}>Weekly Total</Text>
              <Text style={[styles.tableColBold, { textAlign: 'right' }]}>
                {data.weeklyCalories.toLocaleString()}
              </Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <Text style={styles.footer}>
          Generated by Nutrition Tools • Questions? Contact your coach • NutritionTools.com
        </Text>
      </Page>
    </Document>
  );
}
