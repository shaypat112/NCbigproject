import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';

const tutorials = [
  {
    id: 'project1',
    title: 'Build a Simple Calculator',
    description: 'Learn how to create a basic calculator using JavaScript.',
    steps: [
      {
        title: 'Step 1: Setup HTML',
        content: `Create a basic HTML structure with buttons and display area.`,
        code: `<div id="calculator">
  <input type="text" id="display" disabled />
  <button>1</button>
  <button>2</button>
  <button>+</button>
  <button data-equal>=</button>
</div>`,
      },
      // ... you can add more steps here
    ],
  },
  {
    id: 'project2',
    title: 'Create a To-Do List',
    description: 'Build a to-do list app to track your tasks.',
    steps: [
      {
        title: 'Step 1: HTML Structure',
        content: `Create an input, button, and list to show tasks.`,
        code: `<input id="taskInput" placeholder="Add new task" />
<button id="addTaskBtn">Add Task</button>
<ul id="taskList"></ul>`,
      },
      {
        title: 'Step 2: Adding Tasks',
        content: 'Add tasks to the list when button clicked.',
        code: `document.getElementById('addTaskBtn').addEventListener('click', () => {
  const taskInput = document.getElementById('taskInput');
  const taskText = taskInput.value.trim();
  if (taskText !== '') {
    const li = document.createElement('li');
    li.textContent = taskText;
    document.getElementById('taskList').appendChild(li);
    taskInput.value = '';
  }
});`,
      },
    ],
  },
  {
    id: 'project3',
    title: 'Simple Color Picker',
    description: 'Create a color picker that changes the background color.',
    steps: [
      {
        title: 'Step 1: HTML Setup',
        content: 'Create an input of type color.',
        code: `<input type="color" id="colorPicker" />`,
      },
      {
        title: 'Step 2: Add JavaScript',
        content: 'Change page background when color changes.',
        code: `const colorPicker = document.getElementById('colorPicker');
colorPicker.addEventListener('input', () => {
  document.body.style.backgroundColor = colorPicker.value;
});`,
      },
    ],
  },
  {
    id: 'project4',
    title: 'Show Current Time',
    description: 'Build a simple clock that shows the current time and updates every second.',
    steps: [
      {
        title: 'Step 1: HTML Structure',
        content: 'Add a div to display the time.',
        code: `<div id="clock"></div>`,
      },
      {
        title: 'Step 2: Add JavaScript',
        content: 'Update the time every second.',
        code: `function updateTime() {
  const clock = document.getElementById('clock');
  const now = new Date();
  clock.textContent = now.toLocaleTimeString();
}
setInterval(updateTime, 1000);
updateTime();`,
      },
    ],
  },
  // New Project 5
  {
    id: 'project5',
    title: 'Simple Weather App',
    description: 'Fetch weather data using an API and display it.',
    steps: [
      {
        title: 'Step 1: HTML Setup',
        content: 'Create input and button for city, and a display area.',
        code: `<input id="cityInput" placeholder="Enter city name" />
<button id="getWeatherBtn">Get Weather</button>
<div id="weatherDisplay"></div>`,
      },
      {
        title: 'Step 2: Fetch Weather',
        content: 'Use fetch API to get weather info from openweathermap.',
        code: `document.getElementById('getWeatherBtn').addEventListener('click', () => {
  const city = document.getElementById('cityInput').value;
  fetch(\`https://api.openweathermap.org/data/2.5/weather?q=\${city}&appid=YOUR_API_KEY&units=metric\`)
    .then(res => res.json())
    .then(data => {
      const display = document.getElementById('weatherDisplay');
      if(data.main) {
        display.textContent = \`Temperature: \${data.main.temp} °C, Weather: \${data.weather[0].description}\`;
      } else {
        display.textContent = 'City not found';
      }
    });
});`,
      },
    ],
  },
  // New Project 6
  {
    id: 'project6',
    title: 'Counter App',
    description: 'Build a simple counter with increment and decrement buttons.',
    steps: [
      {
        title: 'Step 1: HTML Setup',
        content: 'Add buttons and a display span.',
        code: `<button id="decrementBtn">-</button>
<span id="counterValue">0</span>
<button id="incrementBtn">+</button>`,
      },
      {
        title: 'Step 2: JavaScript Logic',
        content: 'Add event listeners to update the counter.',
        code: `let count = 0;
const counterValue = document.getElementById('counterValue');
document.getElementById('incrementBtn').addEventListener('click', () => {
  count++;
  counterValue.textContent = count;
});
document.getElementById('decrementBtn').addEventListener('click', () => {
  count--;
  counterValue.textContent = count;
});`,
      },
    ],
  },
  // New Project 7
  {
    id: 'project7',
    title: 'Random Quote Generator',
    description: 'Display random quotes from an array each time a button is clicked.',
    steps: [
      {
        title: 'Step 1: HTML Structure',
        content: 'Add a quote display div and a button.',
        code: `<div id="quoteDisplay">Click the button to see a quote</div>
<button id="newQuoteBtn">New Quote</button>`,
      },
      {
        title: 'Step 2: JavaScript Logic',
        content: 'Pick a random quote from an array and display it.',
        code: `const quotes = [
  "Be yourself; everyone else is already taken.",
  "To be or not to be, that is the question.",
  "The only thing we have to fear is fear itself."
];
document.getElementById('newQuoteBtn').addEventListener('click', () => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  document.getElementById('quoteDisplay').textContent = quotes[randomIndex];
});`,
      },
    ],
  },
];

