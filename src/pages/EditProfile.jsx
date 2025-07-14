import React, { useState } from 'react';
import './HomePage.css';
import { FiArrowLeft } from 'react-icons/fi';
import BottomSheet from '../components/BottomSheet';
import {Link} from 'react-router-dom'

export default function EditProfile() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [name, setName] = useState('Paolo');
  const [email, setEmail] = useState('paololucabarberini@gmail.com');

  const handleSave = () => {
    console.log('Saved:', { name, email });
  };

  return (
    <>
      <div className="edit-profile-container">
        <div className="header">
          <Link to='/'>
          <FiArrowLeft className="back-icon" />
          </Link>
          <h2>Edit profile</h2>
        </div>

        <div className="profile-edit">
          <div className="profile-pic">P</div>

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
