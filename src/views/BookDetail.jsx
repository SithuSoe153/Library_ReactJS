import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch';
import cover from '../assets/cover.jfif'


export default function BookDetail() {
    let params = useParams();
    let url = `http://localhost:3000/books/${params.id}`;
    let [data, setData] = useState(null);
    let { data: book, loading, error } = useFetch(url, setData, data);


    return (
        <>
            {loading && <div>Loading...</div>}
            {error && <div>Error: {error}</div>}

            {
                book && (
                    <div className="grid grid-cols-2">
                        <div>
                            <img src={cover} alt="" className='w-[80%]' />
                        </div>
                        <div className='space-y-3'>
                            <h1 className='text-3xl font-bold'>{book.title}</h1>
                            <div className='space-x-3'>
                                {
                                    book.category.map(genre => (
                                        <span key={genre} className='bg-blue-500 text-white rounded-full text-xs px-2 py-1'>{genre}</span>

                                    ))
                                }
                            </div>
                            <p>
                                {book.description}
                            </p>
                        </div>
                    </div>
                )
            }
        </>
    )
}
