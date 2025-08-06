// import React, { useState, useEffect } from 'react';
// import './HomePage.css';
// import { FiArrowLeft } from 'react-icons/fi';
// import BottomSheet from '../components/BottomSheet';
// import { Link } from 'react-router-dom';
// import { toast, Toaster } from 'sonner'; // ✅ toast library added

// export default function EditProfile() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       const token = localStorage.getItem('token');
//       const deviceId = localStorage.getItem('device_id');

//       if (!token || !deviceId) {
//         console.error('🔴 Missing token or device ID');
//         toast.error('Authentication failed. Please login again.');
//         return;
//       }

//       try {
//         const response = await fetch(
//           'https://interstellar.cityrose.app/api/v1/auth/user',
//           {
//             method: 'GET',
//             headers: {
//               Authorization: `Bearer ${token}`,
//               'cityrose-device-uuid': deviceId,
//               Accept: 'application/json',
//               'Content-Type': 'application/json',
//             },
//           }
//         );

//         const text = await response.text();
//         console.log('📩 User Profile Response Text:', text);

//         if (!response.ok) {
//           throw new Error(`Fetch failed: ${response.status}`);
//         }

//         const data = JSON.parse(text);
//         console.log('✅ User Data:', data);

//         const user = data.user;
//         if (user) {
//           setName(user.name || '');
//           setEmail(user.email || '');
//           localStorage.setItem('user_info', JSON.stringify(user));
//         } else {
//           console.warn('⚠️ No user object in response');
//           toast.warning('No user data found.');
//         }

//       } catch (err) {
//         console.error('❌ Error fetching user data:', err.message);
//         toast.error('Error fetching profile. Please try again.');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchUserData();
//   }, []);

//   const handleSave = async () => {
//     const token = localStorage.getItem('token');
//     const deviceId = localStorage.getItem('device_id');

//     if (!token || !deviceId) {
//       console.error('🔴 Missing token or device ID');
//       toast.error('Authentication failed. Please login again.');
//       return;
//     }

//     try {
//       const response = await fetch('https://interstellar.cityrose.app/api/v1/user', {
//         method: 'PATCH',
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//           Accept: 'application/json',
//           'cityrose-device-uuid': deviceId,
//         },
//         body: JSON.stringify({ name, email }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data?.message || `Update failed with status ${response.status}`);
//       }

//       console.log('✅ Profile updated successfully:', data);
//       toast.success('Profile updated successfully!');
//       localStorage.setItem('user_info', JSON.stringify(data.user || { name, email }));
//     } catch (error) {
//       console.error('❌ Error updating profile:', error.message);
//       toast.error('Failed to update profile: ' + error.message);
//     }
//   };

//   const profileInitial = name?.trim()?.split(' ')[0]?.charAt(0)?.toUpperCase() || 'U';

//   return (
//     <>
//       <Toaster richColors position="top-center" /> {/* ✅ Added Toaster for toast notifications */}

//       <div className="edit-profile-container">
//         <div className="Edit-Profile-header">
//           <Link to="/">
//             <FiArrowLeft className="back-icon" />
//           </Link>
//           <h2>Edit profile</h2>
//           <div></div>
//         </div>

//         {isLoading ? (
//           <div style={{ textAlign: 'center', padding: '20px' }}>
//             <div className="loader"></div>
//             <p style={{ color: 'white' }}>Loading profile...</p>
//           </div>
//         ) : (
//           <div className="profile-edit">
//             <div className="profile-pic">{profileInitial}</div>

//             <div className="form-group">
//               <label>Name</label>
//               <input
//                 type="text"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//               />
//             </div>

//             <div className="form-group">
//               <label>Email</label>
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>

//             <button className="save-button" onClick={handleSave}>
//               Save
//             </button>
//           </div>
//         )}
//       </div>

//       <BottomSheet show={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
//     </>
//   );
// }




import React, { useState, useEffect } from 'react';
import './HomePage.css';
import { FiArrowLeft } from 'react-icons/fi';
import BottomSheet from '../components/BottomSheet';
import { Link } from 'react-router-dom';

export default function EditProfile() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      const deviceId = localStorage.getItem('device_id');

      if (!token || !deviceId) {
        console.error('🔴 Missing token or device ID');
        return;
      }

      try {
        const response = await fetch(
          'https://interstellar.cityrose.app/api/v1/auth/user',
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
              'cityrose-device-uuid': deviceId,
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          }
        );

        const text = await response.text();
        console.log('📩 User Profile Response Text:', text);

        if (!response.ok) {
          throw new Error(`Fetch failed: ${response.status}`);
        }

        const data = JSON.parse(text);
        console.log('✅ User Data:', data);

        const user = data.user;
        if (user) {
          setName(user.name || '');
          setEmail(user.email || '');
          localStorage.setItem('user_info', JSON.stringify(user));
        } else {
          console.warn('⚠️ No user object in response');
        }

      } catch (err) {
        console.error('❌ Error fetching user data:', err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    const deviceId = localStorage.getItem('device_id');

    if (!token || !deviceId) {
      console.error('🔴 Missing token or device ID');
      alert('Authentication failed. Please login again.');
      return;
    }

    try {
      const response = await fetch('https://interstellar.cityrose.app/api/v1/user', {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'cityrose-device-uuid': deviceId,
        },
        body: JSON.stringify({ name, email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || `Update failed with status ${response.status}`);
      }

      console.log('✅ Profile updated successfully:', data);
      alert('✅ Profile updated successfully!');
      localStorage.setItem('user_info', JSON.stringify(data.user || { name, email }));
    } catch (error) {
      console.error('❌ Error updating profile:', error.message);
      alert('❌ Failed to update profile: ' + error.message);
    }
  };

  const profileInitial = name?.trim()?.split(' ')[0]?.charAt(0)?.toUpperCase() || 'U';

  return (
    <>
      <div className="edit-profile-container">
        <div className="Edit-Profile-header">
          <Link to="/">
            <FiArrowLeft className="back-icon" />
          </Link>
          <h2>Edit profile</h2>
          <div></div>
        </div>

        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <div className="loader"></div>
            <p style={{ color: 'white' }}>Loading profile...</p>
          </div>
        ) : (
          <div className="profile-edit">
            <div className="profile-pic">{profileInitial}</div>

            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button className="save-button" onClick={handleSave}>
              Save
            </button>
          </div>
        )}
      </div>

      <BottomSheet show={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}

