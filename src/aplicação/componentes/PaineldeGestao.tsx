import { useState } from 'react';
import {
  Home,
  Trophy,
  GraduationCap,
  MessageCircle,
  Car,
  BookOpen,
  Menu,
  X,
  LogOut
} from 'lucide-react';

interface PaineldeGestaoProps {
  emailUsuario: string;
  aoDeslogar: () => void;
  children: React.ReactNode;
  paginaAtual: string;
  aoMudarPagina: (pagina: string) => void;
}

export function PaineldeGestao({ emailUsuario, aoDeslogar, children, paginaAtual, aoMudarPagina }: PaineldeGestaoProps) {
  const [menuAberto, setMenuAberto] = useState(false);

  const menuItens = [
    { id: 'inicio', label: 'Início', icone: Home },
    { id: 'concursos', label: 'Concursos e Desafios', icone: Trophy },
    { id: 'praxe', label: 'Área da Praxe', icone: GraduationCap },
    { id: 'chat-realtime', label: 'Chat por Curso', icone: MessageCircle },
    { id: 'transportes', label: 'Transportes', icone: Car },
    { id: 'biblioteca', label: 'Biblioteca', icone: BookOpen },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo/Título */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMenuAberto(!menuAberto)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
              >
                {menuAberto ? <X size={24} /> : <Menu size={24} />}
              </button>
              <h1 className="text-xl font-bold text-gray-900">
                Linha de Apoio ao Caloiro
              </h1>
            </div>

            {/* Info do usuário */}
            <div className="flex items-center gap-4">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-gray-900">{emailUsuario.split('@')[0]}</p>
                <p className="text-xs text-gray-500">{emailUsuario}</p>
              </div>
              <button
                onClick={aoDeslogar}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
              >
                <LogOut size={18} />
                <span className="hidden sm:inline">Sair</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <nav className="bg-white rounded-xl shadow-sm p-4 sticky top-24">
              <ul className="space-y-2">
                {menuItens.map((item) => {
                  const Icone = item.icone;
                  const ativo = paginaAtual === item.id;

                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => aoMudarPagina(item.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                          ativo
                            ? 'bg-blue-600 text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <Icone size={20} />
                        <span className="font-medium">{item.label}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </aside>

          {/* Sidebar - Mobile */}
          {menuAberto && (
            <div className="lg:hidden fixed inset-0 bg-black/50 z-30" onClick={() => setMenuAberto(false)}>
              <aside
                className="w-64 bg-white h-full shadow-xl"
                onClick={(e) => e.stopPropagation()}
              >
                <nav className="p-4">
                  <ul className="space-y-2">
                    {menuItens.map((item) => {
                      const Icone = item.icone;
                      const ativo = paginaAtual === item.id;

                      return (
                        <li key={item.id}>
                          <button
                            onClick={() => {
                              aoMudarPagina(item.id);
                              setMenuAberto(false);
                            }}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                              ativo
                                ? 'bg-blue-600 text-white'
                                : 'text-gray-700 hover:bg-gray-100'
                            }`}
                          >
                            <Icone size={20} />
                            <span className="font-medium">{item.label}</span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
              </aside>
            </div>
          )}

          {/* Conteúdo principal */}
          <main className="flex-1 min-w-0">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
