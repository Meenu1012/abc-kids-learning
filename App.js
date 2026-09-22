import React, { useState } from "react";
import "./App.css";

const alphabet = [
  ["A", "a", "Apple", "🍎"],
  ["B", "b", "Ball", "⚽"],
  ["C", "c", "Cat", "🐱"],
  ["D", "d", "Dog", "🐶"],
  ["E", "e", "Elephant", "🐘"],
  ["F", "f", "Fish", "🐟"],
  ["G", "g", "Grapes", "🍇"],
  ["H", "h", "Horse", "🐴"],
  ["I", "i", "Ice Cream", "🍦"],
  ["J", "j", "Juice", "🧃"],
  ["K", "k", "Kite", "🪁"],
  ["L", "l", "Lion", "🦁"],
  ["M", "m", "Monkey", "🐒"],
  ["N", "n", "Nest", "🪺"],
  ["O", "o", "Orange", "🍊"],
  ["P", "p", "Parrot", "🦜"],
  ["Q", "q", "Queen", "👑"],
  ["R", "r", "Rabbit", "🐰"],
  ["S", "s", "Sun", "☀️"],
  ["T", "t", "Tiger", "🐯"],
  ["U", "u", "Umbrella", "☂️"],
  ["V", "v", "Van", "🚐"],
  ["W", "w", "Watch", "⌚"],
  ["X", "x", "Xylophone", "🎵"],
  ["Y", "y", "Yo-Yo", "🪀"],
  ["Z", "z", "Zebra", "🦓"],
];

const numbers = [
  ["1", "🍎"],
  ["2", "🐶"],
  ["3", "⭐"],
  ["4", "🦋"],
  ["5", "🌸"],
  ["6", "🍭"],
  ["7", "🎈"],
  ["8", "🐱"],
  ["9", "🚗"],
  ["10", "⚽"],
];

const colors = [
  ["Red", "🔴"],
  ["Blue", "🔵"],
  ["Green", "🟢"],
  ["Yellow", "🟡"],
  ["Orange", "🟠"],
  ["Purple", "🟣"],
  ["Pink", "🩷"],
  ["Brown", "🟤"],
];

