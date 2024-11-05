import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Toast } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation } from 'react-router-dom';
import { supabase } from '../../../supabaseclient';
import './Event.css';

function EventForm() {
  const location = useLocation();
  const { orgId, orgName } = location.state || {};  // Retrieve orgId and orgName from state

  const [formData, setFormData] = useState({
    eventName: '',
    depId: '',
    orgId: orgId || '',  // Pre-set orgId from location.state if available
    date: '',
    entryFee: '',
    factId: ''
  });

  const [errors, setErrors] = useState({});
  const [submissionError, setSubmissionError] = useState(null);
  const [showToast, setShowToast] = useState(false); // State for toast visibility
  const [toastMessage, setToastMessage] = useState(''); // State for toast message

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.eventName) formErrors.eventName = "Event Name is required";
    if (!formData.depId) formErrors.depId = "Department ID is required";
    if (!formData.orgId) formErrors.orgId = "Organization ID is required";
    if (!formData.date) formErrors.date = "Date is required";
    if (!formData.entryFee) formErrors.entryFee = "Entry Fee is required";
    if (!formData.factId) formErrors.factId = "Fact ID is required";
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionError(null);

    if (validateForm()) {
      try {
        // Fetch the latest event_id from the table
        const { data: latestEvent, error: fetchError } = await supabase
          .from('event')
          .select('event_id')
          .order('event_id', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (fetchError) throw fetchError;

        // If no latestEvent is found, start with event_id 1
        const newEventId = latestEvent ? latestEvent.event_id + 1 : 1;

        // Insert new event with generated event_id
        const { error: insertError } = await supabase
          .from('event')
          .insert({
            event_id: newEventId, // Set the incremented event_id
            event_name: formData.eventName,
            dept_id: formData.depId,
            org_id: formData.orgId, // Use the orgId from formData
            date: formData.date,
            entry_fee: formData.entryFee,
            fact_id: formData.factId
          });

        if (insertError) throw insertError;

        console.log('Form submitted successfully:', formData);

        // Show success toast message
        setToastMessage('Event created successfully!');
        setShowToast(true);

        // Reset form after successful submission
        setFormData({
          eventName: '',
          depId: '',
          orgId: orgId, // Reset orgId
          date: '',
          entryFee: '',
          factId: ''
        });
        setErrors({});
      } catch (error) {
        console.error('Error:', error);
        setSubmissionError('Failed to submit the form. Please try again.');
      }
    }
  };

  return (
    <Container className="container" style={{ minHeight: '150vh', width: '150vw' }}>
      <h2>Create Event</h2>
      {submissionError && <p className="text-danger">{submissionError}</p>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formEventName">
          <Form.Label>Event Name</Form.Label>
          <Form.Control
            type="text"
            name="eventName"
            value={formData.eventName}
            onChange={handleChange}
            isInvalid={!!errors.eventName}
          />
          <Form.Control.Feedback type="invalid">
            {errors.eventName}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formDepId">
          <Form.Label>Department ID</Form.Label>
          <Form.Control
            type="text"
            name="depId"
            value={formData.depId}
            onChange={handleChange}
            isInvalid={!!errors.depId}
          />
          <Form.Control.Feedback type="invalid">
            {errors.depId}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formOrgId">
          <Form.Label>Organization ID</Form.Label>
          <Form.Control
            type="text"
            name="orgId"
            value={formData.orgId}
            onChange={handleChange}
            isInvalid={!!errors.orgId}
            disabled  // Disable the input for orgId
          />
          <Form.Control.Feedback type="invalid">
            {errors.orgId}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formDate">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            isInvalid={!!errors.date}
          />
          <Form.Control.Feedback type="invalid">
            {errors.date}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formEntryFee">
          <Form.Label>Entry Fee</Form.Label>
          <Form.Control
            type="number"
            name="entryFee"
            value={formData.entryFee}
            onChange={handleChange}
            isInvalid={!!errors.entryFee}
          />
          <Form.Control.Feedback type="invalid">
            {errors.entryFee}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formFactId">
          <Form.Label>Fact ID</Form.Label>
          <Form.Control
            type="text"
            name="factId"
            value={formData.factId}
            onChange={handleChange}
            isInvalid={!!errors.factId}
          />
          <Form.Control.Feedback type="invalid">
            {errors.factId}
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>

      {/* Toast for success message */}
      <Toast 
        onClose={() => setShowToast(false)} 
        show={showToast} 
        delay={3000} 
        autohide 
        style={{ position: 'absolute', top: '20px', right: '20px' }}
      >
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>
    </Container>
  );
}

export default EventForm;
