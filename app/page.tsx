import Calculator from '@/components/Calculator';

export default function Home() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#F4EFEA', // Warm cream/beige background from STYLE_GUIDE.md
      padding: '48px 16px',
      fontFamily: "'Aeonik Mono', sans-serif",
    }}>
      <Calculator />
    </div>
  );
}
