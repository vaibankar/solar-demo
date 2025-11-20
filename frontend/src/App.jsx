import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'

const API = import.meta.env.VITE_API || '/api'

function App(){
  const [token, setToken] = useState(localStorage.getItem('token'))
  useEffect(()=>{ if (token) localStorage.setItem('token', token) },[token])
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login setToken={setToken} api={API} />} />
        <Route path="/" element={token ? <Home token={token} api={API}/> : <Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App
