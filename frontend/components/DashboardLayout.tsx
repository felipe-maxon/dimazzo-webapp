"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  UserGroupIcon,
  CubeIcon,
  ChartBarIcon,
  BellIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  DocumentTextIcon,
  ArrowDownTrayIcon,
  ClipboardDocumentCheckIcon,
  TagIcon,
  ClockIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [usuario, setUsuario] = useState<{ nome: string; role: string } | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("usuario");
    if (!user) {
      router.push("/login");
    } else {
      setUsuario(JSON.parse(user));
    }
  }, []);

  const logout = () => {
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    localStorage.removeItem("usuario");
    router.push("/login");
  };

  if (!usuario) return <div className="p-10">Carregando...</div>;

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 p-5 text-slate-800 flex flex-col justify-between fixed top-16 bottom-0">
        <nav className="space-y-2">
          {usuario.role === "admin" ? (
            <>
              <button className="flex items-center gap-2 px-3 py-2 rounded w-full transition-all duration-150 hover:text-blue-600 hover:bg-slate-100">
                <UserGroupIcon className="w-5 h-5" />
                Usuários
              </button>
              <button className="flex items-center gap-2 px-3 py-2 rounded w-full transition-all duration-150 hover:text-blue-600 hover:bg-slate-100">
                <CubeIcon className="w-5 h-5" />
                Estoque
              </button>
              <button className="flex items-center gap-2 px-3 py-2 rounded w-full transition-all duration-150 hover:text-blue-600 hover:bg-slate-100">
                <ChartBarIcon className="w-5 h-5" />
                Relatórios
              </button>
            </>
          ) : (
            <>
              <Link href="/dashboard/minhas-notas" className="flex items-center gap-2 px-3 py-2 rounded w-full transition-all duration-150 hover:text-blue-600 hover:bg-slate-100">
                <CubeIcon className="w-5 h-5" />
                Minhas Notas
              </Link>
              <Link href="/dashboard/nova-entrada" className="flex items-center gap-2 px-3 py-2 rounded w-full transition-all duration-150 hover:text-blue-600 hover:bg-slate-100">
                <ArrowDownTrayIcon className="w-5 h-5" />
                Nova Entrada
              </Link>
              <button className="flex items-center gap-2 px-3 py-2 rounded w-full transition-all duration-150 hover:text-blue-600 hover:bg-slate-100">
                <ClipboardDocumentCheckIcon className="w-5 h-5" />
                Conferência Manual
              </button>
              <button className="flex items-center gap-2 px-3 py-2 rounded w-full transition-all duration-150 hover:text-blue-600 hover:bg-slate-100">
                <TagIcon className="w-5 h-5" />
                Etiquetas
              </button>
              <button className="flex items-center gap-2 px-3 py-2 rounded w-full transition-all duration-150 hover:text-blue-600 hover:bg-slate-100">
                <ClockIcon className="w-5 h-5" />
                Histórico de Entradas
              </button>
              <button className="flex items-center gap-2 px-3 py-2 rounded w-full transition-all duration-150 hover:text-blue-600 hover:bg-slate-100">
                <DocumentTextIcon className="w-5 h-5" />
                Produtos
              </button>
              <button className="flex items-center gap-2 px-3 py-2 rounded w-full transition-all duration-150 hover:text-blue-600 hover:bg-slate-100">
                <ChartBarIcon className="w-5 h-5" />
                Estoque
              </button>
              <button className="flex items-center gap-2 px-3 py-2 rounded w-full mt-4 transition-all duration-150 hover:text-blue-600 hover:bg-slate-100">
                <QuestionMarkCircleIcon className="w-5 h-5" />
                Ajuda
              </button>
            </>
          )}
        </nav>
      </aside>

      {/* Main content area */}
      <div className="flex flex-col flex-1 min-h-screen pl-64">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between z-50">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-slate-800">DI MAZZO</h1>
            <input
              type="text"
              placeholder="Buscar..."
              className="border border-slate-300 text-slate-600 rounded px-3 py-1 text-sm focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <div className="flex items-center gap-4 relative">
            <button>
              <BellIcon className="w-6 h-6 text-slate-600 hover:text-blue-600" />
            </button>
            <div className="relative">
              <button onClick={() => setDropdownOpen(!dropdownOpen)}>
                <UserCircleIcon className="w-8 h-8 text-slate-600 hover:text-blue-600" />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-slate-600 border border-slate-200 rounded shadow-md z-50">
                  <button className="w-full text-left px-4 py-2 hover:bg-slate-100 flex items-center gap-2">
                    <UserCircleIcon className="w-5 h-5" /> Perfil
                  </button>
                  <button className="w-full text-left px-4 py-2 hover:bg-slate-100 flex items-center gap-2">
                    <Cog6ToothIcon className="w-5 h-5" /> Configurações
                  </button>
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 hover:bg-slate-100 flex items-center gap-2 text-red-500"
                  >
                    Sair
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="mt-16 p-6 bg-slate-50 flex-1 overflow-y-auto">
          <section>{children}</section>
        </main>
      </div>
    </div>
  );
}
