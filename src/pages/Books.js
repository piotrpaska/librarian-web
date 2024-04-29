import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import $ from 'jquery';
import api from './Api';

function Books() {

    const [books, setBooks] = useState([]);

    useEffect(() => {
        document.getElementById('books-href').classList.add('active');
    }, [])

    const search = () => {}

    const fetchBooks = async () => {
        const response = await api.get('/books/')
        setBooks(response.data)
    }

    useEffect(() => {
        fetchBooks();
    }, []);

    return (
        <div className="container-fluid mt-2 text-center px-3mt-2 text-center px-3">
            <h1 class="display-5 text-start ms-3 border-bottom">Spis książek</h1>
            <div className='container-fluid mt-4'>
                <div className='row'>

                    <div className='col col-auto me-auto d-flex'>
                        <select class="form-select" aria-label="Default select example" id='filterBy'>
                            <option value="1">Kod</option>
                            <option value="2" selected>Tytuł</option>
                            <option value="3">Liczba na stanie</option>
                            <option value="4">Liczba wypożyczonych</option>
                        </select>
                        <input class="form-control mx-2" type="search" placeholder="Szukaj" aria-label="Search" id='searchBar' onKeyUp={() => search()} />
                    </div>   
                </div>
            </div>
            <div className="container-fluid mt-4">
                <table className="table table-striped" id='table'>
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
                                <tr id={book} key={book.id}>
                                    <th scope='row'>{book.code}</th>
                                    <td>{book.title}</td>
                                    <td className='fw-bold' style={{ color: book.onStock > 0 ? 'MediumSeaGreen' : 'red' }}>{book.onStock}</td>
                                    <td className='fw-bold' style={{ color: book.rented > 0 ? 'DodgerBlue' : 'white' }}>{book.rented}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Books;