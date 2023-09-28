import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import './App.css'
import Home from './components/Home';
import Navbar from './components/Navbar';
import EmpresaComponent from './components/EmpresaComponent';
import LinhaComponent from './components/LinhaComponent';

function App() {

  return (
   
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="home/:id" element={ <Home /> } />
        <Route path="empresas/:id" element={ <EmpresaComponent /> } />
        <Route path="linhas/:id" element={ <LinhaComponent /> } />
      </Routes>
    </BrowserRouter>  
  
  )
}

export default App
