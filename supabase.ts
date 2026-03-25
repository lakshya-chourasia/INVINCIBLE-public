
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Security: Removed console logging to prevent Supabase URL exposure in production logs
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
