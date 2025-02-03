import { useState } from "react";

const colors = ["#FF5733", "#33FF57", "#3357FF", "#F4D03F", "#8E44AD", "#1ABC9C"];

const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

export default function ColorGame() {
  const [targetColor, setTargetColor] = useState(getRandomColor());
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState("");
  
  const handleGuess = (color) => {
    if (color === targetColor) {
      setStatus("✅ Correct!");
      setScore(score + 1);
    } else {
      setStatus("❌ Wrong, try again!");
    }
  };

  const resetGame = () => {
    setTargetColor(getRandomColor());
    setStatus("");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4" data-testid="gameInstructions">
        Guess the correct color!
      </h1>

      {/* Target Color Box */}
      <div
        className="w-32 h-32 rounded-md shadow-md mb-4"
        style={{ backgroundColor: targetColor }}
        data-testid="colorBox"
      ></div>

      {/* Color Options */}
      <div className="grid grid-cols-3 gap-4">
        {colors.map((color) => (
          <button
            key={color}
            className="w-16 h-16 rounded-md border-2 border-gray-300 transition hover:scale-110"
            style={{ backgroundColor: color }}
            onClick={() => handleGuess(color)}
            data-testid="colorOption"
          ></button>
        ))}
      </div>

      {/* Game Status */}
      <p className="mt-4 text-lg font-semibold" data-testid="gameStatus">
        {status}
      </p>

      {/* Score Display */}
      <p className="mt-2 text-lg font-bold" data-testid="score">
        Score: {score}
      </p>

      {/* New Game Button */}
      <button
        onClick={resetGame}
        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        data-testid="newGameButton"
      >
        New Game
      </button>
    </div>
  );
}
