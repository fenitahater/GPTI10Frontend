import { useEffect, useState } from "react";
import { getEvents } from "../services/api";
import "./EventList.css";

export default function EventList() {
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(false);

  useEffect(() => {
    getEvents(page)
      .then(data => {
        if (Array.isArray(data.results)) {
          setEvents(data.results);
          setError(false);
        } else {
          setEvents([]);
          setError(true);
        }
      })
      .catch(err => {
        console.error("Error al obtener eventos:", err);
        setError(true);
      });
  }, [page]);

  return (
    <section className="events">
      <h2>Panoramas cercanos</h2>

      {error && (
        <p style={{ color: "red", textAlign: "center" }}>
          No se pudieron cargar los eventos. Intenta nuevamente más tarde.
        </p>
      )}

      {!error && events.length === 0 && (
        <p style={{ textAlign: "center" }}>No hay eventos disponibles.</p>
      )}

      {!error && events.length > 0 && (
        <div className="event-grid">
          {events.map(event => (
            <div className="event-card" key={event.id}>
              <img src={event.image_url} alt={event.title} />
              <h3>{event.title}</h3>
              <p>{event.location}</p>
              <p>{event.date}</p>
              <a href={event.link} target="_blank" rel="noreferrer">
                Ver más
              </a>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
