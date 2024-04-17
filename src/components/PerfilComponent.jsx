import React, { useState } from 'react';

const PerfilComponent = () => {
  const [tipoCadastro, setTipoCadastro] = useState('');
  const [perfil, setPerfil] = useState({
    nome: '',
    sobrenome: '',
    cpf: '',
    nomeFantasia: '',
    cnpj: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPerfil(prevPerfil => ({
      ...prevPerfil,
      [name]: value
    }));
  };

  const handleTipoCadastroChange = (event) => {
    const { value } = event.target;
    setTipoCadastro(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aqui você pode enviar os dados do perfil para onde for necessário
    console.log(perfil);
  };

  return (
    <div>
      <h2>Cadastro de Perfil</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Tipo de Cadastro:
          <select value={tipoCadastro} onChange={handleTipoCadastroChange}>
            <option value="">Selecione...</option>
            <option value="pessoaFisica">Pessoa Física</option>
            <option value="pessoaJuridica">Pessoa Jurídica</option>
          </select>
        </label>
        {tipoCadastro === 'pessoaFisica' && (
          <div>
            <label>
              Nome:
              <input type="text" name="nome" value={perfil.nome} onChange={handleChange} />
            </label>
            <label>
              Sobrenome:
              <input type="text" name="sobrenome" value={perfil.sobrenome} onChange={handleChange} />
            </label>
            <label>
              CPF:
              <input type="text" name="cpf" value={perfil.cpf} onChange={handleChange} />
            </label>
          </div>
        )}
        {tipoCadastro === 'pessoaJuridica' && (
          <div>
            <label>
              Nome:
              <input type="text" name="nomeFantasia" value={perfil.nomeFantasia} onChange={handleChange} />
            </label>
            <label>
              CNPJ:
              <input type="text" name="cnpj" value={perfil.cnpj} onChange={handleChange} />
            </label>
          </div>
        )}
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
};

export default PerfilComponent;
