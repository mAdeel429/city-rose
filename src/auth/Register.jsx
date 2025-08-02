// import React, { useState } from 'react';
// import './Login.css';
// import { IoChevronBack } from 'react-icons/io5';
// import { useNavigate } from 'react-router-dom';
// import { v4 as uuidv4 } from 'uuid';

// export default function Register() {
//   const navigate = useNavigate();

//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleBackClick = () => navigate(-1);

//   const handleRegister = async () => {
//     setError('');

//     // Validation checks
//     if (!name.trim()) return alert('Name is required');
//     if (name.trim().length < 3) return alert('Name must be at least 3 characters');
//     if (!email.trim()) return alert('Email is required');
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) return alert('Enter a valid email address');
//     if (!password) return alert('Password is required');
//     if (password.length < 8) return alert('Password must be at least 8 characters');

//     setLoading(true);

//     try {
//       const response = await fetch('https://interstellar.cityrose.app/api/v1/auth/register', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ name, email, password }),
//       });

//       const data = await response.json();
//       console.log('🔔 User Registration Response:', data);

//       if (!response.ok || !data.access_token) {
//         setError(data.message || data.error || 'Registration failed');
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
//         name: data.user?.name || name,
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

//       alert('Registration successful!');
//       window.location.reload();
//       navigate('/home');

//     } catch (err) {
//       console.error('❌ Registration Error:', err);
//       setError('Something went wrong. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <div className="login-header">
//         <IoChevronBack className="back-icon" onClick={handleBackClick} />
//         <h1 className="login-title">Register</h1>
//       </div>
//       <div className="login-container">
//         <p className="subheading">Discover City Rose world.</p>

//         <div className="form-group">
//           <label className="input-label">Name</label>
//           <input type="text" placeholder="Name" className="input-field"
//             value={name} onChange={(e) => setName(e.target.value)} />
//         </div>

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

//         {error && <div className="error-text">{error}</div>}

//         <button className="login-button" onClick={handleRegister} disabled={loading}>
//           {loading ? 'Registering...' : 'Register'}
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

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // ✅ Ask for location permission on component mount
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
          console.warn('❌ Location permission denied or error:', error);
        }
      );
    } else {
      console.warn('❌ Geolocation is not supported by this browser.');
    }
  }, []);

  const handleBackClick = () => navigate(-1);

  const handleRegister = async () => {
    setError('');
    if (!name.trim()) return alert('Name is required');
    if (name.trim().length < 3) return alert('Name must be at least 3 characters');
    if (!email.trim()) return alert('Email is required');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return alert('Enter a valid email address');
    if (!password) return alert('Password is required');
    if (password.length < 8) return alert('Password must be at least 8 characters');
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return alert('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character');
    }


    setLoading(true);

    try {
      const response = await fetch('https://interstellar.cityrose.app/api/v1/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      console.log('🔔 User Registration Response:', data);

      if (!response.ok || !data.access_token) {
        setError(data.message || data.error || 'Registration failed');
        return;
      }

      const token = data.access_token;
      const deviceId = uuidv4();

      localStorage.setItem('token', token);
      localStorage.setItem('refresh_token', data.refresh_token || '');
      localStorage.setItem('token_type', data.token_type || '');
      localStorage.setItem('expires_in', data.expires_in?.toString() || '');
      localStorage.setItem('device_id', deviceId);

      await fetch('https://interstellar.cityrose.app/api/v1/device/register', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
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
        name: data.user?.name || name,
        email: data.user?.email || email,
      }));

      alert('Registration successful!');
      navigate('/home', { state: { showBottomSheet: true } });

    } catch (err) {
      console.error('❌ Registration Error:', err);
      setError('Something went wrong. Please try again.');
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

        <button className="login-button" onClick={handleRegister} disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </div>
    </>
  );
}
