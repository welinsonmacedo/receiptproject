import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getFirestore, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import firebaseConfig from '../services/firebaseConfig';
import { initializeApp } from 'firebase/app';

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h2`
  margin-bottom: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const TableCell = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
`;

const Button = styled.button`
  padding: 5px 10px;

  color: #fff;
  width: 30px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const AdminPanel = () => {
  const [vehicles, setVehicles] = useState([]);
  const [services, setServices] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const vehiclesSnapshot = await getDocs(collection(db, 'vehicles'));
      const vehiclesData = vehiclesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setVehicles(vehiclesData);

      const servicesSnapshot = await getDocs(collection(db, 'services'));
      const servicesData = servicesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setServices(servicesData);

      const usersSnapshot = await getDocs(collection(db, 'users'));
      const usersData = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(usersData);
    };

    fetchItems();
  }, []);

  const handleDelete = async (collectionName, id) => {
    try {
      await deleteDoc(doc(db, collectionName, id));
      alert('Item deletado com sucesso!');
      
      // Atualizar a lista após a exclusão
      if (collectionName === 'vehicles') {
        setVehicles(prevVehicles => prevVehicles.filter(vehicle => vehicle.id !== id));
      } else if (collectionName === 'services') {
        setServices(prevServices => prevServices.filter(service => service.id !== id));
      } else if (collectionName === 'users') {
        setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
      }
    } catch (error) {
      console.error('Erro ao deletar item:', error);
    }
  };

  return (
    <Container>
      <Title>Admin Panel</Title>
      <Table>
        <thead>
          <TableRow>
            <TableCell>Veículos</TableCell>
            <TableCell>Serviços</TableCell>
            <TableCell>Usuários</TableCell>
          </TableRow>
        </thead>
        <tbody>
          <TableRow>
            <TableCell>
              {vehicles.map(vehicle => (
                <div key={vehicle.id}>
                  {vehicle.brand} {vehicle.model} ({vehicle.plate})
                  <Button onClick={() => handleDelete('vehicles', vehicle.id)}>{<img src='delete.png' width={'15px'}/>}</Button>
                </div>
              ))}
            </TableCell>
            <TableCell>
              {services.map(service => (
                <div key={service.id}>
                  {service.name} - {service.description}
                  <Button onClick={() => handleDelete('services', service.id)}>{<img src='delete.png' width={'15px'}/>}</Button>
                </div>
              ))}
            </TableCell>
            <TableCell>
              {users.map(user => (
                <div key={user.id}>
                  {user.name} - {user.document}
                 
                  <Button onClick={() => handleDelete('users', user.id)}>{<img src='delete.png' width={'15px'}/>}</Button>
                </div>
              ))}
            </TableCell>
          </TableRow>
        </tbody>
      </Table>
    </Container>
  );
};

export default AdminPanel;
