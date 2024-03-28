import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import CreateUser from './components/CreateUser';
import CreateUsers from './components/CreateUsers';
import ResetPassword from './components/ResetPassword';
import Home from './pages/Home';
import Profile from './components/Profile';
import CreateVehicle from './components/CreateVehicle';
import CreateService from './components/CreateService';
import GenerateReceipt from './components/GenerateReceipt';
import ReceiptViewer from './components/ReceiptViewer';
import ReceiptList from './components/ReceiptList';
import LogoUpload from './components/LogoUpload';
import AddSignature from './components/AddSignature';
import AdminPanel from './components/AdminPanel';

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  // Função para verificar se o usuário está autenticado
  useEffect(() => {
    // Implemente sua lógica de verificação de autenticação aqui
    // Exemplo: verificar se há um token de autenticação no localStorage
    const token = localStorage.getItem('token');
    if (token) {
      setAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      <Routes>
        {/* Rota para a página de login */}
        <Route exact path="/" element={<Login setAuthenticated={setAuthenticated} />} />

        {/* Rota para a página de criar usuário */}
        <Route path="/createuser" element={<CreateUser />} />

        {/* Rota para a página de redefinir senha */}
        <Route path="/resetpassword" element={<ResetPassword />} />

        {/* Rota protegida para a página inicial */}
        <Route path="/home" element={authenticated ? <Home /> : <Navigate to="/" />} />

        {/* Rota para a página de perfil */}
        <Route path="/profile" element={<Profile />} />

        {/* Rota para a página de criar usuários (possivelmente restrita a usuários com permissão de administração) */}
        <Route path="/createusers" element={<CreateUsers />} />

        {/* Rota para a página de criar veículos */}
        <Route path="/createvehicles" element={<CreateVehicle />} />

        {/* Rota para a página de criar serviços */}
        <Route path="/createservices" element={<CreateService />} />

        {/* Rota para a página de gerar recibo */}
        <Route path="/generatereceipt" element={<GenerateReceipt />} />

        {/* Rota para a página de visualizar recibo */}
        <Route path="/receiptviewer/:receiptId" element={<ReceiptViewer />} />

        {/* Rota para a página de listar recibos */}
        <Route path="/receiptlist" element={<ReceiptList />} />

        {/* Rota para a página de fazer upload de logo */}
        <Route path="/logo" element={<LogoUpload />} />

        {/* Rota para a página de adicionar assinatura */}
        <Route path="/signature" element={<AddSignature />} />

        {/* Rota protegida para o painel de administração */}
        <Route path="/paineladmin" element={authenticated ? <AdminPanel /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
