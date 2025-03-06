import React from 'react';

const SudokuCell = ({ value, isSelected, onClick, isInitial }) => {
  const getCellStyle = () => {
    let baseStyle = "w-14 h-14 flex items-center justify-center text-2xl font-semibold cursor-pointer transition-all duration-200 shadow-sm";
    
    if (isSelected) {
      baseStyle += " bg-blue-500 text-white transform scale-105 shadow-lg";
    } else {
      baseStyle += " bg-white text-gray-800 hover:bg-blue-50 hover:shadow-md";
    }

    if (isInitial) {
      baseStyle += " font-bold text-blue-900 bg-blue-50";
    }

    // Add border styling for 3x3 grid separation
    baseStyle += " border border-gray-200";
    
    return baseStyle;
  };

  return (
    <div 
      className={getCellStyle()}
      onClick={onClick}
    >
      {value !== 0 ? value : ''}
    </div>
  );
};

export default SudokuCell;