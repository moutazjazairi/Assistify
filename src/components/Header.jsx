import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Assets/Logo.png';
import './Header.css';

const Header = ({ isLoggedIn, onLoginClick, onLogoutClick }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    if (window.innerWidth <= 768) {
      setMenuOpen(!menuOpen);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMenuOpen(false); // Close menu if screen size is larger than 768px
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <header>
      <div className='header-main'>
        <div className='hamburger-menu' onClick={toggleMenu}>
          ☰
        </div>
        <div className='left-section'>
          <a className='btn-pri'>أبدأ</a>
          {isLoggedIn ? (
            <button onClick={onLogoutClick} className='btn-sec'>Logout</button>
          ) : (
            <button onClick={onLoginClick} className='btn-sec'>Login</button>
          )}
        </div>
        <div className='middle-section'>
          <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
            <li><Link to='/realEstate' className='no-underline'>العقارات</Link></li>
            <li><Link to='/about' className='no-underline'>حول</Link></li>
            <li><Link to='/Programes' className='no-underline'>برامج الجنسية لدى اسيستفاي</Link></li>
            <li><Link to='/Sell' className='no-underline'>البيع</Link></li>
            <li><Link to='/More' className='no-underline'>المزيد</Link></li>
          </ul>
        </div>
        <div className='hright-section'>
          <img src={Logo} className='himg' alt='Logo' />
        </div>
      </div>
      <div className={`content ${menuOpen ? 'active' : ''}`}>
        {/* Content here */}
      </div>
    </header>
  );
}

export default Header;
