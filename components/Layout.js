import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Chatbot from '../components/Chatbot'; // This now points to the new component

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
  ];

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="container">
      <header className="navbar">
        <h1 className="logo">ProjectUcode</h1>

        <button
          className="hamburger"
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          ☰
        </button>

        {menuOpen && (
          <nav className="nav-menu">
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
        )}
      </header>

      <main>{children}</main>

      <Chatbot />

      <style jsx>{`
        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          background: #2a0a54;
          color: #ddd6fe;
        }
        .logo {
          font-weight: bold;
          font-size: 1.5rem;
        }
        .hamburger {
          font-size: 2rem;
          background: none;
          border: none;
          color: #ddd6fe;
          cursor: pointer;
          user-select: none;
        }
        .nav-menu {
          position: absolute;
          top: 3.5rem; /* below navbar */
          right: 1rem;
          background: #4b0082;
          border-radius: 6px;
          padding: 0.5rem 1rem;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
        }
        .nav-menu a {
          display: block;
          color: #ddd6fe;
          padding: 0.5rem 0;
          text-decoration: none;
          font-weight: 600;
        }
        .nav-menu a:hover,
        .nav-menu a.active {
          color: #a855f7;
        }
      `}</style>
    </div>
  );
}
