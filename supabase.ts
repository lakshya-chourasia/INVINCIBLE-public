
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Supabase Setup Missing: Connect your project in .env');
} else {
    console.log('Supabase Client Initialized:', supabaseUrl);
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
