import React from 'react';
import { auth } from '../services/firebaseAuth';


const LogoutButton = () => {
   
  const handleLogout = () => {
    auth.signOut().then(() => {
      console.log('Usuário deslogado');
      window.location.href ='/';
    }).catch((error) => {
      console.error('Erro ao fazer logout:', error);
    });
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default LogoutButton;
