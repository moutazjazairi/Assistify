import React, { useState, useEffect } from 'react';
import './VerificationPopup.css';
import B1 from "../Assets/B1.png";
import axios from 'axios';

const VerificationPopup = ({ onClose, email, onVerify }) => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(260); // 4 minutes and 20 seconds
  const [canResend, setCanResend] = useState(false);
  const [resendMessage, setResendMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);

      return () => clearInterval(countdown);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleInputChange = (e, index) => {
    const value = e.target.value;
    if (value.length <= 1) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
    }
  };

  const handleVerification = async () => {
    const verificationCode = code.join('');
    try {
      const response = await axios.post('https://task5-riham-esmail.trainees-mad-s.com/api/auth/verify-email', {
        email: email,
        code: verificationCode
      });

      if (response.status === 200) {
        // Verification successful
        console.log('Email verified successfully!');
        onVerify(); // Trigger callback to handle successful verification
        onClose(); // Close verification popup
      } else {
        // Handle other status codes if needed
        setErrorMessage('Failed to verify email. Please try again.');
      }
    } catch (error) {
      // Handle network errors or other issues
      console.error('Error verifying email:', error);
      setErrorMessage('Failed to verify email. Please try again.');
    }
  };

  const handleResend = async () => {
    try {
      const response = await axios.post('https://task5-riham-esmail.trainees-mad-s.com/api/auth/resend', { email });
      if (response.status === 200) {
        setResendMessage('Verification code resent successfully.');
        setTimer(260);
        setCanResend(false);
      } else {
        setResendMessage('Failed to resend verification code. Please try again.');
      }
    } catch (error) {
      setResendMessage('Failed to resend verification code. Please try again.');
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className="popup">
      <div className="Vpopup-content">
        <div className="Vleft-section">
          <img src={B1} alt="Verification" />
        </div>
        <div className="Vright-section">
          <button className="close-button" onClick={onClose}>×</button>
          <h2>مرحبا بك </h2>
          <p>لقد تم إرسال رمز التأكيد إلى {email}:</p>
          <div className="code-input">
          {Array.from({ length: 6 }, (_, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={code[index]}
              onChange={(e) => handleInputChange(e, index)}
            />
            ))}
          </div>
          <button className="confirm-button" onClick={handleVerification}>تأكيد</button>
          <p className='p2'>
            اذا لم يصلك الرمز يمكنك اعادة المحاولة بعد <span>{formatTime(timer)}</span>
          </p>
          <button className="resend-button" onClick={handleResend} disabled={!canResend}>إعادة الإرسال</button>
          {resendMessage && <p>{resendMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default VerificationPopup;
