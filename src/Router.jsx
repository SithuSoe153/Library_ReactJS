import Layout from "./views/Layout";
import Home from "./views/Home";
import BookForm from "./views/BookForm";
import Search from "./views/Search";
import BookDetail from "./views/BookDetail";

import Register from "./views/Register";
import Login from "./views/Login";

import { Navigate } from "react-router-dom";

import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";



import React, { useContext } from 'react'
import { AuthContext } from "./contexts/AuthContext";

export default function Router() {

  let { authReady, user } = useContext(AuthContext)

  const isAuth = !!user;

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/register",
          element: !isAuth ? <Register /> : <Navigate to={'/'} />,
        },
        {
          path: "/login",
          element: !isAuth ? <Login /> : <Navigate to={'/'} />,

        },
        {
          path: "/",
          element: isAuth ? <Home /> : <Navigate to={'/login'} />,
        },
        {
          path: "/create",
          element: isAuth ? <BookForm /> : <Navigate to={'/login'} />,

        },
        {
          path: "/edit/:id",
          element: isAuth ? <BookForm /> : <Navigate to={'/login'} />,

        },
        {
          path: "/search",
          element: isAuth ? <Search /> : <Navigate to={'/login'} />,

        }, {
          path: "/books/:id",
          element: isAuth ? <BookDetail /> : <Navigate to={'/login'} />,

        },
        {
          path: "*",
          element: <div>404</div>,
        }
      ]
    },
  ]);


  return (
    authReady && <RouterProvider router={router} />
  )
}
