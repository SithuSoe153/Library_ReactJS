import React, { useContext } from 'react'
import cover from '../assets/cover.jfif'
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom';

import trash from '../assets/delete.svg';
import pencil from '../assets/edit.svg';

import { db } from '../firebase';
import { collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query } from 'firebase/firestore';
import useFirestore from '../hooks/useFirestore';
import { AuthContext } from '../contexts/AuthContext';

export default function BookList() {

    let location = useLocation();
    let params = new URLSearchParams(location.search);

    let search = params.get('search');
    let { getCollection, deleteDocument } = useFirestore();

    let { user } = useContext(AuthContext);
    let { error, data: books, loading } = getCollection('books', ['uid', '==', user.uid]);

    let deleteBook = async (event, id) => {
        event.preventDefault();

        await deleteDocument('books', id);

        // setBooks(books.filter(book => book.id !== id));

    }

    let url = `http://localhost:3000/books${search ? `?title=${search}` : ''}`;
    // let url = `http://localhost:3000/books`;

    let [data, setData] = useState(null);

    // let { data: books, loading, error } = useFetch(url, setData, data);



    return (


        <div className='grid grid-cols-2 md:grid-cols-4 gap-4 my-3'>

            {error && <div>Error: {error}</div>}
            {loading && <div>Loading...</div>}

            {!!books && (

                books.map((book) => (
                    <Link to={"/books/" + book.id} key={book.id}>
                        <div className='p-4 border border-1'>

                            <img src={cover} alt="" />

                            <div className='text-center space-y-2 mt-3'>
                                <h1>{book.title}</h1>
                                <p>{book.description}</p>


                                <div className='flex flex-wrap justify-between items-center'>
                                    <div>
                                        {book.categories.map(genre => (
                                            <span key={genre} className='mx-1 my-1 text-white rounded-full px-2 py-1 text-sm bg-blue-500' >{genre}</span>

                                        ))}
                                    </div>
                                    <div className='flex space-x-3'>
                                        <Link to={`/edit/${book.id}`} >
                                            <img src={pencil} alt="" />
                                        </Link>
                                        <img src={trash} alt="" onClick={(event) => deleteBook(event, book.id)} />

                                    </div>
                                </div>

                            </div>



                        </div></Link>
                ))

            )
            }

            {books && !books.length && < div > No books found</div>}


        </div >)
}
