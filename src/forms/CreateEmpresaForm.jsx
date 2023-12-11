import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import api from '../api';


function CreateEmpresaForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    
    try {
      const requestData = {
        nome: data.nome,
        cnpj: data.cnpj,
        email: data.email,
        telefone: data.telefone,
        endereco: data.endereco,
      };
      const response = await api.post('/api/empresas', requestData);

      if (response.status === 201) {
        
        setSuccessMessage('Empresa criada com sucesso!');
        
        setTimeout(() => {
          navigate(`administrador/empresas/${response.data.id}`); 
        }, 3000);
      }
    } catch (error) {
      console.error('API request error:', error);
    }
  };

  return (
    <div className="p-2">
      <div> 
        <h1 className='text-4xl font semibold border-l-4 border-main-500 mb-6'>Criar Empresa</h1>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-2">
        <div className="mb-4">
          <label className="text-main-500 font-semibold" htmlFor="nome">
            Nome
          </label>
          <input
            name="nome" id="nome" placeholder="nome"
            {...register('nome', {
              required: "Campo obrigatório.",
            })}
            className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-main-500 placeholder:italic"
          />
          {errors.nome && <p className="text-red-400 text-xs">{errors.nome.message}</p>}
        </div>
        <div className="mb-4">
          <label className="text-main-500 font-semibold" htmlFor="cnpj">
            CNPJ
          </label>
          <input
            name="cnpj" id="cnpj" placeholder=" XX. XXX. XXX/0001-XX (14 digitos)"
            {...register('cnpj', {
              required: "Campo origatório.",
              minLength: {
                value: 14,
                message: "CNPJ inválido."
              },
              maxLength: {
                value: 14,
                message: "CNPJ inválido."
              }
            })}
            className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-main-500 placeholder:italic"
          />
          {errors.cnpj && <p className="text-red-400 text-xs">{errors.cnpj.message}</p>}
        </div>
        <div className="mb-4">
          <label className="text-main-500 font-semibold" htmlFor="email">
            Email
          </label>
          <input
            type="email" name="email" id="email" placeholder="exemplo@mail.com"
            {...register('email', {
              required: "Campo obrigatório.",
            })}
            className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-main-500 placeholder:italic"
          />
          {errors.email && <p className="text-red-400 text-xs">{errors.email.message}</p>}
        </div>
        <div className="mb-4">
          <label className="text-main-500 font-semibold" htmlFor="telefone">
            Telefone
          </label>
          <input
            name="telefone" id="telefone" placeholder="99999-99999"
            {...register('telefone', {
              required: "Campo obrigatório.",
            })}
            className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-main-500 placeholder:italic"
          />
          {errors.telefone && <p className="text-red-400 text-xs">{errors.telefone.message}</p>}
        </div>
        <div className="mb-4">
          <label className="text-main-500 font-semibold" htmlFor="endereco">
            Endereço
          </label>
          <input
            name="endereco" id="endereco" placeholder="Rua ABC, 45, Centro"
            {...register('endereco', {
              required: "Campo obrigatório.",
            })}
            className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-main-500 placeholder:italic"
          />
          {errors.endereco && <p className="text-red-400 text-xs">{errors.endereco.message}</p>}
        </div>
        <button
          type="submit"
          className="block text-center px-4 py-2 mt-4 bg-main-500 hover:bg-main-600 text-white font-semibold rounded-md"
        >
          Criar
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

export default CreateEmpresaForm;