import React, { useEffect } from 'react';

import styled from 'styled-components';
import UserEmail from '../components/UserEmail';
import LogoutButton from '../components/LogoutButton';
import { auth } from '../services/firebaseAuth';
import Menu from '../components/Menu';

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
 
`;

const Image = styled.img`
width: 100%;
image-rendering: auto;
object-fit: cover;
display: block;
margin: 0 auto;
 
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
     
     <Image src="home.png" alt="" />
     
    </Container>
  );
};

export default Home;
