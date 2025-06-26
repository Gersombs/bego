
import React from 'react';
import arrow from '../assets/images/arrow.png';
import bell from '../assets/icons/bell.svg'; 
import '../index.css';

const Header = () => {
  return (
    <header className="header">
        <img src={arrow} alt="Back Arrow" className="header__back-icon" />
      <h1 className="header__title">Cargo Orders</h1>
      <img src={bell} alt="Bell Icon" className='bell' />
    </header>
  );
};

export default Header;
