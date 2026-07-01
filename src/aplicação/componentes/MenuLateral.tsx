import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Menu, X, Home, Trophy, GraduationCap, MessageCircle, Car, BookOpen, LogOut, MapPin } from 'lucide-react';

interface MenuLateralProps {
  aoMudarPagina?: (pagina: string) => void;
}

export function MenuLateral({ aoMudarPagina }: MenuLateralProps = {}) {
  const [menuAberto, setMenuAberto] = useState(false);
  const { signOut } = useAuth();

  // Menu items centralizados
  const menuItens = [
    { id: 'inicio', label: 'Início', icone: Home },
    { id: 'covilha', label: 'Descobre a Covilhã', icone: MapPin },
    { id: 'concursos', label: 'Concursos e Desafios', icone: Trophy },
    { id: 'praxe', label: 'Área da Praxe', icone: GraduationCap },
    { id: 'chat-realtime', label: 'Chat por Curso', icone: MessageCircle },
    { id: 'transportes', label: 'Transportes', icone: Car },
    { id: 'biblioteca', label: 'Biblioteca', icone: BookOpen },
  ];

  // Função para navegar para outras páginas
  const handleNavegacao = (pagina: string) => {
    if (aoMudarPagina) {
      aoMudarPagina(pagina);
    }
    setMenuAberto(false);
  };

  // Função para logout
  const handleLogout = async () => {
    try {
      await signOut();
    } catch (err) {
      // se falhar, tentamos limpar o localStorage como fallback
      localStorage.clear();
    }
    setMenuAberto(false);
  };

  return (
    <>
      {/* Botão Menu */}
      <div className="fixed top-0 left-0 z-50 p-6">
        <button
          onClick={() => setMenuAberto(!menuAberto)}
          className="bg-white hover:bg-gray-100 text-gray-700 p-3 rounded-lg shadow-lg transition-all duration-300 hover:scale-105"
        >
          {menuAberto ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Menu Lateral */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-40 ${
          menuAberto ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setMenuAberto(false)}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-8">
            {menuItens.map((item) => {
              const Icone = item.icone;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavegacao(item.id)}
                    className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-all duration-200 group"
                  >
                    <Icone 
                      size={20} 
                      className="group-hover:scale-110 transition-transform duration-200" 
                    />
                    <span className="font-medium">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer do Menu */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 group"
          >
            <LogOut 
              size={20} 
              className="group-hover:scale-110 transition-transform duration-200" 
            />
            <span className="font-medium">Sair</span>
          </button>
        </div>
      </div>

      {/* Overlay com efeito blur */}
      {menuAberto && (
        <div
          className="fixed inset-0 backdrop-blur-sm z-30 transition-opacity duration-300"
          onClick={() => setMenuAberto(false)}
        />
      )}

          </>
  );
}
