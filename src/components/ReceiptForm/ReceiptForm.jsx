import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import db from '../../services/firestore';
import {
  FormContainer,
  FormGroup,
  Label,
  Input,
  Select,
  Button,
  AddButton,
  ModalContainer,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroupline
} from './ReceiptForm.style';

const ReceiptForm = () => {
  const [cliente, setCliente] = useState('');
  const [documentoCliente, setDocumentoCliente] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [documentoEmpresa, setDocumentoEmpresa] = useState('');
  const [servico, setServico] = useState('');
  const [valor, setValor] = useState('');
  const [dataAtual, setDataAtual] = useState('');
  const [tipoPagamento, setTipoPagamento] = useState('');
  const [assinaturaEmpresa, setAssinaturaEmpresa] = useState('');
  const [motorista, setMotorista] = useState('');
  const [documentoMotorista, setDocumentoMotorista] = useState('');
  const [carroPlaca, setCarroPlaca] = useState('');
  const [enderecoOrigem, setEnderecoOrigem] = useState('');
  const [enderecoDestino, setEnderecoDestino] = useState('');
  const [newField, setNewField] = useState('');
  const [collectionsData, setCollectionsData] = useState({
    clientes: [],
    documentosClientes: [],
    empresas: [],
    documentosEmpresas: [],
    servicos: [],
    motoristas: [],
    documentosMotoristas: [],
    carrosPlacas: [],
    enderecosOrigem: [],
    enderecosDestino: [],
    valores: [],
    datasAtuais: [],
    tiposPagamento: [],
    assinaturasEmpresas: []
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [activeCollection, setActiveCollection] = useState('');
  const [message, setMessage] = useState('');

  const auth = getAuth();

  const handleFieldChange = (setter) => (e) => {
    setter(e.target.value);
  };

  const handleAddField = async (e) => {
    e.preventDefault();
    if (!newField || !activeCollection) return;

    try {
      const userId = auth.currentUser.uid;
      const docRef = await addDoc(collection(db, activeCollection), {
        value: newField,
        userId
      });
      console.log(`Document written with ID: ${docRef.id}`);
      fetchCollectionsData();
      setModalOpen(false);
      setNewField('');
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  const fetchCollectionsData = async () => {
    const collections = [
      'clientes',
      'documentosClientes',
      'empresas',
      'documentosEmpresas',
      'servicos',
      'motoristas',
      'documentosMotoristas',
      'carrosPlacas',
      'enderecosOrigem',
      'enderecosDestino',
      'valores',
      'datasAtuais',
      'tiposPagamento',
      'assinaturasEmpresas'
    ];

    const userId = auth.currentUser?.uid;

    if (!userId) return;

    const newCollectionsData = {};

    for (const collectionName of collections) {
      const q = query(collection(db, collectionName), where('userId', '==', userId));
      const querySnapshot = await getDocs(q);
      newCollectionsData[collectionName] = querySnapshot.docs.map((doc) => doc.data().value);
    }

    setCollectionsData(newCollectionsData);
  };

  useEffect(() => {
    fetchCollectionsData();
  }, []);

  useEffect(() => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const currentDate = `${day}/${month}/${year}`;

    setDataAtual(currentDate);
  }, []);

  const resetForm = () => {
    setCliente('');
    setDocumentoCliente('');
    setEmpresa('');
    setDocumentoEmpresa('');
    setServico('');
    setValor('');
    setTipoPagamento('');
    setAssinaturaEmpresa('');
    setMotorista('');
    setDocumentoMotorista('');
    setCarroPlaca('');
    setEnderecoOrigem('');
    setEnderecoDestino('');
    setNewField('');
  };

  const validateForm = () => {
    const requiredFields = [
      { field: cliente, name: 'Cliente' },
      { field: documentoCliente, name: 'Documento do Cliente' },
      { field: empresa, name: 'Empresa' },
      { field: documentoEmpresa, name: 'Documento da Empresa' },
      { field: servico, name: 'Serviço' },
      { field: valor, name: 'Valor' },
      { field: tipoPagamento, name: 'Tipo de Pagamento' },
      { field: assinaturaEmpresa, name: 'Assinatura da Empresa' },
      { field: motorista, name: 'Motorista' },
      { field: documentoMotorista, name: 'Documento do Motorista' },
      { field: carroPlaca, name: 'Placa do Veículo' },
      { field: enderecoOrigem, name: 'Endereço de Origem' },
      { field: enderecoDestino, name: 'Endereço de Destino' },
    ];

    const missingFields = requiredFields
      .filter(({ field }) => !field || field.trim() === '')
      .map(({ name }) => name);

    return missingFields;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const missingFields = validateForm();
    if (missingFields.length > 0) {
      setMessage(`Por favor, preencha todos os campos obrigatórios: ${missingFields.join(', ')}.`);
      return;
    }

    try {
      const userId = auth.currentUser.uid;
      const docRef = await addDoc(collection(db, 'recibos'), {
        cliente,
        documentoCliente,
        empresa,
        documentoEmpresa,
        servico,
        valor,
        dataAtual,
        tipoPagamento,
        assinaturaEmpresa,
        motorista,
        documentoMotorista,
        carroPlaca,
        enderecoOrigem,
        enderecoDestino,
        userId,
        createdAt: new Date().toISOString(),
      });

      console.log('Recibo salvo com ID:', docRef.id);
      setMessage('Recibo gerado com sucesso!');
      resetForm();
    } catch (error) {
      console.error('Erro ao gerar recibo:', error);
      setMessage('Erro ao gerar recibo.');
    }
  };

  const openModal = (collectionName) => {
    setActiveCollection(collectionName);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <FormContainer>
      <h2>Gerar Recibo</h2>
      <form onSubmit={handleSubmit}>
       

        <FormGroup>
          <Label>Cliente</Label>
          <div>
            <Input
              list="clientes"
              value={cliente}
              onChange={handleFieldChange(setCliente)}
            />
            <datalist id="clientes">
              {collectionsData.clientes.map((cliente, index) => (
                <option key={index} value={cliente} />
              ))}
            </datalist>
          </div>
        </FormGroup>

        <FormGroup>
          <Label>Documento do Cliente</Label>
          <div>
            <Input
              list="documentosClientes"
              value={documentoCliente}
              onChange={handleFieldChange(setDocumentoCliente)}
            />
            <datalist id="documentosClientes">
              {collectionsData.documentosClientes.map((doc, index) => (
                <option key={index} value={doc} />
              ))}
            </datalist>
          </div>
        </FormGroup>

        <FormGroup>
          <Label>Empresa</Label>
          <div>
            <Select
              value={empresa}
              onChange={handleFieldChange(setEmpresa)}
            >
              {collectionsData.empresas.map((empresa, index) => (
                <option key={index} value={empresa}>
                  {empresa}
                </option>
              ))}
            </Select>
            <AddButton type="button" onClick={() => openModal('empresas')}>
              +
            </AddButton>
          </div>
        </FormGroup>

        <FormGroup>
          <Label>Documento da Empresa</Label>
          <div>
            <Select
              value={documentoEmpresa}
              onChange={handleFieldChange(setDocumentoEmpresa)}
            >
              {collectionsData.documentosEmpresas.map((doc, index) => (
                <option key={index} value={doc}>
                  {doc}
                </option>
              ))}
            </Select>
            <AddButton type="button" onClick={() => openModal('documentosEmpresas')}>
              +
            </AddButton>
          </div>
        </FormGroup>

        <FormGroup>
          <Label>Serviço</Label>
          <div>
            <Select
              value={servico}
              onChange={handleFieldChange(setServico)}
            >
              {collectionsData.servicos.map((servico, index) => (
                <option key={index} value={servico}>
                  {servico}
                </option>
              ))}
            </Select>
            <AddButton type="button" onClick={() => openModal('servicos')}>
              +
            </AddButton>
          </div>
        </FormGroup>

        <FormGroup>
          <Label>Valor</Label>
          <Input
            type="text"
            value={valor}
            onChange={handleFieldChange(setValor)}
          />
        </FormGroup>

        <FormGroup>
          <Label>Tipo de Pagamento</Label>
          <div>
            <Select
              value={tipoPagamento}
              onChange={handleFieldChange(setTipoPagamento)}
            >
              {collectionsData.tiposPagamento.map((tipo, index) => (
                <option key={index} value={tipo}>
                  {tipo}
                </option>
              ))}
            </Select>
            <AddButton type="button" onClick={() => openModal('tiposPagamento')}>
              +
            </AddButton>
          </div>
        </FormGroup>

        <FormGroup>
          <Label>Assinatura da Empresa</Label>
          <div>
            <Select
              value={assinaturaEmpresa}
              onChange={handleFieldChange(setAssinaturaEmpresa)}
            >
              {collectionsData.assinaturasEmpresas.map((assinatura, index) => (
                <option key={index} value={assinatura}>
                  {assinatura}
                </option>
              ))}
            </Select>
            <AddButton type="button" onClick={() => openModal('assinaturasEmpresas')}>
              +
            </AddButton>
          </div>
        </FormGroup>

        <FormGroup>
          <Label>Motorista</Label>
          <div>
            <Select
              value={motorista}
              onChange={handleFieldChange(setMotorista)}
            >
              {collectionsData.motoristas.map((motorista, index) => (
                <option key={index} value={motorista}>
                  {motorista}
                </option>
              ))}
            </Select>
            <AddButton type="button" onClick={() => openModal('motoristas')}>
              +
            </AddButton>
          </div>
        </FormGroup>

        <FormGroup>
          <Label>Documento do Motorista</Label>
          <div>
            <Select
              value={documentoMotorista}
              onChange={handleFieldChange(setDocumentoMotorista)}
            >
              {collectionsData.documentosMotoristas.map((doc, index) => (
                <option key={index} value={doc}>
                  {doc}
                </option>
              ))}
            </Select>
            <AddButton type="button" onClick={() => openModal('documentosMotoristas')}>
              +
            </AddButton>
          </div>
        </FormGroup>

        <FormGroup>
          <Label>Placa do Veículo</Label>
          <div>
            <Select
              value={carroPlaca}
              onChange={handleFieldChange(setCarroPlaca)}
            >
              {collectionsData.carrosPlacas.map((placa, index) => (
                <option key={index} value={placa}>
                  {placa}
                </option>
              ))}
            </Select>
            <AddButton type="button" onClick={() => openModal('carrosPlacas')}>
              +
            </AddButton>
          </div>
        </FormGroup>

        <FormGroup>
          <Label>Endereço de Origem</Label>
          <Input
            type="text"
            value={enderecoOrigem}
            onChange={handleFieldChange(setEnderecoOrigem)}
          />
        </FormGroup>

        <FormGroup>
          <Label>Endereço de Destino</Label>
          <Input
            type="text"
            value={enderecoDestino}
            onChange={handleFieldChange(setEnderecoDestino)}
          />
        </FormGroup>

        <Button type="submit">Gerar Recibo</Button>
        {message && <p>{message}</p>}
      </form>

      {modalOpen && (
        <ModalContainer>
          <ModalContent>
            <ModalHeader>
              <h2>Adicionar Novo</h2>
              <Button onClick={closeModal}>Fechar</Button>
            </ModalHeader>
            <ModalBody>
              <FormGroupline>
                <Label>Nome</Label>
                <Input
                  type="text"
                  value={newField}
                  onChange={(e) => setNewField(e.target.value)}
                />
              </FormGroupline>
            </ModalBody>
            <ModalFooter>
              <Button onClick={handleAddField}>Adicionar</Button>
            </ModalFooter>
          </ModalContent>
        </ModalContainer>
      )}
    </FormContainer>
  );
};

export default ReceiptForm;
