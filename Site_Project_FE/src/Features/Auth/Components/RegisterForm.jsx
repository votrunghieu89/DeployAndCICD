import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerAPI } from '../../../APIs/authAPI';
import './RegisterForm.scss';

export default function RegisterForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (error) setError('');
    if (success) setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError('Mật khẩu không khớp!');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const result = await registerAPI({
        userName: formData.username,
        password: formData.password,
        email: formData.email
      });

      if (result.success) {
        // Đăng ký thành công
        setSuccess('Đăng ký thành công! Đang chuyển đến trang đăng nhập...');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        // Hiển thị lỗi từ server
        setError(result.message || 'Đăng ký thất bại');
      }
    } catch (err) {
      setError('Có lỗi xảy ra. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <div className="form-header">
        <h2>Tạo Tài Khoản</h2>
        <p>Đăng ký để bắt đầu</p>
      </div>

      {error && (
        <div className="form-error">
          {error}
        </div>
      )}

      {success && (
        <div className="form-success">
          {success}
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
          placeholder="Chọn tên đăng nhập"
          required 
          disabled={loading}
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input 
          type="email" 
          id="email" 
          name="email" 
          value={formData.email}
          onChange={handleChange}
          placeholder="Nhập địa chỉ email của bạn"
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
          placeholder="Tạo mật khẩu"
          required 
          disabled={loading}
        />
      </div>

      <div className="form-group">
        <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
        <input 
          type="password" 
          id="confirmPassword" 
          name="confirmPassword" 
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Nhập lại mật khẩu"
          required 
          disabled={loading}
        />
      </div>

      <div className="form-footer">
        <button type="submit" className="btn-submit" disabled={loading}>
          {loading ? 'Đang đăng ký...' : 'Đăng ký'}
        </button>
        <div className="form-links">
          <Link to="/login" className="link">Đã có tài khoản? Đăng nhập ngay</Link>
        </div>
      </div>
    </form>
  );
}