import React, { useState } from 'react';
import styled from 'styled-components';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import firebaseConfig from '../services/firebaseConfig';
import { initializeApp } from 'firebase/app';

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);
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

const LogoImage = styled.img`
  max-width: 100%;
`;

const UploadInput = styled.input`
 
`;

const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const LogoUpload = () => {
  const [logoURL, setLogoURL] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const storageRef = ref(storage, `logos/${file.name}`);
    
    try {
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      setLogoURL(url);
      
      // Salvar o URL do logotipo no Firestore
      await addDoc(collection(db, 'logos'), { url });
    } catch (error) {
      console.error('Erro ao fazer upload do logotipo:', error);
    }
  };

  const handleDeleteLogo = async () => {
    const storageRef = ref(storage, 'logos/logo.png'); // Altere 'logo.png' para o nome do seu logotipo
    try {
      await deleteObject(storageRef);
      setLogoURL(null);
      
      // Excluir o logotipo do Firestore
      // Implemente a exclusão do documento do Firestore conforme necessário
    } catch (error) {
      console.error('Erro ao excluir o logotipo:', error);
    }
  };

  return (
    <Container>
      <Title>Upload de Logotipo</Title>
      <LogoContainer>
        {logoURL && <LogoImage src={logoURL} alt="Logo" />}
      </LogoContainer>
      <label htmlFor="logoUpload">
        <Button>Escolher Logotipo</Button>
      </label>
      <UploadInput type="file" id="logoUpload" onChange={handleFileChange} />
      {logoURL && (
        <>
          <Button onClick={handleDeleteLogo}>Apagar Logotipo</Button>
        </>
      )}
    </Container>
  );
};

export default LogoUpload;
