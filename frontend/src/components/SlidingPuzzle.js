import React, { useState, useEffect } from 'react';
import styles from './SlidingPuzzle.module.css';
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
  const [solutionSteps, setSolutionSteps] = useState([]);
  const [currentSolutionStep, setCurrentSolutionStep] = useState(0);
  const [isSolving, setIsSolving] = useState(false);

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
    if (mode === 'solve') return;

    if (!isAdjacent(tileIndex)) return;

    const newTiles = [...tiles];
    [newTiles[tileIndex], newTiles[emptyPosition]] = [newTiles[emptyPosition], newTiles[tileIndex]];
    setTiles(newTiles);

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

  const resetPuzzle = () => {
    const solvedTiles = [...Array(TILE_COUNT).keys()];
    setTiles(solvedTiles);
    setEmptyPosition(EMPTY_TILE);
    setSolutionSteps([]);
    setCurrentSolutionStep(0);
  };

  // Only keep the isSolvable check and server call for solution
  const isSolvable = () => {
    if (isPuzzleSolved(tiles)) {
      return true;
    }

    let inversions = 0;
    const tilesWithoutEmpty = [];
    for (let i = 0; i < tiles.length; i++) {
      if (tiles[i] !== EMPTY_TILE) {
        tilesWithoutEmpty.push(tiles[i]);
      }
    }

    for (let i = 0; i < tilesWithoutEmpty.length; i++) {
      for (let j = i + 1; j < tilesWithoutEmpty.length; j++) {
        if (tilesWithoutEmpty[i] > tilesWithoutEmpty[j]) {
          inversions++;
        }
      }
    }

    const emptyRow = Math.floor(emptyPosition / GRID_SIZE);
    const emptyRowFromBottom = GRID_SIZE - emptyRow;

    // Even row from bottom => inversions must be odd
    // Odd row from bottom => inversions must be even
    const result = (emptyRowFromBottom % 2 === 0)
      ? (inversions % 2 === 1)
      : (inversions % 2 === 0);

    return result;
  };

  // Only call the backend for solution
  const generateSolution = async () => {
    if (!isSolvable()) {
      alert("This puzzle configuration is not solvable. Please rearrange the tiles.");
      return;
    }
    setMode('solve');
    setIsSolving(true);
    try {
      const initialTileState = [...tiles];
      const response = await fetch('http://localhost:5000/api/solve-sliding-puzzle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tiles: initialTileState, emptyPosition })
      });
      const data = await response.json();
      const steps = data.solution || [];
      if (steps.length > 0) {
        if (steps[0]) steps[0].initialTiles = initialTileState;
        setSolutionSteps(steps);
        setCurrentSolutionStep(0);
        alert(`Solution found in ${steps.length} moves!`);
      } else if (steps.length === 0 && isPuzzleSolved(tiles)) {
        alert("Puzzle is already solved!");
      } else {
        alert("Could not find a solution. The puzzle may be too complex.");
      }
    } catch (error) {
      console.error("Error solving puzzle:", error);
      alert("An error occurred while solving the puzzle.");
    } finally {
      setIsSolving(false);
    }
  };

  const applyNextMove = () => {
    if (solutionSteps.length > 0 && currentSolutionStep < solutionSteps.length) {
      const step = solutionSteps[currentSolutionStep];
      setTiles([...step.tiles]);
      setCurrentSolutionStep(currentSolutionStep + 1);
    }
  };

  const applyPreviousMove = () => {
    if (solutionSteps.length > 0 && currentSolutionStep > 0) {
      if (currentSolutionStep === 1) {
        setTiles([...solutionSteps[0].initialTiles]);
      } else {
        const prevStep = solutionSteps[currentSolutionStep - 2];
        setTiles([...prevStep.tiles]);
      }
      setCurrentSolutionStep(currentSolutionStep - 1);
    }
  };

  return (
    <div className={styles.slidingPuzzleWrapper}>
      <div className={styles.headerContainer}>
        <header className={styles.puzzleHeader}>
          <h1>Sliding Puzzle</h1>

          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: `${progress}%` }}></div>
            <span className={styles.progressText}>
              {puzzles.filter(puzzle => puzzle.completed).length} / {puzzles.length} ({progress}%)
            </span>
          </div>
        </header>
      </div>

      <div className={styles.modeToggleContainer}>
        <div className={styles.toggleLabel}>Play Mode</div>
        <label className={styles.toggleSwitch}>
          <input 
            type="checkbox" 
            checked={mode === 'solve'} 
            onChange={toggleMode}
          />
          <span className={styles.toggleSlider}></span>
        </label>
        <div className={styles.toggleLabel}>Solve Mode</div>
      </div>
      <p className={styles.modeCaption}>
        {mode === 'play'
          ? 'Play Mode: Solve the puzzle for fun!'
          : 'Solve Mode: Drag and drop tiles to set up the puzzle, then generate a step-by-step solution.'}
      </p>
      
      <div className={styles.slidingPuzzle}>
        <div className={styles.puzzleSidebar}>
          {puzzles.map((puzzle, index) => (
            <button
              key={puzzle.id}
              className={`${styles.puzzleButton} ${index === currentPuzzleIndex ? styles.active : ''} ${
                puzzle.completed ? styles.solved : ''
              }`}
              onClick={() => setCurrentPuzzleIndex(index)}
            >
              {puzzle.id}
            </button>
          ))}
        </div>
        
        <div className={styles.puzzleMain}>
          <div className={styles.puzzleContainer}>
            <div
              className={styles.puzzleGrid}
              style={{
                gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
                aspectRatio: '1'
              }}
            >
              {tiles.map((tile, index) => (
                <div
                  key={tile}
                  className={`${styles.puzzleTile} ${tile === EMPTY_TILE ? styles.empty : ''}`}
                  onClick={() => moveTile(index)}
                  style={getTileStyle(tile)}
                  draggable={mode === 'solve'} 
                  onDragStart={(e) => {
                    if (mode === 'solve') {
                      e.dataTransfer.setData('tileIndex', index);
                    }
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

          <div className={styles.puzzleControls}>
            <div className={styles.navButtons}>
              <button onClick={handlePreviousPuzzle} disabled={currentPuzzleIndex === 0}>
                Previous
              </button>
              <button onClick={handleNextPuzzle} disabled={currentPuzzleIndex === puzzles.length - 1}>
                Next
              </button>
            </div>
            <div className={styles.actionButtons}>
              {mode === 'play' ? (
                <>
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
                </>
              ) : (
                <>
                  <button onClick={generateSolution} disabled={!isSolvable()}>Generate Solution</button>
                  <button onClick={resetPuzzle}>Reset</button>
                  <div className={styles.solutionNavigation}>
                    <button 
                      onClick={applyPreviousMove} 
                      disabled={!solutionSteps.length || currentSolutionStep === 0}
                    >
                      Previous Move
                    </button>
                    <button 
                      onClick={applyNextMove} 
                      disabled={!solutionSteps.length || currentSolutionStep === solutionSteps.length}
                    >
                      Next Move
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {mode === 'solve' && isSolving && (
            <div className={styles.solverOverlay}>
              <div className={styles.spinnerContainer}>
                <svg className={styles.spinnerSvg} xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24">
                  <g>
                    <circle cx="12" cy="3" r="1" fill="currentColor">
                      <animate id="svgSpinners12DotsScaleRotate0" attributeName="r" begin="0;svgSpinners12DotsScaleRotate2.end-0.5s" calcMode="spline" dur="0.6s" keySplines=".27,.42,.37,.99;.53,0,.61,.73" values="1;2;1"/>
                    </circle>
                    <circle cx="16.5" cy="4.21" r="1" fill="currentColor">
                      <animate id="svgSpinners12DotsScaleRotate1" attributeName="r" begin="svgSpinners12DotsScaleRotate0.begin+0.1s" calcMode="spline" dur="0.6s" keySplines=".27,.42,.37,.99;.53,0,.61,.73" values="1;2;1"/>
                    </circle>
                    <circle cx="7.5" cy="4.21" r="1" fill="currentColor">
                      <animate id="svgSpinners12DotsScaleRotate2" attributeName="r" begin="svgSpinners12DotsScaleRotate4.begin+0.1s" calcMode="spline" dur="0.6s" keySplines=".27,.42,.37,.99;.53,0,.61,.73" values="1;2;1"/>
                    </circle>
                    <circle cx="19.79" cy="7.5" r="1" fill="currentColor">
                      <animate id="svgSpinners12DotsScaleRotate3" attributeName="r" begin="svgSpinners12DotsScaleRotate1.begin+0.1s" calcMode="spline" dur="0.6s" keySplines=".27,.42,.37,.99;.53,0,.61,.73" values="1;2;1"/>
                    </circle>
                    <circle cx="4.21" cy="7.5" r="1" fill="currentColor">
                      <animate id="svgSpinners12DotsScaleRotate4" attributeName="r" begin="svgSpinners12DotsScaleRotate6.begin+0.1s" calcMode="spline" dur="0.6s" keySplines=".27,.42,.37,.99;.53,0,.61,.73" values="1;2;1"/>
                    </circle>
                    <circle cx="21" cy="12" r="1" fill="currentColor">
                      <animate id="svgSpinners12DotsScaleRotate5" attributeName="r" begin="svgSpinners12DotsScaleRotate3.begin+0.1s" calcMode="spline" dur="0.6s" keySplines=".27,.42,.37,.99;.53,0,.61,.73" values="1;2;1"/>
                    </circle>
                    <circle cx="3" cy="12" r="1" fill="currentColor">
                      <animate id="svgSpinners12DotsScaleRotate6" attributeName="r" begin="svgSpinners12DotsScaleRotate8.begin+0.1s" calcMode="spline" dur="0.6s" keySplines=".27,.42,.37,.99;.53,0,.61,.73" values="1;2;1"/>
                    </circle>
                    <circle cx="19.79" cy="16.5" r="1" fill="currentColor">
                      <animate id="svgSpinners12DotsScaleRotate7" attributeName="r" begin="svgSpinners12DotsScaleRotate5.begin+0.1s" calcMode="spline" dur="0.6s" keySplines=".27,.42,.37,.99;.53,0,.61,.73" values="1;2;1"/>
                    </circle>
                    <circle cx="4.21" cy="16.5" r="1" fill="currentColor">
                      <animate id="svgSpinners12DotsScaleRotate8" attributeName="r" begin="svgSpinners12DotsScaleRotatea.begin+0.1s" calcMode="spline" dur="0.6s" keySplines=".27,.42,.37,.99;.53,0,.61,.73" values="1;2;1"/>
                    </circle>
                    <circle cx="16.5" cy="19.79" r="1" fill="currentColor">
                      <animate id="svgSpinners12DotsScaleRotate9" attributeName="r" begin="svgSpinners12DotsScaleRotate7.begin+0.1s" calcMode="spline" dur="0.6s" keySplines=".27,.42,.37,.99;.53,0,.61,.73" values="1;2;1"/>
                    </circle>
                    <circle cx="7.5" cy="19.79" r="1" fill="currentColor">
                      <animate id="svgSpinners12DotsScaleRotatea" attributeName="r" begin="svgSpinners12DotsScaleRotateb.begin+0.1s" calcMode="spline" dur="0.6s" keySplines=".27,.42,.37,.99;.53,0,.61,.73" values="1;2;1"/>
                    </circle>
                    <circle cx="12" cy="21" r="1" fill="currentColor">
                      <animate id="svgSpinners12DotsScaleRotateb" attributeName="r" begin="svgSpinners12DotsScaleRotate9.begin+0.1s" calcMode="spline" dur="0.6s" keySplines=".27,.42,.37,.99;.53,0,.61,.73" values="1;2;1"/>
                    </circle>
                    <animateTransform attributeName="transform" dur="6s" repeatCount="indefinite" type="rotate" values="360 12 12;0 12 12"/>
                  </g>
                </svg>
              </div>
              <div className={styles.solverMessage}>Hang Tight!</div>
              <div className={styles.solverSubmessage}>We're looking for an optimal solution...</div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default SlidingPuzzle;