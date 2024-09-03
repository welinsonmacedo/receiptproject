import styled from 'styled-components';

export const Nav = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 60px;
  background: #dddddd;
  color: white;
`;

export const NavItem = styled.div`
  position: relative;
`;

export const NavLinks = styled.a`
  color: #0d0d33;
  font-weight:900;
  text-decoration: none;
  padding: 0 20px;
  &:hover {
    color: #750909;
  }
`;

export const NavDropdown = styled.div`
  color: #0d0d33;
  font-weight:900;
  padding: 0 20px;
  cursor: pointer;
  &:hover {
    color: #750909;
  }
`;

export const DropdownContent = styled.div`
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  ${NavItem}:hover & {
    display: block;
  }
`;
