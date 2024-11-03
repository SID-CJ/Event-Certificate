import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function EventForm() {
  const [formData, setFormData] = useState({
    eventName: '',
    depId: '',
    orgId: '',
    date: '',
    entryFee: '',
    factId: ''
  });

  const [errors, setErrors] = useState({});

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle form submission, e.g., send data to an API
      console.log('Form Data:', formData);
      // Reset form
      setFormData({
        eventName: '',
        depId: '',
        orgId: '',
        date: '',
        entryFee: '',
        factId: ''
      });
      setErrors({});
    }
  };

  return (
    <Container className="mt-5">
      <h2>Create Event</h2>
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
    </Container>
  );
}

export default EventForm;
