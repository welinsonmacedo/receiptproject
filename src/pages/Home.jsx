import React, { useEffect } from 'react';

import styled from 'styled-components';
import UserEmail from '../components/UserEmail';
import LogoutButton from '../components/LogoutButton';
import { auth } from '../services/firebaseAuth';
import Menu from '../components/Menu';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  gap: 2rem;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const Home = () => {
 

  useEffect(() => {
  
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (!user) {
     
        window.location.href ='/';
      }
    });

   
    return () => unsubscribe();
  }, []);

  return (
    <Container>
        <Menu/>
      <UserEmail></UserEmail>
      <img src="profile.png" alt="Icone-perfil" />
      <LogoutButton/>
    </Container>
  );
};

export default Home;
