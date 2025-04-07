import React, { useState, useEffect } from 'react';
import './SlidingPuzzle.css';
import puzzle1 from '../assets/images/sliding-puzzle/puzzle1.png';

const GRID_SIZE = 4;
const TILE_COUNT = GRID_SIZE * GRID_SIZE;
const EMPTY_TILE = TILE_COUNT - 1;

const SlidingPuzzle = () => {
  const [tiles, setTiles] = useState([]);
  const [emptyPosition, setEmptyPosition] = useState(EMPTY_TILE);

  useEffect(() => {
    initializePuzzle();
  }, []);

  const initializePuzzle = () => {
    const newTiles = [...Array(TILE_COUNT).keys()]
      .sort(() => Math.random() - 0.5);
    setTiles(newTiles);
    setEmptyPosition(newTiles.indexOf(EMPTY_TILE));
  };

  const getTileStyle = (tileNumber) => {
    if (tileNumber === EMPTY_TILE) return {};

    const row = Math.floor(tileNumber / GRID_SIZE);
    const col = tileNumber % GRID_SIZE;
    
    return {
      backgroundImage: `url(${puzzle1})`,
      backgroundSize: `${GRID_SIZE * 100}%`,
      backgroundPosition: `-${col * 100}% -${row * 100}%`
    };
  };

  const isAdjacent = (tileIndex) => {
    const tileRow = Math.floor(tileIndex / GRID_SIZE);
    const tileCol = tileIndex % GRID_SIZE;
    const emptyRow = Math.floor(emptyPosition / GRID_SIZE);
    const emptyCol = emptyPosition % GRID_SIZE;

    return (
      (Math.abs(tileRow - emptyRow) === 1 && tileCol === emptyCol) ||
      (Math.abs(tileCol - emptyCol) === 1 && tileRow === emptyRow)
    );
  };

  const moveTile = (tileIndex) => {
    if (!isAdjacent(tileIndex)) return;

    const newTiles = [...tiles];
    [newTiles[tileIndex], newTiles[emptyPosition]] = [newTiles[emptyPosition], newTiles[tileIndex]];
    setTiles(newTiles);
    setEmptyPosition(tileIndex);
  };

  const isPuzzleSolved = () => {
    return tiles.every((tile, index) => tile === index);
  };

  return (
    <div className="sliding-puzzle">
      <div className="puzzle-container">
        <div 
          className="puzzle-grid"
          style={{
            gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
            aspectRatio: '1'
          }}
        >
          {tiles.map((tile, index) => (
            <div
              key={tile}
              className={`puzzle-tile ${tile === EMPTY_TILE ? 'empty' : ''}`}
              onClick={() => moveTile(index)}
              style={getTileStyle(tile)}
            />
          ))}
        </div>
      </div>
      <div className="puzzle-controls">
        <button onClick={initializePuzzle}>New Game</button>
        {isPuzzleSolved() && <div className="win-message">Puzzle Solved!</div>}
      </div>
    </div>
  );
};

export default SlidingPuzzle;