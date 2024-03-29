import React, { useState } from 'react';
import styled from 'styled-components';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { Link } from 'react-router-dom';

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
  display: flex;
justify-content: center;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
  padding: 20px;
  
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
display: block;
margin: 0 auto;
  width: 50%;
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
const ToggleButton = styled.button`
position: relative;
left: 100%;
bottom:30px;
`;
const ErrorMessage = styled.div`
  color: red;
  margin-top: 10px;
`;
const ContainerLinks = styled.div`
display: flex;
flex-direction: row;
justify-content: right;
margin-bottom: 2rem;
padding: 0 20px 0 20px;
text-decoration: none;
color: blue;
;
`

const validarSenha = (senha) => {
  if (senha.length < 8) {
    return false;
  }

  if (!/[A-Z]/.test(senha)) {
    return false;
  }

  if (!/[^a-zA-Z0-9]/.test(senha)) {
    return false;
  }

  return true;
};

const validarEmail = (email) => {

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const CreateUser = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const auth = getAuth();

  const handleSignUp = async () => {
    try {
      if (!validarEmail(email)) {
        setError('Email inválido');
        return;
      }

      if (!validarSenha(password)) {
        setError('A senha deve conter pelo menos 8 caracteres, uma letra maiúscula e um caractere especial.');
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('Novo usuário criado:', userCredential.user);
      setEmail('');
      setPassword('');
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container>
      <Title>
        <img src="createuser.png" alt="Icone-create-user" />
      </Title>
      <FormGroup>
        <Label>Email:</Label>
        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </FormGroup>
      <FormGroup>
        <Label>Senha:</Label>

        <Input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} />
        <ToggleButton onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? '🙈' : '👁️'}
        </ToggleButton>
      </FormGroup>
      <ContainerLinks>
        <Link to="/">Login</Link>
      </ContainerLinks>
      <Button onClick={handleSignUp}>Cadastrar</Button>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Container>
  );
};

export default CreateUser;
