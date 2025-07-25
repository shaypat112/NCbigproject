import { useState, useEffect } from 'react';

export default function ButtonWithCounter({ id, href, label }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem(`clicks_${id}`);
    if (saved) setCount(parseInt(saved, 10));
  }, [id]);

  const handleClick = () => {
    // Open the form link in a new tab
    window.open(href, '_blank', 'noopener,noreferrer');

    // Increment count locally & in localStorage
    setCount((prev) => {
      const newCount = prev + 1;
      localStorage.setItem(`clicks_${id}`, newCount);
      return newCount;
    });
  };

  return (
    <button
      id={id}
      className="button-counter"
      onClick={handleClick}
      type="button"
    >
      {label}
      <span className="counter-badge">{count}</span>

      <style jsx>{`
        .button-counter {
          display: inline-flex;
          align-items: center;
          gap: 0.8rem;
          padding: 0.85rem 2.8rem;
          font-weight: 700;
          font-size: 1.25rem;
          color: #fff;
          background: linear-gradient(135deg, #8b5cf6, #a855f7);
          border: none;
          border-radius: 9999px;
          box-shadow:
            0 0 12px #a855f7aa,
            0 4px 8px rgba(168, 85, 247, 0.6);
          cursor: pointer;
          user-select: none;
          transition:
            box-shadow 0.3s ease,
            transform 0.25s ease,
            background 0.4s ease;
          position: relative;
          overflow: hidden;
        }
        .button-counter:hover,
        .button-counter:focus {
          background: linear-gradient(135deg, #c084fc, #9333ea);
          box-shadow:
            0 0 20px #c084fccc,
            0 6px 15px rgba(201, 126, 255, 0.8);
          transform: translateY(-3px);
          outline: none;
        }
        .button-counter:active {
          transform: translateY(-1px);
          box-shadow:
            0 0 12px #a855f7bb,
            0 3px 7px rgba(168, 85, 247, 0.5);
        }
        .counter-badge {
          background-color: #7c3aed;
          padding: 0.3rem 0.7rem;
          border-radius: 9999px;
          font-weight: 800;
          font-size: 0.95rem;
          color: #ddd6fe;
          box-shadow: 0 0 8px #a855f7cc;
          user-select: none;
          min-width: 2.2rem;
          text-align: center;
          letter-spacing: 0.03em;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
      `}</style>
    </button>
  );
}
