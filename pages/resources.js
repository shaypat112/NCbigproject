import { useState, useEffect, useRef } from 'react';

// Expanded chatbotsData with more questions for each language
const chatbotsData = {
  HTML: {
    greeting: "Hi! I'm your HTML helper. Ask me anything about HTML!",
    qa: {
      "what is html": "HTML stands for HyperText Markup Language and is used to create webpages.",
      "how to make a link": "Use the <a> tag with an href attribute: <a href='url'>link text</a>.",
      "what is a div": "A <div> is a block-level container used to group HTML elements.",
      "how to add an image": "Use the <img> tag with src and alt attributes: <img src='image.jpg' alt='description'/>.",
      "what is semantic html": "Semantic HTML uses tags like <header>, <footer>, <article> that describe content meaning.",
      "how to create a list": "Use <ul> for unordered lists and <ol> for ordered lists, with <li> items inside.",
      "how to add a table": "Use <table>, with <tr> for rows, <th> for headers, and <td> for data cells.",
      "how to create a form": "Use <form> tag with inputs like <input>, <textarea>, <select>, and a submit button.",
      "what is an attribute": "Attributes provide additional info about HTML elements, like href, src, alt, id, class.",
      "how to comment in html": "Use <!-- comment text --> to add comments in your HTML code.",
      "what is the doctype": "The <!DOCTYPE html> declaration defines the document as HTML5.",
      "how to add a meta tag": "Use <meta> inside <head> for page info, charset, viewport, etc.",
      "how to link css": "Use <link rel='stylesheet' href='styles.css'> in the <head> section.",
      "how to add a button": "Use <button>Click me</button> or <input type='button' value='Click me'>.",
      "what is a span": "<span> is an inline container for text or elements, useful for styling.",
      "how to make text bold": "Use <strong> or <b> tags to make text bold.",
      "how to make text italic": "Use <em> or <i> tags to italicize text.",
      "what is an iframe": "<iframe> embeds another webpage inside the current page.",
      "how to open link in new tab": "Add target='_blank' to your <a> tag.",
      "what is the difference between id and class": "id is unique for one element; class can be shared among many.",
      "what is the head tag": "The <head> contains metadata, scripts, styles, and the title of the document.",
      "how to add a favicon": "Use <link rel='icon' href='favicon.ico' type='image/x-icon'> inside <head>.",
      "what are block and inline elements": "Block elements take full width and start on new lines; inline elements do not.",
      "how to create a dropdown menu": "Use <select> with nested <option> elements.",
      "what is the alt attribute": "alt provides alternative text for images, used for accessibility.",
      "how to embed a video": "Use <video> tag with src and controls attributes.",
      "what is the difference between <section> and <div>": "<section> is semantic for content sections; <div> is a generic container.",
      "how to center text": "Use CSS: text-align: center; on the container.",
      "how to create a checkbox": "Use <input type='checkbox'>.",
      "how to create a radio button": "Use <input type='radio' name='group'> to group radio buttons.",
      "how to use data attributes": "Use data-* attributes to store custom data, e.g., data-id='123'.",
      "how to make a responsive website": "Use viewport meta tag and CSS media queries for responsiveness."
    }
  },
  Java: {
    greeting: "Hey! Ask me anything about Java programming.",
    qa: {
      "what is java": "Java is a high-level, class-based, object-oriented programming language.",
      "how to print": 'Use System.out.println("Hello"); to print output in Java.',
      "what is a class": "A class is a blueprint for creating objects.",
      "what is an object": "An object is an instance of a class.",
      "how to create a method": "Define it inside a class like: public void myMethod() { // code }",
      "what is main method": "public static void main(String[] args) is the entry point of a Java program.",
      "how to declare variable": "Example: int age = 30; declares an integer variable.",
      "what are primitive types": "int, double, boolean, char, byte, short, long, float are Java primitive types.",
      "how to write a loop": "Use for, while, or do-while loops to repeat code blocks.",
      "what is inheritance": "Inheritance allows a class to acquire properties and methods from another class.",
      "how to handle exceptions": "Use try-catch blocks to handle exceptions.",
      "what is an interface": "An interface is a contract that classes can implement.",
      "what is polymorphism": "Polymorphism allows objects to be treated as instances of their parent class.",
      "what is encapsulation": "Encapsulation hides internal object details and exposes only what’s necessary.",
      "how to create an array": "int[] arr = new int[5]; creates an array of integers.",
      "what is a constructor": "A constructor initializes a new object of a class.",
      "what is static keyword": "Static means the member belongs to the class, not instances.",
      "how to compare strings": "Use .equals() method to compare string contents.",
      "how to read input": "Use Scanner class: Scanner sc = new Scanner(System.in);",
      "what is a package": "A package groups related classes and interfaces.",
      "what is a final keyword": "final makes a variable constant or a method/class un-overridable.",
      "how to create a thread": "Implement Runnable or extend Thread class and override run() method.",
      "what is garbage collection": "Automatic memory management to free unused objects.",
      "how to use enums": "Enums define a fixed set of constants.",
      "what are annotations": "Metadata added to code, like @Override, to give info to compiler or runtime.",
      "how to declare generics": "Use angle brackets <> to create type-safe classes and methods.",
      "what is lambda expression": "Anonymous function introduced in Java 8 for functional programming.",
      "what is method overloading": "Multiple methods with same name but different parameters.",
      "what is method overriding": "Subclass provides specific implementation of a method from superclass.",
      "how to handle null pointer exceptions": "Check for null before using objects or catch NullPointerException.",
      "what is synchronized keyword": "Used to control access to blocks/methods by multiple threads."
    }
  },
  Python: {
    greeting: "Hello! Ask me about Python programming.",
    qa: {
      "what is python": "Python is a popular, easy-to-learn programming language with clear syntax.",
      "how to print": 'Use print("Hello") to output text.',
      "how to declare variable": "Simply assign: x = 10, no type declaration needed.",
      "what is a list": "A list is a mutable ordered collection: my_list = [1, 2, 3].",
      "how to write a function": "def my_function():\n    # code inside function",
      "what is a dictionary": "A dictionary stores key-value pairs: {'name': 'Alice', 'age': 25}",
      "how to write a loop": "Use for or while loops to repeat code.",
      "how to comment": "Use # for single-line comments and ''' for multi-line.",
      "what is indentation": "Indentation defines code blocks in Python, it is mandatory.",
      "how to import modules": "Use import module_name to include external code.",
      "how to handle exceptions": "Use try-except blocks to catch errors.",
      "what is a class": "A class is a blueprint to create objects.",
      "what is self": "'self' represents the instance inside class methods.",
      "how to read input": "Use input() function to get user input.",
      "how to open a file": "Use open('file.txt', 'r') to open a file for reading.",
      "what is a tuple": "A tuple is an immutable ordered collection: (1, 2, 3).",
      "how to slice a list": "Use list[start:end] to get a part of the list.",
      "what is a lambda": "Lambda is an anonymous function: lambda x: x*2",
      "how to install packages": "Use pip install package_name in terminal.",
      "how to convert types": "Use int(), str(), float() to convert between types.",
      "what is a generator": "A generator yields items one by one, saving memory.",
      "how to use list comprehension": "A concise way to create lists: [x*2 for x in range(5)]",
      "what is a virtual environment": "Isolated Python environment for managing dependencies.",
      "how to define a class constructor": "Use __init__(self) method inside the class.",
      "what is duck typing": "Python’s dynamic typing based on methods/attributes, not type itself.",
      "how to do multiple inheritance": "List multiple classes in class definition: class C(A, B):",
      "how to read a file line by line": "Use a for loop: for line in open('file.txt'):",
      "what is pep8": "Python style guide for writing clean and readable code.",
      "how to use decorators": "Functions that modify other functions using @decorator syntax.",
      "what is the difference between list and tuple": "Lists are mutable, tuples are immutable.",
      "how to handle files safely": "Use with statement: with open('file.txt') as f:",
      "what is a module": "A Python file that contains code you can import."
    }
  }
};

