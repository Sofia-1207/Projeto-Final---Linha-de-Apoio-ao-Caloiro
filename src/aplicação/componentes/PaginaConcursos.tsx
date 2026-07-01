import { useState } from 'react';
import { Trophy, Clock, Users, Calendar, Target, Star, Award, Upload, Eye, X, Camera, FileText, Palette } from 'lucide-react';
import { MenuLateral } from './MenuLateral';
import { supabase } from '../../biblioteca/supabase';

interface PaginaConcursosProps {
  aoMudarPagina?: (pagina: string) => void;
}

export function PaginaConcursos({ aoMudarPagina }: PaginaConcursosProps = {}) {
  const [categoriaAtiva, setCategoriaAtiva] = useState('todos');
  const [mostrarModalParticipacao, setMostrarModalParticipacao] = useState(false);
  const [concursoSelecionado, setConcursoSelecionado] = useState<any>(null);
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    curso: '',
    ficheiro: null as File | null
  });

  const concursos = [
    {
      id: 1,
      titulo: 'Concurso de Fotografia 2026',
      categoria: 'fotografia',
      descricao: 'Capture a essência da vida universitária através da sua lente',
      prazo: '2026-04-15',
      participantes: 45,
      premio: '1º Lugar: 200ubicoins | 2º Lugar: 100ubicoins | 3º Lugar: 50ubicoins',
      status: 'ativo',
      imagem: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=400&q=80',
    },
    {
      id: 2,
      titulo: 'Hackathon UBI 2026',
      categoria: 'programacao',
      descricao: 'Desenvolva soluções inovadoras em 24 horas',
      prazo: '2026-04-20',
      participantes: 82,
      premio: 'Prémios até 500ubicoins + Mentoria',
      status: 'ativo',
      imagem: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&q=80',
    },
    {
      id: 3,
      titulo: 'Desafio de Escrita Criativa',
      categoria: 'escrita',
      descricao: 'Partilhe as suas histórias e poemas originais',
      prazo: '2026-04-10',
      participantes: 28,
      premio: 'Publicação na revista da UBI',
      status: 'ativo',
      imagem: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&q=80',
    },
    {
      id: 4,
      titulo: 'Competição de Design Gráfico',
      categoria: 'design',
      descricao: 'Crie a identidade visual para eventos da UBI',
      prazo: '2026-04-25',
      participantes: 37,
      premio: '300ubicoins + Portfolio oficial',
      status: 'ativo',
      imagem: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&q=80',
    },
    {
      id: 5,
      titulo: 'Torneio de Oratória',
      categoria: 'oratoria',
      descricao: 'Mostre as suas capacidades de comunicação',
      prazo: '2026-03-30',
      participantes: 64,
      premio: 'Troféu + Certificado',
      status: 'encerrado',
      imagem: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&q=80',
    },
  ];

  const categorias = [
    { id: 'todos', label: 'Todos' },
    { id: 'fotografia', label: 'Fotografia' },
    { id: 'programacao', label: 'Programação' },
    { id: 'escrita', label: 'Escrita' },
    { id: 'design', label: 'Design' },
    { id: 'oratoria', label: 'Oratória' },
  ];

  const cursos = [
    { id: 'licenciaturas', label: '1ºs Ciclos/Licenciaturas', group: true },
    { id: 'bioengenharia-lic', label: 'Bioengenharia', group: 'licenciatura' },
    { id: 'bioquimica-lic', label: 'Bioquímica', group: 'licenciatura' },
    { id: 'biotecnologia-lic', label: 'Biotecnologia', group: 'licenciatura' },
    { id: 'cidades-comunidades-lic', label: 'Cidades e Comunidades Sustentáveis Inteligentes', group: 'licenciatura' },
    { id: 'ciencia-politica-lic', label: 'Ciência Política e Relações Internacionais', group: 'licenciatura' },
    { id: 'ciencias-biomedicas-lic', label: 'Ciências Biomédicas', group: 'licenciatura' },
    { id: 'ciencias-comunicacao-lic', label: 'Ciências da Comunicação', group: 'licenciatura' },
    { id: 'ciencias-cultura-lic', label: 'Ciências da Cultura', group: 'licenciatura' },
    { id: 'ciencias-desporto-lic', label: 'Ciências do Desporto', group: 'licenciatura' },
    { id: 'cinema-lic', label: 'Cinema', group: 'licenciatura' },
    { id: 'computacao-criativa-lic', label: 'Computação Criativa e Realidade Virtual', group: 'licenciatura' },
    { id: 'design-moda-lic', label: 'Design de Moda', group: 'licenciatura' },
    { id: 'design-industrial-lic', label: 'Design Industrial', group: 'licenciatura' },
    { id: 'design-multimedia-lic', label: 'Design Multimédia', group: 'licenciatura' },
    { id: 'economia-lic', label: 'Economia', group: 'licenciatura' },
    { id: 'engenharia-aeronautica-lic', label: 'Engenharia Aeronáutica', group: 'licenciatura' },
    { id: 'engenharia-civil-lic', label: 'Engenharia Civil', group: 'licenciatura' },
    { id: 'engenharia-gestao-industrial-lic', label: 'Engenharia e Gestão Industrial', group: 'licenciatura' },
    { id: 'engenharia-eletromecanica-lic', label: 'Engenharia Eletromecânica', group: 'licenciatura' },
    { id: 'engenharia-eletrotecnica-lic', label: 'Engenharia Eletrotécnica e de Computadores', group: 'licenciatura' },
    { id: 'engenharia-informatica-lic', label: 'Engenharia Informática', group: 'licenciatura' },
    { id: 'engenharia-mecanica-computacional-lic', label: 'Engenharia Mecânica Computacional', group: 'licenciatura' },
    { id: 'estudos-portugueses-espanhois-lic', label: 'Estudos Portugueses e Espanhóis', group: 'licenciatura' },
    { id: 'filosofia-lic', label: 'Filosofia', group: 'licenciatura' },
    { id: 'fisica-aplicacoes-lic', label: 'Física e Aplicações', group: 'licenciatura' },
    { id: 'gestao-lic', label: 'Gestão', group: 'licenciatura' },
    { id: 'informatica-web-lic', label: 'Informática Web, Móvel e na Nuvem', group: 'licenciatura' },
    { id: 'inteligencia-artificial-lic', label: 'Inteligência Artificial e Ciência de Dados', group: 'licenciatura' },
    { id: 'marketing-lic', label: 'Marketing', group: 'licenciatura' },
    { id: 'matematica-aplicacoes-lic', label: 'Matemática e Aplicações', group: 'licenciatura' },
    { id: 'optometria-ciencias-visao-lic', label: 'Optometria e Ciências da Visão', group: 'licenciatura' },
    { id: 'psicologia-lic', label: 'Psicologia', group: 'licenciatura' },
    { id: 'quimica-industrial-lic', label: 'Química Industrial', group: 'licenciatura' },
    { id: 'sociologia-lic', label: 'Sociologia', group: 'licenciatura' },
    { id: 'tecnologia-produto-moda-lic', label: 'Tecnologia e Produto de Moda Sustentável', group: 'licenciatura' },
    { id: 'mestrados', label: '2ºs Ciclos/Mestrados', group: true },
    { id: 'bioengenharia-mest', label: 'Bioengenharia', group: 'mestrado' },
    { id: 'bioquimica-mest', label: 'Bioquímica', group: 'mestrado' },
    { id: 'biotecnologia-mest', label: 'Biotecnologia', group: 'mestrado' },
    { id: 'branding-design-moda-mest', label: 'Branding e Design de Moda (Associação)', group: 'mestrado' },
    { id: 'ciencia-politica-mest', label: 'Ciência Política', group: 'mestrado' },
    { id: 'ciencias-biomedicas-mest', label: 'Ciências Biomédicas', group: 'mestrado' },
    { id: 'ciencias-desporto-mest', label: 'Ciências do Desporto', group: 'mestrado' },
    { id: 'cinema-mest', label: 'Cinema', group: 'mestrado' },
    { id: 'comunicacao-estrategica-mest', label: 'Comunicação Estratégica: Publicidade e Relações Públicas', group: 'mestrado' },
    { id: 'design-moda-mest', label: 'Design de Moda', group: 'mestrado' },
    { id: 'design-desenvolvimento-jogos-mest', label: 'Design e Desenvolvimento de Jogos Digitais', group: 'mestrado' },
    { id: 'design-industrial-mest', label: 'Design Industrial', group: 'mestrado' },
    { id: 'design-multimedia-mest', label: 'Design Multimédia', group: 'mestrado' },
    { id: 'economia-mest', label: 'Economia', group: 'mestrado' },
    { id: 'economia-circular-energia-mest', label: 'Economia Circular e da Energia', group: 'mestrado' },
    { id: 'empreendedorismo-criacao-empresas-mest', label: 'Empreendedorismo e Criação de Empresas', group: 'mestrado' },
    { id: 'empreendedorismo-inovacao-social-mest', label: 'Empreendedorismo e Inovação Social', group: 'mestrado' },
    { id: 'engenharia-aeronautica-mest', label: 'Engenharia Aeronáutica', group: 'mestrado' },
    { id: 'engenharia-civil-mest', label: 'Engenharia Civil', group: 'mestrado' },
    { id: 'engenharia-gestao-industrial-mest', label: 'Engenharia e Gestão Industrial', group: 'mestrado' },
    { id: 'engenharia-eletromecanica-mest', label: 'Engenharia Eletromecânica', group: 'mestrado' },
    { id: 'engenharia-eletrotecnica-mest', label: 'Engenharia Eletrotécnica e de Computadores', group: 'mestrado' },
    { id: 'engenharia-informatica-mest', label: 'Engenharia Informática — Novo Plano de Estudos', group: 'mestrado' },
    { id: 'engenharia-mecanica-computacional-mest', label: 'Engenharia Mecânica Computacional', group: 'mestrado' },
    { id: 'ensino-educacao-fisica-mest', label: 'Ensino de Educação Física nos Ensinos Básico e Secundário **', group: 'mestrado' },
    { id: 'ensino-filosofia-mest', label: 'Ensino de Filosofia no Ensino Secundário **', group: 'mestrado' },
    { id: 'ensino-fisica-quimica-mest', label: 'Ensino de Física e Química no 3º Ciclo do Ensino Básico e no Ensino Secundário **', group: 'mestrado' },
    { id: 'ensino-portugues-espanhol-mest', label: 'Ensino de Português e de Espanhol no 3º Ciclo do Ensino Básico e no Ensino Secundário **', group: 'mestrado' },
    { id: 'estudos-cultura-mest', label: 'Estudos de Cultura', group: 'mestrado' },
    { id: 'estudos-lusofonos-mest', label: 'Estudos Lusófonos', group: 'mestrado' },
    { id: 'financas-contabilidade-mest', label: 'Finanças e Contabilidade', group: 'mestrado' },
    { id: 'fisica-aplicacoes-mest', label: 'Física e Aplicações', group: 'mestrado' },
    { id: 'gestao-mest', label: 'Gestão', group: 'mestrado' },
    { id: 'gestao-unidades-saude-mest', label: 'Gestão de Unidades de Saúde', group: 'mestrado' },
    { id: 'jornalismo-mest', label: 'Jornalismo', group: 'mestrado' },
    { id: 'marketing-mest', label: 'Marketing', group: 'mestrado' },
    { id: 'matematica-aplicacoes-mest', label: 'Matemática e Aplicações', group: 'mestrado' },
    { id: 'optometria-ciencias-visao-mest', label: 'Optometria e Ciências da Visão', group: 'mestrado' },
    { id: 'patrimonio-cultural-digital-mest', label: 'Património Cultural Digital', group: 'mestrado' },
    { id: 'psicologia-clinica-saude-mest', label: 'Psicologia Clínica e da Saúde', group: 'mestrado' },
    { id: 'psicologia-educacao-acompanhamento-mest', label: 'Psicologia da Educação e Aconselhamento', group: 'mestrado' },
    { id: 'quimica-industrial-mest', label: 'Química Industrial', group: 'mestrado' },
    { id: 'relacoes-internacionais-mest', label: 'Relações Internacionais', group: 'mestrado' },
    { id: 'sistemas-informacao-geografica-mest', label: 'Sistemas de Informação Geográfica e Aplicações a Cidades e Territórios', group: 'mestrado' },
    { id: 'sociologia-exclusoes-politicas-sociais-mest', label: 'Sociologia: Exclusões e Políticas Sociais', group: 'mestrado' },
  ];

  const concursosFiltrados = categoriaAtiva === 'todos'
    ? concursos
    : concursos.filter(c => c.categoria === categoriaAtiva);

  const calcularDiasRestantes = (prazo: string) => {
    const hoje = new Date();
    const dataLimite = new Date(prazo);
    const diferenca = dataLimite.getTime() - hoje.getTime();
    const dias = Math.ceil(diferenca / (1000 * 60 * 60 * 24));
    return dias;
  };

  const handleParticipar = (concurso: any) => {
    setConcursoSelecionado(concurso);
    setMostrarModalParticipacao(true);
  };

  const handleCloseModal = () => {
    setMostrarModalParticipacao(false);
    setConcursoSelecionado(null);
    setFormData({ nome: '', telefone: '', curso: '', ficheiro: null });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, ficheiro: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      let ficheiroUrl: string | null = null;
      let ficheiroNome: string | null = null;

      // Upload do ficheiro para o Supabase Storage se existir
      if (formData.ficheiro) {
        // Validar tamanho do ficheiro (máximo 10MB)
        const maxSizeInBytes = 10 * 1024 * 1024;
        if (formData.ficheiro.size > maxSizeInBytes) {
          alert('O ficheiro é muito grande. Máximo permitido: 10MB');
          return;
        }

        // Validar tipo de ficheiro
        const allowedTypes: { [key: string]: string[] } = {
          fotografia: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'],
          escrita: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'],
          design: ['application/pdf', 'image/png', 'image/jpeg', 'image/svg+xml', 'application/photoshop', 'application/x-photoshop'],
        };

        const categoria = concursoSelecionado.categoria;
        const allowedForCategory = allowedTypes[categoria as keyof typeof allowedTypes] || [];
        
        if (allowedForCategory.length > 0 && !allowedForCategory.includes(formData.ficheiro.type)) {
          console.warn(`Tipo de ficheiro: ${formData.ficheiro.type}`);
          // Permitir mesmo que o tipo não seja reconhecido, pois alguns navegadores podem não enviar o MIME type correto
        }

        // Sanitizar nome do ficheiro: remover espaços e caracteres especiais
        const sanitizeName = (name: string) => {
          // Separar nome e extensão
          const parts = name.split('.');
          const ext = parts[parts.length - 1];
          const nameWithoutExt = parts.slice(0, -1).join('.');
          
          // Remover caracteres especiais e espaços, manter apenas alfanuméricos e hífens
          const sanitized = nameWithoutExt
            .replace(/[^\w\s-]/g, '') // Remove caracteres especiais
            .replace(/[\s_]+/g, '-') // Substitui espaços e underscores por hífens
            .replace(/-+/g, '-') // Remove hífens múltiplos
            .toLowerCase();
          
          return `${sanitized}.${ext}`;
        };

        const sanitizedFileName = sanitizeName(formData.ficheiro.name);
        const fileName = `${Date.now()}_${sanitizedFileName}`;
        const filePath = `${concursoSelecionado.id}/${fileName}`;

        console.log('Iniciando upload:', { filePath, fileSize: formData.ficheiro.size, fileType: formData.ficheiro.type });

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('participacoes-concursos')
          .upload(filePath, formData.ficheiro, {
            cacheControl: '3600',
            upsert: false
          });

        if (uploadError) {
          console.error('Erro ao fazer upload do ficheiro:', uploadError);
          console.error('Detalhes do erro:', {
            message: uploadError.message,
            status: (uploadError as any).status,
            statusCode: (uploadError as any).statusCode
          });
          alert(`Erro ao fazer upload do ficheiro. ${uploadError.message || 'Tente novamente.'}`);
          return;
        }

        // Obter URL pública do ficheiro
        const { data: publicUrlData } = supabase.storage
          .from('participacoes-concursos')
          .getPublicUrl(filePath);

        ficheiroUrl = publicUrlData.publicUrl;
        ficheiroNome = formData.ficheiro.name;

        console.log('Upload realizado com sucesso:', ficheiroUrl);
      }

      // Inserir dados na tabela participacoes_concursos
      const { data: insertData, error: insertError } = await supabase
        .from('participacoes_concursos')
        .insert({
          concurso_id: concursoSelecionado.id,
          concurso_titulo: concursoSelecionado.titulo,
          concurso_categoria: concursoSelecionado.categoria,
          nome_participante: formData.nome,
          telefone: formData.telefone,
          curso: formData.curso,
          ficheiro_url: ficheiroUrl,
          ficheiro_nome: ficheiroNome,
        })
        .select();

      if (insertError) {
        console.error('Erro ao guardar participação:', insertError);
        alert(`Erro ao guardar participação: ${insertError.message}`);
        return;
      }

      alert(`Participação no concurso "${concursoSelecionado?.titulo}" registada com sucesso!`);
      handleCloseModal();
    } catch (error) {
      console.error('Erro na submissão:', error);
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      alert(`Ocorreu um erro ao submeter a participação: ${errorMessage}`);
    }
  };

  const getFileIcon = () => {
    switch (concursoSelecionado?.categoria) {
      case 'fotografia':
        return <Camera size={24} className="text-blue-600" />;
      case 'escrita':
        return <FileText size={24} className="text-green-600" />;
      case 'design':
        return <Palette size={24} className="text-purple-600" />;
      default:
        return <Upload size={24} className="text-gray-600" />;
    }
  };

  const getFileLabel = () => {
    switch (concursoSelecionado?.categoria) {
      case 'fotografia':
        return 'Carregar fotografias';
      case 'escrita':
        return 'Carregar ficheiro de texto';
      case 'design':
        return 'Carregar ficheiro de design';
      default:
        return 'Carregar ficheiro';
    }
  };

  const getFileAccept = () => {
    switch (concursoSelecionado?.categoria) {
      case 'fotografia':
        return '.jpg,.jpeg,.png,.gif,.pdf';
      case 'escrita':
        return '.pdf,.doc,.docx,.txt';
      case 'design':
        return '.pdf,.png,.jpg,.jpeg,.svg,.ai,.psd';
      default:
        return '.pdf,.jpg,.jpeg,.png,.doc,.docx,.txt';
    }
  };

  return (
    <div>
      {/* Menu Lateral */}
      <MenuLateral aoMudarPagina={aoMudarPagina} />

      <div className="pt-24 px-8 space-y-8 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm p-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-yellow-500 w-14 h-14 rounded-xl flex items-center justify-center">
            <Trophy size={28} className="text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Concursos e Desafios</h1>
            <p className="text-gray-600">Mostre o seu talento e ganhe prémios</p>
          </div>
        </div>

        {/* Categorias */}
        <div className="flex flex-wrap gap-2 mt-6">
          {categorias.map((categoria) => (
            <button
              key={categoria.id}
              onClick={() => setCategoriaAtiva(categoria.id)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                categoriaAtiva === categoria.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {categoria.label}
            </button>
          ))}
        </div>
      </div>

      {/* Lista de concursos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {concursosFiltrados.map((concurso) => {
          const diasRestantes = calcularDiasRestantes(concurso.prazo);
          const ativo = concurso.status === 'ativo';

          return (
            <div
              key={concurso.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition"
            >
              {/* Imagem */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={concurso.imagem}
                  alt={concurso.titulo}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      ativo
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-500 text-white'
                    }`}
                  >
                    {ativo ? 'Ativo' : 'Encerrado'}
                  </span>
                </div>
              </div>

              {/* Conteúdo */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {concurso.titulo}
                </h3>
                <p className="text-gray-600 mb-4">{concurso.descricao}</p>

                {/* Info */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar size={16} />
                    <span>
                      {ativo
                        ? `${diasRestantes} dias restantes`
                        : 'Concurso encerrado'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users size={16} />
                    <span>{concurso.participantes} participantes</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Award size={16} />
                    <span>{concurso.premio}</span>
                  </div>
                </div>

                {/* Botões */}
                <div className="flex gap-3">
                  {ativo ? (
                    <button 
                      onClick={() => handleParticipar(concurso)}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition flex items-center justify-center gap-2"
                    >
                      <Upload size={18} />
                      Participar
                    </button>
                  ) : (
                    <button className="flex-1 bg-gray-100 text-gray-500 font-semibold py-2 px-4 rounded-lg cursor-not-allowed">
                      Encerrado
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Sidebar com dicas */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Clock size={20} className="text-blue-600" />
          Dicas para Participar
        </h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li>✓ Leia atentamente as regras de cada concurso</li>
          <li>✓ Submeta os seus trabalhos antes do prazo</li>
          <li>✓ Certifique-se de que o conteúdo é original</li>
          <li>✓ Participe quantas vezes quiser em diferentes categorias</li>
          <li>✓ Acompanhe os resultados na plataforma</li>
        </ul>
      </div>

      {/* Modal de Participação */}
      {mostrarModalParticipacao && concursoSelecionado && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Participar no Concurso</h2>
                  <p className="text-gray-600 mt-1">{concursoSelecionado.titulo}</p>
                </div>
                <button
                  onClick={handleCloseModal}
                  className="p-2 hover:bg-gray-100 rounded-lg transition"
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Nome */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Digite o seu nome completo"
                />
              </div>

              {/* Telefone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Número de Telefone *
                </label>
                <input
                  type="tel"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Digite o seu número de telefone"
                />
              </div>

              {/* Curso */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Curso *
                </label>
                <select
                  name="curso"
                  value={formData.curso}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {cursos.map((curso) => (
                    <option 
                      key={curso.id} 
                      value={curso.id}
                      disabled={curso.group === true}
                      className={curso.group === true ? 'font-bold text-blue-600 bg-gray-100' : ''}
                      style={curso.group === true ? { fontWeight: 'bold', color: '#1e40af', backgroundColor: '#f3f4f6' } : {}}
                    >
                      {curso.group === true ? `═══ ${curso.label} ═══` : `  ${curso.label}`}
                    </option>
                  ))}
                </select>
              </div>

              {/* Ficheiro */}
              {(concursoSelecionado.categoria === 'fotografia' || 
                concursoSelecionado.categoria === 'escrita' || 
                concursoSelecionado.categoria === 'design') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {getFileLabel()} *
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      onChange={handleFileChange}
                      accept={getFileAccept()}
                      required
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="flex items-center gap-3 w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 cursor-pointer transition"
                    >
                      {getFileIcon()}
                      <div className="flex-1">
                        {formData.ficheiro ? (
                          <span className="text-sm text-gray-700">{formData.ficheiro.name}</span>
                        ) : (
                          <span className="text-sm text-gray-500">Clique para carregar o ficheiro</span>
                        )}
                      </div>
                    </label>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {concursoSelecionado.categoria === 'fotografia' && 'Formatos aceites: JPG, PNG, GIF'}
                    {concursoSelecionado.categoria === 'escrita' && 'Formatos aceites: PDF, DOC, DOCX, TXT'}
                    {concursoSelecionado.categoria === 'design' && 'Formatos aceites: PDF, PNG, JPG, SVG, AI, PSD'}
                  </p>
                </div>
              )}

              {/* Botões */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Submeter Participação
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
