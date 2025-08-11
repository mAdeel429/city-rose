import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Offers.css';
import { FaHeart } from 'react-icons/fa';
import { useFavorites } from '../data/FavoritesContext';
import { fetchOffers } from '../data/fetchOffers';
import { useNavigate } from 'react-router-dom';

export default function Offers() {
  const [offers, setOffers] = useState([]);
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [selectedType, setSelectedType] = useState('Offers');
  const [showBubbles, setShowBubbles] = useState(false);
  const [animateHeart, setAnimateHeart] = useState(null);
  const [deviceId, setDeviceId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const storedDeviceId = localStorage.getItem('device_id');
    setDeviceId(storedDeviceId);
  }, []);

  useEffect(() => {
    const getOffers = async () => {
      if (selectedType === 'Offers' && deviceId) {
        setIsLoading(true);
        const offersData = await fetchOffers();
        setOffers(offersData || []);
        setIsLoading(false);
      }
    };
    getOffers();
  }, [selectedType, deviceId]);

  // Prevent body scroll when bottom sheet is open
  useEffect(() => {
    if (showBottomSheet) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [showBottomSheet]);

  const getImageUrlWithToken = (url) => {
    if (!url) return 'https://via.placeholder.com/300x200';
    try {
      const baseUrl = window.location.origin;
      const fullUrl = new URL(url, baseUrl);
      if (token) fullUrl.searchParams.set('token', token);
      return fullUrl.toString();
    } catch (err) {
      console.error('Invalid image URL:', err);
      return 'https://via.placeholder.com/300x200';
    }
  };

  const handleHeartClick = (e, item) => {
    e.stopPropagation();
    const isFavorite = favorites.some(fav => fav.id === item.id);
    if (isFavorite) {
      removeFromFavorites(item.id);
    } else {
      addToFavorites({ ...item, category: 'Offers' });
      setShowBubbles(true);
      setAnimateHeart(item.id);
      setTimeout(() => {
        setShowBubbles(false);
        setAnimateHeart(null);
      }, 1000);
    }
  };

  const handleClose = () => setShowBottomSheet(false);
  const handleDragEnd = (event, info) => { if (info.offset.y > 100) handleClose(); };

  const renderOffers = () => {
    if (isLoading || !deviceId) {
      return (
        <div className="offers-empty">
          <div className="loader"/>
          <p style={{textAlign: 'center'}}>Loading offers...</p>
        </div>
      );
    }

    if (offers.length === 0) {
      return <div className="offers-empty"><p>No offers available.</p></div>;
    }

    return offers.map((item) => {
      const isFavorite = favorites.some(fav => fav.id === item.id);
      const imageUrl = getImageUrlWithToken(item.photo?.url);
      return (
        <motion.div
          key={item.id}
          className="offers-card"
          whileTap={{ scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          onClick={() => {
            const fullItem = {
              ...item.point,
              id: item.point?.id || item.id,
              lat: item.point?.lat,
              lng: item.point?.lng,
              macros: [{ name: 'Offers' }],
              buttons: item.point?.buttons || {},
              photo: item.photo,
            };
            navigate('/details', {
              state: {
                id: item.id,
                title: item.point?.name || item.title,
                image: item.photo?.url,
                category: 'Offers',
                distance: item.distance || 'Unknown',
                fullItem,
                offerId: item.id
              }
            });
          }}
        >
          <div className="offers-image-container">
            <img
              src={imageUrl}
              alt={item.title || 'Offer'}
              className="offers-image"
              onError={(e) => { e.target.src = 'https://via.placeholder.com/300x200'; }}
            />

            {showBubbles && animateHeart === item.id && (
              <div className="offers-bubbles-container">
                {Array.from({ length: 5 }).map((_, i) => (
                  <motion.span
                    key={i}
                    className="offers-bubble"
                    initial={{ opacity: 1, y: 0, scale: 1 }}
                    animate={{ opacity: 0, y: -40, scale: 0.5 }}
                    transition={{ duration: 1, delay: Math.random() * 0.3, ease: 'easeOut' }}
                    style={{ left: `${Math.random() * 20 - 10}px` }}
                  >
                    ❤️
                  </motion.span>
                ))}
              </div>
            )}

            <motion.div
              className="offers-heart-icon"
              onClick={(e) => handleHeartClick(e, item)}
              animate={animateHeart === item.id ? { scale: [1, 1.4, 1] } : {}}
              transition={{ duration: 0.4 }}
              style={{ color: isFavorite ? 'red' : 'white' }}
            >
              <FaHeart />
            </motion.div>
          </div>

          <div className="offers-details">
            <h3 className="title">{item.title}</h3>
            <p className="description">{item.description}</p>
          </div>
        </motion.div>
      );
    });
  };

  return (
    <div className="offers-wrapper">
      <div className="offers-tab-bar">
        {['Offers', 'Events', 'Article'].map((type) => (
          <div
            key={type}
            className={`offers-tab ${selectedType === type ? 'active' : ''}`}
            onClick={() => setSelectedType(type)}
          >
            {type}
          </div>
        ))}
      </div>

      <div className="offers-list">
        {selectedType === 'Offers' ? renderOffers() : (
          <div className="offers-empty">
            {selectedType === 'Events' && (
              <>
                <h3 style={{ textAlign: 'center' }}>No Events</h3>
                <p style={{ textAlign: 'center' }}>No events available right now.</p>
              </>
            )}
            {selectedType === 'Article' && (
              <>
                <h3 style={{ textAlign: 'center' }}>No Article</h3>
                <p style={{ textAlign: 'center' }}>No article available in this city.</p>
              </>
            )}
          </div>
        )}
      </div>



      <AnimatePresence>
        {showBottomSheet && (
          <motion.div
            className="offers-bottom-sheet-backdrop"
            onClick={handleClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="offers-bottom-sheet"
              onClick={(e) => e.stopPropagation()}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              onDragEnd={handleDragEnd}
              dragElastic={0.2}
            >
              <div className="offers-handle-bar" />
              {/* sheet content */}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
