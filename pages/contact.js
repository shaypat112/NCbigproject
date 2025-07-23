import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in all fields.');
      return;
    }

    // Fake submit
    setSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  return (
    <>
      <section style={{ textAlign: 'center', marginTop: '4rem', padding: '0 1rem' }}>
        <h1 className="glow-text" style={{ fontSize: '3rem', marginBottom: '1rem' }}>
          Contact <span style={{ color: '#a855f7' }}>ProjectUcode</span>
        </h1>
        <p
          style={{
            fontSize: '1.25rem',
            color: '#ddd6fe',
            maxWidth: 600,
            margin: '0 auto 2rem auto',
            lineHeight: 1.6,
            textShadow: '0 0 10px #c084fc, 0 0 20px #a855f7',
          }}
        >
          Have questions or want to get involved? Reach out to us anytime!
        </p>

        <div className="contact-info">
          <p>
            📧 Email:{' '}
            <a href="mailto:hello.projectucode@example.com" className="link">
              hello.projectucode@example.com
            </a>
          </p>
          <p>
            📸 Instagram:{' '}
            <a
              href="https://instagram.com/projectUcode"
              target="_blank"
              rel="noopener noreferrer"
              className="link"
            >
              @projectUcode
            </a>{' '}
            &amp;{' '}
            <a
              href="https://instagram.com/projectUcodeNC"
              target="_blank"
              rel="noopener noreferrer"
              className="link"
            >
              @projectUcodeNC
            </a>
          </p>
        </div>

        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            autoComplete="name"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete="email"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            required
          />
          <button type="submit" disabled={submitted}>
            {submitted ? 'Message Sent!' : 'Send Message'}
          </button>
        </form>
      </section>

      <style jsx>{`
        .glow-text {
          font-weight: 900;
          line-height: 1.2;
          text-shadow: 0 0 10px #c084fc, 0 0 20px #a855f7, 0 0 30px #7c3aed;
        }
        .contact-info {
          font-size: 1.2rem;
          color: #ddd6fe;
          text-shadow: 0 0 8px #a855f7;
          max-width: 450px;
          margin: 0 auto 3rem auto;
          line-height: 1.6;
        }
        .contact-info p {
          margin: 1.25rem 0;
        }
        .link {
          color: #c084fc;
          font-weight: 600;
          text-decoration: none;
          transition: color 0.3s ease, text-shadow 0.3s ease;
          text-shadow: 0 0 5px #c084fc;
        }
        .link:hover {
          color: #f0abfc;
          text-shadow: 0 0 12px #f0abfc, 0 0 24px #c084fc, 0 0 36px #a855f7;
        }

        /* Contact form styling */
        .contact-form {
          max-width: 480px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .contact-form input,
        .contact-form textarea {
          background: #2a0a54;
          border: 2px solid #7c3aed;
          border-radius: 8px;
          padding: 0.75rem 1rem;
          font-size: 1rem;
          color: #ddd6fe;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
          resize: vertical;
        }
        .contact-form input:focus,
        .contact-form textarea:focus {
          outline: none;
          border-color: #a855f7;
          box-shadow: 0 0 8px #a855f7;
          background: #3b1a70;
        }

        button {
          background-color: #9333ea;
          color: white;
          font-weight: 700;
          font-size: 1.1rem;
          padding: 0.85rem 1rem;
          border: none;
          border-radius: 9999px;
          cursor: pointer;
          box-shadow: 0 0 20px #c084fc;
          transition: all 0.3s ease;
          user-select: none;
        }
        button:hover:not(:disabled) {
          box-shadow: 0 0 40px #f0abfc, 0 0 60px #a855f7;
          transform: scale(1.05);
        }
        button:disabled {
          opacity: 0.7;
          cursor: default;
          box-shadow: none;
          transform: none;
        }

        @media (max-width: 500px) {
          .contact-form {
            max-width: 100%;
          }
        }
      `}</style>
    </>
  );
}
