import { useState } from 'react';
import { createFolderAPI } from '../../../APIs';
import './CreateFolderForm.scss';

export default function CreateFolderForm({ onFolderCreated }) {
  const [folderName, setFolderName] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (folderName.trim()) {
      setLoading(true);
      setError('');
      
      const result = await createFolderAPI({ folderName: folderName.trim() });
      
      setLoading(false);
      
      if (result.success) {
        onFolderCreated();
        setFolderName('');
        setIsOpen(false);
      } else {
        setError(result.message || 'Tạo folder thất bại');
      }
    }
  };

  const handleCancel = () => {
    setFolderName('');
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <button className="btn-create-folder" onClick={() => setIsOpen(true)}>
        + Tạo Thư Mục Mới
      </button>
    );
  }

  return (
    <form className="create-folder-form" onSubmit={handleSubmit}>
      <h3>Tạo Thư Mục Mới</h3>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="form-group">
        <label htmlFor="folderName">Tên Thư Mục</label>
        <input 
          type="text" 
          id="folderName" 
          name="folderName" 
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          placeholder="Nhập tên thư mục"
          autoFocus
          required
          disabled={loading}
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-submit" disabled={loading}>
          {loading ? 'Đang tạo...' : 'Tạo'}
        </button>
        <button type="button" className="btn-cancel" onClick={handleCancel} disabled={loading}>Hủy</button>
      </div>
    </form>
  );
}
