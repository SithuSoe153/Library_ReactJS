import React, { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';
import { db } from '../firebase';
import { useNavigate, useParams } from 'react-router-dom';
import { addDoc, collection, doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import useFirestore from '../hooks/useFirestore';

export default function Create() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({ title: '', description: '' });
  const [newCategory, setNewCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  const url = 'http://localhost:3000/books';
  const { setPostData, data: book } = useFetch(url, { data: null }, { setData: null }, 'POST');


  let { updateDocument, addCollection } = useFirestore();

  useEffect(() => {
    if (id) {
      setIsEdit(true);
      setLoading(true);

      const ref = doc(db, "books", id);
      getDoc(ref).then(doc => {
        if (doc.exists()) {
          const { title, description, categories } = doc.data();
          setInputs({ title, description });
          setCategories(categories || []);
        }
        setLoading(false);
      });
    } else {
      setIsEdit(false);
      setInputs({ title: '', description: '' });
      setCategories([]);
    }
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs(prevInputs => ({
      ...prevInputs,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const dataToSubmit = { ...inputs, categories, date: serverTimestamp() };
    setPostData(dataToSubmit);

    if (isEdit) {
      await updateDocument('books', id, dataToSubmit);
    } else {
      await addCollection('books', dataToSubmit);
    }

    navigate('/');

  };

  const addCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories(prevCategories => [newCategory, ...prevCategories]);
      setNewCategory('');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <form className="w-full max-w-lg mx-auto mt-5" onSubmit={handleSubmit}>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="title">
            Book Title
          </label>
          <input
            name='title'
            value={inputs.title}
            onChange={handleChange}
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="title"
            type="text"
            placeholder="Book Title"
          />
        </div>
      </div>

      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="description">
            Book Description
          </label>
          <textarea
            name='description'
            value={inputs.description}
            onChange={handleChange}
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="description"
            placeholder="Book Description"
          />
        </div>
      </div>

      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="categories">
            Categories
          </label>
          <div className='flex items-center space-x-3'>
            <input
              name='categories'
              value={newCategory}
              onChange={e => setNewCategory(e.target.value)}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="categories"
              type="text"
              placeholder="Book Categories"
            />
            <button type='button' onClick={addCategory} className='bg-primary p-1 rounded-lg mb-3'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </button>
          </div>
        </div>
        <div className='space-x-3'>
          {categories.map((genre, index) => (
            <span key={index} className='bg-primary text-white rounded-full text-xs px-2 py-1'>{genre}</span>
          ))}
        </div>
      </div>

      <button className='flex items-center gap-3 text-white bg-primary px-3 py-2 rounded-2xl w-full justify-center'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
        <span className='hidden md:block'>{isEdit ? 'Update Book' : 'Create Book'}</span>
      </button>
    </form>
  );
}
