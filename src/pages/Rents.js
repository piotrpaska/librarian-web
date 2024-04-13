import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import $ from 'jquery';

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

function Rents() {
  
  const [isDeposit, setIsDeposit] = useState(false);
  const [dueDate, setDueDate] = useState(new Date().toISOString().slice(0, 10));

  const handelIsDepositChange = (event) => {
    setIsDeposit(event.target.checked);

    if (event.target.name === 'isDeposit') {
      if (!isDeposit) {
        $('#deposit').prop('disabled', false);
        const twoWeeksFromToday = new Date();
        twoWeeksFromToday.setDate(twoWeeksFromToday.getDate() + 14);
        setDueDate(twoWeeksFromToday.toISOString().slice(0, 10));
      } else {
        $('#deposit').prop('disabled', true);
        setDueDate(new Date().toISOString().slice(0, 10));
      }
    }else if (event.target.name === 'dueDate') {
      setDueDate(event.target.value);
    }
  };

  function onSubmitForm(e) {
    e.preventDefault();

    const name = $('#name').val();
    const lastName = $('#lastName').val();
    const schoolClass = $('#schoolClass').val();
    const bookTitle = $('#bookTitle').val();
    let deposit = $('#deposit').val();
    const rentalDate = $('#rentalDate').val();;
    const maxDate = $('#maxDate').val();

    if (!isDeposit) {
      deposit = 'Brak';
    }

    const rentData = {
      name: name,
      lastName: lastName,
      schoolClass: schoolClass,
      bookTitle: bookTitle,
      deposit: deposit,
      rentalDate: rentalDate,
      maxDate: maxDate
    };
    alert('Wypożyczenie dodane!')
    // TODO: Send rent data to mongo here
    window.location.reload();
  }

  return (

    <div className="container-fluid mt-2 text-center px-3">
      <h1 class="display-5 text-start ms-3 border-bottom">Wypożyczenia</h1>
      <div className='container-fluid mt-4'>
        <div className='row'>
          <div className='col col-auto'>
            <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#addRentModal">
              Nowe wypożyczenie
            </button>
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

      <div class="modal fade" id="addRentModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form id='addRentForm' onSubmit={onSubmitForm}>
              <div class="modal-body text-start">

                <div class="mb-3">
                  <label for="name" class="form-label">Imię</label>
                  <input type="text" class="form-control" id="name" required />
                </div>
                <div class="mb-3">
                  <label for="lastName" class="form-label">Nazwisko</label>
                  <input type="text" class="form-control" id="lastName" required/>
                </div>
                <div class="mb-3">
                  <label for="schoolClass" class="form-label">Klasa</label>
                  <input type="text" class="form-control" id="schoolClass" required/>
                </div>
                <div class="mb-3">
                  <label for="bookTitle" class="form-label">Tytuł książki</label>
                  <input type="text" class="form-control" id="bookTitle" required/>
                </div>
                <div class="row mb-3 align-items-center">
                  <label for="deposit" class="form-label">Kaucja</label>
                  <div className='col pe-0'>
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" value="" id="isDeposit" name='isDeposit' onChange={handelIsDepositChange}/>
                      <label class="form-check-label" for="flexCheckDefault">
                        Wypożyczenie z kaucją?
                      </label>
                    </div>
                  </div>
                  <div className='col ps-0'>
                    <input type="number" class="form-control" id="deposit" placeholder='Tylko cyfra' disabled required/>
                  </div>
                </div>
                <div class="mb-3">
                  <label for="rentalDate" class="form-label">Data wypożyczenia</label>
                  <input type="date" class="form-control" id="rentalDate" value={new Date().toISOString().split('T')[0]} />
                </div>
                <div class="mb-3">
                  <label for="maxDate" class="form-label">Data do zwrotu</label>
                  <input type="date" class="form-control" id="maxDate" name='dueDate' value={dueDate} onChange={handelIsDepositChange} />
                </div>

              </div>
              <div class="modal-footer">
                <button type="button" id='modalCancel' class="btn btn-secondary" data-bs-dismiss="modal">Anuluj</button>
                <button type="submit" id='modalSubmit' class="btn btn-primary">Zatwierdź</button>
              </div>
            </form>
          </div>
        </div>
      </div >
    </div>
      );
}

export default Rents;
