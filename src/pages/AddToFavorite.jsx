import React, { useState, useEffect } from 'react';
import './AddToFavorite.css';
import { AiFillHeart } from 'react-icons/ai';
import { useFavorites } from '../data/FavoritesContext';

const getImageUrlWithToken = (url, token) => {
  if (!url) return 'https://via.placeholder.com/300x200';

  try {
    const baseUrl = window.location.origin;
    const fullUrl = new URL(url, baseUrl);
    if (token) {
      fullUrl.searchParams.set('token', token);
    }
    return fullUrl.toString();
  } catch (err) {
    console.error('Invalid image URL:', err);
    return 'https://via.placeholder.com/300x200';
  }
};

export default function AddToFavorite() {
  const [selectedFilter, setSelectedFilter] = useState('Offers');
  const [isLoading, setIsLoading] = useState(true);
  const { favorites, removeFromFavorites, addToFavorites } = useFavorites();
  const token = localStorage.getItem('token');

  const categoryMappedToPoints = [
    'Food & Drink',
    'Culture',
    'Culture & Sights',
    'Vegan Friendly',
    'Vegan & Vegetarian',
    'Activity & Wellness',
    'Nature',
    'Culture & Landmarks',
    'Nightlife',
  ];

  const filters = ['Offers', 'Points', 'Events'];

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timeout);
  }, [favorites]);

  const filteredItems =
    selectedFilter === 'Offers'
      ? favorites.filter(item => item.category === 'Offers')
      : selectedFilter === 'Events'
        ? favorites.filter(item => item.category === 'Events')
        : favorites.filter(item => categoryMappedToPoints.includes(item.category));

  const handleHeartClick = (e, item) => {
    e.stopPropagation();
    if (favorites.some(fav => fav.id === item.id)) {
      removeFromFavorites(item.id);
    } else {
      addToFavorites(item);
    }
  };

  return (
    <div
      style={{
        paddingBottom: '100px',
        height: 'calc(100vh - 70px)',
        overflowY: 'auto',
        fontFamily: 'sans-serif',
      }}
    >
      {/* Filter Tabs */}
      <div className="offers-tab-bar">
        {filters.map((filter) => (
          <div
            key={filter}
            className={`offers-tab ${selectedFilter === filter ? 'active' : ''}`}
            onClick={() => setSelectedFilter(filter)}
          >
            {filter}
          </div>
        ))}
      </div>

      <div className="offers-text">Saved {selectedFilter}</div>

      {isLoading ? (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <div className="loader"></div>
          <p style={{ color: 'white' }}>Loading favorites...</p>
        </div>
      ) : filteredItems.length === 0 ? (
        <p style={{ textAlign: 'center', marginTop: '20px' }}>
          No saved {selectedFilter.toLowerCase()} yet!
        </p>
      ) : (
        filteredItems.map((item, index) => {
          const rawUrl = item.image?.url || item.photo?.url || item.image || '';
          const imageUrl = getImageUrlWithToken(rawUrl, token);

          return (
            <div key={index} className="attractionCardADF" style={{ marginBottom: '20px' }}>
              <div className="attractionCardImageContainer">
                <img
                  src={imageUrl}
                  alt={item.title}
                  className="attractionCardImage"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x200';
                  }}
                />
                <AiFillHeart
                  className="attractionCardHeartIcon"
                  onClick={(e) => handleHeartClick(e, item)}
                  style={{ color: 'red', width: '25px', height: '25px', padding: '4px' }}
                />
                {item.category && item.category !== 'Offers' && (
                  <div className="attractionCardCategoryADF">{item.category}</div>
                )}
              </div>

              <div className="attractionCardDetails">
                <h3 style={{ fontWeight: 500 }}>{item.title}</h3>
                {item.description && <p>{item.description}</p>}
                {item.distance && <p>{item.distance} KM</p>}
                {item.buttonLabel && (
                  <button className="showOfferButton">{item.buttonLabel}</button>
                )}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
