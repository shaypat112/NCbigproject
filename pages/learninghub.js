import { useState } from 'react';

// Sample code snippets data
const codeSnippets = {
  HTML: [
    { id: 1, title: 'Create a Link', code: `<a href="https://example.com">Example</a>` },
    { id: 2, title: 'Add an Image', code: `<img src="image.jpg" alt="Description" />` },
  ],
  Java: [
    { id: 1, title: 'Print to Console', code: `System.out.println("Hello World");` },
    { id: 2, title: 'Define a Class', code: `public class MyClass {}` },
  ],
  Python: [
    { id: 1, title: 'Print Function', code: `print("Hello World")` },
    { id: 2, title: 'Define a Function', code: `def my_function():\n    pass` },
  ],
};

// Sample quiz questions
const quizzes = {
  HTML: [
    {
      id: 1,
      question: 'Which tag is used for hyperlinks?',
      options: ['&lt;link&gt;', '&lt;a&gt;', '&lt;href&gt;', '&lt;url&gt;'],
      answer: '&lt;a&gt;',
    },
    {
      id: 2,
      question: 'What does &lt;img&gt; tag require?',
      options: ['src attribute', 'alt attribute', 'Both', 'None'],
      answer: 'Both',
    },
  ],
  Java: [
    {
      id: 1,
      question: 'What is the entry point of a Java program?',
      options: ['main()', 'start()', 'run()', 'execute()'],
      answer: 'main()',
    },
    {
      id: 2,
      question: 'Which keyword is used to create a class?',
      options: ['class', 'object', 'new', 'def'],
      answer: 'class',
    },
  ],
  Python: [
    {
      id: 1,
      question: 'How do you print text in Python?',
      options: ['echo()', 'printf()', 'print()', 'cout'],
      answer: 'print()',
    },
    {
      id: 2,
      question: 'What symbol is used for comments?',
      options: ['//', '#', '/*', '&lt;!--'],
      answer: '#',
    },
  ],
};

export default function LearningHub() {
  const [showHelp, setShowHelp] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({}); // keys: `${lang}-${quizId}`
  const [quizResults, setQuizResults] = useState({}); // keys: `${lang}-${quizId}`

  // Copy to clipboard helper (async with try-catch)
  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('Copied to clipboard!');
    } catch {
      alert('Failed to copy. Please try manually.');
    }
  };

  // Quiz answer selection handler with combined keys
  const handleAnswerSelect = (lang, quizId, option) => {
    const key = `${lang}-${quizId}`;
    setQuizAnswers((prev) => ({ ...prev, [key]: option }));
    const correct = quizzes[lang].find((q) => q.id === quizId).answer === option;
    setQuizResults((prev) => ({ ...prev, [key]: correct }));
  };

  return (
    <div style={{ padding: '2rem', maxWidth: 900, margin: '0 auto', fontFamily: 'sans-serif' }}>
      {/* Help Button */}
      <button
        onClick={() => setShowHelp(true)}
        style={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          background: '#9333ea',
          color: 'white',
          borderRadius: '50%',
          width: 50,
          height: 50,
          fontSize: '1.5rem',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 0 10px #a855f7',
          zIndex: 1000,
        }}
        aria-label="Open help dialog"
        title="Help"
      >
        ?
      </button>

      {/* Help Modal */}
      {showHelp && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="help-title"
          tabIndex={-1}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1100,
          }}
          onClick={() => setShowHelp(false)}
        >
          <div
            style={{
              background: '#2a0a54',
              padding: '1.5rem',
              borderRadius: '12px',
              maxWidth: 600,
              color: '#ddd6fe',
              boxShadow: '0 0 20px #a855f7',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id="help-title" style={{ marginTop: 0, color: '#c084fc' }}>
              How to Use the Learning Hub
            </h2>
            <ul>
              <li>
                Browse the <strong>Code Snippet Library</strong> and click &quot;Copy&quot; to copy code.
              </li>
              <li>
                Take the <strong>Mini Quizzes</strong> below each language section to test your
                knowledge.
              </li>
              <li>Click the <strong>Help</strong> button anytime to see this message.</li>
            </ul>
            <button
              onClick={() => setShowHelp(false)}
              style={{
                marginTop: '1rem',
                background: '#9333ea',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
              aria-label="Close help dialog"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <h1 style={{ textAlign: 'center', color: '#c084fc', marginBottom: '1.5rem' }}>
        ProjectUcode Learning Hub
      </h1>

      {/* Code Snippet Library */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: '#a855f7' }}>Code Snippet Library</h2>
        {Object.entries(codeSnippets).map(([lang, snippets]) => (
          <div key={lang} style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ color: '#c084fc' }}>{lang}</h3>
            {snippets.map(({ id, title, code }) => (
              <div
                key={id}
                style={{
                  background: '#1e1e2f',
                  padding: '1rem',
                  borderRadius: '8px',
                  marginBottom: '0.75rem',
                  position: 'relative',
                  fontFamily: 'monospace',
                  whiteSpace: 'pre-wrap',
                  color: '#ddd6fe',
                  boxShadow: 'inset 0 0 10px #7c3aed',
                }}
              >
                <strong>{title}</strong>
                <pre style={{ marginTop: '0.5rem' }}>{code}</pre>
                <button
                  onClick={() => copyToClipboard(code)}
                  style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    background: '#9333ea',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '0.25rem 0.5rem',
                    cursor: 'pointer',
                  }}
                  aria-label={`Copy code snippet: ${title}`}
                >
                  Copy
                </button>
              </div>
            ))}
          </div>
        ))}
      </section>

      {/* Mini Quizzes */}
      <section>
        <h2 style={{ color: '#a855f7', marginBottom: '1rem' }}>Mini Quizzes</h2>
        {Object.entries(quizzes).map(([lang, questions]) => (
          <div key={lang} style={{ marginBottom: '2rem' }}>
            <h3 style={{ color: '#c084fc' }}>{lang}</h3>
            {questions.map(({ id, question, options }) => {
              const key = `${lang}-${id}`;
              return (
                <div
                  key={id}
                  style={{
                    background: '#1e1e2f',
                    padding: '1rem',
                    borderRadius: '8px',
                    marginBottom: '1rem',
                    color: '#ddd6fe',
                    boxShadow: 'inset 0 0 10px #7c3aed',
                  }}
                >
                  <p>
                    <strong>{question}</strong>
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {options.map((opt) => {
                      const selected = quizAnswers[key] === opt;
                      const isCorrect = quizResults[key] === true && selected;
                      const isIncorrect = quizResults[key] === false && selected;
                      return (
                        <button
                          key={opt}
                          onClick={() => handleAnswerSelect(lang, id, opt)}
                          disabled={quizAnswers[key] != null}
                          style={{
                            background: selected
                              ? isCorrect
                                ? '#22c55e'
                                : isIncorrect
                                ? '#ef4444'
                                : '#9333ea'
                              : '#44475a',
                            color: 'white',
                            border: 'none',
                            padding: '0.5rem 1rem',
                            borderRadius: '6px',
                            cursor: quizAnswers[key] == null ? 'pointer' : 'default',
                            flexGrow: 1,
                            minWidth: '100px',
                          }}
                          aria-pressed={selected}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {quizAnswers[key] != null && (
                    <p style={{ marginTop: '0.5rem' }}>
                      {quizResults[key]
                        ? '✅ Correct!'
                        : `❌ Incorrect. The correct answer is: ${
                            quizzes[lang].find((q) => q.id === id).answer
                          }`}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </section>
    </div>
  );
}
