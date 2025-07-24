import { useEffect, useState, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';

function Typewriter({ text, speed = 90 }) {
  const [displayed, setDisplayed] = useState('');
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed((prev) => text.slice(0, i + 1));
      i++;
      if (i === text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);
  return <span>{displayed}<span className="blinking-cursor">|</span></span>;
}

export default function Home() {
  const [showHelp, setShowHelp] = useState(false);
  const [dark, setDark] = useState(true);
  const projectsRef = useRef(null);
  const [showTop, setShowTop] = useState(false);

  const projects = [
    { name: 'Shivang Portfolio', desc: 'A classy, professional portfolio.', url: 'https://portyfolio-bnfb.vercel.app/' },
    { name: 'ProjectUcode Chatbot', desc: 'An interactive chatbot for code help.', url: null },
    { name: 'Game Finder App', desc: 'Discover games using filters.', url: null },
    { name: 'Personal Blog', desc: 'Blog using Markdown & Next.js.', url: null },
    { name: 'Weather Dashboard', desc: 'Live weather data using APIs.', url: null },
  ];

  // Scroll to projects
  const scrollToProjects = () => {
    projectsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Show scroll-to-top
  useEffect(() => {
    const onScroll = () => {
      setShowTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Keyboard shortcut: H opens Help
  useEffect(() => {
    const handler = (e) => {
      if (e.key.toLowerCase() === 'h') setShowHelp(true);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <>
      <Head>
        <title>ProjectUcodeNC | Learn to Code</title>
        <meta name="description" content="Interactive tutorials for kids learning to code." />
        <meta property="og:title" content="ProjectUcodeNC" />
        <meta property="og:description" content="Learn by building projects. Code your future!" />
        <meta property="og:image" content="/images/cover.png" />
      </Head>

      {/* Skip Link for Accessibility */}
      <a href="#main-content" className="skip-link">Skip to Content</a>

      <main id="main-content">
        <section className={`hero ${dark ? 'dark' : 'light'}`}>
          <button onClick={() => setDark(!dark)} className="toggle-theme" aria-label="Toggle Theme">
            {dark ? '🌞' : '🌙'}
          </button>

          <h1 className="glow-text">
            <Typewriter text="ProjectUcodeNC" speed={120} />
          </h1>
          <p className="subtitle">
            🚀 Beginner-friendly tutorials to master HTML, CSS, JS & Python by building real projects!
          </p>

          <div className="buttons">
            <Link href="/resources" legacyBehavior>
              <a className="neon-btn pulse-glow" title="Go to coding resources">🌐 Resources</a>
            </Link>
            <button onClick={scrollToProjects} className="neon-btn" title="Scroll to projects">🔻 Projects</button>
            <button onClick={() => setShowHelp(true)} className="neon-btn" title="Shortcut: H key">❓ Help</button>
          </div>
        </section>

        {/* Card Highlights */}
        <section className="cards-section fade-in">
          <div className="card"><h3>👩‍💻 Learn to Code</h3><p>From scratch to full-stack dev. Start today!</p></div>
          <div className="card"><h3>🤝 Join the Community</h3><p>Collaborate, share, and grow together.</p></div>
          <div className="card"><h3>🚀 Build Real Projects</h3><p>Code websites, apps, games & tools.</p></div>
        </section>

        {/* Projects */}
        <section ref={projectsRef} className="projects-card fade-in">
          <h2>🔥 Projects We Will Build Together</h2>
          <ul className="project-list">
            {projects.map(({ name, desc, url }) => (
              <li key={name} className="project-item">
                {url ? (
                  <a href={url} target="_blank" rel="noopener noreferrer" className="project-link">{name}</a>
                ) : name}
                : {desc}
              </li>
            ))}
          </ul>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <Typewriter text="Made with 💜 by Shivang Pat II" speed={90} />
      </footer>

      {/* Help Modal */}
      {showHelp && (
        <div className="modal" onClick={() => setShowHelp(false)} role="dialog" aria-modal="true">
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>💡 Help & Tips</h2>
            <ul>
              <li>Use the navigation to find tutorials and projects.</li>
              <li>Click “Projects” to explore what we’ll build.</li>
              <li>Press <strong>H</strong> anytime to reopen this modal.</li>
            </ul>
            <button onClick={() => setShowHelp(false)} className="neon-btn">Close</button>
          </div>
        </div>
      )}

      {/* Back to Top */}
      {showTop && (
        <button className="back-to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top">
          ⬆️
        </button>
      )}

      {/* Styles */}
      <style jsx>{`
        .skip-link {
          position: absolute;
          left: -999px;
          top: auto;
          width: 1px;
          height: 1px;
          overflow: hidden;
          z-index: -999;
        }
        .skip-link:focus {
          position: static;
          width: auto;
          height: auto;
          background: #fff;
          padding: 1rem;
          z-index: 1000;
        }
        .hero {
          text-align: center;
          padding: 4rem 1rem;
        }
        .dark {
          background: radial-gradient(circle, #1e0a3f, #0f051d);
          color: #fff;
        }
        .light {
          background: #f3e8ff;
          color: #222;
        }
        .toggle-theme {
          position: absolute;
          right: 1rem;
          top: 1rem;
          background: transparent;
          border: none;
          font-size: 1.8rem;
          cursor: pointer;
        }
        .glow-text {
          font-size: 3rem;
          font-weight: 900;
          text-shadow: 0 0 12px #c084fc, 0 0 25px #9333ea;
        }
        .blinking-cursor {
          animation: blink 1s step-start infinite;
        }
        @keyframes blink {
          50% { opacity: 0; }
        }
        .subtitle {
          margin-top: 1rem;
          font-size: 1.2rem;
        }
        .buttons {
          margin-top: 2rem;
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }
        .cards-section, .projects-card {
          max-width: 900px;
          margin: 4rem auto;
          padding: 2rem;
        }
        .card {
          background: #2a0a54;
          padding: 1.5rem;
          border-radius: 1rem;
          text-align: center;
          box-shadow: 0 0 15px #a855f7;
        }
        .project-list {
          list-style: none;
          padding: 0;
        }
        .project-item {
          margin: 0.75rem 0;
        }
        .project-link {
          color: #a855f7;
          text-decoration: none;
        }
        .project-link:hover {
          text-decoration: underline;
        }
        .footer {
          text-align: center;
          padding: 2rem;
          background: #0f051d;
          color: #ddd6fe;
        }
        .modal {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.8);
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .modal-content {
          background: #2a0a54;
          padding: 2rem;
          border-radius: 1rem;
          color: #fff;
          max-width: 400px;
        }
       .back-to-top {
  position: fixed;
  bottom: 1.5rem;
  right: 5.5rem; /* just to the left of chatbot */
  font-size: 1.8rem;
  background: #9333ea;
  border: none;
  color: white;
  padding: 0.6rem 1rem;
  border-radius: 50%;
  box-shadow: 0 0 15px #c084fc;
  cursor: pointer;
  z-index: 1000;
}

        .fade-in {
          animation: fadeIn 1.2s ease-in;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .neon-btn {
          background: #9333ea;
          color: white;
          padding: 0.7rem 1.8rem;
          border: none;
          border-radius: 999px;
          cursor: pointer;
          font-size: 1.1rem;
          box-shadow: 0 0 12px #c084fc;
        }
        .neon-btn:hover {
          box-shadow: 0 0 25px #f0abfc;
          transform: scale(1.05);
        }
        .pulse-glow {
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0% { box-shadow: 0 0 10px #c084fc; }
          50% { box-shadow: 0 0 25px #f0abfc; }
          100% { box-shadow: 0 0 10px #c084fc; }
        }
      `}</style>
    </>
  );
}
