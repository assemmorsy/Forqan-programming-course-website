<template>
  <main class="page-shell inner-page">
    <PageHeader
      :eyebrow="courseContent.pages.homework.eyebrow"
      :title="courseContent.pages.homework.title"
      :description="courseContent.pages.homework.description"
    />

    <HomeworkSubmission
      :eyebrow="courseContent.homework.eyebrow"
      :title="courseContent.homework.title"
      :description="courseContent.homework.description"
      :assignments="courseContent.homework.assignments"
      :show-intro="false"
    />
  </main>
</template>

<script setup lang="ts">
const courseContent = useCourseContent()
</script>
