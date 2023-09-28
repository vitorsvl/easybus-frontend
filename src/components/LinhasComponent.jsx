// src/components/ExampleComponent.js
import React, { useEffect, useState } from 'react';
import api from '../api';

function LinhasComponent() {
  const [linhaData, setLinhaData] = useState([]);
  const [viagemData, setViagemData] = useState([]);


  // useEffect(() => {
  //   api.get('/api/linhas')
  //     .then((response) => {
  //       setData(response.data);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching data:', error);
  //     });
  // }, []);

  return (
    <div>
      <h1>LINHAS</h1>
      
    </div>
  );
}

export default LinhasComponent;
