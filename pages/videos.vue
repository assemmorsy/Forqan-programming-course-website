<template>
  <main class="page-shell inner-page">
    <PageHeader
      :eyebrow="courseContent.pages.videos.eyebrow"
      :title="courseContent.pages.videos.title"
      :description="courseContent.pages.videos.description"
    />

    <section class="content-band video-library-section" aria-label="مكتبة فيديوهات الدورة">
      <div class="video-library-heading">
        <p class="eyebrow">مكتبة الفيديوهات</p>
        <h2>خطوات يحتاجها الطالب قبل تنفيذ الواجب</h2>
        <p>
          شروحات قصيرة تساعد الطالب على فتح Scratch، حفظ المشروع، والرجوع إلى عمل سابق لاستكمال التدريب أو تسليم الواجب.
        </p>
      </div>

      <div class="video-library-grid">
        <article v-for="(video, index) in featuredVideos" :key="video.fileName" class="video-lesson-card">
          <div class="video-card-header">
            <span class="video-step-badge">{{ index + 1 }}</span>
            <div>
              <p class="video-card-kicker">{{ video.eyebrow }}</p>
              <h2>{{ video.title }}</h2>
            </div>
          </div>

          <div class="video-player-frame">
            <video controls preload="metadata">
              <source :src="getVideoUrl(video.fileName)" type="video/mp4">
              المتصفح لا يدعم تشغيل الفيديو.
            </video>
          </div>

          <p class="video-card-description">{{ video.description }}</p>
        </article>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
const courseContent = useCourseContent()

const featuredVideos = [
  {
    eyebrow: 'البداية',
    title: 'فتح المتصفح والدخول إلى موقع Scratch',
    description: 'يتعلم الطالب كيف يفتح المتصفح، يدخل إلى موقع Scratch، ثم يبدأ مشروعًا جديدًا داخل محرر سكراتش.',
    fileName: 'OpenScratch.mp4'
  },
  {
    eyebrow: 'حفظ العمل',
    title: 'حفظ مشروع Scratch كملف على الجهاز',
    description: 'خطوات حفظ المشروع بعد انتهاء التدريب للحصول على ملف .sb3 المطلوب رفعه في صفحة الواجب.',
    fileName: 'SaveWork.mp4'
  },
  {
    eyebrow: 'استكمال مشروع',
    title: 'فتح مشروع Scratch محفوظ سابقًا',
    description: 'طريقة الرجوع إلى مشروع محفوظ على الجهاز وفتحه مرة أخرى داخل Scratch لاستكمال التعديل أو حل الواجب.',
    fileName: 'LoadPreviousWork.MP4'
  },
  {
    eyebrow: 'إعداد اللغة',
    title: 'تغيير لغة Scratch إلى العربية',
    description: 'شرح سريع لطريقة تغيير لغة واجهة Scratch إلى العربية حتى يستطيع الطالب متابعة الأوامر والقوائم بسهولة أثناء التدريب.',
    fileName: 'ConvertLanguage.mp4'
  }
]
</script>