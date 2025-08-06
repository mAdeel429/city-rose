// import React from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import './FullImageGalleryScreen.css';
// import { ChevronLeft } from 'lucide-react';

// const FullImageGalleryScreen = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { images } = location.state || {};

//   if (!images || !images.length) {
//     return <div>No images to display.</div>;
//   }

//   return (
//     <div className="gallery-full-page">
//       <div className="gallery-header">
//         <button onClick={() => navigate(-1)} className="back-button">
//           <ChevronLeft /> Photos
//         </button>
//       </div>

//       <div className="gallery-grid-full">
//         {images.map((url, index) => (
//           <div key={index} className="gallery-image-container">
//             <img src={url} alt={`Image ${index + 1}`} />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default FullImageGalleryScreen;



import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './FullImageGalleryScreen.css';
import { ChevronLeft } from 'lucide-react';

const FullImageGalleryScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { images } = location.state || {};

  if (!images || !images.length) {
    return <div>No images to display.</div>;
  }

  return (
    <div className="gallery-full-page">
      <div className="gallery-header">
        <button onClick={() => navigate(-1)} className="back-button">
          <ChevronLeft size={22} /> Photos
        </button>
      </div>

      <div className="gallery-grid-full">
        {images.map((url, index) => (
          <div key={index} className="gallery-image-container">
            <img src={url} alt={`Image ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FullImageGalleryScreen;
