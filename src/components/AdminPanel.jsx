import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getFirestore, collection, getDocs, deleteDoc, doc, where, query } from 'firebase/firestore';
import firebaseConfig from '../services/firebaseConfig';
import { auth } from '../services/firebaseAuth';
import { initializeApp } from 'firebase/app';

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

const Container = styled.div`
text-align: center;
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h2`
  margin-bottom: 20px;
`;
const TitleCell = styled.h3`
 
  color: blue;
`;
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
  margin-bottom: 10px;
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
  const [signatures ,setSignatures]= useState([])
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const currentUser = auth.currentUser;
        if (!currentUser) {
          throw new Error('Nenhum usuário autenticado encontrado.');
        }

   
        const vehiclesQuery = query(collection(db, 'vehicles'), where('userId', '==', currentUser.uid));
        const vehiclesSnapshot = await getDocs(vehiclesQuery);
        const vehiclesData = vehiclesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setVehicles(vehiclesData);

        const servicesQuery = query(collection(db, 'services'), where('userId', '==', currentUser.uid));
        const servicesSnapshot = await getDocs(servicesQuery);
        const servicesData = servicesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setServices(servicesData);

       
        const usersQuery = query(collection(db, 'users'), where('userId', '==', currentUser.uid));
        const usersSnapshot = await getDocs(usersQuery);
        const usersData = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUsers(usersData);

     
        const signaturesQuery = query(collection(db, 'signature'), where('userId', '==', currentUser.uid));
        const signaturesSnapshot = await getDocs(signaturesQuery);
        const signaturesData = signaturesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setSignatures(signaturesData);
      } catch (error) {
        console.error('Erro ao buscar documentos:', error);
      }
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
          <TitleCell>Veículos</TitleCell>
        </TableRow>
      </thead>
      <tbody>
        {vehicles.map(vehicle => (
          <TableRow key={vehicle.id}>
            <TableCell>
              <div>
                {vehicle.brand} {vehicle.model} ({vehicle.plate})
                <Button onClick={() => handleDelete('vehicles', vehicle.id)}>
                  <img src='delete.png' width={'15px'}/>
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </tbody>
    </Table>

    <Table>
      <thead>
        <TableRow>
          <TitleCell>Serviços</TitleCell>
        </TableRow>
      </thead>
      <tbody>
        {services.map(service => (
          <TableRow key={service.id}>
            <TableCell>
              <div>
                {service.name} - {service.description}
                <Button onClick={() => handleDelete('services', service.id)}>
                  <img src='delete.png' width={'15px'}/>
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </tbody>
    </Table>

    <Table>
      <thead>
        <TableRow>
          <TitleCell>Usuários</TitleCell>
        </TableRow>
      </thead>
      <tbody>
        {users.map(user => (
          <TableRow key={user.id}>
            <TableCell>
              <div>
                {user.name} - {user.document}
                <Button onClick={() => handleDelete('users', user.id)}>
                  <img src='delete.png' width={'15px'}/>
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </tbody>
    </Table>

    <Table>
      <thead>
        <TableRow>
          <TitleCell>Assinaturas </TitleCell>
        </TableRow>
      </thead>
      <tbody>
        {signatures.map(signature => (
          <TableRow key={signature.id}>
            <TableCell>
              <div>
                {signature.fullName}
              
                <Button onClick={() => handleDelete('signature', signature.id)}>
                  <img src='delete.png' width={'15px'}/>
                </Button>
              </div>
            </TableCell>
            
          </TableRow>
        ))}
      </tbody>
    </Table>
    <Table>
      <thead>
        <TableRow>
          <TitleCell>Assinaturas Imgs</TitleCell>
        </TableRow>
      </thead>
      <tbody>
        {signatures.map(signature => (
          <TableRow key={signature.id}>
            <TableCell>
              <div>
               
                <img src={signature.signatureImg} alt="Assinatura" />
                <Button onClick={() => handleDelete('signature', signature.id)}>
                  <img src='delete.png' width={'15px'}/>
                </Button>
              </div>
            </TableCell>
            
          </TableRow>
        ))}
      </tbody>
    </Table>
  </Container>
);
};



export default AdminPanel;
