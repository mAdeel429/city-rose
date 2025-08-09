// import React, { useState, useEffect } from 'react';
// import './Insights.css';
// import { FiArrowLeft } from 'react-icons/fi';
// import { Link, useParams } from 'react-router-dom';
// import { fetchOffers } from '../data/fetchOffers';

// export default function Insights() {
//   const [offer, setOffer] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [hasAccess, setHasAccess] = useState(true); // 🔓 Always allow access now
//   const { offerId } = useParams();
//   const token = localStorage.getItem('token');

//   useEffect(() => {
//     const loadDataFromLocal = async () => {
//       try {
//         // ✅ Directly allow access and fetch offers
//         const allOffers = await fetchOffers();
//         const selectedOffer = offerId
//           ? allOffers.find(o => o.id.toString() === offerId)
//           : allOffers[0];
//         setOffer(selectedOffer);
//       } catch (err) {
//         console.error('❌ Error loading Insights:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadDataFromLocal();
//   }, [offerId]);

//   const getImageUrlWithToken = (url) => {
//     if (!url) return 'https://via.placeholder.com/300x200';
//     try {
//       const baseUrl = window.location.origin;
//       const fullUrl = new URL(url, baseUrl);
//       if (token) {
//         fullUrl.searchParams.set('token', token);
//       }
//       return fullUrl.toString();
//     } catch {
//       return 'https://via.placeholder.com/300x200';
//     }
//   };

//   if (loading) {
//     return (
//       <div className="insights-container">
//         <p>Loading insights...</p>
//       </div>
//     );
//   }

//   // 🔹 Access Denied check removed
//   // if (!hasAccess) { ... }

//   if (!offer) {
//     return (
//       <div className="insights-container">
//         <Link to="/" style={{ textDecoration: 'none' }}>
//           <FiArrowLeft className="back-icon" />
//         </Link>
//         <p>No offer found for insights.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="insights-container">
//       <div className="header">
//         <Link to="/" style={{ textDecoration: 'none' }}>
//           <FiArrowLeft className="back-icon" />
//         </Link>
//         <h2>Le tue offerte</h2>
//       </div>

//       <div className="offer-card">
//         <img
//           src={getImageUrlWithToken(offer.photo?.url)}
//           alt={offer.title || 'Offer'}
//           className="offer-image"
//           onError={(e) => {
//             e.target.src = 'https://via.placeholder.com/300x200';
//           }}
//         />
//         <div className="offer-title">{offer.title}</div>
//       </div>
//       <div className="stats">
//         <div className="stat-item">
//           <div className="stat-label">Visualizzazioni uniche</div>
//           <div className="stat-value">{offer.total_unique_views ?? 0}</div>
//         </div>
//         <div className="stat-item">
//           <div className="stat-label">Offerte Salvate</div>
//           <div className="stat-value">{offer.total_saved ?? 0}</div>
//         </div>
//         <div className="stat-item">
//           <div className="stat-label">Riscattate</div>
//           <div className="stat-value">{offer.total_redeemed ?? 0}</div>
//         </div>
//       </div>

//     </div>
//   );
// } 


import React, { useState, useEffect } from 'react';
import './Insights.css';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useParams } from 'react-router-dom';
import { fetchOffers } from '../data/fetchOffers';

export default function Insights() {
  const [offer, setOffer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false); // 🔒 Default: No access
  const { offerId } = useParams();
  const token = localStorage.getItem('token');

  useEffect(() => {
    // ✅ Check if user has insights access
    const userData = localStorage.getItem('user_info');
    if (userData) {
      const user = JSON.parse(userData);
      if (Array.isArray(user.point_ids) && user.point_ids.length > 0) {
        setHasAccess(true);
      }
    }
  }, []);

  useEffect(() => {
    const loadDataFromLocal = async () => {
      try {
        if (!hasAccess) return; // ❌ No access, no fetch
        const allOffers = await fetchOffers();
        const selectedOffer = offerId
          ? allOffers.find(o => o.id.toString() === offerId)
          : allOffers[0];
        setOffer(selectedOffer);
      } catch (err) {
        console.error('❌ Error loading Insights:', err);
      } finally {
        setLoading(false);
      }
    };

    loadDataFromLocal();
  }, [offerId, hasAccess]);

  const getImageUrlWithToken = (url) => {
    if (!url) return 'https://via.placeholder.com/300x200';
    try {
      const baseUrl = window.location.origin;
      const fullUrl = new URL(url, baseUrl);
      if (token) {
        fullUrl.searchParams.set('token', token);
      }
      return fullUrl.toString();
    } catch {
      return 'https://via.placeholder.com/300x200';
    }
  };

  if (loading) {
    return (
      <div className="insights-container">
        <p>Loading insights...</p>
      </div>
    );
  }

  // 🚫 Access Denied UI
  if (!hasAccess) {
    return (
      <div className="insights-container">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <FiArrowLeft className="back-icon" />
        </Link>
        <p>Access denied. You do not have permission to view Insights.</p>
      </div>
    );
  }

  if (!offer) {
    return (
      <div className="insights-container">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <FiArrowLeft className="back-icon" />
        </Link>
        <p>No offer found for insights.</p>
      </div>
    );
  }

  return (
    <div className="insights-container">
      <div className="header">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <FiArrowLeft className="back-icon" />
        </Link>
        <h2>Le tue offerte</h2>
      </div>

      <div className="offer-card">
        <img
          src={getImageUrlWithToken(offer.photo?.url)}
          alt={offer.title || 'Offer'}
          className="offer-image"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x200';
          }}
        />
        <div className="offer-title">{offer.title}</div>
      </div>
      <div className="stats">
        <div className="stat-item">
          <div className="stat-label">Visualizzazioni uniche</div>
          <div className="stat-value">{offer.total_unique_views ?? 0}</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">Offerte Salvate</div>
          <div className="stat-value">{offer.total_saved ?? 0}</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">Riscattate</div>
          <div className="stat-value">{offer.total_redeemed ?? 0}</div>
        </div>
      </div>
    </div>
  );
}
