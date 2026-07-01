import { useState } from 'react';
import { PaginaLogin } from './componentes/PaginaLogin';
import { PaginaConcursos } from './componentes/PaginaConcursos';
import { PaginaPraxe } from './componentes/PaginaPraxe';
import { ChatRealtime } from './componentes/ChatRealtime';
import { PaginaTransportes } from './componentes/PaginaTransportes';
import { PaginaBiblioteca } from './componentes/PaginaBiblioteca';
import { PaginaCovilha } from './componentes/PaginaCovilha';
import { PaginaInicialPremium } from './componentes/PaginaInicialPremium';
import { useAuth } from '../hooks/useAuth';

export default function App() {
  const { user, loading } = useAuth();
  const [paginaAtual, setPaginaAtual] = useState('inicio');

  const renderizarPagina = () => {
    switch (paginaAtual) {
      case 'inicio':
        return <PaginaInicialPremium />;
      case 'inicio-premium':
        return <PaginaInicialPremium />;
      case 'concursos':
        return <PaginaConcursos aoMudarPagina={setPaginaAtual} />;
      case 'praxe':
        return <PaginaPraxe aoMudarPagina={setPaginaAtual} />;
      case 'chat-realtime':
        return <ChatRealtime aoMudarPagina={setPaginaAtual} />;
      case 'transportes':
        return <PaginaTransportes aoMudarPagina={setPaginaAtual} />;
      case 'biblioteca':
        return <PaginaBiblioteca aoMudarPagina={setPaginaAtual} />;
      case 'covilha':
        return <PaginaCovilha aoMudarPagina={setPaginaAtual} />;
      default:
        return <PaginaInicialPremium />;
    }
  };

  // Se estiver a carregar, mostrar loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">A carregar...</p>
        </div>
      </div>
    );
  }

  // Se não estiver autenticado, mostra a página de login
  if (!user) {
    return <PaginaLogin />;
  }

  // Renderiza a página atual com menu e logout
  return (
    <div>
      {paginaAtual === 'inicio' ? (
        <PaginaInicialPremium aoMudarPagina={setPaginaAtual} />
      ) : (
        <>
          {renderizarPagina()}
        </>
      )}
    </div>
  );
}