import React, { useState } from 'react';
import styled from 'styled-components';
import { auth } from '../services/firebaseAuth';

const Container = styled.div`
  max-width: 400px;
  margin: 0 auto;
`;

const Title = styled.h2`
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 10px;
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

const ErrorMessage = styled.div`
  color: red;
  margin-top: 10px;
`;

const SuccessMessage = styled.div`
  color: green;
  margin-top: 10px;
`;

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await auth.sendPasswordResetEmail(email);
      setMessage('Email de redefinição de senha enviado. Verifique sua caixa de entrada.');
      setError(null);
    } catch (error) {
      setError('Ocorreu um erro ao enviar o email de redefinição de senha.');
      setMessage(null);
    }
  };

  return (
    <Container>
      <Title>Redefinir Senha</Title>
      <Form onSubmit={handleResetPassword}>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button type="submit">Enviar Email de Redefinição de Senha</Button>
      </Form>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {message && <SuccessMessage>{message}</SuccessMessage>}
    </Container>
  );
};

export default ResetPassword;
