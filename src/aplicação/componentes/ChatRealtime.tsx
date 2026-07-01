import { useState } from 'react';
import { useChatRealtime } from '../../hooks/useChatRealtime';
import { Hash, User, Menu, X } from 'lucide-react';
import { MenuLateral } from './MenuLateral';

interface ChatRealtimeProps {
  aoMudarPagina?: (pagina: string) => void;
}

export function ChatRealtime({ aoMudarPagina }: ChatRealtimeProps = {}) {
  const [cursoAtivo, setCursoAtivo] = useState('informatica');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const cursos = [
    { id: 'informatica', nome: 'Eng. Informática', cor: 'bg-blue-500' },
    { id: 'civil', nome: 'Eng. Civil', cor: 'bg-orange-500' },
    { id: 'mecanica', nome: 'Eng. Mecânica', cor: 'bg-green-500' },
    { id: 'gestao', nome: 'Gestão', cor: 'bg-purple-500' },
  ];
  const {
    sessao,
    mensagens,
    novaMensagem,
    setNovaMensagem,
    utilizadoresOnline,
    chatContainerRef,
    iniciarSessao,
    enviarMensagem,
    formatarHora,
  } = useChatRealtime(cursoAtivo);

  const cursoInfo = cursos.find(c => c.id === cursoAtivo);

  if (!sessao) {
    return (
      <div className="w-full flex h-screen justify-center items-center bg-gray-900">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-8">Chat por Curso</h1>
          <button
            onClick={iniciarSessao}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg transition flex items-center gap-2 mx-auto"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Iniciar sessão com Google para conversar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Menu Lateral */}
      <MenuLateral aoMudarPagina={aoMudarPagina} />

      <div className="pt-24 px-4 sm:px-8 space-y-8 bg-gray-50">
      <div className="border border-gray-700 max-w-6xl w-[95%] sm:w-[90%] min-h-[600px] rounded-lg bg-gray-800 mx-auto">
        {/* Header */}
        <div className="flex justify-between h-20 border-b border-gray-700">
          <div className="p-4 flex items-center gap-3">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden text-gray-300 hover:text-white"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div>
              <p className="text-gray-300 hidden sm:block">
                Sessão iniciada como {sessao.email}
              </p>
              <p className="text-gray-300 italic text-sm">
                {utilizadoresOnline.length} utilizadores online em {cursoInfo?.nome}
              </p>
            </div>
          </div>
        </div>

        <div className="flex h-full relative">
          {/* Overlay para mobile */}
          {isMenuOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
              onClick={() => setIsMenuOpen(false)}
            />
          )}

          {/* Sidebar - Cursos */}
          <div className={`fixed lg:relative inset-y-0 left-0 z-50 lg:z-auto w-80 border-r border-gray-200 flex flex-col bg-gray-800 transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}>
            <div className="p-4 border-b border-gray-700">
              <h2 className="font-bold text-gray-300 flex items-center gap-2">
                <Hash size={20} />
                Cursos
              </h2>
            </div>

            <div className="flex-1 overflow-y-auto">
              {cursos.map((curso) => (
                <button
                  key={curso.id}
                  onClick={() => setCursoAtivo(curso.id)}
                  className={`w-full p-4 flex items-center gap-3 transition border-l-4 ${
                    cursoAtivo === curso.id
                      ? `${curso.cor} border-l-current bg-gray-700`
                      : 'border-transparent hover:bg-gray-700'
                  }`}
                >
                  <div className={`${curso.cor} w-10 h-10 rounded-lg flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}>
                    #
                  </div>
                  <div className="flex-1 text-left">
                    <p className={`font-medium ${cursoAtivo === curso.id ? 'text-gray-100' : 'text-gray-300'}`}>
                      {curso.nome}
                    </p>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Chat em tempo real
                    </p>
                  </div>
                </button>
              ))}
            </div>

            {/* Info do utilizador */}
            <div className="p-4 border-t border-gray-700 bg-gray-700">
              <div className="flex items-center gap-3">
                <div className="bg-gray-600 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold">
                  {sessao.email?.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-100 text-sm">Você</p>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <p className="text-xs text-gray-400">Online</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Área de mensagens */}
          <div className="flex-1 flex flex-col">
            {/* Header do curso */}
            <div className="p-4 border-b border-gray-700 bg-gray-800">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-gray-100 flex items-center gap-2">
                    <Hash size={20} className="text-blue-400" />
                    {cursoInfo?.nome}
                  </h3>
                  <p className="text-sm text-gray-400">
                    Chat exclusivo para estudantes do curso
                  </p>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <User size={18} />
                  {utilizadoresOnline.length} online
                </div>
              </div>
            </div>

            {/* Mensagens */}
            <div
              ref={chatContainerRef}
              className="p-4 flex flex-col overflow-y-auto h-[300px] sm:h-[400px] space-y-2"
            >
              {mensagens.map((msg: any, idx: any) => (
                <div
                  key={idx}
                  className={`my-2 flex w-full items-start ${
                    msg.nome_utilizador === sessao.email
                      ? 'justify-end'
                      : 'justify-start'
                  }`}
                >
                  {/* Received message - avatar on left */}
                  {msg.nome_utilizador !== sessao.email && (
                    <div className="w-10 h-10 rounded-full mr-2 bg-blue-500 flex items-center justify-center flex-shrink-0">
                      {msg.avatar ? (
                        <img
                          src={msg.avatar}
                          alt="avatar"
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <div className="text-white font-bold text-sm">
                          {msg.nome_utilizador ? msg.nome_utilizador.charAt(0).toUpperCase() : 'U'}
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex flex-col w-full">
                    <div
                      className={`p-3 max-w-[70%] rounded-xl ${
                        msg.nome_utilizador === sessao.email
                          ? 'bg-blue-600 text-white ml-auto'
                          : 'bg-gray-600 text-white mr-auto'
                      }`}
                    >
                      <p className="text-sm">{msg.mensagem}</p>
                    </div>
                    
                    {/* Timestamp */}
                    <div
                      className={`text-xs text-gray-400 pt-1 ${
                        msg.nome_utilizador === sessao.email
                          ? 'text-right mr-2'
                          : 'text-left ml-2'
                      }`}
                    >
                      {msg.nome_utilizador !== sessao.email && (
                        <span className="text-gray-500 mr-2">{msg.nome_utilizador}</span>
                      )}
                      {formatarHora(msg.data_hora)}
                    </div>
                  </div>

                  {/* Sent message - avatar on right */}
                  {msg.nome_utilizador === sessao.email && (
                    <img
                      src={msg.avatar}
                      alt="avatar"
                      className="w-10 h-10 rounded-full ml-2"
                    />
                  )}
                </div>
              ))}

              {mensagens.length === 0 && (
                <div className="text-center text-gray-400 py-8">
                  <p>Nenhuma mensagem neste curso ainda.</p>
                  <p className="text-sm text-gray-500 mt-2">Sê o primeiro a participar!</p>
                </div>
              )}
            </div>

            {/* Message input */}
            <form
              onSubmit={enviarMensagem}
              className="flex flex-col sm:flex-row p-4 border-t border-gray-700"
            >
              <input
                value={novaMensagem}
                onChange={(e) => setNovaMensagem(e.target.value)}
                type="text"
                placeholder={`Escreve uma mensagem para ${cursoInfo?.nome}...`}
                className="p-3 w-full bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button 
                type="submit"
                className="mt-4 sm:mt-0 sm:ml-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
              >
                Enviar
              </button>
            </form>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
