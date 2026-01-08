import type { Metadata } from 'next';
import CoachCard, { type Coach } from '@/components/CoachCard';

export const metadata: Metadata = {
  title: 'Meet the Coaches | Nutrition Tools',
  description: 'Meet our certified nutrition and fitness coaches who can help you reach your health goals.',
};

// Placeholder coach data - replace with real coaches later
const coaches: Coach[] = [
  {
    name: 'Sarah Johnson',
    photo: '', // Will show placeholder icon
    title: 'Lead Nutrition Coach',
    specialty: 'Weight Loss & Meal Planning',
    bio: 'Sarah has helped hundreds of clients achieve their weight loss goals through evidence-based nutrition strategies and sustainable habit formation. She specializes in creating personalized meal plans that fit your lifestyle.',
    credentials: [
      'Certified Nutrition Specialist (CNS)',
      'Precision Nutrition Level 2',
      '10+ years coaching experience',
    ],
  },
  {
    name: 'Mike Chen',
    photo: '', // Will show placeholder icon
    title: 'Fitness & Nutrition Coach',
    specialty: 'Strength Training & Performance Nutrition',
    bio: 'Mike combines his expertise in strength training with nutrition science to help clients build muscle, lose fat, and improve athletic performance. He works with everyone from beginners to competitive athletes.',
    credentials: [
      'Registered Dietitian (RD)',
      'NSCA Certified Strength Coach',
      'Sports Nutrition Specialist',
    ],
  },
  {
    name: 'Dr. Emily Rodriguez',
    photo: '', // Will show placeholder icon
    title: 'Clinical Nutritionist',
    specialty: 'Metabolic Health & Hormones',
    bio: 'Dr. Rodriguez focuses on the science of metabolism and hormonal health. She helps clients understand how their body processes food and creates strategies for long-term metabolic optimization.',
    credentials: [
      'PhD in Nutritional Biochemistry',
      'Licensed Nutritionist',
      'Functional Medicine Practitioner',
    ],
  },
];

export default function CoachesPage() {
  const styles = {
    page: {
      minHeight: '100vh',
      background: '#F4EFEA',
      padding: '48px 16px',
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
    },
    header: {
      marginBottom: '48px',
      textAlign: 'center' as const,
    },
    title: {
      fontFamily: "'Aeonik Mono', sans-serif",
      fontSize: '36px',
      fontWeight: 400,
      color: '#383838',
      marginBottom: '16px',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.02em',
    },
    subtitle: {
      fontFamily: "'Inter', Arial, sans-serif",
      fontSize: '18px',
      fontWeight: 300,
      color: '#383838',
      lineHeight: '1.6',
      maxWidth: '700px',
      margin: '0 auto',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
      gap: '32px',
      marginBottom: '48px',
    },
    cta: {
      maxWidth: '680px',
      margin: '48px auto 0',
      background: 'white',
      border: '2px solid #383838',
      borderRadius: '0px',
      padding: '32px',
      textAlign: 'center' as const,
    },
    ctaTitle: {
      fontFamily: "'Aeonik Mono', sans-serif",
      fontSize: '24px',
      fontWeight: 400,
      color: '#383838',
      marginBottom: '16px',
      textTransform: 'uppercase' as const,
    },
    ctaText: {
      fontFamily: "'Inter', Arial, sans-serif",
      fontSize: '16px',
      fontWeight: 300,
      color: '#383838',
      lineHeight: '1.6',
      marginBottom: '24px',
    },
    ctaButton: {
      padding: '14px 32px',
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
      textDecoration: 'none',
      display: 'inline-block',
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <header style={styles.header}>
          <h1 style={styles.title}>Meet the Coaches</h1>
          <p style={styles.subtitle}>
            Our team of certified nutrition and fitness professionals is here to help you achieve
            your health goals with evidence-based strategies and personalized support.
          </p>
        </header>

        <div style={styles.grid}>
          {coaches.map((coach, index) => (
            <CoachCard key={index} coach={coach} />
          ))}
        </div>

        <div style={styles.cta}>
          <h2 style={styles.ctaTitle}>Ready to Get Started?</h2>
          <p style={styles.ctaText}>
            Use our free calorie calculator to get your personalized nutrition plan, then reach out
            to one of our coaches for expert guidance.
          </p>
          <a
            href="/"
            style={styles.ctaButton}
            className="cta-button"
          >
            Try the Calculator
          </a>
          <style jsx>{`
            .cta-button:hover {
              background: #2BA5FF !important;
            }
          `}</style>
        </div>
      </div>
    </div>
  );
}
