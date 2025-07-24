import { useState, useMemo } from 'react';

// Expanded example snippets per language (just placeholders)
const codeSnippets = {
  HTML: [
    {
      id: 1,
      title: 'Basic HTML Structure',
      code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Document</title>
</head>
<body>
  <h1>Hello World</h1>
</body>
</html>`,
    },
    {
      id: 2,
      title: 'HTML Link Example',
      code: `<a href="https://example.com" target="_blank">Visit Example</a>`,
    },
    {
      id: 3,
      title: 'Image Tag with Alt',
      code: `<img src="image.jpg" alt="A descriptive text" />`,
    },
    // Add more unique snippets here...
  ],

  Java: [
    {
      id: 1,
      title: 'Hello World Program',
      code: `public class HelloWorld {
  public static void main(String[] args) {
    System.out.println("Hello, World!");
  }
}`,
    },
    {
      id: 2,
      title: 'If Statement Example',
      code: `int number = 10;
if (number > 0) {
  System.out.println("Positive number");
} else {
  System.out.println("Non-positive number");
}`,
    },
    {
      id: 3,
      title: 'For Loop Example',
      code: `for (int i = 0; i < 5; i++) {
  System.out.println(i);
}`,
    },
    // Add more unique Java snippets...
  ],

  Python: [
    {
      id: 1,
      title: 'Print Statement',
      code: `print("Hello, Python!")`,
    },
    {
      id: 2,
      title: 'If Statement Example',
      code: `number = 10
if number > 0:
    print("Positive number")
else:
    print("Non-positive number")`,
    },
    {
      id: 3,
      title: 'For Loop Example',
      code: `for i in range(5):
    print(i)`,
    },
    // Add more unique Python snippets...
  ],
};


const quizzes = {
  HTML: [
    {
      id: 1,
      question: 'Which tag is used for hyperlinks?',
      options: ['<link>', '<a>', '<href>', '<url>'],
      answer: '<a>',
    },
    {
      id: 2,
      question: 'What does <img> tag require?',
      options: ['src attribute', 'alt attribute', 'Both', 'None'],
      answer: 'Both',
    },
    // ... add more if you want
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
      options: ['//', '#', '/*', '<!--'],
      answer: '#',
    },
  ],
};

export default function LearningHub() {
  // === States ===
  const [showHelp, setShowHelp] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({}); // keys: `${lang}-${quizId}`
  const [quizResults, setQuizResults] = useState({}); // keys: `${lang}-${quizId}`
  const [expandedSnippets, setExpandedSnippets] = useState({}); // keys: `${lang}-${id}` boolean
  const [searchTerm, setSearchTerm] = useState('');
  const [darkMode, setDarkMode] = useState(true);
  const [showAnswers, setShowAnswers] = useState({}); // per lang

  // === Clipboard helper ===
  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('Copied to clipboard!');
    } catch {
      alert('Failed to copy. Please try manually.');
    }
  };

  // === Quiz answer selection ===
  const handleAnswerSelect = (lang, quizId, option) => {
    const key = `${lang}-${quizId}`;
    setQuizAnswers((prev) => ({ ...prev, [key]: option }));
    const correct = quizzes[lang].find((q) => q.id === quizId).answer === option;
    setQuizResults((prev) => ({ ...prev, [key]: correct }));
  };

  // === Snippet expand toggle ===
  const toggleSnippet = (lang, id) => {
    const key = `${lang}-${id}`;
    setExpandedSnippets((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // === Filter snippets by search term (case insensitive) ===
  const filteredSnippets = useMemo(() => {
    if (!searchTerm.trim()) return codeSnippets;
    const term = searchTerm.toLowerCase();
    const result = {};
    for (const lang of Object.keys(codeSnippets)) {
      const filtered = codeSnippets[lang].filter(
        (s) => s.title.toLowerCase().includes(term) || lang.toLowerCase().includes(term)
      );
      if (filtered.length > 0) result[lang] = filtered;
    }
    return result;
  }, [searchTerm]);

  // === Count quiz correct per language ===
  const quizProgress = {};
  for (const lang of Object.keys(quizzes)) {
    const total = quizzes[lang].length;
    let correct = 0;
    for (const q of quizzes[lang]) {
      const key = `${lang}-${q.id}`;
      if (quizResults[key]) correct++;
    }
    quizProgress[lang] = { correct, total };
  }

  // === Feature 1: Copy All Snippets in a Language ===
  const copyAllSnippets = (lang) => {
    if (!codeSnippets[lang]) return;
    const allCode = codeSnippets[lang].map((s) => `// ${s.title}\n${s.code}`).join('\n\n');
    copyToClipboard(allCode);
  };

  // === Feature 2: Reset quiz for a language ===
  const resetQuiz = (lang) => {
    // Remove all quiz answers/results for the language
    const newAnswers = { ...quizAnswers };
    const newResults = { ...quizResults };
    quizzes[lang].forEach((q) => {
      const key = `${lang}-${q.id}`;
      delete newAnswers[key];
      delete newResults[key];
    });
    setQuizAnswers(newAnswers);
    setQuizResults(newResults);
    setShowAnswers((prev) => ({ ...prev, [lang]: false }));
  };

  // === Keyboard handler for toggle buttons ===
  const handleKeyToggle = (event, callback) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      callback();
    }
  };

  return (
    <div
      style={{
        padding: '2rem',
        maxWidth: 900,
        margin: '0 auto',
        fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
        background: darkMode ? '#121123' : '#f5f5f5',
        color: darkMode ? '#ddd6fe' : '#222',
        minHeight: '100vh',
        transition: 'all 0.3s ease',
        position: 'relative',
      }}
    >
      {/* Bottom right fixed buttons container */}
      <div style={{ position: 'fixed', bottom: 20, right: 20, display: 'flex', flexDirection: 'column', gap: 12, zIndex: 1000 }}>
        {/* Dark mode toggle above Help button */}
        <button
          onClick={() => setDarkMode((d) => !d)}
          aria-label="Toggle dark/light mode"
          style={{
            background: darkMode ? '#7c3aed' : '#9333ea',
            color: 'white',
            border: 'none',
            borderRadius: '20px',
            padding: '0.5rem 1rem',
            cursor: 'pointer',
            boxShadow: darkMode ? '0 0 10px #7c3aed' : '0 0 10px #9333ea',
            userSelect: 'none',
            fontWeight: '600',
            fontSize: '1rem',
          }}
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>

        {/* Help Button */}
        <button
          onClick={() => setShowHelp(true)}
          style={{
            background: '#9333ea',
            color: 'white',
            borderRadius: '50%',
            width: 50,
            height: 50,
            fontSize: '1.5rem',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 0 10px #a855f7',
            userSelect: 'none',
          }}
          aria-label="Open help dialog"
          title="Help"
        >
          ?
        </button>
      </div>

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
              background: darkMode ? '#2a0a54' : '#fff',
              padding: '1.5rem',
              borderRadius: '12px',
              maxWidth: 600,
              color: darkMode ? '#ddd6fe' : '#222',
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
                Use the <strong>search bar</strong> to filter snippets by language or title.
              </li>
              <li>
                Click snippet titles or press Enter/Space to open or close the code block.
              </li>
              <li>
                Take the <strong>Mini Quizzes</strong> below each language section to test your knowledge.
              </li>
              <li>
                Click the <strong>Show/Hide Answers</strong> button in quizzes to reveal correct answers.
              </li>
              <li>
                Use the <strong>Dark/Light Mode</strong> toggle to change theme.
              </li>
              <li>Click the <strong>Help</strong> button anytime to see this message.</li>
              <li>
                Use the new <strong>Copy All Snippets</strong> button to copy all code snippets for a language.
              </li>
              <li>
                Use the <strong>Reset Quiz</strong> button to clear your answers and try again.
              </li>
              <li>
                All interactive buttons are keyboard accessible (use Tab + Enter/Space).
              </li>
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

      <h1
        style={{
          textAlign: 'center',
          color: '#c084fc',
          marginBottom: '1.5rem',
          userSelect: 'none',
        }}
      >
        ProjectUcode Learning Hub
      </h1>

      {/* Search bar */}
      <div
        style={{
          marginBottom: '2rem',
          textAlign: 'center',
        }}
      >
        <input
          type="search"
          placeholder="Search snippets by language or title..."
          aria-label="Search code snippets"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '0.5rem 1rem',
            width: '100%',
            maxWidth: 400,
            borderRadius: '20px',
            border: '2px solid #7c3aed',
            fontSize: '1rem',
            outlineOffset: '2px',
            background: darkMode ? '#1e1e2f' : '#fff',
            color: darkMode ? '#ddd6fe' : '#222',
          }}
        />
      </div>

      {/* Code Snippet Library */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: '#a855f7', userSelect: 'none' }}>Code Snippet Library</h2>
        {Object.entries(filteredSnippets).map(([lang, snippets]) => (
          <div key={lang} style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ color: '#c084fc', userSelect: 'none' }}>{lang}</h3>

            {/* New Feature: Copy all snippets button */}
            <button
              onClick={() => copyAllSnippets(lang)}
              style={{
                marginBottom: '1rem',
                background: '#7c3aed',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '0.4rem 1rem',
                cursor: 'pointer',
                userSelect: 'none',
                fontWeight: '600',
                fontSize: '0.9rem',
              }}
              aria-label={`Copy all ${lang} code snippets`}
            >
              Copy All {lang} Snippets
            </button>

            {snippets.length === 0 && <p>No snippets found.</p>}
            {snippets.map(({ id, title, code }) => {
              const key = `${lang}-${id}`;
              const expanded = !!expandedSnippets[key];
              return (
                <div
                  key={id}
                  style={{
                    background: darkMode ? '#1e1e2f' : '#f9f9ff',
                    padding: '1rem',
                    borderRadius: '8px',
                    marginBottom: '0.75rem',
                    position: 'relative',
                    fontFamily: 'monospace',
                    color: darkMode ? '#ddd6fe' : '#222',
                    boxShadow: darkMode
                      ? 'inset 0 0 10px #7c3aed'
                      : 'inset 0 0 6px #b499ff',
                    userSelect: 'text',
                  }}
                >
                  <button
                    onClick={() => toggleSnippet(lang, id)}
                    onKeyDown={(e) => handleKeyToggle(e, () => toggleSnippet(lang, id))}
                    aria-expanded={expanded}
                    aria-controls={`snippet-code-${key}`}
                    style={{
                      fontWeight: 'bold',
                      background: 'none',
                      border: 'none',
                      color: darkMode ? '#c084fc' : '#7c3aed',
                      cursor: 'pointer',
                      fontSize: '1.1rem',
                      textAlign: 'left',
                      width: '100%',
                      padding: 0,
                      marginBottom: expanded ? '0.75rem' : 0,
                      userSelect: 'none',
                      outlineOffset: '2px',
                    }}
                    tabIndex={0}
                  >
                    {expanded ? '▼ ' : '▶ '} {title}
                  </button>

                  {expanded && (
                    <>
                      <pre
                        id={`snippet-code-${key}`}
                        style={{
                          marginTop: 0,
                          whiteSpace: 'pre-wrap',
                          wordWrap: 'break-word',
                          background: darkMode ? '#2d2d5f' : '#ececff',
                          padding: '0.75rem',
                          borderRadius: '6px',
                          fontSize: '0.9rem',
                          userSelect: 'text',
                          maxHeight: '250px',
                          overflowY: 'auto',
                        }}
                      >
                        {code}
                      </pre>
                      <button
                        onClick={() => copyToClipboard(code)}
                        style={{
                          marginTop: '0.5rem',
                          background: '#9333ea',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          padding: '0.4rem 0.75rem',
                          cursor: 'pointer',
                          userSelect: 'none',
                          fontSize: '0.9rem',
                        }}
                        aria-label={`Copy code snippet: ${title}`}
                      >
                        Copy
                      </button>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </section>

      {/* Mini Quizzes */}
      <section>
        <h2 style={{ color: '#a855f7', marginBottom: '1rem', userSelect: 'none' }}>Mini Quizzes</h2>
        {Object.entries(quizzes).map(([lang, questions]) => (
          <div key={lang} style={{ marginBottom: '2rem' }}>
            <h3 style={{ color: '#c084fc', userSelect: 'none' }}>{lang}</h3>
            <p style={{ fontWeight: '600', marginBottom: '0.5rem' }}>
              Progress: {quizProgress[lang].correct} / {quizProgress[lang].total} correct
            </p>

            {/* New Feature: Reset quiz button */}
            <button
              onClick={() => resetQuiz(lang)}
              style={{
                marginBottom: '1rem',
                background: '#ef4444',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '0.4rem 1rem',
                cursor: 'pointer',
                userSelect: 'none',
                fontWeight: '600',
                fontSize: '0.9rem',
                marginRight: '1rem',
              }}
              aria-label={`Reset ${lang} quiz`}
            >
              Reset Quiz
            </button>

            <button
              onClick={() => setShowAnswers((prev) => ({ ...prev, [lang]: !prev[lang] }))}
              aria-pressed={!!showAnswers[lang]}
              style={{
                marginBottom: '1rem',
                background: '#7c3aed',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '0.4rem 1rem',
                cursor: 'pointer',
                userSelect: 'none',
                fontWeight: '600',
                fontSize: '0.9rem',
              }}
              aria-label={`Toggle show/hide answers for ${lang} quiz`}
            >
              {showAnswers[lang] ? 'Hide Answers' : 'Show Answers'}
            </button>

            {questions.map(({ id, question, options, answer }) => {
              const key = `${lang}-${id}`;
              return (
                <div
                  key={id}
                  style={{
                    background: darkMode ? '#1e1e2f' : '#f9f9ff',
                    padding: '1rem',
                    borderRadius: '8px',
                    marginBottom: '1rem',
                    color: darkMode ? '#ddd6fe' : '#222',
                    boxShadow: darkMode
                      ? 'inset 0 0 10px #7c3aed'
                      : 'inset 0 0 6px #b499ff',
                    userSelect: 'none',
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
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              handleAnswerSelect(lang, id, opt);
                            }
                          }}
                          disabled={quizAnswers[key] != null}
                          style={{
                            background: selected
                              ? isCorrect
                                ? '#22c55e'
                                : isIncorrect
                                ? '#ef4444'
                                : '#9333ea'
                              : darkMode
                              ? '#44475a'
                              : '#ddd',
                            color: selected ? 'white' : darkMode ? '#ddd6fe' : '#222',
                            border: 'none',
                            padding: '0.5rem 1rem',
                            borderRadius: '6px',
                            cursor: quizAnswers[key] == null ? 'pointer' : 'default',
                            flexGrow: 1,
                            minWidth: '100px',
                            userSelect: 'none',
                            outlineOffset: '2px',
                          }}
                          aria-pressed={selected}
                          tabIndex={0}
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
                        : showAnswers[lang]
                        ? `❌ Incorrect. The correct answer is: ${answer}`
                        : '❌ Incorrect.'}
                    </p>
                  )}
                  {/* Show answer if toggled on even if unanswered */}
                  {quizAnswers[key] == null && showAnswers[lang] && (
                    <p style={{ marginTop: '0.5rem', fontStyle: 'italic' }}>
                      Correct answer: {answer}
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
