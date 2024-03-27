import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import firebaseConfig from '../services/firebaseConfig';
import { initializeApp } from 'firebase/app';

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
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleAddSignature = async (e) => {
    e.preventDefault();
    try {
      // Adicionar a assinatura ao Firestore
      await addDoc(collection(db, 'signature'), {
        fullName,
        createdAt: new Date()
      });
      
      // Redirecionar para a página desejada após adicionar a assinatura
      navigate('/success');
    } catch (error) {
      setError('Erro ao adicionar a assinatura: ' + error.message);
    }
  };

  return (
    <Container>
      <Title>Cadastrar Assinatura</Title>
      <form onSubmit={handleAddSignature}>
        <FormGroup>
          <Label>Nome Completo:</Label>
          <Input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
          <Button type="submit">Cadastrar Assinatura</Button>
        </FormGroup>
        
      </form>
      {error && <div>{error}</div>}
    </Container>
  );
};

export default AddSignature;
