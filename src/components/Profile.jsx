import React from 'react';
import styled from 'styled-components';
import UserEmail from './UserEmail';
import LogoutButton from './LogoutButton';
import RegisterMenu from './RegisterMenu';
import CreateUser from './CreateUsers';
import CreateVehicle from './CreateVehicle';
import AdminPanel from './AdminPanel';
import CloseComponent from './CloseComponent';
import Menu from './Menu';

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Profile = () => {
  return (
    <>
    <Menu/>
    <ProfileContainer>
     
      <h2>Perfil do Usuário</h2>
 
      <RegisterMenu/>
      <CloseComponent/>
      <UserEmail />
      <LogoutButton />
    </ProfileContainer>
    </>
  );
};

export default Profile;
