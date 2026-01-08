import './NoteList.scss';

export default function NoteList({ notes, onEditNote, onDeleteNote }) {
  if (notes.length === 0) {
    return (
      <div className="note-list-empty">
        <p>Chưa có ghi chú nào. Hãy tạo ghi chú đầu tiên của bạn!</p>
      </div>
    );
  }

  return (
    <div className="note-list">
      <h2>Danh Sách Ghi Chú</h2>
      <div className="note-grid">
        {notes.map((note) => (
          <div key={note.noteId} className="note-item">
            <div className="note-content">
              <h3>{note.title}</h3>
              {note.description && (
                <p className="note-description">{note.description}</p>
              )}
              <p className="note-date">
                {note.createAt ? new Date(note.createAt).toLocaleDateString('vi-VN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                }) : ''}
              </p>
            </div>
            <div className="note-actions">
              <button 
                className="btn-edit" 
                onClick={() => onEditNote(note)}
                title="Chỉnh sửa"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                </svg>
              </button>
              <button 
                className="btn-delete" 
                onClick={() => onDeleteNote(note.noteId)}
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
