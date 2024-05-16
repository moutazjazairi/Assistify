import React from 'react'
import {Link} from "react-router-dom"
import Logo from '../Assets/Logo.png'
import "./Header.css";
import LoginPopup from './LoginPopup';



const Header = ({onLoginClick}) => {
    return (
      
        <header>
          <div className='header-main'>
        <div className="left-section">
          <a className='btn-pri' href="/start"> أبدأ</a>
          <button onClick={onLoginClick} className='btn-sec ' Link to={LoginPopup}>تسجيل الدخول</button>
          
        </div>
        
        <div className="middle-section">
          <ul>
            <li><Link to="/realEstate">العقارات</Link></li>
            <li><Link to="/about">حول</Link></li>
            <li><Link to="/Programes">برامج الجنسية لدى اسيستفاي</Link></li>
            <li><Link to="/Sell">البيع</Link></li>
            <li><Link to="/More">المزيد</Link></li>
          </ul>
        </div>
        <div className="right-section">
           <img src={Logo}/>
        </div>
        </div>
      </header>
      );
}

export default Header