// import axios from 'axios';

// const api = axios.create({
//   baseURL: 'http://localhost:8080/api', // Spring Boot backend
//   withCredentials: true, // for auth sessions
// });

//export default api;

import axios from 'axios';

const API_BASE = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});


api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
