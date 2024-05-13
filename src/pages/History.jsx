import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import api from '../services/Api';
import HistoryTable from './components/HistoryTable';
import { Col, Container, Row, Form, Spinner } from 'react-bootstrap';

function History() {

  const [rents, setRents] = useState([]);
  const [areRentsLoaded, setAreRentsLoaded] = useState(false);

  useEffect(() => {
    const fetchRents = async () => {
      const response = await api.get('/history/')
      setRents(response.data)
      setAreRentsLoaded(true)
    }

    return () => fetchRents()
  }, [])

  function search() {
    // Declare variables
    var input, filter, table, tr, td, i, txtValue, filterBy;
    input = document.getElementById("searchBar");
    filter = input.value.toUpperCase();
    table = document.getElementById("table");
    tr = table.getElementsByTagName("tr");

    filterBy = document.getElementById('filterBy').value;
  
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[filterBy-1];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }

  return (

    <Container fluid className="mt-2 text-center px-3">
      <h1 className="display-5 text-start ms-3 border-bottom">Historia</h1>
      <Container fluid className='mt-4'>
        <Row>
          <Col className='col-auto me-auto d-flex'>
            <Form.Select aria-label="Default select example" id='filterBy'>
              <option value="1" selected>Imię</option>
              <option value="2">Nazwisko</option>
              <option value="3">Klasa</option>
              <option value="4">Tytuł książki</option>
            </Form.Select>
            <Form.Control className="mx-2" type="search" placeholder="Szukaj" aria-label="Search" id='searchBar' onKeyUp={() => search()} />
          </Col>
        </Row>
      </Container>
      <Container fluid className="mt-4">
        {areRentsLoaded ? <HistoryTable rents={rents} /> : <Spinner variant='border' size='lg' />}
      </Container>
    </Container>
  );
}

export default History;
