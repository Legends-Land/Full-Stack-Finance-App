import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { useState } from 'react'
import './App.css'
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import ProtectedRoute from './routes/protectedRoute';
import Dashboard from './pages/Dashboard';


function App() {


  return (
     <BrowserRouter>
  <Routes>
    <Route path= "/home" element = {<ProtectedRoute> <Home /> </ProtectedRoute>}/>
    <Route path= "/dashboard" element = {<ProtectedRoute> <Dashboard/></ProtectedRoute>}/>
    <Route path= "/register" element={<Register />} />
    <Route path= "/login" element={<Login />} />
    <Route path= "/" element={<Login />} />
  </Routes>
</BrowserRouter>
  )
}

export default App
