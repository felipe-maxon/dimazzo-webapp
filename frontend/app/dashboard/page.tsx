"use client";

import DonutChart from "@/components/DonutChart";
import LineChart from "@/components/LineChart";
import { useEffect, useState } from "react";
import {
  DocumentMagnifyingGlassIcon,
  TagIcon,
  ClipboardDocumentCheckIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";


interface NotaResumo {
  fornecedor: string;
  valor: string;
  status: "validada" | "pendente" | "erro";
  data: string;
}

export default function DashboardPage() {
  const [usuario, setUsuario] = useState<{ nome: string; role: string } | null>(null);
  const [notas, setNotas] = useState<NotaResumo[]>([]);

  useEffect(() => {
    const user = localStorage.getItem("usuario");
    if (user) setUsuario(JSON.parse(user));

    // Mock de notas
    setNotas([
      { fornecedor: "Max Fornecedora", valor: "R$ 863,45", status: "validada", data: "13/05/2025" },
      { fornecedor: "Açougue Brasil", valor: "R$ 369,95", status: "pendente", data: "13/05/2025" },
      { fornecedor: "Farmácia Sul", valor: "R$ 86,00", status: "erro", data: "13/05/2025" },
      { fornecedor: "Nutrivida", valor: "R$ 1.276,45", status: "validada", data: "12/05/2025" },
      { fornecedor: "Doces & Cia", valor: "R$ 863,45", status: "validada", data: "12/05/2025" },
      { fornecedor: "Laticínios Sol", valor: "R$ 863,45", status: "validada", data: "11/05/2025" },
      { fornecedor: "Joia Rara", valor: "R$ 863,45", status: "validada", data: "11/05/2025" },
      { fornecedor: "EletroMais", valor: "R$ 863,45", status: "validada", data: "10/05/2025" },
      { fornecedor: "VegFoods", valor: "R$ 863,45", status: "validada", data: "10/05/2025" },
      { fornecedor: "FlorArte", valor: "R$ 863,45", status: "validada", data: "09/05/2025" },
    ]);
  }, []);

  if (!usuario) return null;

  const stats = [
    {
      titulo: "Notas aguardando validação",
      valor: 4,
      icon: <DocumentMagnifyingGlassIcon className="w-6 h-6 text-orange-500" />, 
      cor: "bg-orange-50",
    },
    {
      titulo: "Etiquetas aguardando impressão",
      valor: 7,
      icon: <TagIcon className="w-6 h-6 text-blue-500" />, 
      cor: "bg-blue-50",
    },
    {
      titulo: "Notas aguardando conferência manual",
      valor: 2,
      icon: <ClipboardDocumentCheckIcon className="w-6 h-6 text-yellow-500" />, 
      cor: "bg-yellow-50",
    },
    {
      titulo: "Total de notas cadastradas no mês",
      valor: 18,
      icon: <CalendarDaysIcon className="w-6 h-6 text-green-500" />, 
      cor: "bg-green-50",
    },
  ];

  const statusStyle = {
    validada: "bg-green-100 text-green-700",
    pendente: "bg-yellow-100 text-yellow-700",
    erro: "bg-red-100 text-red-700",
  };

  return (
    <div>
      <h2 className="text-slate-700 text-2xl font-bold mb-6">Resumo Geral</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((item) => (
          <div
            key={item.titulo}
            className={`rounded-xl p-4 border border-slate-200 bg-white flex items-center gap-4 shadow-sm`}
          >
            <div className={`rounded-full p-2 ${item.cor}`}>{item.icon}</div>
            <div>
              <p className="text-sm text-slate-500 font-medium">{item.titulo}</p>
              <p className="text-xl font-bold text-slate-800">{item.valor}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm">
        <div className="p-4">
          <h3 className="text-slate-700 text-lg font-semibold mb-4">Últimas Notas Cadastradas</h3>
          <table className="w-full text-sm">
            <thead className="text-left text-slate-500 bg-slate-50">
              <tr>
                <th className="p-2">Fornecedor</th>
                <th className="p-2">Valor</th>
                <th className="p-2">Status</th>
                <th className="p-2">Data</th>
              </tr>
            </thead>
            <tbody>
              {notas.map((nota, index) => (
                <tr key={index} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="p-2 font-medium text-slate-700">{nota.fornecedor}</td>
                  <td className="p-2 text-slate-600">{nota.valor}</td>
                  <td className="p-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded ${statusStyle[nota.status]}`}>
                      {nota.status.charAt(0).toUpperCase() + nota.status.slice(1)}
                    </span>
                  </td>
                  <td className="p-2 text-slate-600">{nota.data}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Paginação futura */}
          <div className="flex justify-between items-center mt-4 text-xs text-slate-500">
            <span>Exibindo 1–10 de 10</span>
            <div className="flex items-center gap-1">
              <button className="px-2 py-1 rounded hover:bg-slate-100">◀</button>
              <button className="px-2 py-1 rounded bg-purple-600 text-white">1</button>
              <button className="px-2 py-1 rounded hover:bg-slate-100">2</button>
              <button className="px-2 py-1 rounded hover:bg-slate-100">▶</button>
            </div>
          </div>
        </div>
      </div>

      {/* Gráficos */}
          <div className="mt-10">
            <h2 className="text-slate-700 text-2xl font-bold mb-6">Gráficos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-slate-600">
              <div className="bg-white p-4 rounded shadow">
                <h3 className="font-semibold mb-2">Distribuição por Categoria</h3>
                <DonutChart />
              </div>
              <div className="bg-white p-4 rounded shadow">
                <h3 className="font-semibold mb-2">Evolução Mensal</h3>
                <LineChart />
              </div>
            </div>
          </div>
    </div>
  );
}
