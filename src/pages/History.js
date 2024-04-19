import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import api from './Api';

function History() {

  const [rents, setRents] = useState([]);

  useEffect(() => {
    document.getElementById('history-href').classList.add('active');
  }, [])

  const fetchRents = async () => {
    const response = await api.get('/history/')
    setRents(response.data)
  }

  useEffect(() => {
    fetchRents()
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

    <div className="container-fluid mt-2 text-center px-3">
      <h1 className="display-5 text-start ms-3 border-bottom">Historia</h1>
      <div className='container-fluid mt-4'>
        <div className='row'>
          <div className='col col-auto me-auto d-flex'>
            <select class="form-select" aria-label="Default select example" id='filterBy'>
              <option value="1" selected>Imię</option>
              <option value="2">Nazwisko</option>
              <option value="3">Klasa</option>
              <option value="4">Tytuł książki</option>
            </select>
            <input class="form-control mx-2" type="search" placeholder="Szukaj" aria-label="Search" id='searchBar' onKeyUp={() => search()} />
          </div>
        </div>
      </div>
      <div className="container-fluid mt-4">
        <table className="table table-striped" id='table'>
          <thead>
            <tr>
              <th scope='col'>ID</th>
              <th scope='col'>Imię</th>
              <th scope='col'>Nazwisko</th>
              <th scope='col'>Klasa</th>
              <th scope='col'>Tytuł książki</th>
              <th scope='col'>Kaucja</th>
              <th scope='col'>Data wypożyczenia</th>
              <th scope='col'>Termin</th>
              <th scope='col'>Data zwrotu</th>
            </tr>
          </thead>
          <tbody>
            {rents.slice(0).reverse().map((doc, index) => (
              <tr key={doc.id}>
                <th scope='row'>{index + 1}</th>
                <td>{doc.name}</td>
                <td>{doc.lastName}</td>
                <td>{doc.schoolClass}</td>
                <td>{doc.bookTitle}</td>
                <td>{doc.deposit}</td>
                <td>{doc.rentalDate}</td>
                <td>{doc.maxDate}</td>
                <td>{doc.returnDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default History;
