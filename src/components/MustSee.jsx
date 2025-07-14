import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import AttractionCard from './AttractionCard';
import './AttractionsSection.css';

export default function MustSee() {
  const constraintsRef = useRef(null);

  const attractions = [
    {
      image: 'http://bonjourvenise.fr/wp-content/uploads/2023/05/gallerie-dellacademia-venise.jpg',
      title: "Galleria dell'Accademia",
      category: 'Culture & Sights',
      distance: '1720.2',
    },
    {
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6Q95W3CoMwgGaKgSfA7hlo6-sbLIK_rWZtQ&s',
      title: 'Cappelle Medicee',
      category: 'Culture & Sights',
      distance: '1720.7',
    },
    {
      image: 'https://cdn.getyourguide.com/img/tour/299e73076c52bf898781974107678c9918132fde515df2972cf94002a1016b7f.jpeg/68.jpg',
      title: 'Duomo di Santa Maria del Fiore',
      category: 'Culture & Sights',
      distance: '1690.5',
    },
    {
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSntCxMq8AD4M9-JD3wzRivTHDdq5qCKZxqSA&s',
      title: 'Battistero di San Giovanni',
      category: 'Culture & Sights',
      distance: '1718.8',
    },
    {
      image: 'https://www.arte.it/foto/600x450/e0/16250-Facciata_santa_maria_novella.jpg',
      title: 'Basilica di Santa Maria Novella',
      category: 'Culture & Sights',
      distance: '1720.1',
    },
  ];

  return (
    <div className="page-container" style={{margin: '20px 0', paddingBottom: "70px"}}>
    <div className="attractions-wrapper">
      <h2>Must-see</h2>

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
