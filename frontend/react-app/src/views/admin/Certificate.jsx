import { useState, useEffect } from 'react';
import { supabase } from '../../../supabaseclient';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import './certificate.css';

function Certificate() {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUpcomingEvents = async () => {
      try {
        const today = new Date().toISOString().split('T')[0];
        const { data, error } = await supabase
          .from('event')
          .select('event_id, event_name, date')
          .gte('date', today); // Fetch only upcoming events

        if (error) throw error;
        setUpcomingEvents(data);
      } catch (error) {
        setError('Error fetching events: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUpcomingEvents();
  }, []);

  const handleGenerateCertificate = (eventId, eventName) => {
    // Navigate to Certi.jsx and pass event_id and event_name as state
    navigate('/certi', { state: { eventId, eventName } });
  };

  return (
    <Container className="certificate-container">
      <h2 className="certificate-heading">Choose Event to Generate Certificate</h2>
      {loading ? (
        <Spinner animation="border" variant="primary" className="certificate-spinner" />
      ) : error ? (
        <Alert variant="danger" className="certificate-error">{error}</Alert>
      ) : upcomingEvents.length > 0 ? (
        <div className="certificate-buttons">
          {upcomingEvents.map(event => (
            <Button
              key={event.event_id}
              variant="primary"
              onClick={() => handleGenerateCertificate(event.event_id, event.event_name)}
              className="certificate-button"
            >
              {event.event_name}
            </Button>
          ))}
        </div>
      ) : (
        <p className="certificate-noEvents">No upcoming events found.</p>
      )}
    </Container>
  );
}

export default Certificate;
