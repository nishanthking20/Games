import React from 'react';

const NumberPad = ({ onNumberClick }) => {
  return (
    <div className="grid grid-cols-3 gap-3 mt-6">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
        <button
          key={number}
          onClick={() => onNumberClick(number)}
          className="w-14 h-14 bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 
                   rounded-xl text-2xl font-semibold text-blue-900 shadow-md hover:shadow-lg 
                   transition-all duration-200 transform hover:scale-105 active:scale-95"
        >
          {number}
        </button>
      ))}
    </div>
  );
};

export default NumberPad;