import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import app from '../../firebase.init.';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth(app);

const RegistrationForm = () => {
  // State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [validated, setValidated] = useState(false);

  // Handle Registration
  const handleRegistration = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }
    if (
      !/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
        password
      )
    ) {
      setError('Password is not strong enough!');
      return;
    }
    setError('');

    setValidated(true);
    console.log(email, name, password, error);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        setError(error.message);
      });
  };
  const handleNameBlur = (e) => {
    setName(e.target.value);
  };
  const handleEmailBlur = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordBlur = (e) => {
    setPassword(e.target.value);
  };
  return (
    <div className='w-50 mx-auto mt-5 border border-1 border-info p-5 rounded-3'>
      <Form noValidate validated={validated} onSubmit={handleRegistration}>
        <h2>Please Register</h2>
        <Form.Group className='mb-3' controlId='formBasicName'>
          <Form.Label>Your name</Form.Label>
          <Form.Control
            onBlur={handleNameBlur}
            required
            type='text'
            placeholder='Enter your name'
          />
          <Form.Control.Feedback type='invalid'>
            Please provide a valid name.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onBlur={handleEmailBlur}
            required
            type='email'
            placeholder='Enter email'
          />
          <Form.Text className='text-muted'>
            We'll never share your email with anyone else.
          </Form.Text>
          <Form.Control.Feedback type='invalid'>
            Please provide a valid email.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className='mb-3' controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            onBlur={handlePasswordBlur}
            type='password'
            placeholder='Password'
          />
        </Form.Group>
        <Form.Text className='text-danger'>{error}</Form.Text>
        <div className='mb-3'>
          <Link to={'/'}>Already have an account?</Link>
        </div>
        <Button variant='primary' type='submit'>
          Register
        </Button>
      </Form>
    </div>
  );
};

export default RegistrationForm;
