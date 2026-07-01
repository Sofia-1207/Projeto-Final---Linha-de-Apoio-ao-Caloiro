# Linha de Apoio ao Caloiro

Aplicação web para apoio aos caloiros, desenvolvida em React com TypeScript, integrando autenticação Google OAuth, chat em tempo real, biblioteca de materiais, concursos e informações sobre a cidade da Covilhã.

## Funcionalidades

- **Autenticação Google OAuth** - Login seguro com conta Google
- **Chat em Tempo Real** - Comunicação instantânea entre utilizadores via Supabase Realtime
- **Biblioteca de Materiais** - Upload e download de apontamentos, resumos e outros materiais
- **Concursos** - Participação em concursos com upload de ficheiros
- **Informações sobre a Praxe** - Guia e regras da praxe académica
- **Transportes** - Informações sobre transportes na Covilhã
- **Guia da Covilhã** - Informações úteis sobre a cidade

## Tecnologias Utilizadas

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: TailwindCSS
- **Backend/Database**: Supabase (PostgreSQL, Auth, Storage, Realtime)
- **State Management**: React Hooks
- **Icons**: Lucide React, Material Icons
- **Forms**: React Hook Form
- **Charts**: Recharts
- **Animations**: Motion, Canvas Confetti

## Pré-requisitos

- Node.js (v18 ou superior)
- npm, pnpm ou yarn
- Conta Google (para OAuth)
- Conta Supabase

## Instalação

1. **Clonar o repositório**
```bash
git clone <url-do-repositorio>
cd "Linha de Apoio ao Caloiro"
```

2. **Instalar dependências**
```bash
npm install
```

3. **Configurar variáveis de ambiente**
Criar um ficheiro `.env` na raiz do projeto com o seguinte conteúdo:
```env
VITE_SUPABASE_URL=https://klsrwaropwdmxtbkbxqz.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtsc3J3YXJvcHdkbXh0YmtieHF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQyNTk5MDcsImV4cCI6MjA4OTgzNTkwN30.wXK6ac53PvM4oy1fZ8h7GxJuu3UjFn3TaF3fyUl8emM
```

4. **Configurar a base de dados**
Executar o script SQL em `base de dados/schema.sql` no Supabase SQL Editor para criar as tabelas necessárias.

## Configuração Google OAuth

### Passo 1: Google Cloud Console

1. Vai para: https://console.cloud.google.com/
2. Cria um novo projeto
3. Ativa as APIs:
   - Google+ API
   - Google Identity Toolkit API
4. Cria credenciais OAuth:
   - Vai para "Credentials" → "Create Credentials" → "OAuth client ID"
   - Tipo: "Web application"
   - Adiciona os seguintes URIs:
     - `http://localhost:5174`
     - `https://klsrwaropwdmxtbkbxqz.supabase.co/auth/v1/callback`

### Passo 2: Supabase Dashboard

1. Vai para: Authentication → Providers
2. Ativa o Google provider
3. Configura:
   - **Client ID**: Copia do Google Cloud Console
   - **Client Secret**: Copia do Google Cloud Console
   - **Redirect URL**: `https://klsrwaropwdmxtbkbxqz.supabase.co/auth/v1/callback`

### Passo 3: Testar a Autenticação

1. Inicia a aplicação: `npm run dev`
2. Vai para a página de login
3. Clica em "Sign in with Google"
4. Autoriza com a tua conta Google
5. Serás redirecionado de volta para a aplicação

## Executar a Aplicação

**Modo de desenvolvimento:**
```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5174`

**Build para produção:**
```bash
npm run build
```

## Estrutura do Projeto

```
Linha de Apoio ao Caloiro/
├── src/
│   ├── aplicação/
│   │   ├── componentes/
│   │   │   ├── ChatRealtime.tsx       # Chat em tempo real
│   │   │   ├── Dashboard.tsx          # Dashboard principal
│   │   │   ├── MenuLateral.tsx        # Menu lateral de navegação
│   │   │   ├── PaginaBiblioteca.tsx   # Página da biblioteca
│   │   │   ├── PaginaConcursos.tsx    # Página de concursos
│   │   │   ├── PaginaCovilha.tsx      # Guia da Covilhã
│   │   │   ├── PaginaInicialPremium.tsx # Página inicial
│   │   │   ├── PaginaLogin.tsx        # Página de login
│   │   │   ├── PaginaPraxe.tsx        # Informações sobre a praxe
│   │   │   └── PaginaTransportes.tsx  # Informações de transportes
│   │   └── App.tsx                    # Componente principal
│   ├── biblioteca/                    # Componentes reutilizáveis
│   ├── configurações/                 # Configurações da aplicação
│   ├── estilos/                       # Ficheiros CSS
│   ├── hooks/                         # Custom React hooks
│   ├── serviços/                      # Serviços (Supabase, etc.)
│   ├── main.tsx                       # Entry point
│   └── vite-env.d.ts                  # Tipos Vite
├── base de dados/
│   └── schema.sql                     # Schema da base de dados
├── Imagens/                           # Imagens e assets
├── .env                               # Variáveis de ambiente
├── package.json                       # Dependências do projeto
├── vite.config.ts                     # Configuração Vite
├── tailwind.config.js                 # Configuração TailwindCSS
└── tsconfig.json                      # Configuração TypeScript
```

## Base de Dados

O projeto utiliza Supabase como backend. O schema SQL (`base de dados/schema.sql`) cria as seguintes tabelas:

- **mensagens** - Armazena mensagens do chat
- **materiais** - Armazena materiais da biblioteca
- **participacoes_concursos** - Armazena as participações em concursos

### Storage Buckets

- **materiais** - Armazenamento de ficheiros da biblioteca
- **participacoes-concursos** - Armazenamento de ficheiros de participações

## Funcionalidades do Chat em Tempo Real

O chat utiliza Supabase Realtime com:

- **Broadcast Channels** - Envio de mensagens em tempo real
- **WebSockets** - Comunicação direta sem necessidade de database

### Como Funciona

```typescript
// 1. Login OAuth
await supabase.auth.signInWithOAuth({
  provider: 'google'
});

// 2. Canal com Presence
const roomOne = supabase.channel('room_one', {
  config: {
    presence: { key: session?.user?.id }
  }
});

// 3. Broadcast Messages
roomOne.on('broadcast', { event: 'message' }, (payload) => {
  setMessages(prev => [...prev, payload.payload]);
});

// 4. Send Message
supabase.channel('room_one').send({
  type: 'broadcast',
  event: 'message',
  payload: { message, user_name, avatar, timestamp }
});
```

## Troubleshooting

### Google OAuth não funciona:
- Verifica o Client ID e Client Secret
- Confirma as redirect URLs no Google Cloud Console
- Verifica se as APIs estão ativas
- Confirma se o Google provider está ativado no Supabase

### Mensagens não aparecem no chat:
- Confirma se ambos os utilizadores estão autenticados
- Verifica o console do browser para erros
- Testa com diferentes browsers
- Confirma a conexão com Supabase Realtime

### Upload de ficheiros falha:
- Verifica se o bucket de storage existe no Supabase
- Confirma as políticas RLS do storage
- Verifica as permissões do bucket
- Confirma o tamanho do ficheiro

## Licença

Este projeto foi desenvolvido como projeto final de licenciatura.

## Autores

Desenvolvido por Sofia Reis Ferreira, como projeto final de licenciatura.
