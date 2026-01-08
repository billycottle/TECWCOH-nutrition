'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Calculator' },
    { href: '/tools', label: 'Tools' },
    { href: '/education', label: 'Education' },
    { href: '/coaches', label: 'Meet the Coaches' },
  ];

  const styles = {
    nav: {
      background: 'white',
      borderBottom: '1px solid #383838',
      position: 'sticky' as const,
      top: 0,
      zIndex: 50,
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '16px 24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    logo: {
      fontFamily: "'Aeonik Mono', sans-serif",
      fontSize: '18px',
      fontWeight: 400,
      color: '#383838',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.02em',
      textDecoration: 'none',
    },
    desktopLinks: {
      display: 'flex',
      gap: '32px',
      alignItems: 'center',
    },
    link: {
      fontFamily: "'Inter', Arial, sans-serif",
      fontSize: '14px',
      fontWeight: 300,
      color: '#383838',
      textDecoration: 'none',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.02em',
      transition: 'color 0.15s ease',
      padding: '8px 0',
      borderBottom: '2px solid transparent',
    },
    activeLink: {
      borderBottom: '2px solid #2BA5FF',
      fontWeight: 400,
    },
    hamburger: {
      display: 'none',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: '8px',
    },
    hamburgerLine: {
      width: '24px',
      height: '2px',
      background: '#383838',
      display: 'block',
      margin: '5px 0',
      transition: 'all 0.3s ease',
    },
    mobileMenu: {
      display: 'none',
      flexDirection: 'column' as const,
      gap: '16px',
      padding: '24px',
      background: 'white',
      borderBottom: '1px solid #383838',
    },
    mobileLink: {
      fontFamily: "'Inter', Arial, sans-serif",
      fontSize: '16px',
      fontWeight: 300,
      color: '#383838',
      textDecoration: 'none',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.02em',
      padding: '12px 0',
      borderBottom: '1px solid #383838',
    },
  };

  // Media query styles (we'll use inline style attribute for mobile)
  const mediaStyles = `
    @media (max-width: 768px) {
      .desktop-links {
        display: none !important;
      }
      .hamburger {
        display: block !important;
      }
      .mobile-menu {
        display: ${mobileMenuOpen ? 'flex' : 'none'} !important;
      }
    }
  `;

  return (
    <>
      <style>{mediaStyles}</style>
      <nav style={styles.nav}>
        <div style={styles.container}>
          <Link href="/" style={styles.logo}>
            Nutrition Tools
          </Link>

          {/* Desktop Navigation */}
          <div style={styles.desktopLinks} className="desktop-links">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  ...styles.link,
                  ...(pathname === link.href ? styles.activeLink : {}),
                }}
                onMouseEnter={(e) => {
                  if (pathname !== link.href) {
                    e.currentTarget.style.color = '#2BA5FF';
                  }
                }}
                onMouseLeave={(e) => {
                  if (pathname !== link.href) {
                    e.currentTarget.style.color = '#383838';
                  }
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Hamburger */}
          <button
            style={styles.hamburger}
            className="hamburger"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span
              style={{
                ...styles.hamburgerLine,
                transform: mobileMenuOpen ? 'rotate(45deg) translateY(7px)' : 'none',
              }}
            />
            <span
              style={{
                ...styles.hamburgerLine,
                opacity: mobileMenuOpen ? 0 : 1,
              }}
            />
            <span
              style={{
                ...styles.hamburgerLine,
                transform: mobileMenuOpen ? 'rotate(-45deg) translateY(-7px)' : 'none',
              }}
            />
          </button>
        </div>

        {/* Mobile Menu */}
        <div style={styles.mobileMenu} className="mobile-menu">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                ...styles.mobileLink,
                ...(pathname === link.href ? { fontWeight: 400, color: '#2BA5FF' } : {}),
              }}
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
