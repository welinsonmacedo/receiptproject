import React, { useRef } from 'react';
import { jsPDF } from 'jspdf';

const ImageToPdfConverter = ({ imageUrl }) => {
  const imgRef = useRef();

  const handleConvertToPdf = () => {
    const imgElement = imgRef.current;

    // Cria um novo objeto jsPDF
    const pdf = new jsPDF();

    // Define a largura e altura do PDF
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgElement.height * pdfWidth) / imgElement.width;

    // Adiciona a imagem ao PDF
    pdf.addImage(imgElement, 'PNG', 0, 0, pdfWidth, pdfHeight);

    // Salva o PDF
    pdf.save('converted_image.pdf');
  };

  return (
    <div>
      <img ref={imgRef} src={imageUrl} alt="Imagem" style={{ display: 'none' }} />
      <button onClick={handleConvertToPdf}>Converter para PDF</button>
    </div>
  );
};

export default ImageToPdfConverter;
