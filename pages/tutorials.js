import { useState } from 'react';
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
      {
        title: 'Step 2: Add CSS',
        content: 'Style the calculator to look nice and clean.',
        code: `#calculator {
  width: 200px;
  margin: auto;
}
button {
  width: 45px;
  height: 45px;
  margin: 3px;
  font-size: 18px;
}`,
      },
      {
        title: 'Step 3: Add JavaScript',
        content: 'Make buttons work with simple event listeners.',
        code: `const buttons = document.querySelectorAll('button');
const display = document.getElementById('display');
buttons.forEach(button => {
  button.addEventListener('click', () => {
    display.value += button.textContent;
  });
});`,
      },
      {
        title: 'Step 4: Calculate Result',
        content: 'Add logic to calculate the expression on "=" button click.',
        code: `const equalBtn = document.querySelector('button[data-equal]');
equalBtn.addEventListener('click', () => {
  try {
    display.value = eval(display.value);
  } catch {
    display.value = 'Error';
  }
});`,
      },
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
];

export default function Tutorials() {
  const [selectedProject, setSelectedProject] = useState(tutorials[0]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const steps = selectedProject.steps;
  const currentStep = steps[currentStepIndex];

  const goPrev = () => {
    if (currentStepIndex > 0) setCurrentStepIndex(currentStepIndex - 1);
  };

  const goNext = () => {
    if (currentStepIndex < steps.length - 1) setCurrentStepIndex(currentStepIndex + 1);
  };

  const selectProject = (project) => {
    setSelectedProject(project);
    setCurrentStepIndex(0);
  };

  return (
    <>
      <Head>
        <title>ProjectUcode Tutorials</title>
        <meta name="description" content="Step-by-step coding tutorials for kids." />
      </Head>

      <main className="container">
        <h1>Project Tutorials</h1>

        <div className="sidebar">
          <h2>Projects</h2>
          <ul>
            {tutorials.map((project) => (
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

          <h3>{currentStep.title}</h3>
          <p>{currentStep.content}</p>

          <pre>
            <code>{currentStep.code}</code>
          </pre>

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
      </main>

      <style jsx>{`
        .container {
          display: flex;
          max-width: 1000px;
          margin: 3rem auto;
          padding: 0 1rem;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #ddd6fe;
          user-select: none;
        }

        h1 {
          text-align: center;
          width: 100%;
          margin-bottom: 2rem;
          color: #a855f7;
        }

        .sidebar {
          flex: 1;
          margin-right: 2rem;
          background: #3c1361;
          padding: 1rem;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }

        .sidebar h2 {
          margin-top: 0;
          margin-bottom: 1rem;
          color: #d8b4fe;
        }

        .sidebar ul {
          list-style: none;
          padding-left: 0;
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
          justify-content: space-between;
        }

        .tutorial-content h2 {
          margin-top: 0;
          margin-bottom: 0.5rem;
          color: #d8b4fe;
        }

        .tutorial-content .description {
          font-style: italic;
          margin-bottom: 1.5rem;
          color: #c4b5fd;
        }

        pre {
          background: #2a0a54;
          padding: 1rem;
          border-radius: 8px;
          overflow-x: auto;
          font-size: 0.95rem;
          line-height: 1.4;
          color: #d8b4fe;
          margin-bottom: 1.5rem;
          user-select: text;
          white-space: pre-wrap;
          word-wrap: break-word;
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
          .container {
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
