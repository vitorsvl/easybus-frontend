    import { useState } from "react";
    import { useForm } from "react-hook-form";
    import { useNavigate } from 'react-router-dom';
    import { useContext } from "react";

    import api from '../api';
    import { AuthContext } from "../contexts/authContext";

    const LoginForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [failMessage, setFailMessage] = useState('');
    const navigate = useNavigate();
    

    const { login } = useContext(AuthContext);

    const onSubmit = async (data) => {
        
        try {
        const requestData = {
            email: data.email,
            password: data.password
        };
            const response = await api.post('/api/login', requestData);

            const userData = response.data
            const userType = userData.role;
            

            delete userData['user_type']

            if (response.status === 200) {
                // response vai conter o token de login, dados do usuário e tipo
                
                login(userData); // set context
              
                // redireciona de acordo com o tipo do usuário
                if (userType == 'administrador') {
                    navigate(`/administrador/home`) ;
                } else if (userType == 'funcionario') {
                    navigate(`/funcionario/home`);
                } else if (userType == 'passageiro') {
                    navigate(`/passageiro/home`);
                }
            
        }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setFailMessage("Email ou senha incorretos!") // ou exibir uma mensagem para o usuário
                // Faça algo para lidar com credenciais inválidas, como exibir uma mensagem de erro na interface
            } else {
                console.error('API request error:', error); // Log de outros erros para depuração
            }
        }
    };

    return (
      <section className="bg-gray-200">
        <div className="flex flex-col items-center justify-center px-8 py-8 mx-auto md:h-screen lg:py-0">
        <div className=" w-full bg-white rounded-lg shadow dark:border md:mt-8 sm:max-w-md xl:p-0">
        <div> 
            <h1 className='text-3xl font-semibold text-stone-800 my-6 text-center'>Login</h1>
        </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-2">  
            <div className="mb-4">
            <label className="text-main-500 font-semibold block mb-2 text-sm" htmlFor="email">
                Email
            </label>
            <input
                type="email" name="email" id="email" placeholder="exemplo@mail.com"
                {...register('email', {
                required: "Campo obrigatório.",
                })}
                className="w-full px-3 py-2 border rounded-md bg-gray-200 text-gray-700 focus:outline-none focus:border-main-500 placeholder:italic"
            />
            {errors.email && <p className="text-red-400 text-xs">{errors.email.message}</p>}
            </div>
            
            <div className="mb-4">
            <label className="text-main-500 font-semibold block mb-2 text-sm" htmlFor="password">
                Senha
            </label>
            <input
                name="password" id="password" placeholder="" type="password"
                {...register('password', {
                required: "Campo obrigatório.",
                })}
                className="w-full px-3 py-2 bg-gray-200 border rounded-md text-gray-700 focus:outline-none focus:border-main-500 placeholder:italic"
            />
            {errors.password && <p className="text-red-400 text-xs">{errors.password.message}</p>}
            </div>
            {failMessage && (
              <p className="text-red-600 font-medium text-sm">{ failMessage }</p>
            )}
            <button
            type="submit"
            className="w-full block text-center px-4 py-2 mt-4 bg-main-500 hover:bg-main-600 text-white font-semibold rounded-md"
            >
            Entrar
            </button>
        </form>
       
        </div>
        </div>
      </section>
    );
    }

    export default LoginForm;