import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import $ from 'jquery';
import api from './Api';

function Rents() {

  const [isDeposit, setIsDeposit] = useState(false);
  const [dueDate, setDueDate] = useState(new Date().toISOString().slice(0, 10));
  const [rents, setRents] = useState([]);

  //const [selectedId, setSelectedId] = useState('');

  const fetchRents = async () => {
    const response = await api.get('/rent/')
    setRents(response.data)
  }

  useEffect(() => {
    document.getElementById('rents-href').classList.add('active');
  }, [])

  useEffect(() => {
    fetchRents()
  }, [])

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
    } else if (event.target.name === 'dueDate') {
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
      rentDate: rentalDate,
      dueDate: maxDate
    };

    api.post('/rent/', rentData)
    alert('Wypożyczenie dodane!')
    window.location.reload();
  }

  const handleEndRent = (selectedId) => {

    const confirmDeleteModBtn = document.getElementById('confirmDeleteModConfirm');
    const confirmDeleteModCancelBtn = document.getElementById('confirmDeleteModCancel');

    confirmDeleteModBtn.addEventListener('click', () => {
      console.log(selectedId);
      api.delete(`/rent/${selectedId}`);
      window.location.reload();
    });

    confirmDeleteModCancelBtn.addEventListener('click', () => {
      console.log('Anulowano');
    });
  }

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
      <h1 class="display-5 text-start ms-3 border-bottom">Wypożyczenia</h1>
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

          <div className='col col-auto'>
            <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#addRentModal">
              Nowe wypożyczenie
            </button>
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
              <th scope='col'>{'Kaucja (zł)'}</th>
              <th scope='col'>Data wypożyczenia</th>
              <th scope='col'>Termin</th>
              <th scope='col'>Status</th>
              <th scope='col'></th>
            </tr>
          </thead>
          <tbody>
            {rents.slice(0).reverse().map((rent, index) => {
              return (
                <tr id={rent.id} key={rent.id}>
                  <th scope='row'>{index + 1}</th>
                  <td>{rent.name}</td>
                  <td>{rent.lastName}</td>
                  <td>{rent.schoolClass}</td>
                  <td>{rent.bookTitle}</td>
                  <td>{rent.deposit}</td>
                  <td>{rent.rentDate}</td>
                  <td>{rent.dueDate}</td>
                  <td>Kara: 6zł</td>
                  <td><button className='btn btn-primary btn-sm' data-bs-toggle="modal" data-bs-target="#confirmDeleteMod" id={rent.id} onClick={() => handleEndRent(rent.id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16</svg>">
                      <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                    </svg></button></td>
                </tr>
              )

            })}
          </tbody>
        </table>
      </div>

      <div class="modal fade" tabindex="-1" id='confirmDeleteMod'>
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Potwierdzenie</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p className='fw-medium'>Czy na pewno chcesz zakończyć to wypożyczenie?</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id='confirmDeleteModCancel'>Anuluj</button>
              <button type="button" class="btn btn-primary" data-bs-dismiss="modal" id='confirmDeleteModConfirm'>Usuń</button>
            </div>
          </div>
        </div>
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
                  <input type="text" class="form-control" id="lastName" required />
                </div>
                <div class="mb-3">
                  <label for="schoolClass" class="form-label">Klasa</label>
                  <input type="text" class="form-control" id="schoolClass" required />
                </div>
                <div class="mb-3">
                  <label for="bookTitle" class="form-label">Tytuł książki</label>
                  <input type="text" class="form-control" id="bookTitle" required />
                </div>
                <div class="row mb-3 align-items-center">
                  <label for="deposit" class="form-label">Kaucja</label>
                  <div className='col pe-0'>
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" value="" id="isDeposit" name='isDeposit' onChange={handelIsDepositChange} />
                      <label class="form-check-label" for="flexCheckDefault">
                        Wypożyczenie z kaucją?
                      </label>
                    </div>
                  </div>
                  <div className='col ps-0'>
                    <input type="number" class="form-control" id="deposit" placeholder='Tylko cyfra' disabled required />
                  </div>
                </div>
                <div class="mb-3">
                  <label for="rentalDate" class="form-label">Data wypożyczenia</label>
                  <input type="date" class="form-control" id="rentalDate" value={new Date().toISOString().split('T')[0]} />
                </div>
                <div class="mb-3">
                  <label for="maxDate" class="form-label">Termin</label>
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
