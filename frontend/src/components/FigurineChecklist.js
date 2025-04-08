import React, { useState, useEffect } from 'react';
import './FigurineChecklist.css';

const FigurineChecklist = () => {
  const categories = [
    "Hyrule",
    "Outset Island",
    "Windfall Island",
    "Forest Haven", 
    "Dragon Roost Island",
    "Great Sea",
    "Dungeons",
    "Bosses",
    "Special"
  ];

  // WIP figurine collection data
  const figurineCollection = [
    { id: 1, name: "Link", location: "Outset Island", category: "Hyrule", obtained: false, missable: false },
    { id: 2, name: "Tetra", location: "Pirate Ship", category: "Great Sea", obtained: false, missable: false },
    { id: 3, name: "Ganondorf", location: "Forsaken Fortress", category: "Bosses", obtained: false, missable: false },
    { id: 4, name: "King of Red Lions", location: "Great Sea", category: "Hyrule", obtained: false, missable: false },
    { id: 5, name: "Aryll", location: "Outset Island", category: "Outset Island", obtained: false, missable: false },
    { id: 6, name: "Grandma", location: "Outset Island", category: "Outset Island", obtained: false, missable: false },
    { id: 7, name: "Orca", location: "Outset Island", category: "Outset Island", obtained: false, missable: false },
    { id: 8, name: "Sturgeon", location: "Outset Island", category: "Outset Island", obtained: false, missable: false },
    { id: 9, name: "Sue-Belle", location: "Outset Island", category: "Outset Island", obtained: false, missable: false },
    { id: 10, name: "Mesa", location: "Outset Island", category: "Outset Island", obtained: false, missable: false },
    { id: 11, name: "Abe", location: "Outset Island", category: "Outset Island", obtained: false, missable: false },
    { id: 12, name: "Rose", location: "Outset Island", category: "Outset Island", obtained: false, missable: false },
    { id: 13, name: "Zill", location: "Outset Island", category: "Outset Island", obtained: false, missable: false },
    { id: 14, name: "Joel", location: "Outset Island", category: "Outset Island", obtained: false, missable: false },
    { id: 15, name: "Tingle", location: "Windfall Island", category: "Windfall Island", obtained: false, missable: false },
    { id: 98, name: "Knuckle", location: "Forsaken Fortress", category: "Special", obtained: false, missable: true },
    { id: 99, name: "Puppet Ganon", location: "Ganon's Tower", category: "Bosses", obtained: false, missable: true },
  ];

  const [figurines, setFigurines] = useState(() => {
    const saved = localStorage.getItem('ww-figurines');
    return saved ? JSON.parse(saved) : figurineCollection;
  });
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('id');
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    localStorage.setItem('ww-figurines', JSON.stringify(figurines));
  }, [figurines]);

  const toggleFigurine = (id) => {
    setFigurines(figurines.map(fig => 
      fig.id === id ? { ...fig, obtained: !fig.obtained } : fig
    ));
  };

  const filteredFigurines = figurines
    .filter(fig => {
      if (filter === 'obtained') return fig.obtained;
      if (filter === 'missing') return !fig.obtained;
      if (filter === 'missable') return fig.missable;
      return true;
    })
    .filter(fig => {
      if (activeCategory !== 'all') return fig.category === activeCategory;
      return true;
    })
    .filter(fig => 
      fig.name.toLowerCase().includes(search.toLowerCase()) ||
      fig.location.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'location') return a.location.localeCompare(b.location);
      return a.id - b.id;
    });

  const progress = {
    total: figurines.length,
    obtained: figurines.filter(fig => fig.obtained).length,
    percentage: Math.round((figurines.filter(fig => fig.obtained).length / figurines.length) * 100)
  };

  return (
    <div className="figurine-checklist">
      <header className="figurine-header">
        <h1>Figurine Collection</h1>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{width: `${progress.percentage}%`}}
          ></div>
          <span className="progress-text">
            {progress.obtained} / {progress.total} ({progress.percentage}%)
          </span>
        </div>
      </header>

      <div className="figurine-controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search figurines..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="filter-controls">
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All Figurines</option>
            <option value="obtained">Obtained Only</option>
            <option value="missing">Missing Only</option>
            <option value="missable">Missable Figurines</option>
          </select>

          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="id">Sort by Number</option>
            <option value="name">Sort by Name</option>
            <option value="location">Sort by Location</option>
          </select>
        </div>
      </div>

      <div className="category-tabs">
        <button 
          className={activeCategory === 'all' ? 'active' : ''} 
          onClick={() => setActiveCategory('all')}
        >
          All
        </button>
        {categories.map(category => (
          <button
            key={category}
            className={activeCategory === category ? 'active' : ''}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="figurine-list">
        {filteredFigurines.length === 0 ? (
          <div className="no-results">No figurines match your search criteria.</div>
        ) : (
          filteredFigurines.map(figurine => (
            <div 
              key={figurine.id} 
              className={`figurine-item ${figurine.obtained ? 'obtained' : ''} ${figurine.missable ? 'missable' : ''}`}
            >
              <div className="figurine-number">#{figurine.id}</div>
              <div className="figurine-details">
                <h3>{figurine.name}</h3>
                <p>Location: {figurine.location}</p>
                {figurine.missable && <span className="missable-tag">Missable!</span>}
              </div>
              <label className="figurine-checkbox">
                <input 
                  type="checkbox" 
                  checked={figurine.obtained}
                  onChange={() => toggleFigurine(figurine.id)}
                />
                <span className="checkbox-text">Obtained</span>
              </label>
            </div>
          ))
        )}
      </div>
      
      <div className="figurine-tips">
        <h3>Tips for Figurine Collection</h3>
        <ul>
          <li>Take pictographs of characters before they become unavailable!</li>
          <li>You need the Deluxe Picto Box for colored pictographs.</li>
          <li>Bring pictographs to Carlov at the Nintendo Gallery.</li>
          <li>Each figurine takes a day to create - use the Song of Passing to speed up time.</li>
        </ul>
      </div>
    </div>
  );
};

export default FigurineChecklist;