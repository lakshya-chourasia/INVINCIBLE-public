
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
    // SECURITY: Avoid logging config values to prevent information leakage
    console.error('Supabase Setup Missing: Connect your project in .env');
} else {
    // SECURITY: Avoid logging config values to prevent information leakage
    console.log('Supabase Client Initialized');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
