import React, { useState } from "react";

const Header = ({ setCategory, setQuery, toggleDarkMode }) => {
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <header className="bg-dark text-white p-3 d-flex justify-content-between align-items-center">
      <h1 className="mb-0">NewsNow</h1>
      <div className="d-flex gap-3">
        <select className="form-select w-auto" onChange={handleCategoryChange}>
          <option value="general">General</option>
          <option value="business">Business</option>
          <option value="technology">Technology</option>
          <option value="entertainment">Entertainment</option>
          <option value="sports">Sports</option>
          <option value="health">Health</option>
        </select>

        {/* Search Bar */}
        <input
          type="text"
          className="form-control w-auto"
          placeholder="Search Articles"
          onChange={handleSearchChange}
        />

        {/* Dark/Light Mode Toggle (Emojis) */}
        <button className="btn btn-outline-light" onClick={toggleDarkMode}>
          {document.body.classList.contains("dark-mode") ? "🌞" : "🌙"}
        </button>
      </div>
    </header>
  );
};

export default Header;
