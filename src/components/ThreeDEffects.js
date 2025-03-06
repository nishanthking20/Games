import React from 'react';
import { motion } from 'framer-motion';

export const ThreeDContainer = ({ children, className = '' }) => {
  return (
    <motion.div
      className={`transform-gpu perspective-1000 ${className}`}
      initial={{ rotateX: 0, rotateY: 0 }}
      whileHover={{ rotateX: 5, rotateY: 5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  );
};

export const ThreeDCard = ({ children, className = '' }) => {
  return (
    <motion.div
      className={`transform-gpu preserve-3d ${className}`}
      initial={{ rotateX: 0, rotateY: 0 }}
      whileHover={{ rotateX: 5, rotateY: 5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <motion.div
        className="transform-gpu translate-z-10"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export const ThreeDButton = ({ children, className = '', onClick }) => {
  return (
    <motion.button
      className={`transform-gpu ${className}`}
      whileHover={{ scale: 1.05, rotateX: 5, rotateY: 5 }}
      whileTap={{ scale: 0.95, rotateX: 0, rotateY: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
};

export const ThreeDText = ({ children, className = '' }) => {
  return (
    <motion.div
      className={`transform-gpu ${className}`}
      initial={{ rotateX: 0, rotateY: 0 }}
      whileHover={{ rotateX: 5, rotateY: 5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <motion.span
        className="inline-block transform-gpu"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {children}
      </motion.span>
    </motion.div>
  );
};

export const ThreeDGrid = ({ children, className = '' }) => {
  return (
    <motion.div
      className={`transform-gpu grid gap-4 ${className}`}
      initial={{ rotateX: 0, rotateY: 0 }}
      whileHover={{ rotateX: 5, rotateY: 5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  );
};

export const ThreeDScore = ({ label, value, className = '' }) => {
  return (
    <motion.div
      className={`transform-gpu ${className}`}
      initial={{ rotateX: 0, rotateY: 0 }}
      whileHover={{ rotateX: 5, rotateY: 5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <motion.div
        className="transform-gpu"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="text-gray-400 text-sm">{label}</div>
        <div className="text-2xl font-bold text-white">{value}</div>
      </motion.div>
    </motion.div>
  );
}; 