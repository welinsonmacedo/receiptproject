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
    <FormContainer>
      <h2>Gerar Recibo</h2>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Cliente</Label>
          <Input
            type="text"
            value={cliente}
            onChange={handleFieldChange(setCliente)}
          />
        </FormGroup>

        <FormGroup>
          <Label>Documento do Cliente</Label>
          <Input
            type="text"
            value={documentoCliente}
            onChange={handleFieldChange(setDocumentoCliente)}
          />
        </FormGroup>

        <FormGroup>
          <Label>Empresa</Label>
          <Input
            type="text"
            value={empresa}
            onChange={handleFieldChange(setEmpresa)}
          />
        </FormGroup>

        <FormGroup>
          <Label>Documento da Empresa</Label>
          <Input
            type="text"
            value={documentoEmpresa}
            onChange={handleFieldChange(setDocumentoEmpresa)}
          />
        </FormGroup>

        <FormGroup>
          <Label>Serviço</Label>
          <Input
            type="text"
            value={servico}
            onChange={handleFieldChange(setServico)}
          />
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
          <Input
            type="text"
            value={tipoPagamento}
            onChange={handleFieldChange(setTipoPagamento)}
          />
        </FormGroup>

        <FormGroup>
          <Label>Assinatura da Empresa</Label>
          <Input
            type="text"
            value={assinaturaEmpresa}
            onChange={handleFieldChange(setAssinaturaEmpresa)}
          />
        </FormGroup>

        <FormGroup>
          <Label>Motorista</Label>
          <Input
            type="text"
            value={motorista}
            onChange={handleFieldChange(setMotorista)}
          />
        </FormGroup>

        <FormGroup>
          <Label>Documento do Motorista</Label>
          <Input
            type="text"
            value={documentoMotorista}
            onChange={handleFieldChange(setDocumentoMotorista)}
          />
        </FormGroup>

        <FormGroup>
          <Label>Placa do Veículo</Label>
          <Input
            type="text"
            value={carroPlaca}
            onChange={handleFieldChange(setCarroPlaca)}
          />
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
    </FormContainer>
  );
};

export default ReceiptForm;
