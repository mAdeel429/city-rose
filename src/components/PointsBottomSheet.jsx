// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import './PointsBottomSheet.css';

// export default function PointsBottomSheet({ show, onClose }) {
//     const [dragY, setDragY] = useState(0);
//     const [selectedOption, setSelectedOption] = useState(null);

//     const handleDragEnd = (event, info) => {
//         if (info.offset.y > 100) {
//             onClose();
//         } else {
//             setDragY(0);
//         }
//     };

//     const [points] = useState([
//         { id: 1, name: 'Points', type: 'Points' },
//         { id: 2, name: 'Events', type: 'Events' },
//     ]);

//     return (
//         <AnimatePresence>
//             {show && (
//                 <motion.div
//                     className="bottom-sheet-backdrop"
//                     // style={{ marginBottom: '30px' }}
//                     onClick={onClose}
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                 >
//                     <motion.div
//                         className="bottom-sheet"
//                         onClick={(e) => e.stopPropagation()}
//                         initial={{ y: '100%' }}
//                         animate={{ y: dragY }}
//                         exit={{ y: '100%' }}
//                         transition={{ type: 'spring', stiffness: 300, damping: 30 }}
//                         drag="y"
//                         dragConstraints={{ top: 0, bottom: 0 }}
//                         onDragEnd={handleDragEnd}
//                         dragElastic={0.2}
//                     >
//                         <div className="handle-bar" />

//                         <div className="filter-options">
//                             {points.map((point) => (
//                                 <div
//                                     key={point.id}
//                                     className={`radio-option ${selectedOption === point.id ? 'active' : ''}`}
//                                     onClick={() => setSelectedOption(point.id)}
//                                 >
//                                     <div className="radio-circle" />
//                                     <div>
//                                         <p>{point.name}</p>
//                                     </div>
//                                 </div>
//                             ))}

//                         </div>

//                         <button className="bottom-sheet-close-btn" onClick={onClose}>
//                             Close
//                         </button>
//                     </motion.div>
//                 </motion.div>
//             )}
//         </AnimatePresence>
//     );
// }


import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './PointsBottomSheet.css';

export default function PointsBottomSheet({ show, onClose }) {
    const [dragY, setDragY] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);

    const handleDragEnd = (event, info) => {
        if (info.offset.y > 100) {
            onClose();
        } else {
            setDragY(0);
        }
    };

    const [points] = useState([
        { id: 1, name: 'Points', type: 'Points' },
        { id: 2, name: 'Events', type: 'Events' },
    ]);

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    className="points-sheet-backdrop"
                    onClick={onClose}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="points-sheet-container"
                        onClick={(e) => e.stopPropagation()}
                        initial={{ y: '100%' }}
                        animate={{ y: dragY }}
                        exit={{ y: '100%' }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        drag="y"
                        dragConstraints={{ top: 0, bottom: 0 }}
                        onDragEnd={handleDragEnd}
                        dragElastic={0.2}
                    >
                        <div className="points-sheet-handle" />

                        <div className="points-sheet-options">
                            {points.map((point) => (
                                <div
                                    key={point.id}
                                    className={`points-sheet-option ${selectedOption === point.id ? 'active' : ''}`}
                                    onClick={() => setSelectedOption(point.id)}
                                >
                                    <div className="points-sheet-circle" />
                                    <div>
                                        <p>{point.name}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button className="points-sheet-close-btn" onClick={onClose}>
                            Close
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
