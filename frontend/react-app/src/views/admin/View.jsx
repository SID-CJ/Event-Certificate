import { useState, useEffect } from 'react';
import { supabase } from '../../../supabaseclient';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import './view.css';

function EventList() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data, error } = await supabase
          .from('event')
          .select('*');

        if (error) throw error;
        setEvents(data);
      } catch (error) {
        setError('Error fetching events: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const today = new Date().toISOString().split('T')[0];
  const upcomingEvents = events.filter(event => event.date > today);
  const finishedEvents = events.filter(event => event.date <= today);

  return (
    <Container className="eventList-container">
      <h2 className="eventList-heading">Upcoming Events</h2>
      {loading ? (
        <Spinner animation="border" variant="primary" className="eventList-spinner" />
      ) : error ? (
        <Alert variant="danger" className="eventList-error">{error}</Alert>
      ) : upcomingEvents.length > 0 ? (
        <Table striped bordered hover className="eventList-table-container">
          <thead>
            <tr>
              <th>Event ID</th>
              <th>Event Name</th>
              <th>Department ID</th>
              <th>Organization ID</th>
              <th>Date</th>
              <th>Entry Fee</th>
              <th>Fact ID</th>
            </tr>
          </thead>
          <tbody>
            {upcomingEvents.map(event => (
              <tr key={event.event_id}>
                <td>{event.event_id}</td>
                <td>{event.event_name}</td>
                <td>{event.dep_id}</td>
                <td>{event.org_id}</td>
                <td>{event.date}</td>
                <td>{event.entry_fee}</td>
                <td>{event.fact_id}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p className="eventList-noEvents">No upcoming events found.</p>
      )}

      <h2 className="eventList-heading">Finished Events</h2>
      {loading ? (
        <Spinner animation="border" variant="primary" className="eventList-spinner" />
      ) : error ? (
        <Alert variant="danger" className="eventList-error">{error}</Alert>
      ) : finishedEvents.length > 0 ? (
        <Table striped bordered hover className="eventList-table">
          <thead>
            <tr>
              <th>Event ID</th>
              <th>Event Name</th>
              <th>Department ID</th>
              <th>Organization ID</th>
              <th>Date</th>
              <th>Entry Fee</th>
              <th>Fact ID</th>
            </tr>
          </thead>
          <tbody>
            {finishedEvents.map(event => (
              <tr key={event.event_id}>
                <td>{event.event_id}</td>
                <td>{event.event_name}</td>
                <td>{event.dep_id}</td>
                <td>{event.org_id}</td>
                <td>{event.date}</td>
                <td>{event.entry_fee}</td>
                <td>{event.fact_id}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p className="eventList-noEvents">No finished events found.</p>
      )}
    </Container>
  );
}

export default EventList;
