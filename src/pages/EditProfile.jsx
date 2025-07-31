// import React, { useState } from 'react';
// import './HomePage.css';
// import { FiArrowLeft } from 'react-icons/fi';
// import BottomSheet from '../components/BottomSheet';
// import {Link} from 'react-router-dom'

// export default function EditProfile() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [name, setName] = useState('Paolo');
//   const [email, setEmail] = useState('paololucabarberini@gmail.com');

//   const handleSave = () => {
//     console.log('Saved:', { name, email });
//   };

//   return (
//     <>
//       <div className="edit-profile-container">
//         <div className="Edit-Profile-header">
//           <Link to='/'>
//           <FiArrowLeft className="back-icon"/>
//           </Link>
//           <h2>Edit profile</h2>
//           <div></div>
//         </div>

//         <div className="profile-edit">
//           <div className="profile-pic">P</div>

//           <div className="form-group">
//             <label>Name</label>
//             <input
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//             />
//           </div>

//           <div className="form-group">
//             <label>Email</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>

//           <button className="save-button" onClick={handleSave}>
//             Save
//           </button>
//         </div>
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
      }
    };

    fetchUserData();
  }, []);

  const handleSave = () => {
    console.log('💾 Saved Locally:', { name, email });
    localStorage.setItem('user_info', JSON.stringify({ name, email }));
    
    // 🔄 Optional: API call to update profile
  };

  // 🧠 Get first letter of first word of name (fallback = 'U')
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
      </div>

      <BottomSheet show={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
