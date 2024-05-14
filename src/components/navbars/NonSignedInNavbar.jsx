export default function NonSignedInNavbar() {
  return (
    <nav className="navbar bg-body-tertiary" id="login-page-navbar">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img src="/images/logo/logo.png" alt="Logo" width="30" height="30"
            className="d-inline-block align-text-top me-1" />
          Librarian | Prymus
        </a>
      </div>
    </nav>
  );
}