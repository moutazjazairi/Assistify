// AppRoutes.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../pages/homePage';
import About from '../pages/About';
import More from '../pages/More';
import Programes from '../pages/Programes';
import Realestate from '../pages/realEstate';
import Sell from '../pages/Sell';
import LoginPage from '../modals/LoginPopup';
import { useAuth } from '../AuthProvider';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<About />} />
      <Route path="/more" element={<More />} />
      <Route path="/programes" element={<Programes />} />
      <Route path="/realestate" element={<Realestate />} />
      <Route path="/sell" element={<Sell />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/protected" element={<ProtectedRoute></ProtectedRoute>} />
    </Routes>
  );
};

export default AppRoutes;
