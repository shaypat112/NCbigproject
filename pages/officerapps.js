export default function OfficerApps() {
  return (
    <>
      <section style={{ textAlign: 'center', marginTop: '4rem', padding: '0 1rem' }}>
        <h1 className="glow-text" style={{ fontSize: '3rem', marginBottom: '1rem' }}>
          Join <span style={{ color: '#a855f7' }}>ProjectUcode</span>
        </h1>
        <p
          style={{
            fontSize: '1.25rem',
            color: '#ddd6fe',
            maxWidth: 700,
            margin: '0 auto 3rem auto',
            lineHeight: 1.6,
            textShadow: '0 0 10px #c084fc, 0 0 20px #a855f7',
          }}
        >
          Ready to step up your game? Whether you want to lead as an officer or contribute as a member,
          apply below and become a part of our vibrant community!
        </p>
      </section>

      <section className="cards-section">
        <div className="card officer-card">
          <h2>🚀 Officer Applications</h2>
          <p>Lead, organize, and inspire. Officers shape the future of ProjectUcode by guiding projects and community efforts.</p>
          <a href="/officerapps/form" className="btn-glow" target="_blank" rel="noopener noreferrer">
            Apply as Officer
          </a>
        </div>

        <div className="card member-card">
          <h2>🤝 Member Applications</h2>
          <p>Join as a member to collaborate, learn, and grow alongside a passionate community of creators and coders.</p>
          <a href="/memberapps/form" className="btn-glow" target="_blank" rel="noopener noreferrer">
            Apply as Member
          </a>
        </div>
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
          gap: 2.5rem;
          flex-wrap: wrap;
          max-width: 900px;
          margin: 0 auto 4rem auto;
          padding: 0 1rem;
        }

        .card {
          background: linear-gradient(135deg, #2a0a54, #4b0082);
          border-radius: 1.25rem;
          padding: 2.5rem 2rem;
          box-shadow:
            0 0 25px #7c3aed,
            0 0 60px #a855f7,
            0 0 90px #c084fc;
          color: #ddd6fe;
          text-align: center;
          flex: 1 1 320px;
          max-width: 350px;
          user-select: none;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .card:hover {
          transform: translateY(-12px);
          box-shadow:
            0 0 50px #7c3aed,
            0 0 120px #a855f7,
            0 0 150px #c084fc;
        }

        .card h2 {
          font-size: 2rem;
          color: #c084fc;
          margin-bottom: 1rem;
          text-shadow: 0 0 15px #c084fc;
        }

        .card p {
          font-size: 1.1rem;
          line-height: 1.6;
          margin-bottom: 2.5rem;
          color: #e0d7ffcc;
        }

        .btn-glow {
          display: inline-block;
          padding: 0.9rem 2.5rem;
          font-weight: 700;
          font-size: 1.2rem;
          color: white;
          background-color: #9333ea;
          border-radius: 9999px;
          box-shadow:
            0 0 20px #c084fc,
            0 0 40px #a855f7,
            0 0 60px #7c3aed;
          text-decoration: none;
          transition: box-shadow 0.3s ease, transform 0.3s ease;
          user-select: none;
        }

        .btn-glow:hover {
          box-shadow:
            0 0 40px #f0abfc,
            0 0 80px #c084fc,
            0 0 120px #7c3aed;
          transform: scale(1.1);
        }

        @media (max-width: 900px) {
          .cards-section {
            flex-direction: column;
            align-items: center;
          }

          .card {
            max-width: 90%;
            margin-bottom: 2rem;
          }
        }
      `}</style>
    </>
  );
}
