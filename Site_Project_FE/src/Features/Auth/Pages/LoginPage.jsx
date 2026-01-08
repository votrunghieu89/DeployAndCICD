import LoginForm from '../Components/LoginForm';
import './LoginPage.scss';

export default function LoginPage() {
  return (
    <div className="login-page">
      <div className="login-container">
        <LoginForm />
      </div>
    </div>
  );
}
