import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a response interceptor to handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error: any) => {
    console.error('API Error Details:', JSON.stringify(error, null, 2));
    if (error.response) {
      console.error('Response Status:', error.response.status);
      console.error('Response Data:', error.response.data);
    } else if (error.request) {
      console.error('No response received (Possible CORS or Server Down).');
    } else {
      console.error('Error Message:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
