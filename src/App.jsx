import React, { useState } from 'react';
import SudokuBoard from './components/SudokuBoard';
import NumberPad from './components/NumberPad';

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

function App() {
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
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-md mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Sudoku</h1>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <SudokuBoard
            board={board}
            onCellClick={handleCellClick}
            selectedCell={selectedCell}
          />
          <div className="flex justify-between items-center mt-4">
            <NumberPad onNumberClick={handleNumberClick} />
            <button
              onClick={resetBoard}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App; 