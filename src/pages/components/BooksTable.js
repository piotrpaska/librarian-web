import React from 'react'; 
import { Table, Spinner } from 'react-bootstrap';

export default function BooksTable({ books }) {
    return (
        <Table striped id='table'>
          <thead>
            <tr>
              <th scope='col'>Kod</th>
              <th scope='col'>Tytuł</th>
              <th scope='col'>Liczba na stanie</th>
              <th scope='col'>Liczba wypożyczonych</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => {
              return (
                <tr key={book.id}>
                  <td scope='row'>{book.code}</td>
                  <td>{book.title}</td>
                  <td className='fw-bold' style={{ color: book.onStock > 0 ? 'MediumSeaGreen' : 'red' }}>{book.onStock}</td>
                  <td className='fw-bold' style={{ color: book.rented > 0 ? 'DodgerBlue' : 'white' }}>{book.rented}</td>
                </tr>
              )
            })}
          </tbody>
        </Table>
    )
}