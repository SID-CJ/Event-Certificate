import { useState, useEffect } from 'react';
import { supabase } from '../../../supabaseclient';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import './certificate.css';

function Certificate() {
  const [finishedEvents, setFinishedEvents] = useState([]); // Renamed state to finishedEvents
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFinishedEvents = async () => {
      try {
        const today = new Date().toISOString().split('T')[0];
        const { data, error } = await supabase
          .from('event')
          .select('event_id, event_name, date')
          .lt('date', today); // Fetch only finished events

        if (error) throw error;
        setFinishedEvents(data);
      } catch (error) {
        setError('Error fetching events: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFinishedEvents();
  }, []);

  const handleGenerateCertificate = (eventId, eventName, date) => {
    // Navigate to Certi.jsx and pass event_id, event_name, and date as state
    navigate('/certi', { state: { eventId, eventName, date } });
  };

  return (
    <Container className="certificate-container">
      <h2 className="certificate-heading">Choose Finished Event to Generate Certificate</h2> {/* Updated heading */}
      {loading ? (
        <Spinner animation="border" variant="primary" className="certificate-spinner" />
      ) : error ? (
        <Alert variant="danger" className="certificate-error">{error}</Alert>
      ) : finishedEvents.length > 0 ? ( // Check for finishedEvents
        <div className="certificate-buttons">
          {finishedEvents.map(event => (
            <Button
              key={event.event_id}
              variant="primary"
              onClick={() => handleGenerateCertificate(event.event_id, event.event_name, event.date)}
              className="certificate-button"
            >
              {event.event_name}
            </Button>
          ))}
        </div>
      ) : (
        <p className="certificate-noEvents">No finished events found.</p>
      )}
    </Container>
  );
}

export default Certificate;
