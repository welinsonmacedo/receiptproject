import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { getFirestore, collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../services/firebaseConfig';

import { WhatsappShareButton } from 'react-share'; // Componente para compartilhar via WhatsApp


const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

const Container = styled.div`
  max-width: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 5rem;
  font-family: Arial, sans-serif;
`;
const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`
const LogoImage = styled.img`
  border-radius: 50%;
  max-width: 20%;
  margin-bottom: 20px;
`;

const Field = styled.div`
  margin-bottom: 10px;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const Label = styled.span`
  font-weight: bold;
`;

const Value = styled.span`
  margin-left: 5px;
`;
const SubTitle = styled.h3`

`
const SubContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap:20%;
  border: 2px solid gray;
  width: 100%;
  padding: 5px;
  margin-top: 10px;

`
const Signature = styled.h4`
  font-family: "Great Vibes", cursive;
  font-weight: 400;
  font-style: normal;
  font-size: 25px;
  margin-left: 20px;
`




const ReceiptViewer = () => {
  const { receiptId } = useParams();
  const [receiptData, setReceiptData] = useState({});
  const [logoURLs, setLogoURLs] = useState([]);
  const containerRef = useRef(null);


  
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
  
      const fetchLogoURLs = async () => {
        try {
          const logosCollection = collection(db, 'logos');
          const logosSnapshot = await getDocs(logosCollection);
          const urls = [];
          logosSnapshot.forEach(doc => {
            const logoData = doc.data();
            if (logoData.url) {
              urls.push(logoData.url);
            }
          });
          setLogoURLs(urls);
        } catch (error) {
          console.error('Erro ao buscar URLs das logos: ', error);
        }
      };
  
      fetchReceiptData();
      fetchLogoURLs();
    }, [receiptId]);
  
    const handleShareWhatsApp = () => {
      if (navigator.share) {
        navigator.share({
          title: 'Recibo',
          text: 'Confira este recibo:',
          url: window.location.href
        })
        .then(() => console.log('Conteúdo compartilhado com sucesso'))
        .catch((error) => console.error('Erro ao compartilhar conteúdo:', error));
      } else {
        console.log('O navegador não suporta o compartilhamento via WhatsApp');
      }
    };
  
    const handlePrint = () => {
      window.print();
    };
  
  return (
    <Container ref={containerRef}>
      {logoURLs.map((url, index) => (
        <LogoImage key={index} src={url} alt={`Logo ${index}`} />
      ))}
      < SubTitle>DS Viagens e Transportes</SubTitle>
      <Main >
        <SubContainer>
          <Field>
            <Label>Motorista:</Label>
            <Value>{receiptData.user}</Value>
          </Field>
          <Field>
            <Label>Doc:</Label>
            <Value>{receiptData.userDocument}</Value>
          </Field>
        </SubContainer>
        <SubContainer>
          <Field>
            <Label> Cliente:</Label>
            <Value>{receiptData.clientName}</Value>
          </Field>
          <Field>
            <Label>Doc:</Label>
            <Value>{receiptData.clientDocument}</Value>
          </Field>
        </SubContainer>
        <Field>
          <Label>Conteúdo:</Label>
          <Value>{receiptData.content}</Value>
        </Field>
        <Field>
          <Label>Endereço de Saída:</Label>
          <Value>{receiptData.departureAddress}</Value>
        </Field>
        <Field>
          <Label>Endereço de Destino:</Label>
          <Value>{receiptData.destinationAddress}</Value>
        </Field>
        <SubContainer>
          <Field>
            <Label>Serviço:</Label>
            <Value>{receiptData.service}</Value>
          </Field>

          <Field>
            <Label>Valor:</Label>
            <Value>R${receiptData.value},00</Value>
          </Field>
        </SubContainer>
        <SubContainer>
          <Field>
            <Label>Veículo:</Label>
            <Value>{receiptData.vehicle}</Value>
          </Field>
        </SubContainer>


        <Field>
          <Label>Data de Criação:</Label>
          <Value>{new Date(receiptData.createdAt?.seconds * 1000).toLocaleString()}</Value>
        </Field>
        <Field>
          <Label>Ass:</Label>
          <Signature>{receiptData.signature}</Signature>
        </Field>

      </Main>

      <button onClick={handlePrint}>Imprimir</button>
      <WhatsappShareButton
        url={window.location.href}
        onClick={handleShareWhatsApp}
        title="Recibo"
        separator=" - "
        image={logoURLs[0]} // Adicione a URL da imagem aqui
      >
        Compartilhar via WhatsApp
      </WhatsappShareButton>
    
    </Container>
  );
};

export default ReceiptViewer;
