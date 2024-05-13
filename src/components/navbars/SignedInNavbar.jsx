import { signOut } from "firebase/auth";

export default function SignedInNavbar({auth, user}) {
  return (
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <a class="navbar-brand" href="#" onclick="window.location.reload()">
          <img src="/images/logo/logo.png" alt="" width="30" height="30" />
            Librarian | Prymus
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <a class="nav-link">Zalogowano jako: <strong>{user.email}</strong></a>
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link" aria-current="page" href="/rents" id="rents-href">Wypożyczenia</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/history" id="history-href">Historia wypożyczeń</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/books" id="books-href">Spis książek</a>
            </li>
            <li class="nav-item">
              <a class="nav-link d-flex" href="/" onClick={() => signOut(auth)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-box-arrow-right me-1" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z" />
                  <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
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