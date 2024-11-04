import React, { useState } from 'react';
import { supabase } from '../../../supabaseclient';  // Ensure this path is correct
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSignup, setIsSignup] = useState(false);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');  // Clear previous error

    try {
      let result;
      if (isSignup) {
        // Sign up user
        result = await supabase.auth.signUp({
          email,
          password,
        });

        if (result.error) {
          setErrorMessage(result.error.message);
        } else {
          // Inform user to check email for confirmation
          setErrorMessage('Signup successful! Please check your email to confirm your account.');
        }

      } else {
        // Sign in user
        result = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (result.error) {
          if (result.error.message === 'Email not confirmed') {
            setErrorMessage('Please confirm your email address before logging in.');
          } else {
            setErrorMessage(result.error.message);
          }
        } else if (result.data?.user || result.user) {
          // Redirect to /admin after successful login/signup
          navigate('/admin');
        }
      }
    } catch (error) {
      console.error('Error with authentication:', error);
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  const toggleForm = () => {
    setIsSignup(!isSignup);
    setErrorMessage('');
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Form className="p-4 border rounded" onSubmit={handleSubmit}>
        <h2>{isSignup ? 'Sign Up' : 'Log In'}</h2>

        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPassword" className="mt-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </Form.Group>

        <Button className="mt-4" variant="primary" type="submit">
          {isSignup ? 'Sign Up' : 'Log In'}
        </Button>

        <Button variant="link" onClick={toggleForm} className="mt-3">
          {isSignup ? 'Already have an account? Log In' : "Don't have an account? Sign Up"}
        </Button>
      </Form>
    </Container>
  );
}

export default Login;
  