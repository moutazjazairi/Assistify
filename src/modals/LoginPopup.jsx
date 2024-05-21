import React, { useState } from 'react';
import './LoginPopup.css';
import B1 from "../Assets/B1.png";
import SignupPopup from './SignupPopup';
import VerificationPopup from './VerificationPopup';
import path4 from "../Assets/path4.png";
import Google from "../Assets/Google.png";
import Facebook from "../Assets/Facebook.png";

function LoginPopup({ onClose, onSignup, onLogin }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isVerificationPopupOpen, setIsVerificationPopupOpen] = useState(false);
  const [isSignupPopupOpen, setIsSignupPopupOpen] = useState(false);
  const [code,setCode]=useState(['','','','','',''])

  const handleLogin = () => {
    onClose(); // Close login popup
    setIsVerificationPopupOpen(true); // Open verification popup
  };

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
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsVerificationPopupOpen(true);
       // Simulate login
    }
  };

  const handleSignupClick = () => {
    setIsSignupPopupOpen(true);
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
              <button type="submit" className="submit-button">تسجيل الدخول</button>
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
      {isVerificationPopupOpen && <VerificationPopup email={formData.email} onClose={() => setIsVerificationPopupOpen(false)} onVerify={onLogin} />}
      {isSignupPopupOpen && <SignupPopup onClose={() => setIsSignupPopupOpen(false)} />}
    </div>
  );
}

export default LoginPopup;
