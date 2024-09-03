import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import db from '../services/firestore';
import styled from 'styled-components';

const ListContainer = styled.div`
  padding: 20px;
`;

const FilterGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px 15px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const ReceiptListStyle = styled.div`
  margin-top: 20px;
`;

const ReceiptItem = styled.div`
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 10px;
  cursor: pointer;
`;

const formatDateForFirestore = (dateStr) => {
  const [year, month, day] = dateStr.split('-');
  return `${day}/${month}/${year}`; // Formato dia/mês/ano para Firestore
};

const ReceiptList = () => {
  const [receipts, setReceipts] = useState([]);
  const [filters, setFilters] = useState({
    date: '',
  });
  const navigate = useNavigate(); // Hook para navegação
  const auth = getAuth(); // Obter o usuário autenticado

  const fetchReceipts = async () => {
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) {
        console.error('Usuário não está autenticado.');
        return;
      }

      let q = query(collection(db, 'recibos'), where('userId', '==', userId));

      if (filters.date) {
        const formattedDate = formatDateForFirestore(filters.date);
        q = query(q, where('dataAtual', '==', formattedDate));
      }

      const querySnapshot = await getDocs(q);
      const receiptsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setReceipts(receiptsData);
    } catch (error) {
      console.error('Erro ao buscar recibos:', error);
    }
  };

  useEffect(() => {
    fetchReceipts();
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleReceiptClick = (id) => {
    navigate(`/receipt/${id}`); // Navegar para a página de visualização
  };

  return (
    <ListContainer>
      <h2>Lista de Recibos</h2>
      <FilterGroup>
        <Label>Data</Label>
        <Input
          type="date"
          name="date"
          value={filters.date}
          onChange={handleFilterChange}
        />
        <Button onClick={fetchReceipts}>Filtrar</Button>
      </FilterGroup>

      <ReceiptListStyle>
        {receipts.length > 0 ? (
          receipts.map((receipt) => (
            <ReceiptItem key={receipt.id} onClick={() => handleReceiptClick(receipt.id)}>
              <h3>Recibo ID: {receipt.id}</h3>
              <p><strong>Cliente:</strong> {receipt.cliente}</p>
              <p><strong>Data:</strong> {receipt.dataAtual}</p>
              <p><strong>Valor:</strong> R$ {receipt.valor}</p>
            </ReceiptItem>
          ))
        ) : (
          <p>Nenhum recibo encontrado.</p>
        )}
      </ReceiptListStyle>
    </ListContainer>
  );
};

export default ReceiptList;
