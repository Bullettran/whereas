// plugins/supabase.client.ts
import { defineNuxtPlugin } from "#app";
import { createClient } from "@supabase/supabase-js";
import type { SupabaseClient } from "@supabase/supabase-js";

export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig() as any;

    // Создаём клиент Supabase
    const supabase: SupabaseClient = createClient(
        config.public.supabaseUrl,
        config.public.supabaseKey,
    );

    return {
        provide: {
            supabase,
        },
    };
});