import React, { useState } from 'react';
import styled from 'styled-components';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 5rem;
`;

const Title = styled.div`
display: flex;
justify-content: center;

`;

const FormGroup = styled.div`
  margin-bottom: 5px;
  padding: 20px;
  width: 80%;
  border: none;
  
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight:bold;
  position: relative;
  top: 14px;
  left: 20px;
  color: #4d7394;
`;

const Input = styled.input`
    width: 100%;
  padding: 10px;
  font-size: 16px;
  border: none;
  border-bottom: 2px solid gray;
`;
const ToggleButton = styled.button`
position: relative;

left: 94%;
bottom:30px;
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

const ContainerLinks = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
margin-bottom: 2rem;
padding: 0 20px 0 20px;
text-decoration: none;
color: blue;
;
`
const ErrorMessage = styled.div`
  color: red;
  margin-top: 10px;
`;

const Login = ({ setAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const auth = getAuth();
  const navigate = useNavigate();

  const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleLogin = () => {
    if (!validarEmail(email)) {
      setError('Email inválido');
    } else {
      signInWithEmailAndPassword(auth, email, senha)
        .then((userCredential) => {
          setError(null);
          console.log('Usuário logado:', userCredential.user);
          setAuthenticated(true);
          navigate('/dashboard');
        })
        .catch((error) => {
          setError('Erro ao fazer login: ' + error.message);
        });
    }
  };

  return (
    <Container>
      <Title>
        <img src="WM.png" alt="Icone-Login" width={'200px'} />
      </Title>
      <FormGroup>
        <Label>E-mail</Label>
        <Input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
      </FormGroup>
      <FormGroup>
        <Label>Senha</Label>
        <Input type={showPassword ? 'text' : 'password'} value={senha} onChange={(e) => setSenha(e.target.value)} />
        <ToggleButton onClick={() => setShowPassword(!showPassword)}>{showPassword ? '🙈' : '👁️'}</ToggleButton>
      </FormGroup>
      <ContainerLinks>

        <Link to="/createuser" >Create an account</Link>
        <Link to="/resetpassword">Forgot password? </Link>


      </ContainerLinks>

      <Button onClick={handleLogin}>Login</Button>
      {error && <ErrorMessage>{error}</ErrorMessage>}

    </Container>
  );
};

export default Login;
