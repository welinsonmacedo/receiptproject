import React, { useState } from 'react';
import styled from 'styled-components';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { auth } from '../services/firebaseAuth'; // Importe a instância de autenticação do Firebase
import CloseComponent from './CloseComponent';
import firebaseConfig from '../services/firebaseConfig';

// Inicialize o Firebase
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

const CreateVehicle = () => {
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [color, setColor] = useState('');
  const [plate, setPlate] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const currentUser = auth.currentUser; // Obter o usuário atualmente autenticado
      if (!currentUser) {
        throw new Error('Nenhum usuário autenticado encontrado.');
      }

      // Adicionar o veículo ao Firestore com o UID do usuário
      await addDoc(collection(db, 'vehicles'), {
        brand,
        model,
        color,
        plate,
        userId: currentUser.uid // Salvar o UID do usuário junto com os dados do veículo
      });

      // Limpar os campos do formulário e resetar o erro
      setBrand('');
      setModel('');
      setColor('');
      setPlate('');
      setError(null);

      // Exibir uma mensagem de sucesso
      alert('Veículo cadastrado com sucesso!');
    } catch (error) {
      // Em caso de erro, definir a mensagem de erro para exibir no componente
      setError('Erro ao cadastrar veículo: ' + error.message);
    }
  };

  return (
    <Container>
      <CloseComponent />
      <Title>Cadastrar Veículo</Title>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Marca:</Label>
          <Input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} required />
        </FormGroup>
        <FormGroup>
          <Label>Modelo:</Label>
          <Input type="text" value={model} onChange={(e) => setModel(e.target.value)} required />
        </FormGroup>
        <FormGroup>
          <Label>Cor:</Label>
          <Input type="text" value={color} onChange={(e) => setColor(e.target.value)} required />
        </FormGroup>
        <FormGroup>
          <Label>Placa:</Label>
          <Input type="text" value={plate} onChange={(e) => setPlate(e.target.value)} required />
        </FormGroup>
        <Button type="submit">Cadastrar</Button>
      </form>
      {error && <div>{error}</div>}
    </Container>
  );
};

export default CreateVehicle;
