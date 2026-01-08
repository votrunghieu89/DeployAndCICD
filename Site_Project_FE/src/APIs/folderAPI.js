import baseAPIClient from './baseAPIClient';
import { getAccountIdFromToken } from './utils';

// API tạo folder mới
export const createFolderAPI = async (folderData) => {
  try {
    const accountId = getAccountIdFromToken();
    
    if (!accountId) {
      return {
        success: false,
        message: 'Không tìm thấy thông tin tài khoản. Vui lòng đăng nhập lại.',
      };
    }
    
    const response = await baseAPIClient.post('/folders', {
      folderName: folderData.folderName,
      accountId: accountId,
    });
    
    return {
      success: true,
      data: response.data,
      message: 'Tạo folder thành công',
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Tạo folder thất bại',
      statusCode: error.response?.status,
    };
  }
};

// API cập nhật folder
export const updateFolderAPI = async (folderData) => {
  try {
    const response = await baseAPIClient.put('/folders', {
      folderId: folderData.folderId,
      folderName: folderData.folderName,
    });
    
    return {
      success: true,
      data: response.data,
      message: 'Cập nhật folder thành công',
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Cập nhật folder thất bại',
      statusCode: error.response?.status,
    };
  }
};

// API xóa folder
export const deleteFolderAPI = async (folderId) => {
  try {
    const response = await baseAPIClient.delete(`/folders/${folderId}`);
    
    return {
      success: true,
      data: response.data,
      message: 'Xóa folder thành công',
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Xóa folder thất bại',
      statusCode: error.response?.status,
    };
  }
};

// API lấy danh sách folders theo accountId
export const getFoldersByAccountIdAPI = async () => {
  try {
    const accountId = getAccountIdFromToken();
    
    if (!accountId) {
      return {
        success: false,
        message: 'Không tìm thấy thông tin tài khoản',
      };
    }
    
    const response = await baseAPIClient.get(`/folders/account/${accountId}`);
    
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Lấy danh sách folder thất bại',
      statusCode: error.response?.status,
    };
  }
};
