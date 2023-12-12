import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/authContext';
import api from '../api';
import { useNavigate, Link } from 'react-router-dom';

function FavoritasComponent() {


  const { user } = useContext(AuthContext)
  const [linhasFavoritas, setLinhasFavoritas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Função para buscar as linhas favoritas do usuário
    const fetchLinhasFavoritas = async () => {
      try {
        const response = await api.get(`/api/linhas-favoritas/${user.id}`);
        if (response.status == 200) {
          setLinhasFavoritas(response.data);
        }
      } catch (error) {
        console.error('Erro ao buscar linhas favoritas:', error);
      }
    };
    // Chama a função para buscar as linhas favoritas ao montar o componente
    fetchLinhasFavoritas();
  }, [user.id]);

  // Função para remover uma linha favorita
  const removerFavorita = async (linhaId) => {
   
    try {
      const response = await api.delete(`/api/remover-favorita/${user.id}`, { linhaId: linhaId });
      if (response.status == 201) {
        // Atualiza o estado para refletir a remoção da linha favorita
        console.log("linha removida", response.data)
        setLinhasFavoritas((linhas) => linhas.filter((linha) => linha.id !== linhaId));
      }
    } catch (error) {
      console.error('Erro ao remover linha favorita:', error);
    }
  };

  
  return (
    <div>
      <div>
        <h1 className=' ml-1 mt-2 text-4xl font-medium border-l-4 rounded-lg p-2 border-main-500 mb-6'>Linhas Favoritas</h1>
      </div>
      {linhasFavoritas.length > 0 ? (
        <div className="mt-4 ml-2 grid gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {linhasFavoritas.map((linha) => (
          <div key={linha.id} className="bg-white shadow-lg rounded-lg p-4 flex flex-col w-full mb-4">
            <div className="mb-4 flex flex-row  justify-between">
              <div className='mr-4'>
                <p className='text-xs text-main-500 font-medium'>Cidade origem</p>
                <span className="text-2xl font-semibold">{linha.cidade_origem}</span>
              </div>
              <div className='mr-4'>
                <p className='text-xs text-main-500 font-medium'>Cidade destino</p>
                <span className="text-2xl font-semibold">{linha.cidade_destino}</span>
              </div>
            </div>
      
            <div className=" flex flex-row w-full justify-between mt-auto">
              <Link to={`/linhas/${linha.id}`} 
                className="flex-1 text-center font-semibold justify-center items-center py-2 px-4 bg-main-500 hover:bg-main-600 text-white rounded-md mx-1">
                Detalhes da linha
              </Link>
              <button
                onClick={() => removerFavorita(linha.id)}
                className="flex-1 text-center justify-center px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-md mx-1"
              >
                Remover favorita
              </button>
            </div>


          </div>
        ))}
      </div>
      ) : (
        <p className='m-2 text-lg'>Você ainda não possui linhas favoritas.</p>
      )
      }
    </div>
  );
};

export default FavoritasComponent;
