import React, { useState } from 'react';
import './VerificationPopup.css';
import B1 from "../Assets/B1.png"

const VerificationPopup = ({ onClose , email, onVerify }) => {
  const [code, setCode] = useState(['', '', '', '', '', '']);

  const handleInputChange = (e, index) => {
    const value = e.target.value;
    if (value.length <= 1) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
    }
  };
  const handleVerification = () => {
  
    console.log('Verification successful!');
    onVerify(); 
    onClose(); 
  };

  return (
    <div className="popup">
      <div className="Vpopup-content">
        <div className="Vleft-section">
          <img src={B1 } alt="Verification" />
        </div>
        <div className="Vright-section">
          <button className="close-button" onClick={onClose}>×</button>
          <h2>مرحبا بك </h2>
          <p><a href={email}></a>لقد تم إرسال رمز التأكيد إلى{email}:</p>
          <div className="code-input">
            {code.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleInputChange(e, index)}
              />
            ))}
          </div>
          <button className="confirm-button" onClick={handleVerification}>تأكيد</button>
          <p className='p2'>اذا لم يصلك الرمز يمكنك اعادة المحاولة بعد <span>4:20</span></p>
          <button className="resend-button">إعادة الإرسال</button>
        </div>
      </div>
    </div>
  );
};

export default VerificationPopup;
