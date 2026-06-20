<template>
  <section class="content-band lesson-layout" aria-label="محتوى الدرس">
    <article class="panel slide-panel">
      <div v-if="showIntro" class="section-heading">
        <p class="eyebrow">{{ eyebrow }}</p>
        <h2>{{ title }}</h2>
        <p class="section-description">{{ description }}</p>
      </div>

      <div ref="viewerFrame" class="viewer-frame">
        <iframe
          :src="slidesUrl"
          title="عارض الشرائح"
          allowfullscreen
        ></iframe>
      </div>

      <div class="slides-actions">
        <button class="slide-action-button" type="button" @click="openFullscreen">
          <span class="slide-action-icon" aria-hidden="true">⛶</span>
          <span>عرض بملء الشاشة</span>
        </button>

        <a
          :href="editUrl"
          class="slide-action-button slide-action-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span class="slide-action-icon" aria-hidden="true">↗</span>
          <span>فتح الشرائح في Google Slides</span>
        </a>
      </div>
    </article>
  </section>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  eyebrow: string
  title: string
  description: string
  slidesUrl: string
  editUrl: string
  showIntro?: boolean
}>(), {
  showIntro: true
})

const viewerFrame = ref<HTMLElement | null>(null)

const openFullscreen = async () => {
  const element = viewerFrame.value

  if (!element?.requestFullscreen) {
    return
  }

  await element.requestFullscreen()
}
</script>
