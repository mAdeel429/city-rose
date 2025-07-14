import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import AttractionCard from './AttractionCard';
import './AttractionsSection.css';

export default function AttractionsSection() {
  const constraintsRef = useRef(null);

  const attractions = [
    {
      image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/08/49/07/0a/asmana-welness-world.jpg?w=800&h=500&s=1',
      title: 'Asmana',
      category: 'Activity & Wellness',
      distance: '1718.8',
    },
    {
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTONRYGEZNdAM2JCjd3sVwHnc3MilBJdmeIPw&s',
      title: 'Ice Cream Cafe',
      category: 'Food & Drink',
      distance: '1720.1',
    },
    {
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZeMh9HcYm16vhAkzaonM__vr2cJnJYX4DJw&s',
      title: 'Museum Tour',
      category: 'Culture',
      distance: '1690.5',
    },
    {
      image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/08/49/07/0a/asmana-welness-world.jpg?w=800&h=500&s=1',
      title: 'Asmana',
      category: 'Activity & Wellness',
      distance: '1718.8',
    },
    {
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTONRYGEZNdAM2JCjd3sVwHnc3MilBJdmeIPw&s',
      title: 'Ice Cream Cafe',
      category: 'Food & Drink',
      distance: '1720.1',
    },
  ];

  return (
    <div className="page-container">
    <div className="attractions-wrapper">
      <h2>Popular Attractions</h2>

      {/* Scroll wrapper */}
      <div className="scroll-container" ref={constraintsRef}>
        <motion.div
          className="motion-scroll"
          drag="x"
          dragConstraints={constraintsRef}
          dragElastic={0.2}
        >
          {attractions.map((item, index) => (
            <AttractionCard key={index} {...item} />
          ))}
        </motion.div>
      </div>
    </div>
    </div>
  );
}
