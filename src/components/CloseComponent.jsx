import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const CloseComponent = ({ onClose }) => {
  const navigate = useNavigate();

  const handleClose = () => {
    if (onClose) {
      onClose(); // Chama a função onClose fornecida pelo componente pai
    } else {
      navigate('/home'); // Navega de volta para o menu se não houver uma função onClose
    }
  };

  return <Button onClick={handleClose}>Fechar</Button>;
};

export default CloseComponent;
