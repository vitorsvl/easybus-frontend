
# EasyBus - Evolução: Frontend em React & API Laravel

O EasyBus é uma plataforma web desenvolvida para facilitar o acesso prático a informações sobre viagens de ônibus intermunicipais. O projeto visa unificar e simplificar a busca por trajetos, horários e preços, melhorando a rotina de passageiros que dependem do transporte público.
O **EasyBus** evoluiu de uma aplicação monolítica para uma arquitetura moderna e escalável, com a separação clara entre Backend e Frontend. .


## 🚀 O que mudou nesta versão?

A principal mudança foi a substituição do sistema de templates Blade pelo framework **React**, transformando a aplicação em uma **Single Page Application (SPA)**.

*   **Interface mais Fluida:** Transições de página e interações mais suaves e consistentes.
*   **Design Refinado:** Uso de **Tailwind CSS** para uma estilização mais eficiente e próxima ao protótipo de alta fidelidade.
*   **Arquitetura Cliente-Servidor:** O Laravel agora atua exclusivamente como uma **API REST**, lidando com a lógica de negócio e persistência de dados, enquanto o React gerencia o estado e a interface.
*   **Melhorias Funcionais:**
    *   Formulários de criação de linhas agora permitem adicionar viagens dinamicamente em uma única página.
    *   Painel do administrador aprimorado com listagem direta de empresas e gestão de funcionários.

## 🛠️ Tecnologias Utilizadas

*   **Frontend:** [React](https://reactjs.org/) (hooks, estados e contextos).
*   **Estilização:** [Tailwind CSS](https://tailwindcss.com/).
*   **Backend (API):** [Laravel](https://laravel.com/).
*   **Banco de Dados:** Estrutura relacional via Eloquent ORM.
*   **Comunicação:** Requisições HTTP (Axios/Fetch) para consumo da API.

## ⚙️ Como Executar o Projeto

### 1. Backend
 Execute o backend seguindo as instruções em:
  `https://github.com/vitorsvl/easybus-backend`


### 2\. Frontend

``` bash
# Instale as dependências utilizando o Yarn
yarn install

# Inicie a aplicação em modo de desenvolvimento
yarn start
```


*Este projeto é fruto de uma Iniciação Científica realizada por **Vitor Gabriel de Souza Lara** no Departamento de Ciência da Computação da **UFSJ**


