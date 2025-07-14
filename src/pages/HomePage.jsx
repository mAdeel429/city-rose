import React, { useState } from 'react';
import Header from '../components/Header'
import AttractionsSection from '../components/AttractionsSection'
import SecondCard from '../components/SecondCard'
import BottomSheet from '../components/BottomSheet'
import './HomePage.css'
import MustSee from '../components/MustSee'

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <>
    <Header setIsMenuOpen={setIsMenuOpen}/>
      <div className="card-container">
        <AttractionsSection />
        <SecondCard />
        <MustSee />
      </div>
      <BottomSheet show={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  )
}



// import React, { useRef } from 'react';
// import { useSpring, animated } from '@react-spring/web';
// import Header from '../components/Header';
// import AttractionsSection from '../components/AttractionsSection';
// import BottomSheet from '../components/BottomSheet';
// import './HomePage.css'; // Create this if needed

// export default function HomePage() {
//   const scrollRef = useRef();

//   const [styles, api] = useSpring(() => ({
//     height: 280,
//     borderBottomLeftRadius: 32,
//     borderBottomRightRadius: 32,
//     config: { tension: 200, friction: 30 },
//   }));

//   const handleScroll = () => {
//     const scrollTop = scrollRef.current.scrollTop;

//     const newHeight = Math.max(200, 280 - scrollTop); // shrink header on scroll
//     const newRadius = Math.max(0, 32 - scrollTop / 5); // smooth corner shrink

//     api.start({
//       height: newHeight,
//       borderBottomLeftRadius: newRadius,
//       borderBottomRightRadius: newRadius,
//     });
//   };

//   return (
//     <div
//       className="scroll-container"
//       ref={scrollRef}
//       onScroll={handleScroll}
//     >
//       <animated.div className="hero-section" style={styles}>
//         <Header />
//         {/* Optional: search bar or intro */}
//       </animated.div>

//       <div className="card-container">
//         <AttractionsSection />
//         <AttractionsSection />

//       </div>

//       <BottomSheet show={false} onClose={() => {}} />
//     </div>
//   );
// }

