// pages/gallery.js
import Head from 'next/head';
import { useState, useEffect } from 'react';
import Image from 'next/image';


const projects = [
  {
    title: 'Python Game Engine',
    description: 'A 2D game built with Pygame.',
    image: '/images/pygame.png',
    link: 'https://github.com/shaypat112/python-game',
  },
  {
    title: 'Weather App',
    description: 'React app fetching real-time weather.',
    image: '/images/weather.png',
    link: 'https://github.com/shaypat112/weather-app',
  },
  {
    title: 'JavaScript Quiz Bot',
    description: 'An interactive quiz chatbot using JS.',
    image: '/images/quizbot.png',
    link: 'https://github.com/shaypat112/js-quizbot',
  },
];

export default function Gallery() {
  const [searchTerm, setSearchTerm] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  // Load dark mode preference from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved === 'true') setDarkMode(true);
  }, []);

  // Save dark mode changes
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const filteredProjects = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: 'smooth' });

  // Image fallback handler
  const handleImgError = (e) => {
    e.target.src = '/images/fallback.png'; // Add this fallback image in public/images
  };

  const copyLink = (link) => {
    navigator.clipboard.writeText(link).then(() => {
      alert('GitHub link copied!');
    }).catch(() => {
      alert('Copy failed, please copy manually.');
    });
  };

  return (
    <>
      <Head>
        <title>Project Gallery</title>
      </Head>

      <div className={darkMode ? 'gallery-container dark' : 'gallery-container'}>
        <header>
          <h1 className="gallery-title">Student Projects</h1>

          {/* Dark mode toggle */}
          <button
            onClick={() => setDarkMode((d) => !d)}
            aria-label="Toggle dark/light mode"
            className="dark-toggle"
          >
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </header>

        {/* Search */}
        <input
          type="search"
          aria-label="Search projects"
          placeholder="Search projects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        {/* Project count */}
        <p className="project-count">
          Showing {filteredProjects.length} of {projects.length} projects
        </p>

        <div className="projects-grid">
          {filteredProjects.length === 0 && (
            <p>No projects match your search.</p>
          )}

          {filteredProjects.map((project) => (
            <div
              className="card"
              key={project.title}
              tabIndex={0}
              role="group"
              aria-label={`Project: ${project.title}`}
            >
              <Image
  src={project.image}
  alt={project.title}
  width={400}         // specify actual width here
  height={300}        // specify actual height here
  loading="lazy"
  onError={handleImgError}
/>

              <h2>{project.title}</h2>
              <p>{project.description}</p>

              <div className="links-container">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View project ${project.title} on GitHub`}
                  tabIndex={0}
                >
                  View Project
                </a>

                <button
                  onClick={() => copyLink(project.link)}
                  aria-label={`Copy GitHub link for ${project.title}`}
                  tabIndex={0}
                  className="copy-link-btn"
                >
                  Copy Link
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Back to top */}
        <button
          onClick={scrollToTop}
          aria-label="Back to top"
          className="back-to-top"
        >
          ↑ Top
        </button>

        <style jsx>{`
          .gallery-container {
            padding: 2rem;
            max-width: 960px;
            margin: 0 auto;
            text-align: center;
            background: #f9f9ff;
            color: #222;
            min-height: 100vh;
            transition: background 0.3s, color 0.3s;
          }
          .gallery-container.dark {
            background: #1a0a3d;
            color: #ddd6fe;
          }
          header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1rem;
            flex-wrap: wrap;
            gap: 1rem;
          }
          .gallery-title {
            font-size: 2.5rem;
            margin: 0;
            background: linear-gradient(to right, #a855f7, #6b21a8);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            user-select: none;
          }
          .dark-toggle {
            background: #7c3aed;
            color: white;
            border: none;
            border-radius: 20px;
            padding: 0.5rem 1.2rem;
            font-weight: 600;
            cursor: pointer;
            user-select: none;
            transition: background 0.3s;
            outline-offset: 3px;
          }
          .dark-toggle:hover,
          .dark-toggle:focus {
            background: #9333ea;
            outline: 3px solid #9333ea;
          }
          .search-input {
            width: 100%;
            max-width: 320px;
            padding: 0.5rem 1rem;
            margin-bottom: 1rem;
            border-radius: 20px;
            border: 2px solid #7c3aed;
            font-size: 1rem;
            outline-offset: 3px;
            transition: border-color 0.3s;
            background: inherit;
            color: inherit;
          }
          .search-input::placeholder {
            color: #bbb;
          }
          .search-input:focus {
            border-color: #c084fc;
            outline: none;
            background: inherit;
            color: inherit;
          }
          .project-count {
            font-weight: 600;
            margin-bottom: 1.5rem;
          }
          .projects-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
            gap: 2rem 1.5rem;
          }
          .card {
            background: #3c1361;
            color: #ddd6fe;
            border-radius: 1rem;
            padding: 1.25rem;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            outline-offset: 4px;
          }
          .gallery-container.dark .card {
            background: #4b1a7a;
          }
          .card:hover,
          .card:focus {
            transform: scale(1.05);
            box-shadow: 0 8px 20px rgba(124, 58, 237, 0.9);
            cursor: pointer;
            outline: none;
          }
          .card img {
            width: 100%;
            height: 150px;
            object-fit: cover;
            border-radius: 0.5rem;
            user-select: none;
            pointer-events: none;
          }
          .card h2 {
            font-size: 1.3rem;
            margin: 0.75rem 0 0.5rem;
            user-select: text;
          }
          .card p {
            user-select: text;
          }
          .links-container {
            margin-top: 0.75rem;
            display: flex;
            justify-content: center;
            gap: 1rem;
            flex-wrap: wrap;
          }
          .card a {
            color: #a855f7;
            text-decoration: underline;
            font-weight: 600;
            transition: color 0.3s;
            padding: 0.3rem 0.6rem;
            border-radius: 8px;
          }
          .card a:hover,
          .card a:focus {
            color: #c084fc;
            outline-offset: 3px;
            outline: 3px solid #c084fc;
            text-decoration: none;
          }
          .copy-link-btn {
            background: #7c3aed;
            border: none;
            color: white;
            padding: 0.3rem 0.6rem;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            user-select: none;
            transition: background 0.3s;
          }
          .copy-link-btn:hover,
          .copy-link-btn:focus {
            background: #9333ea;
            outline-offset: 3px;
            outline: 3px solid #9333ea;
          }
          .back-to-top {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #7c3aed;
            color: white;
            border: none;
            border-radius: 50%;
            width: 48px;
            height: 48px;
            font-size: 1.6rem;
            cursor: pointer;
            box-shadow: 0 0 10px #7c3aed;
            user-select: none;
            transition: background 0.3s;
            z-index: 1000;
          }
          .back-to-top:hover,
          .back-to-top:focus {
            background: #9333ea;
            outline-offset: 3px;
            outline: 3px solid #9333ea;
          }
        `}</style>
      </div>
    </>
  );
}
