import React, { useEffect } from 'react';

import styled from 'styled-components';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { auth } from '../services/firebaseAuth';



export const PageContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

export const Section = styled.section`
  margin-bottom: 30px;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 20px;
`;

export const Description = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  text-align: justify;
  margin-bottom: 20px;
`;

export const FeaturesContainer = styled.ul`
  list-style-type: disc;
  margin-left: 20px;
`;

export const FeatureItem = styled.li`
  font-size: 1.1rem;
  margin-bottom: 8px;
`;

export const ProjectImage = styled.img`
  display: block;
  max-width: 100%;
  height: auto;
  margin: 20px auto;
`;

export const CallToAction = styled.p`
  font-size: 1.3rem;
  text-align: center;
  font-weight: bold;
`;
export const Banner = styled.img`
width: 50%;
display: block;
margin: 0 auto;
`;
export const Link = styled.a`
display: flex;
justify-content: flex-end;
align-items: center;
gap: 0.4rem;
color: #000;
`;

const Home = () => {
 


  return (
    <PageContainer>
      <Link href='login'>  <AccountCircleIcon data-testid="account-circle-icon" />Entrar</Link>
    <Section>
      <Title>Sistema para Geração de Recibos e Orçamentos</Title>
      <Banner src='WM.png'/>
      <Description>
        Nosso sistema facilita a criação e gestão de recibos e orçamentos de
        forma rápida, intuitiva e segura.
      </Description>
    </Section>
    
    <Section>
      <Title>Recursos Principais</Title>
      <FeaturesContainer>
        <FeatureItem>Criação personalizável de recibos e orçamentos</FeatureItem>
        <FeatureItem>Armazenamento seguro na nuvem</FeatureItem>
        <FeatureItem>Gerenciamento fácil de clientes e fornecedores</FeatureItem>
        <FeatureItem>Visualização e impressão em PDF</FeatureItem>
      </FeaturesContainer>
    </Section>

    <Section>
      <a href="/login">
      <ProjectImage src='BANNERHOME.png' alt="Ícone de Recibo" />
      </a>
    </Section>

    <Section>
      <CallToAction>
        Experimente agora mesmo e simplifique a gestão financeira do seu negócio!
      </CallToAction>
    </Section>
  </PageContainer>

    );
   
  
};

export default Home;
