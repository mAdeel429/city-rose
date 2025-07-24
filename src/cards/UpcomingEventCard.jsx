import React from 'react';
import styles from './UpcomingEventCard.module.css';

export default function UpcomingEventCard({
  title = 'Aperitivo in piazza',
  date = '20 June – 19 September 2025',
  imageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyhmSg3NWRYo76RxRUo97Ex6aZzVC5bGzZeT0tAxwt5HoJPc0QXZZiOqfo4C0819GZuCM&usqp=CAU',
}) {
  return (
    <>
    <div className={styles.eventHeading}>Upcoming Events</div>
    <div className={styles.eventCard} >
      <img src={imageUrl} alt={title} className={styles.eventImage} />
      <div className={styles.eventContent}>
        <h4 className={styles.eventTitle}>{title}</h4>
        <p className={styles.eventDate}>{date}</p>
      </div>
    </div>
    </>
  );
}
