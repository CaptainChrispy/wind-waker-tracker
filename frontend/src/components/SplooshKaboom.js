import React, { useState, useEffect } from 'react';
import './SplooshKaboom.css';

const GRID_SIZE = 8;
const SHIP_CONFIG = [2, 3, 4];

/**
 * Generates seeds for Wichmann-Hill PRNG
 * The game uses values between 1-30000 for each component
 * These bounds come from the modulo values used in the PRNG:
 * s1: mod 30269
 * s2: mod 30307
 * s3: mod 30323
 */
const generateSeeds = () => {
  return {
    s1: Math.floor(Math.random() * 30000) + 1,
    s2: Math.floor(Math.random() * 30000) + 1,
    s3: Math.floor(Math.random() * 30000) + 1
  };
};

// State variables for Wichmann-Hill PRNG
let s1, s2, s3;

/**
 * Implementation of Wichmann-Hill PRNG (1982)
 * Used by Wind Waker for ship/squid placement

 * @returns {number} Random value between 0 and 1
 */
const rng = () => {
  s1 = (171 * s1) % 30269;
  s2 = (172 * s2) % 30307;
  s3 = (170 * s3) % 30323;
  return (s1/30269.0 + s2/30307.0 + s3/30323.0) % 1.0;
};

/**
 * Generates the game board using the same algorithm as Wind Waker
 * The board is initialized in column-major -- column first -- order (like the game)
 * Ships/Squids are placed sequentially: length 2, then 3, then 4
 * @returns {string[][]} Grid with placed ships/squids
 */
const generateBoard = () => {
  const seeds = generateSeeds();
  s1 = seeds.s1;
  s2 = seeds.s2;
  s3 = seeds.s3;

  // Initialize empty board (column-major order like the game)
  const board = Array(GRID_SIZE).fill().map(() => Array(GRID_SIZE).fill(0));

  const fits = (x, y, length, orientation) => {
    if (orientation === 0) { // vertical
      for (let j = 0; j < length; j++) {
        if (x > 7 || y + j > 7) return false;
        if (board[x][y + j] !== 0) return false;
      }
      return true;
    } else { // horizontal
      for (let i = 0; i < length; i++) {
        if (x + i > 7 || y > 7) return false;
        if (board[x + i][y] !== 0) return false;
      }
      return true;
    }
  };

  const place = (length) => {
    let placed = false;
    while (!placed) {
      const orientation = Math.floor(rng() * 1000) % 2;
      const x = Math.floor(rng() * 8); // column (x-coordinate)
      const y = Math.floor(rng() * 8); // row (y-coordinate)

      if (fits(x, y, length, orientation)) {
        if (orientation === 0) { // vertical
          for (let j = 0; j < length; j++) {
            board[x][y + j] = length;
          }
        } else { // horizontal
          for (let i = 0; i < length; i++) {
            board[x + i][y] = length;
          }
        }
        placed = true;
      }
    }
  };

  place(2);
  place(3);
  place(4);

  // Convert to string grid (column-major to row-major)
  return Array(GRID_SIZE).fill().map((_, row) => 
    Array(GRID_SIZE).fill().map((_, col) => 
      board[col][row] > 0 ? 'ship' : ''
    )
  );
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