import React, { useState, useRef, useEffect } from 'react';

const cannedResponses = {
  "hello": 'Hello! How can I assist you today?',
  "projectucode": 'ProjectUcode is a community-driven platform where coders and creators collaborate on exciting projects. Join us to learn, share, and innovate together!',
  "apply": 'To apply for ProjectUcode, visit our Apply page where you can find officer and member application forms.',
  "officer applications": 'To apply as an officer, please fill out the Officer Application form available on our Apply page.',
  "member applications": 'To apply as a member, please fill out the Member Application form.',
  "resources": 'Check out our Resources page for a curated list of tools, tutorials, and guides to help you in your coding journey.',
  "learning hub": 'Our Learning Hub offers a variety of courses, workshops, and resources.',

  "default": "Sorry, I didn't understand. Try asking something else related to coding or ProjectUcode!",
};

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: "Hi! Ask me anything about ProjectUcode.", feedback: null },
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // NEW FEATURE: When chatbot opens, reset greeting message
  useEffect(() => {
    if (open) {
      setMessages([{ from: 'bot', text: "Hi! Ask me anything about ProjectUcode.", feedback: null }]);
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
      setMessages((msgs) => [
        ...msgs,
        { from: 'bot', text: response, feedback: null },
      ]);
    }, 500);
  }

  const handleFeedback = (index, value) => {
    setMessages(prev =>
      prev.map((msg, i) =>
        i === index ? { ...msg, feedback: value } : msg
      )
    );
  };

  // NEW FEATURE: clear chat function
  function clearChat() {
    setMessages([{ from: 'bot', text: "Chat cleared! Ask me anything about ProjectUcode.", feedback: null }]);
    setInput('');
  }

  return (
    <>
      <button
        className="chatbot-toggle"
        onClick={() => setOpen(!open)}
        aria-label="Toggle chatbot"
      >
        💬
      </button>
      {open && (
        <div className="chatbot-window" role="dialog" aria-modal="true" aria-label="ProjectUcode chatbot window">
          <div className="chatbot-header">
            <h4>ProjectUcode Chatbot</h4>
            <button onClick={() => setOpen(false)} aria-label="Close chatbot">✖️</button>
          </div>
          <div style={{ padding: '0 1rem 0.5rem' }}>
            {/* NEW FEATURE: Clear chat button */}
            <button
              onClick={clearChat}
              aria-label="Clear chat"
              style={{
                background: '#7c3aed',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                padding: '0.3rem 0.8rem',
                cursor: 'pointer',
                marginBottom: '0.5rem',
                fontSize: '0.85rem',
              }}
            >
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
            <button onClick={sendMessage} aria-label="Send message">Send</button>
          </div>
        </div>
      )}

      <style jsx>{`
        /* Your existing styles here, unchanged */
      `}</style>
    </>
  );
}
