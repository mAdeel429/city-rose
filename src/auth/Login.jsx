// import React, { useState } from 'react';
// import './Login.css';
// import { IoChevronBack } from 'react-icons/io5';
// import { useNavigate } from 'react-router-dom';
// import { v4 as uuidv4 } from 'uuid';

// export default function Login() {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleBackClick = () => {
//     navigate(-1);
//   };

//   const handleLogin = async () => {
//     setLoading(true);
//     setError('');

//     try {
//       const response = await fetch('https://interstellar.cityrose.app/api/v1/auth/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'device-name': 'web',
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();
//       if (!response.ok || !data.access_token) {
//         setError(data.message || 'Login failed');
//         setLoading(false);
//         return;
//       }

//       const token = data.access_token;
//       localStorage.setItem('token', token);

//       // ✅ Register device
//       await fetch('https://interstellar.cityrose.app/api/v1/device/register', {
//         method: 'PUT',
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           uuid: uuidv4(),
//           name: 'Web browser',
//           platform: 'web',
//           os: navigator.userAgent,
//           idiom: 'web',
//           app_version: '1.0.0',
//           fcm_token: '',
//         }),
//       });

//       // ✅ Save user info
//       if (data.user && data.user.name && data.user.email) {
//         localStorage.setItem('user_info', JSON.stringify({ 
//           name: data.user.name, 
//           email: data.user.email 
//         }));
//       } else {
//         localStorage.setItem('user_info', JSON.stringify({ 
//           name: '',
//           email 
//         }));
//       }

//       localStorage.setItem('refresh_token', data.refresh_token || '');
//       localStorage.setItem('token_type', data.token_type || '');
//       localStorage.setItem('expires_in', data.expires_in?.toString() || '');

//       alert('Login successful!');
//       navigate('/home');

//     } catch (err) {
//       console.error(err);
//       setError('Something went wrong. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <div className="login-header">
//         <IoChevronBack className="back-icon" onClick={handleBackClick} />
//         <h1 className="login-title">Login</h1>
//       </div>

//       <div className="login-container">
//         <p className="subheading">Welcome back! Please enter your details.</p>

//         <div className="form-group">
//           <label className="input-label">Email</label>
//           <input
//             type="email"
//             placeholder="Email"
//             className="input-field"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </div>

//         <div className="form-group">
//           <label className="input-label">Password</label>
//           <input
//             type="password"
//             placeholder="Password"
//             className="input-field"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </div>

//         <div className="forgot-password">
//           <a href="#">Forgot password?</a>
//         </div>

//         {error && <div className="error-text">{error}</div>}

//         <button
//           className="login-button"
//           onClick={handleLogin}
//           disabled={loading}
//         >
//           {loading ? 'Logging in...' : 'Login'}
//         </button>
//       </div>
//     </>
//   );
// }

// src/pages/Login.jsx
import React, { useState } from 'react';
import './Login.css';
import { IoChevronBack } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { fetchWithAuth } from './auth';

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleBackClick = () => navigate(-1);

  const handleLogin = async () => {
    setError('');

    if (!email.trim()) return alert('Email is required');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return alert('Enter a valid email address');
    if (!password) return alert('Password is required');
    if (password.length < 6) return alert('Password must be at least 6 characters');

    setLoading(true);

    try {
      const response = await fetch('https://interstellar.cityrose.app/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'device-name': 'web',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log('🔔 Login Response:', data);

      if (!response.ok || !data.access_token) {
        setError(data.message || 'Login failed');
        return;
      }

      const token = data.access_token;
      const deviceId = uuidv4();

      localStorage.setItem('token', token);
      localStorage.setItem('refresh_token', data.refresh_token || '');
      localStorage.setItem('token_type', data.token_type || '');
      localStorage.setItem('expires_in', data.expires_in?.toString() || '');
      localStorage.setItem('device_id', deviceId);

      // Register device using fetchWithAuth
      await fetchWithAuth('https://interstellar.cityrose.app/api/v1/device/register', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uuid: deviceId,
          name: 'Web browser',
          platform: 'web',
          os: navigator.userAgent,
          idiom: 'web',
          app_version: '1.0.0',
          fcm_token: '',
        }),
      });

      localStorage.setItem('user_info', JSON.stringify({
        name: data.user?.name || '',
        email: data.user?.email || email,
      }));

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            localStorage.setItem('user_lat', latitude.toString());
            localStorage.setItem('user_lon', longitude.toString());
          },
          (error) => {
            console.warn('Location access denied or error:', error);
          }
        );
      } else {
        console.warn('Geolocation is not supported by this browser.');
      }

      alert('Login successful!');
      navigate('/home');
      window.location.reload();

    } catch (err) {
      console.error('❌ Login Error:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
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
          <input type="email" placeholder="Email" className="input-field"
            value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="form-group">
          <label className="input-label">Password</label>
          <input type="password" placeholder="Password" className="input-field"
            value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        <div className="forgot-password">
          <a href="#">Forgot password?</a>
        </div>

        {error && <div className="error-text">{error}</div>}

        <button className="login-button" onClick={handleLogin} disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </div>
    </>
  );
}


