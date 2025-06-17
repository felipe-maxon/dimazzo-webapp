"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    email: "",
    senha: ""
  });
  const [mensagemErro, setMensagemErro] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [sucesso, setSucesso] = useState(false); // ✅ Novo estado para sucesso

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setMensagemErro("");
    setSucesso(false); // Reseta sucesso ao editar
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensagemErro("");
    setCarregando(true);
    setSucesso(false);

    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (response.ok) {
        document.cookie = `token=${data.token}; path=/;`;
        localStorage.setItem('usuario', JSON.stringify(data.usuario));
        
        setSucesso(true); // ✅ Marca sucesso
        setTimeout(() => {
          router.push('/dashboard');
        }, 500); // Pequeno delay só para o usuário ver o botão mudar para verde
      } else {
        setMensagemErro(data.error || "Erro ao fazer login.");
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
        <h1 className="text-2xl font-bold mb-6">Login</h1>

        <input
          type="email"
          name="email"
          placeholder="E-mail"
          className="input"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="senha"
          placeholder="Senha"
          className="input"
          value={formData.senha}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className={`mt-4 w-full py-2 rounded flex items-center justify-center transition-all duration-300 text-white font-semibold ${
            sucesso
              ? 'bg-green-500 hover:bg-green-600'
              : carregando
              ? 'bg-blue-300'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
          disabled={carregando}
        >
          {carregando ? (
            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
            </svg>
          ) : sucesso ? (
            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            "Entrar"
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
