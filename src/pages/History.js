import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import $ from 'jquery';

$(document).ready(function () {
  // Do something on start
});

function search() {
  alert('Search');
}

const exmData = [
  {
    "name": "Karolina",
    "lastName": "Owczarzak",
    "schoolClass": "Nauczyciel",
    "bookTitle": "Mam prawo i nie zawaham sie go uzyc",
    "deposit": "10zl",
    "rentalDate": "09.10.2023",
    "maxDate": "23.10.2023"
  },
  {
    "name": "Emilian",
    "lastName": "Wieruszewski",
    "schoolClass": "7a",
    "bookTitle": "Niepowstrzymani",
    "deposit": "Brak",
    "rentalDate": "20.12.2023",
    "maxDate": "14:10"
  }
]

function History() {
  return (
    
    <div className="container-fluid mt-2 text-center px-3">
      <h1 class="display-5 text-start ms-3 border-bottom">Historia</h1>
      <div className='container-fluid mt-4'>
        <div className='row'>
          <div className='col col-auto'>
            <button type="button" class="btn btn-success">Nowe wypożyczenie</button>
          </div>

          <div className='col col-auto ms-auto'>
            <form class="d-flex" role="search" onSubmit={search}>
              <select class="form-select" aria-label="Default select example">
                <option value="1" selected>Imię</option>
                <option value="2">Nazwisko</option>
                <option value="3">Klasa</option>
                <option value="4">Tytuł książki</option>
              </select>
              <input class="form-control mx-2" type="search" placeholder="Szukaj" aria-label="Search" />
              <button class="btn btn-outline-success" type="submit">Szukaj</button>
            </form>
          </div>
        </div>
      </div>
      <div className="container-fluid mt-4">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope='col'>ID</th>
              <th scope='col'>Imię</th>
              <th scope='col'>Nazwisko</th>
              <th scope='col'>Klasa</th>
              <th scope='col'>Tytuł książki</th>
              <th scope='col'>Kaucja</th>
              <th scope='col'>Data wypożyczenia</th>
              <th scope='col'>Data do zwrotu</th>
              <th scope='col'>Status</th>
            </tr>
          </thead>
          <tbody>
            {exmData.map((doc, index) => (
              <tr>
                <th scope='row'>{index + 1}</th>
                <td>{doc.name}</td>
                <td>{doc.lastName}</td>
                <td>{doc.schoolClass}</td>
                <td>{doc.bookTitle}</td>
                <td>{doc.deposit}</td>
                <td>{doc.rentalDate}</td>
                <td>{doc.maxDate}</td>
                <td>OK</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default History;
