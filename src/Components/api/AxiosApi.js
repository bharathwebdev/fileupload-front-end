import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:8443', // Replace with your backend API URL
  withCredentials: true, // Allow cookies to be included with the requests
});

export default api;
