import React, { useState } from 'react';
import axios from 'axios';
import './LoginPopup.css';
import B1 from "../Assets/B1.png";
import SignupPopup from './SignupPopup';
import path4 from "../Assets/path4.png";
import Google from "../Assets/Google.png";
import Facebook from "../Assets/Facebook.png";
import { useAuthToken } from './useAuthToken';
import { useNavigate } from 'react-router-dom';
import { refreshToken } from './refreshToken';


function LoginPopup({ onClose, onSignup, onLogin }) {
  const { getToken, setToken, removeToken } = useAuthToken();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    phone_number: '' 
  });
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.email) {
      errors.email = 'Please enter an email';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address.';
    }

    if (!formData.password) {
      errors.password = 'Please enter a valid password';
    }

    if (!formData.phone_number) {
      errors.phone_number = 'Please enter a phone number';
    } else if (!/^\d+$/.test(formData.phone_number)) {
      errors.phone_number = 'Please enter a valid phone number';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        setLoading(true);
        setErrorMessage('');
        
        const response = await axios.post('https://task5-riham-esmail.trainees-mad-s.com/api/auth/login', formData, {
          headers: {
            'Accept': 'application/json',
          }
        });

        if (response.status === 200) {
          const {accessToken, refreshToken} = response.data.data;
          localStorage.setItem('accessToken', accessToken);
         
          localStorage.setItem('refreshToken', refreshToken);
          onLogin(); 
          onClose(); 
          
          
        } else {
          setErrorMessage('Failed to login. Please check your credentials.');
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          // Token expired, try refreshing
          try {
            const newAccessToken = await refreshToken(localStorage.getItem('refreshToken'));
            localStorage.setItem('accessToken', newAccessToken);
            // Retry original request
            const response = await axios.post('https://task5-riham-esmail.trainees-mad-s.com/api/auth/login', formData, {
              headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${newAccessToken}`
              }
            });
            if (response.status === 200) {
              const { accessToken, refreshToken } = response.data.data;
              localStorage.setItem('accessToken', accessToken);
              localStorage.setItem('refreshToken', refreshToken);
              onLogin();
              onClose();
            } else {
              setErrorMessage('Failed to login after refresh. Please try again later.');
            }
          } catch (refreshError) {
            console.error('Error refreshing token:', refreshError.message);
            setErrorMessage('Failed to refresh token. Please try again later.');
          }
        } else {
          console.error('Error:', error.message);
          setErrorMessage(`Error: ${error.message}`);
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSignupClick = () => {
    onSignup(); 
    onClose(); 
    console.log('Signup button clicked...');
    
  };

  return (
    <div className="Lpopup">
      <div className="Lpopup-content">
        <div className="left-section">
          <img src={B1} alt="Left Section" />
        </div>
        <div className="right-section">
          <button className="close-button" onClick={onClose}>×</button>
          <h2>تسجيل الدخول</h2>
          <div className="form">
            <form onSubmit={handleSubmit}>
              <div className="input-container">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <label>الإيميل أو رقم الهاتف</label>
                {errors.email && <div className="error">{errors.email}</div>}
              </div>
              <div className="input-container">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <label>كلمة المرور</label>
                {errors.password && <div className="error">{errors.password}</div>}
              </div>
              <div className="input-container">
                <input
                  type="text"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  required
                />
                <label>رقم الهاتف</label>
                {errors.phone_number && <div className="error">{errors.phone_number}</div>}
              </div>
              <button type="submit" className="submit-button" disabled={loading}>
                {loading ? 'Processing...' : 'تسجيل الدخول'}
              </button>
              {errorMessage && <div className="error-message">{errorMessage}</div>}
            </form>
          </div>
          <div className="signup-link">
            <p>ليس لديك حساب! <span onClick={handleSignupClick} style={{ cursor: 'pointer', color: 'blue' }}>إنشاء حساب</span></p>
          </div>
          <div className="divider"><span>أو</span></div>
          <div className="social-buttons">
            <button className="social-button google">
              <img src={Google} alt="Google" />
              <span>Google</span>
            </button>
            <button className="social-button facebook">
              <img src={Facebook} alt="Facebook" />
              <span>Facebook</span>
            </button>
            <button className="social-button apple" type='button'>
              <img src={path4} alt="Apple" />
              <span>Apple</span>
            </button>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default LoginPopup;
