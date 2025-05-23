import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Log the values being used for initialization
console.log('[supabaseClient.ts] Initializing Supabase with URL:', supabaseUrl);
console.log('[supabaseClient.ts] Initializing Supabase with Anon Key:', supabaseAnonKey ? 'Key Present (not logging full key)' : 'Key MISSING');

if (!supabaseUrl) {
  console.error('[supabaseClient.ts] CRITICAL: Supabase URL is missing!');
  throw new Error('Missing environment variable: NEXT_PUBLIC_SUPABASE_URL');
}
if (!supabaseAnonKey) {
  console.error('[supabaseClient.ts] CRITICAL: Supabase Anon Key is missing!');
  throw new Error('Missing environment variable: NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

console.log('[supabaseClient.ts] Supabase client object created:', supabase ? 'Client Exists' : 'Client NULL');
if (supabase && typeof supabase.from !== 'function') {
  console.warn('[supabaseClient.ts] Supabase client may not be initialized correctly - .from() method missing.');
} 