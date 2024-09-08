import React from 'react';
import { DropdownMenu, DropdownItem } from './Dropdown.styles';

const Dropdown = () => {
  return (
    <DropdownMenu>
      <DropdownItem href="/receiptform">Gerar Recibo Transporte </DropdownItem>
      <DropdownItem href="/receiptformSales">Gerar Recibo de Vendas</DropdownItem>
      <DropdownItem href="/receiptlist">Histórico</DropdownItem>
      <DropdownItem href="/">Sair</DropdownItem>
    </DropdownMenu>
  );
};

export default Dropdown;
