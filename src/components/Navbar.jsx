
import React, { useRef, useEffect, useState } from 'react';
import Stroke from '../assets/icons/stroke.svg';
import Search from '../assets/icons/search.svg';
import '../index.css';

const tabs = [
  { key: 'upcoming',  label: 'Upcoming'  },
  { key: 'completed', label: 'Completed' },
  { key: 'past',      label: 'Past'      },
];

export default function Navbar({ activeTab, onTabChange, onSearch }) {
  const tabRefs = useRef([]);
  const [strokePos, setStrokePos] = useState({ left: 0 });
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const idx = tabs.findIndex(t => t.key === activeTab);
    const btn = tabRefs.current[idx];
    if (btn) {
      const style = getComputedStyle(btn);
      const paddingLeft = parseFloat(style.paddingLeft);
      const leftPosition = btn.offsetLeft + paddingLeft;
      setStrokePos({ left: leftPosition });
    }
  }, [activeTab]);

  const handleSearchChange = e => {
    setSearchValue(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <nav className="navbar">
      <div className="navbar__tabs-wrapper">
        <ul className="navbar__tabs">
          {tabs.map((tab, i) => (
            <li key={tab.key}>
              <button
                ref={el => tabRefs.current[i] = el}
                className={`navbar__tab ${activeTab === tab.key ? 'navbar__tab--active' : ''}`}
                onClick={() => onTabChange(tab.key)}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
        <div 
          className="navbar__stroke-container"
          style={{ transform: `translateX(${strokePos.left}px)` }}
        >
          <img 
            src={Stroke} 
            alt="Active tab indicator" 
            className="navbar__stroke" 
          />
        </div>
      </div>

      <div className="navbar__search">
        <img src={Search} alt="Search Icon" className="navbar__search-icon" />
        <input
          type="text"
          className="navbar__search-input"
          placeholder="Search"
          value={searchValue}
          onChange={handleSearchChange}
        />
      </div>
    </nav>
  );
}
