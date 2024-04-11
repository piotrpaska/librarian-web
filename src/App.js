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

$(document).ready(function () {
  // Do something on start
});

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Rents />} />
        <Route path="/rents" element={<Rents />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </Router>
  );
}

export default App;
