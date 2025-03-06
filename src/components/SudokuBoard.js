import React from 'react';
import SudokuCell from './SudokuCell';

const SudokuBoard = ({ board, onCellClick, selectedCell }) => {
  const getCellStyle = (rowIndex, colIndex) => {
    let style = "";
    
    // Top-left corner of 3x3 sections
    if (rowIndex % 3 === 0 && colIndex % 3 === 0) {
      style += "rounded-tl-xl";
    }
    
    // Top-right corner of 3x3 sections
    if (rowIndex % 3 === 0 && colIndex % 3 === 2) {
      style += "rounded-tr-xl";
    }
    
    // Bottom-left corner of 3x3 sections
    if (rowIndex % 3 === 2 && colIndex % 3 === 0) {
      style += "rounded-bl-xl";
    }
    
    // Bottom-right corner of 3x3 sections
    if (rowIndex % 3 === 2 && colIndex % 3 === 2) {
      style += "rounded-br-xl";
    }

    return style;
  };

  return (
    <div className="grid grid-cols-9 gap-1 bg-gradient-to-br from-blue-600 to-blue-800 p-2 rounded-2xl shadow-2xl">
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <div key={`${rowIndex}-${colIndex}`} className={getCellStyle(rowIndex, colIndex)}>
            <SudokuCell
              value={cell}
              isSelected={selectedCell?.row === rowIndex && selectedCell?.col === colIndex}
              onClick={() => onCellClick(rowIndex, colIndex)}
              isInitial={cell !== 0}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default SudokuBoard;