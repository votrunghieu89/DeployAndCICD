import { useState } from 'react';
import { createNoteAPI } from '../../../APIs';
import './CreateNoteForm.scss';

export default function CreateNoteForm({ folderId, onNoteCreated }) {
  const [noteData, setNoteData] = useState({
    title: '',
    description: ''
  });
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNoteData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (noteData.title.trim()) {
      setLoading(true);
      setError('');
      
      const result = await createNoteAPI({
        title: noteData.title.trim(),
        description: noteData.description.trim(),
        folderId: folderId
      });
      
      setLoading(false);
      
      if (result.success) {
        onNoteCreated();
        setNoteData({ title: '', description: '' });
        setIsOpen(false);
      } else {
        setError(result.message || 'Tạo ghi chú thất bại');
      }
    }
  };

  const handleCancel = () => {
    setNoteData({ title: '', description: '' });
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <button className="btn-create-note" onClick={() => setIsOpen(true)}>
        + Tạo Ghi Chú Mới
      </button>
    );
  }

  return (
    <form className="create-note-form" onSubmit={handleSubmit}>
      <h3>Tạo Ghi Chú Mới</h3>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="form-group">
        <label htmlFor="title">Tiêu Đề</label>
        <input 
          type="text" 
          id="title" 
          name="title" 
          value={noteData.title}
          onChange={handleChange}
          placeholder="Nhập tiêu đề ghi chú"
          autoFocus
          required
          disabled={loading}
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Mô Tả</label>
        <textarea 
          id="description" 
          name="description" 
          value={noteData.description}
          onChange={handleChange}
          placeholder="Nhập mô tả chi tiết..."
          rows="5"
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
