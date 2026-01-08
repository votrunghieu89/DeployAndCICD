import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getNotesByFolderIdAPI, deleteNoteAPI } from '../../../APIs';
import CreateNoteForm from '../Components/CreateNoteForm';
import UpdateNoteForm from '../Components/UpdateNoteForm';
import NoteList from '../Components/NoteList';
import './NotePage.scss';

export default function NotePage() {
  const { folderId } = useParams();
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Load notes from API
  const loadNotes = async () => {
    if (!folderId) return;
    
    setLoading(true);
    setError('');
    
    const result = await getNotesByFolderIdAPI(folderId);
    
    setLoading(false);
    
    if (result.success) {
      setNotes(result.data || []);
    } else {
      setError(result.message || 'Không thể tải danh sách ghi chú');
    }
  };

  useEffect(() => {
    loadNotes();
  }, [folderId]);

  const handleNoteCreated = () => {
    loadNotes();
  };

  const handleNoteUpdated = () => {
    loadNotes();
    setEditingNote(null);
  };

  const handleDeleteNote = async (noteId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa ghi chú này?')) {
      const result = await deleteNoteAPI(noteId);
      
      if (result.success) {
        loadNotes();
      } else {
        alert(result.message || 'Xóa ghi chú thất bại');
      }
    }
  };

  const handleEditNote = (note) => {
    setEditingNote(note);
  };

  const handleBackToFolders = () => {
    navigate('/folders');
  };

  return (
    <div className="note-page">
      <div className="note-header">
        <div className="header-left">
          <button className="btn-back" onClick={handleBackToFolders}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
            </svg>
            Quay Lại
          </button>
          <h1>
            <svg className="folder-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/>
            </svg>
            Ghi Chú
          </h1>
        </div>
      </div>

      <div className="note-container">
        <CreateNoteForm folderId={folderId} onNoteCreated={handleNoteCreated} />
        
        {error && <div className="error-message">{error}</div>}
        {loading && <div className="loading-message">Đang tải...</div>}
        
        {!loading && <NoteList 
          notes={notes}
          onEditNote={handleEditNote}
          onDeleteNote={handleDeleteNote}
        />}

        {editingNote && (
          <UpdateNoteForm 
            note={editingNote}
            onNoteUpdated={handleNoteUpdated}
            onCancel={() => setEditingNote(null)}
          />
        )}
      </div>
    </div>
  );
}
