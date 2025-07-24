// pages/gallery.tsx (or .js)
import Head from 'next/head';

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
  return (
    <>
      <Head>
        <title>Project Gallery</title>
      </Head>
      <div className="gallery-container">
        <h1 className="gallery-title">Student Projects</h1>
        <div className="projects-grid">
          {projects.map((project) => (
            <div className="card" key={project.title}>
              <img src={project.image} alt={project.title} />
              <h2>{project.title}</h2>
              <p>{project.description}</p>
              <a href={project.link} target="_blank" rel="noopener noreferrer">
                View Project
              </a>
            </div>
          ))}
        </div>

        <style jsx>{`
          .gallery-container {
            padding: 2rem;
            text-align: center;
          }
          .gallery-title {
            font-size: 2rem;
            margin-bottom: 2rem;
            background: linear-gradient(to right, #a855f7, #6b21a8);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          .projects-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
          }
          .card {
            background: #3c1361;
            color: #ddd6fe;
            border-radius: 1rem;
            padding: 1rem;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
          }
          .card img {
            width: 100%;
            height: 150px;
            object-fit: cover;
            border-radius: 0.5rem;
          }
          .card h2 {
            font-size: 1.2rem;
            margin: 0.5rem 0;
          }
          .card a {
            display: inline-block;
            margin-top: 0.5rem;
            color: #a855f7;
            text-decoration: underline;
          }
        `}</style>
      </div>
    </>
  );
}
