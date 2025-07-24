import Head from 'next/head';
import { useEffect, useState } from 'react';
import Image from 'next/image';


const members = [
  {
    name: 'Shivang Patel',
    role: 'Founder, Fullstack Developer, Frontend & Backend Specialist',
    bio: 'Passionate coder and student-athlete, driving ProjectUcode’s vision forward. Creator of this platform, specializing in fullstack development across front-end and back-end.',
    photo: '/images/shivang.jpg',
  },
  {
    name: 'Sannvi',
    role: 'Content Creator & Co-executive of Mindset Math',
    bio: 'Creating tutorials, guides, and managing content for learners. Holds a Quantum Computing certificate and leads innovative learning strategies.',
    photo: '/images/sannvi.jpg',
  },
  {
    name: 'Member Name',
    role: 'Role/Title',
    bio: 'Bio goes here...',
    photo: '/images/placeholder.png',
  },
  {
    name: 'Member Name',
    role: 'Role/Title',
    bio: 'Bio goes here...',
    photo: '/images/placeholder.png',
  },
];

export default function Members() {
  const [visibleIndexes, setVisibleIndexes] = useState([]);
  const [search, setSearch] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    members.forEach((_, i) => {
      setTimeout(() => {
        setVisibleIndexes((vis) => [...vis, i]);
      }, i * 150);
    });
  }, []);

  // Filter members based on search and role inputs
  const filteredMembers = members.filter(({ name, role }) => {
    const matchesSearch = name.toLowerCase().includes(search.toLowerCase());
    const matchesRole = filterRole ? role.toLowerCase().includes(filterRole.toLowerCase()) : true;
    return matchesSearch && matchesRole;
  });

  // Scroll to top function
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <>
      <Head>
        <title>ProjectUcode Members</title>
        <meta name="description" content="Meet the members of ProjectUcode" />
      </Head>

      <header className={darkMode ? 'header dark' : 'header'}>
        <h1>Meet Our Members</h1>

        <button
          className="mobile-menu-button"
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          ☰
        </button>

        <nav className={`nav-menu ${mobileMenuOpen ? 'open' : ''}`}>
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search members by name"
          />
          <input
            type="text"
            placeholder="Filter by role (e.g. Developer)"
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            aria-label="Filter members by role"
          />
          <button
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle dark mode"
            className="dark-mode-toggle"
          >
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </nav>
      </header>

      <main className={darkMode ? 'members-container dark' : 'members-container'}>
        <p className="member-count">
          Showing {filteredMembers.length} of {members.length} members
        </p>

        <div className="cards">
          {filteredMembers.map(({ name, role, bio, photo }, idx) => (
            <div
              className={`card ${visibleIndexes.includes(idx) ? 'visible' : ''}`}
              key={idx}
            >
              <div className="photo-wrapper">
                <Image
  src={photo}
  alt={`${name}&apos;s photo`}
  width={200}    // set width & height accordingly
  height={200}
  onError={(e) => {
    e.target.onerror = null;
    e.target.src = '/images/placeholder.png';
  }}
  loading="lazy"
/>
              </div>
              <h2>{name}</h2>
              <h3>{role}</h3>
              <p>{bio}</p>
            </div>
          ))}
        </div>

        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="scroll-to-top"
        >
          ↑ Top
        </button>
      </main>

      <footer className={darkMode ? 'footer dark' : 'footer'}>
        <p>© 2025 ProjectUcode. All rights reserved.</p>
        <div className="social-links" aria-label="Social media links">
          <a href="https://github.com/shaypat112" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            GitHub
          </a>{' '}
          |{' '}
          <a href="https://twitter.com/shivangpatel" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            Twitter
          </a>
        </div>
      </footer>

      <style jsx>{`
        /* General layout */
        .members-container {
          max-width: 1000px;
          margin: 2rem auto 4rem;
          padding: 0 1rem;
          text-align: center;
          color: #ddd6fe;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          min-height: 80vh;
        }
        .members-container.dark {
          background: #121212;
          color: #ddd6fe;
        }

        /* Header */
        .header {
          position: sticky;
          top: 0;
          background: #3c1361;
          padding: 1rem 1rem 0.5rem;
          color: #ddd6fe;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          z-index: 100;
          border-bottom: 2px solid #a855f7;
        }
        .header.dark {
          background: #a855f7;
          color: #3c1361;
          border-bottom-color: #6b21a8;
        }
        .header h1 {
          font-size: 2rem;
          margin: 0.5rem 0;
          flex: 1 1 300px;
        }

        /* Mobile menu button */
        .mobile-menu-button {
          font-size: 1.8rem;
          background: transparent;
          border: none;
          color: inherit;
          cursor: pointer;
          display: none;
          padding: 0.25rem 0.5rem;
        }
        @media (max-width: 600px) {
          .mobile-menu-button {
            display: block;
          }
          .nav-menu {
            width: 100%;
            display: none;
            flex-direction: column;
            margin-top: 0.5rem;
          }
          .nav-menu.open {
            display: flex;
          }
        }

        /* Navigation inputs & button */
        .nav-menu {
          display: flex;
          gap: 1rem;
          align-items: center;
          flex-wrap: wrap;
          justify-content: flex-end;
          flex: 1 1 400px;
        }
        .nav-menu input {
          padding: 0.5rem 1rem;
          border-radius: 8px;
          border: none;
          font-size: 1rem;
          min-width: 180px;
          outline-offset: 2px;
          transition: box-shadow 0.3s;
        }
        .nav-menu input:focus {
          box-shadow: 0 0 8px #a855f7;
          outline: none;
        }
        .dark-mode-toggle {
          background: #a855f7;
          border: none;
          padding: 0.5rem 1.2rem;
          border-radius: 8px;
          color: white;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.3s;
          outline-offset: 2px;
        }
        .dark-mode-toggle:hover,
        .dark-mode-toggle:focus {
          background: #6b21a8;
          outline: none;
        }

        /* Member count */
        .member-count {
          font-style: italic;
          margin-bottom: 1rem;
          color: #c4b5fd;
        }
        .members-container.dark .member-count {
          color: #b794f4;
        }

        /* Cards grid - unchanged from your code */
        .cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
        }

        /* Cards styles remain exactly as your original code */

        .card {
          background: #3c1361;
          padding: 1.5rem;
          border-radius: 12px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
          cursor: default;

          opacity: 0;
          transform: translateY(15px);
          transition: opacity 0.6s ease, transform 0.6s ease, box-shadow 0.3s ease;
        }
        .card.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .card:hover {
          transform: translateY(-8px) scale(1.03);
          box-shadow: 0 12px 30px rgba(168, 85, 247, 0.6);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .photo-wrapper {
          width: 120px;
          height: 120px;
          margin: 0 auto 1rem;
          border-radius: 50%;
          overflow: hidden;
          border: 3px solid #a855f7;
          background: #5c1a96;
        }
        .photo-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        h2 {
          margin: 0.5rem 0 0.25rem;
          font-size: 1.3rem;
        }
        h3 {
          margin: 0;
          font-size: 1rem;
          font-weight: 500;
          color: #d8b4fe;
          font-style: italic;
        }
        p {
          font-size: 0.95rem;
          margin-top: 0.75rem;
          line-height: 1.4;
          color: #c4b5fd;
        }

        /* Scroll to top button */
        .scroll-to-top {
          position: fixed;
          bottom: 1.5rem;
          right: 1.5rem;
          background: #a855f7;
          color: white;
          border: none;
          border-radius: 50%;
          width: 44px;
          height: 44px;
          font-size: 1.5rem;
          cursor: pointer;
          box-shadow: 0 4px 10px rgba(168, 85, 247, 0.6);
          transition: background 0.3s;
          z-index: 1000;
        }
        .scroll-to-top:hover,
        .scroll-to-top:focus {
          background: #6b21a8;
          outline: none;
        }

        /* Footer */
        .footer {
          text-align: center;
          padding: 1rem 0 2rem;
          background: #3c1361;
          color: #ddd6fe;
          font-size: 0.9rem;
          border-top: 2px solid #a855f7;
        }
        .footer.dark {
          background: #a855f7;
          color: #3c1361;
          border-top-color: #6b21a8;
        }
        .social-links a {
          color: inherit;
          text-decoration: none;
          font-weight: 600;
          margin: 0 0.25rem;
          transition: color 0.3s;
        }
        .social-links a:hover,
        .social-links a:focus {
          color: #6b21a8;
          outline: none;
        }
      `}</style>
    </>
  );
}
