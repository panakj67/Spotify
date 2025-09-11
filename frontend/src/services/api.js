import axios from 'axios';

// API configuration
export const API_BASE_URL = 'https://song-steam-backend.onrender.com';
export const API_ENDPOINTS = {
  SEARCH: '/songs/search-songs',
  GET_SONGS: '/songs/get-songs',
};

// Default API config
export const apiConfig = {
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
};

// Create axios instance
const api = axios.create(apiConfig);

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add any request preprocessing here
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.name === 'CanceledError') {
      // Request was cancelled, usually due to component unmounting
      return Promise.reject(error);
    }

    if (!error.response) {
      // Network error
      console.error('Network error:', error);
      return Promise.reject(new Error('Network error. Please check your connection.'));
    }

    switch (error.response.status) {
      case 401:
        // Unauthorized
        window.location.href = '/login';
        break;
      case 403:
        // Forbidden
        console.error('Access forbidden:', error);
        break;
      case 404:
        // Not found
        console.error('Resource not found:', error);
        break;
      case 500:
        // Server error
        console.error('Server error:', error);
        break;
      default:
        console.error('API error:', error);
    }

    return Promise.reject(error);
  }
);

export default api;
