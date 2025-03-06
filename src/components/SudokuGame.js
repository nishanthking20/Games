import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SudokuBoard from './SudokuBoard';
import NumberPad from './NumberPad';

// Initial Sudoku puzzle (0 represents empty cells)
const initialBoard = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9]
];

// Solution for validation
const solution = [
  [5, 3, 4, 6, 7, 8, 9, 1, 2],
  [6, 7, 2, 1, 9, 5, 3, 4, 8],
  [1, 9, 8, 3, 4, 2, 5, 6, 7],
  [8, 5, 9, 7, 6, 1, 4, 2, 3],
  [4, 2, 6, 8, 5, 3, 7, 9, 1],
  [7, 1, 3, 9, 2, 4, 8, 5, 6],
  [9, 6, 1, 5, 3, 7, 2, 8, 4],
  [2, 8, 7, 4, 1, 9, 6, 3, 5],
  [3, 4, 5, 2, 8, 6, 1, 7, 9]
];

function SudokuGame() {
  const navigate = useNavigate();
  const [board, setBoard] = useState(initialBoard);
  const [selectedCell, setSelectedCell] = useState(null);

  const handleCellClick = (row, col) => {
    // Only allow selection of empty cells or user-filled cells
    if (initialBoard[row][col] === 0) {
      setSelectedCell({ row, col });
    }
  };

  const handleNumberClick = (number) => {
    if (selectedCell) {
      const newBoard = board.map(row => [...row]);
      newBoard[selectedCell.row][selectedCell.col] = number;
      setBoard(newBoard);
      
      // Check if the board is complete and correct
      if (isBoardComplete(newBoard) && isBoardCorrect(newBoard)) {
        setTimeout(() => {
          alert('Congratulations! You solved the puzzle correctly!');
          resetBoard();
        }, 100);
      }
    }
  };

  const isBoardComplete = (currentBoard) => {
    return currentBoard.every(row => row.every(cell => cell !== 0));
  };

  const isBoardCorrect = (currentBoard) => {
    return currentBoard.every((row, rowIndex) =>
      row.every((cell, colIndex) => cell === solution[rowIndex][colIndex])
    );
  };

  const resetBoard = () => {
    setBoard(initialBoard);
    setSelectedCell(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 
                     transition-all duration-200 transform hover:scale-105"
          >
            ← Back to Games
          </button>
          <h1 className="text-4xl font-bold text-blue-900">Sudoku</h1>
          <div className="w-24"></div>
        </div>
        <p className="text-center text-blue-600 mb-8">Fill in the numbers to solve the puzzle</p>
        <div className="bg-white p-8 rounded-3xl shadow-2xl">
          <SudokuBoard
            board={board}
            onCellClick={handleCellClick}
            selectedCell={selectedCell}
          />
          <div className="flex justify-between items-center mt-8">
            <NumberPad onNumberClick={handleNumberClick} />
            <button
              onClick={resetBoard}
              className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl 
                       hover:from-red-600 hover:to-red-700 shadow-lg hover:shadow-xl 
                       transition-all duration-200 transform hover:scale-105 active:scale-95
                       font-semibold text-lg"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SudokuGame; 