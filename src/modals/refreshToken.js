

import axios from 'axios';

const baseURL = 'https://task5-riham-esmail.trainees-mad-s.com/api/auth/refresh'; 

export const refreshToken = async (refreshToken) => {
  try {
    const response = await axios.post(`${baseURL}/auth/refresh`, { refreshToken });
    const { accessToken } = response.data;
    localStorage.setItem('accessToken', accessToken);
    return accessToken;
  } catch (error) {
    console.error('Error refreshing token:', error.message);
    throw error;
  }
};
