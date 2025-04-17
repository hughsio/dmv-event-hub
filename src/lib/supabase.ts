import { createClient } from '@supabase/supabase-js';

// These values should come from your Supabase project
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create the Supabase client with minimal configuration to avoid auth conflicts with Clerk
// The 400 error is likely caused by Supabase trying to refresh a non-existent auth session
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false, // Don't persist the Supabase session
    autoRefreshToken: false, // Disable auto-refresh which can cause 400 errors
    detectSessionInUrl: false, // Disable session detection in URL
  }
});

// Add a function to log errors when they occur (for debugging)
export const logSupabaseError = (operation: string, error: any) => {
  console.error(`Supabase ${operation} error:`, error);
  if (error?.message) {
    console.error(`Message: ${error.message}`);
  }
  if (error?.details) {
    console.error(`Details: ${error.details}`);
  }
  if (error?.hint) {
    console.error(`Hint: ${error.hint}`);
  }
};

// Type for saved events
export interface SavedEvent {
  id: string;
  user_id: string;
  event_id: string;
  created_at: string;
}

// Type for liked events
export interface LikedEvent {
  id: string;
  user_id: string;
  event_id: string;
  created_at: string;
} 