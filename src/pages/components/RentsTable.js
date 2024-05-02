import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import api from "../Api";
import React, { useEffect } from 'react';

export default function RentsTable({ rents, handleEndRent, handleEditRent, calculateRentStatus }) {
  return (
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
        {rents.slice(0).reverse().map((rent, index) => <RenderRentRow rent={rent} index={index} handleEditRent={handleEditRent} handleEndRent={handleEndRent} calculateRentStatus={calculateRentStatus} />)}
      </tbody>
    </table>
  )
}

function RenderRentRow({ rent, index, handleEndRent, handleEditRent, calculateRentStatus}) {

  const [bookTitle, setBookTitle] = React.useState('');

  async function getBookTitle(code) {
    const book = await api.get(`/book/${code}`);
    console.log(book.data)
    setBookTitle(book.data.title);
  }

  useEffect(() => {
    getBookTitle(rent.bookCode);
  }, [bookTitle]);

  return (
    <tr key={rent.id}>
      <th scope='row'>{index + 1}</th>
      <td>{rent.name}</td>
      <td>{rent.lastName}</td>
      <td>{rent.schoolClass}</td>
      <td>{bookTitle}</td>
      <td>{rent.deposit}</td>
      <td>{rent.rentDate}</td>
      <td>{rent.dueDate}</td>
      <td>{calculateRentStatus(rent.rentDate, rent.dueDate, rent.isLongRent)}</td>
      <td>
        <button className='btn btn-primary btn-sm me-1' data-bs-toggle="modal" data-bs-target="#confirmDeleteMod" id={rent.id} onClick={() => handleEndRent(rent.id)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar-check" viewBox="0 0 16 16">
            <path d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0" />
            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
          </svg>
        </button>
        <button className='btn btn-primary btn-sm ms-1' data-bs-toggle="modal" data-bs-target="#editRentModal" onClick={() => handleEditRent(rent.id)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
          </svg>
        </button>
      </td>
    </tr>
  )
}