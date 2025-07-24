import Head from 'next/head';
import { useState, useEffect, useRef } from 'react';

// -- Helper Functions --
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];
  for (let [a, b, c] of lines) {
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return squares[a];
    }
  }
  return null;
}

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// -- Components --

// GameCard container for styling each game nicely
function GameCard({ title, children }) {
  return (
    <>
      <section className="game-card">
        <h2>{title}</h2>
        {children}
      </section>
      <style jsx>{`
        .game-card {
          background: #2a0a54;
          padding: 1.5rem;
          border-radius: 12px;
          box-shadow: 0 0 20px #a855f7aa;
          user-select: none;
        }
        h2 {
          margin-bottom: 1rem;
          color: #d8b4fe;
          text-shadow: 0 0 6px #a855f7;
        }
      `}</style>
    </>
  );
}

// Tic Tac Toe with enhanced styling and draw status
function TicTacToe() {
  const initialBoard = Array(9).fill(null);
  const [board, setBoard] = useState(initialBoard);
  const [xIsNext, setXIsNext] = useState(true);

  const handleClick = (index) => {
    if (board[index] || calculateWinner(board)) return;
    const newBoard = [...board];
    newBoard[index] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  const winner = calculateWinner(board);
  const status = winner
    ? `Winner: ${winner}`
    : board.every((cell) => cell !== null)
    ? "It's a Draw!"
    : `Next: ${xIsNext ? 'X' : 'O'}`;

  return (
    <div>
      <p className="status">{status}</p>
      <div className="board">
        {board.map((cell, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            className={`cell ${cell === 'X' ? 'x' : cell === 'O' ? 'o' : ''}`}
            aria-label={cell ? `Cell ${i + 1} is ${cell}` : `Cell ${i + 1} is empty`}
          >
            {cell}
          </button>
        ))}
      </div>
      <button onClick={() => setBoard(initialBoard)} className="reset-btn">
        Reset
      </button>
      <style jsx>{`
        .status {
          font-weight: bold;
          margin-bottom: 10px;
          font-size: 1.1rem;
          color: #f0e6ff;
        }
        .board {
          display: grid;
          grid-template-columns: repeat(3, 60px);
          gap: 8px;
          justify-content: center;
          margin-bottom: 1rem;
        }
        .cell {
          width: 60px;
          height: 60px;
          font-size: 1.8rem;
          font-weight: 900;
          border-radius: 10px;
          border: 2px solid #a855f7;
          background: #3b0763;
          color: #ddd6fe;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        .cell:hover {
          background-color: #6b21a8;
        }
        .cell.x {
          color: #facc15;
          text-shadow: 0 0 8px #facc15;
        }
        .cell.o {
          color: #60a5fa;
          text-shadow: 0 0 8px #60a5fa;
        }
        .reset-btn {
          padding: 8px 16px;
          background: #9333ea;
          border: none;
          border-radius: 8px;
          color: white;
          cursor: pointer;
          font-weight: 700;
          box-shadow: 0 0 15px #a855f7;
          transition: background-color 0.3s ease;
        }
        .reset-btn:hover {
          background: #7c2aed;
        }
      `}</style>
    </div>
  );
}

// Rock Paper Scissors with score tracking and button glow
function RockPaperScissors() {
  const [playerChoice, setPlayerChoice] = useState('');
  const [result, setResult] = useState('');
  const [score, setScore] = useState({ wins: 0, losses: 0, ties: 0 });

  const play = (choice) => {
    const options = ['Rock', 'Paper', 'Scissors'];
    const bot = options[Math.floor(Math.random() * 3)];
    setPlayerChoice(`You chose: ${choice} | Bot chose: ${bot}`);

    if (choice === bot) {
      setResult("It's a tie!");
      setScore((s) => ({ ...s, ties: s.ties + 1 }));
    } else if (
      (choice === 'Rock' && bot === 'Scissors') ||
      (choice === 'Paper' && bot === 'Rock') ||
      (choice === 'Scissors' && bot === 'Paper')
    ) {
      setResult('You win!');
      setScore((s) => ({ ...s, wins: s.wins + 1 }));
    } else {
      setResult('You lose!');
      setScore((s) => ({ ...s, losses: s.losses + 1 }));
    }
  };

  return (
    <div>
      <div className="buttons" role="group" aria-label="Rock Paper Scissors buttons">
        {['Rock', 'Paper', 'Scissors'].map((option) => (
          <button
            key={option}
            onClick={() => play(option)}
            className="rps-btn"
            aria-label={`Play ${option}`}
          >
            {option === 'Rock' ? '🪨' : option === 'Paper' ? '📄' : '✂️'} {option}
          </button>
        ))}
      </div>
      <p className="choice">{playerChoice}</p>
      <p className="result">{result}</p>
      <p className="score" aria-live="polite">
        Score - Wins: {score.wins} | Losses: {score.losses} | Ties: {score.ties}
      </p>

      <style jsx>{`
        .buttons {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }
        .rps-btn {
          background: #6b21a8;
          border: none;
          color: white;
          font-size: 1rem;
          padding: 0.6rem 1rem;
          border-radius: 12px;
          cursor: pointer;
          box-shadow: 0 0 10px #a855f7;
          transition: transform 0.2s ease;
          user-select: none;
        }
        .rps-btn:hover,
        .rps-btn:focus-visible {
          transform: scale(1.1);
          box-shadow: 0 0 20px #d8b4fe;
          outline: none;
        }
        .choice, .result, .score {
          margin: 0.3rem 0;
          font-weight: 600;
        }
        .result {
          font-size: 1.2rem;
          color: #facc15;
          text-shadow: 0 0 6px #facc15;
        }
      `}</style>
    </div>
  );
}

// Click Counter with pulse animation on click
function ClickCounter() {
  const [count, setCount] = useState(0);
  const buttonRef = useRef();

  const handleClick = () => {
    setCount(count + 1);
    if (buttonRef.current) {
      buttonRef.current.classList.add('pulse');
      setTimeout(() => {
        buttonRef.current.classList.remove('pulse');
      }, 300);
    }
  };

  return (
    <div>
      <p>Clicks: <strong>{count}</strong></p>
      <button
        ref={buttonRef}
        onClick={handleClick}
        className="click-btn"
        aria-label="Increment click count"
      >
        Click Me!
      </button>

      <style jsx>{`
        .click-btn {
          padding: 0.7rem 1.4rem;
          background: #9333ea;
          border: none;
          border-radius: 20px;
          color: white;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 0 15px #a855f7;
          transition: transform 0.15s ease;
          user-select: none;
        }
        .click-btn:hover,
        .click-btn:focus-visible {
          background: #7c2aed;
          outline: none;
        }
        .pulse {
          animation: pulseAnim 0.3s ease;
        }
        @keyframes pulseAnim {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
}

// Guess The Number game with hints and attempts count
function GuessNumber() {
  const [target, setTarget] = useState(() => Math.floor(Math.random() * 100) + 1);
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const checkGuess = () => {
    const numGuess = parseInt(guess);
    if (isNaN(numGuess)) {
      setMessage('Please enter a valid number!');
      return;
    }
    setAttempts(attempts + 1);

    if (numGuess === target) {
      setMessage(`🎉 Correct! You guessed it in ${attempts + 1} attempts.`);
      setGameOver(true);
    } else if (numGuess < target) {
      setMessage('Try higher! ⬆️');
    } else {
      setMessage('Try lower! ⬇️');
    }
  };

  const resetGame = () => {
    setTarget(Math.floor(Math.random() * 100) + 1);
    setGuess('');
    setMessage('');
    setAttempts(0);
    setGameOver(false);
  };

  return (
    <div>
      <p>I'm thinking of a number between 1 and 100.</p>
      <input
        type="number"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        placeholder="Enter your guess"
        disabled={gameOver}
        aria-label="Guess input"
      />
      <button onClick={checkGuess} disabled={gameOver} className="guess-btn">
        Guess
      </button>
      <p>{message}</p>
      {gameOver && (
        <button onClick={resetGame} className="reset-btn">
          Play Again
        </button>
      )}

      <style jsx>{`
        input {
          padding: 0.5rem;
          border-radius: 8px;
          border: none;
          margin-right: 0.5rem;
          width: 100px;
          font-size: 1rem;
        }
        input:disabled {
          background-color: #ddd6fe33;
          cursor: not-allowed;
        }
        .guess-btn {
          padding: 0.5rem 1rem;
          background: #9333ea;
          border: none;
          border-radius: 10px;
          color: white;
          cursor: pointer;
          font-weight: 600;
          box-shadow: 0 0 12px #a855f7;
          user-select: none;
        }
        .guess-btn:disabled {
          background: #5b21b6;
          cursor: not-allowed;
        }
        .reset-btn {
          margin-top: 1rem;
          background: #3b0763;
          border: none;
          border-radius: 10px;
          padding: 0.5rem 1.5rem;
          color: #ddd6fe;
          cursor: pointer;
          font-weight: 600;
          box-shadow: 0 0 15px #a855f7;
        }
        .reset-btn:hover,
        .reset-btn:focus-visible {
          background: #5b21b6;
          outline: none;
        }
      `}</style>
    </div>
  );
}

// Memory Match card game with pairs matching
function MemoryMatch() {
  const symbols = ['🍎', '🍌', '🍇', '🍉', '🍓', '🍒'];
  const [cards, setCards] = useState(() => {
    const pairs = [...symbols, ...symbols];
    return shuffleArray(pairs).map((symbol, idx) => ({
      id: idx,
      symbol,
      flipped: false,
      matched: false,
    }));
  });

  const [firstChoice, setFirstChoice] = useState(null);
  const [secondChoice, setSecondChoice] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [matchesCount, setMatchesCount] = useState(0);

  useEffect(() => {
    if (firstChoice && secondChoice) {
      setDisabled(true);
      if (firstChoice.symbol === secondChoice.symbol) {
        setCards((prev) =>
          prev.map((card) => {
            if (card.symbol === firstChoice.symbol) return { ...card, matched: true };
            return card;
          })
        );
        setMatchesCount((m) => m + 1);
        resetTurn();
      } else {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((card) => {
              if (card.id === firstChoice.id || card.id === secondChoice.id) {
                return { ...card, flipped: false };
              }
              return card;
            })
          );
          resetTurn();
        }, 1000);
      }
    }
  }, [firstChoice, secondChoice]);

  const resetTurn = () => {
    setFirstChoice(null);
    setSecondChoice(null);
    setDisabled(false);
  };

  const handleClick = (card) => {
    if (disabled || card.flipped || card.matched) return;

    setCards((prev) =>
      prev.map((c) => (c.id === card.id ? { ...c, flipped: true } : c))
    );

    if (!firstChoice) setFirstChoice(card);
    else if (!secondChoice) setSecondChoice(card);
  };

  const resetGame = () => {
    const pairs = [...symbols, ...symbols];
    setCards(
      shuffleArray(pairs).map((symbol, idx) => ({
        id: idx,
        symbol,
        flipped: false,
        matched: false,
      }))
    );
    setFirstChoice(null);
    setSecondChoice(null);
    setMatchesCount(0);
    setDisabled(false);
  };

  return (
    <div>
      <p>Match all the pairs! Matched: {matchesCount} / {symbols.length}</p>
      <div className="grid">
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => handleClick(card)}
            className={`card ${card.flipped || card.matched ? 'flipped' : ''}`}
            aria-label={card.flipped || card.matched ? `Card ${card.symbol}` : 'Hidden card'}
          >
            {card.flipped || card.matched ? card.symbol : '❓'}
          </button>
        ))}
      </div>
      {matchesCount === symbols.length && (
        <button onClick={resetGame} className="reset-btn" aria-label="Play again">
          Play Again
        </button>
      )}

      <style jsx>{`
        .grid {
          display: grid;
          grid-template-columns: repeat(4, 60px);
          gap: 12px;
          justify-content: center;
          margin: 1rem 0;
        }
        .card {
          font-size: 2rem;
          background: #3b0763;
          border-radius: 12px;
          border: 2px solid #a855f7;
          color: #ddd6fe;
          cursor: pointer;
          height: 60px;
          width: 60px;
          transition: transform 0.3s ease;
          user-select: none;
        }
        .card.flipped {
          background: #9333ea;
          color: #fff;
          box-shadow: 0 0 12px #d8b4fe;
        }
        .reset-btn {
          margin-top: 1rem;
          background: #6b21a8;
          border: none;
          border-radius: 10px;
          padding: 0.6rem 1.2rem;
          color: white;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 0 15px #a855f7;
          user-select: none;
        }
        .reset-btn:hover,
        .reset-btn:focus-visible {
          background: #7c2aed;
          outline: none;
        }
      `}</style>
    </div>
  );
}

// NEW GAMES & FEATURES ---

// 1) Simple Dice Roller
function DiceRoller() {
  const [dice, setDice] = useState([1, 1]);

  const rollDice = () => {
    setDice([Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1]);
  };

  return (
    <div>
      <p>Roll the dice! 🎲</p>
      <div className="dice-container">
        {dice.map((num, i) => (
          <div key={i} className="dice" aria-label={`Dice ${i + 1}: ${num}`}>
            {num}
          </div>
        ))}
      </div>
      <button onClick={rollDice} className="roll-btn" aria-label="Roll dice">
        Roll Dice
      </button>

      <style jsx>{`
        .dice-container {
          display: flex;
          justify-content: center;
          gap: 1rem;
          font-size: 3rem;
          margin: 1rem 0;
        }
        .dice {
          width: 60px;
          height: 60px;
          background: #3b0763;
          border-radius: 12px;
          border: 2px solid #a855f7;
          color: #ddd6fe;
          display: flex;
          align-items: center;
          justify-content: center;
          user-select: none;
          box-shadow: 0 0 10px #a855f7;
        }
        .roll-btn {
          padding: 0.6rem 1.2rem;
          background: #9333ea;
          border: none;
          border-radius: 10px;
          color: white;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 0 15px #a855f7;
          user-select: none;
        }
        .roll-btn:hover,
        .roll-btn:focus-visible {
          background: #7c2aed;
          outline: none;
        }
      `}</style>
    </div>
  );
}

// 2) Simple Countdown Timer
function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState(30);
  const [isActive, setIsActive] = useState(false);
  const timerId = useRef(null);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerId.current = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      alert("Time's up!");
    }
    return () => clearTimeout(timerId.current);
  }, [isActive, timeLeft]);

  const startTimer = () => {
    if (timeLeft > 0) setIsActive(true);
  };
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(30);
  };

  return (
    <div>
      <p>Countdown: {timeLeft} seconds</p>
      <button onClick={startTimer} disabled={isActive || timeLeft === 0} className="timer-btn">
        Start
      </button>
      <button onClick={resetTimer} className="timer-btn">
        Reset
      </button>

      <style jsx>{`
        p {
          font-weight: 700;
          font-size: 1.5rem;
          margin-bottom: 0.8rem;
          color: #ddd6fe;
        }
        .timer-btn {
          margin: 0 0.5rem;
          padding: 0.5rem 1.2rem;
          background: #9333ea;
          border: none;
          border-radius: 10px;
          color: white;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 0 15px #a855f7;
          user-select: none;
        }
        .timer-btn:disabled {
          background: #5b21b6;
          cursor: not-allowed;
        }
        .timer-btn:hover:not(:disabled),
        .timer-btn:focus-visible:not(:disabled) {
          background: #7c2aed;
          outline: none;
        }
      `}</style>
    </div>
  );
}

// 3) Simple Color Picker Game (guess the color by name)
function ColorPickerGame() {
  const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];
  const [targetColor, setTargetColor] = useState('');
  const [message, setMessage] = useState('');
  const [gameActive, setGameActive] = useState(false);

  const startGame = () => {
    setTargetColor(colors[Math.floor(Math.random() * colors.length)]);
    setMessage('');
    setGameActive(true);
  };

  const guessColor = (color) => {
    if (!gameActive) return;
    if (color === targetColor) {
      setMessage(`Correct! It was ${color}. 🎉`);
      setGameActive(false);
    } else {
      setMessage(`Wrong! Try again.`);
    }
  };

  return (
    <div>
      <p>Guess the color:</p>
      <div className="color-buttons">
        {colors.map((color) => (
          <button
            key={color}
            style={{ backgroundColor: color, color: 'white' }}
            onClick={() => guessColor(color)}
            disabled={!gameActive}
            aria-label={`Guess ${color}`}
          >
            {color}
          </button>
        ))}
      </div>
      <p>{message}</p>
      {!gameActive && (
        <button onClick={startGame} className="start-btn" aria-label="Start Color Picker Game">
          Start Game
        </button>
      )}

      <style jsx>{`
        .color-buttons {
          display: flex;
          justify-content: center;
          gap: 0.7rem;
          margin: 0.5rem 0 1rem 0;
        }
        button {
          border: none;
          border-radius: 8px;
          padding: 0.6rem 1rem;
          cursor: pointer;
          font-weight: 700;
          box-shadow: 0 0 10px #a855f7;
          user-select: none;
          transition: transform 0.15s ease;
        }
        button:hover:not(:disabled),
        button:focus-visible:not(:disabled) {
          transform: scale(1.1);
          outline: none;
        }
        button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .start-btn {
          background: #9333ea;
          color: white;
          box-shadow: 0 0 15px #a855f7;
          margin-top: 0.5rem;
        }
        .start-btn:hover,
        .start-btn:focus-visible {
          background: #7c2aed;
          outline: none;
        }
      `}</style>
    </div>
  );
}

// 4) Simple Word Scramble Game
function WordScramble() {
  const words = ['code', 'next', 'react', 'game', 'fun', 'ucode', 'purple', 'javascript'];
  const [word, setWord] = useState('');
  const [scrambled, setScrambled] = useState('');
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');
  const [gameActive, setGameActive] = useState(false);

  const scrambleWord = (w) => {
    const arr = w.split('');
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.join('');
  };

  const startGame = () => {
    const newWord = words[Math.floor(Math.random() * words.length)];
    setWord(newWord);
    setScrambled(scrambleWord(newWord));
    setGuess('');
    setMessage('');
    setGameActive(true);
  };

  const checkGuess = () => {
    if (guess.toLowerCase() === word) {
      setMessage('Correct! 🎉');
      setGameActive(false);
    } else {
      setMessage('Try again!');
    }
  };

  return (
    <div>
      <p>Unscramble the word:</p>
      <p className="scrambled">{scrambled}</p>
      <input
        type="text"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        disabled={!gameActive}
        placeholder="Your guess"
        aria-label="Your guess input"
      />
      <button onClick={checkGuess} disabled={!gameActive} className="guess-btn">
        Guess
      </button>
      <p>{message}</p>
      {!gameActive && (
        <button onClick={startGame} className="start-btn" aria-label="Start Word Scramble Game">
          Start Game
        </button>
      )}

      <style jsx>{`
        .scrambled {
          font-weight: 700;
          font-size: 1.6rem;
          margin: 0.5rem 0 1rem 0;
          color: #ddd6fe;
          text-shadow: 0 0 8px #a855f7;
        }
        input {
          padding: 0.5rem;
          border-radius: 8px;
          border: none;
          margin-right: 0.5rem;
          font-size: 1rem;
          width: 150px;
        }
        input:disabled {
          background-color: #ddd6fe33;
          cursor: not-allowed;
        }
        .guess-btn,
        .start-btn {
          padding: 0.5rem 1rem;
          background: #9333ea;
          border: none;
          border-radius: 10px;
          color: white;
          cursor: pointer;
          font-weight: 600;
          box-shadow: 0 0 12px #a855f7;
          user-select: none;
        }
        .guess-btn:disabled {
          background: #5b21b6;
          cursor: not-allowed;
        }
        .guess-btn:hover:not(:disabled),
        .start-btn:hover,
        .guess-btn:focus-visible:not(:disabled),
        .start-btn:focus-visible {
          background: #7c2aed;
          outline: none;
        }
      `}</style>
    </div>
  );
}

// Main Games page component that uses all these game components
export default function Games() {
  return (
    <>
      <Head>
        <title>Games | Project UCode</title>
      </Head>
      <div className="games-container">
        <h1>🎮 Fun Mini Games</h1>
        <div className="games-grid">
          {/* Original 5 games */}
          <GameCard title="Tic Tac Toe"><TicTacToe /></GameCard>
          <GameCard title="Rock Paper Scissors"><RockPaperScissors /></GameCard>
          <GameCard title="Click Counter"><ClickCounter /></GameCard>
          <GameCard title="Guess the Number"><GuessNumber /></GameCard>
          <GameCard title="Memory Match"><MemoryMatch /></GameCard>

          {/* New 6 + 4 games */}
          <GameCard title="Dice Roller"><DiceRoller /></GameCard>
          <GameCard title="Countdown Timer"><CountdownTimer /></GameCard>
          <GameCard title="Color Picker Game"><ColorPickerGame /></GameCard>
          <GameCard title="Word Scramble"><WordScramble /></GameCard>

          {/* Bonus: add 6 more simple fun games if you want to expand later */}
        </div>
      </div>

      <style jsx>{`
        .games-container {
          max-width: 960px;
          margin: 2rem auto;
          padding: 0 1rem;
          color: white;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          text-align: center;
        }
        h1 {
          font-size: 2.8rem;
          margin-bottom: 2rem;
          color: #a855f7;
          text-shadow: 0 0 8px #a855f7;
        }
        .games-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2.5rem;
        }
      `}</style>
    </>
  );
}
