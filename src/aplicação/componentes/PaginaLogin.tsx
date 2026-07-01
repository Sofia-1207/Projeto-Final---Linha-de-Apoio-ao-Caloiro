import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { supabase } from '../../biblioteca/supabase';

export function PaginaLogin() {
  const [erro, setErro] = useState('');
  const [imagemAtual, setImagemAtual] = useState(0);

  // Imagens locais da pasta public/imagens
  const imagensDeFundo = [
    '/./Imagens/imagens/imagemubi.jpeg',
    '/./Imagens/imagens/imagemubi2.jpg',
    '/./Imagens/imagens/imagemubi3.jpeg',
    '/./Imagens/imagens/imagemubi4.jpg',
    '/./Imagens/imagens/imagmeubi1.jpeg',
  ];

  // Trocar imagem a cada 5 segundos
  useEffect(() => {
    const intervalo = setInterval(() => {
      setImagemAtual((anterior) => (anterior + 1) % imagensDeFundo.length);
    }, 5000);
    return () => clearInterval(intervalo);
  }, [imagensDeFundo.length]);

  // Login com Google OAuth
  const handleGoogleLogin = async () => {
    try {
      setErro('');
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          }
        }
      });

      if (error) {
        setErro('Erro ao fazer login com Google: ' + error.message);
      }
    } catch (error) {
      setErro('Erro ao conectar com Google. Tente novamente.');
      console.error('Erro Google OAuth:', error);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Lado esquerdo - Imagens de fundo com nome do site */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {imagensDeFundo.map((imagem, index) => (
          <div
            key={imagem}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{
              opacity: imagemAtual === index ? 1 : 0,
              backgroundImage: `url(${imagem})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        ))}

        {/* Overlay escuro para melhor legibilidade */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Nome do site */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full text-white px-8">
          {/* Logo */}
          <img 
            src={`./Imagens/imagens/Logotipo1.png?v=${Date.now()}`} 
            alt="Linha de Apoio ao Caloiro" 
            className="w-32 h-32 mb-8 object-contain"
          />
          <h1 className="text-6xl font-bold text-center mb-4">
            Linha de Apoio
            <br />
            ao Caloiro
          </h1>
          <p className="text-xl text-center opacity-90">
            Plataforma de suporte aos estudantes da UBI
          </p>
        </div>
      </div>

      {/* Lado direito - Formulário de login */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-50 px-8 py-12">
        <div className="w-full max-w-md">
          {/* Logo/Título mobile */}
          <div className="lg:hidden text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Linha de Apoio ao Caloiro
            </h1>
            <p className="text-gray-600">Plataforma UBI</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Bem-vindo!
            </h2>
            <p className="text-gray-600 mb-8">
              Entre com sua conta Google para continuar
            </p>

            {/* Botão de login com Google */}
            <button
              onClick={handleGoogleLogin}
              className="w-full bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 font-semibold py-4 px-4 rounded-lg transition flex items-center justify-center gap-3 group shadow-sm"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Linha de Apoio ao Caloiro
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </button>

            {/* Mensagem de erro ou sucesso */}
            {erro && (
              <div className={`mt-4 px-4 py-3 rounded-lg text-sm ${
                erro.includes('sucesso') 
                  ? 'bg-green-100 text-green-700 border border-green-200' 
                  : 'bg-red-100 text-red-700 border border-red-200'
              }`}>
                {erro}
              </div>
            )}

            {/* Informação adicional */}
            <div className="mt-8 text-center text-sm text-gray-600">
              <p>Ao fazer login, aceita os nossos termos de serviço.</p>
            </div>
          </div>

          {/* Informação adicional */}
          <div className="mt-8 text-center text-sm text-gray-600">
            <p>Plataforma de apoio aos estudantes</p>
          </div>
        </div>
      </div>
    </div>
  );
}
