import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where, deleteDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import db from '../services/firestore';
import styled from 'styled-components';

const ListContainer = styled.div`
  padding: 20px;
  background-color: #f9fafb;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const FilterGroup = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Label = styled.label`
  font-weight: 600;
  color: #333;
`;

const Input = styled.input`
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const Button = styled.button`
  padding: 12px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: #0056b3;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ReceiptListStyle = styled.div`
  margin-top: 20px;
  gap: 20px;
`;

const ReceiptItem = styled.div`
  padding: 20px;
  margin-bottom: 15px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background-color: #ada3a345;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.3s;
  cursor: pointer;

  &:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
    background-color: #70b4e045;
  }

  h3 {
    font-size: 18px;
    color: #1f2937;
  }

  p {
    margin: 8px 0;
    font-size: 16px;
    color: #4b5563;
  }

  strong {
    color: #111827;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 10px;
`;

const DeleteButton = styled(Button)`
  background-color: #f44336;
  
  &:hover {
    background-color: #d32f2f;
  }
`;

const formatDateForFirestore = (dateStr) => {
  const [year, month, day] = dateStr.split('-');
  return `${day}/${month}/${year}`;
};

const ReceiptList = () => {
  const [receipts, setReceipts] = useState([]);
  const [filters, setFilters] = useState({
    date: '',
  });
  const navigate = useNavigate();
  const auth = getAuth();

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

  const handleDeleteReceipt = async (id) => {
    const confirmed = window.confirm('Tem certeza que deseja excluir este recibo?');
    if (!confirmed) return;

    try {
      await deleteDoc(doc(db, 'recibos', id));
      setReceipts(receipts.filter((receipt) => receipt.id !== id));
    } catch (error) {
      console.error('Erro ao excluir recibo:', error);
    }
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
            <ReceiptItem key={receipt.id}>
              <p><strong>Cliente:</strong> {receipt.cliente}</p>
              <p><strong>Data:</strong> {receipt.dataAtual}</p>
              <p><strong>Valor:</strong> R$ {receipt.valor}</p>
              
              <ActionButtons>
                <DeleteButton onClick={() => handleDeleteReceipt(receipt.id)}>Excluir</DeleteButton>
              </ActionButtons>
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
