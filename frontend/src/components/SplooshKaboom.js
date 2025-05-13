import React, { useState, useEffect } from 'react';
import './SplooshKaboom.css';

const GRID_SIZE = 8;
const SHIP_CONFIG = [2, 3, 4];

// Wichmann-Hill PRNG implementation from Wind Waker
let s1, s2, s3;

const rng = () => {
  s1 = (171 * s1) % 30269;
  s2 = (172 * s2) % 30307;
  s3 = (170 * s3) % 30323;
  return (s1/30269.0 + s2/30307.0 + s3/30323.0) % 1.0;
};

const generateBoard = () => {
  // Initialize RNG with random seeds
  s1 = Math.floor(Math.random() * 30000) + 1;
  s2 = Math.floor(Math.random() * 30000) + 1;
  s3 = Math.floor(Math.random() * 30000) + 1;

  const board = Array(GRID_SIZE).fill().map(() => Array(GRID_SIZE).fill(''));

  const fits = (row, col, length, isVertical) => {
    if (isVertical) {
      if (row + length > GRID_SIZE) return false;
      for (let i = 0; i < length; i++) {
        if (board[row + i][col] === 'ship') return false;
      }
    } else {
      if (col + length > GRID_SIZE) return false;
      for (let i = 0; i < length; i++) {
        if (board[row][col + i] === 'ship') return false;
      }
    }
    return true;
  };

  const place = (length) => {
    let placed = false;
    while (!placed) {
      const orientation = Math.floor(rng() * 1000) % 2;
      const isVertical = orientation === 0;

      const row = Math.floor(rng() * GRID_SIZE);
      const col = Math.floor(rng() * GRID_SIZE);

      if (fits(row, col, length, isVertical)) {
        for (let i = 0; i < length; i++) {
          if (isVertical) {
            board[row + i][col] = 'ship';
          } else {
            board[row][col + i] = 'ship';
          }
        }
        placed = true;
      }
    }
  };

  SHIP_CONFIG.forEach(place);
  return board;
};

const SplooshKaboom = () => {
  const [grid, setGrid] = useState(createEmptyGrid());
  const [hits, setHits] = useState(0);
  const [isShipsMode, setIsShipsMode] = useState(true);
  const [mode, setMode] = useState('play');

  useEffect(() => {
    setGrid(generateBoard());
  }, []);

  const handleCellClick = (row, col) => {
    if (mode === 'solve') return;

    setGrid(prevGrid => {
      const newGrid = [...prevGrid];
      if (newGrid[row][col] === 'ship') {
        newGrid[row][col] = 'hit';
        setHits(hits + 1);
      } else if (newGrid[row][col] === '') {
        newGrid[row][col] = 'miss';
      }
      return newGrid;
    });
  };

  const allShipsSunk = hits === SHIP_CONFIG.reduce((sum, length) => sum + length, 0);

  const toggleMode = () => {
    setMode(prevMode => (prevMode === 'play' ? 'solve' : 'play'));
  };

  return (
    <div className="sploosh-kaboom">
      <h1>Sploosh Kaboom</h1>

      {/* Play/Solve Mode Toggle */}
      <div className="mode-toggle-container">
        <div className="toggle-label">Play Mode</div>
        <label className="toggle-switch">
          <input
            type="checkbox"
            checked={mode === 'solve'}
            onChange={toggleMode}
          />
          <span className="toggle-slider"></span>
        </label>
        <div className="toggle-label">Solve Mode</div>
      </div>

      <p className="mode-caption">
        {mode === 'play'
          ? 'Play Mode: Try to sink all ships or squids!'
          : 'Solve Mode: View and adjust ship/squid placements.'}
      </p>

      {allShipsSunk && <h2>All {isShipsMode ? 'Ships' : 'Squids'} sunk! You win!</h2>}
      <Grid grid={grid} onCellClick={handleCellClick} />

    {/* Ships/Squids Toggle */}
      <div className="mode-toggle-container">
        <div className="toggle-label">Ships</div>
        <label className="toggle-switch">
          <input
            type="checkbox"
            checked={!isShipsMode}
            onChange={() => setIsShipsMode(!isShipsMode)}
          />
          <span className="toggle-slider"></span>
        </label>
        <div className="toggle-label">Squids</div>
      </div>
    </div>
  );
};

const createEmptyGrid = () => Array(GRID_SIZE).fill().map(() => Array(GRID_SIZE).fill(''));

const Grid = ({ grid, onCellClick }) => (
  <div className="grid">
    {grid.map((row, rowIndex) => (
      <div key={rowIndex} className="row">
        {row.map((cell, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={`cell ${cell}`}
            onClick={() => onCellClick(rowIndex, colIndex)}
          >
            {cell === 'hit' ? '💥' : cell === 'miss' ? '❌' : ''}
          </div>
        ))}
      </div>
    ))}
  </div>
);

export default SplooshKaboom;