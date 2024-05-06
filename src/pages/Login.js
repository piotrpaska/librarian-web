import { useState, useEffect } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import {  signInWithEmailAndPassword   } from 'firebase/auth';
import { auth } from '../components/firebase';
import { Navigate, useNavigate } from 'react-router-dom' 
import { doc } from 'firebase/firestore';

export default function Login({ user }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState([]);

  useEffect(() => {
    const alertsParent = document.getElementById('alerts');
    if (alertsParent) {
      alertsParent.innerHTML = '';
      if (alert.length > 0) {
        alertsParent.innerHTML = '';
        if (alert.length > 0) {
          const alertElement = document.createElement('div');
          const alertNode = document.createTextNode(alert[1]);
          alertsParent.appendChild(alertNode);
          alertsParent.classList.add('alert', `alert-${alert[0]}`);
          alertsParent.appendChild(alertElement);
        }
      }
    }
  }, [alert]);

  const login = (e) => {
    e.preventDefault();
    setAlert([]);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential.user)
        navigate('/rents'); 
      })
      .catch((error) => {
        setAlert(['danger', 'Nieprawidłowe dane logowania']);
        setPassword('');
      });
  }

  if (user) {
    return <Navigate to='/rents' />
  }

  return (
    <Container fluid='sm' className='text-center mt-5 shadow-lg p-5 mb-5 bg-dark rounded'>
      <h1>Zaloguj</h1>
      <h6>PANEL BIBLIOTEKARZA</h6>
      <Container className='mt-4 mb-3' id='alerts'></Container>
      <Form
        className='text-start'
      >
        <Form.Group className='mb-3' controlId='loginEmail'>
          <Form.Label>Email address</Form.Label>
          <Form.Control type='email' placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)} required/>
        </Form.Group>
        <Form.Group className='mb-3' controlId='loginPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required/>
        </Form.Group>
        <Button variant='primary' onClick={login}>Submit</Button>
      </Form>
    </Container>
  )
}