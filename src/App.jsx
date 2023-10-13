import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import './App.css'
import HomeFuncionario from './components/HomeFuncionario';
import Navbar from './components/Navbar';
import EmpresaComponent from './components/EmpresaComponent';
import CreateEmpresaComponent from './components/CreateEmpresaComponent';
import CreateFuncionarioComponent from './components/CreateFuncionarioComponent';
import Home from './components/Home';

import LinhaComponent from './components/LinhaComponent';

function App() {

  return (
   
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={ <Home /> } />

        <Route path="home/:id" element={ <HomeFuncionario /> } /> {/* home do funcionario */}
        <Route path="linhas/:id" element={ <LinhaComponent /> } />

        <Route path="empresas/:id" element={ <EmpresaComponent /> } />
        <Route path="empresas/criar" element={ <CreateEmpresaComponent /> } />

        <Route path="funcionarios/criar" element={ <CreateFuncionarioComponent /> } />



      </Routes>
    </BrowserRouter>  
  
  )
}

export default App;
