import React from 'react';
import { DropdownMenu, DropdownItem } from './Dropdown.styles';

const Dropdown = () => {
  return (
    <DropdownMenu>
      <DropdownItem href="/receiptform">Gerar Recibo </DropdownItem>
      <DropdownItem href="/service2">Gerar Orçamento</DropdownItem>
      <DropdownItem href="/service3">Gerar Cupom</DropdownItem>
      <DropdownItem href="/service1">Cadastros </DropdownItem>
      <DropdownItem href="/service2">Histórico</DropdownItem>
      <DropdownItem href="/">Sair</DropdownItem>
    </DropdownMenu>
  );
};

export default Dropdown;
