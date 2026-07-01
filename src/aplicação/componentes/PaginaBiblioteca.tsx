import { useState, useEffect } from 'react';
import { BookOpen, Upload, Download, Search, Filter, Star, Eye, FileText, X } from 'lucide-react';
import { MenuLateral } from './MenuLateral';
import { supabase } from '../../biblioteca/supabase';

interface PaginaBibliotecaProps {
  aoMudarPagina?: (pagina: string) => void;
}

export function PaginaBiblioteca({ aoMudarPagina }: PaginaBibliotecaProps = {}) {

  const [categoriaAtiva, setCategoriaAtiva] = useState('todos');
  const [cursoFiltro, setCursoFiltro] = useState('todos');
  const [termoPesquisa, setTermoPesquisa] = useState('');
  const [mostrarPDF, setMostrarPDF] = useState(false);
  const [pdfSelecionado, setPdfSelecionado] = useState<any>(null);
  const [mostrarUpload, setMostrarUpload] = useState(false);
  const [arquivosUpload, setArquivosUpload] = useState<any[]>([]);
  const [materiais, setMateriais] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    titulo: '',
    ano: '',
    tipo: '',
    disciplina: '',
    curso: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  const categorias = [
    { id: 'todos', label: 'Todos' },
    { id: 'resumos', label: 'Resumos' },
    { id: 'projetos', label: 'Projetos' },
    { id: 'frequencias', label: 'Frequências' },
    { id: 'exercicios', label: 'Exercícios' },
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


  // Testar upload de um arquivo simples para verificar o bucket
  const testarUploadBucket = async () => {
    try {
      console.log('Testando upload no bucket materiais...');
      
      // Criar um arquivo de teste
      const testFile = new Blob(['Teste de upload'], { type: 'text/plain' });
      const testFileName = `test-${Date.now()}.txt`;
      
      // Tentar fazer upload
      const { data, error } = await supabase.storage
        .from('materiais')
        .upload(testFileName, testFile);
      
      if (error) {
        console.error('Erro no upload de teste:', error);
        return false;
      }
      
      console.log('Upload de teste bem-sucedido:', data);
      
      // Tentar obter URL pública
      const { data: { publicUrl } } = supabase.storage
        .from('materiais')
        .getPublicUrl(testFileName);
      
      console.log('URL pública de teste:', publicUrl);
      
      // Limpar arquivo de teste
      await supabase.storage
        .from('materiais')
        .remove([testFileName]);
      
      return true;
      
    } catch (error) {
      console.error('Erro no teste de upload:', error);
      return false;
    }
  };

  // Verificar e criar bucket se necessário
  const verificarBucket = async () => {
    try {
      console.log('Verificando bucket materiais...');
      
      // Tentar listar ficheiros no bucket para verificar se existe
      const { data, error } = await supabase.storage.from('materiais').list();
      
      if (error) {
        console.error('Erro ao verificar bucket:', error);
        
        // Se o bucket não existe, tentar criá-lo
        if (error.message?.includes('not found') || error.message?.includes('does not exist')) {
          console.log('Bucket não encontrado, tentando criar...');
          
          // Criar bucket via SQL (precisa de permissões de admin)
          const { error: createError } = await supabase.rpc('create_bucket_if_not_exists', {
            bucket_name: 'materiais',
            public: true
          });
          
          if (createError) {
            console.error('Erro ao criar bucket:', createError);
            console.log('AVISO: Bucket "materiais" precisa ser criado manualmente no Supabase Dashboard');
            return false;
          } else {
            console.log('Bucket criado com sucesso!');
            return true;
          }
        }
        return false;
      }
      
      console.log('Bucket materiais encontrado e acessível');
      
      // Fazer upload de teste para verificar permissões
      const uploadOk = await testarUploadBucket();
      if (!uploadOk) {
        console.log('AVISO: Bucket encontrado mas sem permissões de upload');
        return false;
      }
      
      return true;
      
    } catch (error) {
      console.error('Erro na verificação do bucket:', error);
      return false;
    }
  };

  // Carregar materiais do Supabase ao montar o componente
  useEffect(() => {
    const testarConexao = async () => {
      // Testar conexão com Supabase
      console.log('Testando conexão com Supabase...');
      console.log('URL Supabase:', (import.meta as any).env?.VITE_SUPABASE_URL);
      console.log('Supabase client:', supabase);

      // Obter ID do utilizador autenticado
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (!authError && user) {
        setUserId(user.id);
        console.log('Utilizador autenticado:', user.id);
      }

      // Verificar bucket primeiro
      const bucketOk = await verificarBucket();
      if (!bucketOk) {
        console.log('AVISO: Problemas com o bucket de storage. Uploads podem falhar.');
      }

      // Testar conexão simples
      try {
        const result = await supabase.from('materiais').select('count');
        console.log('Teste de conexão:', result);
      } catch (error: any) {
        console.error('Erro no teste de conexão:', error);
      }

      carregarMateriais();
    };

    testarConexao();
  }, []);

  const carregarMateriais = async () => {
    console.log('Carregando materiais do Supabase...');
    try {
      const { data, error } = await supabase
        .from('materiais')
        .select('*')
        .order('created_at', { ascending: false });
      
      console.log('Dados recebidos do Supabase:', data);
      console.log('Erro do Supabase:', error);
      
      if (error) {
        console.error('Erro ao carregar materiais:', error);
        const errorMessage = error instanceof Error ? error.message : (typeof error === 'object' && error !== null ? JSON.stringify(error) : String(error));
        // Só usar fallback se houver erro de conexão, não se a tabela estiver vazia
        if (error.message?.includes('relation') || error.message?.includes('connection')) {
          alert(`Erro ao carregar materiais: ${errorMessage}`);
          setMateriais([]);
        } else {
          alert(`Erro ao carregar materiais: ${errorMessage}`);
          setMateriais([]);
        }
      } else {
        console.log('Materiais carregados com sucesso:', data);
        console.log('Detalhes dos materiais:');
        data?.forEach((material, index) => {
          console.log(`Material ${index + 1}:`, {
            id: material.id,
            titulo: material.titulo,
            arquivo_url: material.arquivo_url,
            arquivo_nome: material.arquivo_nome
          });
        });
        setMateriais(data || []);
      }
    } catch (error) {
      console.error('Erro ao carregar materiais:', error);
      const errorMessage = error instanceof Error ? error.message : (typeof error === 'object' && error !== null ? JSON.stringify(error) : String(error));
      alert(`Erro ao carregar materiais: ${errorMessage}`);
      // Fallback para lista vazia
      setMateriais([]);
    }
  };

  const salvarMateriais = async () => {
    console.log('Iniciando salvamento de materiais...');
    console.log('Form data:', formData);
    console.log('Arquivos para upload:', arquivosUpload);
    
    // Verificar se utilizador está autenticado
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      console.error('Erro de autenticação:', authError);
      alert('Precisa estar autenticado para carregar materiais. Por favor, faça login.');
      return;
    }
    
    console.log('Utilizador autenticado:', user.id);
    
    if (arquivosUpload.length === 0 || !formData.titulo || !formData.curso || !formData.tipo || !formData.ano) {
      alert('Por favor, preencha todos os campos e selecione pelo menos um ficheiro.');
      return;
    }

    setIsLoading(true);
    
    try {
      const successResults = [];
      
      for (const arquivo of arquivosUpload) {
        console.log('Processando arquivo:', arquivo.nome);
        
        let uploadError = null;
        let insertError = null;
        
        // Upload do ficheiro para o Supabase Storage
        const fileExt = arquivo.arquivo.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        
        console.log('Fazendo upload para Supabase Storage:', fileName);
        const { error: upError } = await supabase.storage
          .from('materiais')
          .upload(fileName, arquivo.arquivo);
        
        uploadError = upError;
        
        if (uploadError) {
          console.error('Erro ao fazer upload:', uploadError);
          
          // Tratamento específico para bucket não encontrado
          if (uploadError.message?.includes('Bucket not found') || uploadError.message?.includes('not found')) {
            alert(`ERRO: Bucket 'materiais' não encontrado no Supabase Storage!\n\n` +
                  `Por favor:\n` +
                  `1. Vá ao Supabase Dashboard\n` +
                  `2. Clique em "Storage"\n` +
                  `3. Crie um bucket chamado "materiais"\n` +
                  `4. Marque como "Public"\n` +
                  `5. Execute o schema.sql para configurar permissões`);
          } else {
            alert(`Erro ao fazer upload do arquivo ${arquivo.nome}: ${uploadError instanceof Error ? uploadError.message : String(uploadError)}`);
          }
          continue;
        }

        console.log('Upload bem-sucedido');

        // Obter URL pública do ficheiro
        const { data: urlData } = supabase.storage
          .from('materiais')
          .getPublicUrl(fileName);
        const publicUrl = urlData.publicUrl;

        console.log('URL pública:', publicUrl);

        // Obter ID do utilizador autenticado
        const { data: { user } } = await supabase.auth.getUser();
        const userId = user?.id || 'anonymous-user';

        // Inserir dados na tabela materiais
        const materialData = {
          titulo: formData.titulo || 'Sem Título',
          tipo: formData.tipo || 'outros',
          disciplina: formData.curso || 'Geral',
          autor: userId,
          ano: formData.ano || '2024/2025',
          downloads: 0,
          avaliacao: 0,
          tamanho: arquivo.tamanho || '0 MB',
          data: new Date().toISOString().split('T')[0],
          arquivo_url: publicUrl || '',
          arquivo_nome: arquivo.nome || 'arquivo.pdf'
        };

        console.log('Inserindo material na tabela:', materialData);
        const { error: inError } = await supabase
          .from('materiais')
          .insert(materialData);

        insertError = inError;

        if (insertError) {
          console.error('Erro ao inserir material:', insertError);
          alert(`Erro ao salvar material ${arquivo.nome}: ${insertError instanceof Error ? insertError.message : String(insertError)}`);
        } else {
          console.log('Material inserido com sucesso!');
        }
        
        successResults.push({
          arquivo: arquivo.nome,
          uploadSuccess: !uploadError && !insertError
        });
      }

      const successCount = successResults.filter(r => r.uploadSuccess).length;

      if (successCount > 0) {
        alert(`${successCount} materiais carregados com sucesso!`);
        setArquivosUpload([]);
        setFormData({ titulo: '', ano: '', tipo: '', disciplina: '', curso: '' });
        fecharUpload();
        await carregarMateriais(); // Recarregar lista de materiais
      } else {
        alert('Nenhum material foi guardado. Verifique o erro no console.');
      }
      
    } catch (error) {
      console.error('Erro ao salvar materiais:', error);
      alert(`Ocorreu um erro ao carregar os materiais: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsLoading(false);
    }
  };

  const materiaisFiltrados = materiais.filter((material) => {
    const correspondeCategoria = categoriaAtiva === 'todos' || material.tipo === categoriaAtiva;
    const correspondeCurso = cursoFiltro === 'todos' || material.curso === cursoFiltro;
    const correspondePesquisa = termoPesquisa === '' ||
      material.titulo.toLowerCase().includes(termoPesquisa.toLowerCase()) ||
      material.disciplina.toLowerCase().includes(termoPesquisa.toLowerCase());

    return correspondeCategoria && correspondeCurso && correspondePesquisa;
  });

  const getTipoLabel = (tipo: string) => {
    const labels: { [key: string]: string } = {
      resumos: 'Resumo',
      projetos: 'Projeto',
      frequencias: 'Frequência',
      exercicios: 'Exercícios',
    };
    return labels[tipo] || tipo;
  };

  const getTipoCor = (tipo: string) => {
    const cores: { [key: string]: string } = {
      resumos: 'bg-yellow-100 text-yellow-800',
      projetos: 'bg-purple-100 text-purple-700',
      frequencias: 'bg-red-100 text-red-700',
      exercicios: 'bg-green-100 text-green-700',
    };
    return cores[tipo] || 'bg-gray-100 text-gray-800';
  };


  const getTipoCorGradiente = (tipo: string) => {
    const cores: { [key: string]: string } = {
      resumos: 'bg-yellow-100',
      projetos: 'bg-purple-100',
      frequencias: 'bg-red-100',
      exercicios: 'bg-green-100',
    };
    return cores[tipo] || 'bg-gray-100';
  };

  const handleDownload = (material: any) => {
    // Download do ficheiro usando a URL real
    const link = document.createElement('a');
    link.href = material.arquivo_url;
    link.download = material.arquivo_nome || `${material.titulo}.pdf`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleVerMaterial = (material: any) => {
    // Mostrar PDF diretamente em vez de página fantasma
    console.log('Material selecionado para visualização:', material);
    console.log('URL do arquivo:', material.arquivo_url);
    handleVisualizarPDF(material);
  };

  
  const handleVisualizarPDF = (material: any) => {
    setPdfSelecionado(material);
    setMostrarPDF(true);
      };

  const fecharPDF = () => {
    setMostrarPDF(false);
    setPdfSelecionado(null);
  };

  const handleAbrirUpload = () => {
    setMostrarUpload(true);
  };

  const fecharUpload = () => {
    setMostrarUpload(false);
  };

  const handleApagarMaterial = async (material: any) => {
    if (!confirm(`Tem a certeza que deseja apagar "${material.titulo}"?`)) {
      return;
    }

    try {
      // Apagar da tabela materiais
      const { error } = await supabase
        .from('materiais')
        .delete()
        .eq('id', material.id);

      if (error) {
        console.error('Erro ao apagar material:', error);
        alert('Erro ao apagar material');
        return;
      }

      // Recarregar lista de materiais
      await carregarMateriais();
      alert('Material apagado com sucesso');
    } catch (error) {
      console.error('Erro ao apagar material:', error);
      alert('Erro ao apagar material');
    }
  };

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const newArquivos = Array.from(files).map(file => ({
        id: Date.now() + Math.random(),
        nome: file.name,
        arquivo: file,
        tamanho: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        dataUpload: new Date().toISOString().split('T')[0]
      }));
      setArquivosUpload([...arquivosUpload, ...newArquivos]);
    }
  };

  return (
    <div>
      {/* Menu Lateral */}
      <MenuLateral aoMudarPagina={aoMudarPagina} />

      <div className="pt-24 px-8 space-y-8 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-red-500 w-14 h-14 rounded-xl flex items-center justify-center">
            <BookOpen size={28} className="text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Biblioteca de Materiais</h1>
            <p className="text-gray-800">Resumos, projetos, frequências e exercícios partilhados</p>
          </div>
        </div>

        {/* Botão de upload */}
        <button 
          onClick={handleAbrirUpload}
          className="border border-gray-300 hover:bg-blue-600 text-gray-800 font-semibold py-3 px-6 rounded-lg transition flex items-center gap-2"
          onMouseEnter={() => document.body.style.cursor = 'pointer'}
          onMouseLeave={() => document.body.style.cursor = 'default'}
        >
          <Upload size={20} />
          Carregar Material Novo
        </button>
      </div>

      {/* Filtros e Pesquisa */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        {/* Barra de pesquisa */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={termoPesquisa}
              onChange={(e) => setTermoPesquisa(e.target.value)}
              placeholder="Pesquisar por título ou disciplina..."
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
        </div>

        {/* Filtros */}
        <div className="space-y-4">
          {/* Categorias */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2 flex items-center gap-2">
              <Filter size={16} />
              Tipo de Material
            </label>
            <div className="flex flex-wrap gap-2">
              {categorias.map((categoria) => (
                <button
                  key={categoria.id}
                  onClick={() => setCategoriaAtiva(categoria.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    categoriaAtiva === categoria.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  {categoria.label}
                </button>
              ))}
            </div>
          </div>

          {/* Cursos */}
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">Curso</label>
            <select
              value={cursoFiltro}
              onChange={(e) => setCursoFiltro(e.target.value)}
              className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
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
        </div>
      </div>

      {/* Resultados */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <p className="text-gray-800">
            {materiaisFiltrados.length} {materiaisFiltrados.length === 1 ? 'material encontrado' : 'materiais encontrados'}
          </p>
        </div>

        <div className="space-y-4">
          {materiaisFiltrados.map((material) => (
            <div
              key={material.id}
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-4">
                {/* Ícone */}
                <div className="bg-gray-100 w-16 h-16 rounded-lg flex items-center justify-center flex-shrink-0">
                  <BookOpen size={28} className="text-gray-600" />
                </div>

                {/* Conteúdo */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-start gap-2 mb-2">
                    <h3 className="font-bold text-gray-900 text-lg">{material.titulo}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getTipoCor(material.tipo)}`}>
                      {getTipoLabel(material.tipo)}
                    </span>
                  </div>

                  <p className="text-gray-800 mb-3">{material.disciplina}</p>

                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Star size={16} className="text-yellow-500 fill-yellow-500" />
                    <span className="font-medium">{material.avaliacao}</span>
                    <span className="text-gray-500">• {material.downloads} downloads</span>
                  </div>
                </div>

                      {/* Ações */}
                      <div className="flex flex-col sm:flex-row md:flex-col gap-2 w-full sm:w-auto">
                        <button
                          onClick={() => handleDownload(material)}
                          className="flex-1 md:flex-initial border border-gray-300 hover:bg-blue-600 text-gray-800 font-semibold py-2 px-4 rounded-lg transition flex items-center justify-center gap-2"
                        >
                          <Download size={18} />
                          Download
                        </button>
                        <button
                          onClick={() => handleVerMaterial(material)}
                          className="flex-1 md:flex-initial border border-gray-300 hover:bg-gray-50 text-gray-800 font-semibold py-2 px-4 rounded-lg transition flex items-center justify-center gap-2"
                        >
                          <Eye size={18} />
                          Ver
                        </button>
                        {userId === material.autor && (
                          <button
                            onClick={() => handleApagarMaterial(material)}
                            className="flex-1 md:flex-initial border border-red-300 hover:bg-red-600 text-red-600 hover:text-white font-semibold py-2 px-4 rounded-lg transition flex items-center justify-center gap-2"
                          >
                            <X size={18} />
                            Apagar
                          </button>
                        )}
                      </div>
              </div>
            </div>
          ))}

          {materiaisFiltrados.length === 0 && (
            <div className="bg-gray-50 rounded-xl p-12 text-center">
              <BookOpen size={48} className="text-gray-400 mx-auto mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Nenhum material encontrado</h3>
              <p className="text-gray-800">
                Tenta ajustar os filtros ou pesquisar por outros termos
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Informações */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
          <h3 className="font-bold text-gray-900 mb-4">📚 Como Contribuir</h3>
          <ul className="space-y-2 text-sm text-gray-800">
            <li>✓ Carrega apenas materiais originais ou autorizados</li>
            <li>✓ Verifica se o conteúdo está completo e legível</li>
            <li>✓ Preenche todas as informações corretamente</li>
            <li>✓ Respeita os direitos de autor</li>
          </ul>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 border border-green-100">
          <h3 className="font-bold text-gray-900 mb-4">⭐ Sistema de Avaliação</h3>
          <ul className="space-y-2 text-sm text-gray-800">
            <li>✓ Avalia os materiais que descarregaste</li>
            <li>✓ Deixa comentários construtivos</li>
            <li>✓ Materiais bem avaliados aparecem primeiro</li>
            <li>✓ Ajuda a comunidade a encontrar o melhor conteúdo</li>
          </ul>
        </div>
      </div>
      </div>

      
      {/* Visualizador de PDF */}
      {mostrarPDF && pdfSelecionado && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col">
            {/* Header */}
            <div className={`${getTipoCorGradiente(pdfSelecionado.tipo)} p-4 rounded-t-2xl flex items-center justify-between`}>
              <div className="flex items-center gap-3">
                <FileText size={24} className="text-gray-800" />
                <div>
                  <h2 className="text-lg font-bold text-gray-900">{pdfSelecionado.titulo}</h2>
                  <p className="text-gray-700 text-sm">{pdfSelecionado.disciplina}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDownload(pdfSelecionado)}
                  className="bg-white bg-opacity-50 hover:bg-opacity-70 text-gray-800 px-4 py-2 rounded-lg transition flex items-center gap-2"
                >
                  <Download size={18} />
                  Download
                </button>
                <button
                  onClick={fecharPDF}
                  className="relative text-white bg-transparent border-none p-2 cursor-pointer group focus:outline-none focus:ring-0"
                >
                  <div className="absolute inset-0 bg-white rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                  <X size={20} className="relative z-10 transition-colors duration-200 group-hover:text-blue-600" />
                </button>
              </div>
            </div>
            
            {/* PDF Content */}
            <div className="flex-1 overflow-hidden">
              {(() => {
                console.log('Renderizando PDF Content - pdfSelecionado:', pdfSelecionado);
                console.log('URL disponível:', pdfSelecionado?.arquivo_url);
                
                if (!pdfSelecionado?.arquivo_url) {
                  return (
                    <div className="flex items-center justify-center h-full text-gray-500">
                      <div className="text-center">
                        <FileText size={48} className="mx-auto mb-4 text-gray-400" />
                        <p className="text-lg font-medium">Ficheiro não disponível</p>
                        <p className="text-sm mt-2">URL do ficheiro não encontrada</p>
                        <p className="text-xs mt-2 text-gray-400">pdfSelecionado: {JSON.stringify(pdfSelecionado)}</p>
                      </div>
                    </div>
                  );
                }
                
                return (
                  <iframe
                    src={pdfSelecionado.arquivo_url}
                    className="w-full h-full border-0"
                    title={pdfSelecionado.titulo}
                    onLoad={() => console.log('Iframe carregado com sucesso:', pdfSelecionado.arquivo_url)}
                    onError={(e) => {
                      console.error('Error loading PDF:', e);
                      console.error('URL que falhou:', pdfSelecionado.arquivo_url);
                      e.currentTarget.style.display = 'none';
                      const errorMsg = document.createElement('div');
                      errorMsg.className = 'flex items-center justify-center h-full text-gray-500';
                      errorMsg.innerHTML = `
                        <div class="text-center">
                          <FileText size={48} class="mx-auto mb-4 text-gray-400" />
                          <p class="text-lg font-medium">Não foi possível carregar o ficheiro</p>
                          <p class="text-sm mt-2">Tente fazer download para visualizar</p>
                          <p class="text-xs text-gray-400">URL: ${pdfSelecionado.arquivo_url}</p>
                        </div>
                      `;
                      e.currentTarget.parentElement?.appendChild(errorMsg);
                    }}
                  />
                );
              })()}
            </div>
          </div>
        </div>
      )}

      {/* Página de Upload */}
      {mostrarUpload && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                    <Upload size={24} className="text-white" />
                    <div>
                      <h2 className="text-xl font-bold text-white">Carregar Material</h2>
                      <p className="text-white text-opacity-90">Adicione novos materiais à biblioteca</p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={fecharUpload}
                  className="relative text-white bg-transparent border-none p-2 cursor-pointer group focus:outline-none focus:ring-0"
                >
                  <div className="absolute inset-0 bg-white rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                  <X size={20} className="relative z-10 transition-colors duration-200 group-hover:text-blue-600" />
                </button>
              </div>
            </div>

            {/* Formulário de Upload */}
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">Nome do Documento</label>
                <input
                  type="text"
                  value={formData.titulo}
                  onChange={(e) => setFormData({...formData, titulo: e.target.value})}
                  placeholder="Ex: Resumo Completo - Bases de Dados"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">Ano</label>
                <select 
                  value={formData.ano}
                  onChange={(e) => setFormData({...formData, ano: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value="">Selecione o ano</option>
                  <option value="2025/2026">2025/2026</option>
                  <option value="2024/2025">2024/2025</option>
                  <option value="2023/2024">2023/2024</option>
                  <option value="2022/2023">2022/2023</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2 flex items-center gap-2">
                  <Filter size={16} />
                  Tipo de Material
                </label>
                <select 
                  value={formData.tipo}
                  onChange={(e) => setFormData({...formData, tipo: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value="">Selecione o tipo</option>
                  <option value="resumos">Resumo</option>
                  <option value="projetos">Projeto</option>
                  <option value="frequencias">Frequência</option>
                  <option value="exercicios">Exercícios</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">Curso</label>
                <select
                  value={formData.curso}
                  onChange={(e) => setFormData({...formData, curso: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value="">Selecione o curso</option>
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

              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">Ficheiro</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition cursor-pointer">
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.txt"
                    onChange={handleUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload size={48} className="text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 font-medium mb-2">Clique para selecionar ou arraste ficheiros</p>
                    <p className="text-gray-500 text-sm">PDF, DOC, DOCX, TXT (máx. 10MB)</p>
                  </label>
                </div>
              </div>

              {/* Lista de Ficheiros Carregados */}
              {arquivosUpload.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Ficheiros Carregados</h3>
                  <div className="space-y-2">
                    {arquivosUpload.map((arquivo) => (
                      <div key={arquivo.id} className="bg-gray-50 p-3 rounded-lg flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <FileText size={20} className="text-blue-600" />
                          <div>
                            <p className="font-medium text-gray-900">{arquivo.nome}</p>
                            <p className="text-sm text-gray-500">{arquivo.tamanho} • {arquivo.dataUpload}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            setArquivosUpload(arquivosUpload.filter(a => a.id !== arquivo.id));
                          }}
                          className="text-red-500 hover:text-red-700 transition"
                        >
                          <X size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Botões de Ação */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={fecharUpload}
                  className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-800 font-semibold py-3 px-6 rounded-lg transition"
                >
                  Cancelar
                </button>
                <button
                  onClick={salvarMateriais}
                  disabled={isLoading}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition"
                >
                  {isLoading ? 'A guardar...' : 'Guardar Materiais'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
