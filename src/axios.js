import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api/',
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    // config.headers['Authorization'] = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Error response:", error.response);
    return Promise.reject(error);
  }
);

export default axiosInstance;
