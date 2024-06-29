import React from 'react';
import axios from 'axios';
import './LogoutPopup.css';
import B1 from "../Assets/B1.png";
import { useAuthToken } from './useAuthToken';

const LogoutPopup = ({ onClose, onLogout }) => {
  const { getToken, removeToken } = useAuthToken();
  const token = getToken();

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        'https://task5-riham-esmail.trainees-mad-s.com/api/auth/logout',
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          }
        }
      );
      if (response.status === 200) {
        removeToken();
        onLogout();
        onClose();
        console.log('handleLogout'); 
      } else {
        console.error('Logout failed:', response.data.msg || 'Unknown error');
      }
    } catch (error) {
      console.error('Error during logout:', error.message);
    }
  };

  return (
    <div className='LogoutPopup'>
      <div className='Logpopup-content'>
        <div className='Logleft-section'>
          <img src={B1} alt='' />
        </div>
        <div className='Logright-section'>
          <h2>هل أنت متأكد من تسجيل الخروج</h2>
          <button onClick={handleLogout}>تأكيد</button>
          <button onClick={onClose}>تراجع</button>
        </div>
      </div>
    </div>
  );
};

export default LogoutPopup;
