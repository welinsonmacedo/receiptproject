import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getFirestore, collection, addDoc, query, getDocs, deleteDoc } from 'firebase/firestore';
import firebaseConfig from '../services/firebaseConfig';
import { initializeApp } from 'firebase/app';

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

const LogoContainer = styled.div`
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
  const [logos, setLogos] = useState([]);

  useEffect(() => {
    const fetchLogos = async () => {
      const logosCollection = collection(db, 'logos');
      const logosSnapshot = await getDocs(logosCollection);
      const logosData = logosSnapshot.docs.map(doc => ({
        id: doc.id,
        url: doc.data().url
      }));
      setLogos(logosData);
    };
    fetchLogos();
  }, []);

  const handleAddLogo = async () => {
    try {
      await addDoc(collection(db, 'logos'), { url: logoLink });
      setLogoLink('');
    } catch (error) {
      console.error('Erro ao adicionar a logo:', error);
    }
  };

  const handleDeleteLogo = async (logoId) => {
    try {
      await deleteDoc(collection(db, 'logos').doc(logoId));
    } catch (error) {
      console.error('Erro ao excluir a logo:', error);
    }
  };

  return (
    <Container>
      <Title>Gerenciamento de Logotipos</Title>
      <Input 
        type="text" 
        placeholder="Insira o link da logo" 
        value={logoLink} 
        onChange={(e) => setLogoLink(e.target.value)} 
      />
      <Button onClick={handleAddLogo}>Adicionar Logo</Button>
      {logos.map(logo => (
        <div key={logo.id}>
          <LogoContainer>
            <img src={logo.url} width='90px' alt="Logo" />
          </LogoContainer>
          <Button onClick={() => handleDeleteLogo(logo.id)}>Apagar Logo</Button>
        </div>
      ))}
    </Container>
  );
};

export default LogoUpload;
