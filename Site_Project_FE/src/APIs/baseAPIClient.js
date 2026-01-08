import axios from 'axios';

// Base URL cho API - có thể thay đổi theo môi trường
const API_BASE_URL = '/api';

// Tạo instance axios với cấu hình mặc định
const baseAPIClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds
});

// Request interceptor - thêm token vào header nếu có
baseAPIClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - xử lý lỗi chung
baseAPIClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // Server trả về lỗi
      if (error.response.status === 401) {
        // Token hết hạn hoặc không hợp lệ
        localStorage.removeItem('accessToken');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default baseAPIClient;
