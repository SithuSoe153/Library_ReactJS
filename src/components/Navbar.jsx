import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useSignOut from '../hooks/useSignOut';
import { AuthContext } from '../contexts/AuthContext';

export default function Navbar() {

    let [search, setSearch] = useState('');

    let navigate = useNavigate();
    let { user } = useContext(AuthContext);

    let handleSearch = (e) => {
        navigate('/?search=' + search);
    }

    let { logout } = useSignOut();

    let signOutUser = async () => {
        await logout();
        navigate('/login');
    }

    return (
        <nav className='border border-b-1'>
            <ul className='flex justify-between items-center p-3 max-w-6xl mx-auto'>
                <li className='flex items-center gap-3'>

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                    <input name="search" value={search} onChange={e => setSearch(e.target.value)} className='outline-none' type="text" id="" placeholder='Search Books...' />
                    <button onClick={handleSearch} className='flex items-center gap-3 text-white bg-primary px-3 py-2 rounded-2xl'>
                        < svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>

                        <span className='hidden md:block'>Search</span>
                    </button>
                </li>
                <Link to='/' className='flex items-center gap-3 md:-ml-32 cursor-pointer'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
                    </svg>


                    <span className='text-2xl font-bold text-primary hidden md:block'>BookStore</span>
                </Link>
                <li className='flex items-center align-middle gap-3'>

                    <Link to='/create' className='flex items-center gap-3 text-white bg-primary px-3 py-2 rounded-2xl'>
                        < svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>

                        <span className='hidden md:block'>Create Book</span>
                    </Link>
                    <div className="w-11">

                        <img className='w-full rounded-full' src="https://images.unsplash.com/photo-1688278233500-63c426e2e9ff?q=80&w=1180&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D/20x20" alt="" />
                    </div>

                    <div className='space-x-3'>

                        {user && <button onClick={signOutUser} className='bg-red-500 text-white rounded-lg px-2 py-2 text-sm'>Logout</button>}

                        {!user &&
                            <div className='flex items-center gap-3'>
                                <Link to={'/login'} className='border-2 border-primary text-primary rounded-lg px-2 py-2 text-sm'>Login</Link>
                                <Link to={'/register'} className='bg-primary text-white rounded-lg px-2 py-2 text-sm'>Register</Link>
                            </div>
                        }
                    </div>

                </li>
            </ul>
        </nav >)
}