function App() {
  const [page, setPage] = useState("home");
  const [letterIndex, setLetterIndex] = useState(0);
  const [numberIndex, setNumberIndex] = useState(0);
  const [colorIndex, setColorIndex] = useState(0);

  const [quizIndex, setQuizIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("");

  function speak(text) {
    if (!window.speechSynthesis) {
      alert("Speech is not supported in this browser.");
      return;
    }

    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";
    speech.rate = 0.7;
    speech.pitch = 1.2;

    window.speechSynthesis.speak(speech);
  }

  function startQuiz() {
    setQuizIndex(0);
    setScore(0);
    setMessage("");
    setPage("quiz");
  }

  function checkAnswer(answer) {
    const correct = alphabet[quizIndex][0];

    if (answer === correct) {
      setScore((oldScore) => oldScore + 1);
      setMessage("🎉 Correct!");

      setTimeout(() => {
        setMessage("");

        if (quizIndex < 25) {
          setQuizIndex((oldIndex) => oldIndex + 1);
        } else {
          setPage("result");
        }
      }, 1000);
    } else {
      setMessage("❌ Try again!");
    }
  }

  function goHome() {
    setPage("home");
    setMessage("");
  }

  /* HOME */

  if (page === "home") {
    return (
      <div className="app">
        <h1>🌈 ABC Kids 🌈</h1>

        <p className="subtitle">Learn • Play • Have Fun!</p>

        <div className="homeCards">
          <button className="menuCard abcCard" onClick={() => setPage("abc")}>
            <span>🔤</span>
            <h2>Learn ABC</h2>
            <p>Learn A to Z</p>
          </button>

          <button
            className="menuCard numberCard"
            onClick={() => setPage("numbers")}
          >
            <span>🔢</span>
            <h2>Numbers</h2>
            <p>Learn 1 to 10</p>
          </button>

          <button
            className="menuCard colorCard"
            onClick={() => setPage("colors")}
          >
            <span>🎨</span>
            <h2>Colors</h2>
            <p>Learn colors</p>
          </button>

          <button className="menuCard quizMenuCard" onClick={startQuiz}>
            <span>🎯</span>
            <h2>ABC Quiz</h2>
            <p>Test your knowledge</p>
          </button>
        </div>

        <p className="footerText">⭐ Learning is fun! ⭐</p>
      </div>
    );
  }

  /* ABC */

  if (page === "abc") {
    const current = alphabet[letterIndex];

    return (
      <div className="app">
        <button className="homeButton" onClick={goHome}>
          🏠 Home
        </button>

        <h1>🔤 Learn ABC</h1>

        <div className="card">
          <div className="letter">{current[0]}</div>

          <div className="smallLetter">{current[1]}</div>

          <div className="emoji">{current[3]}</div>

          <h2>
            {current[0]} for {current[2]}
          </h2>

          <button
            className="speakButton"
            onClick={() => speak(`${current[0]} for ${current[2]}`)}
          >
            🔊 Listen
          </button>
        </div>

        <div className="buttons">
          <button onClick={() => setLetterIndex((old) => Math.max(0, old - 1))}>
            ⬅️ Previous
          </button>

          <button
            onClick={() => setLetterIndex((old) => Math.min(25, old + 1))}
          >
            Next ➡️
          </button>
        </div>

        <p className="progress">Letter {letterIndex + 1} / 26</p>
      </div>
    );
  }

  /* NUMBERS */

  if (page === "numbers") {
    const current = numbers[numberIndex];

    return (
      <div className="app">
        <button className="homeButton" onClick={goHome}>
          🏠 Home
        </button>

        <h1>🔢 Learn Numbers</h1>

        <div className="numberCard">
          <div className="bigNumber">{current[0]}</div>

          <div className="numberEmoji">{current[1]}</div>

          <h2>Number {current[0]}</h2>

          <button className="speakButton" onClick={() => speak(current[0])}>
            🔊 Listen
          </button>
        </div>

        <div className="buttons">
          <button onClick={() => setNumberIndex((old) => Math.max(0, old - 1))}>
            ⬅️ Previous
          </button>

          <button onClick={() => setNumberIndex((old) => Math.min(9, old + 1))}>
            Next ➡️
          </button>
        </div>

        <p className="progress">Number {numberIndex + 1} / 10</p>
      </div>
    );
  }

  /* COLORS */

  if (page === "colors") {
    const current = colors[colorIndex];

    return (
      <div className="app">
        <button className="homeButton" onClick={goHome}>
          🏠 Home
        </button>

        <h1>🎨 Learn Colors</h1>

        <div className="colorCard">
          <div className="colorEmoji">{current[1]}</div>

          <h2>{current[0]}</h2>

          <button className="speakButton" onClick={() => speak(current[0])}>
            🔊 Listen
          </button>
        </div>

        <div className="buttons">
          <button onClick={() => setColorIndex((old) => Math.max(0, old - 1))}>
            ⬅️ Previous
          </button>

          <button onClick={() => setColorIndex((old) => Math.min(7, old + 1))}>
            Next ➡️
          </button>
        </div>

        <p className="progress">Color {colorIndex + 1} / 8</p>
      </div>
    );
  }

  /* QUIZ */

  if (page === "quiz") {
    const question = alphabet[quizIndex];

    const options = [
      question[0],
      alphabet[(quizIndex + 1) % 26][0],
      alphabet[(quizIndex + 2) % 26][0],
    ];

    return (
      <div className="app">
        <button className="homeButton" onClick={goHome}>
          🏠 Home
        </button>

        <h1>🎯 ABC Quiz</h1>

        <p className="quizQuestion">Which letter matches this?</p>

        <div className="quizCard">
          <div className="quizEmoji">{question[3]}</div>

          <h2>{question[2]}</h2>

          <button
            className="speakButton"
            onClick={() => speak(`${question[0]} for ${question[2]}`)}
          >
            🔊 Listen
          </button>
        </div>

        <div className="quizOptions">
          {options.map((option) => (
            <button key={option} onClick={() => checkAnswer(option)}>
              {option}
            </button>
          ))}
        </div>

        <h3 className="message">{message}</h3>

        <p className="score">⭐ Score: {score}</p>

        <p>Question {quizIndex + 1} / 26</p>
      </div>
    );
  }

  /* RESULT */

  return (
    <div className="app">
      <h1>🏆 Quiz Complete!</h1>

      <div className="resultCard">
        <div className="trophy">🏆</div>

        <h2>Your Score</h2>

        <div className="finalScore">{score} / 26</div>

        <p>🎉 Great job!</p>

        <button className="quizButton" onClick={startQuiz}>
          🔄 Play Again
        </button>

        <br />

        <button className="homeButton" onClick={goHome}>
          🏠 Home
        </button>
      </div>
    </div>
  );
}

export default App;
