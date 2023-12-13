// src/components/ExampleComponent.js
import React, { useEffect, useState } from 'react';
import api from '../api';
import { useParams, Link } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';


// HOME DO FUNCIONARIO //

function Home() {

  const { id } = useParams();
  const [busca, setBusca] = useState('');
  const [linhas, setLinhas] = useState(null);
  const [linhasDestaque, setLinhasDestaque] = useState(null);

  const { handleSubmit, control } = useForm();

  useEffect(() => {
    api.get('/api/linhas')
      .then((response) => {
        setLinhasDestaque(response.data);
      })
      .catch((error) => {
        console.error('Erro ao buscar linhas em destaque:', error);
      });
  }, []);

  const onSubmit = (data) => {
    setBusca(data.searchTerm);
  };

  // faz o request enviando a busca
  useEffect(() => {
    if (busca) {
      api.get(`/api/linhas/buscar?search=${busca}`)
        .then((response) => {
          setLinhas(response.data);
          
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
  }, [busca]); 

  return (
    <div className="p-4 mb-8">
      <div className='text-center mt-4 mb-4 pt-1'>
        {/* BUSCA */}
        <form onSubmit={handleSubmit(onSubmit)} className="m-8">
          
          <div className="flex items-center justify-center">
            <Controller
              name="searchTerm"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  className="w-1/2 px-4 py-2 border-2 border-r-0 rounded-l-md text-gray-700 focus:outline-none focus:border-main-500 placeholder:italic"
                  placeholder='Busque por cidades...'
                />
              )}
            />
            <button
              type="submit"
              className=" py-2 px-4 bg-main-500 font-semibold  border-2 border-main-500 hover:bg-main-600 text-white rounded-r-md"
            >
              Buscar
            </button>
          </div>
        </form>
      </div>

      {/* LINHAS ENCONTRADAS */}

      {linhas !== null && linhas.length > 0 ? (
        <h3 className="text-2xl font-semibold">Linhas encontradas</h3>
      ) : (
        <h3 className="text-2xl font-semibold">Linhas em destaque</h3>
      )}
      {/* Resultados das linhas */}
      <div className="mt-4 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        { linhas !== null && linhas.length > 0 ? (
          // Exibir linhas quando houver resultados
          linhas.map((linha) => (
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
          ))
        ) : linhas !== null ? (
          // Exibir a mensagem quando nenhuma linha for encontrada
          <p className="text-xl font-semibold ">Nenhuma linha encontrada.</p>
        ) : (
          
        
          linhasDestaque !== null && linhasDestaque.slice(0, 4).map((linha) => (
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
          ))

        )}

      </div>
    </div>
  );
}

export default Home;
