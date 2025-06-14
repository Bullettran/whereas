// https://nuxt.com/docs/api/configuration/nuxt-config
// @ts-ignore
export default defineNuxtConfig({
    compatibilityDate: "2024-11-01",
    devtools: { enabled: true },
    ssr: false,
    target: "static",
    generate: {
        // @ts-ignore
        fallback: "404.html",
    },
    typescript: {
        typeCheck: true,
    },
    app: {
        head: {
            title: "Whereas",
        },
    },
    modules: [
        //https://nuxt.com/modules/icons
        "nuxt-icons",
        //https://www.npmjs.com/package/@nuxt/image
        "@nuxt/image",
        //https://pinia.vuejs.org/ssr/nuxt.html
        "@pinia/nuxt",
        //https://nuxt.com/modules/pinia-plugin-persistedstate
        "pinia-plugin-persistedstate/nuxt",
        //https://nuxt.com/modules/auth-utils
        "nuxt-auth-utils",
        //https://primevue.org/nuxt
        "@primevue/nuxt-module",
    ],
    css: [
        "./assets/scss/base/colors.css",
        "./assets/scss/base/_general.scss",
        "./assets/scss/modules/_modules.scss",
        "./public/fonts/fonts.css",
    ],

    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: "@use \"./assets/scss/helpers/_helpers.scss\" as *;",
                },
            },
        },
    },
    runtimeConfig: {
        public: {
            baseURL: "https://bullettran.github.io/whereas-games/",
            supabaseUrl: "https://qalibeksqgsabiiccnwf.supabase.co",
            supabaseKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFhbGliZWtzcWdzYWJpaWNjbndmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1OTk1MDEsImV4cCI6MjA1OTE3NTUwMX0.U48U65ir4RoFwtICsqTbDIiyYfFNWlrqvc6F8F1aJ58",
        },
    },
});