import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Alert, Button, Modal, Table } from 'react-bootstrap';

function ChooseBookModal({ books, setSelectedBook, handleSelectBook, selectedBook, show, setShow, showAdd, isBookChosen }) {

  return (
    <Modal
      id='chooseBookModal'
      show={show}
      onHide={() => setShow(false)}
      backdrop="static"
      keyboard={false}
      scrollable={true}
      className='modal-xl'
    >
      <Modal.Header>
        <Modal.Title>Wybierz książkę</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Alert variant='info' className='sticky-top'>
          Wybrana książka: <strong>{selectedBook[1]}</strong>
        </Alert>
        <Table striped>
          <thead>
            <tr>
              <th scope='col'>Kod</th>
              <th scope='col'>Tytuł</th>
              <th scope='col'>Liczba na stanie</th>
              <th scope='col'>Liczba wypożyczonych</th>
              <th scope='col'></th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => {
              if (book.onStock !== 0) {
                return (
                  <tr key={book.code}>
                    <th scope='row'>{book.code}</th>
                    <td>{book.title}</td>
                    <td className='fw-bold' style={{ color: book.onStock > 0 ? 'MediumSeaGreen' : 'red' }}>{book.onStock}</td>
                    <td className='fw-bold' style={{ color: book.rented > 0 ? 'DodgerBlue' : 'white' }}>{book.rented}</td>
                    <td>
                      <button className='btn btn-sm btn-secondary' id={'book-' + book.code} onClick={() => handleSelectBook(book.code, book.title)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-lg" viewBox="0 0 16 16">
                          <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                )
              } else {
                return null;
              }
            })}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button type="button" variant='secondary' onClick={() => { setSelectedBook([]); setShow(false); showAdd(); }}>Cofnij</Button>
        <Button type="button" variant='primary' id='confirmBookSelection' onClick={() => { setShow(false); showAdd(); }} disabled={!isBookChosen}>
          Potwierdź
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ChooseBookModal;