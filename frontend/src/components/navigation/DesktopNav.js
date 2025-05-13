import { NavLink } from 'react-router-dom';

const DesktopNav = () => (
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
    <NavLink to="/splooshkaboom" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
      <span className="nav-icon kaboom-icon"></span>
      Sploosh Kaboom
    </NavLink>
  </nav>
);

export default DesktopNav;