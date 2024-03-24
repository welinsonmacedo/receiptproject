import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  width: 200px;
`;

const MenuButton = styled(Link)`
  padding: 10px 20px;
  font-size: 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  margin-bottom: 10px;
  width: 100%;
  font-weight: 900;

  &:hover {
    background-color: #0056b3;
  }
`;

const RegisterMenu = () => {
  return (
    <MenuContainer>
      <Column>
        <MenuButton to="/createusers">Cadastrar Usuários</MenuButton>
        <MenuButton to="/createvehicles">Cadastrar Veiculos</MenuButton>
        <MenuButton to="/createservices">Cadastrar Serviços</MenuButton>
        <MenuButton to="/resetpassword">Redefinir Senha</MenuButton>
        <MenuButton to="/logo">Logotipo</MenuButton>
       
      </Column>
   
    </MenuContainer>
  );
};

export default RegisterMenu;
