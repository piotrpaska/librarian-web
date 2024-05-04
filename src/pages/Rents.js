import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import $ from 'jquery';
import api from './Api';
import ChooseBookModal from './modals/ChooseBookModal';
import RentsTable from './components/RentsTable';

function Rents() {

  const [isDeposit, setIsDeposit] = useState(false);
  const [rentDate, setRentDate] = useState(new Date().toISOString().slice(0, 10));
  const [dueDate, setDueDate] = useState(new Date().toISOString().slice(0, 10));
  const [rents, setRents] = useState([]);

  const [books, setBooks] = useState([]);

  const [selectedBook, setSelectedBook] = useState([]);

  const [chooseBookModalExec, setChooseBookModalExec] = useState('');

  const [selectedIdState, setSelectedIdState] = useState('');

  document.getElementById('rents-href').classList.add('active');

  useEffect(() => {
    if (selectedBook.length === 0) {
      $('#confirmBookSelection').prop('disabled', true);
    } else {
      $('#confirmBookSelection').prop('disabled', false);
    }
  }, [selectedBook]);

  useEffect(() => {
    const fetchRents = async () => {
      const response = await api.get('/rent/')
      setRents(response.data)
    }
    fetchRents()
  }, [])

  const handleSelectBook = (code, title) => {
    setSelectedBook([code, title]);
    const btn = document.getElementById('book-' + code);
    const buttons = document.querySelectorAll('button[id^="book-"]');
    buttons.forEach(btn => {
      btn.classList.remove('btn-success');
      btn.classList.add('btn-secondary');
    });
    btn.classList.remove('btn-secondary');
    btn.classList.add('btn-success');

    document.getElementById('bookTitleField').innerHTML = title
    document.getElementById('bookTitleField-edit').innerHTML = title
  }

  // Handle the change of the deposit checkbox
  const handelIsDepositChange = (event) => {
    if (event.target.name === 'isDeposit') {
      setIsDeposit(event.target.checked);
      if (!isDeposit) {
        $('input[name="deposit"]').prop('disabled', false);
        const twoWeeksFromToday = new Date(rentDate);
        twoWeeksFromToday.setDate(twoWeeksFromToday.getDate() + 14);
        setDueDate(twoWeeksFromToday.toISOString().slice(0, 10));
      } else {
        $('input[name="deposit"]').prop('disabled', true);
        setDueDate(rentDate);
      }
    } else if (event.target.name === 'dueDate') {
      const val = event.target.value;
      setDueDate(val);
      if (val !== rentDate) {
        setIsDeposit(true);
        $('input[name="deposit"]').prop('disabled', false);
        $('input[name="isDeposit"]').prop('checked', true);
      } else {
        setIsDeposit(false);
        $('input[name="deposit"]').prop('disabled', true);
        $('input[name="isDeposit"]').prop('checked', false);
      }
    } else if (event.target.name === 'rentDate') {
      setRentDate(event.target.value);
      if (isDeposit) {
        const twoWeeksFromToday = new Date(event.target.value);
        twoWeeksFromToday.setDate(twoWeeksFromToday.getDate() + 14);
        setDueDate(twoWeeksFromToday.toISOString().slice(0, 10));
      } else {
        setDueDate(event.target.value);
      }
    }
  };

  // Handle the submit of the add form
  function onSubmitAddForm(e) {
    e.preventDefault();

    const name = $('#name').val();
    const lastName = $('#lastName').val();
    const schoolClass = $('#schoolClass').val();
    let deposit = $('#deposit').val()
    const rentalDate = rentDate;
    var maxDate = dueDate;

    if (!isDeposit) {
      deposit = 'Brak';
      maxDate = 'Wypożyczenie jednodniowe';
    }

    const rentData = {
      name: name,
      lastName: lastName,
      schoolClass: schoolClass,
      bookCode: selectedBook[0],
      deposit: deposit,
      rentDate: rentalDate,
      dueDate: maxDate,
      isLongRent: isDeposit
    };
    api.post('/rent/', rentData)
    api.get('/book-rent/' + selectedBook[0])
    alert('Wypożyczenie dodane!')
    window.location.reload();
  }

  // Handle the end of the rent
  const handleEndRent = (selectedId, bookCode) => {

    const confirmDeleteModBtn = document.getElementById('confirmDeleteModConfirm');

    confirmDeleteModBtn.addEventListener('click', () => {
      api.delete(`/rent/${selectedId}`);
      api.get('/book-return/' + bookCode)
      window.location.reload();
    });
  }

  // Handle the edit of the rent
  const handleEditRent = async (selectedId) => {
    setSelectedIdState(selectedId);

    async function getBook(code) {
      try {
        const response = await api.get(`/book/${code}`);
        console.log(response.data);
        return response.data.title;
      } catch (error) {
        console.error(error);
      }
    }

    const response = await api.get(`/one-rent/${selectedId}`);
    const rentData = response.data;

    console.log(rentData);

    const name = $('#name-edit');
    const lastName = $('#lastName-edit');
    const schoolClass = $('#schoolClass-edit');

    await setSelectedBook([rentData.bookCode, await getBook(rentData.bookCode)]);
    document.getElementById('bookTitleField-edit').innerHTML = await getBook(rentData.bookCode);

    const isDeposit = $('#isDeposit-edit');
    const deposit = $('#deposit-edit');
    const rentalDate = $('#rentalDate-edit');
    const maxDate = $('#maxDate-edit');

    name.val(rentData.name);
    lastName.val(rentData.lastName);
    schoolClass.val(rentData.schoolClass);
    isDeposit.prop('checked', rentData.isLongRent);
    rentalDate.val(rentData.rentDate);

    if (!rentData.isLongRent) {
      deposit.val('')
      deposit.prop('disabled', true);
      parseInt(maxDate.val(rentData.rentDate));
    } else {
      maxDate.val(rentData.dueDate);
      deposit.prop('disabled', false);
      deposit.val(rentData.deposit);
    }
  }

  // Handle the submit of the edit form
  const onSubmitEditForm = (e) => {

    const selectedId = selectedIdState;

    e.preventDefault();

    const name = $('#name-edit').val();
    const lastName = $('#lastName-edit').val();
    const schoolClass = $('#schoolClass-edit').val();
    let deposit = $('#deposit-edit').val()
    const rentalDate = $('#rentalDate-edit').val();;
    var maxDate = $('#maxDate-edit').val();

    if (!isDeposit) {
      deposit = 'Brak';
      maxDate = 'Wypożyczenie jednodniowe';
    }

    const rentData = {
      name: name,
      lastName: lastName,
      schoolClass: schoolClass,
      bookCode: selectedBook[0],
      deposit: deposit,
      rentDate: rentalDate,
      dueDate: maxDate,
      isLongRent: isDeposit
    };

    api.put(`/rent/${selectedId}`, rentData)
    alert('Wypożyczenie zaktualizowane!')
    window.location.reload();
  }

  // Handle the search
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

  // Calculate the rent status
  const calculateRentStatus = (rentRentalDate, rentDueDate, isLongRent) => {
    var rentDate, dueDate, currentDate, diff;
    rentDate = new Date(rentRentalDate).setHours(0, 0, 0, 0);
    currentDate = new Date().setHours(0, 0, 0, 0);

    if (isLongRent) {
      dueDate = new Date(rentDueDate).setHours(0, 0, 0, 0);
      if (currentDate > dueDate) {
        diff = currentDate - dueDate;
        return `Opóźnienie: ${Math.floor((diff) / (24 * 3600 * 1000))} dni`;
      } else {
        return 'OK';
      }
    } else {
      if (currentDate > rentDate) {
        diff = currentDate - rentDate;
        return `Opóźnienie: ${Math.floor((diff) / (24 * 3600 * 1000))} dni`;
      } else {
        return `OK`;
      }
    }
  }

  const resetDates = () => {
    setRentDate(new Date().toISOString().slice(0, 10));
    setDueDate(new Date().toISOString().slice(0, 10));
    const buttons = document.querySelectorAll('button[id^="book-"]');
    buttons.forEach(btn => {
      btn.classList.remove('btn-success');
      btn.classList.add('btn-secondary');
    });

    setSelectedBook([]);
    document.getElementById('bookTitleField').innerHTML = '';
  }

  const fetchBooks = async () => {
    const response = await api.get('/books/')
    setBooks(response.data)
  }

  useEffect(() => {
    fetchBooks()
  }, [])

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
        {/* Render the rents table */}
        <RentsTable rents={rents} handleEndRent={handleEndRent} handleEditRent={handleEditRent} calculateRentStatus={calculateRentStatus} />
      </div>

      <div class="modal fade" tabindex="-1" id='confirmDeleteMod' data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Potwierdzenie</h5>
            </div>
            <div class="modal-body">
              <p className='fw-medium'>Czy na pewno chcesz zakończyć to wypożyczenie?</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id='confirmDeleteModCancel'>Anuluj</button>
              <button type="button" class="btn btn-primary" data-bs-dismiss="modal" id='confirmDeleteModConfirm'>Zakończ</button>
            </div>
          </div>
        </div>
      </div>
      
      <div class="modal fade" id="addRentModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Nowe wypożyczenie</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={resetDates}></button>
            </div>
            <form id='addRentForm' onSubmit={onSubmitAddForm}>
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
                  <div class="row">
                    <div className='col-auto'>
                      <button type="button" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#chooseBookModal" href="#lost"
                        onClick={() => { fetchBooks(); setChooseBookModalExec('addRent') }}>Wybierz książkę</button>
                    </div>
                    <div className='col'>
                      <div id="passwordHelpBlock" class="form-text">
                        Wybrana książka:
                      </div>
                      <p id='bookTitleField'></p>
                    </div>
                  </div>
                </div>
                <div class="row mb-3 align-items-center">
                  <label for="deposit" class="form-label">Kaucja</label>
                  <div className='col pe-0'>
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" value={isDeposit} id="isDeposit" name='isDeposit' onChange={handelIsDepositChange} />
                      <label class="form-check-label" for="flexCheckDefault">
                        Wypożyczenie z kaucją?
                      </label>
                    </div>
                  </div>
                  <div className='col ps-0'>
                    <input type="number" class="form-control" id="deposit" name='deposit' placeholder='Tylko cyfra' disabled required />
                  </div>
                </div>
                <div class="mb-3">
                  <label for="rentalDate" class="form-label">Data wypożyczenia</label>
                  <input type="date" class="form-control" id="rentDate" name='rentDate' value={rentDate} onChange={handelIsDepositChange} />
                </div>
                <div class="mb-3">
                  <label for="maxDate" class="form-label">Termin</label>
                  <input type="date" class="form-control" id="maxDate" name='dueDate' value={dueDate} onChange={handelIsDepositChange} />
                </div>

              </div>
              <div class="modal-footer">
                <button type="button" id='modalCancel' class="btn btn-secondary" data-bs-dismiss="modal" onClick={() => { resetDates(); setSelectedBook([]); }} >Anuluj</button>
                <button type="submit" id='modalSubmit' class="btn btn-primary">Zatwierdź</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div class="modal fade" id="editRentModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-keyboard="false">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Edycja wypożyczenia</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={resetDates}></button>
            </div>
            <form id='editRentForm' onSubmit={onSubmitEditForm}>
              <div class="modal-body text-start">

                <div class="mb-3">
                  <label for="name" class="form-label">Imię</label>
                  <input type="text" class="form-control" id="name-edit" required />
                </div>
                <div class="mb-3">
                  <label for="lastName" class="form-label">Nazwisko</label>
                  <input type="text" class="form-control" id="lastName-edit" required />
                </div>
                <div class="mb-3">
                  <label for="schoolClass" class="form-label">Klasa</label>
                  <input type="text" class="form-control" id="schoolClass-edit" required />
                </div>
                <div class="mb-3">
                  <div id="passwordHelpBlock" class="form-text">
                    Wybrana książka:
                  </div>
                  <p id='bookTitleField-edit'></p>
                </div>
                <div class="row mb-3 align-items-center">
                  <label for="deposit" class="form-label">Kaucja</label>
                  <div className='col pe-0'>
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" value={isDeposit} id="isDeposit-edit" name='isDeposit' onChange={handelIsDepositChange} />
                      <label class="form-check-label" for="flexCheckDefault">
                        Wypożyczenie z kaucją?
                      </label>
                    </div>
                  </div>
                  <div className='col ps-0'>
                    <input type="number" class="form-control" id="deposit-edit" name='deposit' placeholder='Tylko cyfra' disabled required />
                  </div>
                </div>
                <div class="mb-3">
                  <label for="rentalDate" class="form-label">Data wypożyczenia</label>
                  <input type="date" class="form-control" id="rentalDate-edit" name='rentDate' value={rentDate} onChange={handelIsDepositChange} />
                </div>
                <div class="mb-3">
                  <label for="maxDate" class="form-label">Termin</label>
                  <input type="date" class="form-control" id="maxDate-edit" name='dueDate' value={dueDate} onChange={handelIsDepositChange} />
                </div>

              </div>
              <div class="modal-footer">
                <button type="button" id='modalCancel' class="btn btn-secondary" data-bs-dismiss="modal" onClick={resetDates}>Anuluj</button>
                <button type="submit" id='modalSubmit' class="btn btn-primary">Zatwierdź</button>
              </div>
            </form>
          </div>
        </div>
      </div >
      <ChooseBookModal books={books} selectedBook={selectedBook} setSelectedBook={setSelectedBook} handleSelectBook={handleSelectBook} modalExec={chooseBookModalExec} />
    </div>
  );
}

export default Rents;
