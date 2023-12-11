import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import './App.css'
import HomeFuncionario from './components/HomeFuncionario';
import Navbar from './components/Navbar';
import EmpresaComponent from './components/EmpresaComponent';
import CreateEmpresaComponent from './components/CreateEmpresaComponent';
import CreateFuncionarioComponent from './components/CreateFuncionarioComponent';
import CreatePassageiroComponent from './components/CreatePassageiroComponent';
import CreateLinhaComponent from './components/CreateLinhaComponent';
import Home from './components/Home';

import LinhaComponent from './components/LinhaComponent';
import Login from './components/Login';
import { AuthProvider } from './contexts/authContext';
import FavoritasComponent from './components/FavoritasComponent';
import HomeAdministrador from './components/HomeAdministrador';
import AdmEmpresaComponent from './components/AdmEmpresaComponent';

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
      <Navbar />
      <Routes>
        {/* PÚBLICAS */}
        <Route path="/" element={ <Home /> } />
        <Route path="login" element={ <Login /> } />
        <Route path="linhas/:id" element={ <LinhaComponent /> } />
        <Route path="empresas/:id" element={ <EmpresaComponent /> } />
        <Route path="/cadastrar" element={ <CreatePassageiroComponent /> } />

        {/* PASSAGEIRO */}
        <Route path="passageiro/home" element={ <Home /> } />
        <Route path="passageiro/:id/favoritas" element={ <FavoritasComponent /> } />
        
        {/* FUNCIONÁRIO */}
        <Route path="funcionario/home/" element={ <HomeFuncionario /> } />
        <Route path="empresas/:id/linhas/create" element={ <CreateLinhaComponent /> } />

        {/* ADM */}
        <Route path="administrador/home/" element={ <HomeAdministrador /> } />
        <Route path="empresas/criar" element={ <CreateEmpresaComponent /> } />
        <Route path="administrador/empresas/:id" element={ <AdmEmpresaComponent /> } />
        <Route path="funcionarios/criar" element={ <CreateFuncionarioComponent /> } />

      </Routes>
    </BrowserRouter>  
  </AuthProvider>
  )
}

export default App;
