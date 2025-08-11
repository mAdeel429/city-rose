// import React, { useState, useEffect } from 'react';
// import './Login.css';
// import { IoChevronBack } from 'react-icons/io5';
// import { useNavigate } from 'react-router-dom';
// import { v4 as uuidv4 } from 'uuid';
// import { toast, Toaster } from 'sonner';

// export default function Register() {
//   const navigate = useNavigate();

//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const [nameError, setNameError] = useState('');
//   const [emailError, setEmailError] = useState('');
//   const [passwordError, setPasswordError] = useState('');

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
//           console.warn('❌ Location permission denied or error:', error);
//         }
//       );
//     } else {
//       console.warn('❌ Geolocation is not supported by this browser.');
//     }
//   }, []);

//   const handleBackClick = () => navigate(-1);

//   const handleRegister = async () => {
//     setError('');
//     setNameError('');
//     setEmailError('');
//     setPasswordError('');


//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

//     let hasError = false;

//     if (!name.trim()) {
//       setNameError('Name is required');
//       hasError = true;
//     } else if (name.trim().length < 3) {
//       setNameError('Name must be at least 3 characters');
//       hasError = true;
//     }

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
//     } else if (password.length < 8) {
//       setPasswordError('Password must be at least 8 characters');
//       hasError = true;
//     } else if (!passwordRegex.test(password)) {
//       setPasswordError('Password must include uppercase, lowercase, number & special character');
//       hasError = true;
//     }

//     if (hasError) return;

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
//         toast.error(data.message || data.error || 'Registration failed');
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

//       toast.success('Registration successful!');
//       navigate('/home', { state: { showBottomSheet: true } });

//     } catch (err) {
//       console.error('❌ Registration Error:', err);
//       setError('Something went wrong. Please try again.');
//       toast.error('Something went wrong. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <Toaster richColors position="top-center" />

//       <div className="login-header">
//         <IoChevronBack className="back-icon" onClick={handleBackClick} />
//         <h1 className="login-title">Register</h1>
//       </div>

//       <div className="login-container">
//         <p className="subheading">Discover City Rose world.</p>

//         <div className="form-group">
//           <label className="input-label">Name</label>
//           <input
//             type="text"
//             placeholder="Name"
//             className="input-field"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//           {nameError && <p className="error-text">{nameError}</p>}
//         </div>

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

//         <button className="login-button" onClick={handleRegister} disabled={loading}>
//           {loading ? <span className="spinner" /> : 'Register'}
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
import { toast, Toaster } from 'sonner';

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

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
          toast.error('Please enable location access to continue.');
        }
      );
    } else {
      console.warn('❌ Geolocation is not supported by this browser.');
      toast.error('Geolocation is not supported by your browser.');
    }
  }, []);

  const handleBackClick = () => navigate(-1);

  const handleRegister = async () => {
    setError('');
    setNameError('');
    setEmailError('');
    setPasswordError('');

    // 🚫 Location Check Before Register
    const lat = localStorage.getItem('user_lat');
    const lon = localStorage.getItem('user_lon');

    // if (!lat || !lon) {
    //   toast.error('Please enable location access first.');
    //   return;
    // }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    let hasError = false;

    if (!name.trim()) {
      setNameError('Name is required');
      hasError = true;
    } else if (name.trim().length < 3) {
      setNameError('Name must be at least 3 characters');
      hasError = true;
    }

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
    } else if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      hasError = true;
    } else if (!passwordRegex.test(password)) {
      setPasswordError('Password must include uppercase, lowercase, number & special character');
      hasError = true;
    }

    if (hasError) return;

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
        toast.error(data.message || data.error || 'Registration failed');
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

      toast.success('Registration successful!');

      if (!localStorage.getItem('selected_city')) {
        localStorage.setItem(
          'selected_city',
          JSON.stringify({ id: 'default', name: 'Default City' })
        );
      }

      navigate('/home');
      window.location.reload();


    } catch (err) {
      console.error('❌ Registration Error:', err);
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
        <h1 className="login-title">Register</h1>
      </div>

      <div className="login-container">
        <p className="subheading">Discover cityRose world.</p>

        <div className="form-group">
          <label className="input-label">Name</label>
          <input
            type="text"
            placeholder="Name"
            className="input-field"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {nameError && <p className="error-text">{nameError}</p>}
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

        <button className="login-button" onClick={handleRegister} disabled={loading}>
          {loading ? <span className="spinner" /> : 'Register'}
        </button>
      </div>
    </>
  );
}
