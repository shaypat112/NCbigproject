import { useState, useEffect, useRef } from 'react';

// Levenshtein distance function for fuzzy matching fallback
function levenshtein(a, b) {
  const matrix = Array.from({ length: b.length + 1 }, (_, i) =>
    Array(a.length + 1).fill(0)
  );
  for (let i = 0; i <= b.length; i++) matrix[i][0] = i;
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      matrix[i][j] =
        b[i - 1] === a[j - 1]
          ? matrix[i - 1][j - 1]
          : Math.min(
              matrix[i - 1][j - 1] + 1, // substitution
              matrix[i][j - 1] + 1,     // insertion
              matrix[i - 1][j] + 1      // deletion
            );
    }
  }
  return matrix[b.length][a.length];
}

// ====== Add your chatbotsData object here ======
const chatbotsData = {
  HTML: {
    greeting: "Hi! Ask me anything about HTML.",
    qa: {
      "what is html": "HTML stands for HyperText Markup Language, which structures web pages.",
      "how to make a link": "Use the <a> tag with an href attribute, like <a href='url'>link</a>.",
      "what is a tag": "A tag defines elements in HTML, like <p> for paragraph.",
      "how to add an image": "Use the <img> tag with src attribute, e.g. <img src='url' alt='description'>.",
    },
  },
  Java: {
    greeting: "Hello! Ask me about Java programming.",
    qa: {
      "what is java": "Java is a popular, object-oriented programming language used in many applications.",
      "how to declare a variable": "Specify type and name, e.g. int x = 5;",
      "what is a class": "A class is a blueprint for objects, defining their structure and behavior.",
      "how to write main method": "public static void main(String[] args) { } is the entry point.",
    },
  },
  Python: {
    greeting: "Hey! I can answer Python questions.",
    qa: {
      "what is python": "Python is a high-level, interpreted programming language known for readability.",
      "how to print": "Use print() function, e.g. print('Hello World').",
      "what is a list": "A list is a collection which is ordered and changeable, e.g. [1, 2, 3].",
      "how to write a function": "Use def keyword: def function_name():",
    },
  },
};

