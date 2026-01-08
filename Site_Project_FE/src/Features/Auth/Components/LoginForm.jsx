import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginAPI } from '../../../APIs/authAPI';
import './LoginForm.scss';

export default function LoginForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await loginAPI({
        userName: formData.username,
        password: formData.password
      });

      if (result.success) {
        // Đăng nhập thành công, chuyển đến trang folders
        navigate('/folders');
      } else {
        // Hiển thị lỗi từ server
        setError(result.message || 'Đăng nhập thất bại');
      }
    } catch (err) {
      setError('Có lỗi xảy ra. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="form-header">
        <h2>Chào Mừng Trở Lại</h2>
        <p>Vui lòng đăng nhập vào tài khoản của bạn</p>
      </div>

      {error && (
        <div className="form-error">
          {error}
        </div>
      )}

      <div className="form-group">
        <label htmlFor="username">Tên đăng nhập</label>
        <input 
          type="text" 
          id="username" 
          name="username" 
          value={formData.username}
          onChange={handleChange}
          placeholder="Nhập tên đăng nhập của bạn"
          required 
          disabled={loading}
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Mật khẩu</label>
        <input 
          type="password" 
          id="password" 
          name="password" 
          value={formData.password}
          onChange={handleChange}
          placeholder="Nhập mật khẩu của bạn"
          required 
          disabled={loading}
        />
      </div>

      <div className="form-footer">
        <button type="submit" className="btn-submit" disabled={loading}>
          {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
        </button>
        <div className="form-links">
          <Link to="/register" className="link">Chưa có tài khoản? Đăng ký ngay</Link>
        </div>
      </div>
    </form>
  );
}