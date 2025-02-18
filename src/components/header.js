import React, { useState, useEffect } from "react";

const Header = ({ setCategory, setQuery, toggleDarkMode }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [show, setShow] = useState(true);

  const controlHeader = () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > lastScrollY) { // scrolling down
      setShow(false);
    } else { // scrolling up
      setShow(true);
    }

    // Update scroll position
    setLastScrollY(currentScrollY);
    // Set whether page is scrolled
    setIsScrolled(currentScrollY > 10);
  };

  useEffect(() => {
    window.addEventListener('scroll', controlHeader);
    return () => {
      window.removeEventListener('scroll', controlHeader);
    };
  }, [lastScrollY]);

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
    <header 
      className={`fixed-top ${isScrolled ? 'bg-gradient-dark shadow-lg' : 'bg-transparent'}`}
      style={{
        transform: show ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform 0.3s ease-in-out, background-color 0.3s ease',
        padding: isScrolled ? '0.5rem 0' : '1rem 0'
      }}
    >
      <div className="container d-flex justify-content-between align-items-center">
        <h1 className="mb-0 fw-bold d-flex align-items-center">
          <span className="text-primary">News</span>
          <span className="text-white">Now</span>
        </h1>
        
        <div className="d-flex gap-3 align-items-center">
          <select 
            className="form-select w-auto border-0 rounded-pill px-3"
            onChange={(e) => setCategory(e.target.value)}
            defaultValue="general"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>

          <div className="position-relative">
            <input
              type="text"
              className="form-control rounded-pill px-3"
              placeholder="Search Articles..."
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <button 
            className="btn btn-outline-light rounded-circle"
            onClick={toggleDarkMode}
          >
            <i className="bi bi-moon-stars-fill"></i>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
