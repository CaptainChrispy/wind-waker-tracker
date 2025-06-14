import React, { useState, useEffect, useMemo } from 'react';
import styles from './SplooshKaboom.module.css';
import kaboomSound from '../assets/sounds/kerboom.wav';
import splooshSound from '../assets/sounds/sploosh.wav';

const GRID_SIZE = 8;
const SHIP_CONFIG = [2, 3, 4];
const TOTAL_BOMBS = 24;
const SHIP_EMOJI = '🚢';
const SQUID_EMOJI = '🦑';
const EXPLOSION = '💥';

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
  // Track which ship each cell belongs to
  const shipMap = Array(GRID_SIZE).fill().map(() => Array(GRID_SIZE).fill(-1));

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

  const place = (length, shipIndex) => {
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
            shipMap[row + i][col] = shipIndex;
          } else {
            board[row][col + i] = 'ship';
            shipMap[row][col + i] = shipIndex;
          }
        }
        placed = true;
      }
    }
  };

  SHIP_CONFIG.forEach((length, index) => place(length, index));
  return { board, shipMap };
};

const BombDisplay = ({ bombsRemaining }) => (
  <div className={styles.bombDisplay}>
    <div className={styles.bombsRemaining}>{bombsRemaining}</div>
    <div className={styles.bombGrid}>
      {Array(TOTAL_BOMBS).fill().map((_, i) => (
        <div 
          key={i} 
          className={`${styles.bomb} ${i >= bombsRemaining ? styles.used : ''}`}
        >
          💣
        </div>
      ))}
    </div>
  </div>
);

const ShipDisplay = ({ isSquidMode, destroyedShips }) => (
  <div className={styles.shipDisplay}>
    {SHIP_CONFIG.map((_, index) => (
      <div key={index} className={styles.shipIndicator}>
        {destroyedShips.has(index) ? EXPLOSION : isSquidMode ? SQUID_EMOJI : SHIP_EMOJI}
      </div>
    ))}
  </div>
);

const Grid = ({ grid, onCellClick }) => (
  <div className={styles.grid}>
    {grid.map((row, rowIndex) => (
      <div key={rowIndex} className={styles.row}>
        {row.map((cell, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            className={`${styles.cell} ${cell === 'hit' ? styles.hit : ''} ${cell === 'miss' ? styles.miss : ''}`}
            onClick={() => onCellClick(rowIndex, colIndex)}
          >
            {cell === 'hit' ? '💥' : cell === 'miss' ? '❌' : ''}
          </div>
        ))}
      </div>
    ))}
  </div>
);

