import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../contexts/authContext";
import api from '../api';

function CreatePassageiroForm() {
  const { register, handleSubmit, formState: { errors }, getValues } = useForm();
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const onSubmit = async (data) => {
    try {
      const requestData = {
        name: data.nome,
        email: data.email,
        password: data.senha,
      };

      const response = await api.post('/api/passageiros', requestData);

      if (response.status === 201) {
        setSuccessMessage('Passageiro cadastrado com sucesso!');
        
        const requestDataLogin = {
          email: data.email,
          password: data.senha,
        };
  
        const responseLogin = await api.post('/api/login', requestDataLogin);
  
        if (responseLogin.status === 200) {

          const userData = responseLogin.data; 
          login(userData); 
        
          setTimeout(() => {
            navigate(`/passageiro/home`);
          }, 3000);
        }
      }
    } catch (error) {
      console.error('API request error:', error);
    }
  };

  return (
    <div className="p-2">
      <div>
        <h1 className='text-4xl font-semibold border-l-4 border-main-500 mb-6'>Criar Conta</h1>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-2">
        <div className="mb-4">
          <label className="text-main-500 font-semibold" htmlFor="nome">
            Nome
          </label>
          <input
            name="nome" id="nome" placeholder="Nome"
            {...register('nome', {
              required: "Campo obrigatório.",
            })}
            className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-main-500 placeholder:italic"
          />
          {errors.nome && <p className="text-red-400 text-xs">{errors.nome.message}</p>}
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
          <label className="text-main-500 font-semibold" htmlFor="senha">
            Senha
          </label>
          <input
            type="password" name="senha" id="senha" placeholder="Senha"
            {...register('senha', {
              required: "Campo obrigatório.",
            })}
            className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-main-500 placeholder:italic"
          />
          {errors.senha && <p className="text-red-400 text-xs">{errors.senha.message}</p>}
        </div>

        <div className="mb-4">
          <label className="text-main-500 font-semibold" htmlFor="confirmarSenha">
            Confirmar Senha
          </label>
          <input
            type="password"
            name="confirmarSenha"
            id="confirmarSenha"
            placeholder="Confirmar Senha"
            {...register('confirmarSenha', {
              required: "Campo obrigatório.",
              validate: (value) =>
                value === getValues('senha') || "As senhas não correspondem.",
            })}
            className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-main-500 placeholder:italic"
          />
          {errors.confirmarSenha && (
            <p className="text-red-400 text-xs">{errors.confirmarSenha.message}</p>
          )}
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

export default CreatePassageiroForm;
