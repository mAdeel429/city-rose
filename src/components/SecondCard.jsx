import React from 'react';
import { motion } from 'framer-motion';
import './SecondCard.css';

export default function SecondCard() {
  return (
    <motion.div
      className="second-card"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="overlay">
        <p className="title">Try Bontalenti</p>
        <button className="visit-button">Visit us</button>
      </div>
    </motion.div>
  );
}
