import React from 'react';
import './Login.css';
import { IoChevronBack } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(-1);
    };
    return (
        <>
            <div className="login-header">
                <IoChevronBack className="back-icon" onClick={handleBackClick} />
                <h1 className="login-title">Login</h1>
            </div>
            <div className="login-container">
                <p className="subheading">Welcome back! Please enter your details.</p>

                <div className="form-group">
                    <label className="input-label">Email</label>
                    <input type="email" placeholder="Email" className="input-field" />
                </div>

                <div className="form-group">
                    <label className="input-label">Password</label>
                    <input type="password" placeholder="Password" className="input-field" />
                </div>

                <div className="forgot-password">
                    <a href="#">Forgot password?</a>
                </div>

                <button className="login-button">Login</button>
            </div>
        </>
    );
}
