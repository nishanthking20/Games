import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SnakeAndLadder = () => {
  const navigate = useNavigate();
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [playerPositions, setPlayerPositions] = useState({ 1: 1, 2: 1 });
  const [diceValue, setDiceValue] = useState(null);
  const [isRolling, setIsRolling] = useState(false);
  const [gameMessage, setGameMessage] = useState('');
  const [winner, setWinner] = useState(null);

  // Define snakes and ladders
  const snakes = {
    16: 6,
    47: 26,
    49: 11,
    56: 53,
    62: 19,
    64: 60,
    87: 24,
    93: 73,
    95: 75,
    98: 78
  };

  const ladders = {
    1: 38,
    4: 14,
    9: 31,
    21: 42,
    28: 84,
    36: 44,
    51: 67,
    71: 91,
    80: 100
  };

  const rollDice = () => {
    if (isRolling || winner) return;
    
    setIsRolling(true);
    setGameMessage('');
    
    // Simulate dice roll animation
    let rolls = 0;
    const rollInterval = setInterval(() => {
      setDiceValue(Math.floor(Math.random() * 6) + 1);
      rolls++;
      
      if (rolls >= 10) {
        clearInterval(rollInterval);
        setIsRolling(false);
        const finalRoll = Math.floor(Math.random() * 6) + 1;
        setDiceValue(finalRoll);
        movePlayer(finalRoll);
      }
    }, 100);
  };

  const movePlayer = (roll) => {
    const newPositions = { ...playerPositions };
    const currentPos = newPositions[currentPlayer];
    let newPos = currentPos + roll;
    
    // Check for ladder
    if (ladders[newPos]) {
      newPos = ladders[newPos];
      setGameMessage(`Player ${currentPlayer} climbed a ladder!`);
    }
    
    // Check for snake
    if (snakes[newPos]) {
      newPos = snakes[newPos];
      setGameMessage(`Player ${currentPlayer} was bitten by a snake!`);
    }
    
    // Check for win
    if (newPos >= 100) {
      newPos = 100;
      setWinner(currentPlayer);
      setGameMessage(`Player ${currentPlayer} wins!`);
    }
    
    newPositions[currentPlayer] = newPos;
    setPlayerPositions(newPositions);
    
    // Switch player if not a 6
    if (roll !== 6 && !winner) {
      setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
    }
  };

  const resetGame = () => {
    setCurrentPlayer(1);
    setPlayerPositions({ 1: 1, 2: 1 });
    setDiceValue(null);
    setIsRolling(false);
    setGameMessage('');
    setWinner(null);
  };

  const renderCell = (number) => {
    const isSnake = snakes[number];
    const isLadder = ladders[number];
    const player1Here = playerPositions[1] === number;
    const player2Here = playerPositions[2] === number;
    
    return (
      <div
        key={number}
        className={`relative w-12 h-12 border border-gray-200 rounded-lg flex items-center justify-center
                   ${isSnake ? 'bg-red-100' : isLadder ? 'bg-green-100' : 'bg-white'}
                   ${number === 100 ? 'bg-yellow-100' : ''}`}
      >
        <span className="text-sm font-semibold">{number}</span>
        {isSnake && <span className="absolute text-xs text-red-500">🐍</span>}
        {isLadder && <span className="absolute text-xs text-green-500">🪜</span>}
        <div className="absolute flex gap-1">
          {player1Here && <span className="w-2 h-2 bg-blue-500 rounded-full"></span>}
          {player2Here && <span className="w-2 h-2 bg-red-500 rounded-full"></span>}
        </div>
      </div>
    );
  };

  const renderBoard = () => {
    const cells = [];
    for (let i = 100; i >= 1; i--) {
      cells.push(renderCell(i));
    }
    return cells;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 
                     transition-all duration-200 transform hover:scale-105"
          >
            ← Back to Games
          </button>
          <h1 className="text-4xl font-bold text-purple-900">Snake & Ladder</h1>
          <div className="w-24"></div>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-2xl">
          <div className="text-center mb-8">
            <div className="text-2xl font-semibold text-gray-700 mb-4">
              {winner ? `Player ${winner} wins!` : `Player ${currentPlayer}'s turn`}
            </div>
            {gameMessage && (
              <div className="text-lg font-medium text-purple-600 mb-4">{gameMessage}</div>
            )}
            <div className="flex justify-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span>Player 1</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                <span>Player 2</span>
              </div>
            </div>
            <button
              onClick={rollDice}
              disabled={isRolling || winner}
              className={`px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl 
                       hover:from-purple-600 hover:to-purple-700 shadow-lg hover:shadow-xl 
                       transition-all duration-200 transform hover:scale-105 active:scale-95
                       font-semibold text-lg ${(isRolling || winner) ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isRolling ? 'Rolling...' : 'Roll Dice'}
            </button>
            {diceValue && (
              <div className="mt-4 text-2xl font-bold text-purple-600">
                Dice: {diceValue}
              </div>
            )}
            <button
              onClick={resetGame}
              className="ml-4 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl 
                       hover:from-red-600 hover:to-red-700 shadow-lg hover:shadow-xl 
                       transition-all duration-200 transform hover:scale-105 active:scale-95
                       font-semibold text-lg"
            >
              Reset Game
            </button>
          </div>

          <div className="grid grid-cols-10 gap-1">
            {renderBoard()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SnakeAndLadder; 