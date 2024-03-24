import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import firebaseConfig from '../services/firebaseConfig';
import { initializeApp } from 'firebase/app';

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

const ReceiptList = () => {
  const [receipts, setReceipts] = useState([]);

  useEffect(() => {
    const fetchReceipts = async () => {
      try {
        const receiptsSnapshot = await getDocs(collection(db, 'receipts'));
        const receiptsData = receiptsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setReceipts(receiptsData);
      } catch (error) {
        console.error('Erro ao buscar recibos:', error);
      }
    };

    fetchReceipts();
  }, []);

  return (
    <Container>
      <Title>Lista de Recibos</Title>
      <ul>
        {receipts.map(receipt => (
          <li key={receipt.id}>
            <Link to={`/receiptviewer/${receipt.id}`}>{receipt.clientName}</Link>
            <Link to={`/receiptviewer/${receipt.id}`}>{receipt.value}</Link>
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default ReceiptList;
