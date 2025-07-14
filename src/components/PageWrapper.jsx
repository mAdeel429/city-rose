// components/PageWrapper.jsx
import React from 'react';
import { motion } from 'framer-motion';

const PageWrapper = ({ children }) => {
  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ duration: 0.3 }}
      style={{ position: 'absolute', width: '100%' }}
    >
      {children}
    </motion.div>
  );
};

export default PageWrapper;
