import React from 'react';
import './UpcomingEventCard.css';

export default function UpcomingEventCard({
  title = 'Aperitivo in piazza',
  date = '20 June – 19 September 2025',
  imageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyhmSg3NWRYo76RxRUo97Ex6aZzVC5bGzZeT0tAxwt5HoJPc0QXZZiOqfo4C0819GZuCM&usqp=CAU',
}) {
  return (
    <>
    <div className="event-heading">Upcoming Events</div>
    <div className="event-card">
      <img src={imageUrl} alt={title} className="event-image" />
      <div className="event-content">
        <h4 className="event-title">{title}</h4>
        <p className="event-date">{date}</p>
      </div>
    </div>
    </>
  );
}
