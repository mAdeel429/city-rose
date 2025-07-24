import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import AttractionCard from './AttractionCard';
import styles from './AttractionRow.module.css';
import { useNavigate } from 'react-router-dom';

export default function AttractionRow({ title, data }) {
  const constraintsRef = useRef(null);
  const navigate = useNavigate();

  return (
    <div className={styles.pageContainer} style={{ margin: '20px 0' }}>
      <div className={styles.attractionsWrapper}>
        <h2>{title}</h2>
        <div className={styles.scrollContainer} ref={constraintsRef}>
          <motion.div
            className={styles.motionScroll}
            drag="x"
            dragConstraints={constraintsRef}
            dragElastic={0.2}
          >
            {data.map((item, index) => (
              <AttractionCard
                key={index}
                {...item}
                onClick={() => {
                  navigate('/details', { state: item });
                }}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
