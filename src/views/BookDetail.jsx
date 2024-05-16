import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
// import useFetch from '../hooks/useFetch';
import cover from '../assets/cover.jfif'
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { set } from 'firebase/database';


export default function BookDetail() {
    let params = useParams();
    let url = `http://localhost:3000/books/${params.id}`;
    let [data, setData] = useState(null);

    let { id } = useParams();

    let [error, setError] = useState('');
    let [book, setBook] = useState(null);
    let [loading, setLoading] = useState(false);

    // let { data: book, loading, error } = useFetch(url, setData, data);

    useEffect(() => {
        setLoading(true);
        let ref = doc(db, "books", id);
        getDoc(ref).then(doc => {
            if (doc.exists()) {
                let book = { id: doc.id, ...doc.data() };
                setBook(book);
                setLoading(false);
                setError('');

            } else {
                setError('No document found')
                setLoading(false);
            }
        })
    }, [id])

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
                                    book.categories.map(genre => (
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
