const express = require('express');
const router = express.Router();

/**
 * Sliding puzzle solver logic (A* with Manhattan + Linear Conflict)
 *
 * Exposes a POST endpoint /api/solve-sliding-puzzle that accepts a JSON body:
 *   { tiles: number[], emptyPosition: number }
 * and returns:
 *   { solution: Array<{ tilePos: number, direction: string, tiles: number[] }> }
 *
 * The solver uses the A* search algorithm with a combined Manhattan distance and linear conflict heuristic
 * for optimal performance. It is optimized with a binary heap priority queue and a visited state map.
 */

// --- Puzzle Constants ---
const GRID_SIZE = 4;
const TILE_COUNT = GRID_SIZE * GRID_SIZE;
const EMPTY_TILE = TILE_COUNT - 1;

/**
 * Calculates the sum of Manhattan distances for all tiles from their goal positions.
 * @param {number[]} tiles - The current puzzle state.
 * @returns {number} The total Manhattan distance.
 */
function getManhattanDistance(tiles) {
  let distance = 0;
  for (let i = 0; i < tiles.length; i++) {
    const tile = tiles[i];
    if (tile !== EMPTY_TILE) {
      const targetRow = Math.floor(tile / GRID_SIZE);
      const targetCol = tile % GRID_SIZE;
      const currentRow = Math.floor(i / GRID_SIZE);
      const currentCol = i % GRID_SIZE;
      distance += Math.abs(targetRow - currentRow) + Math.abs(targetCol - currentCol);
    }
  }
  return distance;
}

/**
 * Calculates the linear conflict heuristic for the puzzle state.
 * Adds extra cost for tiles in the correct row/column but out of order.
 * @param {number[]} tiles - The current puzzle state.
 * @returns {number} The linear conflict penalty (always even).
 */
function getLinearConflicts(tiles) {
  let conflicts = 0;
  // Rows
  for (let row = 0; row < GRID_SIZE; row++) {
    const rowTiles = [];
    for (let col = 0; col < GRID_SIZE; col++) {
      const index = row * GRID_SIZE + col;
      const tile = tiles[index];
      if (tile !== EMPTY_TILE && Math.floor(tile / GRID_SIZE) === row) {
        rowTiles.push(tile);
      }
    }
    for (let i = 0; i < rowTiles.length; i++) {
      for (let j = i + 1; j < rowTiles.length; j++) {
        if (rowTiles[i] > rowTiles[j]) conflicts++;
      }
    }
  }
  // Columns
  for (let col = 0; col < GRID_SIZE; col++) {
    const colTiles = [];
    for (let row = 0; row < GRID_SIZE; row++) {
      const index = row * GRID_SIZE + col;
      const tile = tiles[index];
      if (tile !== EMPTY_TILE && (tile % GRID_SIZE) === col) {
        colTiles.push(tile);
      }
    }
    for (let i = 0; i < colTiles.length; i++) {
      for (let j = i + 1; j < colTiles.length; j++) {
        if (colTiles[i] > colTiles[j]) conflicts++;
      }
    }
  }
  return conflicts * 2;
}

/**
 * Checks if the puzzle is solved (tiles in order).
 * @param {number[]} tiles - The current puzzle state.
 * @returns {boolean} True if solved, false otherwise.
 */
function isPuzzleSolved(tiles) {
  return tiles.every((tile, index) => tile === index);
}

/**
 * Generates all valid next moves from the current state by sliding a tile into the empty space.
 * @param {number[]} currentTiles - The current puzzle state.
 * @param {number} emptyPos - The index of the empty tile.
 * @returns {Array<{tiles: number[], emptyPos: number, move: string, tileIndex: number}>}
 */
function getNextMoves(currentTiles, emptyPos) {
  const moves = [];
  const row = Math.floor(emptyPos / GRID_SIZE);
  const col = emptyPos % GRID_SIZE;

  // Up
  if (row < GRID_SIZE - 1) {
    const newPos = emptyPos + GRID_SIZE;
    const newTiles = [...currentTiles];
    newTiles[emptyPos] = newTiles[newPos];
    newTiles[newPos] = EMPTY_TILE;
    moves.push({ tiles: newTiles, emptyPos: newPos, move: 'up', tileIndex: newPos });
  }
  // Down
  if (row > 0) {
    const newPos = emptyPos - GRID_SIZE;
    const newTiles = [...currentTiles];
    newTiles[emptyPos] = newTiles[newPos];
    newTiles[newPos] = EMPTY_TILE;
    moves.push({ tiles: newTiles, emptyPos: newPos, move: 'down', tileIndex: newPos });
  }
  // Left
  if (col < GRID_SIZE - 1) {
    const newPos = emptyPos + 1;
    const newTiles = [...currentTiles];
    newTiles[emptyPos] = newTiles[newPos];
    newTiles[newPos] = EMPTY_TILE;
    moves.push({ tiles: newTiles, emptyPos: newPos, move: 'left', tileIndex: newPos });
  }
  // Right
  if (col > 0) {
    const newPos = emptyPos - 1;
    const newTiles = [...currentTiles];
    newTiles[emptyPos] = newTiles[newPos];
    newTiles[newPos] = EMPTY_TILE;
    moves.push({ tiles: newTiles, emptyPos: newPos, move: 'right', tileIndex: newPos });
  }
  return moves;
}

