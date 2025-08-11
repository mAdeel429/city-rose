// import React, { useEffect, useState } from "react";
// import { useParams, useLocation, useNavigate } from "react-router-dom";
// import { FaArrowLeft, FaHeart } from "react-icons/fa";
// import "./SingleOfferPage.css";
// import { QRCodeSVG } from "qrcode.react";
// import { redeemOffer as redeemOfferAPI } from "../data/redeemOffer";
// import { toast, Toaster } from "sonner";

// export default function SingleOfferPage() {
//   const { id } = useParams();
//   const location = useLocation();
//   const navigate = useNavigate();

//   const token = localStorage.getItem("token");

//   let userId = localStorage.getItem("user_id");
//   if (!userId) {
//     try {
//       const userInfo = JSON.parse(localStorage.getItem("user_info"));
//       if (userInfo && userInfo.id) {
//         userId = userInfo.id.toString();
//         localStorage.setItem("user_id", userId);
//       }
//     } catch (e) {
//       console.error("Failed to get user_id from user_info:", e);
//     }
//   }

//   const [offer, setOffer] = useState(null);
//   const [userLocation, setUserLocation] = useState(null);
//   const [canRedeem, setCanRedeem] = useState(false);

//   useEffect(() => {
//     if (location.state?.offer) {
//       setOffer(location.state.offer);
//     }
//   }, [location.state]);

//   useEffect(() => {
//     try {
//       // TODO: Replace with actual location fetching if needed
//       const latStr = 43.782179720564145;
//       const lonStr = 11.276871372939292;
//       setUserLocation({ lat: parseFloat(latStr), lng: parseFloat(lonStr) });
//     } catch (e) {
//       console.error("Error reading user location", e);
//       setUserLocation(null);
//     }
//   }, []);

//   function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
//     const R = 6371;
//     const dLat = ((lat2 - lat1) * Math.PI) / 180;
//     const dLon = ((lon2 - lon1) * Math.PI) / 180;
//     const a =
//       Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//       Math.cos((lat1 * Math.PI) / 180) *
//         Math.cos((lat2 * Math.PI) / 180) *
//         Math.sin(dLon / 2) *
//         Math.sin(dLon / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     return R * c;
//   }

//   useEffect(() => {
//     if (
//       userLocation &&
//       offer &&
//       offer.point &&
//       typeof offer.point.lat === "number" &&
//       typeof offer.point.lng === "number"
//     ) {
//       const distance = getDistanceFromLatLonInKm(
//         userLocation.lat,
//         userLocation.lng,
//         offer.point.lat,
//         offer.point.lng
//       );

//       const radiusInKm =
//         offer.point.radius && offer.point.radius > 0 ? offer.point.radius : 0.02;

//       setCanRedeem(distance <= radiusInKm);
//     }
//   }, [userLocation, offer]);

//   const getImageUrlWithToken = (url) => {
//     if (!url) return "https://via.placeholder.com/300x200";
//     try {
//       const fullUrl = new URL(url);
//       if (token) fullUrl.searchParams.set("token", token);
//       return fullUrl.toString();
//     } catch {
//       return url;
//     }
//   };

//   const handleRedeem = async () => {
//     if (!canRedeem) {
//       toast.warning("You are too far from the offer location to redeem.");
//       return;
//     }

//     try {
//       const response = await redeemOfferAPI(offer.id);

//       if (response && (response.status === "success" || response.success)) {
//         toast.success("🎉 Offer redeemed successfully!");
//       } else {
//         toast.error("⚠️ Failed to redeem offer.");
//       }
//     } catch (error) {
//       toast.error("❌ Error redeeming offer: " + error.message);
//     }
//   };

//   if (!offer) {
//     return <div className="single-offer-container">Loading offer details...</div>;
//   }

//   const imageUrl = getImageUrlWithToken(offer.photo?.url);
//   const offerId = offer.id;
//   const qrValue = `cityrose://burn/userId:${userId};offerId:${offerId}`;

//   console.log("Generated QR value: ", qrValue);

//   let distanceKm = null;
//   if (
//     userLocation &&
//     offer &&
//     offer.point &&
//     typeof offer.point.lat === "number" &&
//     typeof offer.point.lng === "number"
//   ) {
//     distanceKm = getDistanceFromLatLonInKm(
//       userLocation.lat,
//       userLocation.lng,
//       offer.point.lat,
//       offer.point.lng
//     );
//   }

//   return (
//     <div className="single-offer-container">
//       <Toaster richColors position="top-center" />

//       <div className="offer-image-container">
//         <img src={imageUrl} alt={offer.title} className="offer-image" />
//         <div className="top-icons">
//           <FaArrowLeft className="icon-button" onClick={() => navigate(-1)} />
//           <FaHeart className="icon-button heart-icon" />
//         </div>
//       </div>

//       <div className="offer-content">
//         <h2 className="offer-title">{offer.long_title}</h2>
//         <p className="offer-description">{offer.long_description}</p>

//         <div
//           className={`qr-container ${canRedeem ? "" : "qr-blur"}`}
//           title={canRedeem ? "Scan to redeem" : "Too far to redeem, QR code disabled"}
//         >
//           <QRCodeSVG
//             value={qrValue}
//             size={120}
//             fgColor="var(--text-color)"
//             bgColor="var(--bg-color)"
//           />
//         </div>

//         <p>
//           Your distance from offer location:{" "}
//           {distanceKm !== null ? `${distanceKm.toFixed(3)} km` : "Location not available"}
//         </p>

