import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthLanding.css';

export default function AuthLanding() {
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    localStorage.setItem('token', 'dummy_token');
    navigate('/near-me');
  };

  
  const handleRegister = () => {
    navigate('/register');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className="auth-wrapper">
      <div className="image-container">
        <img src='https://i.pinimg.com/736x/b4/60/0f/b4600f8f4107251dccb6b3e391774f0d.jpg' alt="Duomo" className="auth-image" />
      </div>

      <div className="auth-content">
        <button className="auth-button" onClick={handleRegister}>
          Create an account
        </button>

        <div className="Authdivider">Or</div>

        <div className="social-buttons">
          <button className="google-btn">
            <img
              src="https://www.gstatic.com/marketing-cms/assets/images/d5/dc/cfe9ce8b4425b410b49b7f2dd3f3/g.webp=s48-fcrop64=1,00000000ffffffff-rw"
              alt="Google"
            />
          </button>
        </div>

        <p className="login-text">
          Already have an account? <span className="login-link" onClick={handleLogin}>Login</span>
        </p>
      </div>

      <div className="auth-footer">
        <p>
          By continuing you agree City Rose's <a href="#">Terms of Use</a> and confirm that you have read City Rose's <a href="#">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
}
