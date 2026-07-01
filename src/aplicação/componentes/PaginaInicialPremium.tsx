import { useState, useEffect } from 'react';
import { ChevronDown, Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';
import { MenuLateral } from './MenuLateral';

interface PaginaInicialPremiumProps {
  aoMudarPagina?: (pagina: string) => void;
}

export function PaginaInicialPremium({ aoMudarPagina }: PaginaInicialPremiumProps = {}) {
  const [imagemAtual, setImagemAtual] = useState(0);

  // Imagens para o carrossel principal
  const imagensCarrossel = [
    '/./Imagens/imagens/imagemubi.jpeg',
    '/./Imagens/imagens/imagemubi2.jpg',
    '/./Imagens/imagens/imagemubi3.jpeg',
    '/./Imagens/imagens/imagemubi4.jpg',
    '/./Imagens/imagens/imagmeubi1.jpeg',
  ];

  // Auto-avançar carrossel
  useEffect(() => {
    const interval = setInterval(() => {
      setImagemAtual((prev) => (prev + 1) % imagensCarrossel.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Menu Lateral */}
      <MenuLateral aoMudarPagina={aoMudarPagina} />

      {/* Carrossel Principal */}
      <div className="relative h-screen overflow-hidden">
        {imagensCarrossel.map((imagem, index) => (
          <div
            key={imagem}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === imagemAtual ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url(${imagem})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        ))}
        
        {/* Overlay escuro para legibilidade */}
        <div className="absolute inset-0 bg-black/40" />
        
        {/* Conteúdo sobre o carrossel */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-8">
          {/* Logo */}
          <img 
            src={`/./Imagens/imagens/Logotipo1.png?v=${Date.now()}`} 
            alt="Linha de Apoio ao Caloiro" 
            className="w-40 h-40 mb-8 object-contain"
          />
          <h1 className="text-8xl md:text-6xl font-bold mb-6 text-center tracking-wide">
            Linha de Apoio
          </h1>
          <h2 className="text-4xl md:text-6xl font-bold mb-8 text-center tracking-wide">
            ao Caloiro
          </h2>
          <p className="text-xl md:text-2xl font-light text-center max-w-3xl mb-12 opacity-90">
            Excelência académica e tradição universitária
          </p>
          
          {/* Indicadores do carrossel */}
          <div className="flex gap-2 mb-8">
            {imagensCarrossel.map((_, index) => (
              <button
                key={index}
                onClick={() => setImagemAtual(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === imagemAtual 
                    ? 'bg-white w-8' 
                    : 'bg-white/50 hover:bg-white/75'
                }`}
              />
            ))}
          </div>
          
          {/* Seta para baixo */}
          <ChevronDown 
            size={32} 
            className="animate-bounce cursor-pointer hover:scale-110 transition"
            onClick={() => document.getElementById('sobre')?.scrollIntoView({ behavior: 'smooth' })}
          />
        </div>
      </div>

      {/* Seção Visão e Missão */}
      <section id="sobre" className="py-24 px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light mb-6 text-gray-900 tracking-wide">
              Visão e Missão
            </h2>
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-gray-400 to-transparent mx-auto mb-8" />
          </div>
          
          <div className="space-y-16">
            {/* Visão */}
            <div className="bg-white rounded-2xl p-12 shadow-sm">
              <h3 className="text-3xl font-light text-gray-900 mb-8 text-center">
                Visão
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed text-center max-w-4xl mx-auto">
                A nossa visão é tornar-nos a principal plataforma digital de referência para estudantes universitários da Universidade da Beira Interior, especialmente para caloiros, promovendo uma integração académica, social e cultural mais simples, rápida e eficaz. Pretendemos criar um ecossistema digital centralizado que elimine a dispersão de informação, facilitando o acesso a recursos essenciais e contribuindo para uma experiência universitária mais informada, inclusiva e conectada.
              </p>
            </div>
            
            {/* Missão */}
            <div className="bg-gradient-to-br from-blue-900 to-blue-700 rounded-2xl p-12 text-white">
              <h3 className="text-3xl font-light mb-8 text-center">
                Missão
              </h3>
              <div className="space-y-6">
                <p className="text-lg leading-relaxed text-center">
                  A nossa missão consiste em desenvolver uma plataforma intuitiva e acessível que reúna, num único espaço, toda a informação relevante para estudantes da UBI. Procuramos apoiar os caloiros no seu processo de adaptação à vida universitária, disponibilizando conteúdos úteis, ferramentas práticas e espaços de interação que respondam às suas necessidades reais.
                </p>
                
                <div className="bg-white/10 rounded-xl p-8">
                  <p className="text-lg mb-6 text-center">
                    A plataforma tem como objetivo:
                  </p>
                  <ul className="space-y-4 max-w-3xl mx-auto">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0" />
                      <span>Centralizar informação importante sobre a universidade e a cidade da Covilhã</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0" />
                      <span>Facilitar o acesso a serviços, horários, contactos e recursos académicos</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0" />
                      <span>Promover a partilha de conhecimento entre estudantes (resumos, projetos, experiências)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0" />
                      <span>Incentivar a comunicação e o espírito de comunidade através de espaços interativos</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0" />
                      <span>Apoiar não só caloiros, mas também estudantes mais avançados, professores e outros utilizadores</span>
                    </li>
                  </ul>
                </div>
                
                <p className="text-lg leading-relaxed text-center mt-8">
                  Em essência, a nossa missão é simplificar a vida académica e melhorar a experiência universitária através da tecnologia, tornando a informação mais acessível, organizada e útil.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rodape Premium */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Logo e Descrição */}
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-3xl font-light mb-4 tracking-wide">
                Linha de Apoio ao Caloiro
              </h3>
              <p className="text-gray-400 mb-6 max-w-md">
                Plataforma oficial da Universidade da Beira Interior 
                dedicada ao apoio e integração dos estudantes.
              </p>
              <div className="flex gap-4">
                <button className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition">
                  <Facebook size={18} />
                </button>
                <button className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition">
                  <Instagram size={18} />
                </button>
                <button className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition">
                  <Twitter size={18} />
                </button>
              </div>
            </div>
            
            {/* Links Rápidos */}
            <div>
              <h4 className="text-lg font-light mb-6 uppercase tracking-wide">Explorar</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition">Chat por Curso</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Transportes</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Biblioteca</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Concursos</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Área da Praxe</a></li>
              </ul>
            </div>
            
            {/* Contactos */}
            <div>
              <h4 className="text-lg font-light mb-6 uppercase tracking-wide">Contactos</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail size={18} className="text-gray-400" />
                  <span className="text-gray-400">apoio@ubi.pt</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={18} className="text-gray-400" />
                  <span className="text-gray-400">+351 275 319 000</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin size={18} className="text-gray-400" />
                  <span className="text-gray-400">Covilhã, Portugal</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Linha divisória e copyright */}
          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm mb-4 md:mb-0">
                © 2026 Universidade da Beira Interior. Todos os direitos reservados.
              </p>
              <div className="flex gap-6 text-sm">
                <a href="#" className="text-gray-400 hover:text-white transition">Política de Privacidade</a>
                <a href="#" className="text-gray-400 hover:text-white transition">Termos de Uso</a>
                <a href="#" className="text-gray-400 hover:text-white transition">Cookies</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