// import React, { useState } from 'react';
// import './Login.css';
// import { IoChevronBack } from 'react-icons/io5';
// import { useNavigate } from 'react-router-dom';
// import { v4 as uuidv4 } from 'uuid';

// export default function Login() {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleBackClick = () => navigate(-1);

//   const handleLogin = async () => {
//     setError('');
  
//     if (!email.trim()) return alert('Email is required');
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) return alert('Enter a valid email address');
//     if (!password) return alert('Password is required');
//     if (password.length < 6) return alert('Password must be at least 6 characters');
//     setLoading(true);
    
//     try {
//       const response = await fetch('https://interstellar.cityrose.app/api/v1/auth/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'device-name': 'web',
//         },
//         body: JSON.stringify({ email, password }),
//       });
  
//       const data = await response.json();
//       console.log('🔔 Login Response:', data);
  
//       if (!response.ok || !data.access_token) {
//         setError(data.message || 'Login failed');
//         return;
//       }
  
//       const token = data.access_token;
//       const deviceId = uuidv4();
  
//       localStorage.setItem('token', token);
//       localStorage.setItem('refresh_token', data.refresh_token || '');
//       localStorage.setItem('token_type', data.token_type || '');
//       localStorage.setItem('expires_in', data.expires_in?.toString() || '');
//       localStorage.setItem('device_id', deviceId);

  
//       await fetch('https://interstellar.cityrose.app/api/v1/device/register', {
//         method: 'PUT',
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           uuid: deviceId,
//           name: 'Web browser',
//           platform: 'web',
//           os: navigator.userAgent,
//           idiom: 'web',
//           app_version: '1.0.0',
//           fcm_token: '',
//         }),
//       });
  
//       localStorage.setItem('user_info', JSON.stringify({
//         name: data.user?.name || '',
//         email: data.user?.email || email,
//       }));

//       if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(
//           (position) => {
//             const { latitude, longitude } = position.coords;
//             localStorage.setItem('user_lat', latitude.toString());
//             localStorage.setItem('user_lon', longitude.toString());
//           },
//           (error) => {
//             console.warn('Location access denied or error:', error);
//           }
//         );
//       } else {
//         console.warn('Geolocation is not supported by this browser.');
//       }
  
//       alert('Login successful!');
//       navigate('/home');
  
//     } catch (err) {
//       console.error('❌ Login Error:', err);
//       setError('Something went wrong. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   return (
//     <>
//       <div className="login-header">
//         <IoChevronBack className="back-icon" onClick={handleBackClick} />
//         <h1 className="login-title">Login</h1>
//       </div>

//       <div className="login-container">
//         <p className="subheading">Welcome back! Please enter your details.</p>

//         <div className="form-group">
//           <label className="input-label">Email</label>
//           <input type="email" placeholder="Email" className="input-field"
//             value={email} onChange={(e) => setEmail(e.target.value)} />
//         </div>

//         <div className="form-group">
//           <label className="input-label">Password</label>
//           <input type="password" placeholder="Password" className="input-field"
//             value={password} onChange={(e) => setPassword(e.target.value)} />
//         </div>

//         <div className="forgot-password">
//           <a href="#">Forgot password?</a>
//         </div>

//         {error && <div className="error-text">{error}</div>}

//         <button className="login-button" onClick={handleLogin} disabled={loading}>
//           {loading ? 'Logging in...' : 'Login'}
//         </button>
//       </div>
//     </>
//   );
// }
