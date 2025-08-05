// import React, { useState, useEffect } from 'react';
// import './Login.css';
// import { IoChevronBack } from 'react-icons/io5';
// import { useNavigate } from 'react-router-dom';
// import { v4 as uuidv4 } from 'uuid';
// import { fetchWithAuth } from './auth';

// export default function Login() {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   // 📍 Request location on component mount
//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           localStorage.setItem('user_lat', latitude.toString());
//           localStorage.setItem('user_lon', longitude.toString());
//           console.log('📍 Location stored:', latitude, longitude);
//         },
//         (error) => {
//           console.warn('❌ Location access denied or error:', error);
//         }
//       );
//     } else {
//       console.warn('❌ Geolocation is not supported by this browser.');
//     }
//   }, []);

//   const handleBackClick = () => navigate(-1);

//   const handleLogin = async () => {
//     setError('');

//     // 🔐 Validation
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

//       // Register device
//       await fetchWithAuth('https://interstellar.cityrose.app/api/v1/device/register', {
//         method: 'PUT',
//         headers: {
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
//       const city = localStorage.getItem('selected_city');
//       if (city) {
//         navigate('/home');
//       } else {
//         navigate('/home');
//       }

//     } catch (err) {
//       console.error('❌ Login Error:', err);
//       setError('Something went wrong. Please try again.');
//     } finally {
//       setLoading(false);
//       window.location.reload();
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

//         <button className="login-button" onClick={handleLogin} disabled={loading}>
//           {loading ? 'Logging in...' : 'Login'}
//         </button>
//       </div>
//     </>
//   );
// }



// import React, { useState, useEffect } from 'react';
// import './Login.css';
// import { IoChevronBack } from 'react-icons/io5';
// import { useNavigate, Link } from 'react-router-dom';
// import { v4 as uuidv4 } from 'uuid';
// import { fetchWithAuth } from './auth';
// import { toast, Toaster } from 'sonner';

// export default function Login() {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const [emailError, setEmailError] = useState('');
//   const [passwordError, setPasswordError] = useState('');

//   const handleForgotPassword = () => {
//     setEmailError('');

//     if (!email.trim()) {
//       setEmailError('Email is required');
//       return;
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       setEmailError('Enter a valid email address');
//       return;
//     }

//     window.location.href = `https://interstellar.cityrose.app/web/auth/forgot-password?email=${encodeURIComponent(email)}`;
//   };


//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           localStorage.setItem('user_lat', latitude.toString());
//           localStorage.setItem('user_lon', longitude.toString());
//           console.log('📍 Location stored:', latitude, longitude);
//         },
//         (error) => {
//           console.warn('❌ Location access denied or error:', error);
//         }
//       );
//     } else {
//       console.warn('❌ Geolocation is not supported by this browser.');
//     }
//   }, []);

//   const handleBackClick = () => navigate(-1);

//   const handleLogin = async () => {
//     setError('');
//     setEmailError('');
//     setPasswordError('');

//     // 🔐 Validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//     let hasError = false;

//     if (!email.trim()) {
//       setEmailError('Email is required');
//       hasError = true;
//     } else if (!emailRegex.test(email)) {
//       setEmailError('Enter a valid email address');
//       hasError = true;
//     }

//     if (!password) {
//       setPasswordError('Password is required');
//       hasError = true;
//     } else if (password.length < 6) {
//       setPasswordError('Password must be at least 6 characters');
//       hasError = true;
//     }

//     if (hasError) return;

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
//         toast.error(data.message || 'Login failed');
//         return;
//       }

//       const token = data.access_token;
//       const deviceId = uuidv4();

//       localStorage.setItem('token', token);
//       localStorage.setItem('refresh_token', data.refresh_token || '');
//       localStorage.setItem('token_type', data.token_type || '');
//       localStorage.setItem('expires_in', data.expires_in?.toString() || '');
//       localStorage.setItem('device_id', deviceId);

//       // Register device
//       await fetchWithAuth('https://interstellar.cityrose.app/api/v1/device/register', {
//         method: 'PUT',
//         headers: {
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

//       toast.success('Login successful');
//       navigate('/home');

//     } catch (err) {
//       console.error('❌ Login Error:', err);
//       setError('Something went wrong. Please try again.');
//       toast.error('Something went wrong. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       {/* ✅ Sonner Toaster for beautiful toasts */}
//       <Toaster richColors position="top-center" />

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
//           {emailError && <p className="error-text">{emailError}</p>}
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
//           {passwordError && <p className="error-text">{passwordError}</p>}
//         </div>

//         {/* <div className="forgot-password">
//           <Link to='/forgot-password'>Forgot password?</Link>
//         </div> */}
//         <div className="forgot-password">
//           <button type="button" className="link-button" onClick={handleForgotPassword}>
//             Forgot password?
//           </button>
//         </div>

//         <button className="login-button" onClick={handleLogin} disabled={loading}>
//           {loading ? <span className="spinner" /> : 'Login'}
//         </button>
//       </div>
//     </>
//   );
// }

import React, { useState, useEffect } from 'react';
import './Login.css';
import { IoChevronBack } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { fetchWithAuth } from './auth';
import { toast, Toaster } from 'sonner';

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // 📍 Request location on mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          localStorage.setItem('user_lat', latitude.toString());
          localStorage.setItem('user_lon', longitude.toString());
          console.log('📍 Location stored:', latitude, longitude);
        },
        (error) => {
          console.warn('❌ Location access denied or error:', error);
        }
      );
    } else {
      console.warn('❌ Geolocation is not supported by this browser.');
    }
  }, []);

  const handleBackClick = () => navigate(-1);

  const handleLogin = async () => {
    setError('');
    setEmailError('');
    setPasswordError('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let hasError = false;

    if (!email.trim()) {
      setEmailError('Email is required');
      hasError = true;
    } else if (!emailRegex.test(email)) {
      setEmailError('Enter a valid email address');
      hasError = true;
    }

    if (!password) {
      setPasswordError('Password is required');
      hasError = true;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      hasError = true;
    }

    if (hasError) return;

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
        toast.error(data.message || 'Login failed');
        return;
      }

      const token = data.access_token;
      const deviceId = uuidv4();

      localStorage.setItem('token', token);
      localStorage.setItem('refresh_token', data.refresh_token || '');
      localStorage.setItem('token_type', data.token_type || '');
      localStorage.setItem('expires_in', data.expires_in?.toString() || '');
      localStorage.setItem('device_id', deviceId);

      // Register device
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

      toast.success('Login successful');
      navigate('/home');
      window.location.reload();

    } catch (err) {
      console.error('❌ Login Error:', err);
      setError('Something went wrong. Please try again.');
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster richColors position="top-center" />

      <div className="login-header">
        <IoChevronBack className="back-icon" onClick={handleBackClick} />
        <h1 className="login-title">Login</h1>
      </div>

      <div className="login-container">
        <p className="subheading">Welcome back! Please enter your details.</p>

        <div className="form-group">
          <label className="input-label">Email</label>
          <input
            type="email"
            placeholder="Email"
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <p className="error-text">{emailError}</p>}
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
          {passwordError && <p className="error-text">{passwordError}</p>}
        </div>

        <div className="forgot-password">
          <a
            href="https://interstellar.cityrose.app/web/auth/forgot-password"
            className="link-button"
            target="_blank"
            rel="noopener noreferrer"
          >
            Forgot password?
          </a>
        </div>


        <button className="login-button" onClick={handleLogin} disabled={loading}>
          {loading ? <span className="spinner" /> : 'Login'}
        </button>
      </div>
    </>
  );
}
