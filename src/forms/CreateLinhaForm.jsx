import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import api from '../api';

function CreateLinhaForm() {
  const { id } = useParams();
  const { register, handleSubmit, formState: { errors }, control } = useForm({
    defaultValues: {
      viagens: [{ paradas: [{ local: "" }] }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "viagens"
  });

  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const requestData = {
        cidade_origem: data.cidade_origem,
        cidade_destino: data.cidade_destino,
        empresa_id: parseInt(id),
        viagens: data.viagens.map((viagem) => ({
          horario_partida: viagem.horario_partida,
          horario_chegada: viagem.horario_chegada,
          valor_passagem: parseFloat(viagem.valor_passagem),
          paradas: viagem.paradas.split(",").map(local => ({ local: local.trim() }))
        }))
      };
      console.log(requestData)
      const response = await api.post('/api/linhas', requestData);

      if (response.status === 201) {
        setSuccessMessage('Linha criada com sucesso!');
        setTimeout(() => {
          navigate(`/linhas/${response.data.id}`);
        }, 3000);
      }
    } catch (error) {
      console.error('API request error:', error);
    }
  };

  return (
    <div className="p-2">
      <div>
        <h1 className='text-4xl font semibold border-l-4 border-main-500 mb-6'>Criar Linha</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-2">
        <div className="mb-4">
          <label className="text-main-500 font-semibold" htmlFor="cidade_origem">
            Cidade Origem
          </label>
          <input
            name="cidade_origem" id="cidade_origem" placeholder="Cidade A"
            {...register('cidade_origem', {
              required: "Campo obrigatório.",
            })}
            className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-main-500 placeholder:italic"
          />
          {errors.cidade_origem && <p className="text-red-400 text-xs">{errors.cidade_origem.message}</p>}
        </div>
        <div className="mb-4">
          <label className="text-main-500 font-semibold" htmlFor="cidade_destino">
            Cidade Destino
          </label>
          <input
            name="cidade_destino" id="cidade_destino" placeholder="Cidade B"
            {...register('cidade_destino', {
              required: "Campo obrigatório.",
            })}
            className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-main-500 placeholder:italic"
          />
          {errors.cidade_destino && <p className="text-red-400 text-xs">{errors.cidade_destino.message}</p>}
        </div>

        {fields.map((trip, index) => (
          <div key={trip.id} className="border p-4 mb-4 rounded-md">
            <h3 className="text-lg font-semibold mb-2">Viagem {index + 1}</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="text-main-500 font-semibold" htmlFor={`viagens[${index}].horario_partida`}>
                  Horário de Partida
                </label>
                <input
                  name={`viagens[${index}].horario_partida`} id={`viagens[${index}].horario_partida`}
                  {...register(`viagens[${index}].horario_partida`, {
                    required: "Campo obrigatório.",
                  })}
                  className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-main-500 placeholder:italic"
                />
                {errors.viagens && errors.viagens[index] && errors.viagens[index].horario_partida && <p className="text-red-400 text-xs">{errors.viagens[index].horario_partida.message}</p>}
              </div>
              <div>
                <label className="text-main-500 font-semibold" htmlFor={`viagens[${index}].horario_chegada`}>
                  Horário de Chegada
                </label>
                <input
                  name={`viagens[${index}].horario_chegada`} id={`viagens[${index}].horario_chegada`}
                  {...register(`viagens[${index}].horario_chegada`, {
                    required: "Campo obrigatório.",
                  })}
                  className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-main-500 placeholder:italic"
                />
                {errors.viagens && errors.viagens[index] && errors.viagens[index].horario_chegada && <p className="text-red-400 text-xs">{errors.viagens[index].horario_chegada.message}</p>}
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="text-main-500 font-semibold" htmlFor={`viagens[${index}].valor_passagem`}>
                  Valor da Passagem
                </label>
                <input
                  name={`viagens[${index}].valor_passagem`} id={`viagens[${index}].valor_passagem`}
                  {...register(`viagens[${index}].valor_passagem`, {
                    required: "Campo obrigatório.",
                  })}
                  className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-main-500 placeholder:italic"
                />
                {errors.viagens && errors.viagens[index] && errors.viagens[index].valor_passagem && <p className="text-red-400 text-xs">{errors.viagens[index].valor_passagem.message}</p>}
              </div>
              <div>
                <label className="text-main-500 font-semibold" htmlFor={`viagens[${index}].paradas`}>
                  Paradas (separadas por vírgula)
                </label>
                <input
                  name={`viagens[${index}].paradas`} id={`viagens[${index}].paradas`}
                  {...register(`viagens[${index}].paradas`, {
                    required: "Campo obrigatório.",
                  })}
                  className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-main-500 placeholder:italic"
                />
                {errors.viagens && errors.viagens[index] && errors.viagens[index].paradas && <p className="text-red-400 text-xs">{errors.viagens[index].paradas.message}</p>}
              </div>
            </div>
            {index > 0 && (
              <button type="button" onClick={() => remove(index)} className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md">
                Remover Viagem
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={() => append({ paradas: [{ local: "" }] })}
          className="mt-2 px-4 py-2 bg-white border-main-500 border hover:bg-main-500 hover:text-white text-main-500 font-semibold rounded-md"
        >
          Adicionar Viagem
        </button>

        <button
          type="submit"
          className="block text-center px-10 py-3 mt-4 bg-main-500 hover:bg-main-600 text-white font-semibold rounded-md"
        >
          Criar Linha
        </button>
      </form>
      {successMessage && (
        <div className="flex items-center justify-center bg-green-200 rounded-lg p-1">
          <p className="text-green-500 font-semibold text-lg">
            {successMessage}
          </p>
        </div>
      )}
    </div>
  );
}

export default CreateLinhaForm;
