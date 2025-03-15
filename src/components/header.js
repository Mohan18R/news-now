import React, { useState, useEffect, useCallback } from "react";
import { RiSunLine, RiMoonClearLine } from 'react-icons/ri';
import { BiSearchAlt2 } from 'react-icons/bi';
import './header.css';

const Header = ({ setCategory, setQuery, toggleDarkMode }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [show, setShow] = useState(true);
  const [isDark, setIsDark] = useState(document.body.classList.contains('dark-mode'));
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const controlHeader = useCallback(() => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY) {
      setShow(false);
    } else {
      setShow(true);
    }
    setLastScrollY(currentScrollY);
    setIsScrolled(currentScrollY > 10);
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener('scroll', controlHeader);
    return () => {
      window.removeEventListener('scroll', controlHeader);
    };
  }, [controlHeader]);

  const handleThemeToggle = () => {
    setIsDark(!isDark);
    toggleDarkMode();
  };

  const categories = [
    "general",
    "business",
    "entertainment",
    "health",
    "science",
    "sports",
    "technology",
  ];

  return (
    <header className={`app-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <div className="logo-section">
          <h1 className="logo">
            <span className="text-gradient">News</span>
            <span className="text-secondary-brand">Now</span>
          </h1>
        </div>
        
        <div className={`search-section ${isSearchOpen ? 'open' : ''}`}>
          <div className="search-box">
            <BiSearchAlt2 
              className="search-icon" 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            />
            <input
              type="text"
              placeholder="Search news..."
              onChange={(e) => setQuery(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        <div className="nav-section">
          <div className="controls-group">
            <select 
              className="category-select"
              onChange={(e) => setCategory(e.target.value)}
              defaultValue="general"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
            
            <button 
              className="theme-toggle"
              onClick={handleThemeToggle}
              aria-label="Toggle theme"
            >
              {isDark ? (
                <RiSunLine className="theme-icon" />
              ) : (
                <RiMoonClearLine className="theme-icon" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
