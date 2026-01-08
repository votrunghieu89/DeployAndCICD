import baseAPIClient from './baseAPIClient';

// API cho đăng nhập
export const loginAPI = async (loginData) => {
  try {
    const response = await baseAPIClient.post('/auth/login', {
      userName: loginData.userName,
      password: loginData.password,
    });
    
    // Lưu accessToken vào localStorage
    if (response.data && response.data.accessToken) {
      localStorage.setItem('accessToken', response.data.accessToken);
    }
    
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Đăng nhập thất bại',
      statusCode: error.response?.status,
    };
  }
};

// API cho đăng ký
export const registerAPI = async (registerData) => {
  try {
    const response = await baseAPIClient.post('/auth/register', {
      userName: registerData.userName,
      password: registerData.password,
      email: registerData.email,
    });
    
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Đăng ký thất bại',
      statusCode: error.response?.status,
    };
  }
};

// API để logout
export const logoutAPI = () => {
  localStorage.removeItem('accessToken');
  window.location.href = '/login';
};

// Kiểm tra xem user đã đăng nhập chưa
export const isAuthenticated = () => {
  return !!localStorage.getItem('accessToken');
};

// Lấy token từ localStorage
export const getToken = () => {
  return localStorage.getItem('accessToken');
};
