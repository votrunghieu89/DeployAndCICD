import { useState, useEffect } from 'react';
import { updateNoteAPI } from '../../../APIs';
import './UpdateNoteForm.scss';

export default function UpdateNoteForm({ note, onNoteUpdated, onCancel }) {
  const [noteData, setNoteData] = useState({
    title: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (note) {
      setNoteData({
        title: note.title,
        description: note.description || ''
      });
    }
  }, [note]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNoteData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (noteData.title.trim() && note) {
      setLoading(true);
      setError('');
      
      const result = await updateNoteAPI({
        noteId: note.noteId,
        title: noteData.title.trim(),
        description: noteData.description.trim()
      });
      
      setLoading(false);
      
      if (result.success) {
        onNoteUpdated();
      } else {
        setError(result.message || 'Cập nhật ghi chú thất bại');
      }
    }
  };

  if (!note) return null;

  return (
    <div className="update-note-overlay" onClick={onCancel}>
      <form className="update-note-form" onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
        <h3>Cập Nhật Ghi Chú</h3>
        
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
            {loading ? 'Đang cập nhật...' : 'Cập Nhật'}
          </button>
          <button type="button" className="btn-cancel" onClick={onCancel} disabled={loading}>Hủy</button>
        </div>
      </form>
    </div>
  );
}
