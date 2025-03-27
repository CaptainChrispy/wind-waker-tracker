# Wind Waker Tracker

A comprehensive tracking application for The Legend of Zelda: The Wind Waker, built with the MERN stack. Track your progress through the game including chests, charts, upgrades, collectibles, and more.

## Technology Stack
This project uses the MERN stack:
- MongoDB: NoSQL database (to be implemented in future versions)
- Express: Backend web application framework for Node.js
- React: Frontend JavaScript library for building user interfaces
- Node.js: JavaScript runtime for server-side code

## Getting Started
### Prerequisites
- Node.js (v14 or later)
- npm (Node Package Manager, comes with Node.js)

### Installation
1. Clone the repository:
```bash
git clone https://github.com/CaptainChrispy/wind-waker-tracker.git
cd wind-waker-tracker
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

### Running the Application
You can run both the frontend and backend using a single command from the project root:
```bash
./start-app.bat
```

This will start:
- The backend server on `http://localhost:5000`
- The frontend application on `http://localhost:3000`

### Development 
- Backend code is located in the [`backend` directory](backend/index.js).
- Frontend code is located in the [`frontend` directory](frontend/src/App.js).
- React components are in [`frontend/src/components`](frontend/src/components/).

## Key Libraries and Frameworks
### Frontend
- React: A framework for building component-based user interfaces
- Leaflet/React-Leaflet: For interactive maps and location tracking
- React Router: For routing and navigation between different screens

### Backend 
- Express: A web application framework for Node.js
- CORS: Middleware for enabling Cross-Origin Resource Sharing

## Project Structure
```
wind-waker-tracker/
├── backend/             # Express server code
│   ├── index.js         # Server entry point
│   └── node_modules/    # Backend dependencies
├── frontend/            # React application
│   ├── public/          # Static files
│   ├── src/             # React source code
│   │   ├── components/  # React components
│   │   ├── App.js       # Main React component
│   │   └── index.js     # React entry point
│   └── node_modules/    # Frontend dependencies
├── docs/                # Documentation
│   ├── map-screen.md    # Map screen documentation
│   ├── checklists.md    # Various checklist features
│   └── inventory.md     # Inventory tracking system
└── start-app.bat        # Script to run both frontend and backend
```

## Documentation
For detailed information on specific features, please refer to the `docs` directory:
- [map-screen.md](docs/map-screen.md) - Information on the map screen and its features.
- [checklists.md](docs/checklists.md) - Details on the various checklists available in the application.
- [inventory.md](docs/inventory.md) - Overview of the inventory tracking system.

