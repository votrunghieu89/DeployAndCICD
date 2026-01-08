import { useState, useEffect } from 'react';
import { updateFolderAPI } from '../../../APIs';
import './UpdateFolderForm.scss';

export default function UpdateFolderForm({ folder, onFolderUpdated, onCancel }) {
  const [folderName, setFolderName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (folder) {
      setFolderName(folder.folderName);
    }
  }, [folder]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (folderName.trim() && folder) {
      setLoading(true);
      setError('');
      
      const result = await updateFolderAPI({
        folderId: folder.folderId,
        folderName: folderName.trim()
      });
      
      setLoading(false);
      
      if (result.success) {
        onFolderUpdated();
      } else {
        setError(result.message || 'Cập nhật folder thất bại');
      }
    }
  };

  if (!folder) return null;

  return (
    <div className="update-folder-overlay" onClick={onCancel}>
      <form className="update-folder-form" onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
        <h3>Cập Nhật Thư Mục</h3>
        
        {error && <div className="error-message">{error}</div>}
        
        <div className="form-group">
          <label htmlFor="folderName">Tên Thư Mục</label>
          <input 
            type="text" 
            id="folderName" 
            name="folderName" 
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            placeholder="Nhập tên thư mục mới"
            autoFocus
            required
            disabled={loading}
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? 'Đang cập nhật...' : 'Cập Nhật'}
          </button>
          <button type="button" className="btn-cancel" onClick={onCancel} disabled={loading}>Hủy</button>
        </div>
      </form>
    </div>
  );
}
