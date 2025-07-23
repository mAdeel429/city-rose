import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import AttractionCard from './AttractionCard';
import './AttractionRow.css';
import { useNavigate } from 'react-router-dom';

export default function AttractionRow({ title, data }) {
  const constraintsRef = useRef(null);
  const navigate = useNavigate();

  return (
    <div className="page-container" style={{ margin: '20px 0' }}>
      <div className="attractions-wrapper">
        <h2>{title}</h2>
        <div className="scroll-container" ref={constraintsRef}>
          <motion.div
            className="motion-scroll"
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
