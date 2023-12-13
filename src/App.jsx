import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomeFuncionario from './components/HomeFuncionario';
import Navbar from './components/Navbar';
import EmpresaComponent from './components/EmpresaComponent';
import CreateEmpresaForm from './forms/CreateEmpresaForm';
import CreateFuncionarioForm from './forms/CreateFuncionarioForm';
import CreatePassageiroForm from './forms/CreatePassageiroForm';
import CreateLinhaForm from './forms/CreateLinhaForm';
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
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="linhas/:id" element={<LinhaComponent />} />
          <Route path="empresas/:id" element={<EmpresaComponent />} />
          <Route path="/cadastrar" element={<CreatePassageiroForm />} />

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
            path="funcionario"
            element={<ProtectedRoute element={<HomeFuncionario />} roles={['funcionario']} />}
          />
          <Route
            path="empresas/:id/linhas/create"
            element={<ProtectedRoute element={<CreateLinhaForm />} roles={['funcionario']} />}
          />

          {/* ADM */}
          {/* Rotas protegidas para Administrador */}
          <Route
            path="administrador"
            element={<ProtectedRoute element={<HomeAdministrador />} roles={['administrador']} />}
          />
          <Route
            path="empresas/criar"
            element={<ProtectedRoute element={<CreateEmpresaForm />} roles={['administrador']} />}
          />
          <Route
            path="administrador/empresas/:id"
            element={<ProtectedRoute element={<AdmEmpresaComponent />} roles={['administrador']} />}
          />
          <Route
            path="funcionarios/criar"
            element={<ProtectedRoute element={<CreateFuncionarioForm />} roles={['administrador']} />}
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App;
