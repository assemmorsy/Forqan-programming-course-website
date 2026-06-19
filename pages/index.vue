<template>
  <main class="page-shell">
    <CourseHero
      :eyebrow="courseContent.hero.eyebrow"
      :title="courseContent.hero.title"
      :description="courseContent.hero.description"
      :scratch-url="courseContent.links.scratch"
    />

    <CourseOverview
      :eyebrow="courseContent.overview.eyebrow"
      :title="courseContent.overview.title"
      :description="courseContent.overview.description"
      :items="courseContent.overview.items"
    />
  </main>
</template>

<script setup lang="ts">
const courseContent = useCourseContent()
</script>
