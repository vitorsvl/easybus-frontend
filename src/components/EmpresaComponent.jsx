import React, { useContext, useEffect, useState } from 'react';
import api from '../api';
import { useParams, Link } from 'react-router-dom';
import { AuthContext } from '../contexts/authContext';


function EmpresaComponent() {

  const { user } = useContext(AuthContext);

  const { id } = useParams();
  const [empresa, setEmpresa] = useState([]);

  useEffect(() => {

    api.get(`/api/empresas/${id}`)
      .then((response) => {
        setEmpresa(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [id]);

  return (

    <div className="mt-8 w-screen flex flex-col items-center justify-center">
      <div className="w-32 h-32 rounded-full bg-stone-400 flex items-center justify-center mt-1 mb-2 ">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-12 h-12 pl-3 pt-3"> {/* Adjusted the size of the SVG */}
          <path fillRule="evenodd" d="M3 2.25a.75.75 0 000 1.5v16.5h-.75a.75.75 0 000 1.5H15v-18a.75.75 0 000-1.5H3zM6.75 19.5v-2.25a.75.75 0 01.75-.75h3a.75.75 0 01.75.75v2.25a.75.75 0 01-.75.75h-3a.75.75 0 01-.75-.75zM6 6.75A.75.75 0 016.75 6h.75a.75.75 0 010 1.5h-.75A.75.75 0 016 6.75zM6.75 9a.75.75 0 000 1.5h.75a.75.75 0 000-1.5h-.75zM6 12.75a.75.75 0 01.75-.75h.75a.75.75 0 010 1.5h-.75a.75.75 0 01-.75-.75zM10.5 6a.75.75 0 000 1.5h.75a.75.75 0 000-1.5h-.75zm-.75 3.75A.75.75 0 0110.5 9h.75a.75.75 0 010 1.5h-.75a.75.75 0 01-.75-.75zM10.5 12a.75.75 0 000 1.5h.75a.75.75 0 000-1.5h-.75zM16.5 6.75v15h5.25a.75.75 0 000-1.5H21v-12a.75.75 0 000-1.5h-4.5zm1.5 4.5a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75v-.008zm.75 2.25a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75v.008a.75.75 0 00-.75-.75h-.008zM18 17.25a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75v-.008z" clipRule="evenodd" />
        </svg>
      </div>
      {/* dados da empresa */}
      <div className="flex flex-col space-y-2">
        <p className='text-4xl font-semibold'>{empresa.nome}</p>

        <div className="flex flex-col space-y-1">
          <p className='text-main-500 font-semibold'>CNPJ</p>
          <p> {empresa.cnpj} </p>
        </div>

        <div className="flex flex-col space-y-1">
          <p className='text-main-500 font-semibold'>Email</p>
          <p> {empresa.email} </p>
        </div>

        <div className="flex flex-col space-y-1">
          <p className='text-main-500 font-semibold'>Telefone</p>
          <p> {empresa.telefone} </p>
        </div>

        <div className="flex flex-col space-y-1">
          <p className='text-main-500 font-semibold'>Endereço</p>
          <p> {empresa.endereco} </p>
        </div>
      </div>

      {/* botao editar (funcionario)*/}
      {user && user.funcionario && (
        <div className="flex items-center justify-center p-1">
          {/* link para editar empresa */}
          <Link to={`/empresas/criar`} className="text-white hover:text-main-600 p-2 mt-2 text-lg font-medium bg-main-500 rounded-md">
            Nova Empresa
          </Link>
        </div>
      )}

    </div>


  );
}

export default EmpresaComponent;
