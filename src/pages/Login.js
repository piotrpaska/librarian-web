import { useState, useEffect } from 'react';
import { Button, Container, Form, Modal } from 'react-bootstrap';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../components/firebase';
import { Navigate } from 'react-router-dom';

export default function Login({ user }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState([]);

  const [showResetPassword, setShowResetPassword] = useState(false);
  const [showResetPasswordMsg, setShowResetPasswordMsg] = useState(false);
  const [resetEmail, setResetEmail] = useState('');

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
        console.log(userCredential.user);
      })
      .catch((error) => {
        setAlert(['danger', 'Nieprawidłowe dane logowania']);
        setPassword('');
      });
  }

  const resetPassword = async () => {
    await sendPasswordResetEmail(auth, resetEmail)
      .then(() => {
        setShowResetPassword(false);
        setShowResetPasswordMsg(true);
      })
  }

  if (user) {
    return <Navigate to='/rents' />
  }

  return (
    <Container fluid className="mt-2 text-center px-3">
      <Container fluid='sm' className='text-center mt-5 shadow-lg p-5 mb-5 bg-dark rounded'>
        <h1>Logowanie</h1>
        <h6>PANEL BIBLIOTEKARZA</h6>
        <Container className='mt-4 mb-3' id='alerts'></Container>
        <Form
          className='text-start'
        >
          <Form.Group className='mb-3' controlId='loginEmail'>
            <Form.Label>Email address</Form.Label>
            <Form.Control type='email' placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)} required />
          </Form.Group>
          <Form.Group className='mb-3' controlId='loginPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
          </Form.Group>
          <p><a class="link-opacity-100-hover" onClick={() => setShowResetPassword(true)}>Zapomniałeś hasła?</a></p>
          <Button variant='primary' onClick={login}>Zaloguj</Button>
        </Form>
      </Container>

      <Modal
        show={showResetPassword}
        onHide={() => setShowResetPassword(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Reset hasła</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Wprowadź adres email, na który zostanie wysłany link resetujący hasło</p>
          <Form>
            <Form.Group className='mb-3' controlId='resetPasswordEmail'>
              <Form.Label>Email address</Form.Label>
              <Form.Control type='email' placeholder='Enter email' value={resetEmail} onChange={(e) => setResetEmail(e.target.value)} required autoFocus />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => setShowResetPassword(false)}>Anuluj</Button>
          <Button variant='primary' onClick={resetPassword}>Wyślij link</Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showResetPasswordMsg}
        onHide={() => setShowResetPasswordMsg(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Reset hasła</Modal.Title>
        </Modal.Header>
        <Modal.Body className='text-center'>
          <p>Link resetujący hasło został wysłany na adres email:</p>
          <p className='fw-bold'>{resetEmail}</p>
          <p>Sprawdź swoją skrzynkę pocztową.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='primary' onClick={() => setShowResetPasswordMsg(false)}>OK</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}