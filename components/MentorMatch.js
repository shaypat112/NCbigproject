import { useState, useMemo } from 'react';

const mentorsData = [
  {
    id: 1,
    name: 'Sanvi.',
    skills: ['React', 'JavaScript', 'Python'],
    availability: ['Monday', 'Wednesday'],
    rating: 4.9,
    email: 'sanvi@gmail.com',
    photo: 'https://media.licdn.com/dms/image/v2/D4D03AQHZ2ZU4wDzCyQ/profile-displayphoto-crop_800_800/B4DZg89kctHYAI-/0/1753369430474?e=1756339200&v=beta&t=bVzc7w8djW3BdXt9uPDo9bBT6EsCrLVBn-uvGtg7p6A',
  },
  {
    id: 2,
    name: 'Shivang P.',
    skills: ['Java', 'C++', 'Algorithms'],
    availability: ['Tuesday', 'Thursday'],
    rating: 4.7,
    email: 'shivangpatel2050@gmail.com',
    photo: 'https://media.licdn.com/dms/image/v2/D5603AQFaN6Q_4o7l9A/profile-displayphoto-crop_800_800/B56Zfxi4d0HUAI-/0/1752104154118?e=1756339200&v=beta&t=ubPncsIoH94yLPmyzRiCq_GWEo3HGiFBKPBgnoih-hE',
  },
  // Add more mentor objects here...
  // For brevity, only 2 shown — add up to 20+ mentors for pagination to matter
];

