import { useNavigate } from 'react-router-dom';
import './FolderList.scss';

export default function FolderList({ folders, onEditFolder, onDeleteFolder }) {
  const navigate = useNavigate();

  const handleFolderClick = (folderId) => {
    navigate(`/folders/${folderId}/notes`);
  };

  if (folders.length === 0) {
    return (
      <div className="folder-list-empty">
        <p>Chưa có thư mục nào. Hãy tạo thư mục đầu tiên của bạn!</p>
      </div>
    );
  }

  return (
    <div className="folder-list">
      <h2>Danh Sách Thư Mục</h2>
      <div className="folder-grid">
        {folders.map((folder) => (
          <div key={folder.folderId} className="folder-item">
            <div 
              className="folder-clickable" 
              onClick={() => handleFolderClick(folder.folderId)}
              title="Mở thư mục"
            >
              <div className="folder-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/>
                </svg>
              </div>
              <div className="folder-info">
                <h3>{folder.folderName}</h3>
                <p className="folder-date">
                  {folder.createAt ? new Date(folder.createAt).toLocaleDateString('vi-VN') : ''}
                </p>
              </div>
            </div>
            <div className="folder-actions">
              <button 
                className="btn-edit" 
                onClick={(e) => {
                  e.stopPropagation();
                  onEditFolder(folder);
                }}
                title="Chỉnh sửa"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                </svg>
              </button>
              <button 
                className="btn-delete" 
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteFolder(folder.folderId);
                }}
                title="Xóa"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
