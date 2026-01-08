import baseAPIClient from './baseAPIClient';

// API tạo note mới
export const createNoteAPI = async (noteData) => {
  try {
    const response = await baseAPIClient.post('/notes', {
      title: noteData.title,
      description: noteData.description,
      folderId: noteData.folderId,
    });
    
    return {
      success: true,
      data: response.data,
      message: 'Tạo note thành công',
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Tạo note thất bại',
      statusCode: error.response?.status,
    };
  }
};

// API cập nhật note
export const updateNoteAPI = async (noteData) => {
  try {
    const response = await baseAPIClient.put('/notes', {
      noteId: noteData.noteId,
      title: noteData.title,
      description: noteData.description,
    });
    
    return {
      success: true,
      data: response.data,
      message: 'Cập nhật note thành công',
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Cập nhật note thất bại',
      statusCode: error.response?.status,
    };
  }
};

// API xóa note
export const deleteNoteAPI = async (noteId) => {
  try {
    const response = await baseAPIClient.delete(`/notes/${noteId}`);
    
    return {
      success: true,
      data: response.data,
      message: 'Xóa note thành công',
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Xóa note thất bại',
      statusCode: error.response?.status,
    };
  }
};

// API lấy danh sách notes theo folderId
export const getNotesByFolderIdAPI = async (folderId) => {
  try {
    const response = await baseAPIClient.get(`/notes/folder/${folderId}`);
    
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Lấy danh sách note thất bại',
      statusCode: error.response?.status,
    };
  }
};

// API lấy chi tiết một note theo noteId
export const getNoteByIdAPI = async (noteId) => {
  try {
    const response = await baseAPIClient.get(`/notes/${noteId}`);
    
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Lấy thông tin note thất bại',
      statusCode: error.response?.status,
    };
  }
};
