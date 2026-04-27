
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Supabase Setup Missing: Connect your project in .env');
} else {
    // SECURITY: Removed console.log exposing supabaseUrl to prevent configuration information leakage in production logs.
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
