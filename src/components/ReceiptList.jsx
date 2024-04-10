import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { getFirestore, collection, getDocs, deleteDoc, doc, where, query } from 'firebase/firestore';
import firebaseConfig from '../services/firebaseConfig';
import { initializeApp } from 'firebase/app';
import { auth } from '../services/firebaseAuth'; 
import CloseComponent from './CloseComponent';
import Menu from './Menu';

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 5rem;
`;

const Title = styled.h2`
  margin-bottom: 20px;
`;

const ItemGroup = styled.div`
  display: flex;
  gap: 20px;
  border: 1px solid #a6c0c78d;
  margin: 15px;
  padding: 10px;
  &:hover {
    background-color: #77b390;
    color: black;
    font-weight: 900;
  }
`;

const ReceiptList = () => {
  const [receipts, setReceipts] = useState([]);

  useEffect(() => {
    const fetchReceipts = async () => {
      try {
      
        const currentUser = auth.currentUser;
        if (!currentUser) {
          throw new Error('Nenhum usuário autenticado encontrado.');
        }
        

        const receiptsQuery = query(collection(db, 'receipts'), where('userId', '==', currentUser.uid));
        const receiptsSnapshot = await getDocs(receiptsQuery);
        const receiptsData = receiptsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setReceipts(receiptsData);
      } catch (error) {
        console.error('Erro ao buscar recibos:', error);
      }
    };

    fetchReceipts();
  }, [db]); 

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'receipts', id));
      setReceipts(prevReceipts => prevReceipts.filter(receipt => receipt.id !== id));
      alert('Recibo excluído com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir recibo:', error);
    }
  };

  return (
    <>
   <Menu/>
    <Container>
      <CloseComponent/>
      <Title>Lista de Recibos</Title>
      {receipts.map(receipt => (
        <ItemGroup key={receipt.id}>
          <Link to={`/receiptviewer/${receipt.id}`}>{receipt.clientName}</Link>
          <Link to={`/receiptviewer/${receipt.id}`}>R$:{receipt.value},00</Link>
          <Link to={`/receiptviewer/${receipt.id}`}>{new Date(receipt.createdAt?.seconds * 1000).toLocaleString()}</Link>
          <button onClick={() => handleDelete(receipt.id)}><img src="delete.png" alt="Delete" width="15px" /></button>
        </ItemGroup>
      ))}
    </Container>
    </>
  );
};

export default ReceiptList;
