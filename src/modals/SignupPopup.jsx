import React, { useState } from 'react';
import './SignupPopup.css';
import Google from '../Assets/Google.png';
import Facebook from '../Assets/Facebook.png';
import Apple from '../Assets/path4.png'; 
import B1 from "../Assets/B1.png"
import { Link } from 'react-router-dom';

function SignupPopup({ onClose, onLogin }) {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});

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
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.username) {
      errors.username = 'Please enter a username';
    }

    if (!formData.phone) {
      errors.phone = 'Please enter a phone number';
    }

    if (!formData.password) {
      errors.password = 'Please enter a password';
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0],
    });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.target.classList.add('dragover');
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.target.classList.remove('dragover');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.target.classList.remove('dragover');

    const { name } = e.dataTransfer.files[0];
    setFormData({
      ...formData,
      [e.target.name]: e.dataTransfer.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      
    }
  };

  return (
    <div className="signup-popup">
      <button className="close-button" onClick={onClose}>×</button>
      <div className="Spopup-content">
        
        <div className="Sleft-section">
          
          <img src={B1} alt="Your Image" />
        </div>

        
        <div className="Sright-section">
          
          <div className="Stop-section">
            <h2>إنشاء حساب</h2>
          </div>
          
          <div className="Smiddle-section">
            
            <div className="Smiddle-left-section">
              
              <div className="Sfile-upload-container">
                <label
                  htmlFor="profilePicture"
                  className="file-label"
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <span>الصورة الشخصية</span>
                  <input
                    type="file"
                    name="profilePicture"
                    id="profilePicture"
                    onChange={handleFileChange}
                  />
                  <span>اسحب و افلت الصورة هنا او قم برفعها من الملفات</span>
                  <span className="file-size">الحجم الأقصى: 2MB</span>
                </label>
              </div>
              <div className="Sfile-upload-container">
                <label
                  htmlFor="identityProof"
                  className="file-label"
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <span>اثبات شخصية</span>
                  <input
                    type="file"
                    name="identityProof"
                    id="identityProof"
                    onChange={handleFileChange}
                  />
                  <span>اسحب و افلت الصورة هنا او قم برفعها من الملفات</span>
                  <span className="file-size">الحجم الأقصى: 1MB</span>
                </label>
              </div>
              <button type="submit" className="submit-button">إنشاء حساب</button>
              
           
            
          
            </div>
            
            <div className="Smiddle-right-section">
              
              <form onSubmit={handleSubmit}>
                
                
                <div className="input-container">
                  <label>الإيميل</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  {errors.email && <div className="error">{errors.email}</div>}
                </div>
                
                <div className="input-container">
                  <label>اسم المستخدم</label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                  {errors.username && <div className="error">{errors.username}</div>}
                </div>
                
                <div className="input-container">
                  <label>رقم الهاتف</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                  {errors.phone && <div className="error">{errors.phone}</div>}
                </div>
                
                <div className="input-container">
                  <label>كلمة المرور</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  {errors.password && <div className="error">{errors.password}</div>}
                </div>
                
                <div className="input-container">
                  <label>تأكيد كلمة المرور</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                  {errors.confirmPassword && <div className="error">{errors.confirmPassword}</div>}
                </div>
                
                
              </form>
            </div>
          </div>
          
          <div className="Sbottom-section">
            
            <div className="Sdivider"><span>أو</span></div>
            
            <div className="Ssocial-buttons">
              <button className="social-button google">
                <img src={Google} alt="Google" />
                <span>Google</span>
              </button>
              <button className="social-button apple">
                <img src={Apple} alt="Apple" />
                <span>Apple</span>
              </button>
              <button className="social-button facebook">
                <img src={Facebook} alt="Facebook" />
                <span>Facebook</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPopup;