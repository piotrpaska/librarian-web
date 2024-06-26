import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import api from "../../services/Api";
import React, { useEffect } from 'react';
import { Table, Spinner } from 'react-bootstrap';

export default function HistoryTable({ rents }) {
  return (
    <Table striped id='table'>
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
          <th scope='col'>Data zwrotu</th>
        </tr>
      </thead>
      <tbody>
        {rents.slice(0).reverse().map((doc, index) => <HistoryTableRow rent={doc} index={index} />)}
      </tbody>
    </Table>
  )
}

function HistoryTableRow({ rent, index }) {
  const [bookTitle, setBookTitle] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    const getBookTitle = (code) => {
      api.get(`/book/${code}`)
        .then(book => {
          setBookTitle(book.data.title);
          setIsLoading(false);
        })
    }
    getBookTitle(rent.bookCode);
  }, []);

  return (
    <tr key={rent.id}>
      <th scope='row'>{index + 1}</th>
      <td>{rent.name}</td>
      <td>{rent.lastName}</td>
      <td>{rent.schoolClass}</td>
      <td>{isLoading ? <Spinner variant='border' size='sm' /> : bookTitle}</td>
      <td>{rent.deposit}</td>
      <td>{rent.rentDate}</td>
      <td>{rent.dueDate}</td>
      <td>{rent.returnDate}</td>
    </tr>
  )
}