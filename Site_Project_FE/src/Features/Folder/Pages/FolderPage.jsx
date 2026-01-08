import { useState, useEffect } from 'react';
import { getFoldersByAccountIdAPI, deleteFolderAPI } from '../../../APIs';
import CreateFolderForm from '../Components/CreateFolderForm';
import UpdateFolderForm from '../Components/UpdateFolderForm';
import FolderList from '../Components/FolderList';
import './FolderPage.scss';

export default function FolderPage() {
  const [folders, setFolders] = useState([]);
  const [editingFolder, setEditingFolder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Load folders from API on component mount
  const loadFolders = async () => {
    setLoading(true);
    setError('');
    
    const result = await getFoldersByAccountIdAPI();
    
    setLoading(false);
    
    if (result.success) {
      setFolders(result.data || []);
    } else {
      setError(result.message || 'Không thể tải danh sách folder');
    }
  };

  useEffect(() => {
    loadFolders();
  }, []);

  const handleFolderCreated = () => {
    loadFolders();
  };

  const handleFolderUpdated = () => {
    loadFolders();
    setEditingFolder(null);
  };

  const handleDeleteFolder = async (folderId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa thư mục này?')) {
      const result = await deleteFolderAPI(folderId);
      
      if (result.success) {
        loadFolders();
      } else {
        alert(result.message || 'Xóa folder thất bại');
      }
    }
  };

  const handleEditFolder = (folder) => {
    setEditingFolder(folder);
  };

  const handleLogout = () => {
    if (window.confirm('Bạn có muốn đăng xuất?')) {
      window.location.href = '/login';
    }
  };

  return (
    <div className="folder-page">
      <div className="folder-header">
        <h1>Quản Lý Thư Mục</h1>
        <button className="btn-logout" onClick={handleLogout}>
          Đăng Xuất
        </button>
      </div>

      <div className="folder-container">
        <CreateFolderForm onFolderCreated={handleFolderCreated} />
        
        {error && <div className="error-message">{error}</div>}
        {loading && <div className="loading-message">Đang tải...</div>}
        
        {!loading && <FolderList 
          folders={folders}
          onEditFolder={handleEditFolder}
          onDeleteFolder={handleDeleteFolder}
        />}

        {editingFolder && (
          <UpdateFolderForm 
            folder={editingFolder}
            onFolderUpdated={handleFolderUpdated}
            onCancel={() => setEditingFolder(null)}
          />
        )}
      </div>
    </div>
  );
}
