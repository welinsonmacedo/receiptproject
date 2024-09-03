import React, { useState } from 'react';
import { Nav, NavItem, NavLinks, NavDropdown } from './NavBar.styles';
import MenuIcon from '@mui/icons-material/Menu';
import Dropdown from './Dropdown';

const NavBar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <Nav>
      <NavItem>
        <NavLinks onClick={toggleDropdown}>
          <MenuIcon  data-testid="MenuIcon " />
          {dropdownOpen && <Dropdown />}
        </NavLinks>
      </NavItem>
      <NavItem>
        <NavLinks href="/receiptlist">Histórico</NavLinks>
      </NavItem>
      <NavItem>
        <NavDropdown >
          Serviços
         
        </NavDropdown>
      </NavItem>
    </Nav>
  );
};

export default NavBar;
