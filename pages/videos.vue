<template>
  <main class="page-shell inner-page">
    <PageHeader
      :eyebrow="courseContent.pages.videos.eyebrow"
      :title="courseContent.pages.videos.title"
      :description="courseContent.pages.videos.description"
    />

    <section class="content-band videos-section" aria-label="فيديوهات مهمة">
      <article v-for="video in courseContent.videos.items" :key="video.title" class="video-resource">
        <div class="video-resource-icon" aria-hidden="true"></div>
        <div>
          <h2>{{ video.title }}</h2>
          <p>{{ video.description }}</p>
          <a :href="video.url" class="text-action" target="_blank" rel="noopener noreferrer">
            {{ video.label }}
          </a>
        </div>
      </article>
    </section>
  </main>
</template>

<script setup lang="ts">
const courseContent = useCourseContent()
</script>
