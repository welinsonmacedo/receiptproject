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

const Menu = () => {
  return (
    <MenuContainer>
      <Column>
        <MenuButton to="/generatereceipt">Gerar Recibo</MenuButton>
        <MenuButton to="/profile">Profile</MenuButton>
        <MenuButton to="/receiptlist">Historico de Recibos</MenuButton>
       
        {/* Adicione mais botões de menu conforme necessário */}
      </Column>
      {/* Adicione mais colunas de menu conforme necessário */}
    </MenuContainer>
  );
};

export default Menu;
