import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from './PageTransition';
import withLoading from './withLoading';
import { ThreeDContainer, ThreeDButton, ThreeDText } from './ThreeDEffects';

const GameSelection = () => {
  const navigate = useNavigate();

  const games = [
    {
      name: 'Sudoku',
      path: '/sudoku',
      color: 'from-blue-500 to-blue-600',
      hoverColor: 'from-blue-600 to-blue-700',
      icon: '🔢'
    },
    {
      name: 'Tic Tac Toe',
      path: '/tictactoe',
      color: 'from-green-500 to-green-600',
      hoverColor: 'from-green-600 to-green-700',
      icon: '⭕'
    },
    {
      name: 'Snake & Ladder',
      path: '/snake-ladder',
      color: 'from-purple-500 to-purple-600',
      hoverColor: 'from-purple-600 to-purple-700',
      icon: '🐍'
    }
  ];

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

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <ThreeDText className="text-5xl font-bold text-gray-800 mb-2">
              Game Hub
            </ThreeDText>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-xl text-gray-600"
            >
              Select a game to play
            </motion.p>
          </motion.div>
          
          <ThreeDContainer
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {games.map((game, index) => (
              <ThreeDButton
                key={game.name}
                variants={item}
                onClick={() => navigate(game.path)}
                className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${game.color} 
                         hover:${game.hoverColor} p-8 text-white shadow-xl transition-all duration-300
                         w-full text-left`}
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 0.1 }}
                  className="absolute inset-0 bg-white"
                />
                <motion.div
                  initial={{ scale: 0.8 }}
                  whileHover={{ scale: 1.1 }}
                  className="relative z-10"
                >
                  <span className="text-4xl mb-4 block">{game.icon}</span>
                  <h2 className="text-2xl font-bold">{game.name}</h2>
                  <motion.p
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1 }}
                    className="mt-2"
                  >
                    Click to play
                  </motion.p>
                </motion.div>
              </ThreeDButton>
            ))}
          </ThreeDContainer>
        </div>
      </div>
    </PageTransition>
  );
};

export default withLoading(GameSelection); 