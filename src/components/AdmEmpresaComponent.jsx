// adm/EmpresaComponent

import React, { useContext, useEffect, useState } from 'react';
import api from '../api';
import { useParams, Link } from 'react-router-dom';
import { AuthContext } from '../contexts/authContext';


function AdmEmpresaComponent() {

  const { user, token } = useContext(AuthContext);
  console.log(user, token);

  const { id } = useParams();
  const [empresa, setEmpresa] = useState('');
  const [funcionarios, setFuncionarios] = useState([]);

  useEffect(() => {

    api.get(`/api/empresas/${id}`)
      .then((response) => {
        setEmpresa(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [id]);

  useEffect(() => {
    if(token) {
    api.get(`/api/empresas/${id}/funcionarios`, {
      headers: {Authorization: `Bearer ${token}`}
    })
      .then((response) => {
        setFuncionarios(response.data['data']); // o response retorna um objeto contendo o array de funcionarios
      })//.then(()=> alert(token))
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
    }
  }, [id, token]);
  
  return (
    <div className="pt-2 flex-rows items-start justify-start space-y-3">
      <div className="h-auto w-11/12 py-6 bg-white rounded-lg shadow-lg mx-auto" >
        <div className="w-32 h-32 rounded-full bg-stone-400 flex items-center justify-center mx-auto my-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-12 h-12 pl-3 pt-3"> {/* Adjusted the size of the SVG */}
            <path fillRule="evenodd" d="M3 2.25a.75.75 0 000 1.5v16.5h-.75a.75.75 0 000 1.5H15v-18a.75.75 0 000-1.5H3zM6.75 19.5v-2.25a.75.75 0 01.75-.75h3a.75.75 0 01.75.75v2.25a.75.75 0 01-.75.75h-3a.75.75 0 01-.75-.75zM6 6.75A.75.75 0 016.75 6h.75a.75.75 0 010 1.5h-.75A.75.75 0 016 6.75zM6.75 9a.75.75 0 000 1.5h.75a.75.75 0 000-1.5h-.75zM6 12.75a.75.75 0 01.75-.75h.75a.75.75 0 010 1.5h-.75a.75.75 0 01-.75-.75zM10.5 6a.75.75 0 000 1.5h.75a.75.75 0 000-1.5h-.75zm-.75 3.75A.75.75 0 0110.5 9h.75a.75.75 0 010 1.5h-.75a.75.75 0 01-.75-.75zM10.5 12a.75.75 0 000 1.5h.75a.75.75 0 000-1.5h-.75zM16.5 6.75v15h5.25a.75.75 0 000-1.5H21v-12a.75.75 0 000-1.5h-4.5zm1.5 4.5a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75v-.008zm.75 2.25a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75v.008a.75.75 0 00-.75-.75h-.008zM18 17.25a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75v-.008z" clipRule="evenodd" />
          </svg>
        </div>
        {/* dados da empresa */}
        <div className='flex items-center justify-center mx-auto'>
          <div className="flex flex-col space-y-2 py-4">
            <p className='text-4xl font-semibold text-stone-800'>{empresa.nome}</p>


            <div className="pl-2 pt-2 flex flex-col space-y-1">
              <p className='text-main-500 font-semibold'>CNPJ</p>
              <p>{empresa.cnpj}</p>
            </div>

            <div className="pl-2 flex flex-col space-y-1">
              <p className='text-main-500 font-semibold'>Email</p>
              <p>{empresa.email}</p>
            </div>

            <div className="pl-2 flex flex-col space-y-1">
              <p className='text-main-500 font-semibold'>Telefone</p>
              <p>{empresa.telefone}</p>
            </div>

            <div className="pl-2 flex flex-col space-y-1">
              <p className='text-main-500 font-semibold'>Endereço</p>
              <p>{empresa.endereco}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="h-auto w-11/12 py-6 bg-white rounded-lg shadow-lg mx-auto">
        <div className='px-6'>
          <p className="text-3xl font-semibold text-stone-800">Funcionários</p>
          <div className="mb-4">
            {funcionarios.map((funcionario) => (
              <div key={funcionario.id} className="flex flex-col border-b border-gray-300 py-2">
                <p className="text-lg font-semibold">{funcionario.name}</p>
                <p className="text-gray-500">{funcionario.email}</p>
              </div>
            ))}
          </div>
            
        </div>
      </div>
    </div>
  );
}

export default AdmEmpresaComponent;
