import { useState } from 'react';
import Fuse from 'fuse.js';

const data = [
  { title: 'Home', url: '/' },
  { title: 'About Us', url: '/about' },
  { title: 'Contact', url: '/contact' },
  { title: 'Officer Applications', url: '/officerapps' },
  { title: 'Learning Hub', url: '/learninghub' },
  { title: 'Resources', url: '/resources' },
  { title: 'Project Gallery', url: '/gallery' },
];

const fuse = new Fuse(data, {
  keys: ['title'],
  threshold: 0.3,
});

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setResults(value ? fuse.search(value).map(result => result.item) : []);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search pages..."
        value={query}
        onChange={handleChange}
        className="search-input"
      />
      {results.length > 0 && (
        <ul className="search-results">
          {results.map((item) => (
            <li key={item.url}>
              <a href={item.url}>{item.title}</a>
            </li>
          ))}
        </ul>
      )}

      <style jsx>{`
        .search-container {
          position: relative;
          width: 100%;
          max-width: 400px;
          margin: 1rem auto;
        }
        .search-input {
          width: 100%;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          border: 1px solid #ddd6fe;
          background-color: #1f1b2e;
          color: #ddd6fe;
        }
        .search-results {
          list-style: none;
          margin-top: 0.5rem;
          padding: 0;
          border: 1px solid #4c1d95;
          border-radius: 0.5rem;
          background: #3c1361;
          color: #ddd6fe;
        }
        .search-results li {
          padding: 0.5rem 1rem;
        }
        .search-results li a {
          text-decoration: none;
          color: #a855f7;
        }
      `}</style>
    </div>
  );
}
