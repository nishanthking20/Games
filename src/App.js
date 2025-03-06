import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingScreen from './components/LoadingScreen';

// Lazy load all game components
const GameSelection = lazy(() => import('./components/GameSelection'));
const Sudoku = lazy(() => import('./components/SudokuGame'));
const TicTacToe = lazy(() => import('./components/TicTacToe'));
const SnakeLadder = lazy(() => import('./components/SnakeAndLadder'));

function App() {
  return (
    <Router>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route path="/" element={<GameSelection />} />
          <Route path="/sudoku" element={<Sudoku />} />
          <Route path="/tictactoe" element={<TicTacToe />} />
          <Route path="/snake-ladder" element={<SnakeLadder />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
