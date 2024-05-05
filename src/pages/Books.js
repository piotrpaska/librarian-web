import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import $ from 'jquery';
import api from './Api';
import { Col, Container, Row, Form, Button, Table } from 'react-bootstrap';

function Books() {

  const [books, setBooks] = useState([]);

  useEffect(() => {
    document.getElementById('books-href').classList.add('active');
  }, [])

  const fetchBooks = async () => {
    const response = await api.get('/books/')
    setBooks(response.data)
  }

  useEffect(() => {
    fetchBooks();
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
      <h1 class="display-5 text-start ms-3 border-bottom">Spis książek</h1>
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
        <Table striped id='table'>
          <thead>
            <tr>
              <th scope='col'>Kod</th>
              <th scope='col'>Tytuł</th>
              <th scope='col'>Liczba na stanie</th>
              <th scope='col'>Liczba wypożyczonych</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => {
              return (
                <tr key={book.id}>
                  <td scope='row'>{book.code}</td>
                  <td>{book.title}</td>
                  <td className='fw-bold' style={{ color: book.onStock > 0 ? 'MediumSeaGreen' : 'red' }}>{book.onStock}</td>
                  <td className='fw-bold' style={{ color: book.rented > 0 ? 'DodgerBlue' : 'white' }}>{book.rented}</td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </Container>
    </Container>
  )
}

export default Books;