/**
 * Checks if a puzzle state is solvable using inversion count and empty tile row.
 * @param {number[]} tiles - The current puzzle state.
 * @param {number} emptyPosition - The index of the empty tile.
 * @returns {boolean} True if solvable, false otherwise.
 */
function isSolvable(tiles, emptyPosition) {
  let inversions = 0;
  const arr = tiles.filter(t => t !== EMPTY_TILE);
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] > arr[j]) inversions++;
    }
  }
  const emptyRow = Math.floor(emptyPosition / GRID_SIZE);
  const emptyRowFromBottom = GRID_SIZE - emptyRow;
  return (emptyRowFromBottom % 2 === 0)
    ? (inversions % 2 === 1)
    : (inversions % 2 === 0);
}

// --- Fast Priority Queue (Binary Heap) ---
/**
 * A fast binary heap-based priority queue for A* search.
 */
class FastPriorityQueue {
  constructor() { this.heap = []; }

  enqueue(element, priority) {
    const node = { element, priority };
    this.heap.push(node);
    this._bubbleUp(this.heap.length - 1);
  }

  dequeue() {
    if (this.heap.length === 0) return undefined;
    const min = this.heap[0].element;
    const end = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = end;
      this._sinkDown(0);
    }
    return min;
  }

  isEmpty() { return this.heap.length === 0; }

  _bubbleUp(n) {
    const node = this.heap[n];
    while (n > 0) {
      const parentN = Math.floor((n + 1) / 2) - 1;
      if (this.heap[parentN].priority <= node.priority) break;
      this.heap[n] = this.heap[parentN];
      n = parentN;
    }
    this.heap[n] = node;
  }

  _sinkDown(n) {
    const length = this.heap.length;
    const node = this.heap[n];
    while (true) {
      let child2N = (n + 1) * 2;
      let child1N = child2N - 1;
      let swap = null;
      if (child1N < length && this.heap[child1N].priority < node.priority) {
        swap = child1N;
      }
      if (child2N < length && this.heap[child2N].priority < (swap === null ? node.priority : this.heap[child1N].priority)) {
        swap = child2N;
      }
      if (swap === null) break;
      this.heap[n] = this.heap[swap];
      n = swap;
    }
    this.heap[n] = node;
  }
}

// --- Main Solver (A* Search) ---
/**
 * Solves the sliding puzzle using the A* search algorithm.
 * Returns the optimal sequence of moves, or an empty array if unsolvable.
 *
 * @param {number[]} initialTiles - The starting puzzle state.
 * @param {number} initialEmptyPos - The index of the empty tile.
 * @returns {Promise<Array<{tilePos: number, direction: string, tiles: number[]}>>}
 */
async function solvePuzzleAStar(initialTiles, initialEmptyPos) {
  if (isPuzzleSolved(initialTiles)) return [];
  if (!isSolvable(initialTiles, initialEmptyPos)) return [];

  const queue = new FastPriorityQueue();
  const visited = new Map();
  const startKey = initialTiles.join(',');
  const startState = {
    tiles: initialTiles,
    emptyPos: initialEmptyPos,
    g: 0,
    h: getManhattanDistance(initialTiles) + getLinearConflicts(initialTiles),
    path: []
  };

  queue.enqueue(startState, startState.g + startState.h);
  visited.set(startKey, 0);

  while (!queue.isEmpty()) {
    const current = queue.dequeue();
    if (isPuzzleSolved(current.tiles)) {
      return current.path.map(step => ({
        tilePos: step.tileIndex,
        direction: step.move,
        tiles: step.resultTiles
      }));
    }
    const possibleMoves = getNextMoves(current.tiles, current.emptyPos);
    for (const move of possibleMoves) {
      const tileString = move.tiles.join(',');
      const g = current.g + 1;
      if (!visited.has(tileString) || g < visited.get(tileString)) {
        visited.set(tileString, g);
        const nextState = {
          tiles: move.tiles,
          emptyPos: move.emptyPos,
          g,
          h: getManhattanDistance(move.tiles) + getLinearConflicts(move.tiles),
          path: [...current.path, {
            move: move.move,
            tileIndex: move.tileIndex,
            resultTiles: move.tiles.slice()
          }]
        };
        queue.enqueue(nextState, nextState.g + nextState.h);
      }
    }
  }
  return [];
}

// --- API Endpoint ---
/**
 * POST /api/solve-sliding-puzzle
 *
 * Request body: { tiles: number[], emptyPosition: number }
 * Response: { solution: Array<{ tilePos: number, direction: string, tiles: number[] }> }
 *
 * Returns the optimal solution steps for the given sliding puzzle state.
 */
router.post('/', async (req, res) => {
  try {
    const { tiles, emptyPosition } = req.body;
    if (!Array.isArray(tiles) || typeof emptyPosition !== 'number') {
      return res.status(400).json({ error: 'Invalid input' });
    }
    const solution = await solvePuzzleAStar(tiles, emptyPosition);
    res.json({ solution });
  } catch (err) {
    res.status(500).json({ error: 'Solver error', details: err.message });
  }
});

module.exports = router;
