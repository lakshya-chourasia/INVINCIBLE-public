
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Supabase Setup Missing: Connect your project in .env');
} else {
    // SECURITY: Do not log raw endpoints or keys in the console to prevent reconnaissance/information leakage
    console.log('Supabase Client Initialized successfully.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
