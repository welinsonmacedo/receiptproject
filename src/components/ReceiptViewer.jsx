import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { getFirestore, collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../services/firebaseConfig';
import { toPng } from 'html-to-image'; 


const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);


const Container = styled.div`
  max-width: 100%;
  background-color: #fff;
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
  max-width: 10%;
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

  const handleDownloadPNG = async () => {
    try {
      // Converta o conteúdo da tag Container para uma imagem PNG
      const dataUrl = await toPng(containerRef.current);
      
      // Crie um link temporário para fazer o download da imagem
      const link = document.createElement('a');
      link.download = 'recibo.png';
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Erro ao baixar recibo em PNG:', error);
    }
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

      <button onClick={handleDownloadPNG}>
        Baixar Recibo em PNG
      </button>
    
    </Container>
  );
};

export default ReceiptViewer;
