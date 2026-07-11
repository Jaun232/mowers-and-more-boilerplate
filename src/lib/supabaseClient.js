import { createClient } from '@supabase/supabase-js'

const supabaseUrl = (
  import.meta.env.VITE_SUPABASE_URL ||
  import.meta.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.SUPABASE_URL ||
  ''
)

const supabaseAnonKey = (
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  ''
)

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase: missing URL or ANON key. Check your environment variables.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default supabase
