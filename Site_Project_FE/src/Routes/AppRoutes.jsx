import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../Features/Auth/Pages/LoginPage';
import RegisterPage from '../Features/Auth/Pages/RegisterPage';
import FolderPage from '../Features/Folder/Pages/FolderPage';
import NotePage from '../Features/Note/Pages/NotePage';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/folders" element={<FolderPage />} />
        <Route path="/folders/:folderId/notes" element={<NotePage />} />
      </Routes>
    </BrowserRouter>
  );
}
