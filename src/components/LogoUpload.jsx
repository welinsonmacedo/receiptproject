import React, { useState } from 'react';
import styled from 'styled-components';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import firebaseConfig from '../services/firebaseConfig';
import { initializeApp } from 'firebase/app';
import { auth } from '../services/firebaseAuth';

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

const Container = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 5rem;
`;

const Title = styled.h2`
  margin-bottom: 20px;
`;

const Input = styled.input`
  margin-bottom: 10px;
  width: 100%;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 3rem;
  margin-bottom: 3rem;

  &:hover {
    background-color: #0056b3;
  }
`;

const LogoUpload = () => {
  const [logoLink, setLogoLink] = useState('');

  const handleAddLogo = async () => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        console.error('Nenhum usuário autenticado encontrado.');
        return;
      }

      await addDoc(collection(db, 'logos'), { url: logoLink, uid: currentUser.uid });
      setLogoLink('');
    } catch (error) {
      console.error('Erro ao adicionar a logo:', error);
    }
  };

  return (
    <Container>
      <Title>Adicionar Logotipo</Title>
      <Input 
        type="text" 
        placeholder="Insira o link da logo" 
        value={logoLink} 
        onChange={(e) => setLogoLink(e.target.value)} 
      />
      <Button onClick={handleAddLogo}>Adicionar Logo</Button>
    </Container>
  );
};

export default LogoUpload;
