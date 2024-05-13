import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { auth } from './components/firebase';
import { Spinner, Container } from 'react-bootstrap';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider
} from "react-router-dom";

import ProtectedRoute from './components/ProtectedRoute';

import NonSignedInNavbar from './components/navbars/NonSignedInNavbar';
import SignedInNavbar from './components/navbars/SignedInNavbar';

// Import pages
import Rents from './pages/Rents';
import History from './pages/History';
import Books from './pages/Books';
import Login from './pages/Login';

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const BrowserRouter = createBrowserRouter([
    { path: "/", element: <Navigate to="/login" /> },
    { path: "/login", element: <><NonSignedInNavbar /><Login user={user} /></> },
    { path: "/rents", element: <><SignedInNavbar auth={auth} user={user} /><ProtectedRoute user={user}><Rents /></ProtectedRoute></> },
    { path: "/history", element: <><SignedInNavbar auth={auth} user={user} /><ProtectedRoute user={user}><History /></ProtectedRoute></> },
    { path: "/books", element: <><SignedInNavbar auth={auth} user={user} /><ProtectedRoute user={user}><Books /></ProtectedRoute></> }
  ]);

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

  if (isLoading) {
    return (
      <Container fluid='sm' className='text-center align-items-center mt-5 p-5 mb-5'>
        <Spinner animation="border" size='lg' />
      </Container>
    );
  }

  return (
    <RouterProvider router={BrowserRouter} />
  );
}

export default App;
