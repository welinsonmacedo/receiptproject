import React, { useEffect } from 'react';

import styled from 'styled-components';
import NavBar from '../components/NavBar/NavBar'

import { auth } from '../services/firebaseAuth';
import UserStatus from '../components/UserStatus';



export const PageContainer = styled.div`

`;
export const Banner = styled.img`
width: 30%;
display: block;
margin:0 auto;
`;


const Dashboard = () => {


    return (
        <PageContainer>
            <NavBar />
            <Banner src='WM.png'></Banner>
            <UserStatus/>
        </PageContainer>

    );


};

export default Dashboard;
