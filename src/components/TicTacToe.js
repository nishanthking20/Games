import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TicTacToe = () => {
  const navigate = useNavigate();
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [isDraw, setIsDraw] = useState(false);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (i) => {
    if (winner || board[i]) return;

    const newBoard = [...board];
    newBoard[i] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const gameWinner = calculateWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
    } else if (!newBoard.includes(null)) {
      setIsDraw(true);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setIsDraw(false);
  };

  const renderSquare = (i) => {
    const value = board[i];
    const isWinningSquare = winner && 
      (winner === board[0] && [0, 1, 2].includes(i) ||
       winner === board[3] && [3, 4, 5].includes(i) ||
       winner === board[6] && [6, 7, 8].includes(i) ||
       winner === board[0] && [0, 3, 6].includes(i) ||
       winner === board[1] && [1, 4, 7].includes(i) ||
       winner === board[2] && [2, 5, 8].includes(i) ||
       winner === board[0] && [0, 4, 8].includes(i) ||
       winner === board[2] && [2, 4, 6].includes(i));

    return (
      <button
        onClick={() => handleClick(i)}
        className={`w-24 h-24 text-4xl font-bold rounded-xl transition-all duration-200
                   ${value ? 'bg-white' : 'bg-gray-100 hover:bg-gray-200'}
                   ${isWinningSquare ? 'bg-green-100 text-green-600' : ''}
                   ${value === 'X' ? 'text-blue-600' : 'text-red-600'}`}
      >
        {value}
      </button>
    );
  };

  const getStatus = () => {
    if (winner) {
      return `Winner: ${winner}`;
    }
    if (isDraw) {
      return "It's a draw!";
    }
    return `Next player: ${isXNext ? 'X' : 'O'}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 
                     transition-all duration-200 transform hover:scale-105"
          >
            ← Back to Games
          </button>
          <h1 className="text-4xl font-bold text-green-900">Tic Tac Toe</h1>
          <div className="w-24"></div>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-2xl">
          <div className="text-center mb-8">
            <div className="text-2xl font-semibold text-gray-700 mb-4">{getStatus()}</div>
            <button
              onClick={resetGame}
              className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl 
                       hover:from-red-600 hover:to-red-700 shadow-lg hover:shadow-xl 
                       transition-all duration-200 transform hover:scale-105 active:scale-95
                       font-semibold text-lg"
            >
              Reset Game
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4 justify-center">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i}>{renderSquare(i)}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicTacToe; 