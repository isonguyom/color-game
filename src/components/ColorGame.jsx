import { useState } from "react";

const colors = [
  "#FF5733",
  "#33FF57",
  "#3357FF",
  "#F4D03F",
  "#8E44AD",
  "#1ABC9C",
];

const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

export default function ColorGame() {
  const [targetColor, setTargetColor] = useState(getRandomColor());
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState("");
  const [showColorBox, setShowColorBox] = useState(true);

  const handleGuess = (color) => {
    if (color === targetColor) {
      setStatus("✅ Correct!");
      setScore((prevScore) => prevScore + 1);
    } else {
      setStatus("❌ Wrong, try again!");
    }
    setShowColorBox(false); // Hide color box after selection
  };

  const newColor = () => {
    setTargetColor(getRandomColor());
    setStatus(""); // Hide status message
    setShowColorBox(true); // Show color box again
  };

  const resetGame = () => {
    setTargetColor(null);
    setStatus("");
    setScore(0);
    newColor();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-300 w-full p-4">
      {/* Game Instructions */}
      <div className="text-center mb-6" data-testid="gameInstructions">
        <h1 className="text-3xl font-bold uppercase">Color Game</h1>
        <p className="text-gray-700 max-w-md italic">
          This is a color guessing game. Choose the color that matches the color
          box from the options below.
        </p>
      </div>

      <div className="h-40 w-full max-w-xs flex items-center justify-center">
        {/* Target Color Box (Visible initially, hides when a selection is made) */}
        {showColorBox && (
          <div className="w-fit p-1 bg-white shadow-md rounded-md">
            <div
              className="w-40 h-32 rounded-md"
              style={{ backgroundColor: targetColor }}
              data-testid="colorBox"
            ></div>
          </div>
        )}

        {/* Game Status (Appears when a selection is made) */}
        {!showColorBox && status && (
          <p
            className={`text-2xl font-semibold transition-all duration-500 ease-out transform scale-95 opacity-0 animate-fadeIn ${
              status.includes("✅") ? "text-green-600" : "text-red-600"
            }`}
            data-testid="gameStatus"
          >
            {status}
          </p>
        )}
      </div>

      {/* Color Options */}
      <div className="mt-5 relative">
        <h4 className="italic absolute -top-3 bg-gray-300 p-1 left-2">
          Options
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-1 border border-gray-400 p-5 rounded-md">
          {colors.map((color) => (
            <button
              key={color}
              className="w-24 h-16 rounded-md cursor-pointer border-2 border-gray-300 transition transform hover:scale-110 active:scale-90"
              style={{ backgroundColor: color }}
              onClick={() => handleGuess(color)}
              data-testid="colorOption"
            ></button>
          ))}
        </div>
      </div>

      {/* Score Display */}
      <p className="mt-3 text-lg font-bold" data-testid="score">
        Score: {score}
      </p>

      {/* Buttons */}
      <div className="flex gap-4 mt-4">
        <button
          onClick={resetGame}
          className="px-6 py-2 bg-white border border-red-600 text-red-600 rounded-md hover:bg-red-600 hover:text-white cursor-pointer transition"
          data-testid="newGameButton"
        >
          Reset Game
        </button>

        <button
          onClick={newColor}
          className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-800 transition cursor-pointer"
        >
          New Color
        </button>
      </div>
    </div>
  );
}
