import React, { useState } from 'react';
import styled from 'styled-components';
import firebaseConfig from '../services/firebaseConfig';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

// Inicialize o Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

const Container = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 5rem;
`;

const Title = styled.h2`
  margin-bottom: 20px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 90%;
  padding: 10px;
  font-size: 16px;
`;

const Button = styled.button`
  width: 96%;
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

const CreateUsers = () => {
  const [name, setName] = useState('');
  const [document, setDocument] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'users'), {
        name,
        document
      });
      setName('');
      setDocument('');
      setError(null);
      alert('Usuário cadastrado com sucesso!');
    } catch (error) {
      setError('Erro ao cadastrar usuário: ' + error.message);
    }
  };

  return (
    <Container>
      <Title>Cadastrar Usuário</Title>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Nome:</Label>
          <Input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </FormGroup>
        <FormGroup>
          <Label>Documento:</Label>
          <Input type="text" value={document} onChange={(e) => setDocument(e.target.value)} required />
        </FormGroup>
        <Button type="submit">Cadastrar</Button>
      </form>
      {error && <div>{error}</div>}
    </Container>
  );
};

export default CreateUsers;
