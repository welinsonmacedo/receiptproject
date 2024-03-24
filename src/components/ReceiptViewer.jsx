import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../services/firebaseConfig';

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

const Container = styled.div`
  max-width: 600px;
  text-align: center;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 5rem;
  font-family: Arial, sans-serif;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  text-align: center;
`;

const Field = styled.div`
  margin-bottom: 10px;
`;

const Label = styled.span`
  font-weight: bold;
`;

const Value = styled.span`
  margin-left: 5px;
`;

const ReceiptViewer = () => {
  const { receiptId } = useParams();
  const [receiptData, setReceiptData] = useState({});

  useEffect(() => {
    const fetchReceiptData = async () => {
      try {
        const receiptDocRef = doc(db, 'receipts', receiptId);
        const receiptDocSnapshot = await getDoc(receiptDocRef);
        if (receiptDocSnapshot.exists()) {
          const receiptData = receiptDocSnapshot.data();
          setReceiptData(receiptData);
        } else {
          console.log('O recibo não foi encontrado.');
        }
      } catch (error) {
        console.error('Erro ao buscar dados do recibo:', error);
      }
    };

    fetchReceiptData();
  }, [receiptId]);

  return (
    <Container>
      <Title>Visualizar Recibo</Title>
      <Field>
        <Label>Nome do Cliente:</Label>
        <Value>{receiptData.clientName}</Value>
      </Field>
      <Field>
        <Label>Documento do Cliente:</Label>
        <Value>{receiptData.clientDocument}</Value>
      </Field>
      <Field>
        <Label>Conteúdo:</Label>
        <Value>{receiptData.content}</Value>
      </Field>
      <Field>
        <Label>Data de Criação:</Label>
        <Value>{new Date(receiptData.createdAt?.seconds * 1000).toLocaleString()}</Value>
      </Field>
      <Field>
        <Label>Endereço de Saída:</Label>
        <Value>{receiptData.departureAddress}</Value>
      </Field>
      <Field>
        <Label>Endereço de Destino:</Label>
        <Value>{receiptData.destinationAddress}</Value>
      </Field>
      <Field>
        <Label>Serviço:</Label>
        <Value>{receiptData.service}</Value>
      </Field>
      <Field>
        <Label>Usuário:</Label>
        <Value>{receiptData.user}</Value>
      </Field>
      <Field>
        <Label>Valor:</Label>
        <Value>{receiptData.value}</Value>
      </Field>
      <Field>
        <Label>Veículo:</Label>
        <Value>{receiptData.vehicle}</Value>
      </Field>
    </Container>
  );
};

export default ReceiptViewer;
