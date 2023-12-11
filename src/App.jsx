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

import ProtectedRoute from './components/utils/PrivateRoute';
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
        <Route
          path="passageiro/home"
          element={<ProtectedRoute element={<Home />} roles={['passageiro']} />}
        />
        <Route
          path="passageiro/:id/favoritas"
          element={<ProtectedRoute element={<FavoritasComponent />} roles={['passageiro']} />}
        />
        
        {/* FUNCIONÁRIO */}
        {/* Rotas protegidas para Funcionário */}
        <Route
          path="funcionario/home"
          element={<ProtectedRoute element={<HomeFuncionario />} roles={['funcionario']} />}
        />
        <Route
          path="empresas/:id/linhas/create"
          element={<ProtectedRoute element={<reateLinhaComponent />} roles={['funcionario']} />}
        />

        {/* ADM */}
        {/* Rotas protegidas para Administrador */}
        <Route
          path="administrador/home"
          element={<ProtectedRoute element={<HomeAdministrador />} roles={['administrador']} />}
        />
        <Route
          path="empresas/criar"
          element={<ProtectedRoute element={<CreateEmpresaComponent />} roles={['administrador']} />}
        />
        <Route
          path="administrador/empresas/:id"
          element={<ProtectedRoute element={<AdmEmpresaComponent />} roles={['administrador']} />}
        />
        <Route
          path="funcionarios/criar"
          element={<ProtectedRoute element={<CreateFuncionarioComponent />} roles={['administrador']} />}
        />
      </Routes>
    </BrowserRouter>  
  </AuthProvider>
  )
}

export default App;
