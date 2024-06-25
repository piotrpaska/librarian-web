import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import BooksTable from './components/BooksTable';
import api from '../services/Api';
import { Col, Container, Row, Form, Spinner } from 'react-bootstrap';

function Books() {

  const [books, setBooks] = useState([]);
  const [areBooksLoaded, setAreBooksLoaded] = useState(false);

  useEffect(() => {
    const fetchBooks = () => {
      api.get('/books/')
        .then(response => {
          setBooks(response.data);
          setAreBooksLoaded(true);
        })
    }

    return () => fetchBooks();
  }, []);

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
      td = tr[i].getElementsByTagName("td")[filterBy - 1];
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
    <Container fluid className="mt-2 text-center px-3 mt-2 text-center px-3">
      <h1 className="display-5 text-start ms-3 border-bottom">Spis książek</h1>
      <Container fluid className='mt-4'>
        <Row>
          <Col className='col-auto me-auto d-flex'>
            <Form.Select aria-label="Default select example" id='filterBy'>
              <option value="1">Kod</option>
              <option value="2" selected>Tytuł</option>
              <option value="3">Liczba na stanie</option>
              <option value="4">Liczba wypożyczonych</option>
            </Form.Select>
            <Form.Control className='mx-2' type="search" placeholder="Szukaj" aria-label="Search" id='searchBar' onKeyUp={() => search()} />
          </Col>
        </Row>
      </Container>
      <Container fluid className="mt-4">
        {areBooksLoaded ? <BooksTable books={books} /> : <Spinner variant='border' size='lg' />}
      </Container>
    </Container>
  )
}

export default Books;