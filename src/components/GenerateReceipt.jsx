import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';
import firebaseConfig from '../services/firebaseConfig';
import { initializeApp } from 'firebase/app';

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
    const navigate = useNavigate();

    useEffect(() => {
        const fetchServices = async () => {
            const servicesSnapshot = await getDocs(collection(db, 'services'));
            const servicesData = servicesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setServices(servicesData);
        };

        const fetchVehicles = async () => {
            const vehiclesSnapshot = await getDocs(collection(db, 'vehicles'));
            const vehiclesData = vehiclesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setVehicles(vehiclesData);
        };

        const fetchUsers = async () => {
            const usersSnapshot = await getDocs(collection(db, 'users'));
            const usersData = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setUsers(usersData);
        };

        const fetchSignatures = async () => {
            const signaturesSnapshot = await getDocs(collection(db, 'signature'));
            const signaturesData = signaturesSnapshot.docs.map(doc => doc.data().fullName);
            setSignatures(signaturesData);
        };

        fetchServices();
        fetchVehicles();
        fetchUsers();
        fetchSignatures();
    }, [db]);

    const handleGenerateReceipt = async (e) => {
        e.preventDefault();
        try {
            // Buscar o documento do usuário com base no nome
            const userSnapshot = await getDocs(collection(db, 'users'));
            const selectedUser = userSnapshot.docs.find(doc => doc.data().name === user);
            const userDocument = selectedUser ? selectedUser.data().document : '';

            // Adicionar o recibo ao Firestore
            const receiptRef = await addDoc(collection(db, 'receipts'), {
                content,
                user,
                userDocument,
                vehicle,
                clientName,
                clientDocument,
                service,
                departureAddress,
                destinationAddress,
                value,
                signature,
                createdAt: new Date()
            });
            const receiptId = receiptRef.id;

            // Redirecionar para a página de visualização do recibo
            navigate('/receiptviewer/' + receiptId);
        } catch (error) {
            setError('Erro ao gerar o recibo: ' + error.message);
        }
    };

    return (
        <Container>
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
                    <Label>Usuário:</Label>
                    <Select value={user} onChange={(e) => setUser(e.target.value)} required>
                        <option value="">Selecione o usuário</option>
                        {users.map(user => (
                            <option key={user.id} value={user.name}>{user.name}</option>
                        ))}
                    </Select>
                </FormGroup>
                <FormGroup>
                    <Label>Assinatura:</Label>
                    <Select value={signature} onChange={(e) => setSignature(e.target.value)} required>
                        <option value="">Selecione a assinatura</option>
                        {signatures.map((signature, index) => (
                            <option key={index} value={signature}>{signature}</option>
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
    );
};

export default GenerateReceipt;