export default function MentorMatch() {
  const [searchName, setSearchName] = useState('');
  const [skillFilter, setSkillFilter] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState('');
  const [sortByRating, setSortByRating] = useState(false);
  const [page, setPage] = useState(1);

  const mentorsPerPage = 6;

  // Extract unique skills and availability days from mentorsData
  const allSkills = useMemo(() => {
    const skillsSet = new Set();
    mentorsData.forEach((m) => m.skills.forEach((s) => skillsSet.add(s)));
    return Array.from(skillsSet).sort();
  }, []);

  const allDays = useMemo(() => {
    const daysSet = new Set();
    mentorsData.forEach((m) => m.availability.forEach((d) => daysSet.add(d)));
    return Array.from(daysSet);
  }, []);

  // Filter mentors
  const filteredMentors = useMemo(() => {
    let filtered = mentorsData;

    if (searchName.trim()) {
      filtered = filtered.filter((m) =>
        m.name.toLowerCase().includes(searchName.toLowerCase())
      );
    }

    if (skillFilter) {
      filtered = filtered.filter((m) => m.skills.includes(skillFilter));
    }

    if (availabilityFilter) {
      filtered = filtered.filter((m) => m.availability.includes(availabilityFilter));
    }

    if (sortByRating) {
      filtered = filtered.slice().sort((a, b) => b.rating - a.rating);
    }

    return filtered;
  }, [searchName, skillFilter, availabilityFilter, sortByRating]);

  // Pagination
  const totalPages = Math.ceil(filteredMentors.length / mentorsPerPage);
  const displayedMentors = filteredMentors.slice(
    (page - 1) * mentorsPerPage,
    page * mentorsPerPage
  );

  // Clear filters handler
  const clearFilters = () => {
    setSearchName('');
    setSkillFilter('');
    setAvailabilityFilter('');
    setSortByRating(false);
    setPage(1);
  };

  return (
    <>
      <div className="mentor-match-container">
        <h1>Find a Mentor</h1>

        {/* Filters Section */}
        <div className="filters">
          <input
            type="text"
            placeholder="Search by name"
            value={searchName}
            onChange={(e) => {
              setSearchName(e.target.value);
              setPage(1);
            }}
            aria-label="Search mentors by name"
          />

          <select
            value={skillFilter}
            onChange={(e) => {
              setSkillFilter(e.target.value);
              setPage(1);
            }}
            aria-label="Filter mentors by skill"
          >
            <option value="">All Skills</option>
            {allSkills.map((skill) => (
              <option key={skill} value={skill}>
                {skill}
              </option>
            ))}
          </select>

          <select
            value={availabilityFilter}
            onChange={(e) => {
              setAvailabilityFilter(e.target.value);
              setPage(1);
            }}
            aria-label="Filter mentors by availability"
          >
            <option value="">All Days</option>
            {allDays.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>

          <label className="sort-label">
            <input
              type="checkbox"
              checked={sortByRating}
              onChange={(e) => setSortByRating(e.target.checked)}
            />{' '}
            Sort by rating
          </label>

          <button className="clear-btn" onClick={clearFilters}>
            Clear Filters
          </button>
        </div>

        {/* Results Info */}
        <p className="results-info">
          Showing {filteredMentors.length} mentor{filteredMentors.length !== 1 ? 's' : ''}
        </p>

        {/* Mentor Cards */}
        <div className="mentor-list">
          {displayedMentors.length === 0 ? (
            <p>No mentors found matching your criteria.</p>
          ) : (
            displayedMentors.map((mentor) => (
              <div key={mentor.id} className="mentor-card">
                <img
                  src={mentor.photo}
                  alt={`${mentor.name}'s photo`}
                  className="mentor-photo"
                  loading="lazy"
                />
                <h3>{mentor.name}</h3>
                <p>
                  <strong>Skills:</strong> {mentor.skills.join(', ')}
                </p>
                <p>
                  <strong>Availability:</strong> {mentor.availability.join(', ')}
                </p>
                <p>
                  <strong>Rating:</strong> {mentor.rating.toFixed(1)} ⭐
                </p>
                <a
                  href={`mailto:${mentor.email}`}
                  className="contact-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Contact ${mentor.name} by email`}
                >
                  Contact
                </a>
              </div>
            ))
          )}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="pagination">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              aria-label="Previous page"
            >
              ← Prev
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              aria-label="Next page"
            >
              Next →
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        .mentor-match-container {
          max-width: 900px;
          margin: 3rem auto;
          padding: 1rem 1.5rem;
          background: linear-gradient(135deg, #2a0a54, #4b0082);
          border-radius: 1.25rem;
          box-shadow: 0 0 25px #7c3aed, 0 0 60px #a855f7;
          color: #ddd6fe;
          user-select: none;
        }
        h1 {
          text-align: center;
          font-size: 3rem;
          color: #c084fc;
          text-shadow: 0 0 10px #c084fc;
          margin-bottom: 2rem;
          font-weight: 800;
        }

        .filters {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          justify-content: center;
          margin-bottom: 1rem;
        }

        .filters input,
        .filters select {
          background: #4b0082;
          border: none;
          border-radius: 0.75rem;
          color: #ddd6fe;
          padding: 0.7rem 1rem;
          font-size: 1rem;
          box-shadow: inset 0 0 6px #9333ea;
          min-width: 140px;
          transition: box-shadow 0.3s ease;
        }
        .filters input:focus,
        .filters select:focus {
          outline: none;
          box-shadow: 0 0 8px #a855f7;
          background: #5c139a;
          color: #fff;
        }

        .sort-label {
          display: flex;
          align-items: center;
          font-weight: 600;
          color: #ddd6fecc;
          user-select: none;
          font-size: 1rem;
          gap: 0.3rem;
          min-width: 140px;
          cursor: pointer;
        }

        .clear-btn {
          background: #9333ea;
          border: none;
          border-radius: 9999px;
          color: white;
          font-weight: 700;
          padding: 0.7rem 1.5rem;
          cursor: pointer;
          box-shadow: 0 0 12px #a855f7aa;
          transition: box-shadow 0.3s ease, transform 0.25s ease;
          user-select: none;
          min-width: 140px;
        }
        .clear-btn:hover,
        .clear-btn:focus {
          box-shadow: 0 0 20px #c084fc, 0 0 40px #a855f7;
          transform: translateY(-3px);
          outline: none;
        }
        .clear-btn:active {
          transform: translateY(-1px);
          box-shadow: 0 0 12px #a855f7bb;
        }

        .results-info {
          font-weight: 600;
          margin-bottom: 1rem;
          text-align: center;
          color: #d8bbffcc;
          user-select: none;
        }

        .mentor-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
        }

        .mentor-card {
          background: linear-gradient(135deg, #3d136b, #551a8b);
          border-radius: 1rem;
          box-shadow: 0 0 15px #7c3aedcc, 0 0 40px #a855f7aa;
          padding: 1.5rem 1.25rem;
          text-align: center;
          user-select: none;
          transition: box-shadow 0.3s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .mentor-card:hover {
          box-shadow: 0 0 30px #a855f7dd, 0 0 60px #c084fccc;
        }

        .mentor-photo {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          object-fit: cover;
          margin-bottom: 1rem;
          box-shadow: 0 0 15px #a855f7cc;
        }

        .mentor-card h3 {
          margin: 0.25rem 0 0.5rem 0;
          color: #e0c3ff;
          font-weight: 700;
          user-select: text;
        }

        .mentor-card p {
          margin: 0.25rem 0;
          font-size: 0.9rem;
          color: #d8bbffcc;
          user-select: text;
        }

        .contact-btn {
          margin-top: auto;
          display: inline-block;
          padding: 0.7rem 1.6rem;
          background: #a855f7;
          color: white;
          border-radius: 9999px;
          font-weight: 700;
          box-shadow: 0 0 15px #c084fc;
          text-decoration: none;
          transition: box-shadow 0.3s ease, transform 0.25s ease;
          user-select: none;
          cursor: pointer;
        }
        .contact-btn:hover,
        .contact-btn:focus {
          box-shadow: 0 0 30px #f0abfc, 0 0 70px #c084fc;
          transform: scale(1.05);
          outline: none;
        }

        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1rem;
          margin-top: 2rem;
          user-select: none;
          color: #ddd6fe;
          font-weight: 600;
        }
        .pagination button {
          background: #9333ea;
          border: none;
          border-radius: 9999px;
          padding: 0.5rem 1rem;
          color: white;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 0 12px #a855f7aa;
          transition: box-shadow 0.3s ease, transform 0.25s ease;
          user-select: none;
        }
        .pagination button:disabled {
          opacity: 0.4;
          cursor: not-allowed;
          box-shadow: none;
        }
        .pagination button:hover:not(:disabled),
        .pagination button:focus:not(:disabled) {
          box-shadow: 0 0 20px #c084fc, 0 0 40px #a855f7;
          transform: translateY(-2px);
          outline: none;
        }

        @media (max-width: 600px) {
          .filters {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </>
  );
}
