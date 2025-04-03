// frontend/src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FigurineChecklist from './components/FigurineChecklist';
import Map from './components/Map';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Map />} />
        <Route path="/figurines" element={<FigurineChecklist />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
