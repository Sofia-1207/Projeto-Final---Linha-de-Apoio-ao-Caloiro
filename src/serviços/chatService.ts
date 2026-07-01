import { createClient } from '@supabase/supabase-js';
import { config } from '../configurações';

// Cliente Supabase centralizado como no vídeo
export const supabaseClient = createClient(config.supabaseUrl, config.supabaseKey);

// Serviço de Chat como no vídeo
export class ChatService {
  private client = supabaseClient;
  
  // Obter mensagens de um canal
  async getMensagens(canalId: string) {
    try {
      const { data, error } = await this.client
        .from('mensagens')
        .select('*')
        .eq('canal_id', canalId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Erro ao carregar mensagens:', error);
      return this.getMockMensagens(canalId);
    }
  }

  // Enviar mensagem
  async enviarMensagem(mensagem: any) {
    try {
      const { data, error } = await this.client
        .from('mensagens')
        .insert([mensagem]);

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      // Retornar mensagem com ID local para fallback
      return [{ ...mensagem, id: Date.now().toString() }];
    }
  }

  // Subscribe em tempo real
  subscribeToCanal(canalId: string, callback: (payload: any) => void) {
    const channel = this.client
      .channel(`mensagens_${canalId}`)
      .on('postgres_changes', 
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'mensagens',
          filter: `canal_id=eq.${canalId}`
        },
        callback
      )
      .subscribe();

    return channel;
  }

  // Unsubscribe
  unsubscribe(channel: any) {
    if (channel) {
      this.client.removeChannel(channel);
    }
  }

  // Mock messages para fallback
  private getMockMensagens(canalId: string) {
    return [
      {
        id: '1',
        usuario: 'João Silva',
        avatar: 'JS',
        mensagem: 'Alguém tem os slides da última aula de BD?',
        hora: '14:23',
        cor: 'bg-blue-600',
        canal_id: canalId,
        created_at: new Date().toISOString()
      },
      {
        id: '2',
        usuario: 'Maria Santos',
        avatar: 'MS',
        mensagem: 'Eu tenho! Envio-te por email',
        hora: '14:25',
        cor: 'bg-pink-600',
        canal_id: canalId,
        created_at: new Date().toISOString()
      }
    ];
  }
}

// Exportar instância única (singleton)
export const chatService = new ChatService();
