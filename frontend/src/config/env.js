// src/config/env.js
const config = {
    apiUrl: import.meta.env.VITE_API_URL || 'http://ec2-44-203-97-209.compute-1.amazonaws.com:3000/api',
    apiUrlAuth: import.meta.env.VITE_API_URL_AUTH || 'http://localhost:3001/api',
    env: import.meta.env.VITE_ENV || 'development',
  };
  
  export default config;