const SplooshKaboom = () => {
  const [grid, setGrid] = useState([]);
  const [shipMap, setShipMap] = useState([]);
  const [hitCounts, setHitCounts] = useState(Array(SHIP_CONFIG.length).fill(0));
  const [hits, setHits] = useState(0);
  const [isShipsMode, setIsShipsMode] = useState(true);
  const [mode, setMode] = useState('play');
  const [isMuted, setIsMuted] = useState(true);
  const [bombsRemaining, setBombsRemaining] = useState(TOTAL_BOMBS);
  const [destroyedShips, setDestroyedShips] = useState(new Set());
  const [isShaking, setIsShaking] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  // Use useMemo to create the audio objects only once
  const kaboomAudio = useMemo(() => new Audio(kaboomSound), []);
  const splooshAudio = useMemo(() => new Audio(splooshSound), []);

  useEffect(() => {
    kaboomAudio.muted = isMuted;
    splooshAudio.muted = isMuted;
  }, [isMuted, kaboomAudio, splooshAudio]);

  const resetGame = () => {
    const { board, shipMap } = generateBoard();
    setGrid(board);
    setShipMap(shipMap);
    setHitCounts(Array(SHIP_CONFIG.length).fill(0));
    setHits(0);
    setBombsRemaining(TOTAL_BOMBS);
    setDestroyedShips(new Set());
  };

  useEffect(() => {
    resetGame();
  }, []);

  const handleCellClick = (row, col) => {
    if (mode === 'solve' || bombsRemaining <= 0 || grid[row][col] === 'hit' || grid[row][col] === 'miss') return;

    // Create an update object to batch our state changes
    const updates = {
        grid: [...grid],
        hits: hits,
        bombsLeft: bombsRemaining - 1,
        destroyed: new Set(destroyedShips),
        hitCounts: [...hitCounts]
    };    
    
    if (updates.grid[row][col] === 'ship') {
        updates.grid[row][col] = 'hit';
        updates.hits = hits + 1;
        
        // Get ship index from the map
        const shipIndex = shipMap[row][col];
        
        if (shipIndex >= 0) {
            updates.hitCounts[shipIndex]++;
            
            // Check if all parts of this ship are hit
            if (updates.hitCounts[shipIndex] === SHIP_CONFIG[shipIndex]) {
                updates.destroyed.add(shipIndex);
            }
        }

        kaboomAudio.currentTime = 0;
        kaboomAudio.play();
        if (!reduceMotion) {
          setIsShaking(true);
          setTimeout(() => setIsShaking(false), 500);
        }
    } else {
        updates.grid[row][col] = 'miss';
        splooshAudio.currentTime = 0;
        splooshAudio.play();
    }

    setGrid(updates.grid);
    setHits(updates.hits);
    setBombsRemaining(updates.bombsLeft);
    setDestroyedShips(updates.destroyed);
    setHitCounts(updates.hitCounts);
  };

  const allShipsSunk = hits === SHIP_CONFIG.reduce((sum, length) => sum + length, 0);
  const hasLost = bombsRemaining === 0 && !allShipsSunk;

  const toggleMode = () => {
    setMode(prevMode => (prevMode === 'play' ? 'solve' : 'play'));
  };

  return (
    <>
      <div className={styles['header-container']}>
        <header className={styles['game-header']}>
          <h1>Sploosh Kaboom</h1>
          
          {/* Play/Solve Mode Toggle */}
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
        </header>
      </div>
      
      <div className={styles.modeCaptionWrapper}>
        <div className={styles.modeCaption}>
          {mode === 'play'
            ? 'Play Mode: Try to sink all ships or squids!'
            : 'Solve Mode: View and adjust ship/squid placements.'}
        </div>
      </div>
      <div className={`${styles.splooshKaboom} ${isShaking ? styles.gameShake : ''}`}>
      <div className={styles.gameLayout}>
        <BombDisplay bombsRemaining={bombsRemaining} />
        <div className={styles.grid}>
          {grid.map((row, rowIndex) => (
            <div key={rowIndex} className={styles.row}>
              {row.map((cell, colIndex) => {
                const isUnguessed = cell !== 'hit' && cell !== 'miss';
                let displaySymbol = '';
                let extraClass = '';
                if (hasLost && isUnguessed) {
                  // Reveal what was under this cell
                  if (shipMap[rowIndex][colIndex] !== -1) {
                    displaySymbol = '💥';
                  } else {
                    displaySymbol = '❌';
                  }
                  extraClass = styles.cellTransparent;
                } else {
                  displaySymbol = cell === 'hit' ? '💥' : cell === 'miss' ? '❌' : '';
                }
                return (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className={
                      `${styles.cell} ` +
                      `${cell === 'hit' ? styles.hit : ''} ` +
                      `${cell === 'miss' ? styles.miss : ''} ` +
                      `${extraClass}`
                    }
                    onClick={() => handleCellClick(rowIndex, colIndex)}
                  >
                    {displaySymbol}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        <ShipDisplay 
          isSquidMode={!isShipsMode} 
          destroyedShips={destroyedShips}
        />
      </div>

      {allShipsSunk && <h2>All {isShipsMode ? 'Ships' : 'Squids'} sunk! You win!</h2>}

      {/* Ships/Squids Toggle */}
      <div className={styles.modeToggleContainer}>
        <div className={styles.toggleLabel}>Ships</div>
        <label className={styles.toggleSwitch}>
          <input
            type="checkbox"
            checked={!isShipsMode}
            onChange={() => setIsShipsMode(!isShipsMode)}
          />
          <span className={styles.toggleSlider}></span>
        </label>
        <div className={styles.toggleLabel}>Squids</div>
      </div>

      <div className={styles.buttonContainer}>
        <button 
          className={styles.resetButton}
          onClick={resetGame}
          aria-label="Reset game"
        >
          Reset
        </button>

        <button 
          className={styles.muteButton}
          onClick={() => setIsMuted(!isMuted)}
          aria-label={isMuted ? "Unmute sounds" : "Mute sounds"}
        >
          {isMuted ? '🔇' : '🔊'}
        </button>
        <button
          className={styles.reduceMotionButton + ' ' + (reduceMotion ? styles.reduceMotionActive : '')}
          onClick={() => setReduceMotion(r => !r)}
          aria-label={reduceMotion ? "Enable motion" : "Reduce motion"}
        >
          {reduceMotion ? '🛑 Motion' : '🏃 Motion'}
        </button>
      </div>
    </div>
    </>
  );
};

export default SplooshKaboom;