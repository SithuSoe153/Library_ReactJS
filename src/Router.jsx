import Layout from "./views/Layout";
import Home from "./views/Home";
import Create from "./views/Create";
import Search from "./views/Search";

import {
    createBrowserRouter,
  } from "react-router-dom";
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children: [
        {
            path: "/",
            element: <Home/>,
        },
        {
          path: "/create",
          element: <Create/>,
        },
        {
          path: "/search",
          element: <Search/>,
        },
      ]
    },
  ]);

  export default router