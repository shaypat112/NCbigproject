import Link from 'next/link';

export default function About() {
  return (
    <>
      <section style={{ textAlign: 'center', marginTop: '4rem', padding: '0 1rem' }}>
        <h1 className="typewriter-title">
          About <span style={{ color: '#a855f7' }}>ProjectUcode</span>
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#d8b4fe', marginBottom: '2rem' }}>
          Empowering students to build, learn, and lead through code.
        </p>
        <p
          style={{
            maxWidth: 700,
            margin: '0 auto 3rem auto',
            fontSize: '1.25rem',
            color: '#ddd6fe',
            lineHeight: '1.6',
            textShadow: '0 0 4px #c084fc',
          }}
        >
          ProjectUcode is a vibrant student-led tech community empowering creators through coding, collaboration,
          and leadership. We provide resources, mentorship, and real-world projects to fuel your growth and creativity.
        </p>
      </section>

      {/* Four glowing card sections */}
      <section className="cards-section">
        <div className="card">
          <h3>💡 Our Mission</h3>
          <p>We aim to inspire students from all backgrounds to explore tech, discover their passions, and gain real-world experience through engaging coding programs and leadership opportunities.</p>
        </div>
        <div className="card">
          <h3>🌐 Community</h3>
          <p>ProjectUcode connects you with passionate peers, mentors, and industry professionals who support your goals. Collaborate on fun projects, hackathons, and coding events.</p>
        </div>
        <div className="card">
          <h3>🚀 Growth</h3>
          <p>With hands-on tutorials, beginner-friendly challenges, and curated content, we help you go from learning your first line of code to building websites, apps, and more!</p>
        </div>
        <div className="card">
          <h3>🎯 Vision</h3>
          <p>We believe the future belongs to creators. ProjectUcode equips students with tools, teamwork, and the confidence to solve real problems with technology and make an impact.</p>
        </div>
      </section>

      {/* Call to action */}
      <section style={{ textAlign: 'center', marginTop: '3rem' }}>
        <Link href="/officerapps" legacyBehavior>
          <a className="neon-btn pulse-glow" style={{ textDecoration: 'none', fontSize: '1.3rem' }}>
            🌟 Join Us & Lead the Future
          </a>
        </Link>
      </section>

      <style jsx>{`
        .typewriter-title {
          font-size: 3.5rem;
          font-weight: bold;
          white-space: nowrap;
          overflow: hidden;
          border-right: 3px solid #a855f7;
          width: fit-content;
          margin: 0 auto 1rem auto;
          animation: typing 3.5s steps(40, end), blink-caret 0.75s step-end infinite;
        }

        @keyframes typing {
          from { width: 0 }
          to { width: 100% }
        }

        @keyframes blink-caret {
          0%, 100% { border-color: transparent }
          50% { border-color: #a855f7; }
        }

        .cards-section {
          display: flex;
          justify-content: center;
          gap: 2rem;
          flex-wrap: wrap;
          max-width: 1000px;
          margin: auto;
          padding: 0 1rem;
          margin-top: 2rem;
        }

        .card {
          background: linear-gradient(135deg, #2a0a54, #4b0082);
          border-radius: 1rem;
          padding: 2rem 1.5rem;
          box-shadow:
            0 0 15px #7c3aed,
            0 0 40px #a855f7,
            0 0 60px #c084fc;
          color: #ddd6fe;
          text-align: center;
          flex: 1 1 220px;
          max-width: 280px;
          transition: transform 0.35s ease, box-shadow 0.35s ease;
          user-select: none;
          cursor: default;
        }

        .card:hover {
          transform: translateY(-12px) scale(1.05);
          box-shadow:
            0 0 40px #7c3aed,
            0 0 100px #a855f7,
            0 0 140px #c084fc;
        }

        .card h3 {
          margin-bottom: 1rem;
          color: #c084fc;
          font-size: 1.6rem;
          text-shadow: 0 0 12px #c084fc;
        }

        .card p {
          font-size: 1.1rem;
          line-height: 1.5;
          color: #e0d7ffcc;
        }

        .neon-btn {
          display: inline-block;
          background-color: #9333ea;
          color: white;
          padding: 0.9rem 2.5rem;
          border-radius: 9999px;
          font-weight: 700;
          font-size: 1.3rem;
          box-shadow: 0 0 20px #c084fc;
          transition: all 0.4s ease;
          cursor: pointer;
          user-select: none;
        }

        .neon-btn:hover {
          box-shadow:
            0 0 35px #f0abfc,
            0 0 70px #c084fc,
            0 0 100px #7c3aed;
          transform: scale(1.12);
        }

        .pulse-glow {
          animation: pulse 2.5s infinite;
        }

        @keyframes pulse {
          0%, 100% {
            box-shadow: 0 0 20px #c084fc;
          }
          50% {
            box-shadow: 0 0 60px #c084fc;
          }
        }

        @media (max-width: 900px) {
          .cards-section {
            flex-direction: column;
            align-items: center;
          }

          .card {
            max-width: 90%;
            margin-bottom: 1.8rem;
          }
        }
      `}</style>
    </>
  );
}
