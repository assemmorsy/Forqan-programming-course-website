import { createClient } from '@supabase/supabase-js'

export const useSupabaseClient = () => {
  const config = useRuntimeConfig()
  const supabaseUrl = config.public.supabaseUrl as string | undefined
  const supabaseKey = config.public.supabaseKey as string | undefined

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase environment variables are missing.')
  }

  return createClient(supabaseUrl, supabaseKey)
}
