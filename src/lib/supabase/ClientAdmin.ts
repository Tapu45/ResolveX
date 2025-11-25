import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceRoleKey) {
    throw new Error("Missing Supabase service role key");
}

// Supabase admin client for server-side operations
// Uses service role key - RLS policies BYPASSED
// ⚠️ NEVER expose this to frontend/browser
// Only use in API routes and server actions
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);