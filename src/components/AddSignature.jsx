import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { auth } from '../services/firebaseAuth';
import UserEmail from './UserEmail';
import firebaseConfig from '../services/firebaseConfig';
import CloseComponent from './CloseComponent';

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

const Container = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 40px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 5rem;
`;

const Title = styled.h2`
  margin-bottom: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  gap: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
`;

const Button = styled.button`
  width: 100%;
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

const AddSignature = () => {
  const [fullName, setFullName] = useState('');
  const [signatureImg, setSignatureImg] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

// Verifica se o campo de nome completo está vazio
const isFullNameEmpty = fullName.trim() === '';

// Desabilita o campo de entrada da imagem se o campo de nome estiver preenchido
const isSignatureImgDisabled = !isFullNameEmpty;

// Verifica se o campo de link da imagem da assinatura está vazio
const isSignatureImgEmpty = signatureImg.trim() === '';

const isFullNameEmptyDisabled = !isSignatureImgEmpty

  const handleAddSignature = async (e) => {
    e.preventDefault();
    try {
      // Obtenha o ID do usuário atual
      const userId = auth.currentUser.uid;

      // Adicionar a assinatura ao Firestore
      await addDoc(collection(db, 'signature'), {
        fullName,
        signatureImg,
        createdAt: new Date(),
        userId,
      });

      // Redirecionar para a página de sucesso após adicionar a assinatura
      navigate('/success');
    } catch (error) {
      setError('Erro ao adicionar a assinatura: ' + error.message);
    }
  };

  return (
    <Container>
      <CloseComponent />
      <Title>Cadastrar Assinatura</Title>
      <form onSubmit={handleAddSignature}>
        <FormGroup>
          <Label>Nome Completo:</Label>
          <Input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} disabled={isFullNameEmptyDisabled} required />
        </FormGroup>
        <FormGroup>
          <Label>Link da Imagem da Assinatura:</Label>
          <Input
            type="text"
            value={signatureImg}
            onChange={(e) => setSignatureImg(e.target.value)}
            required
            disabled={isSignatureImgDisabled} // Desabilita o campo se o nome estiver preenchido
          />
        </FormGroup>
        <p>Somente e Possivel Cadastrar ou em Texto ou Img ('img fundo transparente')</p>
        <Button type="submit">Cadastrar Assinatura</Button>
      </form>
      <UserEmail />
      {error && <div>{error}</div>}
    </Container>
  );
};

export default AddSignature;
