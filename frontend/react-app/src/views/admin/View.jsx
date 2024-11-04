import { useState, useEffect } from 'react';
import { supabase } from '../../../supabaseclient'; // Adjust the path as needed
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import './view.css'

function EventList() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data, error } = await supabase
          .from('event')
          .select('*'); // Select all columns; modify if you need specific columns

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

  // Get today's date
  const today = new Date().toISOString().split('T')[0]; // Format as 'YYYY-MM-DD'

  // Filter events into upcoming and finished
  const upcomingEvents = events.filter(event => event.date > today);
  const finishedEvents = events.filter(event => event.date <= today);

  return (
    <Container className="mt-5">
      <h2>Upcoming Events</h2>
      {loading ? (
        <Spinner animation="border" variant="primary" />
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : upcomingEvents.length > 0 ? (
        <Table striped bordered hover>
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
            {upcomingEvents.map((event) => (
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
        <p>No upcoming events found.</p>
      )}

      <h2>Finished Events</h2>
      {loading ? (
        <Spinner animation="border" variant="primary" />
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : finishedEvents.length > 0 ? (
        <Table striped bordered hover>
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
            {finishedEvents.map((event) => (
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
        <p>No finished events found.</p>
      )}
    </Container>
  );
}

export default EventList;
