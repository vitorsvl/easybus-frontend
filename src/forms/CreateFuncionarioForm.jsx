import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import api from '../api';


function CreateFuncionarioForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [successMessage, setSuccessMessage] = useState('');
  const [empresas, setEmpresas] = useState('');
  
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/api/empresas/`)
      .then((response) => {
        setEmpresas(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
    });
  }, []);

  const onSubmit = async (data) => {
    
    try {
      const requestData = {
        name: data.nome, // na api todos os users as colunas de nome estão como 'name'
        email: data.email,
        cpf: data.cpf,
        empresa_id: parseInt(data.empresa, 10),
      };
      console.log(requestData)
      const response = await api.post('/api/funcionarios', requestData);

      if (response.status === 201) {
        
        setSuccessMessage('Funcionário com sucesso!');
        
        setTimeout(() => {
          navigate(`/home/${response.data.id}`); // retornar no backend o id da empresa, navigate to home/user
        }, 7000);
      }
    } catch (error) {
      console.error('API request error:', error);
    }
  };


  return (
    <div className="p-2">
      <div> 
        <h1 className='text-4xl font semibold border-l-4 border-main-500 mb-6'>Cadastrar Funcionário</h1>
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
          <label className="text-main-500 font-semibold" htmlFor="cpf">
            CPF
          </label>
          <input
            name="cpf" id="cpf" placeholder=" XXX.XXX.XXX-XX (11 digitos)"
            {...register('cpf', {
              required: "Campo origatório.",
              minLength: {
                value: 11,
                message: "cpf inválido."
              },
              maxLength: {
                value: 11,
                message: "cpf inválido."
              }
            })}
            className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-main-500 placeholder:italic"
          />
          {errors.cpf && <p className="text-red-400 text-xs">{errors.cpf.message}</p>}
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
          <label className="text-main-500 font-semibold" htmlFor="empresa">
            Empresa
          </label>
          <select
            name="empresa"
            id="empresa"
            {...register('empresa', {
                required: "Campo obrigatório.",
            })}
            className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-main-500"
            >
            <option value="" disabled>Selecione uma empresa</option>
            {empresas && Array.isArray(empresas) && empresas.map((empresa) => (
            <option key={empresa.id} value={empresa.id}>
                {empresa.nome}
            </option>
            ))}
          </select>
          {errors.empresa && <p className="text-red-400 text-xs">{errors.empresa.message}</p>}
        </div>
        <button
          type="submit"
          className="block text-center px-4 py-2 mt-4 bg-main-500 hover:bg-main-600 text-white font-semibold rounded-md"
        >
          Cadastrar
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

export default CreateFuncionarioForm;