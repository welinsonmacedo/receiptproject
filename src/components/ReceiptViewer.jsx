import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { getFirestore, collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth'; 
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
  border: 1px solid #e9dfdf8d;
  border-radius: 5px;
  margin-top: 5rem;
  font-family: Arial, sans-serif;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 80%;
  height: 100%;
  background-color: #fff;
  padding: 2rem;
`;

const LogoImage = styled.img`
  border-radius: 50%;
  max-width: 10%;
  margin-bottom: 20px;
  display: block;
  margin: 0 auto;
`;

const Field = styled.div`
  margin-bottom: 10px;
  margin-top: 10px;
  display: flex;
  flex-direction:row;
  align-items: center;
  justify-content: center;
 
`;
const FieldAndress = styled.div`
  margin-bottom: 10px;
  margin-top: 10px;
  display: flex;
  flex-direction:column;
  align-items: center;
  justify-content: center;
 
`;

const Label = styled.span`
  font-weight: bold;
  color: #918585;
`;

const Value = styled.span`
  margin: 10px;
  color: #000;
`;

const SubTitle = styled.h3`
  color: #c0b8b8;
  text-align: center;
  display: block;
  margin: 0 auto;
`;

const SubContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: 2px solid #e9e0e0;
  width: 100%;
  padding: 5px;
  margin-top: 10px;
`;

const Signature = styled.h4`
  font-family: "Great Vibes", cursive;
  font-weight: 100;
  font-style: normal;
  font-size: 29px;
  display: block;
  margin: 0 auto;
  margin-top: 20px;
  text-align: center;
`;

const ReceiptViewer = () => {
  const { receiptId } = useParams();
  const [receiptData, setReceiptData] = useState({});
  const [logoURLs, setLogoURLs] = useState([]);
  const containerRef = useRef(null);
  const [currentUserUID, setCurrentUserUID] = useState(null);

  useEffect(() => {
    const auth = getAuth();


    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUserUID(user.uid);
      } else {
        setCurrentUserUID(null);
      }
    });

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

    const logo = 'https://r2.easyimg.io/9daixyqos/imagem_do_whatsapp_de_2024-03-24_%C3%A0(s)_20.37.08_3ac2c238.jpg'
    setLogoURLs([logo]);
   

    fetchReceiptData();
    
  }, [receiptId]);


  

 
  const handleDownloadPNG = async () => {
    try {

      const dataUrl = await toPng(containerRef.current);


      const link = document.createElement('a');
      link.download = (receiptData.clientName)+'.png';
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Erro ao baixar recibo em PNG:', error);
    }
  };

  if (receiptData.userId !== currentUserUID) {
    return <Container>Você não tem permissão para visualizar este recibo.</Container>;
  }
  function isImageURL(url) {
    return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
  }

  return (
    <Container>

      <Main ref={containerRef}>
        
          <LogoImage  src={logoURLs} alt='Logo '/>
       

        <SubTitle>DS Viagens e Transportes</SubTitle>
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
            <Label>Cliente:</Label>
            <Value>{receiptData.clientName}</Value>
          </Field>
          <Field>
            <Label>Doc:</Label>
            <Value>{receiptData.clientDocument}</Value>
          </Field>
        </SubContainer>
        <SubContainer>
          <Field>
            <Label>Descrição:</Label>
            <Value>{receiptData.content}</Value>
          </Field>
        </SubContainer>
        <SubContainer>
          <FieldAndress>
            <Label>Endereço de Saída:</Label>
            <Value>{receiptData.departureAddress}</Value>
          </FieldAndress>
        </SubContainer>
        <SubContainer>
          <FieldAndress>
            <Label>Endereço de Destino:</Label>
            <Value>{receiptData.destinationAddress}</Value>
          </FieldAndress>


        </SubContainer>
        <SubContainer>
          <Field>
            <Label>Serviço:</Label>
            <Value>{receiptData.service}</Value>
          </Field>
        </SubContainer>
        <SubContainer>
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
        <SubContainer>
          <FieldAndress>
          <Label>Assinatura:</Label>
            
              
             
                <img src="/ass.jpg" alt="" width='125px' />
              
          
          </FieldAndress>
          </SubContainer>
          <SubContainer>
          <Field>
            <Label>Data de Criação:</Label>
            <Value>{new Date(receiptData.createdAt?.seconds * 1000).toLocaleString()}</Value>
          </Field>
          </SubContainer>
          
       



      </Main>
      <button onClick={handleDownloadPNG}>Baixar Recibo em PNG</button>
     

    </Container>
  );
};

export default ReceiptViewer;
