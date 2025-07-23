import React, { useState, useRef, useEffect } from 'react';

const cannedResponses = {
  hello: 'Hello! How can I assist you today?',
  projectucode:
    'ProjectUcode is a community-driven platform where coders and creators collaborate on exciting projects. Join us to learn, share, and innovate together!',
  apply:
    'To apply for ProjectUcode, visit our Apply page where you can find officer and member application forms.',
  'officer applications':
    'To apply as an officer, please fill out the Officer Application form available on our Apply page.',
  'member applications': 'To apply as a member, please fill out the Member Application form.',
  resources:
    'Check out our Resources page for a curated list of tools, tutorials, and guides to help you in your coding journey.',
  'learning hub': 'Our Learning Hub offers a variety of courses, workshops, and resources.',

  default: "Sorry, I didn't understand. Try asking something else related to coding or ProjectUcode!",
};

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi! Ask me anything about ProjectUcode.', feedback: null },
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (open) {
      setMessages([{ from: 'bot', text: 'Hi! Ask me anything about ProjectUcode.', feedback: null }]);
      setInput('');
    }
  }, [open]);

  function sendMessage() {
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages((msgs) => [...msgs, { from: 'user', text: userMsg }]);
    setInput('');

    const normalized = userMsg.toLowerCase().replace(/[.,!?]/g, '').trim();

    let matchedKey = null;
    let maxLength = 0;
    for (const key in cannedResponses) {
      if (normalized.includes(key) && key.length > maxLength) {
        matchedKey = key;
        maxLength = key.length;
      }
    }

    const response = matchedKey ? cannedResponses[matchedKey] : cannedResponses.default;

    setTimeout(() => {
      setMessages((msgs) => [...msgs, { from: 'bot', text: response, feedback: null }]);
    }, 500);
  }

  const handleFeedback = (index, value) => {
    setMessages((prev) => prev.map((msg, i) => (i === index ? { ...msg, feedback: value } : msg)));
  };

  function clearChat() {
    setMessages([{ from: 'bot', text: 'Chat cleared! Ask me anything about ProjectUcode.', feedback: null }]);
    setInput('');
  }

  return (
    <>
      <button
        className="chatbot-toggle"
        onClick={() => setOpen(!open)}
        aria-label="Toggle chatbot"
        type="button"
      >
        💬
      </button>
      {open && (
        <div
          className="chatbot-window"
          role="dialog"
          aria-modal="true"
          aria-label="ProjectUcode chatbot window"
        >
          <div className="chatbot-header">
            <h4>ProjectUcode Chatbot</h4>
            <button onClick={() => setOpen(false)} aria-label="Close chatbot" type="button">
              ✖️
            </button>
          </div>
          <div className="chatbot-clear-area">
            <button onClick={clearChat} aria-label="Clear chat" type="button">
              Clear Chat
            </button>
          </div>
          <div className="chatbot-messages" aria-live="polite">
            {messages.map((msg, i) => (
              <div key={i} className={`chatbot-message ${msg.from}`}>
                {msg.text}
                {msg.from === 'bot' && msg.feedback === null && (
                  <div className="feedback-buttons" aria-label="Provide feedback">
                    <button
                      aria-label="Helpful"
                      onClick={() => handleFeedback(i, 'helpful')}
                      title="Helpful"
                      type="button"
                    >
                      👍
                    </button>
                    <button
                      aria-label="Not helpful"
                      onClick={() => handleFeedback(i, 'not helpful')}
                      title="Not helpful"
                      type="button"
                    >
                      👎
                    </button>
                  </div>
                )}
                {msg.feedback && (
                  <div className="feedback-thanks" aria-live="polite">
                    Thanks for your feedback {msg.feedback === 'helpful' ? '😊' : '😕'}
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="chatbot-input-area">
            <input
              type="text"
              value={input}
              placeholder="Ask me something..."
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              aria-label="Chat input"
            />
            <button onClick={sendMessage} aria-label="Send message" type="button">
              Send
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        .chatbot-toggle {
          position: fixed;
          bottom: 20px;
          right: 20px;
          background: #9333ea;
          color: white;
          border: none;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          font-size: 1.8rem;
          cursor: pointer;
          box-shadow: 0 0 10px #a855f7;
          user-select: none;
          z-index: 1000;
        }
        .chatbot-window {
          position: fixed;
          bottom: 80px;
          right: 20px;
          width: 320px;
          max-height: 500px;
          background: #2a0a54;
          border-radius: 12px;
          box-shadow: 0 0 20px #a855f7;
          display: flex;
          flex-direction: column;
          color: #ddd6fe;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          z-index: 1100;
        }
        .chatbot-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem 1rem;
          border-bottom: 1px solid #4b0082;
        }
        .chatbot-header h4 {
          margin: 0;
          font-weight: 600;
        }
        .chatbot-header button {
          background: transparent;
          border: none;
          color: #ddd6fe;
          font-size: 1.25rem;
          cursor: pointer;
        }
        .chatbot-clear-area {
          padding: 0 1rem 0.5rem;
        }
        .chatbot-clear-area button {
          background: #7c3aed;
          color: white;
          border: none;
          border-radius: 6px;
          padding: 0.3rem 0.8rem;
          cursor: pointer;
          font-size: 0.85rem;
        }
        .chatbot-messages {
          flex-grow: 1;
          overflow-y: auto;
          padding: 0.5rem 1rem;
        }
        .chatbot-message {
          margin-bottom: 1rem;
          padding: 0.5rem 0.75rem;
          border-radius: 8px;
          position: relative;
          word-wrap: break-word;
        }
        .chatbot-message.bot {
          background: #3b0764;
          color: #ddd6fe;
          align-self: flex-start;
        }
        .chatbot-message.user {
          background: #6b21a8;
          color: white;
          align-self: flex-end;
        }
        .feedback-buttons {
          margin-top: 0.25rem;
          display: flex;
          gap: 0.25rem;
        }
        .feedback-buttons button {
          background: transparent;
          border: none;
          color: #ddd6fe;
          font-size: 1.1rem;
          cursor: pointer;
        }
        .feedback-thanks {
          margin-top: 0.25rem;
          font-size: 0.85rem;
          color: #a5b4fc;
        }
        .chatbot-input-area {
          display: flex;
          padding: 0.5rem 1rem;
          border-top: 1px solid #4b0082;
        }
        .chatbot-input-area input {
          flex-grow: 1;
          padding: 0.5rem;
          border-radius: 6px;
          border: none;
          font-size: 1rem;
        }
        .chatbot-input-area input:focus {
          outline: none;
          box-shadow: 0 0 5px #7c3aed;
        }
        .chatbot-input-area button {
          background: #9333ea;
          border: none;
          color: white;
          border-radius: 6px;
          padding: 0 1rem;
          margin-left: 0.5rem;
          cursor: pointer;
          font-size: 1rem;
        }
      `}</style>
    </>
  );
}
