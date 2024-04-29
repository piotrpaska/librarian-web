import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import $ from 'jquery';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

// Import pages
import Rents from './pages/Rents';
import History from './pages/History';
import Books from './pages/Books';

$(document).ready(function () {
  // Do something on start
});

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/rents" element={<Rents />} />
        <Route path="/history" element={<History />} />
        <Route path="/books" element={<Books />} />
      </Routes>
    </Router>
  );
}

export default App;
