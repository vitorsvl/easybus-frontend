import React from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";

function Navbar() {

  const { user } = useContext(AuthContext);
  const { logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(`/`);
  };

  const getHomeHref = () => {
    if (user) {
      if (user.role === "funcionario") {
        return "/funcionario/";
      } else if (user.role === "administrador") {
        return "/administrador/";
      } else {
        return "/";
      }
    } else {
      return "/"
    }
  };

  return (
    <nav className="bg-white border-gray-200 rounded-b-lg shadow-lg">
      <div className="max-w-screen-xl flex flex-wrap items-center rounded-lg justify-between mx-auto p-2">
        <a href={getHomeHref()} className="flex items-center">
          <img src="/EasyBus.svg" alt="EasyBus logo"
            className="h-8 w-24 my-3" />
        </a>

        <div className="hidden w-full md:block md:w-auto" id="navbar-default">

          {/* Se o usuário logado existe renderiza opções*/}
          {user ? (
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white">
              {/* se for um passageiro mostra o link para linhas favoritas */}
              {user.passageiro ? (
                <li>
                  <Link to={`/passageiro/${user.passageiro.id}/favoritas`}
                    className="block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-main-600 md:p-0 ">
                    Linhas Favoritas
                  </Link>
                </li>
              ) : null}
              {/* Nome do usuário logado */}
              <li>
                <a href="/" className="block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-main-600 md:p-0 ">
                  {user.name}
                </a>
              </li>
              <li>
                <button onClick={handleLogout} className="block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-main-600 md:p-0 ">
                  Sair
                </button>
              </li>
            </ul>
          ) :
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white">
              <li>
                <Link to={`/login`}>Entrar</Link>
              </li>
              <li>
                {/* criar pagina de criação de usuário */}
                <Link to={`/cadastrar`}>Criar conta</Link>
              </li>
            </ul>
          }
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
