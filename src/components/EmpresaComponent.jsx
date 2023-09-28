import React, { useEffect, useState } from 'react';
import api from '../api';
import { useParams, Link } from 'react-router-dom';

// HOME DO FUNCIONARIO //

function EmpresaComponent() {

  const { id }  = useParams();
  const [empresa, setEmpresa] = useState([]);

  useEffect(() => {

    api.get(`/api/empresas/${id}`)
      .then((response) => {
        setEmpresa(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [id]);

  return (
    <div>
      <h1>{empresa.nome}</h1>
      <ul>
        <li>CNPJ:</li> {empresa.cnpj}<br />
        <li>Telefone:</li> {empresa.telefone}<br />
        <li>Email:</li> {empresa.email}<br />
        <li>Endereço:</li> {empresa.endereco}<br /> 
      </ul>
    </div>
  );
}

export default EmpresaComponent;
