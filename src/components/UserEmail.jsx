import React from 'react';
import styled from 'styled-components';
import { auth } from '../services/firebaseAuth';

// Estilos usando styled-components
const Container = styled.div`
  font-family: Arial, sans-serif;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 400px;
  margin: 0 auto;
`;

const EmailText = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
`;

const FooterText = styled.p`
  font-size: 14px;
  color: #666;
`;

const StatusText = styled.p`
  font-size: 16px;
  color: ${({ authenticated }) => (authenticated ? 'green' : 'red')};
`;

const UserEmail = () => {
  const user = auth.currentUser;
  const isAuthenticated = user !== null;

  return (
    <Container>
      {user && (
        <>
          <EmailText>{user.email}</EmailText>
          <StatusText authenticated={isAuthenticated}>
            {isAuthenticated ? 'Autenticado' : 'Não autenticado'}
          </StatusText>
        </>
      )}
      <FooterText>Desenvolvido por Welinson Macedo 2024</FooterText>
    </Container>
  );
};

export default UserEmail;
