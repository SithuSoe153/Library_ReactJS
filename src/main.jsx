import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import AuthContextProvider from './contexts/AuthContext';
import Router from './Router'


ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <Router />
  </AuthContextProvider>
)
