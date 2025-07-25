import { useState, useEffect } from 'react';

const tips = [
  "Break down problems into smaller parts.",
  "Keep your code clean and readable.",
  "Practice debugging step by step.",
  "Write comments to explain complex logic.",
  "Test your code often to catch bugs early.",
  "Read others’ code to learn new techniques.",
  "Stay curious and keep learning!",
];

export default function DailyTip() {
  const [tip, setTip] = useState('');

  useEffect(() => {
    const day = new Date().getDate();
    setTip(tips[day % tips.length]);
  }, []);

  return (
    <div className="daily-tip">
      <h3>💡 Daily Coding Tip</h3>
      <p>{tip}</p>

      <style jsx>{`
        .daily-tip {
          max-width: 600px;
          margin: 2rem auto;
          padding: 1.5rem 2rem;
          background: linear-gradient(135deg, #7c3aed, #9333ea);
          border-radius: 1rem;
          box-shadow: 0 0 40px #c084fc;
          color: #ddd6fe;
          font-style: italic;
          text-align: center;
          user-select: none;
        }
        .daily-tip h3 {
          margin-bottom: 0.5rem;
        }
        .daily-tip p {
          margin: 0;
          font-weight: 600;
          font-size: 1.1rem;
        }
      `}</style>
    </div>
  );
}
