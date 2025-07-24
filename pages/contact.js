import { useState, useEffect, useRef } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '', honey: '' });
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const messageRef = useRef(null);
  const fullText = 'Contact Us';
  const [typedText, setTypedText] = useState('');
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [emailWarning, setEmailWarning] = useState('');

  // Typewriter Effect
  useEffect(() => {
    const timeout = setTimeout(() => {
      setTypedText(fullText.slice(0, index));
      if (!isDeleting && index < fullText.length) {
        setIndex((prev) => prev + 1);
      } else if (isDeleting && index > 0) {
        setIndex((prev) => prev - 1);
      } else {
        setIsDeleting((prev) => !prev);
      }
    }, isDeleting ? 100 : 180);
    return () => clearTimeout(timeout);
  }, [index, isDeleting]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Email checker
    if (name === 'email') {
      const domain = value.split('@')[1];
      if (!value.includes('@') || !domain || domain.length < 3) {
        setEmailWarning('Invalid email domain.');
      } else {
        setEmailWarning('');
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, message, honey } = formData;
    if (honey) return; // honeypot trap
    if (!name || !email || !message) {
      alert('Please fill in all fields.');
      return;
    }

    setSubmitted(true);
    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '', honey: '' });
    }, 2500);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText('hello.projectucode@example.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {showSuccess && (
        <div className="success-overlay">
          <div className="checkmark">✅</div>
          <p>Message Sent Successfully!</p>
        </div>
      )}

      <section style={{ textAlign: 'center', marginTop: '4rem', padding: '0 1rem' }}>
        <h1 className="glow-text">{typedText}</h1>
        <p className="subheading">Have questions or want to get involved? Reach out to us anytime!</p>

        <div className="contact-info">
          <p>
            📧 Email: <span className="link" onClick={handleCopy}>hello.projectucode@example.com</span>
            {copied && <span className="copy-message">✓ Copied!</span>}
          </p>
          <p>
            📸 Instagram: <a className="link" href="https://instagram.com/projectUcode" target="_blank">@projectUcode</a> &amp; <a className="link" href="https://instagram.com/projectUcodeNC" target="_blank">@projectUcodeNC</a>
          </p>
        </div>

        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
          {emailWarning && <div className="warning">{emailWarning}</div>}
          <input type="text" name="honey" style={{ display: 'none' }} value={formData.honey} onChange={handleChange} />
          <textarea
            ref={messageRef}
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            maxLength={500}
            required
          />
          <div className="char-count" style={{ color: formData.message.length > 450 ? 'red' : '#c084fc' }}>
            {formData.message.length}/500
          </div>
          <button type="submit" disabled={submitted}>
            {submitted ? '✅ Sent!' : 'Send Message'}
          </button>
        </form>
      </section>

      <style jsx>{`
        .glow-text {
          font-size: 2.75rem;
          font-weight: 900;
          color: #c084fc;
          text-shadow: 0 0 12px #a855f7, 0 0 24px #9333ea;
        }
        .subheading {
          font-size: 1.2rem;
          color: #ddd6fe;
          max-width: 600px;
          margin: 1rem auto 2rem;
          text-shadow: 0 0 10px #c084fc;
        }
        .contact-info {
          font-size: 1.1rem;
          color: #eee;
          text-shadow: 0 0 6px #a855f7;
          margin-bottom: 2rem;
        }
        .link {
          color: #c084fc;
          cursor: pointer;
          font-weight: 600;
        }
        .link:hover {
          text-shadow: 0 0 15px #f0abfc;
        }
        .copy-message {
          margin-left: 8px;
          color: #4ade80;
          font-weight: bold;
        }
        .warning {
          color: #f87171;
          font-size: 0.9rem;
          margin-bottom: 0.5rem;
        }
        .contact-form {
          max-width: 500px;
          margin: auto;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        input, textarea {
          background: #2a0a54;
          border: 2px solid #7c3aed;
          border-radius: 10px;
          padding: 0.75rem 1rem;
          font-size: 1rem;
          color: #ddd6fe;
        }
        input:focus, textarea:focus {
          border-color: #a855f7;
          box-shadow: 0 0 10px #a855f7;
        }
        .char-count {
          font-size: 0.9rem;
          text-align: right;
        }
        button {
          background-color: #9333ea;
          color: white;
          padding: 0.85rem;
          border: none;
          border-radius: 50px;
          font-size: 1.1rem;
          font-weight: bold;
          transition: all 0.3s ease;
        }
        button:hover:not(:disabled) {
          background-color: #a855f7;
          box-shadow: 0 0 15px #f0abfc;
          transform: scale(1.05);
        }
        button:disabled {
          opacity: 0.7;
        }

        .success-overlay {
          position: fixed;
          top: 0; left: 0;
          width: 100%;
          height: 100%;
          background: rgba(20, 0, 40, 0.95);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: fadeOut 2.5s forwards;
        }

        .checkmark {
          font-size: 4rem;
          color: #4ade80;
          animation: popUp 0.4s ease-out;
        }

        .success-overlay p {
          color: #ddd6fe;
          font-size: 1.5rem;
          margin-top: 1rem;
        }

        @keyframes popUp {
          from { transform: scale(0); }
          to { transform: scale(1); }
        }

        @keyframes fadeOut {
          0% { opacity: 1; }
          80% { opacity: 1; }
          100% { opacity: 0; visibility: hidden; }
        }

        @media (max-width: 500px) {
          .contact-form {
            padding: 0 1rem;
          }
        }
      `}</style>
    </>
  );
}
