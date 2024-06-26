import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { getFirestore, collection, addDoc, getDocs, where, query } from 'firebase/firestore';
import firebaseConfig from '../services/firebaseConfig';
import { initializeApp } from 'firebase/app';
import { auth } from '../services/firebaseAuth';
import CloseComponent from './CloseComponent';
import Menu from './Menu';

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

const Container = styled.div`
  max-width: 350px;
  margin: 0 auto;
  padding: 40px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 5rem;
`;

const Title = styled.h2`
  margin-bottom: 20px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  font-size: 16px;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  font-size: 16px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const GenerateReceipt = () => {
    const [content, setContent] = useState('');
    const [clientName, setClientName] = useState('');
    const [clientDocument, setClientDocument] = useState('');
    const [service, setService] = useState('');
    const [vehicle, setVehicle] = useState('');
    const [user, setUser] = useState('');
    const [departureAddress, setDepartureAddress] = useState('');
    const [destinationAddress, setDestinationAddress] = useState('');
    const [value, setValue] = useState('');
    const [signature, setSignature] = useState('');
    const [error, setError] = useState(null);
    const [services, setServices] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [users, setUsers] = useState([]);
    const [signatures, setSignatures] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const currentUser = auth.currentUser;
                if (!currentUser) {
                    throw new Error('Nenhum usuário autenticado encontrado.');
                }

                const userUID = currentUser.uid;

                const servicesQuery = query(collection(db, 'services'), where('userId', '==', userUID));
                const servicesSnapshot = await getDocs(servicesQuery);
                const servicesData = servicesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setServices(servicesData);

                const vehiclesQuery = query(collection(db, 'vehicles'), where('userId', '==', userUID));
                const vehiclesSnapshot = await getDocs(vehiclesQuery);
                const vehiclesData = vehiclesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setVehicles(vehiclesData);

                const usersQuery = query(collection(db, 'users'), where('userId', '==', userUID));
                const usersSnapshot = await getDocs(usersQuery);
                const usersData = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), userDocument: doc.data().document }));
                setUsers(usersData);

                const signaturesQuery = query(collection(db, 'signature'), where('userId', '==', userUID));
                const signaturesSnapshot = await getDocs(signaturesQuery);
                const signaturesData = signaturesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setSignatures(signaturesData);
            } catch (error) {
                console.error('Erro ao buscar documentos:', error);
                setError('Erro ao buscar documentos: ' + error.message);
            }
        };

        fetchItems();
    }, [db]);

    const handleGenerateReceipt = async (e) => {
        e.preventDefault();
        try {
            const currentUser = auth.currentUser;
            if (!currentUser) {
                throw new Error('Nenhum usuário autenticado encontrado.');
            }
    
            const userUID = currentUser.uid;
    
            console.log('Users array:', users); // Adicionando console.log para depuração
    
            const selectedUser = users.find(u => u.id === selectedUserId);
            if (!selectedUser) {
                throw new Error('Usuário não encontrado.');
            }
            const { userDocument } = selectedUser;
            const userName = selectedUser.name; // Correção aqui
    
            const receiptRef = await addDoc(collection(db, 'receipts'), {
                content,
                user: userName, // Correção aqui
                userDocument,
                vehicle,
                clientName,
                clientDocument,
                service,
                departureAddress,
                destinationAddress,
                value,
                signature,
                userId: userUID,
                createdAt: new Date()
            });
            const receiptId = receiptRef.id;
    
            navigate('/receiptviewer/' + receiptId);
        } catch (error) {
            setError('Erro ao gerar o recibo: ' + error.message);
        }
    };

    return (
        <>
            <Menu />
            <Container>
                <CloseComponent />
                <Title>Gerar Recibo</Title>
                <form onSubmit={handleGenerateReceipt}>
                    <FormGroup>
                        <Label>Descrição:</Label>
                        <TextArea value={content} onChange={(e) => setContent(e.target.value)} required />
                    </FormGroup>
                    <FormGroup>
                        <Label>Nome do Cliente:</Label>
                        <Input type="text" value={clientName} onChange={(e) => setClientName(e.target.value)} required />
                    </FormGroup>
                    <FormGroup>
                        <Label>Documento do Cliente:</Label>
                        <Input type="text" value={clientDocument} onChange={(e) => setClientDocument(e.target.value)} required />
                    </FormGroup>
                    <FormGroup>
                        <Label>Serviço:</Label>
                        <Select value={service} onChange={(e) => setService(e.target.value)} required>
                            <option value="">Selecione o serviço</option>
                            {services.map(service => (
                                <option key={service.id} value={service.name}>{service.name}</option>
                            ))}
                        </Select>
                    </FormGroup>
                    <FormGroup>
                        <Label>Carro:</Label>
                        <Select value={vehicle} onChange={(e) => setVehicle(e.target.value)} required>
                            <option value="">Selecione o carro</option>
                            {vehicles.map(vehicle => (
                                <option key={vehicle.id} value={`${vehicle.model} - ${vehicle.plate}`}>{vehicle.model} - {vehicle.plate}</option>
                            ))}
                        </Select>
                    </FormGroup>
                    <FormGroup>
                        <Label>Motorista:</Label>
                        <Select value={selectedUserId} onChange={(e) => setSelectedUserId(e.target.value)} required>
                            <option value="">Selecione o Motorista</option>
                            {users.map(user => (
                                <option key={user.id} value={user.id}>{user.name}</option>
                            ))}
                        </Select>
                    </FormGroup>
                    <FormGroup>
                        <Select value={signature} onChange={(e) => setSignature(e.target.value)} disabled hidden required>
                            <option value="">Selecione a assinatura</option>
                            {signatures.map((signature, index) => (
                                <option key={index} value={signature.signatureImg}>{signature.signatureImg} - {signature.fullName}</option>
                            ))}
                        </Select>
                    </FormGroup>
                    <FormGroup>
                        <Label>Endereço de Saída:</Label>
                        <Input type="text" value={departureAddress} onChange={(e) => setDepartureAddress(e.target.value)} required />
                    </FormGroup>
                    <FormGroup>
                        <Label>Endereço de Destino:</Label>
                        <Input type="text" value={destinationAddress} onChange={(e) => setDestinationAddress(e.target.value)} required />
                    </FormGroup>
                    <FormGroup>
                        <Label>Valor:</Label>
                        <Input type="number" value={value} onChange={(e) => setValue(e.target.value)} required />
                    </FormGroup>
                    <Button type="submit">Gerar Recibo</Button>
                </form>
                {error && <div>{error}</div>}
            </Container>
        </>
    );
};

export default GenerateReceipt;
