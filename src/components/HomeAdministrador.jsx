import React, { useContext, useEffect, useState } from 'react';
import api from '../api';
import { AuthContext } from '../contexts/authContext';
import { Link } from 'react-router-dom';

//  //

function HomeAdministrador() {

  const { user, token } = useContext(AuthContext);

  const [empresas, setEmpresas] = useState([]);
  //   fazer get para empresas

  useEffect(() => {

    api.get(`/api/empresas/`)
    .then((response) => {
      setEmpresas(response.data);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
  }, [token]);

  return (
    <div className="p-4">
      <div>
        <h1 className='text-4xl font-bold border-l-4 rounded-lg p-2 border-main-500 mb-6'>Painel do Administrador</h1>
      </div>
      {/* Mostrar as empresas com um link ver todas*/}
      <div>
        <span className='text-2xl font-semibold text-stone-800'>Empresas</span>
      </div>

      <div className="mt-4 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {empresas.map((empresa) => (
          <Link key={empresa.id} 
              className="group bg-white shadow-lg rounded-lg p-6 my-4  group-hover:text-white hover:bg-main-500 hover:ring-main-500"
              to={`/administrador/empresas/${empresa.id}`}
              >
    
            <div>
              <p className='text-xl font-semibold text-center text-zinc-800 group-hover:text-white'>{empresa.nome}</p>
              
            </div>
          </Link>
        ))}
      </div>

      {/* Dois botões: cirar empresa e cadastrar funcionario */}
      <div className="mt-4">
        <Link to={`/empresas/criar`} className="text-white hover:bg-main-600 p-4 mt-4 text-lg font-medium bg-main-500 rounded-md">
          Nova Empresa
        </Link>
        <Link to={`/funcionarios/criar`} className="ml-2 text-white hover:bg-main-600 p-4 mt-4 text-lg font-medium bg-main-500 rounded-md">
          Novo Funcionario
        </Link>
      </div>
      <div className='mt-4'>
      </div>

    </div>

  );
}

export default HomeAdministrador;
