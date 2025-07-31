// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
// import { jwtDecode } from 'jwt-decode';
// import './AuthLanding.css';

// export default function AuthLanding() {
//   const navigate = useNavigate();

//   const handleRegister = () => {
//     navigate('/register');
//   };

//   const handleLogin = () => {
//     navigate('/login');
//   };

//   const handleGoogleLoginSuccess = (credentialResponse) => {
//     const decoded = jwtDecode(credentialResponse.credential);
//     console.log('Decoded Google User:', decoded);

//     // Store user info in localStorage
//     localStorage.setItem('user', JSON.stringify(decoded));

//     navigate('/near-me');
//   };

//   return (
//     <GoogleOAuthProvider clientId="421800149281-k4qgbhmrv1t7k799itjd2hq2rcldmls2.apps.googleusercontent.com">
//       <div className="auth-wrapper">
//         <div className="image-container">
//           <img
//             src="https://i.pinimg.com/736x/b4/60/0f/b4600f8f4107251dccb6b3e391774f0d.jpg"
//             alt="Duomo"
//             className="auth-image"
//           />
//         </div>

//         <div className="auth-content">
//           <button className="auth-button" onClick={handleRegister}>
//             Create an account
//           </button>

//           <div className="Authdivider">Or</div>

//           <div className="social-buttons">
//             <GoogleLogin
//               onSuccess={handleGoogleLoginSuccess}
//               onError={() => {
//                 console.log('Login Failed');
//               }}
//             />
//           </div>

//           <p className="login-text">
//             Already have an account?{' '}
//             <span className="login-link" onClick={handleLogin}>
//               Login
//             </span>
//           </p>
//         </div>

//         <div className="auth-footer">
//           <p>
//             By continuing you agree City Rose's <a href="#">Terms of Use</a> and confirm that you have read City Rose's{' '}
//             <a href="#">Privacy Policy</a>.
//           </p>
//         </div>
//       </div>
//     </GoogleOAuthProvider>
//   );
// }


import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import './AuthLanding.css';

export default function AuthLanding() {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate('/register');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  
  const login = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async (codeResponse) => {
      try {
        const res = await fetch('https://interstellar.cityrose.app/api/v1/auth/oauth/google', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            auth_code: codeResponse.code,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          console.error('Google OAuth failed:', data);
          alert('Login failed: ' + (data.error || 'Unknown error'));
          return;
        }

        console.log('Google user login successful:', data);

        // Store tokens
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);
        console.log("Google Auth Code: ", codeResponse.code);

        navigate('/near-me');
      } catch (err) {
        console.error('OAuth error:', err);
        alert('Login failed. Try again.');
      }
    },
    onError: (err) => {
      console.error('Login Failed:', err);
      alert('Google login failed.');
    },
  });

  return (
    <div className="auth-wrapper">
      <div className="image-container">
        <img
          src="https://i.pinimg.com/736x/b4/60/0f/b4600f8f4107251dccb6b3e391774f0d.jpg"
          alt="Duomo"
          className="auth-image"
        />
      </div>

      <div className="auth-content">
        <button className="auth-button" onClick={handleRegister}>
          Create an account
        </button>

        <div className="Authdivider">Or</div>

        <div className="social-buttons">
          <button onClick={() => login()} className="google-login-button">
            Continue with Google
          </button>
        </div>

        <p className="login-text">
          Already have an account?{' '}
          <span className="login-link" onClick={handleLogin}>
            Login
          </span>
        </p>
      </div>

      <div className="auth-footer">
        <p>
          By continuing you agree to City Rose's <a href="#">Terms of Use</a> and confirm you have read our{' '}
          <a href="#">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
}
