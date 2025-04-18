import React, { useState, useEffect } from 'react';
import './SlidingPuzzle.css';
import puzzle1 from '../assets/images/sliding-puzzle/puzzle1.png';
import puzzle2 from '../assets/images/sliding-puzzle/puzzle2.png';
import puzzle3 from '../assets/images/sliding-puzzle/puzzle3.png';
import puzzle4 from '../assets/images/sliding-puzzle/puzzle4.png';
import puzzle5 from '../assets/images/sliding-puzzle/puzzle5.png';
import puzzle6 from '../assets/images/sliding-puzzle/puzzle6.png';
import puzzle7 from '../assets/images/sliding-puzzle/puzzle7.png';
import puzzle8 from '../assets/images/sliding-puzzle/puzzle8.png';
import puzzle9 from '../assets/images/sliding-puzzle/puzzle9.png';
import puzzle10 from '../assets/images/sliding-puzzle/puzzle10.png';
import puzzle11 from '../assets/images/sliding-puzzle/puzzle11.png';
import puzzle12 from '../assets/images/sliding-puzzle/puzzle12.png';
import puzzle13 from '../assets/images/sliding-puzzle/puzzle13.png';
import puzzle14 from '../assets/images/sliding-puzzle/puzzle14.png';
import puzzle15 from '../assets/images/sliding-puzzle/puzzle15.png';
import puzzle16 from '../assets/images/sliding-puzzle/puzzle16.png';

const GRID_SIZE = 4;
const TILE_COUNT = GRID_SIZE * GRID_SIZE;
const EMPTY_TILE = TILE_COUNT - 1;

const initialPuzzles = [
  { id: 1, image: puzzle1, completed: false },
  { id: 2, image: puzzle2, completed: false },
  { id: 3, image: puzzle3, completed: false },
  { id: 4, image: puzzle4, completed: false },
  { id: 5, image: puzzle5, completed: false },
  { id: 6, image: puzzle6, completed: false },
  { id: 7, image: puzzle7, completed: false },
  { id: 8, image: puzzle8, completed: false },
  { id: 9, image: puzzle9, completed: false },
  { id: 10, image: puzzle10, completed: false },
  { id: 11, image: puzzle11, completed: false },
  { id: 12, image: puzzle12, completed: false },
  { id: 13, image: puzzle13, completed: false },
  { id: 14, image: puzzle14, completed: false },
  { id: 15, image: puzzle15, completed: false },
  { id: 16, image: puzzle16, completed: false }
];

