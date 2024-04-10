import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
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
import firebaseConfig from './services/firebaseConfig';
import AuthProvider from './components/AuthProvider';


// Inicialize o app do Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Verifica se o usuário está autenticado ao carregar o aplicativo
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
      setLoading(false);
    });

    // Limpa o evento de escuta ao desmontar o componente
    return () => unsubscribe();
  }, []);

  // Se o aplicativo estiver carregando, exiba uma tela de carregamento
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      
      <AuthProvider>
     
        <Routes>
          
          <Route exact path="/" element={<Login setAuthenticated={setAuthenticated} />} />
          <Route path="/createuser" element={<CreateUser />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/home" element={authenticated ? <Home /> : <Navigate to="/" />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/createusers" element={<CreateUsers />} />
          <Route path="/createvehicles" element={<CreateVehicle />} />
          <Route path="/createservices" element={<CreateService />} />
          <Route path="/generatereceipt" element={<GenerateReceipt />} />
          <Route path="/receiptviewer/:receiptId" element={<ReceiptViewer />} />
          <Route path="/receiptlist" element={<ReceiptList />} />
          <Route path="/logo" element={<LogoUpload />} />
          <Route path="/signature" element={<AddSignature />} />
          <Route path="/paineladmin" element={authenticated ? <AdminPanel /> : <Navigate to="/" />} />
        </Routes>
      </AuthProvider>

    </Router>
  );
}

export default App;
