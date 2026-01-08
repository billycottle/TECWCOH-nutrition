import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Nutrition & Fitness Tools | Nutrition Tools',
  description: 'Explore our collection of nutrition and fitness calculators and tools.',
};

export default function ToolsPage() {
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
    comingSoon: {
      maxWidth: '680px',
      margin: '0 auto',
      background: 'white',
      border: '2px solid #383838',
      borderRadius: '0px',
      padding: '48px 32px',
      textAlign: 'center' as const,
    },
    comingSoonTitle: {
      fontFamily: "'Aeonik Mono', sans-serif",
      fontSize: '24px',
      fontWeight: 400,
      color: '#383838',
      marginBottom: '16px',
      textTransform: 'uppercase' as const,
    },
    comingSoonText: {
      fontFamily: "'Inter', Arial, sans-serif",
      fontSize: '16px',
      fontWeight: 300,
      color: '#383838',
      lineHeight: '1.6',
      marginBottom: '24px',
    },
    link: {
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
          <h1 style={styles.title}>Tools</h1>
          <p style={styles.subtitle}>
            More calculators and tools coming soon to help you reach your nutrition and fitness
            goals.
          </p>
        </header>

        <div style={styles.comingSoon}>
          <h2 style={styles.comingSoonTitle}>Coming Soon</h2>
          <p style={styles.comingSoonText}>
            We're working on additional tools including a macro calculator, meal planner, and more.
            For now, check out our calorie calculator.
          </p>
          <Link
            href="/"
            style={styles.link}
            className="cta-link"
          >
            Try the Calorie Calculator
          </Link>
          <style jsx>{`
            .cta-link:hover {
              background: #2BA5FF !important;
            }
          `}</style>
        </div>
      </div>
    </div>
  );
}
