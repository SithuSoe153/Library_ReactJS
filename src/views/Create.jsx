import React, { useEffect } from 'react'
import { useState } from 'react';
import useFetch from '../hooks/useFetch';

import DataServices from '../services/data-services';
import { useNavigate } from 'react-router-dom';

export default function Create() {

  let url = 'http://localhost:3000/books';

  let { setPostData, data: book } = useFetch(url, { data: null }, { setData: null }, 'POST')

  let dataservices = new DataServices();

  let navigate = useNavigate();


  const [inputs, setInputs] = useState({
    title: '',
    description: '',
  });

  const [newCategory, setNewCategory] = useState('');
  const [categories, setCategories] = useState([]);


  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    inputs.category = categories;

    setPostData(inputs);

    // dataservices.addBook(inputs);
    // console.log(inputs);
    // console.log(categories);
  };

  useEffect(() => {
    if (book) {
      // navigate('/');
    }
  }, [book])

  let addCategory = (event) => {
    if (newCategory && categories.includes(newCategory)) {
      return;
    }

    setCategories(prevCategories => [newCategory, ...prevCategories])
    setNewCategory('')

  }

  return (


    <form className="w-full max-w-lg mx-auto mt-5" onSubmit={handleSubmit}>

      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
            Book Title
          </label>
          <input name='title' value={inputs.title} onChange={handleChange} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="Book Title" />
          {/* <p className="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p> */}
        </div>
      </div>

      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
            Book Description
          </label>
          <textarea name='description' value={inputs.description} onChange={handleChange} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="Book Description" />
          {/* <p className="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p> */}
        </div>
      </div>

      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
            Categories
          </label>
          <div className='flex items-center space-x-3'>

            <input name='categories' value={newCategory} onChange={e => setNewCategory(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" placeholder="Book Categories" />

            <button type='button' onClick={addCategory} className='bg-primary p-1 rounded-lg mb-3'>
              < svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </button>
          </div>
          {/* <p className="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p> */}
        </div>

        <div className='space-x-3'>
          {
            categories.map(genre => (
              <span key={genre} className='bg-primary text-white rounded-full text-xs px-2 py-1'>{genre}</span>

            ))
          }
        </div>


      </div>

      <button className='flex items-center gap-3 text-white bg-primary px-3 py-2 rounded-2xl w-full justify-center'>
        < svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>

        <span className='hidden md:block'>Create Book</span>
      </button>

    </form>

  )
}
