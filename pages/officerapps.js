import { useState } from 'react';

export default function OfficerApps() {
  const [openSections, setOpenSections] = useState({
    journey: false,
    success: false,
    video: false,
    join: false,
    req: false,
    deadlines: false,
    faq: false,
    contact: false,
    events: false,
    resources: false,
    challenges: false,
  });

  const toggle = (key) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <>
      {/* Hero Section */}
      <section style={{ textAlign: 'center', marginTop: '4rem', padding: '0 1rem' }}>
        <h1
          style={{
            fontSize: '3rem',
            marginBottom: '1rem',
            color: '#c084fc',
            textShadow: '0 0 8px #7c3aed',
            fontWeight: 800,
          }}
        >
          Join <span style={{ color: '#a855f7' }}>ProjectUcode</span>
        </h1>
        <p
          style={{
            fontSize: '1.25rem',
            color: '#ddd6fe',
            maxWidth: 700,
            margin: '0 auto 3rem auto',
            lineHeight: 1.6,
            textShadow: '0 0 5px #c084fc',
          }}
        >
          Ready to step up your game? Whether you want to lead as an officer or contribute as a member,
          apply below and become a part of our vibrant community!
        </p>
      </section>

      {/* Application Cards */}
      <section className="cards-section">
        <div className="card officer-card">
          <h2>🚀 Officer Applications</h2>
          <p>
            Lead, organize, and inspire. Officers shape the future of ProjectUcode by guiding projects and
            community efforts.
          </p>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSfgzG1rNDSrS-BA1JqTaSLBOxQj77-sD5ZqIod9wYCFzrlKnQ/viewform?usp=header"
            className="btn-glow"
            target="_blank"
            rel="noopener noreferrer"
          >
            Apply as Officer
          </a>
        </div>

        <div className="card member-card">
          <h2>🤝 Member Applications</h2>
          <p>Join as a member to collaborate, learn, and grow alongside a passionate community of creators and coders.</p>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLScfDB8fY0NJ3jJUT4RgoPoJuqabFMNIjGxzC3byJeanrrUWzQ/viewform?usp=header"
            className="btn-glow"
            target="_blank"
            rel="noopener noreferrer"
          >
            Apply as Member
          </a>
        </div>
      </section>

      {/* Animated Info Cards */}
      <section className="info-section">
        {/* Your Journey */}
        <div
          className={`animated-card ${openSections.journey ? 'open' : ''}`}
          onClick={() => toggle('journey')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') toggle('journey'); }}
          aria-expanded={openSections.journey}
          aria-controls="journey-content"
        >
          <h2>🛤 Your Journey at ProjectUcode</h2>
          <div id="journey-content" className="content">
            <ul>
              <li><strong>Step 1:</strong> Apply as a member or officer</li>
              <li><strong>Step 2:</strong> Join our welcome orientation</li>
              <li><strong>Step 3:</strong> Work on your first coding project</li>
              <li><strong>Step 4:</strong> Lead a workshop or tutorial</li>
              <li><strong>Step 5:</strong> Become a mentor or team leader!</li>
            </ul>
          </div>
        </div>

        {/* Success Stories */}
        <div
          className={`animated-card ${openSections.success ? 'open' : ''}`}
          onClick={() => toggle('success')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') toggle('success'); }}
          aria-expanded={openSections.success}
          aria-controls="success-content"
        >
          <h2>🌟 Member Success Stories</h2>
          <div id="success-content" className="content">
            <blockquote>
              “Before joining ProjectUcode, I had never written a line of code. Now, I’m building full websites with a team!” —{' '}
              <strong>Anika S., 9th Grade</strong>
            </blockquote>
            <blockquote>
              “Being an officer taught me leadership and confidence. It’s the best thing I’ve done in high school.” —{' '}
              <strong>Rahul P., 11th Grade</strong>
            </blockquote>
          </div>
        </div>

        {/* Video */}
        <div
          className={`animated-card ${openSections.video ? 'open' : ''}`}
          onClick={() => toggle('video')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') toggle('video'); }}
          aria-expanded={openSections.video}
          aria-controls="video-content"
        >
          <h2>🎥 What is ProjectUcode?</h2>
          <div id="video-content" className="content" style={{ textAlign: 'center' }}>
            <iframe
              width="90%"
              height="315"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="ProjectUcode Introduction"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* Why Join */}
        <div
          className={`animated-card ${openSections.join ? 'open' : ''}`}
          onClick={() => toggle('join')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') toggle('join'); }}
          aria-expanded={openSections.join}
          aria-controls="join-content"
        >
          <h2>🎓 Why Join?</h2>
          <div id="join-content" className="content">
            <ul>
              <li>Boost your leadership & tech skills</li>
              <li>Earn volunteer hours & awards</li>
              <li>Work on real community projects</li>
            </ul>
          </div>
        </div>

        {/* Requirements */}
        <div
          className={`animated-card ${openSections.req ? 'open' : ''}`}
          onClick={() => toggle('req')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') toggle('req'); }}
          aria-expanded={openSections.req}
          aria-controls="req-content"
        >
          <h2>🛠 Requirements</h2>
          <div id="req-content" className="content">
            <ul>
              <li>Be in grades 6–12</li>
              <li>Have a basic interest in coding/tech</li>
              <li>Commit 2–4 hours per month</li>
            </ul>
          </div>
        </div>

        {/* Deadlines */}
        <div
          className={`animated-card ${openSections.deadlines ? 'open' : ''}`}
          onClick={() => toggle('deadlines')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') toggle('deadlines'); }}
          aria-expanded={openSections.deadlines}
          aria-controls="deadlines-content"
        >
          <h2>⏰ Deadlines</h2>
          <div id="deadlines-content" className="content">
            <p>
              Applications close: <strong>August 30, 2025</strong>. Don’t miss your chance to join!
            </p>
          </div>
        </div>

        {/* FAQ */}
        <div
          className={`animated-card ${openSections.faq ? 'open' : ''}`}
          onClick={() => toggle('faq')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') toggle('faq'); }}
          aria-expanded={openSections.faq}
          aria-controls="faq-content"
        >
          <h2>❓ Frequently Asked</h2>
          <div id="faq-content" className="content">
            <details open>
              <summary>Do I need to be good at coding?</summary>
              <p>No! We welcome all levels, even beginners.</p>
            </details>
            <details>
              <summary>Can I apply for both roles?</summary>
              <p>Yes, but we’ll consider you for the best fit.</p>
            </details>
          </div>
        </div>

        {/* Contact */}
        <div
          className={`animated-card ${openSections.contact ? 'open' : ''}`}
          onClick={() => toggle('contact')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') toggle('contact'); }}
          aria-expanded={openSections.contact}
          aria-controls="contact-content"
        >
          <h2>📧 Still have questions?</h2>
          <div id="contact-content" className="content">
            <p>
              Email us at{' '}
              <a href="mailto:projectucodenc@gmail.com">projectucodenc@gmail.com</a>
            </p>
          </div>
        </div>

        {/* New Feature: Community Events */}
        <div
          className={`animated-card ${openSections.events ? 'open' : ''}`}
          onClick={() => toggle('events')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') toggle('events'); }}
          aria-expanded={openSections.events}
          aria-controls="events-content"
        >
          <h2>🎉 Community Events</h2>
          <div id="events-content" className="content">
            <p>Join monthly meetups, hackathons, and coding jams to connect and learn with fellow members.</p>
          </div>
        </div>

        {/* New Feature: Exclusive Resources */}
        <div
          className={`animated-card ${openSections.resources ? 'open' : ''}`}
          onClick={() => toggle('resources')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') toggle('resources'); }}
          aria-expanded={openSections.resources}
          aria-controls="resources-content"
        >
          <h2>📚 Exclusive Resources</h2>
          <div id="resources-content" className="content">
            <p>Access curated tutorials, code samples, and guides exclusive to ProjectUcode members.</p>
          </div>
        </div>

        {/* New Feature: Tech Challenges */}
        <div
          className={`animated-card ${openSections.challenges ? 'open' : ''}`}
          onClick={() => toggle('challenges')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') toggle('challenges'); }}
          aria-expanded={openSections.challenges}
          aria-controls="challenges-content"
        >
          <h2>💻 Tech Challenges</h2>
          <div id="challenges-content" className="content">
            <p>Participate in coding challenges designed to build skills and win cool prizes.</p>
          </div>
        </div>
      </section>

      <style jsx>{`
        /* Your styles unchanged from before */
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
          box-shadow: 0 0 25px #7c3aed, 0 0 60px #a855f7;
          color: #ddd6fe;
          text-align: center;
          flex: 1 1 320px;
          max-width: 350px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          user-select: none;
        }

        .card:hover {
          transform: translateY(-12px);
          box-shadow: 0 0 50px #7c3aed, 0 0 120px #a855f7;
        }

        .card h2 {
          font-size: 2rem;
          color: #c084fc;
          margin-bottom: 1rem;
          text-shadow: 0 0 10px #c084fc;
        }

        .card p {
          font-size: 1.1rem;
          margin-bottom: 2rem;
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
          box-shadow: 0 0 20px #c084fc;
          text-decoration: none;
          transition: box-shadow 0.3s ease, transform 0.3s ease;
          user-select: none;
        }

        .btn-glow:hover {
          box-shadow: 0 0 40px #f0abfc, 0 0 80px #c084fc;
          transform: scale(1.1);
        }

        .info-section {
          max-width: 800px;
          margin: 2rem auto;
          padding: 0 1rem;
          color: #ddd6fe;
        }

        .info-section h2 {
          font-size: 1.75rem;
          margin-bottom: 1rem;
          color: #a78bfa;
          user-select: none;
        }

        /* Animated Card Styles */
        .animated-card {
          background: linear-gradient(135deg, #2a0a54, #4b0082);
          border-radius: 1.25rem;
          box-shadow: 0 0 25px #7c3aed, 0 0 60px #a855f7;
          color: #ddd6fe;
          margin-bottom: 1.5rem;
          cursor: pointer;
          padding: 1.5rem 2rem;
          overflow: hidden;
          transition: box-shadow 0.4s ease;
          user-select: none;
        }
        .animated-card:hover {
          box-shadow: 0 0 50px #7c3aed, 0 0 120px #a855f7;
        }

        .animated-card h2 {
          font-size: 2rem;
          color: #c084fc;
          margin: 0;
          user-select: none;
        }

        .animated-card .content {
          max-height: 0;
          opacity: 0;
          overflow: hidden;
          transition: max-height 0.6s ease, opacity 0.6s ease;
          padding-left: 1.5rem;
          margin-top: 1rem;
          color: #e0d7ffcc;
        }

        .animated-card.open .content {
          max-height: 1000px; /* plenty for content */
          opacity: 1;
        }

        .animated-card ul {
          list-style: disc;
          padding-left: 1.5rem;
          margin: 0;
        }

        .animated-card blockquote {
          border-left: 4px solid #a855f7;
          padding-left: 1rem;
          font-style: italic;
          margin: 1rem 0;
        }

        .info-section a {
          color: #a855f7;
          text-decoration: underline;
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
