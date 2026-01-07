import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Especially important if using Fluid compute: Don't put this client in a
 * global variable. Always create a new client within each function when using
 * it.
 */
export async function createClient() {
  let cookieStore;
  try {
    cookieStore = await cookies();
  } catch (error) {
    // Handle prerendering case - cookies() rejects during prerendering
    // This can happen when cacheComponents is enabled during build analysis
    // API routes are dynamic by default, so this error only occurs during build
    // At runtime, cookies() will work correctly
    // Check if this is the prerendering error
    const errorMessage = error instanceof Error ? error.message : String(error);
    if (errorMessage.includes('prerender') || errorMessage.includes('HANGING_PROMISE_REJECTION')) {
      // During build analysis, create a client that will work at runtime
      // but won't cause build failures. The error is expected during build.
      // Re-throw to let Next.js handle it appropriately during build analysis
      throw error;
    }
    throw error;
  }

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have proxy refreshing
            // user sessions.
          }
        },
      },
    },
  );
}
