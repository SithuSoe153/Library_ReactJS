import React from 'react'
import cover from '../assets/cover.jfif'
import { useState } from 'react'
import useFetch from '../hooks/useFetch'
import { Link, useLocation } from 'react-router-dom';

export default function BookList() {

    let location = useLocation();
    let params = new URLSearchParams(location.search);

    let search = params.get('search');

    let url = `http://localhost:3000/books${search ? `?title=${search}` : ''}`;
    // let url = `http://localhost:3000/books`;

    console.log(url);

    let [data, setData] = useState(null);

    let { data: books, loading, error } = useFetch(url, setData, data);


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

                                <div className='flex flex-wrap'>
                                    {book.category.map(genre => (
                                        <span key={genre} className='mx-1 my-1 text-white rounded-full px-2 py-1 text-sm bg-blue-500' >{genre}</span>

                                    ))}
                                </div>

                            </div>



                        </div></Link>
                ))

            )
            }

            {books && !books.length && < div > No books found</div>}


        </div >)
}
