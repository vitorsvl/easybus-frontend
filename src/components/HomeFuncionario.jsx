// src/components/ExampleComponent.js
import React, { useContext, useEffect, useState } from 'react';
import api from '../api';
import { useParams, Link } from 'react-router-dom';
import { AuthContext } from '../contexts/authContext';


// HOME DO FUNCIONARIO //

function HomeFuncionario() {

  const { user, token } = useContext(AuthContext);

  const id = user['funcionario']['id'];

  const [linhas, setLinhas] = useState([]);
  const [funcionario, setFuncionario] = useState([]);

  useEffect(() => {
    //pegando os dados do funcionario { nome, email, cpf, empresa }
    api.get(`/api/funcionarios/${id}`)
      .then((response) => {
        setFuncionario(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

  }, [id, token]);

  const empresa_id = funcionario.empresa_id;

  useEffect(() => {
    if (empresa_id != null) {

      api.get(`/api/empresas/${funcionario.empresa_id}/linhas`,
        { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => {
          setLinhas(response.data);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
  }, [empresa_id]);


  return (
    <div className="p-4">
      <h3 className="text-2xl font-semibold text-main-500 italic">Bem Vindo(a) {funcionario.name}!</h3>

      {/* EMPRESA */}
      <div className="flex justify-between items-center mt-2 p-4 bg-gradient-to-r from-main-100 via-main-200 to-main-100 shadow-md  rounded-lg">
        <div className='flex items-center space-x-2'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#1f2937" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
          </svg>
          <p className="text-xl font-medium text-gray-800">{funcionario.empresa}</p>
        </div>
        <div className="flex items-center ">
          <Link to={`/empresas/${funcionario.empresa_id}`} className="text-main-500 font-medium hover:underline">Acessar</Link>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#ff7d61" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </div>
      </div>

      {/* VISAO GERAL DAS LINHAS DA EMPRESA */}
      <h3 className="mt-4 text-2xl font-semibold">Linhas</h3>
      {linhas.length > 0 ? (
        <div className="my-4 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {linhas.map((linha) => (
            <div key={linha.id} className="bg-white shadow-lg rounded-lg p-4">
              <div>
                <p className='text-sm text-main-500 font-medium'>Cidade origem</p>
                <h5 className="text-xl font-semibold">{linha.cidade_origem}</h5>
                <p className='text-sm mt-2 text-main-500 font-medium'>Cidade destino</p>
                <h5 className="text-xl font-semibold">{linha.cidade_destino}</h5>
                {/* Outras informações da linha, se necessário */}
                <div className="mt-auto">
                  <Link to={`/linhas/${linha.id}`} className="block w-full text-center py-2 mt-4 bg-main-500 hover:bg-main-600 text-white rounded-md">
                    Detalhes da linha
                  </Link>
                </div>
              </div>
            </div>
          ))}
          <div className="mt-4">
            <Link to={`/empresas/${funcionario.empresa_id}/linhas`} className="text-main-500 block text-center py-2 mt-12 rounded-md border border-main-500 hover:bg-main-500 hover:text-white">
              Ver todas
            </Link>
          </div>
        </div>
      ) : (
        <p className="text-main-500 text-center mt-4">
          A empresa não tem linhas cadastradas.
        </p>
      )}

      <div className="mt-4">
        <Link to={`/empresas/${funcionario.empresa_id}/linhas/create`} 
          className=" text-white font-medium hover:bg-main-700 p-4 mt-4 bg-main-600 rounded-md">
          Nova linha
        </Link>
      </div>
    </div>

  );
}

export default HomeFuncionario;
