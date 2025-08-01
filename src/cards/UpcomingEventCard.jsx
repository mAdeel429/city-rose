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

  // 🛡️ Get token from localStorage
  const token = localStorage.getItem('token');

  // 🔁 Function to build image URL with token
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
      <div className={styles.eventHeading}>Upcoming Events</div>

      {loading ? (
        <p>Loading events...</p>
      ) : events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        events.map((event, index) => {
          const imageUrl = buildImageUrl(event.photos?.[0]?.url);

          return (
            <div key={index} className={styles.eventCard}>
              <img
                src={imageUrl}
                alt={event.name || 'Event'}
                className={styles.eventImage}
              />
              <div className={styles.eventContent}>
                <h4 className={styles.eventTitle}>{event.name || 'Untitled Event'}</h4>
                <p className={styles.eventDate}>
                  {event.start_at
                    ? new Date(event.start_at).toLocaleDateString()
                    : 'No date available'}
                </p>
                <p className={styles.eventLocation}>
                  {event.point?.name || 'Unknown Location'}
                </p>
              </div>
            </div>
          );
        })
      )}
    </>
  );
}




// import React, { useEffect, useState } from 'react';
// import styles from './UpcomingEventCard.module.css';
// import { fetchEvents } from '../data/fetchEvents';

// export default function UpcomingEventCard() {
//   const [events, setEvents] = useState([]);

//   useEffect(() => {
//     const loadEvents = async () => {
//       const data = await fetchEvents();
//       const allEvents = [...data.page1, ...data.page2, ...data.page3];
//       setEvents(allEvents);
//     };

//     loadEvents();
//   }, []);

//   return (
//     <>
//       <div className={styles.eventHeading}>Upcoming Events</div>

//       {events.length === 0 ? (
//         <p>Loading events...</p>
//       ) : (
//         events.map((event, index) => (
//           <div key={index} className={styles.eventCard}>
//             <img
//               src={event.image_url || 'https://via.placeholder.com/300x200?text=No+Image'}
//               alt={event.title}
//               className={styles.eventImage}
//             />
//             <div className={styles.eventContent}>
//               <h4 className={styles.eventTitle}>{event.title}</h4>
//               <p className={styles.eventDate}>{event.date}</p>
//             </div>
//           </div>
//         ))
//       )}
//     </>
//   );
// }

