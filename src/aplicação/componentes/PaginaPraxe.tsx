import { useState } from 'react';
import { GraduationCap, Download, ChevronRight, Music } from 'lucide-react';
import { MenuLateral } from './MenuLateral';

interface PaginaPraxeProps {
  aoMudarPagina?: (pagina: string) => void;
}

export function PaginaPraxe({ aoMudarPagina }: PaginaPraxeProps = {}) {

  const [cursoSelecionado, setCursoSelecionado] = useState<string | null>(null);

  const handleDownload = (url: string, fileName: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const cursos = [
    {
      id: 'informatica',
      nome: 'Engenharia Informática',
      sigla: 'EI',
      cor: 'bg-blue-500',
      cancioneiro: 'https://klsrwaropwdmxtbkbxqz.supabase.co/storage/v1/object/public/materiais/Cansioneiro%20%20Passaporte%20de%20Caloiro.pdf',
      codigoPraxe: 'https://klsrwaropwdmxtbkbxqz.supabase.co/storage/v1/object/public/materiais/Codigo_de_Praxe_e_Traje-1.pdf',
      numeroEstudantes: 234,
    },
    {
      id: 'informatica-web-movel-nuvem',
      nome: 'Informática Web, móvel e na Nuvem',
      sigla: 'IW',
      cor: 'bg-cyan-500',
      cancioneiro: 'https://klsrwaropwdmxtbkbxqz.supabase.co/storage/v1/object/public/materiais/Cansioneiro%20%20Passaporte%20de%20Caloiro.pdf',
      codigoPraxe: 'https://klsrwaropwdmxtbkbxqz.supabase.co/storage/v1/object/public/materiais/Codigo_de_Praxe_e_Traje-1.pdf',
      numeroEstudantes: 112,
    },
    {
      id: 'medicina',
      nome: 'Medicina',
      sigla: 'MED',
      cor: 'bg-red-500',
      cancioneiro: 'https://klsrwaropwdmxtbkbxqz.supabase.co/storage/v1/object/public/materiais/Cansioneiro%20%20Passaporte%20de%20Caloiro.pdf',
      codigoPraxe: 'https://klsrwaropwdmxtbkbxqz.supabase.co/storage/v1/object/public/materiais/Codigo_de_Praxe_e_Traje-1.pdf',
      numeroEstudantes: 189,
    },
    {
      id: 'gestao',
      nome: 'Gestão',
      sigla: 'GEST',
      cor: 'bg-green-500',
      cancioneiro: 'https://klsrwaropwdmxtbkbxqz.supabase.co/storage/v1/object/public/materiais/Cansioneiro%20%20Passaporte%20de%20Caloiro.pdf',
      codigoPraxe: 'https://klsrwaropwdmxtbkbxqz.supabase.co/storage/v1/object/public/materiais/Codigo_de_Praxe_e_Traje-1.pdf',
      numeroEstudantes: 156,
    },
    {
      id: 'design',
      nome: 'Design Multimédia',
      sigla: 'DM',
      cor: 'bg-purple-500',
      cancioneiro: 'https://klsrwaropwdmxtbkbxqz.supabase.co/storage/v1/object/public/materiais/Cansioneiro%20%20Passaporte%20de%20Caloiro.pdf',
      codigoPraxe: 'https://klsrwaropwdmxtbkbxqz.supabase.co/storage/v1/object/public/materiais/Codigo_de_Praxe_e_Traje-1.pdf',
      numeroEstudantes: 98,
    },
    {
      id: 'engenharia',
      nome: 'Engenharia Civil',
      sigla: 'EC',
      cor: 'bg-orange-500',
      cancioneiro: 'https://klsrwaropwdmxtbkbxqz.supabase.co/storage/v1/object/public/materiais/Cansioneiro%20%20Passaporte%20de%20Caloiro.pdf',
      codigoPraxe: 'https://klsrwaropwdmxtbkbxqz.supabase.co/storage/v1/object/public/materiais/Codigo_de_Praxe_e_Traje-1.pdf',
      numeroEstudantes: 145,
    },
  ];

  const cursoAtual = cursos.find(c => c.id === cursoSelecionado);

  return (
    <div>
      {/* Menu Lateral */}
      <MenuLateral aoMudarPagina={aoMudarPagina} />

      <div className="pt-24 px-8 space-y-8 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm p-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-purple-500 w-14 h-14 rounded-xl flex items-center justify-center">
            <GraduationCap size={28} className="text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Área da Praxe</h1>
            <p className="text-gray-600">Cancioneiros, ficheiros e tradições académicas</p>
          </div>
        </div>

        {/* Info */}
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mt-6">
          <p className="text-sm text-purple-900">
            <strong>Bem-vindo, caloiro!</strong> Aqui encontras todos os recursos necessários para
            conheceres as tradições académicas do teu curso. Descarrega os cancioneiros, consulta
            os regulamentos e integra-te na comunidade estudantil da UBI.
          </p>
        </div>
      </div>

      {/* Traje Académico */}
      <div className="bg-white rounded-2xl shadow-sm p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Traje Académico da UBI</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Traje Feminino */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <img 
                src="/./Imagens/imagens/trajefemenino.png" 
                alt="Traje Feminino" 
                className="w-48 h-60 object-contain rounded-lg shadow-md"
              />
              <div>
                <h3 className="text-xl font-bold text-gray-900">Traje Feminino</h3>
                <p className="text-sm text-gray-600">Tradicional e elegante</p>
              </div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <ul className="space-y-2 text-sm text-gray-700">
                <li><strong>Capa:</strong> Capa de cerimónia usada pelas senhoras no princípio do século na zona das Sarnadas da Beira, com capuz e gola levantada. O capuz é pregado na gola com três botões.</li>
                <li><strong>Casaco:</strong> Desenhado com base na casaquinha cintada usada no inicio do século XX, pelas senhoras das famílias mais abastadas. Aperta com cinco botões de 4 furos, a gola e virados são rematados e pespontados em redondo.</li>
                <li><strong>Colete:</strong> Colete cintado com 7 botões de 4 furos, com o forro e a traseira em cetinete ou cetim e com fivela atrás. Este colete foi assim desenhado para tentar interligá-lo com o colete do traje masculino.</li>
                <li><strong>Saia:</strong> Inspirada na época de 1900, de estilo clássico. Tem dois machos à frente, variando o seu comprimento entre a meia perna e o tornozelo.</li>
                <li><strong>Camisa:</strong> A camisa é uma blusa simples com pé de gola (ou "gola de padre"). Esta camisa aperta atrás e os punhos são altos com 3 pregas deitadas e 2 botões de 4 furos.</li>
                <li><strong>Alfinete:</strong> Na gola da camisa leva um alfinete com o brasão da U.B.I., em metal dourado.</li>
                <li><strong>Sapato:</strong> O sapato feminino é do tipo clássico liso, sem aplicações metálicas ou outras, com meio salto (não pode exceder os 4 cm nem ser inferior a 2 cm).</li>
                <li><strong>Meias:</strong> As meias serão completamente pretas lisas em vidro, lycra ou mousse, finas sem ser opacas.</li>
              </ul>
            </div>
          </div>

          {/* Traje Masculino */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <img 
                src="/./Imagens/imagens/trajemasculino.png" 
                alt="Traje Masculino" 
                className="w-48 h-60 object-contain rounded-lg shadow-md"
              />
              <div>
                <h3 className="text-xl font-bold text-gray-900">Traje Masculino</h3>
                <p className="text-sm text-gray-600">Tradição serrana</p>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <ul className="space-y-2 text-sm text-gray-700">
                <li><strong>Capa:</strong> Capa de cerimónia baseada no tradicional "capote" do pastor ou "gabão" cerimonial usado no princípio do século. O capote era também usado pelo pastor serrano. Vai até um pouco abaixo do joelho (meio da canela).</li>
                <li><strong>Casaco:</strong> Jaqueta desenhada a partir do modelo usado pelos senhores das famílias mais abastadas e pelo clero, na região da Beira Interior.</li>
                <li><strong>Colete:</strong> O colete é alto, com sete botões, gola de rebuço e com fivela de aperto atrás. O forro e a traseira são em cetinete ou cetim.</li>
                <li><strong>Calças:</strong> Calças tradicionais da zona, com botões na portinhola e uma sobreposição, bolsos direitos e 6 presilhas. As calças são ligeiramente afuniladas ao fundo.</li>
                <li><strong>Camisa:</strong> A camisa tem colarinhos e punhos normais, aperta com botões até ao fim do "peitilho" onde leva uma presilha e um botão. Esta era também usada no princípio do século.</li>
                <li><strong>Gravata:</strong> De cor preta e lisa sem ser acetinada.</li>
                <li><strong>Chapéu:</strong> O chapéu é de abas largas (cerca de 10.5 cm) em feltro preto com uma fita em toda a volta. Este é uma réplica do usado pelos pastores da serra da estrela.</li>
                <li><strong>Sapato:</strong> O sapato dos homens é do tipo clássico, sem aplicações metálicas ou outras, completamente pretos de cordões.</li>
                <li><strong>Meias:</strong> As meias serão completamente pretas lisas ou canelada mas sem qualquer padrão.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* História do Traje */}
        <div className="mt-8 p-6 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg">
          <h3 className="text-lg font-bold text-gray-900 mb-3">História do Traje Académico</h3>
          <p className="text-gray-700 leading-relaxed">
            O traje académico da Universidade da Beira Interior tem as suas raízes na tradição cultural da região da Covilhã e Serra da Estrela. 
            Inspirado nas vestimentas usadas pelas famílias mais abastadas e pelo clero no início do século XX, o traje reflete a identidade 
            cultural da Beira Interior. A capa masculina baseia-se no tradicional "capote" do pastor serrano, enquanto o traje feminino 
            remete para a elegância das senhoras da época. Este traje é um símbolo de orgulho e pertença à comunidade académica da UBI, 
            usado em cerimónias solenes e eventos importantes da vida universitária.
          </p>
        </div>
      </div>

      {/* Seleção de curso */}
      {!cursoSelecionado ? (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Escolhe o Teu Curso</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cursos.map((curso) => (
              <button
                key={curso.id}
                onClick={() => setCursoSelecionado(curso.id)}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-6 text-left group"
              >
                <div className={`${curso.cor} w-16 h-16 rounded-xl flex items-center justify-center mb-4 text-white text-2xl font-bold group-hover:scale-110 transition`}>
                  {curso.sigla}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{curso.nome}</h3>
                <p className="text-sm text-gray-600 mb-4">
                  {curso.numeroEstudantes} estudantes
                </p>
                <div className="flex items-center text-blue-600 font-medium">
                  Ver detalhes
                  <ChevronRight size={18} className="ml-1 group-hover:translate-x-1 transition" />
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div>
          {/* Botão Voltar */}
          <button
            onClick={() => setCursoSelecionado(null)}
            className="bg-white hover:bg-blue-600 text-blue-600 hover:text-white border border-blue-600 hover:border-blue-600 font-semibold py-2 px-4 rounded-lg transition flex items-center gap-2 mb-6"
          >
            <ChevronRight size={18} className="rotate-180" />
            Voltar aos cursos
          </button>

          {/* Detalhes do curso */}
          <div className="bg-white rounded-2xl shadow-sm p-8 mb-6">
            <div className="flex items-center gap-4 mb-6">
              <div className={`${cursoAtual?.cor} w-16 h-16 rounded-xl flex items-center justify-center text-white text-2xl font-bold`}>
                {cursoAtual?.sigla}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{cursoAtual?.nome}</h2>
                <p className="text-gray-600">{cursoAtual?.numeroEstudantes} estudantes inscritos</p>
              </div>
            </div>

            {/* Cancioneiro em destaque */}
            <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl p-6 mb-6">
              <div className="flex items-center gap-4">
                <div className="bg-white w-16 h-16 rounded-lg flex items-center justify-center">
                  <Music size={32} className="text-purple-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-1">Cancioneiro Oficial 2026</h3>
                  <p className="text-sm text-gray-600">
                    Todas as canções tradicionais do curso
                  </p>
                </div>
                <button 
                  onClick={() => handleDownload(cursoAtual?.cancioneiro || '', 'Cancioneiro_Passaporte_Caloiro.pdf')}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition flex items-center gap-2"
                >
                  <Download size={18} />
                  Descarregar
                </button>
              </div>
            </div>

            {/* Código de Praxe em destaque */}
            <div className="bg-gradient-to-r from-green-100 to-teal-100 rounded-xl p-6 mb-6">
              <div className="flex items-center gap-4">
                <div className="bg-white w-16 h-16 rounded-lg flex items-center justify-center">
                  <GraduationCap size={32} className="text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-1">Código de Praxe 2026</h3>
                  <p className="text-sm text-gray-600">
                    Regras e normas da praxe do curso
                  </p>
                </div>
                <button 
                  onClick={() => handleDownload(cursoAtual?.codigoPraxe || '', 'Codigo_de_Praxe_e_Traje.pdf')}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition flex items-center gap-2"
                >
                  <Download size={18} />
                  Descarregar
                </button>
              </div>
            </div>

          </div>

          {/* Informações adicionais */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-4">Regras da Praxe</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• A praxe é facultativa e voluntária</li>
                <li>• Respeito mútuo é fundamental</li>
                <li>• Proibidas práticas que violem a dignidade</li>
                <li>• Dúvidas? Contacta a comissão de praxe</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-bold text-gray-900 mb-4">Contactos Úteis</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Email: praxe.{cursoAtual?.id}@ubi.pt</li>
                <li>• Dúvidas de Praxe: Vê a seção de Chat</li>
                <li>• Horário de atendimento: Seg-Sex, 14h-18h</li>
              </ul>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}



