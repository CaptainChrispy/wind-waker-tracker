import { NavLink } from 'react-router-dom';

const MobileNav = ({ isOpen, onClose }) => (
  <>
    <div className={`mobile-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}></div>
    <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
      <div className="mobile-menu-header">
        <button className="close-menu-button" onClick={onClose}>×</button>
      </div>
      <nav className="mobile-nav">
        <NavLink 
          to="/seachart" 
          className={({ isActive }) => isActive ? "mobile-nav-link active" : "mobile-nav-link"}
          onClick={onClose}
        >
          <span className="nav-icon map-icon"></span>
          Sea Chart
        </NavLink>
        <NavLink 
          to="/figurines" 
          className={({ isActive }) => isActive ? "mobile-nav-link active" : "mobile-nav-link"}
          onClick={onClose}
        >
          <span className="nav-icon figurine-icon"></span>
          Figurines
        </NavLink>
        <NavLink 
          to="/slidingpuzzles" 
          className={({ isActive }) => isActive ? "mobile-nav-link active" : "mobile-nav-link"}
          onClick={onClose}
        >
          <span className="nav-icon puzzle-icon"></span>
          Sliding Puzzles
        </NavLink>
        <NavLink 
          to="/splooshkaboom" 
          className={({ isActive }) => isActive ? "mobile-nav-link active" : "mobile-nav-link"}
          onClick={onClose}
        >
          <span className="nav-icon kaboom-icon"></span>
          Sploosh Kaboom
        </NavLink>
        <NavLink 
          to="/inventory" 
          className={({ isActive }) => isActive ? "mobile-nav-link active" : "mobile-nav-link"}
          onClick={onClose}
        >
          <span className="nav-icon inventory-icon"></span>
          Inventory
        </NavLink>
      </nav>
    </div>
  </>
);

export default MobileNav;