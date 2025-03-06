import React from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  const pulseAnimation = {
    scale: [1, 1.2, 1],
    opacity: [0.5, 1, 0.5],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center z-50">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="text-center relative"
      >
        {/* Animated background circle */}
        <motion.div
          className="absolute inset-0 -z-10"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="w-64 h-64 bg-blue-500 rounded-full blur-3xl opacity-30"></div>
        </motion.div>

        {/* Loading text */}
        <motion.div
          variants={item}
          className="text-4xl font-bold text-white mb-8 relative"
        >
          <motion.span
            animate={{
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Loading
          </motion.span>
          <motion.span
            animate={{
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="inline-block ml-2"
          >
            ...
          </motion.span>
        </motion.div>

        {/* Loading dots */}
        <motion.div
          variants={item}
          className="flex justify-center gap-3"
        >
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              variants={item}
              className="w-4 h-4 bg-white rounded-full"
              animate={pulseAnimation}
              transition={{
                ...pulseAnimation.transition,
                delay: i * 0.2
              }}
            />
          ))}
        </motion.div>

        {/* Loading progress bar */}
        <motion.div
          variants={item}
          className="mt-8 w-48 h-2 bg-gray-700 rounded-full overflow-hidden"
        >
          <motion.div
            className="h-full bg-blue-500"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>

        {/* Loading message */}
        <motion.div
          variants={item}
          className="mt-6 text-gray-400 text-sm"
          animate={{
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          Preparing your game experience
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoadingScreen; 