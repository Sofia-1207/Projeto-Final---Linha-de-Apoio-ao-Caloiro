// Configuração central como no vídeo
export const config = {
  // @ts-ignore
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL,
  // @ts-ignore
  supabaseKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
  
  // Chat Config
  chatConfig: {
    canais: [
      { id: 'informatica', nome: 'Eng. Informática', online: 45, cor: 'bg-blue-500' },
      { id: 'medicina', nome: 'Medicina', online: 32, cor: 'bg-red-500' },
      { id: 'gestao', nome: 'Gestão', online: 28, cor: 'bg-green-500' },
      { id: 'design', nome: 'Design Multimédia', online: 19, cor: 'bg-purple-500' },
      { id: 'engenharia', nome: 'Eng. Civil', online: 23, cor: 'bg-orange-500' },
    ],
    mensagensPorPagina: 50,
    tempoReal: true
  },
  
  // App Config
  appConfig: {
    nome: 'Linha de Apoio ao Caloiro',
    versao: '1.0.0',
    modo: 'demo'
  }
};

export default config;
