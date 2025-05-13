import React, { useState } from 'react';
import './SplooshKaboom.css';

const GRID_SIZE = 8;

const SplooshKaboom = () => {
  const [grid, setGrid] = useState(Array(GRID_SIZE).fill().map(() => Array(GRID_SIZE).fill('')));

  const handleCellClick = (row, col) => {
    setGrid(prev => {
      const newGrid = [...prev];
      newGrid[row][col] = newGrid[row][col] === 'hit' ? 'miss' : 'hit';
      return newGrid;
    });
  };

  return (
    <div className="sploosh-kaboom">
      <div className="grid">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`cell ${cell}`}
                onClick={() => handleCellClick(rowIndex, colIndex)}
              >
                {cell === 'hit' ? '💥' : cell === 'miss' ? '❌' : ''}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SplooshKaboom;