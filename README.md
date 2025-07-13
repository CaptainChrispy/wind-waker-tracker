# Wind Waker Tracker

A comprehensive progress tracking application for The Legend of Zelda: The Wind Waker. Track your collectibles, inventory, charts, figurines, and game progress with an interactive interface that includes mini-games and detailed checklists. 

** THIS IS A WORK IN PROGRESS - MANY FEATURES ARE STILL UNDER DEVELOPMENT **

## Features

### 📍 Interactive Map
- Interactive sea chart with all islands and locations
- Track treasure chart locations and discoveries
- Mark completed areas and collectibles
- Zoom and pan functionality with detailed island information

### 📦 Inventory Tracker
- Complete item tracking system
- Visual inventory grid with item icons
- Progress tracking for upgrades and equipment
- Heart pieces and special items monitoring

### 🎭 Figurine Checklist
- Complete Nintendo Gallery figurine tracking
- Organized by categories (Bosses, Characters, Enemies, etc.)
- Visual checklist with figurine images
- Progress statistics and completion tracking

### 🎮 Mini-Games
- **Sliding Puzzle Solver**: Automated solver for in-game sliding puzzles
- **Sploosh Kaboom**: Battleship-style game tracker

### 💾 Save Management
- Multiple save file support
- Local storage persistence
- Import/export save data
- Progress backup and restoration

## Tech Stack

### Frontend
- **React 19.0.0**: Modern React with hooks and context
- **React Router DOM 7.4.1**: Client-side routing and navigation
- **Leaflet 1.9.4 + React-Leaflet 5.0.0**: Interactive mapping functionality
- **Bootstrap 5.3.5**: Responsive UI components and styling
- **CSS Modules**: Component-scoped styling

### Backend
- **Node.js + Express 4.21.2**: RESTful API server
- **CORS 2.8.5**: Cross-origin resource sharing
- **Custom sliding puzzle solver**: Algorithm for sliding puzzle mini-game

## Getting Started

### Prerequisites
- Node.js (v16 or later)
- npm (comes with Node.js)

### Installation
1. Clone the repository:
```bash
git clone https://github.com/CaptainChrispy/wind-waker-tracker.git
cd wind-waker-tracker
```

2. Install dependencies for both frontend and backend:
```bash
# Install backend dependencies
cd backend && npm install

# Install frontend dependencies
cd ../frontend && npm install
```

### Running the Application

#### Option 1: Quick Start (Windows)
```bash
# From project root
start-app.bat
```

#### Option 2: Manual Start
```bash
# Terminal 1: Start backend server
cd backend
npm start

# Terminal 2: Start frontend development server
cd frontend
npm start
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## Development

### Project Structure
```
wind-waker-tracker/
├── backend/                 # Express.js API server
│   ├── index.js            # Server entry point
│   ├── slidingPuzzleSolver.js  # Puzzle solving algorithm
│   └── package.json        # Backend dependencies
├── frontend/               # React application
│   ├── public/             # Static assets
│   │   └── assets/         # Game images and icons
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── Map.js              # Interactive map component
│   │   │   ├── InventoryTracker.js # Inventory management
│   │   │   ├── FigurineChecklist.js # Figurine tracking
│   │   │   ├── SlidingPuzzle.js    # Puzzle solver interface
│   │   │   ├── SplooshKaboom.js    # Mini-game tracker
│   │   │   ├── TingleTuner.js      # Special features
│   │   │   └── navigation/         # Navigation components
│   │   ├── context/        # React context providers
│   │   │   └── SavesContext.js     # Save file management
│   │   ├── assets/         # Data files and game assets
│   │   │   └── data/       # Game data (charts, items, etc.)
│   │   └── App.js          # Main application component
│   └── package.json        # Frontend dependencies
├── docs/                   # Documentation
└── start-app.bat          # Windows startup script
```

## API Endpoints

### Sliding Puzzle Solver
- `POST /api/solve-sliding-puzzle`: Solve sliding puzzle configurations
  - Accepts puzzle state and returns solution steps
  - Used by the Sliding Puzzle component for automatic solving

## Available Scripts

### Frontend Scripts
- `npm start`: Start development server (http://localhost:3000)
- `npm run build`: Build for production
- `npm test`: Run test suite
- `npm run eject`: Eject from Create React App (one-way operation)

### Backend Scripts  
- `npm start`: Start Express server (http://localhost:5000)

## Documentation

For detailed information on specific features, refer to the `docs` directory:
- [**Map Screen**](docs/map-screen.md): Interactive map functionality and features
- [**Checklists**](docs/checklists.md): Figurine and collectible tracking systems  
- [**Inventory**](docs/inventory.md): Item tracking and inventory management
