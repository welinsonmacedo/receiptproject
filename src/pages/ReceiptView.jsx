import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import db from '../services/firestore';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const ReceiptContainer = styled.div`
  width: 400px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: 'Courier New', Courier, monospace;
  background: #e6ff0565;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  margin:0 auto;
  text-align: center;
`;

const ReceiptHeader = styled.div`
  margin-bottom: 5px;
  border-bottom: 1px dashed #ccc;
 
`;

const ReceiptBody = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
`;

const ReceiptFooter = styled.div`
  border-top: 1px dashed #ccc;

  font-size: 0.9em;
`;

const Assinatura = styled.p`
  font-family: 'Dancing Script', cursive;
  font-size: 46px;
  color: #867b7b;
  margin-top: 5px;
  text-align: center;
  border-top: 1px solid #ccc;
  padding-top: 5px;
`;

const ButtonContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 2rem;
`;

const ReceiptView = () => {
  const { id } = useParams();
  const [receipt, setReceipt] = React.useState(null);

  React.useEffect(() => {
    const fetchReceipt = async () => {
      try {
        const docRef = doc(db, 'recibos', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setReceipt({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.error('Recibo não encontrado');
        }
      } catch (error) {
        console.error('Erro ao buscar recibo:', error);
      }
    };

    fetchReceipt();
  }, [id]);

const downloadPDF = () => {
  html2canvas(document.querySelector('#receipt')).then(canvas => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    // Definindo a largura e altura da imagem proporcionalmente ao tamanho da página
    const imgWidth = pageWidth - 20; // Margem de 10mm de cada lado
    const imgHeight = canvas.height * imgWidth / canvas.width;

    // Redimensionando se a altura for maior que a página
    const adjustedHeight = imgHeight > pageHeight - 20 ? pageHeight - 20 : imgHeight;

    // Centralizando a imagem horizontalmente e verticalmente
    const xPosition = (pageWidth - imgWidth) / 2; // Centraliza horizontalmente
    const yPosition = (pageHeight - adjustedHeight) / 2; // Centraliza verticalmente

    pdf.addImage(imgData, 'PNG', xPosition, yPosition, imgWidth, adjustedHeight);
const nomeCliente= receipt.cliente
    pdf.save(nomeCliente+'.pdf');
  });
};

  const downloadPNG = () => {
    html2canvas(document.querySelector('#receipt')).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = imgData;
      link.download = 'recibo.png';
      link.click();
    });
  };

  if (!receipt) return <p>Carregando...</p>;

  return (
    <>
      <ReceiptContainer id="receipt">
        <ReceiptHeader>
          <h2>RECIBO</h2>
          <p>Data: {receipt.dataAtual}</p>
        </ReceiptHeader>
        <ReceiptBody>
          {receipt.empresa && <p><strong>Empresa:</strong> {receipt.empresa}</p>}
          {receipt.documentoEmpresa && <p><strong>Documento da Empresa:</strong> {receipt.documentoEmpresa}</p>}
          {receipt.cliente && <p><strong>Cliente:</strong> {receipt.cliente}</p>}
          {receipt.documentoCliente && <p><strong>Documento do Cliente:</strong> {receipt.documentoCliente}</p>}
          {receipt.motorista && <p><strong>Motorista:</strong> {receipt.motorista}</p>}
          {receipt.documentoMotorista && <p><strong>Documento do Motorista:</strong> {receipt.documentoMotorista}</p>}
          {receipt.modeloVeiculo&& <p><strong>Modelo Veiculo:</strong> {receipt.modeloVeiculo}</p>}
          {receipt.carroPlaca && <p><strong>Placa do Carro:</strong> {receipt.carroPlaca}</p>}
          {receipt.enderecoOrigem && <p><strong>Endereço de Origem:</strong> {receipt.enderecoOrigem}</p>}
          {receipt.enderecoDestino && <p><strong>Endereço de Destino:</strong> {receipt.enderecoDestino}</p>}
          {receipt.valor && <p><strong>Valor:</strong> R$ {parseFloat(receipt.valor).toFixed(2)}</p>}
          {receipt.tipoPagamento && <p><strong>Tipo de Pagamento:</strong> {receipt.tipoPagamento}</p>}
          {receipt.servico && <p><strong>Serviço:</strong> {receipt.servico}</p>}
        </ReceiptBody>
        <ReceiptFooter>
          {receipt.assinaturaEmpresa && <Assinatura>{receipt.assinaturaEmpresa}</Assinatura>}
          <p>Obrigado pela preferência!</p>
          {receipt.empresa && <p><strong></strong> {receipt.empresa}</p>}
        </ReceiptFooter>

      </ReceiptContainer>
      <ButtonContainer>
        <button onClick={downloadPDF}>PDF</button>
        <button onClick={downloadPNG}>Salvar como PNG</button>
      </ButtonContainer>
    </>

  );
};

export default ReceiptView;
