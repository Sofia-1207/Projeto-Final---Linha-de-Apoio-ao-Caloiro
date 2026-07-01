import { supabase } from './supabase';

/**
 * Faz upload de um ficheiro para o Supabase Storage
 * @param file - Ficheiro a fazer upload
 * @param bucket - Nome do bucket (ex: 'materiais')
 * @param path - Caminho onde guardar o ficheiro (ex: 'cancioneiros/ei_2026.pdf')
 * @returns URL pública do ficheiro ou erro
 */
export async function uploadFile(
  file: File,
  bucket: string,
  path: string
): Promise<{ data: { publicUrl: string } | null; error: Error | null }> {
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) throw error;

    // Obter URL pública
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(path);

    return { data: { publicUrl }, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
}

/**
 * Faz download de um ficheiro do Supabase Storage
 * @param bucket - Nome do bucket (ex: 'materiais')
 * @param path - Caminho do ficheiro (ex: 'cancioneiros/ei_2026.pdf')
 * @returns URL pública do ficheiro ou erro
 */
export async function downloadFile(
  bucket: string,
  path: string
): Promise<{ data: { publicUrl: string } | null; error: Error | null }> {
  try {
    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(path);

    return { data: { publicUrl: data.publicUrl }, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
}

/**
 * Lista todos os ficheiros num bucket
 * @param bucket - Nome do bucket (ex: 'materiais')
 * @param path - Caminho da pasta (opcional)
 * @returns Lista de ficheiros ou erro
 */
export async function listFiles(
  bucket: string,
  path?: string
): Promise<{ data: any[] | null; error: Error | null }> {
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .list(path);

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
}

/**
 * Apaga um ficheiro do Supabase Storage
 * @param bucket - Nome do bucket (ex: 'materiais')
 * @param path - Caminho do ficheiro (ex: 'cancioneiros/ei_2026.pdf')
 * @returns Sucesso ou erro
 */
export async function deleteFile(
  bucket: string,
  path: string
): Promise<{ error: Error | null }> {
  try {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([path]);

    if (error) throw error;

    return { error: null };
  } catch (error) {
    return { error: error as Error };
  }
}
