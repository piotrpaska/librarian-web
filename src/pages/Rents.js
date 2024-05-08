import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import api from './Api';
import ChooseBookModal from './modals/ChooseBookModal';
import RentsTable from './components/RentsTable';
import { Container, Row, Col, Form, Button, Modal } from 'react-bootstrap';

function Rents() {

  const [isDeposit, setIsDeposit] = useState(false);
  const [rentDate, setRentDate] = useState(new Date().toISOString().slice(0, 10));
  const [dueDate, setDueDate] = useState(new Date().toISOString().slice(0, 10));
  const [rents, setRents] = useState([]);

  const [books, setBooks] = useState([]);

  const [selectedBook, setSelectedBook] = useState([]);

  const [selectedIdToEdit, setSelectedIdToEdit] = useState('');

  //////////////////////////////// Modal states ////////////////////////////////
  const [showEndRent, setShowEndRent] = useState(false);

  const handleClose_endRent = () => setShowEndRent(false);
  const handleShow_endRent = () => setShowEndRent(true);

  const [showAddRent, setShowAddRent] = useState(false);
  const handleClose_addRent = () => setShowAddRent(false);
  const handleShow_addRent = () => setShowAddRent(true);

  const [showEditRent, setShowEditRent] = useState(false);
  const handleClose_editRent = () => setShowEditRent(false);
  const handleShow_editRent = () => setShowEditRent(true);

  const [showBookModal, setShowBookModal] = useState(false);
  //const handleCloseBookModal = () => setShowBookModal(false);
  const handleShowBookModal = () => setShowBookModal(true);
  /////////////////////////////////////////////////////////////////////////////
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [schoolClass, setSchoolClass] = useState('');
  const [deposit, setDeposit] = useState('');

  const [rentToDelete, setRentToDelete] = useState([]);

  document.getElementById('rents-href').classList.add('active');

  const [isBookChosen, setIsBookChosen] = useState(false);

  useEffect(() => {
    const fetchRents = async () => {
      const response = await api.get('/rent/')
      setRents(response.data)
    }
    fetchRents()
  }, [])

  useEffect(() => {
    if (document.getElementById('bookTitleField')) {
      if (selectedBook.length === 0) {
        document.getElementById('bookTitleField').innerHTML = '';
      } else {
        document.getElementById('bookTitleField').innerHTML = selectedBook[1];
      }
    }
  }, [showAddRent]);

  useEffect(() => {
    if (selectedBook.length === 0) {
      setIsBookChosen(false);
    } else {
      setIsBookChosen(true);
    }
  }, [selectedBook]);

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
  }

  useEffect(() => {
    if (isDeposit) {
      const twoWeeksFromToday = new Date(rentDate);
      twoWeeksFromToday.setDate(twoWeeksFromToday.getDate() + 14);
      setDueDate(twoWeeksFromToday.toISOString().slice(0, 10));
    } else {
      setDueDate(rentDate);
    }
  }, [isDeposit]);

  useEffect(() => {
    if (rentDate > new Date().toISOString().slice(0, 10)) {
      setRentDate(new Date().toISOString().slice(0, 10));
      if (isDeposit) {
        const twoWeeksFromToday = new Date(new Date().toISOString().slice(0, 10));
        twoWeeksFromToday.setDate(twoWeeksFromToday.getDate() + 14);
        setDueDate(twoWeeksFromToday.toISOString().slice(0, 10));
      } else {
        setDueDate(new Date().toISOString().slice(0, 10));
      }
    } else {
      if (rentDate !== dueDate) {
        if (rentDate > dueDate) {
          setDueDate(rentDate);
        } else {
          setIsDeposit(true);
          const twoWeeksFromToday = new Date(rentDate);
          twoWeeksFromToday.setDate(twoWeeksFromToday.getDate() + 14);
          setDueDate(twoWeeksFromToday.toISOString().slice(0, 10));
        }
      } else {
        setIsDeposit(false);
      }
    }
  }, [rentDate]);

  useEffect(() => {
    if (rentDate !== dueDate) {
      if (rentDate > dueDate) {
        setDueDate(rentDate);
        setIsDeposit(false);
      } else {
        setIsDeposit(true);
      }
    } else {
      setIsDeposit(false);
    }
  }, [dueDate]);

  // Handle the submit of the add form
  function onSubmitAddForm(e) {
    e.preventDefault();

    const rentData = {
      name: name,
      lastName: lastName,
      schoolClass: schoolClass,
      bookCode: selectedBook[0],
      deposit: isDeposit ? deposit : 'Brak',
      rentDate: rentDate,
      dueDate: isDeposit ? dueDate : 'Wypożyczenie jednodniowe',
      isLongRent: isDeposit
    };
    api.post('/rent/', rentData)
    api.get('/book-rent/' + selectedBook[0])
    alert('Wypożyczenie dodane!')
    window.location.reload();
  }

  // Handle the end of the rent
  const handleEndRent = (selectedId, bookCode) => {

    handleShow_endRent(true);

    setRentToDelete([selectedId, bookCode]);
  }

  const handleEndRentConfirm = () => {
    api.delete(`/rent/${rentToDelete[0]}`);
    api.get('/book-return/' + rentToDelete[1]);
    setRentToDelete([]);
    window.location.reload();
  }

  // Handle the edit of the rent
  const handleEditRent = async (selectedId) => {
    setSelectedIdToEdit(selectedId);

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

    await setSelectedBook([rentData.bookCode, await getBook(rentData.bookCode)]);
    const bookTitleField = document.getElementById('bookTitleField-edit');
    if (bookTitleField) {
      bookTitleField.innerHTML = await getBook(rentData.bookCode);
    }

    setName(rentData.name);
    setLastName(rentData.lastName);
    setSchoolClass(rentData.schoolClass);
    setIsDeposit(rentData.isLongRent);

    setRentDate(rentData.rentDate);

    if (rentData.isLongRent === false) {
      setDeposit('');
      setIsDeposit(false);
      setDueDate(new Date(rentData.rentDate).toISOString().slice(0, 10));
    } else {
      setDueDate(new Date(rentData.dueDate).toISOString().slice(0, 10));
      setIsDeposit(true);
      setDeposit(rentData.deposit);
    }
  }

  // Handle the submit of the edit form
  const onSubmitEditForm = (e) => {
    e.preventDefault();

    const rentData = {
      name: name,
      lastName: lastName,
      schoolClass: schoolClass,
      deposit: isDeposit ? deposit : 'Brak',
      rentDate: rentDate,
      dueDate: isDeposit ? dueDate : 'Wypożyczenie jednodniowe',
      isLongRent: isDeposit
    };

    api.put(`/rent/${selectedIdToEdit}`, rentData)
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

  const resetFormStates = () => {
    setName('');
    setLastName('');
    setSchoolClass('');
    setDeposit('');
    setRentDate(new Date().toISOString().slice(0, 10));
    setDueDate(new Date().toISOString().slice(0, 10));
    setIsDeposit(false);
    const buttons = document.querySelectorAll('button[id^="book-"]');
    buttons.forEach(btn => {
      btn.classList.remove('btn-success');
      btn.classList.add('btn-secondary');
    });

    setSelectedBook([]);
    if (document.getElementById('bookTitleField')) {
      document.getElementById('bookTitleField').innerHTML = '';
    }
    if (document.getElementById('bookTitleField-edit')) {
      document.getElementById('bookTitleField-edit').innerHTML = '';
    }
  }

  const fetchBooks = async () => {
    const response = await api.get('/books/')
    setBooks(response.data)
  }

  useEffect(() => {
    fetchBooks()
  }, [])

  return (

    <Container fluid className="mt-2 text-center px-3">
      <h1 className="display-5 text-start ms-3 border-bottom">Wypożyczenia</h1>
      <Container fluid className='mt-4'>
        <Row>

          <Col className='col-auto me-auto d-flex'>
            <Form.Select aria-label="Default select example" id='filterBy'>
              <option value="1" selected>Imię</option>
              <option value="2">Nazwisko</option>
              <option value="3">Klasa</option>
              <option value="4">Tytuł książki</option>
            </Form.Select>
            <Form.Control className='mx-2' type="search" placeholder="Szukaj" aria-label="Search" id='searchBar' onKeyUp={() => search()} />
          </Col>

          <Col className='col col-auto'>
            <Button type="button" variant='success' onClick={handleShow_addRent}>
              Nowe wypożyczenie
            </Button>
          </Col>

        </Row>
      </Container>
      <Container fluid className="mt-4">
        {/* Render the rents table */}
        <RentsTable showEditRent={handleShow_editRent} rents={rents} handleEndRent={handleEndRent} handleEditRent={handleEditRent} calculateRentStatus={calculateRentStatus} />
      </Container>

      <Modal
        show={showEndRent}
        onHide={handleClose_endRent}
        backdrop="static"
        keyboard={false}
        id='confirmDeleteMod'
      >
        <Modal.Header>
          <Modal.Title>Potwierdzenie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className='fw-medium'>Czy na pewno chcesz zakończyć to wypożyczenie?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button type="button" variant='secondary' onClick={handleClose_endRent}>Anuluj</Button>
          <Button type="button" variant='primary' data-bs-dismiss="modal" onClick={() => { handleClose_endRent(); handleEndRentConfirm(); }}>Zakończ</Button>
        </Modal.Footer>
      </Modal>

      <Modal
        id="addRentModal"
        show={showAddRent}
        onHide={handleClose_addRent}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header>
          <h1 className="modal-title fs-5" id="exampleModalLabel">Nowe wypożyczenie</h1>
        </Modal.Header>
        <Form onSubmit={onSubmitAddForm}>
          <Modal.Body className="text-start">

            <Form.Group className="mb-3" controlId='addRent-name'>
              <Form.Label>Imię</Form.Label>
              <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3" controlId='addRent-lastName'>
              <Form.Label>Nazwisko</Form.Label>
              <Form.Control type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3" controlId='addRent-schoolClass'>
              <Form.Label>Klasa</Form.Label>
              <Form.Control type="text" value={schoolClass} onChange={(e) => setSchoolClass(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Row>
                <Col className='col-auto'>
                  <Button type="button" variant='outline-info'
                    onClick={() => { fetchBooks(); handleShowBookModal(); handleClose_addRent(); }}>Wybierz książkę</Button>
                </Col>
                <Col>
                  <Form.Text muted>
                    Wybrana książka:
                  </Form.Text>
                  <p id='bookTitleField'></p>
                </Col>
              </Row>
            </Form.Group>
            <Form.Group className="row mb-3 align-items-center">
              <Form.Label>Kaucja</Form.Label>
              <Col className='col pe-0'>
                <Form.Check
                  inline
                  label="Wypożyczenie z kaucją?"
                  type="checkbox"
                  onChange={(e) => setIsDeposit(e.target.checked)}
                  checked={isDeposit}
                />
              </Col>
              <Col className='col ps-0'>
                <Form.Control type="number" placeholder='Tylko cyfra' disabled={!isDeposit} required />
              </Col>
            </Form.Group>
            <Form.Group className="mb-3" controlId='addRent-rentDate'>
              <Form.Label>Data wypożyczenia</Form.Label>
              <Form.Control type="date" value={rentDate} onChange={(e) => setRentDate(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Termin</Form.Label>
              <Form.Control type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
            </Form.Group>

          </Modal.Body>
          <Modal.Footer>
            <Button type="button" variant='secondary' onClick={() => { resetFormStates(); setSelectedBook([]); handleClose_addRent(); }} >Anuluj</Button>
            <Button type="submit" variant='primary'>Zatwierdź</Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <Modal
        id="editRentModal"
        show={showEditRent}
        onHide={handleClose_editRent}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header>
          <h1 className="modal-title fs-5" id="exampleModalLabel">Edycja wypożyczenia</h1>
        </Modal.Header>
        <Form onSubmit={onSubmitEditForm}>
          <Modal.Body className="text-start">

            <Form.Group className="mb-3" controlId='addRent-name'>
              <Form.Label>Imię</Form.Label>
              <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3" controlId='addRent-lastName'>
              <Form.Label>Nazwisko</Form.Label>
              <Form.Control type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3" controlId='addRent-schoolClass'>
              <Form.Label>Klasa</Form.Label>
              <Form.Control type="text" value={schoolClass} onChange={(e) => setSchoolClass(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Text muted>
                Wybrana książka:
              </Form.Text>
              <p id='bookTitleField-edit'></p>
            </Form.Group>
            <Form.Group className="row mb-3 align-items-center">
              <Form.Label>Kaucja</Form.Label>
              <Col className='col pe-0'>
                <Form.Check
                  inline
                  label="Wypożyczenie z kaucją?"
                  type="checkbox"
                  onChange={(e) => setIsDeposit(e.target.checked)}
                  checked={isDeposit}
                />
              </Col>
              <Col className='col ps-0'>
                <Form.Control type="number" placeholder='Tylko cyfra' disabled={!isDeposit} required />
              </Col>
            </Form.Group>
            <Form.Group className="mb-3" controlId='addRent-rentDate'>
              <Form.Label>Data wypożyczenia</Form.Label>
              <Form.Control type="date" value={rentDate} onChange={(e) => setRentDate(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Termin</Form.Label>
              <Form.Control type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
            </Form.Group>

          </Modal.Body>
          <Modal.Footer>
            <Button type="button" variant='secondary' onClick={() => { resetFormStates(); setSelectedBook([]); handleClose_editRent(); }} >Anuluj</Button>
            <Button type="submit" variant='primary'>Zatwierdź</Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <ChooseBookModal isBookChosen={isBookChosen} show={showBookModal} showEdit={handleShow_editRent}
        showAdd={handleShow_addRent} setShow={setShowBookModal} books={books} selectedBook={selectedBook} setSelectedBook={setSelectedBook} handleSelectBook={handleSelectBook} />
    </Container>
  );
}

export default Rents;