export default function Tutorials() {
  const [selectedProject, setSelectedProject] = useState(() => {
    // Load saved from localStorage or default
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('tutorialState');
      if (saved) {
        const parsed = JSON.parse(saved);
        const proj = tutorials.find(p => p.id === parsed.selectedProjectId);
        if (proj) return proj;
      }
    }
    return tutorials[0];
  });
  const [currentStepIndex, setCurrentStepIndex] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('tutorialState');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (typeof parsed.currentStepIndex === 'number') return parsed.currentStepIndex;
      }
    }
    return 0;
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const codeRef = useRef(null);

  const steps = selectedProject.steps;
  const currentStep = steps[currentStepIndex];

  // Save state to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(
        'tutorialState',
        JSON.stringify({ selectedProjectId: selectedProject.id, currentStepIndex })
      );
    }
  }, [selectedProject, currentStepIndex]);

  // Scroll code into view on step change
  useEffect(() => {
    if (codeRef.current) {
      codeRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentStepIndex]);

  // Keyboard navigation: Arrow Left/Right for prev/next step
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  const goPrev = () => {
    if (currentStepIndex > 0) setCurrentStepIndex(currentStepIndex - 1);
  };

  const goNext = () => {
    if (currentStepIndex < steps.length - 1) setCurrentStepIndex(currentStepIndex + 1);
  };

  // Confirmation if switching project while not on first step
  const selectProject = (project) => {
    if (currentStepIndex !== 0) {
      const confirmSwitch = window.confirm(
        'You are not on the first step. Are you sure you want to switch projects? Your progress will be lost.'
      );
      if (!confirmSwitch) return;
    }
    setSelectedProject(project);
    setCurrentStepIndex(0);
  };

  // Filter projects by search term
  const filteredProjects = tutorials.filter((proj) =>
    proj.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Copy code to clipboard
  const copyCode = () => {
    if (!navigator.clipboard) return alert('Clipboard API not supported');
    navigator.clipboard.writeText(currentStep.code).then(() => {
      alert('Code copied to clipboard!');
    });
  };

  // Jump to a step by clicking tab
  const jumpToStep = (index) => {
    setCurrentStepIndex(index);
  };

  return (
    <>
      <Head>
        <title>ProjectUcode Tutorials</title>
        <meta name="description" content="Step-by-step coding tutorials for kids." />
      </Head>

      <main className={`container ${darkMode ? 'dark' : 'light'}`}>
        <h1>Project Tutorials</h1>

        {/* Dark mode toggle */}
        <div className="top-bar">
          <label>
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />{' '}
            Dark Mode
          </label>

          <div className="project-count">
            Projects: {filteredProjects.length} / {tutorials.length}
          </div>

          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search projects"
          />
        </div>

        <div className="container-inner">
          <div className="sidebar">
            <h2>Projects</h2>
            <ul>
              {filteredProjects.length === 0 && <li>No projects found</li>}
              {filteredProjects.map((project) => (
                <li key={project.id}>
                  <button
                    className={project.id === selectedProject.id ? 'active' : ''}
                    onClick={() => selectProject(project)}
                    aria-label={`Select project ${project.title}`}
                    disabled={project.id === selectedProject.id}
                  >
                    {project.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="tutorial-content">
            <h2>{selectedProject.title}</h2>
            <p className="description">{selectedProject.description}</p>

            {/* Step progress bar */}
            <div className="progress-bar-container" aria-label="Step progress">
              <div
                className="progress-bar"
                style={{
                  width: `${((currentStepIndex + 1) / steps.length) * 100}%`,
                }}
              />
            </div>

            {/* Step tabs */}
            <div className="step-tabs" role="tablist" aria-label="Step tabs">
              {steps.map((step, idx) => (
                <button
                  key={idx}
                  role="tab"
                  aria-selected={currentStepIndex === idx}
                  tabIndex={currentStepIndex === idx ? 0 : -1}
                  className={currentStepIndex === idx ? 'active-step' : ''}
                  onClick={() => jumpToStep(idx)}
                >
                  {step.title}
                </button>
              ))}
            </div>

            <h3>{currentStep.title}</h3>
            <p>{currentStep.content}</p>

            <pre ref={codeRef}>
              <code>{currentStep.code}</code>
            </pre>

            <button className="copy-btn" onClick={copyCode} aria-label="Copy code">
              Copy Code
            </button>

            <div className="navigation">
              <button onClick={goPrev} disabled={currentStepIndex === 0}>
                ← Previous
              </button>
              <span>
                Step {currentStepIndex + 1} of {steps.length}
              </span>
              <button onClick={goNext} disabled={currentStepIndex === steps.length - 1}>
                Next →
              </button>
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        .container {
          display: flex;
          max-width: 1000px;
          margin: 3rem auto;
          padding: 0 1rem;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          user-select: none;
          flex-direction: column;
          color: #111;
          background: #fff;
          min-height: 100vh;
        }
        .container.dark {
          background: #1e1e2f;
          color: #ddd6fe;
        }

        h1 {
          text-align: center;
          width: 100%;
          margin-bottom: 1rem;
          color: #a855f7;
        }

        .top-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
          gap: 1rem;
          flex-wrap: wrap;
          color: inherit;
        }
        .top-bar input[type='text'] {
          flex-grow: 1;
          max-width: 250px;
          padding: 0.4rem 0.6rem;
          border-radius: 6px;
          border: 1px solid #ccc;
          font-size: 1rem;
        }
        .container.dark .top-bar input[type='text'] {
          background: #3c1361;
          border: 1px solid #6b49a6;
          color: #ddd6fe;
        }

        .project-count {
          font-weight: 600;
        }

        .container-inner {
          display: flex;
          gap: 2rem;
          flex-grow: 1;
          min-height: 600px;
        }

        .sidebar {
          flex: 1;
          background: #3c1361;
          padding: 1rem;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
          color: #ddd6fe;
        }

        .sidebar h2 {
          margin-top: 0;
          margin-bottom: 1rem;
        }

        .sidebar ul {
          list-style: none;
          padding-left: 0;
          max-height: 450px;
          overflow-y: auto;
        }

        .sidebar li {
          margin-bottom: 0.8rem;
        }

        .sidebar button {
          width: 100%;
          background: transparent;
          border: none;
          color: #ddd6fe;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          text-align: left;
          padding: 0.5rem 0.6rem;
          border-radius: 8px;
          transition: background 0.3s ease;
        }
        .sidebar button:hover:not(:disabled),
        .sidebar button.active {
          background: #a855f7;
          color: white;
          outline: none;
          cursor: default;
        }
        .sidebar button:disabled {
          cursor: default;
        }

        .tutorial-content {
          flex: 3;
          background: #3c1361;
          padding: 1.5rem;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          color: #d8b4fe;
        }

        .tutorial-content h2 {
          margin-top: 0;
          margin-bottom: 0.5rem;
        }

        .tutorial-content .description {
          font-style: italic;
          margin-bottom: 1.5rem;
          color: #c4b5fd;
        }

        .progress-bar-container {
          background: #2a0a54;
          height: 8px;
          border-radius: 10px;
          margin-bottom: 1rem;
          overflow: hidden;
        }
        .progress-bar {
          height: 100%;
          background: #a855f7;
          width: 0%;
          transition: width 0.3s ease;
        }

        .step-tabs {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }
        .step-tabs button {
          background: #5c1a9c;
          border: none;
          color: #ddd6fe;
          padding: 0.3rem 0.7rem;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.85rem;
          user-select: none;
          transition: background 0.3s ease;
        }
        .step-tabs button.active-step,
        .step-tabs button:hover {
          background: #a855f7;
          color: white;
          outline: none;
        }

        pre {
          background: #2a0a54;
          padding: 1rem;
          border-radius: 8px;
          overflow-x: auto;
          font-size: 0.95rem;
          line-height: 1.4;
          color: #d8b4fe;
          margin-bottom: 1rem;
          user-select: text;
          white-space: pre-wrap;
          word-wrap: break-word;
          font-family: 'Courier New', Courier, monospace;
          position: relative;
        }

        .copy-btn {
          background: #a855f7;
          border: none;
          color: white;
          padding: 0.4rem 1rem;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          user-select: none;
          align-self: flex-start;
          margin-bottom: 1rem;
          transition: background 0.3s ease;
        }
        .copy-btn:hover {
          background: #9333ea;
        }

        .navigation {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .navigation button {
          background: #a855f7;
          border: none;
          color: white;
          padding: 0.5rem 1.2rem;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.3s ease;
          user-select: none;
        }
        .navigation button:disabled {
          background: #7c3aed;
          cursor: not-allowed;
        }
        .navigation button:hover:not(:disabled) {
          background: #9333ea;
        }

        .navigation span {
          font-weight: 600;
          color: #c4b5fd;
          user-select: none;
        }

        @media (max-width: 768px) {
          .container-inner {
            flex-direction: column;
          }
          .sidebar {
            margin-right: 0;
            margin-bottom: 2rem;
          }
        }
      `}</style>
    </>
  );
}
