import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://rggzsehfhfdxwsgaduve.supabase.co', import.meta.env.SUPABASE_KEY);

export { supabase };