function MiniChatbot({ language, data }) {
  const [messages, setMessages] = useState([{ from: 'bot', text: data.greeting }]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Helper: simple fuzzy matching on questions ignoring punctuation and spaces
  const findBestMatch = (msg, qa) => {
    const normalizedMsg = msg.replace(/[^\w\s]/gi, '').trim();
    for (const key of Object.keys(qa)) {
      const normalizedKey = key.replace(/[^\w\s]/gi, '').trim();
      if (normalizedMsg === normalizedKey) return qa[key];
      // Also try partial includes to improve chances
      if (normalizedMsg.includes(normalizedKey) || normalizedKey.includes(normalizedMsg)) {
        return qa[key];
      }
    }
    return null;
  };

  const handleSubmit = e => {
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

  return (
    <div className="chatbot-card">
      <h2>{language} Chatbot</h2>
      <div className="chat-window" aria-live="polite" aria-label={`${language} chatbot conversation`}>
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.from}`}>
            {msg.text}
          </div>
        ))}
        {typing && <div className="message bot typing">Bot is typing...</div>}
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
      </form>

      <style jsx>{`
        .chatbot-card {
          background: linear-gradient(135deg, #2a0a54, #4b0082);
          border-radius: 1rem;
          padding: 1.5rem;
          box-shadow:
            0 0 15px #7c3aed,
            0 0 40px #a855f7,
            0 0 60px #c084fc;
          width: 100%;
          max-width: 400px;
          display: flex;
          flex-direction: column;
          color: #ddd6fe;
          user-select: none;
          transition: transform 0.3s ease;
          margin-bottom: 2rem;
        }
        .chatbot-card:hover {
          transform: translateY(-8px);
          box-shadow:
            0 0 25px #7c3aed,
            0 0 60px #a855f7,
            0 0 90px #c084fc;
        }
        h2 {
          margin: 0 0 1rem 0;
          color: #c084fc;
          text-align: center;
          text-shadow: 0 0 10px #c084fc;
          user-select: text;
        }
        .chat-window {
          flex-grow: 1;
          background: #1e1e2f;
          border-radius: 10px;
          padding: 1rem;
          overflow-y: auto;
          max-height: 280px;
          margin-bottom: 1rem;
          font-size: 0.95rem;
          box-shadow: inset 0 0 15px #7c3aed;
          display: flex;
          flex-direction: column;
        }
        .message {
          margin-bottom: 0.6rem;
          padding: 0.5rem 0.8rem;
          border-radius: 12px;
          max-width: 80%;
          word-wrap: break-word;
          white-space: pre-wrap;
        }
        .message.bot {
          background: #6b21a8;
          align-self: flex-start;
          color: #ddd6fe;
          box-shadow: 0 0 8px #a855f7;
        }
        .message.user {
          background: #9333ea;
          align-self: flex-end;
          color: white;
          box-shadow: 0 0 8px #f0abfc;
        }
        .message.typing {
          font-style: italic;
          opacity: 0.7;
        }
        .input-area {
          display: flex;
          gap: 0.5rem;
          align-items: center;
        }
        input {
          flex-grow: 1;
          padding: 0.5rem 1rem;
          border-radius: 12px;
          border: none;
          background: #2a2a40;
          color: white;
          font-size: 1rem;
          outline-offset: 2px;
        }
        input::placeholder {
          color: #aaa;
        }
        input:focus {
          outline: 2px solid #a855f7;
        }
        button {
          background: #9333ea;
          border: none;
          padding: 0 1.25rem;
          border-radius: 12px;
          color: white;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.3s ease;
          user-select: none;
          height: 38px;
        }
        button:hover:not(:disabled) {
          background: #a855f7;
        }
        button:disabled {
          background: #5b2e85;
          cursor: not-allowed;
        }
        .clear-btn {
          background: #44475a;
          font-weight: 600;
        }
        .clear-btn:hover {
          background: #6272a4;
        }
      `}</style>
    </div>
  );
}

export default function Resources() {
  return (
    <>
      <section style={{ textAlign: 'center', padding: '2rem 1rem' }}>
        <h1 className="glow-text" style={{ fontSize: '3rem', marginBottom: '1rem' }}>
          ProjectUcode Resources
        </h1>
        <p
          style={{
            maxWidth: 700,
            margin: '0 auto 3rem auto',
            fontSize: '1.25rem',
            color: '#ddd6fe',
            lineHeight: 1.6,
            textShadow: '0 0 10px #c084fc, 0 0 20px #a855f7',
            userSelect: 'none',
          }}
        >
          Ask our mini chatbots about HTML, Java, or Python coding basics and concepts. Start typing your question below!
        </p>
      </section>

      {/* Chatbots vertical stack centered */}
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
        }}
      >
        <MiniChatbot language="HTML" data={chatbotsData.HTML} />
        <MiniChatbot language="Java" data={chatbotsData.Java} />
        <MiniChatbot language="Python" data={chatbotsData.Python} />
      </div>
    </>
  );
}
