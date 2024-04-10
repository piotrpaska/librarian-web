import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

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

function App() {
  return (
    <div className="container-fluid mt-2 text-center">
      <h1>Hello world!</h1>
      <div className="container-fluid">
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
