import { createClient } from '@supabase/supabase-js'

// @ts-ignore
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

// @ts-ignore
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Custom storage using sessionStorage para permitir múltiplas contas por aba
const sessionStorage = typeof window !== 'undefined' ? window.sessionStorage : undefined;

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: sessionStorage,
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: 'implicit'
  }
})

