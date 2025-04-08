import React from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import FigurineChecklist from './components/FigurineChecklist';
import SlidingPuzzle from './components/SlidingPuzzle';
import Map from './components/Map';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <header className="ww-header">
        <nav className="ww-nav">
          <NavLink to="/seachart" className={({ isActive }) => isActive ? "ww-nav-link active" : "ww-nav-link"}>
            <span className="nav-icon map-icon"></span>
            Sea Chart
          </NavLink>
          <NavLink to="/figurines" className={({ isActive }) => isActive ? "ww-nav-link active" : "ww-nav-link"}>
            <span className="nav-icon figurine-icon"></span>
            Figurines
          </NavLink>
          <NavLink to="/slidingpuzzles" className={({ isActive }) => isActive ? "ww-nav-link active" : "ww-nav-link"}>
            <span className="nav-icon puzzle-icon"></span>
            Puzzles
          </NavLink>
        </nav>
      </header>

      <main className="ww-content">
        <Routes>
          <Route path="/seachart" element={<Map />} />
          <Route path="/figurines" element={<FigurineChecklist />} />
          <Route path="/slidingpuzzles" element={<SlidingPuzzle />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;