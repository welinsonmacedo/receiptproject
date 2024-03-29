import React from 'react';
import styled from 'styled-components';
import { auth } from '../services/firebaseAuth';


const LogoutButtonStyled = styled.button`
  padding: 10px 20px;
  background-color: #f44336;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #d32f2f;
  }
`;

const LogoutButton = () => {
  const handleLogout = () => {
    auth.signOut().then(() => {
      console.log('Usuário deslogado');
      window.location.href = '/';
    }).catch((error) => {
      console.error('Erro ao fazer logout:', error);
    });
  };

  return (
    <LogoutButtonStyled onClick={handleLogout}>Logout</LogoutButtonStyled>
  );
};

export default LogoutButton;
