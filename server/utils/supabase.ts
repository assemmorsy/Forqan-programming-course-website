import { createClient } from '@supabase/supabase-js'

export const useServerSupabaseClient = () => {
  const config = useRuntimeConfig()
  const supabaseUrl = config.public.supabaseUrl
  const supabaseKey = config.supabaseKey

  if (!supabaseUrl || !supabaseKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Supabase environment variables are missing.'
    })
  }

  return createClient(supabaseUrl, supabaseKey)
}