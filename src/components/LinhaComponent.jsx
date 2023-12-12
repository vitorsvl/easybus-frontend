import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';

import api from '../api';
import { AuthContext } from '../contexts/authContext';

function LinhaComponent() {

  const { id } = useParams();
  const [linha, setLinha] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  const { user } = useContext(AuthContext);

  const adicionarFavorita = async () => {
    try {
      const response = await api.post(`/api/adicionar-favorita/${user.id}`, { linhaId: id });
      if (response.status == 201) {
        setSuccessMessage('Linha favoritada!');
      }
    } catch (error) {
      console.error('Erro ao adicionar linha favorita:', error);
    }
  };

  useEffect(() => {
    api.get(`/api/linhas/${id}`)
      .then((response) => {
        setLinha(response.data);
        // console.log(response.data)
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className='p-2'>

      {/* TITULO */}
      <div>
        <h1 className='ml-1   mt-2 text-4xl font-medium border-l-4 rounded-lg p-2 border-main-500 mb-6'>Linha intermunicipal</h1>
      </div>

      {/* CIDADES E CARD EMPRESA */}
      <div className='flex justify-between px-4'>
        <div>
          <p className='text-main-500 font-semibold'>Cidade origem</p>
          <p className='text-3xl font-bold mb-4'>{linha.cidade_origem}</p>
          <p className='text-main-500 font-semibold'>Cidade destino</p>
          <p className='text-3xl font-bold mb-4'>{linha.cidade_destino}</p>
        </div>

        <div>
          <Link to={`/empresas/${linha?.empresa?.id}`} className="block max-w-sm py-4 px-12 bg-main-100 shadow-lg rounded-lg hover:bg-main-200">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{linha?.empresa?.nome}</h5>
            <p className='text-main-500 font-semibold'>Telefone</p>
            <p className='font-medium pb-2'>{linha?.empresa?.telefone}</p>
            <p className='text-main-500 font-semibold'>Email</p>
            <p className='font-medium'>{linha?.empresa?.email}</p>
          </Link>
        </div>
      </div>
      {user && user.role === 'passageiro' && (
        <button onClick={adicionarFavorita} className="text-white font-semibold hover:bg-main-600 p-3 ml-4 bg-main-500 rounded-md">
          Adicionar às Favoritas
        </button>
      )}

      {successMessage && (
        <div className="flex items-center justify-center mt-2">
          <p className="text-green-500 font-semibold text-sm p-2 bg-green-200 rounded-md">
            {successMessage}
          </p>
        </div>
      )}
      {/* TABELA VIAGENS */}
      <div className='p-2'>
        <p className='font-semibold text-xl m-2'>
          Viagens
        </p>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 rounded-lg overflow-hidden">
            <thead className="text-xs text-gray-700 uppercase bg-main-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Partida
                </th>
                <th scope="col" className="px-6 py-3">
                  Chegada
                </th>
                <th scope="col" className="px-6 py-3">
                  Passagem
                </th>
                <th scope="col" className="px-6 py-3">
                  Paradas
                </th>
              </tr>
            </thead>
            <tbody className="bg-slate-200/25 divide-y divide-gray-200">
              {linha?.viagens?.map((viagem) => (
                <tr key={viagem.id}>
                  <td className="px-6 py-4 whitespace-no-wrap">{viagem.horario_partida}</td>
                  <td className="px-6 py-4 whitespace-no-wrap">{viagem.horario_chegada}</td>
                  <td className="px-6 py-4 whitespace-no-wrap">{viagem.valor_passagem}</td>
                  <td className="px-6 py-4 whitespace-no-wrap">{viagem.paradas.join(', ') || 'Sem paradas'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default LinhaComponent;
