export default defineNuxtConfig({
  compatibilityDate: "2024-09-18",
  css: ["~/assets/css/main.css"],
  experimental: {
    appManifest: false,
  },
  runtimeConfig: {
    supabaseKey: process.env.SUPABASE_KEY,
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
    },
  },
  app: {
    head: {
      htmlAttrs: {
        lang: "ar",
        dir: "rtl",
      },
      title: "مسجد الفرقان - التدريب الصيفي",
      meta: [
        {
          name: "description",
          content:
            "دورة تعليم البرمجة للأشبال بالتدريب الصيفي بمسجد الفرقان بطنطا",
        },
      ],
      link: [
        {
          rel: "icon",
          type: "image/svg+xml",
          href: "/favicon.svg",
        },
      ],
    },
  },
});
