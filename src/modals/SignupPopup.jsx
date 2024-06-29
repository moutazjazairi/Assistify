import React, { useState } from 'react';
import axios from 'axios';
import './SignupPopup.css';
import Google from '../Assets/Google.png';
import Facebook from '../Assets/Facebook.png';
import Apple from '../Assets/path4.png';
import B1 from "../Assets/B1.png";
import { useNavigate } from 'react-router-dom';
import VerificationPopup from './VerificationPopup';

function SignupPopup({ onClose, onLogin, onVerify }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    phone: '',
    password: '',
    confirmPassword: '',
    photo: null,
    certificate: null
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isVerificationStep, setIsVerificationStep] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    validateForm({ ...formData, [name]: value });
  };

  const validateForm = (data) => {
    const errors = {};
    if (!data.email) {
      errors.email = 'Please enter an email';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!data.username) {
      errors.username = 'Please enter a username';
    }

    if (!data.phone) {
      errors.phone = 'Please enter a phone number';
    }

    if (!data.password) {
      errors.password = 'Please enter a password';
    }

    if (data.password !== data.confirmPassword) {
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

    setFormData({
      ...formData,
      [e.target.name]: e.dataTransfer.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm(formData)) {
      try {
        setLoading(true);
        setErrorMessage('');
        setSuccessMessage('');

        const formDataToSubmit = new FormData();
        formDataToSubmit.append('username', formData.username);
        formDataToSubmit.append('phone_number', formData.phone);
        formDataToSubmit.append('email', formData.email);
        formDataToSubmit.append('password', formData.password);
        formDataToSubmit.append('password_confirmation', formData.confirmPassword);
        formDataToSubmit.append('photo', formData.photo);
        formDataToSubmit.append('certificate', formData.certificate);

        const response = await axios.post('https://task5-riham-esmail.trainees-mad-s.com/api/auth/signup', formDataToSubmit, {
          headers: {
            'Accept': 'application/json',
          }
        });

        if (response.status === 201) {
          setSuccessMessage('Account created successfully! Please check your email for the verification code.');
          setIsVerificationStep(true);  
        } else {
          setErrorMessage('Failed to create account. Please try again.');
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 422) {
            const { errors } = error.response.data.data;
            if (errors && errors.length > 0) {
              const errorMessages = errors.join(', ');
              setErrorMessage(`Validation errors: ${errorMessages}`);
            } else {
              setErrorMessage('Validation errors occurred. Please check your inputs.');
            }
          } else {
            setErrorMessage(`Error: ${error.response.data.msg}`);
          }
        } else if (error.request) {
          setErrorMessage('Error: No response from the server. Please try again.');
        } else {
          setErrorMessage('Error: Something went wrong. Please try again.');
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const handleVerification = async (verificationCode) => {
    try {
      setLoading(true);
      const response = await axios.post('https://task5-riham-esmail.trainees-mad-s.com/api/auth/verify', { email: formData.email, code: verificationCode });
      if (response.status === 200) {
        setSuccessMessage('Verification successful!');
        onLogin();
        navigate('/More');  
      } else {
        setErrorMessage('Verification failed. Please try again.');
      }
    } catch (error) {
      setErrorMessage('Verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-popup">
      {!isVerificationStep ? (
        <div className="Spopup-content">
          <button className="close-button" onClick={onClose}>×</button>
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
                    htmlFor="photo"
                    className="file-label"
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <span>الصورة الشخصية</span>
                    <input
                      type="file"
                      name="photo"
                      id="photo"
                      onChange={handleFileChange}
                    />
                    <span>اسحب و افلت الصورة هنا او قم برفعها من الملفات</span>
                    <span className="file-size">الحجم الأقصى: 2MB</span>
                  </label>
                </div>
                <div className="Sfile-upload-container">
                  <label
                    htmlFor="certificate"
                    className="file-label"
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <span>الشهادات</span>
                    <input
                      type="file"
                      name="certificate"
                      id="certificate"
                      onChange={handleFileChange}
                    />
                    <span>اسحب و افلت الصورة هنا او قم برفعها من الملفات</span>
                    <span className="file-size">الحجم الأقصى: 1MB</span>
                  </label>
                </div>
                <button type="submit" className="submit-button" onClick={handleSubmit} disabled={loading}>
                  {loading ? 'Processing...' : 'إنشاء حساب'}
                </button>
              </div>
              <div className="Smiddle-right-section">
                <form>
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
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            {successMessage && <div className="success-message">{successMessage}</div>}
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
      ) : (
        <VerificationPopup onClose={onClose} email={formData.email} onVerify={handleVerification} />
      )}
    </div>
  );
}

export default SignupPopup;
