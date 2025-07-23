import { useEffect, useState } from 'react';
import Link from 'next/link';

function Typewriter({ text, speed = 100 }) {
  const [displayed, setDisplayed] = useState('');
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i === text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);
  return <span>{displayed}</span>;
}

export default function Home() {
  const [showHelp, setShowHelp] = useState(false);

  const projects = [
    {
      name: "Shivang Portfolio", // replaced curly apostrophe with straight one
      desc: 'A classy, professional portfolio website built with React and Next.js.',
      url: 'https://portyfolio-bnfb.vercel.app/',
    },
    {
      name: 'ProjectUcode Chatbot',
      desc: 'An interactive chatbot answering your coding questions.',
      url: null,
    },
    {
      name: 'Game Finder App',
      desc: 'Search and discover new games with cool filters.',
      url: null,
    },
    {
      name: 'Personal Blog',
      desc: 'Share your thoughts with a sleek blog using Markdown.',
      url: null,
    },
    {
      name: 'Weather Dashboard',
      desc: 'Real-time weather data using public APIs.',
      url: null,
    },
  ];

  return (
    <>
      <section style={{ textAlign: 'center', marginTop: '4rem', padding: '0 1rem' }}>
        <h1
          className="glow-text"
          style={{ fontSize: '3rem', maxWidth: '900px', margin: '0 auto', minHeight: '4rem' }}
          aria-label="ProjectUcodeNC."
        >
          <Typewriter text="ProjectUcodeNC " speed={100} />
          <span style={{ color: '#a855f7' }}></span>
        </h1>

        <p style={{ maxWidth: 600, margin: '2rem auto', fontSize: '1.25rem', color: '#ddd6fe' }}>
          🚀 Whether you're new to coding or want to build a portfolio that stands out,
          <br />
          <strong style={{ color: '#c084fc' }}>ProjectUcode</strong> is here to spark your creativity and growth.
        </p>

        <Link href="/resources" legacyBehavior>
          <a className="neon-btn pulse-glow" style={{ textDecoration: 'none' }} aria-label="Explore Resources">
            🌐 Explore Resources
          </a>
        </Link>

        {/* Help Button */}
        <div style={{ marginTop: '2rem' }}>
          <button
            onClick={() => setShowHelp(true)}
            aria-label="Open Help"
            className="neon-btn"
            style={{ padding: '0.8rem 3rem', fontSize: '1.2rem' }}
          >
            ❓ Help
          </button>
        </div>
      </section>

      {/* Card Section */}
      <section
        className="cards-section"
        style={{ marginTop: '4rem', maxWidth: '1000px', marginLeft: 'auto', marginRight: 'auto', padding: '0 1rem' }}
      >
        <div className="card">
          <h3>👩‍💻 Learn to Code</h3>
          <p>Master languages like JavaScript, Python, and more with our beginner-to-advanced lessons.</p>
        </div>
        <div className="card">
          <h3>🤝 Join the Community</h3>
          <p>Connect with like-minded students, mentors, and industry pros to build your network.</p>
        </div>
        <div className="card">
          <h3>🚀 Build Real Projects</h3>
          <p>Apply your skills by creating websites, apps, and tools that solve real problems.</p>
        </div>
      </section>

      {/* New Projects Card Section */}
      <section
        className="projects-card"
        style={{
          marginTop: '3rem',
          maxWidth: '700px',
          marginLeft: 'auto',
          marginRight: 'auto',
          padding: '1.5rem 2rem',
          borderRadius: '1rem',
        }}
      >
        <h2 className="projects-title">🔥 Projects We Will Build Together</h2>
        <p className="projects-intro">
          Dive into exciting projects where you’ll learn coding, design, and deployment skills! Here are some cool projects on our roadmap:
        </p>
        <ul className="project-list">
          {projects.map(({ name, desc, url }) => (
            <li key={name} className="project-item">
              {url ? (
                <a href={url} target="_blank" rel="noopener noreferrer" className="project-link">
                  <strong>{name}</strong>
                </a>
              ) : (
                <strong>{name}</strong>
              )}
              : {desc}
            </li>
          ))}
        </ul>
      </section>

      {/* Footer typewriter */}
      <footer
        style={{
          textAlign: 'center',
          marginTop: '4rem',
          paddingBottom: '2rem',
          color: '#c084fc',
          fontWeight: '600',
          fontSize: '1.1rem',
        }}
      >
        <Typewriter text="Made by Shivang Pat II" speed={120} />
      </footer>

      {/* Help Modal */}
      {showHelp && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="help-title"
          tabIndex={-1}
          onClick={() => setShowHelp(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.75)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1100,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#2a0a54',
              padding: '2rem',
              borderRadius: '12px',
              maxWidth: '450px',
              color: '#ddd6fe',
              boxShadow: '0 0 25px #a855f7',
              textAlign: 'left',
            }}
          >
            <h2 id="help-title" style={{ color: '#c084fc', marginTop: 0 }}>
              Help & Tips
            </h2>
            <p>Welcome to ProjectUcode! Here are some tips to get started:</p>
            <ul>
              <li>Visit the Resources page to use our coding chatbots.</li>
              <li>Check out the Learning Hub for code snippets and quizzes.</li>
              <li>Click outside this box or the button below to close this help.</li>
            </ul>
            <button
              onClick={() => setShowHelp(false)}
              aria-label="Close Help"
              style={{
                marginTop: '1.5rem',
                background: '#9333ea',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1.5rem',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        .glow-text {
          text-shadow: 0 0 10px #c084fc, 0 0 20px #a855f7, 0 0 30px #7c3aed;
          font-weight: 900;
          line-height: 1.2;
        }
        .neon-btn {
          display: inline-block;
          background-color: #9333ea;
          color: white;
          padding: 0.8rem 2rem;
          border-radius: 9999px;
          font-weight: bold;
          font-size: 1.2rem;
          box-shadow: 0 0 15px #c084fc;
          transition: all 0.3s ease;
          cursor: pointer;
          user-select: none;
          margin-top: 1rem;
        }
        .neon-btn:hover {
          box-shadow: 0 0 20px #f0abfc, 0 0 40px #c084fc, 0 0 60px #7c3aed;
          transform: scale(1.1);
        }
        .pulse-glow {
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0% {
            box-shadow: 0 0 10px #c084fc;
          }
          50% {
            box-shadow: 0 0 30px #c084fc;
          }
          100% {
            box-shadow: 0 0 10px #c084fc;
          }
        }

        /* Cards Section */
        .cards-section {
          display: flex;
          justify-content: space-between;
          gap: 1.5rem;
          flex-wrap: wrap;
        }
        .card {
          flex: 1 1 280px;
          background: linear-gradient(135deg, #2a0a54, #4b0082);
          border-radius: 1rem;
          padding: 2rem 1.5rem;
          box-shadow: 0 4px 15px rgba(124, 58, 173, 0.6), 0 0 20px rgba(160, 85, 247, 0.4);
          color: #ddd6fe;
          text-align: center;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .card:hover {
          transform: translateY(-8px);
          box-shadow: 0 10px 30px rgba(124, 58, 173, 0.8), 0 0 40px rgba(160, 85, 247, 0.7);
        }
        .card h3 {
          margin-bottom: 1rem;
          color: #c084fc;
          font-size: 1.6rem;
          text-shadow: 0 0 10px #c084fc;
        }
        .card p {
          font-size: 1.1rem;
          line-height: 1.5;
          color: #e0d7ffcc;
        }

        /* Projects Card Section */
        .projects-card {
          background: #1e0a4f;
          color: #e0c8ff;
          box-shadow: 0 4px 15px rgba(124, 58, 173, 0.6);
        }
        .projects-title {
          font-size: 1.8rem;
          font-weight: 900;
          text-align: center;
          color: #c084fc;
          margin-bottom: 0.75rem;
          text-shadow: 0 0 8px #c084fc, 0 0 20px #7c3aed;
        }
        .projects-intro {
          font-size: 1.1rem;
          margin-bottom: 1rem;
          text-align: center;
          color: #d8b4fe;
          line-height: 1.4;
        }
        .project-list {
          list-style: none;
          padding: 0;
          margin: 0 auto;
          max-width: 600px;
        }
        .project-item {
          margin-bottom: 0.9rem;
          font-size: 1rem;
          transition: color 0.3s ease;
          color: #d8b4fe;
        }
        .project-item:hover {
          color: #f0abfc;
          cursor: pointer;
          text-shadow: 0 0 8px #c084fc;
        }
        .project-link {
          color: #a855f7;
          text-decoration: none;
        }
        .project-link:hover {
          text-decoration: underline;
          color: #f0abfc;
          text-shadow: 0 0 10px #c084fc;
        }

        @media (max-width: 900px) {
          .cards-section {
            flex-direction: column;
            align-items: center;
          }
          .card {
            max-width: 90%;
          }
          .project-list {
            max-width: 100%;
          }
        }
      `}</style>
    </>
  );
}
