"use client";

import { useState } from "react";
import { ArrowDownTrayIcon, PaperClipIcon } from "@heroicons/react/24/outline";
import { toast } from "react-hot-toast";
import { useDropzone } from "react-dropzone";

export default function NovaEntradaPage() {
  const [modoArquivo, setModoArquivo] = useState(false);
  const [chave, setChave] = useState("");
  const [notas, setNotas] = useState<string[]>([]);
  const [arquivos, setArquivos] = useState<File[]>([]);

  const handleAddNota = () => {
    if (modoArquivo) {
      toast.error("Não é possível adicionar chaves enquanto o modo arquivo está ativo.");
      return;
    }
    if (chave.trim() === "" || chave.length !== 44) {
      toast.error("A chave de acesso deve ter 44 dígitos");
      return;
    }

    setNotas([...notas, chave]);
    setChave("");
    toast.success("Nota adicionada com sucesso!");
  };

  const handleLimparLote = () => {
    setNotas([]);
    setArquivos([]);
    toast.success("Lote limpo!");
  };

  const onDrop = (acceptedFiles: File[]) => {
    if (!modoArquivo) {
      toast.error("Ative o modo arquivo para carregar arquivos.");
      return;
    }
    setArquivos([...arquivos, ...acceptedFiles]);
    toast.success(`${acceptedFiles.length} arquivo(s) adicionado(s) ao lote!`);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "application/pdf": [], "image/*": [], "text/xml": [] },
    onDrop,
  });

  const toggleModoArquivo = () => {
    setModoArquivo(!modoArquivo);
    setNotas([]);
    setArquivos([]);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-700 m-0">Notas Fiscais</h1>
      <p className="text-slate-500">Digite ou escaneie a chave de acesso da nota fiscal ou carregue o arquivo.</p>

      <div className="flex items-center gap-4">
        <button
          onClick={() => setModoArquivo(false)}
          className={`px-4 py-2 rounded ${!modoArquivo ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600"}`}
        >
          Entrada Manual
        </button>
        <button
          onClick={() => setModoArquivo(true)}
          className={`px-4 py-2 rounded ${modoArquivo ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600"}`}
        >
          Carregar Arquivos
        </button>
      </div>

      {/* Área de Chave de Acesso */}
      {!modoArquivo && (
        <div className="bg-white p-4 rounded shadow space-y-2">
          <h3 className="font-semibold text-slate-700">Digite a Chave de Acesso</h3>
          <p className="text-sm text-slate-500">A chave de acesso possui 44 dígitos e está presente na nota fiscal.</p>
          <div className="flex gap-2">
            <input
              type="text"
              value={chave}
              onChange={(e) => setChave(e.target.value)}
              placeholder="Digite a chave de acesso com 44 dígitos"
              className="flex-1 border border-slate-300 rounded text-slate-500 text-sm px-3 py-2"
            />
            <button
              onClick={handleAddNota}
              className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-1"
            >
              <ArrowDownTrayIcon className="w-5 h-5" /> Adicionar
            </button>
          </div>
        </div>
      )}

      {/* Área de Upload de Arquivos */}
      {modoArquivo && (
        <div
          {...getRootProps()}
          className={`bg-white p-4 rounded shadow border-2 ${
            isDragActive ? "border-blue-500" : "border-dashed border-slate-300"
          } text-center text-slate-500 cursor-pointer`}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Solte os arquivos aqui...</p>
          ) : (
            <p>Arraste os arquivos ou clique para selecionar (JPG, PNG, PDF, XML)</p>
          )}
        </div>
      )}

      {/* Lote Atual */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold text-slate-700 mb-2">Lote Atual</h3>
        <p className="text-slate-600 text-sm">
          {modoArquivo
            ? `Arquivos adicionados: ${arquivos.length}`
            : `Notas fiscais adicionadas: ${notas.length}`}
        </p>

        {(!modoArquivo && notas.length === 0) || (modoArquivo && arquivos.length === 0) ? (
          <p className="text-slate-500 text-sm my-5">Nenhuma nota fiscal adicionada ao lote</p>
        ) : (
            <ul className="mt-4 space-y-2">
                {!modoArquivo
                ? notas.map((n, i) => (
                    <li key={i} className="flex justify-between items-center bg-slate-50 border border-slate-200 rounded px-4 py-2 text-sm text-slate-500">
                    <span>
                        <strong>Nota {i + 1}:</strong> {n.slice(0, 10)}...
                    </span>
                    <button
                        onClick={() => {
                        const novasNotas = [...notas];
                        novasNotas.splice(i, 1);
                        setNotas(novasNotas);
                        }}
                        className="text-rose-500 hover:underline text-sm"
                    >
                        Remover
                    </button>
                    </li>
                ))
                : arquivos.map((file, i) => (
                    <li key={i} className="flex justify-between items-center bg-slate-50 border border-slate-200 rounded px-4 py-2 text-sm text-slate-500">
                    <span>
                        <strong>Arquivo {i + 1}:</strong> {file.name}
                    </span>
                    <button
                        onClick={() => {
                        const novosArquivos = [...arquivos];
                        novosArquivos.splice(i, 1);
                        setArquivos(novosArquivos);
                        }}
                        className="text-rose-500 hover:underline text-sm"
                    >
                        Remover
                    </button>
                    </li>
                ))}
            </ul>
        )}

        <div className="flex gap-2 mt-4">
          <button
            onClick={handleLimparLote}
            disabled={(modoArquivo ? arquivos.length : notas.length) === 0}
            className="px-4 py-2 text-slate-600 border border-slate-300 rounded disabled:opacity-50"
          >
            Limpar Lote
          </button>
          <button
            disabled={(modoArquivo ? arquivos.length : notas.length) === 0}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
          >
            Processar Lote
          </button>
        </div>
      </div>
    </div>
  );
}
