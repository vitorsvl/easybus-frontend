import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/authContext';

const UnauthorizedPage = () => (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 text-center rounded relative" role="alert">
        <strong className="font-bold">Usuário não autorizado!</strong>
        <span className="block sm:inline"> Você não tem permissão para acessar esta página.</span>
    </div>
  );

  const LoadingComponent = () => (
    <div>
        <p>checando...</p>
    </div>
  )

const ProtectedRoute = ({ element, roles }) => {
  
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user !== undefined) {
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return <LoadingComponent />;
  }
  if ( user ) {
    if (!roles.includes(user.role)) {
      // Usuário está autenticado, mas não está autorizado

      return <UnauthorizedPage />;
    }
  } else {
    // Usuário não está autenticado, redirecionar para login
    return <Navigate to="/login" />;
  }
  return element;
};

export default ProtectedRoute;
