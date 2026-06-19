export default defineNuxtConfig({
  compatibilityDate: '2024-09-18',
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      htmlAttrs: {
        lang: 'ar',
        dir: 'rtl'
      },
      title: 'دورة البرمجة للأطفال - سكراتش',
      meta: [
        {
          name: 'description',
          content: 'صفحة عربية لدورة برمجة للأطفال باستخدام سكراتش مع عروض، فيديوهات، وتسليم الواجب.'
        }
      ]
    }
  }
})
