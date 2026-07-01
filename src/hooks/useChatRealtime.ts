import { useEffect, useState, useRef, type FormEvent } from 'react';
import { supabase } from '../biblioteca/supabase';
import { User } from '@supabase/supabase-js';

interface Mensagem {
  mensagem: string;
  nome_utilizador: string;
  avatar: string;
  data_hora: string;
}

interface UtilizadorOnline {
  id: string;
  email: string;
  avatar?: string;
}

export function useChatRealtime(cursoId: string = 'geral') {
  const [sessao, setSessao] = useState<User | null>(null);
  const [mensagens, setMensagens] = useState<Mensagem[]>([]);
  const [novaMensagem, setNovaMensagem] = useState('');
  const [utilizadoresOnline, setUtilizadoresOnline] = useState<UtilizadorOnline[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const cursoRef = useRef(cursoId);

  // Carregar mensagens salvas ao iniciar
  useEffect(() => {
    // Limpar mensagens do curso anterior
    setMensagens([]);

    const mensagensSalvas = localStorage.getItem(`chat_mensagens_${cursoId}`);
    if (mensagensSalvas) {
      try {
        setMensagens(JSON.parse(mensagensSalvas));
      } catch (error) {
        console.error('Erro ao carregar mensagens salvas:', error);
      }
    }
  }, [cursoId]);

  // Salvar mensagens no localStorage quando mudarem
  // Mantemos uma ref do curso atual para evitar que, ao mudar `cursoId`, o
  // efeito de escrita grave mensagens do curso anterior no novo curso.
  useEffect(() => {
    cursoRef.current = cursoId;
  }, [cursoId]);

  useEffect(() => {
    if (mensagens.length > 0) {
      localStorage.setItem(`chat_mensagens_${cursoRef.current}`, JSON.stringify(mensagens));
    }
  }, [mensagens]);

  // Inicializar sessão
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSessao(session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSessao(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Configurar canal de chat em tempo real por curso
  useEffect(() => {
    if (!sessao) {
      setUtilizadoresOnline([]);
      return;
    }

    // Canal específico por curso
    const nomeCanal = `curso_${cursoId}`;
    
    const salaCurso = supabase.channel(nomeCanal, {
      config: {
        presence: {
          key: sessao.id,
        },
      },
    });

    // Escutar mensagens broadcast
    salaCurso.on('broadcast', { event: 'mensagem' }, (payload) => {
      setMensagens((mensagensAnteriores) => [...mensagensAnteriores, payload.payload as Mensagem]);
    });

    // Subscribe e track presence
    salaCurso.subscribe(async (status) => {
      if (status === 'SUBSCRIBED') {
        await salaCurso.track({
          id: sessao.id,
          email: sessao.email,
          avatar: sessao.user_metadata?.avatar_url || null,
          curso: cursoId, // Adicionar informação do curso
        });
      }
    });

    // Handle presence sync
    salaCurso.on('presence', { event: 'sync' }, () => {
      const estado = salaCurso.presenceState();
      const utilizadoresAtivos = Object.values(estado).flat() as unknown as UtilizadorOnline[];
      // Filtrar apenas utilizadores deste curso
      const utilizadoresDoCurso = utilizadoresAtivos.filter(user => 
        (user as any).curso === cursoId
      );
      setUtilizadoresOnline(utilizadoresDoCurso);
    });

    return () => {
      salaCurso.unsubscribe();
    };
  }, [sessao, cursoId]);

  // Login com Google
  const iniciarSessao = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin
      }
    });
  };

  // Enviar mensagem
  const enviarMensagem = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!novaMensagem.trim() || !sessao) return;

    // Criar objeto da mensagem
    const mensagemObj = {
      mensagem: novaMensagem.trim(),
      nome_utilizador: sessao.email || 'Desconhecido',
      avatar: sessao.user_metadata?.avatar_url || 'https://via.placeholder.com/40',
      data_hora: new Date().toISOString(),
      curso: cursoId,
    };

    // Adicionar localmente imediatamente
    setMensagens((mensagensAnteriores) => [...mensagensAnteriores, mensagemObj]);

    // Enviar via broadcast
    const nomeCanal = `curso_${cursoId}`;
    supabase.channel(nomeCanal).send({
      type: 'broadcast',
      event: 'mensagem',
      payload: mensagemObj,
    });
    
    setNovaMensagem('');
  };

  // Formatar timestamp
  const formatarHora = (dataString: string) => {
    return new Date(dataString).toLocaleTimeString('pt-PT', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: false,
    });
  };

  // Auto-scroll
  useEffect(() => {
    setTimeout(() => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }
    }, 100);
  }, [mensagens]);

  return {
    sessao,
    mensagens,
    novaMensagem,
    setNovaMensagem,
    utilizadoresOnline,
    chatContainerRef,
    iniciarSessao,
    enviarMensagem,
    formatarHora,
    cursoId,
  };
}
