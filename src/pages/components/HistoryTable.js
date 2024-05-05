import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import api from "../Api";
import React, { useEffect } from 'react';
import { Table } from 'react-bootstrap';

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
          <td>{rent.returnDate}</td>
        </tr>
    )
}