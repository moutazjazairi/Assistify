// useAuthToken.js
import { useState } from 'react';

export const useAuthToken = () => {
  const getToken = () => {
    return localStorage.getItem('accessToken');
  };

  const setToken = (token) => {
    localStorage.setItem('accessToken', token);
  };

  const removeToken = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  };

  return {
    getToken,
    setToken,
    removeToken,
  };
};
