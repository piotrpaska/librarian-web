import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { auth } from './components/firebase';
import { Spinner, Container } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import ProtectedRoute from './components/ProtectedRoute';

// Import pages
import Rents from './pages/Rents';
import History from './pages/History';
import Books from './pages/Books';
import Login from './pages/Login';
import { doc } from 'firebase/firestore';

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setIsLoading(false);
        return;
      } 
      setIsLoading(false);
      setUser(null);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      document.getElementById('navbar').style.display = 'block';
      document.getElementById('login-page-navbar').style.display = 'none';
      document.getElementById('username-field').innerHTML = user.email;
    } else {
      document.getElementById('navbar').style.display = 'none';
      document.getElementById('login-page-navbar').style.display = 'block';
    }
  }, [user]);

  const handleSignOut = () => {
    signOut(auth)
  }

  const signOutBtn = document.getElementById('logOutBtn');
  if (signOutBtn) {
    signOutBtn.addEventListener('click', handleSignOut);
  }

  if (isLoading) {
    return (
      <Container fluid='sm' className='text-center align-items-center mt-5 p-5 mb-5'>
        <Spinner animation="border" size='lg' />
      </Container>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login user={user} />} />
        <Route path="/rents" element={<ProtectedRoute user={user}><Rents /></ProtectedRoute>} />
        <Route path="/history" element={<ProtectedRoute user={user}><History /></ProtectedRoute>} />
        <Route path="/books" element={<ProtectedRoute user={user}><Books /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
