import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./components/Header.jsx";
import HeroSection from './components/HeroSection.jsx';
import Assetify from './components/Assetify.jsx';
import LoginPopup from './modals/LoginPopup.jsx';
import SignupPopup from './modals/SignupPopup.jsx';
import VerificationPopup from './modals/VerificationPopup.jsx'; 
import AppRoutes from './routes/AppRoutes.jsx';
import { AuthProvider } from './AuthProvider';
import LogoutPopup from './modals/LogoutPopup.jsx';
import {
  openLoginPopup,
  closeLoginPopup,
  openSignupPopup,
  closeSignupPopup,
  openVerificationPopup,
  closeVerificationPopup,
  handleSignupClick,
} from './modalFunctions.js';

function App() {
  const [email, setEmail] = useState(''); 
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isSignupPopupOpen, setIsSignupPopupOpen] = useState(false);
  const [isVerificationPopupOpen, setIsVerificationPopupOpen] = useState(false);
  const [isLogoutPopupOpen, setIsLogoutPopupOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    closeLoginPopup(setIsLoginPopupOpen);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsLogoutPopupOpen(false);
  };

  const handleLogoutClick = () => {
    setIsLogoutPopupOpen(true); 
  };

  return (
    <div>
      <AuthProvider >
      
      <Header 
        isLoggedIn={isLoggedIn}
        onLoginClick={() => openLoginPopup(setIsLoginPopupOpen, setIsSignupPopupOpen)} 
        onLogoutClick={handleLogoutClick} 
      />
      <AppRoutes /> 
      <HeroSection />
      <Assetify />
      {isLoginPopupOpen && (
        <LoginPopup 
          onClose={() => closeLoginPopup(setIsLoginPopupOpen)} 
          onSignup={() => handleSignupClick(setIsSignupPopupOpen, setIsLoginPopupOpen)} 
          onLogin={handleLogin} 
        />
      )}
      
      {isSignupPopupOpen && (
        
        <SignupPopup 
        
          onClose={() => closeSignupPopup(setIsSignupPopupOpen)} 
          onLogin={() => openLoginPopup(setIsLoginPopupOpen, setIsSignupPopupOpen)} 
        />
      )}
      {isVerificationPopupOpen && (
        <VerificationPopup 
          onClose={() => closeVerificationPopup(setIsVerificationPopupOpen)} 
          email={email} 
        />
      )}
      {isLogoutPopupOpen && (
        <LogoutPopup 
          onClose={() => setIsLogoutPopupOpen(false)} 
          onLogout={handleLogout} 
        />
      )}
      </AuthProvider>
    </div>
    
  );
}

export default App;
