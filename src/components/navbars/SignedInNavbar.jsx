import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";

export default function SignedInNavbar({auth, user, activeLink}) {
  const [userEmail, setUserEmail] = useState('')
  
  useEffect(() => {
    document.getElementById(activeLink).classList.add('active');
    if (user.email !== null) {
      setUserEmail(user.email)
    } else {
      setUserEmail('')
    }
  }, [])

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#" onClick="window.location.reload()">
          <img src="/images/logo/logo.png" className="me-1 d-inline-block align-text-top" alt="" width="30" height="30" />
            Librarian | Prymus
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <a className="nav-link">Zalogowano jako: <strong>{userEmail}</strong></a>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link" aria-current="page" href="/rents" id="rents-href">Wypożyczenia</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/history" id="history-href">Historia wypożyczeń</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/books" id="books-href">Spis książek</a>
            </li>
            <li className="nav-item">
              <a className="nav-link d-flex" href="/" onClick={() => signOut(auth)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-box-arrow-right me-1" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z" />
                  <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
                </svg>
                Wyloguj
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}