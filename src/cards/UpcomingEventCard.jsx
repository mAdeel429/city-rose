// import React, { useState, useEffect } from 'react';
// import styles from './UpcomingEventCard.module.css';
// import { fetchEvents } from '../data/fetchEvents';

// export default function UpcomingEventCard() {
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadEvents = async () => {
//       const data = await fetchEvents();
//       const allEvents = [...data.page1];
//       setEvents(allEvents);
//       setLoading(false);
//     };

//     loadEvents();
//   }, []);

//   const token = localStorage.getItem('token');

//   const buildImageUrl = (url) => {
//     if (!url) return 'https://via.placeholder.com/300x200?text=No+Image';
//     try {
//       const fullUrl = new URL(url);
//       fullUrl.searchParams.append('token', token);
//       return fullUrl.toString();
//     } catch (err) {
//       console.error('Invalid image URL:', err);
//       return 'https://via.placeholder.com/300x200?text=No+Image';
//     }
//   };

//   return (
//     <>
//       {loading ? (
//         <p>Loading events...</p>
//       ) : events.length === 0 ? (
//         <p>No events found.</p>
//       ) : (
//         events.map((event, index) => {
          
//           const imageUrl = buildImageUrl(event.photos?.[0]?.url);

//           return (
//             <div key={index} className={styles.eventCard}>
//               <img
//                 src={imageUrl}
//                 alt={event.name || 'Event'}
//                 className={styles.eventImage}
//               />
//               <div className={styles.eventContent}>
//               <p className={styles.eventLocation}>
//                   {event.point?.name || 'Unknown Location'}
//                 </p>
//                 <h4 className={styles.eventTitle}>{event.name || 'Untitled Event'}</h4>
//                 <p className={styles.eventDate}>
//                   {event.start_at
//                     ? new Date(event.start_at).toLocaleDateString()
//                     : 'No date available'}
//                 </p>
//               </div>
//             </div>
//           );
//         })
//       )}
//     </>
//   );
// }

import React, { useState, useEffect } from 'react';
import styles from './UpcomingEventCard.module.css';
import { fetchEvents } from '../data/fetchEvents';

export default function UpcomingEventCard() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      const data = await fetchEvents();
      const allEvents = [...data.page1];
      setEvents(allEvents);
      setLoading(false);
    };

    loadEvents();
  }, []);

  const token = localStorage.getItem('token');

  const buildImageUrl = (url) => {
    if (!url) return 'https://via.placeholder.com/300x200?text=No+Image';
    try {
      const fullUrl = new URL(url);
      fullUrl.searchParams.append('token', token);
      return fullUrl.toString();
    } catch (err) {
      console.error('Invalid image URL:', err);
      return 'https://via.placeholder.com/300x200?text=No+Image';
    }
  };

  return (
    <>
      {loading ? (
        <p>Loading events...</p>
      ) : events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        events.slice(-1).map((event, index) => {
          const imageUrl = buildImageUrl(event.photos?.[0]?.url);

          return (
            <div key={index} className={styles.eventCard}>
              <img
                src={imageUrl}
                alt={event.name || 'Event'}
                className={styles.eventImage}
              />
              <div className={styles.eventContent}>
                <p className={styles.eventLocation}>
                  {event.point?.name || 'Unknown Location'}
                </p>
                <h4 className={styles.eventTitle}>{event.name || 'Untitled Event'}</h4>
                <p className={styles.eventDate}>
                  {event.start_at
                    ? new Date(event.start_at).toLocaleDateString()
                    : 'No date available'}
                </p>
              </div>
            </div>
          );
        })
      )}
    </>
  );
}
