<template>
  <main class="page-shell inner-page">
    <PageHeader
      :eyebrow="courseContent.pages.content.eyebrow"
      :title="courseContent.pages.content.title"
      :description="courseContent.pages.content.description"
    />

    <CourseSlides
      :eyebrow="courseContent.slides.eyebrow"
      :title="courseContent.slides.title"
      :description="courseContent.slides.description"
      :slides-url="courseContent.slides.embedUrl"
      :edit-url="courseContent.slides.editUrl"
      :show-intro="false"
    />
  </main>
</template>

<script setup lang="ts">
const courseContent = useCourseContent()
</script>
