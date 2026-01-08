import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Nutrition Tools',
  description: 'Learn how we collect, use, and protect your personal information.',
};

export default function PrivacyPage() {
  const styles = {
    page: {
      minHeight: '100vh',
      background: '#F4EFEA',
      padding: '48px 16px',
    },
    container: {
      maxWidth: '800px',
      margin: '0 auto',
      background: 'white',
      border: '1px solid #383838',
      borderRadius: '0px',
      padding: '48px 32px',
    },
    header: {
      marginBottom: '32px',
      paddingBottom: '24px',
      borderBottom: '1px solid #383838',
    },
    title: {
      fontFamily: "'Aeonik Mono', sans-serif",
      fontSize: '32px',
      fontWeight: 400,
      color: '#383838',
      marginBottom: '8px',
      textTransform: 'uppercase' as const,
    },
    lastUpdated: {
      fontFamily: "'Inter', Arial, sans-serif",
      fontSize: '14px',
      fontWeight: 300,
      color: '#383838',
    },
    section: {
      marginBottom: '32px',
    },
    sectionTitle: {
      fontFamily: "'Aeonik Mono', sans-serif",
      fontSize: '20px',
      fontWeight: 400,
      color: '#383838',
      marginBottom: '16px',
      textTransform: 'uppercase' as const,
    },
    paragraph: {
      fontFamily: "'Inter', Arial, sans-serif",
      fontSize: '15px',
      fontWeight: 300,
      color: '#383838',
      lineHeight: '1.6',
      marginBottom: '12px',
    },
    list: {
      fontFamily: "'Inter', Arial, sans-serif",
      fontSize: '15px',
      fontWeight: 300,
      color: '#383838',
      lineHeight: '1.8',
      paddingLeft: '24px',
      marginBottom: '12px',
    },
    link: {
      color: '#2BA5FF',
      textDecoration: 'underline',
    },
  };

  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>Privacy Policy</h1>
          <p style={styles.lastUpdated}>Last updated: {today}</p>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Overview</h2>
          <p style={styles.paragraph}>
            At Nutrition Tools, we respect your privacy and are committed to protecting your
            personal information. This policy explains what information we collect, how we use it,
            and your rights regarding your data.
          </p>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Information We Collect</h2>
          <p style={styles.paragraph}>
            When you use our calorie calculator and request email delivery of your results, we
            collect:
          </p>
          <ul style={styles.list}>
            <li>Email address (when you request results via email)</li>
            <li>Calculator inputs: age, gender, weight, height, and activity level</li>
            <li>Calculated results: BMR, TDEE, and selected calorie deficit</li>
            <li>
              Anonymous usage data: page views, device type, and browser information (via Vercel
              Analytics)
            </li>
          </ul>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>How We Use Your Information</h2>
          <p style={styles.paragraph}>We use the information we collect to:</p>
          <ul style={styles.list}>
            <li>Send you your personalized calorie plan via email</li>
            <li>Improve our calculator and website based on usage patterns</li>
            <li>Understand how visitors use our tools to make them better</li>
            <li>
              Optionally, send you helpful nutrition and fitness content (you can opt out at any
              time)
            </li>
          </ul>
          <p style={styles.paragraph}>
            We will never sell your personal information to third parties.
          </p>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Data Storage & Security</h2>
          <p style={styles.paragraph}>
            Your data is stored securely on Vercel's infrastructure, which complies with industry
            security standards. We use:
          </p>
          <ul style={styles.list}>
            <li>Encrypted data transmission (HTTPS)</li>
            <li>Secure database storage (Vercel KV)</li>
            <li>Rate limiting to prevent abuse</li>
            <li>Regular security updates and monitoring</li>
          </ul>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Analytics & Cookies</h2>
          <p style={styles.paragraph}>
            We use Vercel Analytics to understand how visitors use our website. Vercel Analytics is
            privacy-friendly and does not use cookies or collect personally identifiable
            information. It only tracks:
          </p>
          <ul style={styles.list}>
            <li>Anonymous page views and visitor counts</li>
            <li>Device type and browser (aggregated, not individual)</li>
            <li>Web performance metrics (page load time, etc.)</li>
          </ul>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Your Rights</h2>
          <p style={styles.paragraph}>You have the right to:</p>
          <ul style={styles.list}>
            <li>Request a copy of your data</li>
            <li>Request deletion of your data</li>
            <li>Opt out of email communications at any time</li>
            <li>Update or correct your information</li>
          </ul>
          <p style={styles.paragraph}>
            To exercise any of these rights, please contact us at{' '}
            <a href="mailto:privacy@nutritiontools.com" style={styles.link}>
              privacy@nutritiontools.com
            </a>
            .
          </p>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Third-Party Services</h2>
          <p style={styles.paragraph}>We use the following third-party services:</p>
          <ul style={styles.list}>
            <li>
              <strong>Resend</strong> - Email delivery service
            </li>
            <li>
              <strong>Vercel</strong> - Hosting and analytics
            </li>
          </ul>
          <p style={styles.paragraph}>
            These services have their own privacy policies and handle your data according to their
            terms.
          </p>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Children's Privacy</h2>
          <p style={styles.paragraph}>
            Our services are not intended for children under 13. We do not knowingly collect
            personal information from children.
          </p>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Changes to This Policy</h2>
          <p style={styles.paragraph}>
            We may update this privacy policy from time to time. The "Last updated" date at the top
            of this page will reflect when changes were made. Continued use of our services after
            changes constitutes acceptance of the updated policy.
          </p>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Contact Us</h2>
          <p style={styles.paragraph}>
            If you have questions about this privacy policy or how we handle your data, please
            contact us:
          </p>
          <ul style={styles.list}>
            <li>
              Email:{' '}
              <a href="mailto:privacy@nutritiontools.com" style={styles.link}>
                privacy@nutritiontools.com
              </a>
            </li>
            <li>
              Website:{' '}
              <a href="/" style={styles.link}>
                NutritionTools.com
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
