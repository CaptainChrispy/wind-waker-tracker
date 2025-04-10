import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import FigurineChecklist from './components/FigurineChecklist';
import SlidingPuzzle from './components/SlidingPuzzle';
import Map from './components/Map';
import './App.css';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <BrowserRouter>
      <header className="site-header">
        <div className="header-container">
          <h1 className="site-title">Wind Waker Tracker</h1>
          
          {isMobile ? (
            <button className="hamburger-button" onClick={toggleMenu}>
              <div className="hamburger-icon">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </button>
          ) : (
            <nav className="main-nav">
              <NavLink to="/seachart" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                <span className="nav-icon map-icon"></span>
                Sea Chart
              </NavLink>
              <NavLink to="/figurines" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                <span className="nav-icon figurine-icon"></span>
                Figurines
              </NavLink>
              <NavLink to="/slidingpuzzles" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                <span className="nav-icon puzzle-icon"></span>
                Sliding Puzzles
              </NavLink>
            </nav>
          )}
        </div>
      </header>

      {isMobile && (
        <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
          <div className="mobile-menu-header">
            <button className="close-menu-button" onClick={closeMenu}>
              <span className="close-icon">×</span>
            </button>
          </div>
          <nav className="mobile-nav">
            <NavLink 
              to="/seachart" 
              className={({ isActive }) => isActive ? "mobile-nav-link active" : "mobile-nav-link"}
              onClick={closeMenu}
            >
              <span className="nav-icon map-icon"></span>
              Sea Chart
            </NavLink>
            <NavLink 
              to="/figurines" 
              className={({ isActive }) => isActive ? "mobile-nav-link active" : "mobile-nav-link"}
              onClick={closeMenu}
            >
              <span className="nav-icon figurine-icon"></span>
              Figurines
            </NavLink>
            <NavLink 
              to="/slidingpuzzles" 
              className={({ isActive }) => isActive ? "mobile-nav-link active" : "mobile-nav-link"}
              onClick={closeMenu}
            >
              <span className="nav-icon puzzle-icon"></span>
              Sliding Puzzles
            </NavLink>
          </nav>
        </div>
      )}

      <main className="main-content">
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