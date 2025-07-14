// import React from 'react';
// import { FaArrowLeft, FaHeart } from 'react-icons/fa';
// import { motion } from 'framer-motion';
// import './CardDetailScreen.css';

// const Header = () => (
//   <motion.div 
//     className="header"
//     initial={{ y: -100 }}
//     animate={{ y: 0 }}
//     transition={{ type: 'spring', stiffness: 100 }}
//   >
//     <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTONRYGEZNdAM2JCjd3sVwHnc3MilBJdmeIPw&s" alt="Ice Cream Cone" />
//     <div className="header-icons">
//       <FaArrowLeft className="back-icon" />
//       <FaHeart className="heart-icon" />
//     </div>
//   </motion.div>
// );

// const Tabs = () => (
//   <motion.div 
//     className="tabs"
//     initial={{ opacity: 0 }}
//     animate={{ opacity: 1 }}
//     transition={{ delay: 0.2 }}
//   >
//     <button className="tab active">Indicazioni</button>
//     <button className="tab">Orari</button>
//     <button className="tab">Sito</button>
//   </motion.div>
// );

// const ImageGrid = () => (
//   <motion.div 
//     className="image-grid"
//     initial={{ scale: 0.9 }}
//     animate={{ scale: 1 }}
//     transition={{ type: 'spring', stiffness: 100 }}
//   >
//     <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTONRYGEZNdAM2JCjd3sVwHnc3MilBJdmeIPw&s" alt="Red Cake" />
//     <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTONRYGEZNdAM2JCjd3sVwHnc3MilBJdmeIPw&s" alt="Eating Dessert" />
//     <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTONRYGEZNdAM2JCjd3sVwHnc3MilBJdmeIPw&s" alt="Ice Cream Shop" />
//     <div className="image-with-badge">
//       <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTONRYGEZNdAM2JCjd3sVwHnc3MilBJdmeIPw&s" alt="Juice and Dessert" />
//       <span className="badge">+4</span>
//     </div>
//   </motion.div>
// );

// const Footer = () => (
//   <motion.div 
//     className="footer"
//     initial={{ y: 100 }}
//     animate={{ y: 0 }}
//     transition={{ type: 'spring', stiffness: 100 }}
//   >
//     <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTONRYGEZNdAM2JCjd3sVwHnc3MilBJdmeIPw&s" alt="Ice Cream Footer" />
//     <FaHeart className="footer-heart" />
//   </motion.div>
// );

// const CardDetailScreen = () => (
//   <div className="container">
//     <Header />
//     <h1 className="title">Badiani</h1>
//     <Tabs />
//     <ImageGrid />
//     <Footer />
//   </div>
// );

// export default CardDetailScreen;



import React from "react";
import { FaArrowLeft, FaHeart } from "react-icons/fa";
import "./CardDetailScreen.css";

const Header = () => (
  <div className="header-container">
    <img
      src="https://media.cnn.com/api/v1/images/stellar/prod/200416163203-03b-ice-cream-around-the-world-restricted.jpg?q=w_1110,c_fill"
      alt="Ice Cream"
      className="header-image"
    />

    <div className="icon no-bg back-icon">
      <FaArrowLeft />
    </div>

    <div className="icon heart-icon">
      <FaHeart className="heart-filled" />
    </div>

    {/* Tabs Card Overlay */}
    <div className="tabs-card">
      {["Indicazioni", "Orari", "Sito"].map((tab) => (
        <button key={tab} className="pill-tab">
          {tab}
        </button>
      ))}
    </div>
  </div>
);

const CardDetailScreen = () => (
  <div className="screen-container">
    <Header />
    {/* Other content can go here */}
  </div>
);

export default CardDetailScreen;
