import React from 'react';
import styled from 'styled-components';
import { useAuth } from './AuthProvider';

const UserStatus = () => {
  const { authenticated, userEmail } = useAuth();

  // Extraia o nome do usuário antes do '@'
  const userName = userEmail ? userEmail.split('@')[0] : '';

  const ProfileContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
    background-color: #f5f5f5;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 20px;
    margin: 20px 0;
  `;

  const ProfileInfo = styled.p`
    font-size: 1.5rem;
    font-weight: 400;
    color: #8ea818;
  `;

  if (!authenticated) {
    return <p>Usuário não autenticado.</p>;
  }

  return (
    <ProfileContainer>
      <ProfileInfo>Bem-vindo, {userName}!</ProfileInfo>
    </ProfileContainer>
  );
};

export default UserStatus;
