"use client";

import { useState } from "react";

export default function Cadastro() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    senha: "",
    confirmarSenha: "",
    role: "user",
    chaveSecreta: ""
  });

  const [mensagemErro, setMensagemErro] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [sucesso, setSucesso] = useState(false); // Novo estado para sucesso

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setMensagemErro("");
    setSucesso(false); // Reset sucesso ao editar
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensagemErro("");
    setCarregando(true);
    setSucesso(false);

    if (formData.senha !== formData.confirmarSenha) {
      setMensagemErro("As senhas não coincidem.");
      setCarregando(false);
      return;
    }

    const payload = {
      nome: formData.nome,
      email: formData.email,
      telefone: formData.telefone,
      senha: formData.senha,
      role: formData.role,
      chave_secreta: formData.role === 'admin' ? formData.chaveSecreta : undefined
    };

    try {
      const response = await fetch('http://localhost:3001/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      if (response.ok) {
        setSucesso(true); // Marca sucesso!
        setFormData({
          nome: "",
          email: "",
          telefone: "",
          senha: "",
          confirmarSenha: "",
          role: "user",
          chaveSecreta: ""
        });
      } else {
        setMensagemErro(data.error || "Erro ao cadastrar usuário.");
      }
    } catch (error) {
      console.error(error);
      setMensagemErro("Erro de conexão com o servidor.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-zinc-950">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Cadastro de Usuário</h1>

        <input type="text" name="nome" placeholder="Nome completo" className="input" value={formData.nome} onChange={handleChange} required />
        <input type="email" name="email" placeholder="E-mail" className="input" value={formData.email} onChange={handleChange} required />
        <input type="text" name="telefone" placeholder="Telefone" className="input" value={formData.telefone} onChange={handleChange} />

        <input type="password" name="senha" placeholder="Senha" className="input" value={formData.senha} onChange={handleChange} required />
        <input type="password" name="confirmarSenha" placeholder="Confirmar Senha" className="input" value={formData.confirmarSenha} onChange={handleChange} required />

        <select name="role" className="input" value={formData.role} onChange={handleChange}>
          <option value="user">Usuário Comum</option>
          <option value="admin">Administrador</option>
        </select>

        {formData.role === 'admin' && (
          <input type="text" name="chaveSecreta" placeholder="Chave Secreta" className="input" value={formData.chaveSecreta} onChange={handleChange} required />
        )}

        <button
          type="submit"
          className={`mt-4 w-full text-white py-2 rounded flex items-center justify-center transition-all duration-300 ${
            sucesso ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'
          }`}
          disabled={carregando}
        >
          {carregando ? (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
            </svg>
          ) : sucesso ? (
            <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            "Cadastrar"
          )}
        </button>

        {mensagemErro && (
          <p className="text-red-500 text-sm mt-2">{mensagemErro}</p>
        )}
      </form>

      <style jsx>{`
        .input {
          width: 100%;
          padding: 10px;
          margin-bottom: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }
      `}</style>
    </div>
  );
}