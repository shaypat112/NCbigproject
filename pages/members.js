import Head from 'next/head';
import { useEffect, useState } from 'react';

const members = [
  {
    name: 'Shivang Patel',
    role: 'Founder & Lead Developer',
    bio: 'Passionate coder and student-athlete, driving ProjectUcode’s vision forward.',
    photo: '/images/shivang.jpg',
  },
  {
    name: 'Sanmay Rathi',
    role: 'Community Manager',
    bio: 'Connecting members and organizing events to build a vibrant community.',
    photo: '/images/sanmay.jpg',
  },
  {
    name: 'Sannvi',
    role: 'Content Creator',
    bio: 'Creating tutorials, guides, and managing content for learners.',
    photo: '/images/sannvi.jpg',
  },
  {
    name: 'Member Name',
    role: 'Role/Title',
    bio: 'Bio goes here...',
    photo: '/images/placeholder.png',
  },
  {
    name: 'Member Name',
    role: 'Role/Title',
    bio: 'Bio goes here...',
    photo: '/images/placeholder.png',
  },
];

export default function Members() {
  // We'll track which cards are visible for animation
  const [visibleIndexes, setVisibleIndexes] = useState([]);

  useEffect(() => {
    // Animate cards one by one with stagger
    members.forEach((_, i) => {
      setTimeout(() => {
        setVisibleIndexes((vis) => [...vis, i]);
      }, i * 150);
    });
  }, []);

  return (
    <>
      <Head>
        <title>ProjectUcode Members</title>
        <meta name="description" content="Meet the members of ProjectUcode" />
      </Head>

      <main className="members-container">
        <h1>Meet Our Members</h1>
        <div className="cards">
          {members.map(({ name, role, bio, photo }, idx) => (
            <div
              className={`card ${visibleIndexes.includes(idx) ? 'visible' : ''}`}
              key={idx}
            >
              <div className="photo-wrapper">
                <img
                  src={photo}
                  alt={`${name}'s photo`}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/images/placeholder.png';
                  }}
                />
              </div>
              <h2>{name}</h2>
              <h3>{role}</h3>
              <p>{bio}</p>
            </div>
          ))}
        </div>
      </main>

      <style jsx>{`
        .members-container {
          max-width: 1000px;
          margin: 2rem auto;
          padding: 0 1rem;
          text-align: center;
          color: #ddd6fe;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        h1 {
          font-size: 2.5rem;
          margin-bottom: 1.5rem;
          color: #a855f7;
        }
        .cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
        }
        .card {
          background: #3c1361;
          padding: 1.5rem;
          border-radius: 12px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
          cursor: default;

          opacity: 0;
          transform: translateY(15px);
          transition: opacity 0.6s ease, transform 0.6s ease, box-shadow 0.3s ease;
        }
        .card.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .card:hover {
          transform: translateY(-8px) scale(1.03);
          box-shadow: 0 12px 30px rgba(168, 85, 247, 0.6);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .photo-wrapper {
          width: 120px;
          height: 120px;
          margin: 0 auto 1rem;
          border-radius: 50%;
          overflow: hidden;
          border: 3px solid #a855f7;
          background: #5c1a96;
        }
        .photo-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        h2 {
          margin: 0.5rem 0 0.25rem;
          font-size: 1.3rem;
        }
        h3 {
          margin: 0;
          font-size: 1rem;
          font-weight: 500;
          color: #d8b4fe;
          font-style: italic;
        }
        p {
          font-size: 0.95rem;
          margin-top: 0.75rem;
          line-height: 1.4;
          color: #c4b5fd;
        }
      `}</style>
    </>
  );
}
