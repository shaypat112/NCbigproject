export default function About() {
  return (
    <>
      <section style={{ textAlign: 'center', marginTop: '4rem', padding: '0 1rem' }}>
        <h1 className="glow-text" style={{ fontSize: '3rem', marginBottom: '1rem' }}>
          About <span style={{ color: '#a855f7' }}>ProjectUcode</span>
        </h1>
        <p
          style={{
            maxWidth: 700,
            margin: '0 auto 3rem auto',
            fontSize: '1.25rem',
            color: '#ddd6fe',
            lineHeight: '1.6',
            textShadow:
              '0 0 10px #c084fc, 0 0 20px #a855f7, 0 0 30px #7c3aed',
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
          <p>Inspire and equip students with the skills and confidence to thrive in the tech world and lead positive change.</p>
        </div>
        <div className="card">
          <h3>🌐 Community</h3>
          <p>Connect with passionate peers, supportive mentors, and industry pros who share your drive and curiosity.</p>
        </div>
        <div className="card">
          <h3>🚀 Growth</h3>
          <p>Access curated workshops, resources, and hands-on projects to accelerate your learning journey.</p>
        </div>
        <div className="card">
          <h3>🎯 Vision</h3>
          <p>Build a future where every student has the opportunity to create, innovate, and lead through technology.</p>
        </div>
      </section>

      {/* Call to action */}
      <section style={{ textAlign: 'center', marginTop: '3rem' }}>
        <a href="/officerapps" className="neon-btn pulse-glow" style={{ textDecoration: 'none', fontSize: '1.3rem' }}>
          🌟 Join Us & Lead the Future
        </a>
      </section>

      <style jsx>{`
        .glow-text {
          font-weight: 900;
          line-height: 1.2;
          text-shadow:
            0 0 10px #c084fc,
            0 0 20px #a855f7,
            0 0 30px #7c3aed;
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
