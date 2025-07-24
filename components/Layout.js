import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Chatbot from '../components/Chatbot';
import SearchBar from '../components/SearchBar';

function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const moveCursor = (e) => setPosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <>
      <div
        className="custom-cursor"
        style={{
          left: position.x + 'px',
          top: position.y + 'px',
        }}
      />
      <style jsx>{`
        .custom-cursor {
          position: fixed;
          width: 15px;
          height: 15px;
          background: #a855f7;
          border-radius: 50%;
          pointer-events: none;
          transform: translate(-50%, -50%);
          transition: background 0.3s ease, transform 0.1s ease;
          z-index: 10000;
          mix-blend-mode: difference;
          will-change: transform;
        }
        a:hover ~ .custom-cursor,
        button:hover ~ .custom-cursor {
          background: #fff;
          transform: translate(-50%, -50%) scale(1.5);
        }
      `}</style>
    </>
  );
}

export default function Layout({ children }) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
    { href: '/officerapps', label: 'Apply' },
    { href: '/resources', label: 'Resources' },
    { href: '/learninghub', label: 'Learning Hub' },
    { href: '/gallery', label: 'Projects' },
    { href: '/members', label: 'Members' },
    { href: '/tutorials', label: 'Tutorials' },
  ];

  useEffect(() => {
    const handleRouteChange = () => setMenuOpen(false);
    router.events.on('routeChangeStart', handleRouteChange);
    return () => router.events.off('routeChangeStart', handleRouteChange);
  }, [router.events]);

  return (
    <div className="layout-container">
      <CustomCursor />

      <header className="navbar">
        <div className="navbar-left">
          <h1 className="logo">ProjectUcode</h1>
        </div>

        <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {links.map(({ href, label }) => (
            <Link key={href} href={href} legacyBehavior>
              <a
                className={router.pathname === href ? 'active' : ''}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </a>
            </Link>
          ))}
        </nav>

        <button
          className="hamburger"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          ☰
        </button>
      </header>

      <SearchBar />

      <main>{children}</main>

      <Chatbot />

      <style jsx>{`
        .layout-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background: #1a052e;
          color: #ddd6fe;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.5rem;
          background: #2a0a54;
          color: #ddd6fe;
          position: relative;
          z-index: 100;
        }

        .logo {
          font-size: 1.8rem;
          font-weight: 700;
          user-select: none;
        }

        .hamburger {
          font-size: 2rem;
          background: none;
          border: none;
          color: #ddd6fe;
          cursor: pointer;
          display: block;
          transition: color 0.3s ease;
        }
        .hamburger:hover {
          color: #a855f7;
        }

        .nav-links {
          display: none;
          position: absolute;
          top: 100%;
          right: 1rem;
          background: #3c1361;
          padding: 0.75rem 1rem;
          border-radius: 0.5rem;
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.25);
          z-index: 10;
          flex-direction: column;
          min-width: 150px;
        }

        .nav-links a {
          color: #ddd6fe;
          padding: 0.6rem 0;
          text-decoration: none;
          font-weight: 600;
          user-select: none;
          transition: color 0.3s ease;
        }

        .nav-links a:hover,
        .nav-links a.active {
          color: #a855f7;
        }

        .nav-links.open {
          display: flex;
        }

        /* Desktop styles */
        @media (min-width: 768px) {
          .hamburger {
            display: none;
          }

          .nav-links {
            display: flex;
            position: static;
            flex-direction: row;
            gap: 1.8rem;
            background: transparent;
            padding: 0;
            box-shadow: none;
            min-width: auto;
          }

          .nav-links a {
            padding: 0;
          }
        }

        main {
          flex-grow: 1;
          padding: 1.5rem;
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
        }
      `}</style>
    </div>
  );
}
