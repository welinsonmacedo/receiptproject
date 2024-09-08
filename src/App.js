import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Login from './components/Login';
import CreateUser from './components/CreateUser';
import ResetPassword from './components/ResetPassword';
import Home from './pages/Home';

import firebaseConfig from './services/firebaseConfig';
import AuthProvider from './components/AuthProvider';
import ProfileMenu from './components/ProfileMenu/ProfileMenu';
import Dashboard from './pages/Dashboard';
import ReceiptForm from './components/ReceiptForm/ReceiptForm';
import ReceiptFormSales from './components/ReceiptFormSales/ReceiptFormSales';
import ReceiptList from './pages/ReceiptList';
import ReceiptView from './pages/ReceiptView';

// Inicialize o app do Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

function App() {
  const [authenticated, setAuthenticated] = useState(false);



  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/createuser" element={<CreateUser />} />
          <Route path="/login" element={<Login setAuthenticated={setAuthenticated} />} />
          <Route path="/menu" element={<ProfileMenu />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/receiptform"  element={<ReceiptForm /> } />
          <Route path="/receiptformSales"  element={<ReceiptFormSales/> } />
          <Route path="/receiptlist"  element={<ReceiptList /> } />
          <Route path="/receipt/:id" element={<ReceiptView/>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;

