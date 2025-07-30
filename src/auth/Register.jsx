// import React from 'react';
// import './Login.css';
// import { IoChevronBack } from 'react-icons/io5';
// import { useNavigate } from 'react-router-dom';

// export default function Register() {
//     const navigate = useNavigate();

//     const handleBackClick = () => {
//         navigate(-1);
//     };
//     return (
//         <>
//             <div className="login-header">
//                 <IoChevronBack className="back-icon" onClick={handleBackClick} />
//                 <h1 className="login-title">Register</h1>
//             </div>
//             <div className="login-container">
//                 <p className="subheading">Discover City Rose world.</p>

//                 <div className="form-group">
//                     <label className="input-label">Name</label>
//                     <input type="name" placeholder="Name" className="input-field" />
//                 </div>

//                 <div className="form-group">
//                     <label className="input-label">Email</label>
//                     <input type="email" placeholder="Email" className="input-field" />
//                 </div>

//                 <div className="form-group">
//                     <label className="input-label">Password</label>
//                     <input type="password" placeholder="Password" className="input-field" />
//                 </div>
//                 <button className="login-button">Register</button>
//             </div>
//         </>
//     );
// }



import React, { useState } from 'react';
import './Login.css';
import { IoChevronBack } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();

  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleRegister = async () => {
    setError('');
    setLoading(true);

    try {
      const response = await fetch('https://cityrose.musicgang.org:443/api/v1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Registration failed');
        setLoading(false);
        return;
      }

      // Save token in localStorage
      localStorage.setItem('token', data.token);

      // Redirect to home
      navigate('/near-me');
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="login-header">
        <IoChevronBack className="back-icon" onClick={handleBackClick} />
        <h1 className="login-title">Register</h1>
      </div>
      <div className="login-container">
        <p className="subheading">Discover City Rose world.</p>

        <div className="form-group">
          <label className="input-label">Name</label>
          <input
            type="text"
            placeholder="Name"
            className="input-field"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="input-label">Email</label>
          <input
            type="email"
            placeholder="Email"
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="input-label">Password</label>
          <input
            type="password"
            placeholder="Password"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <div className="error-text">{error}</div>}

        <button
          className="login-button"
          onClick={handleRegister}
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </div>
    </>
  );
}