//         <button
//           className="offer-button"
//           onClick={handleRedeem}
//           disabled={!canRedeem}
//           title={canRedeem ? "" : "You must be near the offer location to redeem"}
//         >
//           {canRedeem ? "Redeem Offer" : "Too far to redeem"}
//         </button>

//         <p className="offer-note">
//           You can activate the offer only if you are near the point of interest.
//         </p>
//       </div>
//     </div>
//   );
// }



import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaHeart } from "react-icons/fa";
import "./SingleOfferPage.css";
import { QRCodeSVG } from "qrcode.react";
import { redeemOffer as redeemOfferAPI } from "../data/redeemOffer";
import { toast, Toaster } from "sonner";
import { useFavorites } from "../data/FavoritesContext";

export default function SingleOfferPage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();

  let userId = localStorage.getItem("user_id");
  if (!userId) {
    try {
      const userInfo = JSON.parse(localStorage.getItem("user_info"));
      if (userInfo && userInfo.id) {
        userId = userInfo.id.toString();
        localStorage.setItem("user_id", userId);
      }
    } catch (e) {
      console.error("Failed to get user_id from user_info:", e);
    }
  }

  const [offer, setOffer] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [canRedeem, setCanRedeem] = useState(false);

  useEffect(() => {
    if (location.state?.offer) {
      setOffer(location.state.offer);
    }
  }, [location.state]);

  useEffect(() => {
    try {
      const latStr = localStorage.getItem("user_lat");
      const lonStr = localStorage.getItem("user_lon");
      setUserLocation({ lat: parseFloat(latStr), lng: parseFloat(lonStr) });
    } catch (e) {
      console.error("Error reading user location", e);
      setUserLocation(null);
    }
  }, []);

  function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  useEffect(() => {
    if (
      userLocation &&
      offer &&
      offer.point &&
      typeof offer.point.lat === "number" &&
      typeof offer.point.lng === "number"
    ) {
      const distance = getDistanceFromLatLonInKm(
        userLocation.lat,
        userLocation.lng,
        offer.point.lat,
        offer.point.lng
      );

      const radiusInKm =
        offer.point.radius && offer.point.radius > 0 ? offer.point.radius : 0.02;

      setCanRedeem(distance <= radiusInKm);
    }
  }, [userLocation, offer]);

  const getImageUrlWithToken = (url) => {
    if (!url) return "https://via.placeholder.com/300x200";
    try {
      const fullUrl = new URL(url);
      if (token) fullUrl.searchParams.set("token", token);
      return fullUrl.toString();
    } catch {
      return url;
    }
  };

  const handleRedeem = async () => {
    if (!canRedeem) {
      toast.warning("You must be closest to the spot in order to redeem the offer.");
      return;
    }

    try {
      const response = await redeemOfferAPI(offer.id);

      if (response && (response.status === "success" || response.success)) {
        toast.success("🎉 Offer redeemed successfully!");
      } else {
        toast.error("⚠️ Failed to redeem offer.");
      }
    } catch (error) {
      toast.error("❌ Error redeeming offer: " + error.message);
    }
  };

  const isFavorite = favorites.some(fav => fav.id === offer?.id);

  const handleHeartClick = (e) => {
    e.stopPropagation();

    if (!offer) return;

    if (isFavorite) {
      removeFromFavorites(offer.id);
    } else {
      addToFavorites(offer);
    }
  };

  if (!offer) {
    return <div className="single-offer-container">Loading offer details...</div>;
  }

  const imageUrl = getImageUrlWithToken(offer.photo?.url);
  const offerId = offer.id;
  const qrValue = `cityrose://burn/userId:${userId};offerId:${offerId}`;
  // const qrValue = `https://city-rose.vercel.app/offers/${offerId}?userId=${userId}`;

  console.log(qrValue)

  let distanceKm = null;
  if (
    userLocation &&
    offer &&
    offer.point &&
    typeof offer.point.lat === "number" &&
    typeof offer.point.lng === "number"
  ) {
    distanceKm = getDistanceFromLatLonInKm(
      userLocation.lat,
      userLocation.lng,
      offer.point.lat,
      offer.point.lng
    );
  }

  return (
    <div className="single-offer-container">
      <Toaster richColors position="top-center" />

      <div className="offer-image-container">
        <img src={imageUrl} alt={offer.title} className="offer-image" />
        <div className="top-icons">
          <FaArrowLeft className="icon-button" onClick={() => navigate(-1)} />
          <FaHeart
            className="icon-button heart-icon"
            onClick={handleHeartClick}
            style={{ color: isFavorite ? "red" : "white", cursor: "pointer" }}
          />
        </div>
      </div>

      <div className="offer-content">
        <h2 className="offer-title">{offer.long_title}</h2>
        <p className="offer-description">{offer.long_description}</p>

        <div
          className={`qr-container ${canRedeem ? "" : "qr-blur"}`}
          title={canRedeem ? "Scan to redeem" : "Too far to redeem, QR code disabled"}
        >
          <QRCodeSVG
            value={qrValue}
            size={120}
            fgColor="var(--text-color)"
            bgColor="var(--bg-color)"
          />
        </div>
        <button
          className="offer-button"
          onClick={handleRedeem}
          title={canRedeem ? "" : "You must be near the offer location to redeem"}
        >
          Redeem Offer
        </button>

        <p className="offer-note">
          You can activate the offer only if you are near the point of interest.
        </p>
      </div>
    </div>
  );
}
