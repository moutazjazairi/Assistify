
import './App.css';

import HomePage from './pages/homePage.jsx';
import Header from './components/Header.jsx';
import About from './pages/About.jsx';
import React, {useState} from 'react';

import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import More from './pages/More.jsx';
import Programes from './pages/Programes.jsx';
import Realestate from './pages/realEstate.jsx';
import Sell from './pages/Sell.jsx';
import HeroSection from './components/HeroSection.jsx';
import Assetify from './components/Assetify.jsx';
import LoginPopup from './components/LoginPopup.jsx';


function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => {
    setIsPopupOpen(true);
    console.log();
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };
  return (
  <div>
    <Header onLoginClick={openPopup}/>
    
    <Routes>
      
      <Route path="/" element={<HomePage/>}/>
      <Route path='/realEstate' element={<Realestate/>} />
      <Route path='/about' element={<About/>} />
      <Route path='/more' element={<More/>} />
      <Route path='/programes' element={<Programes/>} />
      <Route path='/Sell' element={<Sell/>} />
      
    </Routes>
    <HeroSection/>
    <Assetify/>
    {isPopupOpen && < LoginPopup onClose={closePopup}/>}
  </div>
  );
}

export default App;
