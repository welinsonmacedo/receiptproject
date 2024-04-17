import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';

const NavbarContainer = styled.nav`
  background-color: #333;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavMenu = styled.div`
  display: flex;
  @media (max-width: 768px) {
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
    flex-direction: column;
    position: absolute;
    top: 70px;
    left: 0;
    right: 0;
    background-color: #333;
    padding: 10px;
  }
`;

const NavItem = styled(Link)`
  padding: 10px 20px;
  color: #fff;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #555;
  }

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const Brand = styled(Link)`
  color: #fff;
  font-size: 1.2rem;
  text-decoration: none;
  font-weight: bold;
`;

const NavToggle = styled.div`
  display: none;
  cursor: pointer;
  @media (max-width: 768px) {
    display: block;
  }
`;
const Image = styled.img`
border-radius: 50%;
width: 50px;
`
const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <NavbarContainer>
      <Brand to="/home"> <Image src="/LOGO.jpg" alt="Icone-perfil"  /></Brand>
      <NavToggle onClick={toggleMenu}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </NavToggle>
      <NavMenu isOpen={isOpen}>
        <NavItem to="/generatereceipt" onClick={toggleMenu}>Gerar Recibo</NavItem>
        <NavItem to="/profile" onClick={toggleMenu}>Profile</NavItem>
        <NavItem to="/receiptlist" onClick={toggleMenu}>Recibos</NavItem>
        <LogoutButton onClick={toggleMenu} />
      </NavMenu>
    </NavbarContainer>
  );
};

export default Menu;
