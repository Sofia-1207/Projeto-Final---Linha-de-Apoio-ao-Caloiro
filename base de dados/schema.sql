-- Criar tabela de mensagens para o chat
CREATE TABLE IF NOT EXISTS mensagens (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  usuario TEXT NOT NULL,
  avatar TEXT NOT NULL,
  mensagem TEXT NOT NULL,
  hora TEXT NOT NULL,
  cor TEXT NOT NULL,
  canal_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Adicionar índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_mensagens_canal_id ON mensagens(canal_id);
CREATE INDEX IF NOT EXISTS idx_mensagens_created_at ON mensagens(created_at);

-- Habilitar Realtime para a tabela
ALTER PUBLICATION supabase_realtime ADD TABLE mensagens;

-- Criar tabela de materiais para a biblioteca
CREATE TABLE IF NOT EXISTS materiais (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  titulo TEXT NOT NULL,
  tipo TEXT NOT NULL,
  disciplina TEXT NOT NULL,
  autor TEXT NOT NULL,
  ano TEXT NOT NULL,
  downloads INTEGER DEFAULT 0,
  avaliacao DECIMAL(3,2) DEFAULT 0,
  tamanho TEXT NOT NULL,
  data TEXT NOT NULL,
  arquivo_url TEXT NOT NULL,
  arquivo_nome TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Adicionar índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_materiais_tipo ON materiais(tipo);
CREATE INDEX IF NOT EXISTS idx_materiais_disciplina ON materiais(disciplina);
CREATE INDEX IF NOT EXISTS idx_materiais_created_at ON materiais(created_at);

-- Habilitar Realtime para a tabela materiais (idempotente)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_publication pp
    JOIN pg_publication_rel ppr ON ppr.prpubid = pp.oid
    JOIN pg_class c ON c.oid = ppr.prrelid
    JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE pp.pubname = 'supabase_realtime'
      AND n.nspname = 'public'
      AND c.relname = 'materiais'
  ) THEN
    EXECUTE 'ALTER PUBLICATION supabase_realtime ADD TABLE public.materiais;';
  END IF;
END $$;

-- Limpar completamente políticas RLS existentes antes de criar novas
DROP POLICY IF EXISTS "Materiais públicos para leitura" ON materiais;
DROP POLICY IF EXISTS "Utilizadores podem inserir materiais" ON materiais;
DROP POLICY IF EXISTS "Autores podem atualizar materiais" ON materiais;
DROP POLICY IF EXISTS "Autores podem apagar materiais" ON materiais;
DROP POLICY IF EXISTS "Utilizadores podem atualizar materiais" ON materiais;
DROP POLICY IF EXISTS "Utilizadores podem apagar materiais" ON materiais;

-- Desativar e reativar RLS para garantir limpeza completa
ALTER TABLE materiais DISABLE ROW LEVEL SECURITY;
ALTER TABLE materiais ENABLE ROW LEVEL SECURITY;

-- Políticas de Row Level Security (RLS) para a tabela materiais
-- Criar novas políticas após limpeza completa
DROP POLICY IF EXISTS "Materiais públicos para leitura" ON materiais;
DROP POLICY IF EXISTS "Utilizadores podem inserir materiais" ON materiais;
DROP POLICY IF EXISTS "Autores podem atualizar materiais" ON materiais;
DROP POLICY IF EXISTS "Autores podem apagar materiais" ON materiais;

-- Criar novas políticas RLS para a tabela materiais
-- Permitir leitura pública dos materiais
CREATE POLICY "Materiais públicos para leitura" ON materiais
FOR SELECT USING (true);

-- Permitir inserção para utilizadores autenticados
CREATE POLICY "Utilizadores podem inserir materiais" ON materiais
FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Permitir atualização por utilizadores autenticados
CREATE POLICY "Utilizadores podem atualizar materiais" ON materiais
FOR UPDATE USING (auth.role() = 'authenticated');

-- Permitir exclusão apenas pelo autor do material
CREATE POLICY "Autores podem apagar materiais" ON materiais
FOR DELETE USING (autor = auth.uid()::text);

-- === HARD RESET COMPLETO ===
-- 1. Remover TODAS as políticas de uma vez
DROP POLICY IF EXISTS "Materiais públicos para leitura" ON materiais;
DROP POLICY IF EXISTS "Utilizadores podem inserir materiais" ON materiais;
DROP POLICY IF EXISTS "Autores podem atualizar materiais" ON materiais;
DROP POLICY IF EXISTS "Autores podem apagar materiais" ON materiais;
DROP POLICY IF EXISTS "Utilizadores podem atualizar materiais" ON materiais;
DROP POLICY IF EXISTS "Utilizadores podem apagar materiais" ON materiais;
DROP POLICY IF EXISTS "Permitir tudo" ON materiais;

-- 2. DESATIVAR RLS completamente (isto deve permitir upload imediato)
ALTER TABLE materiais DISABLE ROW LEVEL SECURITY;

-- 3. Garantir permissões para todos os roles
GRANT ALL ON TABLE materiais TO postgres, anon, authenticated, service_role;

-- 4. Criar políticas RLS corretas
DROP POLICY IF EXISTS "Acesso Total Temporario" ON materiais;

-- Permitir leitura pública
CREATE POLICY "Materiais públicos para leitura" ON materiais
FOR SELECT TO authenticated, anon
USING (true);

-- Permitir inserção para autenticados
CREATE POLICY "Utilizadores podem inserir materiais" ON materiais
FOR INSERT TO authenticated
WITH CHECK (auth.role() = 'authenticated');

-- Permitir atualização apenas pelo autor
CREATE POLICY "Autores podem atualizar materiais" ON materiais
FOR UPDATE TO authenticated
USING (autor = auth.uid()::text);

-- Permitir exclusão apenas pelo autor
CREATE POLICY "Autores podem apagar materiais" ON materiais
FOR DELETE TO authenticated
USING (autor = auth.uid()::text);

-- 5. Reativar RLS com políticas corretas
ALTER TABLE materiais ENABLE ROW LEVEL SECURITY;

-- === CONFIGURAÇÃO DO STORAGE ===
-- Criar bucket 'materiais' se não existir
INSERT INTO storage.buckets (id, name, public) 
VALUES ('materiais', 'materiais', true)
ON CONFLICT (id) DO NOTHING;

-- Criar políticas RLS para o Storage
-- Remover políticas existentes primeiro
DROP POLICY IF EXISTS "Permitir Uploads" ON storage.objects;
DROP POLICY IF EXISTS "Permitir Ver Ficheiros" ON storage.objects;

-- Permitir uploads para utilizadores autenticados e anónimos
CREATE POLICY "Permitir Uploads" ON storage.objects
FOR INSERT TO authenticated, anon
WITH CHECK (bucket_id = 'materiais');

-- Permitir leitura de ficheiros para todos
CREATE POLICY "Permitir Ver Ficheiros" ON storage.objects
FOR SELECT TO authenticated, anon
USING (bucket_id = 'materiais');

-- === DEBUG DA AUTENTICAÇÃO ===
-- Verificar status atual do RLS
SELECT 
  'RLS Status' as info,
  schemaname,
  tablename,
  rowsecurity as rls_enabled
FROM pg_tables 
WHERE tablename = 'materiais';

-- Verificar políticas atuais
SELECT 
  'Current Policies' as info,
  schemaname,
  tablename,
  policyname,
  permissive,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'materiais';

-- Testar inserção COM contexto de autenticação
DO $$
DECLARE
  test_result TEXT;
BEGIN
  -- Tentar inserir com contexto de autenticação
  INSERT INTO materiais (titulo, tipo, disciplina, autor, ano, tamanho, data, arquivo_url, arquivo_nome) 
  VALUES ('Teste Debug', 'resumos', 'Teste Debug', COALESCE(auth.uid()::text, 'no-auth'), '2025/2026', '1MB', '2025-01-01', 'http://test.com', 'test.pdf');
  
  test_result := 'SUCCESS: Insert worked';
  
  -- Limpar teste
  DELETE FROM materiais WHERE titulo = 'Teste Debug';
  
  RAISE NOTICE '%', test_result;
EXCEPTION WHEN OTHERS THEN
  RAISE NOTICE 'ERROR: %', SQLERRM;
END $$;

-- Verificar contexto de autenticação atual
SELECT 
  'Auth Context' as info,
  current_user as db_user,
  session_user as session_user,
  COALESCE(auth.uid()::text, 'NULL') as auth_uid,
  COALESCE(auth.role(), 'NULL') as auth_role,
  CASE 
    WHEN auth.uid() IS NULL THEN 'NOT AUTHENTICATED'
    ELSE 'AUTHENTICATED'
  END as auth_status;

-- === FUNÇÃO RPC PARA CRIAR BUCKET ===
-- Criar função para criar bucket via RPC (se tiver permissões de admin)
CREATE OR REPLACE FUNCTION create_bucket_if_not_exists(bucket_name TEXT, public BOOLEAN DEFAULT true)
RETURNS TABLE(success BOOLEAN, message TEXT)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  bucket_exists BOOLEAN;
BEGIN
  -- Verificar se bucket já existe
  SELECT EXISTS(
    SELECT 1 FROM storage.buckets WHERE id = bucket_name
  ) INTO bucket_exists;
  
  IF bucket_exists THEN
    RETURN QUERY SELECT true, 'Bucket already exists'::TEXT;
    RETURN;
  END IF;
  
  -- Tentar criar bucket
  BEGIN
    INSERT INTO storage.buckets (id, name, public)
    VALUES (bucket_name, bucket_name, public);
    
    RETURN QUERY SELECT true, 'Bucket created successfully'::TEXT;
    
  EXCEPTION WHEN OTHERS THEN
    RETURN QUERY SELECT false, 'Error creating bucket: ' || SQLERRM::TEXT;
  END;
END;
$$;

-- Garantir que a função pode ser executada por utilizadores autenticados
GRANT EXECUTE ON FUNCTION create_bucket_if_not_exists TO authenticated;

-- === TABELA DE PARTICIPAÇÕES EM CONCURSOS ===
-- Criar tabela de participações em concursos
CREATE TABLE IF NOT EXISTS participacoes_concursos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  concurso_id INTEGER NOT NULL,
  concurso_titulo TEXT NOT NULL,
  concurso_categoria TEXT NOT NULL,
  nome_participante TEXT NOT NULL,
  telefone TEXT NOT NULL,
  curso TEXT NOT NULL,
  ficheiro_url TEXT,
  ficheiro_nome TEXT,
  data_participacao TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Adicionar índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_participacoes_concursos_id ON participacoes_concursos(concurso_id);
CREATE INDEX IF NOT EXISTS idx_participacoes_concursos_nome ON participacoes_concursos(nome_participante);
CREATE INDEX IF NOT EXISTS idx_participacoes_concursos_created_at ON participacoes_concursos(created_at);

-- Desativar RLS para permitir inserções
ALTER TABLE participacoes_concursos DISABLE ROW LEVEL SECURITY;

-- Garantir permissões para todos os roles
GRANT ALL ON TABLE participacoes_concursos TO postgres, anon, authenticated, service_role;

-- Criar bucket 'participacoes-concursos' se não existir
INSERT INTO storage.buckets (id, name, public) 
VALUES ('participacoes-concursos', 'participacoes-concursos', true)
ON CONFLICT (id) DO NOTHING;

-- Criar políticas RLS para o Storage de participacoes
DROP POLICY IF EXISTS "Permitir Uploads Participacoes" ON storage.objects;
DROP POLICY IF EXISTS "Permitir Ver Ficheiros Participacoes" ON storage.objects;

-- Permitir uploads para utilizadores autenticados e anónimos
CREATE POLICY "Permitir Uploads Participacoes" ON storage.objects
FOR INSERT TO authenticated, anon
WITH CHECK (bucket_id = 'participacoes-concursos');

-- Permitir leitura de ficheiros para todos
CREATE POLICY "Permitir Ver Ficheiros Participacoes" ON storage.objects
FOR SELECT TO authenticated, anon
USING (bucket_id = 'participacoes-concursos');

-- Remover políticas existentes perigosas
DROP POLICY IF EXISTS "Permitir Ver Ficheiros Participacoes" ON storage.objects;
DROP POLICY IF EXISTS "Permitir Uploads Participacoes" ON storage.objects;

-- Criar política SEGURA apenas para UPLOAD
CREATE POLICY "Upload Participacoes Seguro" ON storage.objects
FOR INSERT TO authenticated, anon
WITH CHECK (bucket_id = 'participacoes-concursos');

-- Criar política SEGURA apenas para READ (sem listar tudo)
CREATE POLICY "Read Participacoes Seguro" ON storage.objects
FOR SELECT TO authenticated, anon
USING (bucket_id = 'participacoes-concursos' AND auth.role() = 'authenticated');