function MiniChatbot({ language, data, onResetAll, darkMode }) {
  const [messages, setMessages] = useState([{ from: 'bot', text: data.greeting }]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Improved fuzzy match: exact, includes, and levenshtein distance threshold fallback
  const findBestMatch = (msg, qa) => {
    const normalizedMsg = msg.replace(/[^\w\s]/gi, '').trim();
    let bestMatch = null;
    let bestDistance = Infinity;
    for (const key of Object.keys(qa)) {
      const normalizedKey = key.replace(/[^\w\s]/gi, '').trim();

      if (normalizedMsg === normalizedKey) return qa[key];
      if (normalizedMsg.includes(normalizedKey) || normalizedKey.includes(normalizedMsg)) return qa[key];

      // Levenshtein fallback: if distance < threshold, keep as candidate
      const dist = levenshtein(normalizedMsg, normalizedKey);
      if (dist < bestDistance && dist <= Math.floor(normalizedKey.length * 0.4)) {
        bestDistance = dist;
        bestMatch = qa[key];
      }
    }
    return bestMatch;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim().toLowerCase();
    setMessages(prev => [...prev, { from: 'user', text: input }]);
    setInput('');
    setTyping(true);

    const answer = findBestMatch(userMsg, data.qa) || "Sorry, I don't know that one yet. Try asking something else.";

    setTimeout(() => {
      setMessages(prev => [...prev, { from: 'bot', text: answer }]);
      setTyping(false);
    }, 900);
  };

  const handleClear = () => {
    setMessages([{ from: 'bot', text: data.greeting }]);
    setInput('');
    setTyping(false);
  };

  // Voice input handler (optional)
  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert("Sorry, your browser doesn't support speech recognition.");
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.start();

    recognition.onresult = (event) => {
      if (event.results.length > 0) {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
      }
    };
    recognition.onerror = () => {
      alert('Speech recognition error. Please try again.');
    };
  };

  return (
    <div className={`chatbot-card ${darkMode ? 'dark' : ''}`}>
      <h2>{language} Chatbot</h2>
      <div className="chat-window" aria-live="polite" aria-label={`${language} chatbot conversation`}>
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.from}`}>
            {msg.text}
          </div>
        ))}
        {typing && (
          <div className="message bot typing" aria-live="assertive" aria-atomic="true">
            Bot is typing
            <span className="typing-dots">
              <span>.</span>
              <span>.</span>
              <span>.</span>
            </span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="input-area" aria-label={`Ask a question about ${language}`}>
        <input
          type="text"
          placeholder={`Ask about ${language}...`}
          value={input}
          onChange={e => setInput(e.target.value)}
          aria-label={`Input question about ${language}`}
          autoComplete="off"
          spellCheck={false}
        />
        <button type="submit" aria-label="Send question" disabled={!input.trim()}>
          Send
        </button>
        <button
          type="button"
          aria-label="Clear chat"
          onClick={handleClear}
          className="clear-btn"
          title="Clear chat history"
        >
          Clear
        </button>
        <button
          type="button"
          aria-label="Voice input"
          onClick={handleVoiceInput}
          className="voice-btn"
          title="Speak your question"
        >
          🎤
        </button>
      </form>
      <style jsx>{`
        .chatbot-card {
          background: var(--bg-card);
          border-radius: 16px;
          box-shadow: var(--shadow);
          padding: 1.5rem;
          width: 100%;
          max-width: 420px;
          display: flex;
          flex-direction: column;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: var(--text-primary);
          transition: background-color 0.3s ease, color 0.3s ease;
        }

        .chatbot-card.dark {
          --bg-card: #1a1a2e;
          --text-primary: #e0e0ff;
          --shadow: 0 8px 20px rgba(74, 63, 255, 0.8);
        }

        .chatbot-card:not(.dark) {
          --bg-card: #f9f9ff;
          --text-primary: #222244;
          --shadow: 0 8px 20px rgba(160, 149, 255, 0.4);
        }

        h2 {
          margin-bottom: 1rem;
          font-weight: 700;
          font-size: 1.8rem;
          text-align: center;
          user-select: none;
          text-shadow: var(--text-shadow);
        }

        .chatbot-card.dark h2 {
          --text-shadow: 0 0 8px #a4a4ff;
        }
        .chatbot-card:not(.dark) h2 {
          --text-shadow: 0 0 5px #b299ff;
        }

        .chat-window {
          background: var(--bg-window);
          border-radius: 12px;
          padding: 1rem;
          flex-grow: 1;
          overflow-y: auto;
          max-height: 320px;
          box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
          margin-bottom: 1rem;
          font-size: 1rem;
          line-height: 1.4;
          color: var(--text-window);
        }

        .chatbot-card.dark .chat-window {
          --bg-window: #0d0d22;
          --text-window: #d1d1ff;
        }
        .chatbot-card:not(.dark) .chat-window {
          --bg-window: #ffffff;
          --text-window: #1a1a2a;
        }

        .message {
          margin-bottom: 0.8rem;
          padding: 0.55rem 0.9rem;
          max-width: 80%;
          border-radius: 15px;
          word-wrap: break-word;
          user-select: text;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
        }

        .message.user {
          background-color: #6c63ff;
          color: white;
          margin-left: auto;
          font-weight: 600;
          box-shadow: 0 4px 10px rgba(108, 99, 255, 0.6);
        }

        .chatbot-card.dark .message.user {
          background-color: #9388ff;
          box-shadow: 0 4px 14px rgba(147, 136, 255, 0.9);
        }

        .message.bot {
          background-color: #e4e4ff;
          color: #333366;
          margin-right: auto;
        }

        .chatbot-card.dark .message.bot {
          background-color: #26264f;
          color: #a8a8ff;
        }

        .message.typing {
          font-style: italic;
          opacity: 0.8;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .typing-dots span {
          animation: blink 1.4s infinite;
          font-weight: bold;
          font-size: 1.2rem;
          color: #6c63ff;
        }
        .typing-dots span:nth-child(2) {
          animation-delay: 0.2s;
        }
        .typing-dots span:nth-child(3) {
          animation-delay: 0.4s;
        }

        @keyframes blink {
          0%, 80%, 100% { opacity: 0; }
          40% { opacity: 1; }
        }

        form.input-area {
          display: flex;
          gap: 0.7rem;
          justify-content: center;
        }

        input[type="text"] {
          flex-grow: 1;
          padding: 0.5rem 1rem;
          border-radius: 25px;
          border: 2px solid var(--input-border);
          outline-offset: 2px;
          font-size: 1rem;
          font-family: inherit;
          transition: border-color 0.3s ease;
        }
        input[type="text"]:focus {
          border-color: #6c63ff;
        }
        .chatbot-card.dark input[type="text"] {
          --input-border: #5e5ec0;
          background-color: #0d0d22;
          color: #dcdcff;
        }
        .chatbot-card:not(.dark) input[type="text"] {
          --input-border: #c2baff;
          background-color: #fdfdff;
          color: #333366;
        }

        button {
          background-color: #6c63ff;
          color: white;
          border: none;
          border-radius: 25px;
          padding: 0 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.3s ease;
          font-size: 1rem;
          user-select: none;
        }
        button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        button:hover:not(:disabled),
        button:focus:not(:disabled) {
          background-color: #584fc2;
          outline: none;
        }
        .chatbot-card.dark button {
          background-color: #9388ff;
        }
        .chatbot-card.dark button:hover:not(:disabled),
        .chatbot-card.dark button:focus:not(:disabled) {
          background-color: #7a72d9;
        }

        .clear-btn {
          background-color: #ff6584;
        }
        .clear-btn:hover {
          background-color: #ff3b5e;
        }
        .chatbot-card.dark .clear-btn {
          background-color: #ff8aa2;
        }
        .chatbot-card.dark .clear-btn:hover {
          background-color: #ff6380;
        }

        .voice-btn {
          background-color: #6cdaff;
        }
        .voice-btn:hover {
          background-color: #37b8ff;
        }
        .chatbot-card.dark .voice-btn {
          background-color: #88d4ff;
        }
        .chatbot-card.dark .voice-btn:hover {
          background-color: #5ac1ff;
        }
      `}</style>
    </div>
  );
}

export default function Resources() {
  const [darkMode, setDarkMode] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  const toggleDarkMode = () => setDarkMode(prev => !prev);
  const resetAllChats = () => setResetKey(prev => prev + 1);

  return (
    <>
      <section style={{ textAlign: 'center', padding: '2rem 1rem', userSelect: 'none' }}>
        <h1
          className="glow-text"
          style={{
            fontSize: '3rem',
            marginBottom: '1rem',
            color: darkMode ? '#a7a7ff' : '#c084fc',
            textShadow: darkMode
              ? '0 0 15px #5c5cff, 0 0 30px #a0a0ff'
              : '0 0 10px #c084fc, 0 0 20px #a855f7',
            transition: 'all 0.3s ease',
          }}
        >
          ProjectUcode Resources
        </h1>
        <p
          style={{
            maxWidth: 700,
            margin: '0 auto 3rem auto',
            fontSize: '1.25rem',
            color: darkMode ? '#bdbdffcc' : '#ddd6fe',
            lineHeight: 1.6,
            textShadow: darkMode
              ? '0 0 10px #9a9aff, 0 0 20px #7d7dff'
              : '0 0 10px #c084fc, 0 0 20px #a855f7',
            userSelect: 'none',
            transition: 'all 0.3s ease',
          }}
        >
          Ask our mini chatbots about HTML, Java, or Python coding basics and concepts. Start typing your question below!
        </p>
        <button
          onClick={toggleDarkMode}
          style={{
            cursor: 'pointer',
            backgroundColor: darkMode ? '#5c5cff' : '#a855f7',
            border: 'none',
            borderRadius: '20px',
            padding: '0.5rem 1.5rem',
            fontWeight: '600',
            color: 'white',
            boxShadow: darkMode ? '0 0 15px #5c5cff' : '0 0 10px #a855f7',
            marginBottom: '1.5rem',
            transition: 'all 0.3s ease',
            userSelect: 'none',
          }}
          aria-pressed={darkMode}
          aria-label="Toggle dark mode"
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
        <br />
        <button
          onClick={resetAllChats}
          style={{
            cursor: 'pointer',
            backgroundColor: '#9333ea',
            border: 'none',
            borderRadius: '20px',
            padding: '0.5rem 1.5rem',
            fontWeight: '600',
            color: 'white',
            boxShadow: '0 0 15px #a855f7',
            userSelect: 'none',
            marginBottom: '2rem',
          }}
          aria-label="Reset all chatbot histories"
          title="Clear all chat histories"
        >
          Reset All Chats
        </button>
      </section>

      <div
        className="chatbot-container"
        role="region"
        aria-label="Coding language chatbots"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '70vh',
          gap: '2rem',
          padding: '0 1rem',
          maxWidth: '460px',
          margin: '0 auto',
        }}
      >
        <MiniChatbot
          key={`html-${resetKey}`}
          language="HTML"
          data={chatbotsData.HTML}
          darkMode={darkMode}
          onResetAll={resetAllChats}
        />
        <MiniChatbot
          key={`java-${resetKey}`}
          language="Java"
          data={chatbotsData.Java}
          darkMode={darkMode}
          onResetAll={resetAllChats}
        />
        <MiniChatbot
          key={`python-${resetKey}`}
          language="Python"
          data={chatbotsData.Python}
          darkMode={darkMode}
          onResetAll={resetAllChats}
        />
      </div>
    </>
  );
}
