// LoginPopup.js
import React from 'react';
import "./LoginPopup.css"
import {Link} from "react-router-dom"

function LoginPopup({ onClose }) {
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form submission
    // You can add your login logic here
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <button onClick={onClose}>Close</button>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}> {/* Add onSubmit event handler */}
          <label>Username:</label>
          <input type="text" />
          <label>Email:</label>
          <input type="email" />
          <button type="submit">Submit</button>
        </form>
        <p>Don't have an account? <Link to="/signup">Sign up</Link></p> {/* Link to signup page */}
      </div>
    </div>
  );
}

export default LoginPopup;
