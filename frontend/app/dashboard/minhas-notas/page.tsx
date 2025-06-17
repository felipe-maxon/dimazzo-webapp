"use client";

import { useEffect, useState } from "react";
import {
  EyeIcon,
  DocumentTextIcon,
  TagIcon,
  ClipboardDocumentCheckIcon,
} from "@heroicons/react/24/outline";

interface NotaFiscal {
  chave: string;
  fornecedor: string;
  data: string;
  status: "conferida" | "aguardando" | "erro";
}

export default function MinhasNotasPage() {
  const [notas, setNotas] = useState<NotaFiscal[]>([]);

  useEffect(() => {
    // Simulando fetch de dados associados ao usuário logado
    setNotas([
      {
        chave: "521837409238473923847923847234234234",
        fornecedor: "MAX FORNECEDORA",
        data: "2025-05-13",
        status: "conferida",
      },
      {
        chave: "998237409238473923847923847234234234",
        fornecedor: "FRETES & CIA",
        data: "2025-05-11",
        status: "aguardando",
      },
    ]);
  }, []);

  const renderStatus = (status: NotaFiscal["status"]) => {
    switch (status) {
      case "conferida":
        return <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">Conferida</span>;
      case "aguardando":
        return <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs">Aguardando</span>;
      case "erro":
        return <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs">Erro</span>;
    }
  };

  return (
    <div>
      <h2 className="text-slate-600 text-2xl font-bold mb-4">Minhas Notas</h2>

      <table className="w-full text-sm border border-slate-200">
        <thead className="bg-slate-100 text-slate-600">
          <tr>
            <th className="p-2 text-left">Chave</th>
            <th className="p-2 text-left">Fornecedor</th>
            <th className="p-2 text-left">Data</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2 text-left">Ações</th>
          </tr>
        </thead>
        <tbody>
          {notas.map((nota) => (
            <tr key={nota.chave} className="border-b border-slate-200 text-slate-600 hover:bg-slate-50">
              <td className="p-2 text-xs">{nota.chave.slice(0, 10)}...</td>
              <td className="p-2">{nota.fornecedor}</td>
              <td className="p-2">{nota.data}</td>
              <td className="p-2">{renderStatus(nota.status)}</td>
              <td className="p-2 space-x-2 flex items-center flex-wrap gap-2">
                <button className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded text-blue-600 text-xs hover:bg-slate-200">
                  <EyeIcon className="w-4 h-4" /> Ver
                </button>
                <button className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded text-blue-600 text-xs hover:bg-slate-200">
                  <DocumentTextIcon className="w-4 h-4" /> DANFE
                </button>
                {nota.status === "conferida" && (
                  <button className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded text-blue-600 text-xs hover:bg-slate-200">
                    <TagIcon className="w-4 h-4" /> Etiquetas
                  </button>
                )}
                {nota.status === "aguardando" && (
                  <button className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded text-orange-600 text-xs hover:bg-slate-200">
                    <ClipboardDocumentCheckIcon className="w-4 h-4" /> Conferir
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
