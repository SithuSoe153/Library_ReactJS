import Layout from "./views/Layout";
import Home from "./views/Home";
import BookForm from "./views/BookForm";
import Search from "./views/Search";
import BookDetail from "./views/BookDetail";

import {
  createBrowserRouter,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/create",
        element: <BookForm />,
      },
      {
        path: "/edit/:id",
        element: <BookForm />,
      },
      {
        path: "/search",
        element: <Search />,
      }, {
        path: "/books/:id",
        element: <BookDetail />
      },
      {
        path: "*",
        element: <div>404</div>,
      }
    ]
  },
]);

export default router