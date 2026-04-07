import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useTheme } from "../context/ThemeContext";

function Navbar() {
  const favorites = useSelector((state) => state.favorites.items);
  const { theme, toggleTheme, userProfile } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/destinations", label: "Destinations" },
    { path: "/booking", label: "Booking" },
    { path: "/reports", label: "Reports" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <span className="brand-icon">✈</span>
        TravelX
      </Link>

      <div className={`navbar-links ${menuOpen ? "open" : ""}`}>
        {navLinks.map(({ path, label }) => (
          <Link
            key={path}
            to={path}
            className={`nav-link ${isActive(path) ? "active" : ""}`}
            onClick={() => setMenuOpen(false)}
          >
            {label}
          </Link>
        ))}
        <Link
          to="/favorites"
          className={`nav-link favorites-link ${isActive("/favorites") ? "active" : ""}`}
          onClick={() => setMenuOpen(false)}
        >
          ♥ Saved
          {favorites.length > 0 && (
            <span className="badge">{favorites.length}</span>
          )}
        </Link>
      </div>

      <div className="navbar-actions">
        <div className="user-pill" title={`${userProfile.name} — ${userProfile.tier}`}>
          <img src={userProfile.avatar} alt={userProfile.name} className="user-avatar" />
          <span className="user-tier">{userProfile.tier}</span>
        </div>
        <button className="theme-toggle" onClick={toggleTheme} title="Toggle dark mode">
          {theme === "light" ? "🌙" : "☀️"}
        </button>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;