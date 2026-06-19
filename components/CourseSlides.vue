<template>
  <section class="content-band lesson-layout" aria-label="محتوى الدرس">
    <article class="panel slide-panel">
      <div class="section-heading">
        <p class="eyebrow">{{ eyebrow }}</p>
        <h2>{{ title }}</h2>
      </div>

      <div class="viewer-frame">
        <iframe
          :src="slidesUrl"
          title="عارض الشرائح"
          allowfullscreen
        ></iframe>
      </div>

      <div class="slides-actions">
        <a
          :href="editUrl"
          class="text-action"
          target="_blank"
          rel="noopener noreferrer"
        >
          فتح الشرائح في Google Slides
        </a>
      </div>
    </article>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  eyebrow: string
  title: string
  slidesUrl: string
  editUrl: string
}>()
</script>
