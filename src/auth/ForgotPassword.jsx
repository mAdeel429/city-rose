import React, { useState } from 'react';
import './Login.css';
import { IoChevronBack } from 'react-icons/io5';
import { toast, Toaster } from 'sonner';
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleBackClick = () => navigate(-1);

  const handleForgotPassword = async () => {
    setEmailError('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      setEmailError('Email is required');
      return;
    } else if (!emailRegex.test(email)) {
      setEmailError('Enter a valid email address');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`https://interstellar.cityrose.app/web/auth/forgot-password?email=${encodeURIComponent(email)}`, {
        method: 'GET',
      });
      console.log("🔍 Forgot Password Response:", response);
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to send reset email');
      }

      toast.success('Password reset link sent to your email.');
    } catch (error) {
      console.error('❌ Forgot Password Error:', error);
      toast.error(error.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster richColors position="top-center" />

      <div className="login-header">
        <IoChevronBack className="back-icon" onClick={handleBackClick} />
        <h1 className="login-title">Forgot Password</h1>
      </div>

      <div className="login-container">
        <p className="subheading">Enter your email to reset your password</p>

        <div className="form-group">
          <label className="input-label">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <p className="error-text">{emailError}</p>}
        </div>

        <button className="login-button" onClick={handleForgotPassword} disabled={loading}>
          {loading ? <span className="spinner" /> : 'Send Reset Link'}
        </button>
      </div>
    </>
  );
}
