<template>
  <main class="page-shell">
    <CourseHero
      :eyebrow="courseContent.hero.eyebrow"
      :title="courseContent.hero.title"
      :description="courseContent.hero.description"
      :scratch-url="courseContent.links.scratch"
    />

    <CourseSlides
      :eyebrow="courseContent.slides.eyebrow"
      :title="courseContent.slides.title"
      :slides-url="courseContent.slides.embedUrl"
      :edit-url="courseContent.slides.editUrl"
    />

    <HomeworkSubmission
      :eyebrow="courseContent.homework.eyebrow"
      :title="courseContent.homework.title"
      :description="courseContent.homework.description"
    />
  </main>
</template>

<script setup lang="ts">
const courseContent = {
  hero: {
    eyebrow: 'دورة عملية للأطفال',
    title: 'تعلم البرمجة بسكراتش',
    description: 'مساحة واحدة للدرس: عرض الشرائح وخطوة تسليم ملف مشروع سكراتش بصيغة .sb3.'
  },
  slides: {
    eyebrow: 'العرض',
    title: 'مشاهدة الشرائح',
    editUrl: 'https://docs.google.com/presentation/d/1dZ8YmiG6iqFMEb36FJjNVcNzTRqQIZtKhvfwgyFX7co/edit?usp=sharing',
    embedUrl: 'https://docs.google.com/presentation/d/1dZ8YmiG6iqFMEb36FJjNVcNzTRqQIZtKhvfwgyFX7co/embed?start=false&loop=false&delayms=3000'
  },
  homework: {
    eyebrow: 'الواجب',
    title: 'تسليم مشروع سكراتش',
    description: 'بعد انتهاء الطالب من المشروع، يضغط من سكراتش على File ثم Save to your computer، وبعدها يرفع ملف المشروع هنا.'
  },
  links: {
    scratch: 'https://scratch.mit.edu/projects/editor/'
  }
}
</script>
