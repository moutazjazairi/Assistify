import React from 'react'
import {Link} from "react-router-dom"
import Logo from '../Assets/Logo.png'
import "./Header.css";
import LoginPopup from '../modals/LoginPopup';



const Header = ({isLoggedIn, onLoginClick, onLogoutClick}) => {
    return (
      
        <header>
          <div className='header-main'>
        <div className="left-section">
          <a className='btn-pri' href="/start"> أبدأ</a>
          {isLoggedIn ? (
        <button onClick={onLogoutClick} className='btn-sec'>Logout</button>
      ) : (
        <button onClick={onLoginClick} className='btn-sec'>Login</button>
      )}
          
          
        </div>
        
        <div className="middle-section">
          <ul>
            <li><Link to="/realEstate" className='no-underline'>العقارات</Link></li>
            <li><Link to="/about" className='no-underline'>حول</Link></li>
            <li><Link to="/Programes" className='no-underline'>برامج الجنسية لدى اسيستفاي</Link></li>
            <li><Link to="/Sell" className='no-underline'>البيع</Link></li>
            <li><Link to="/More" className='no-underline'>المزيد</Link></li>
          </ul>
        </div>
        <div className="hright-section">
           <img src={Logo} className='himg'/>
        </div>
        </div>
      </header>
      );
}

export default Header