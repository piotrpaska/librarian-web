import { useEffect, useState, useMemo } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

function ChooseBookModal({ books, handleSelectBook}) {

  const html = useMemo(() => (
    <div class="modal fade" tabindex="-1" id='chooseBookModal' aria-labelledby="exampleModalLabel" aria-hidden="true" data-keyboard="false" data-backdrop="static">
        <div class="modal-dialog modal-xl">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Wybierz książkę</h5>
            </div>
            <div class="modal-body">
              <table className="table table-striped" id='table'>
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
                        <tr>
                          <th scope='row'>{book.code}</th>
                          <td>{book.title}</td>
                          <td className='fw-bold' style={{ color: book.onStock > 0 ? 'MediumSeaGreen' : 'red' }}>{book.onStock}</td>
                          <td className='fw-bold' style={{ color: book.rented > 0 ? 'DodgerBlue' : 'white' }}>{book.rented}</td>
                          <td>
                            <button className='btn btn-sm btn-secondary' id={'book-' + book.code}  onClick={() => handleSelectBook(book.code, book.title)}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
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
              </table>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#addRentModal">Cofnij</button>
              <button type="button" class="btn btn-primary" id='confirmBookSelection' data-bs-toggle="modal" data-bs-target="#addRentModal" disabled>
                Potwierdź
              </button>
            </div>
          </div>
        </div>
      </div>
  ), [books]);

  return html;
}

export default ChooseBookModal;