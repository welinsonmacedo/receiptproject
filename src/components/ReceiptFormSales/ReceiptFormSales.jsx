import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import db from '../../services/firestore';
import {
  FormContainer,
  FormGroup,
  Label,
  Input,
  Button,
  ModalContainer,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroupline
} from './ReceiptFormSales.style';

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
  const [message, setMessage] = useState('');

  const auth = getAuth();

  const handleFieldChange = (setter) => (e) => {
    setter(e.target.value);
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
  };

  useEffect(() => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const currentDate = `${day}/${month}/${year}`;

    setDataAtual(currentDate);
  }, []);

  return (

    <h2>Em Breve Disponivel</h2>

    )}
  export default ReceiptForm;