const SlidingPuzzle = () => {
  const [tiles, setTiles] = useState([]);
  const [emptyPosition, setEmptyPosition] = useState(EMPTY_TILE);
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
  const [puzzles, setPuzzles] = useState(initialPuzzles);
  const [progress, setProgress] = useState(0);
  const [mode, setMode] = useState('play');

  useEffect(() => {
    initializePuzzle();
  }, [currentPuzzleIndex]);

  useEffect(() => {
    updateProgress();
  }, [puzzles]);

  // Add this effect to update emptyPosition whenever tiles change
  useEffect(() => {
    const newEmptyPosition = tiles.findIndex(tile => tile === EMPTY_TILE);
    if (newEmptyPosition !== -1) {
      setEmptyPosition(newEmptyPosition);
    }
  }, [tiles]);

  // Load saved progress on component mount
  useEffect(() => {
    const savedPuzzles = localStorage.getItem('slidingPuzzles');
    if (savedPuzzles) {
      setPuzzles(JSON.parse(savedPuzzles));
    }
  }, []);

  // Save progress when puzzles change
  useEffect(() => {
    localStorage.setItem('slidingPuzzles', JSON.stringify(puzzles));
  }, [puzzles]);

  const instaSolve = () => {
    const solvedTiles = [...Array(TILE_COUNT).keys()];
    setTiles(solvedTiles);
    setEmptyPosition(EMPTY_TILE);

    const updatedPuzzles = [...puzzles];
    updatedPuzzles[currentPuzzleIndex].completed = true;
    setPuzzles(updatedPuzzles);
  };

  const initializePuzzle = () => {
    const newTiles = [...Array(TILE_COUNT).keys()].sort(() => Math.random() - 0.5);
    setTiles(newTiles);
    setEmptyPosition(newTiles.indexOf(EMPTY_TILE));
  };

  const getTileStyle = (tileNumber) => {
    if (tileNumber === EMPTY_TILE) return {};

    const row = Math.floor(tileNumber / GRID_SIZE);
    const col = tileNumber % GRID_SIZE;

    return {
      backgroundImage: `url(${puzzles[currentPuzzleIndex].image})`,
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
    if (mode === 'solve') return; // Disable tile movement in Solve Mode

    if (!isAdjacent(tileIndex)) return;

    const newTiles = [...tiles];
    [newTiles[tileIndex], newTiles[emptyPosition]] = [newTiles[emptyPosition], newTiles[tileIndex]];
    setTiles(newTiles);
    // No need to manually set emptyPosition here since the useEffect will handle it

    if (isPuzzleSolved(newTiles)) {
      const updatedPuzzles = [...puzzles];
      updatedPuzzles[currentPuzzleIndex].completed = true;
      setPuzzles(updatedPuzzles);
    }
  };

  const isPuzzleSolved = (tilesToCheck) => {
    return tilesToCheck.every((tile, index) => tile === index);
  };

  const updateProgress = () => {
    const completedCount = puzzles.filter((puzzle) => puzzle.completed).length;
    setProgress(Math.floor((completedCount / puzzles.length) * 100));
  };

  const markAsComplete = () => {
    const updatedPuzzles = [...puzzles];
    updatedPuzzles[currentPuzzleIndex].completed = !updatedPuzzles[currentPuzzleIndex].completed;
    setPuzzles(updatedPuzzles);
  };

  const handleNextPuzzle = () => {
    if (currentPuzzleIndex < puzzles.length - 1) {
      setCurrentPuzzleIndex(currentPuzzleIndex + 1);
    }
  };

  const handlePreviousPuzzle = () => {
    if (currentPuzzleIndex > 0) {
      setCurrentPuzzleIndex(currentPuzzleIndex - 1);
    }
  };

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === 'play' ? 'solve' : 'play'));
  };

  return (
    <div className="sliding-puzzle-wrapper">
      <h1>Sliding Puzzle</h1>

      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        <span className="progress-text">
          {puzzles.filter(puzzle => puzzle.completed).length} / {puzzles.length} ({progress}%)
        </span>
      </div>

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
          ? 'Play Mode: Solve the puzzle for fun!'
          : 'Solve Mode: Drag and drop tiles to set up the puzzle, then generate a step-by-step solution.'}
      </p>
      
      <div className="sliding-puzzle">
        <div className="puzzle-sidebar">
          {puzzles.map((puzzle, index) => (
            <button
              key={puzzle.id}
              className={`puzzle-button ${index === currentPuzzleIndex ? 'active' : ''} ${
                puzzle.completed ? 'solved' : ''
              }`}
              onClick={() => setCurrentPuzzleIndex(index)}
            >
              {puzzle.id}
            </button>
          ))}
        </div>
        
        <div className="puzzle-main">
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
                  draggable={mode === 'solve'} 
                  onDragStart={(e) => {
                    if (mode === 'solve') e.dataTransfer.setData('tileIndex', index);
                  }}
                  onDrop={(e) => {
                    if (mode === 'solve') {
                      e.preventDefault();
                      const draggedTileIndex = parseInt(e.dataTransfer.getData('tileIndex'));
                      const newTiles = [...tiles];
                      [newTiles[draggedTileIndex], newTiles[index]] = [
                        newTiles[index],
                        newTiles[draggedTileIndex]
                      ];
                      setTiles(newTiles);
                      
                      // Update empty position if we moved the empty tile
                      if (tiles[draggedTileIndex] === EMPTY_TILE) {
                        setEmptyPosition(index);
                      } else if (tiles[index] === EMPTY_TILE) {
                        setEmptyPosition(draggedTileIndex);
                      }
                    }
                  }}
                  onDragOver={(e) => e.preventDefault()}
                />
              ))}
            </div>
          </div>

          <div className="puzzle-controls">
            <div className="nav-buttons">
              <button onClick={handlePreviousPuzzle} disabled={currentPuzzleIndex === 0}>
                Previous
              </button>
              <button onClick={handleNextPuzzle} disabled={currentPuzzleIndex === puzzles.length - 1}>
                Next
              </button>
            </div>
            <div className="action-buttons">
              <button onClick={instaSolve}>Insta-Solve</button>
              <button onClick={initializePuzzle}>Shuffle</button>
              <label>
                <input
                  type="checkbox"
                  checked={puzzles[currentPuzzleIndex].completed}
                  onChange={markAsComplete}
                />
                Mark as Complete
              </label>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SlidingPuzzle;