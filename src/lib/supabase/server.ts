import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

// Supabase server client for storage and realtime features only
// Database operations will use Prisma
export async function createServerClient() {
    // const cookieStore = await cookies();

    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        // No additional options required for Supabase client in this context
    );
}