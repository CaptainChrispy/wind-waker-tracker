import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SavesProvider } from './context/SavesContext';
import DesktopNav from './components/navigation/DesktopNav';
import MobileNav from './components/navigation/MobileNav';
import FigurineChecklist from './components/FigurineChecklist';
import SlidingPuzzle from './components/SlidingPuzzle';
import SplooshKaboom from './components/SplooshKaboom';
import InventoryTracker from './components/InventoryTracker';
import Map from './components/Map';
import './App.css';
import CompletionFooter from './components/CompletionFooter';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setMenuOpen(false);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <SavesProvider>
      <BrowserRouter>
        <header className="site-header">
          <div className="header-container">
            <h1 className="site-title">Wind Waker Tracker</h1>
            {isMobile ? (
              <button className="hamburger-button" onClick={() => setMenuOpen(!menuOpen)}>
                <div className="hamburger-icon">
                  <span></span><span></span><span></span>
                </div>
              </button>
            ) : (
              <DesktopNav />
            )}
          </div>
        </header>

        {isMobile && <MobileNav isOpen={menuOpen} onClose={() => setMenuOpen(false)} />}

        <main className="main-content">
          <Routes>
            <Route path="/seachart" element={<Map />} />
            <Route path="/figurines" element={<FigurineChecklist />} />
            <Route path="/slidingpuzzles" element={<SlidingPuzzle />} />
            <Route path="/splooshkaboom" element={<SplooshKaboom />} />
            <Route path="/inventory" element={<InventoryTracker />} />
            <Route path="/" element={<Map />} />
          </Routes>
        </main>
        <CompletionFooter />
      </BrowserRouter>
    </SavesProvider>
  );
}

export default App;