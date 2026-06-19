<template>
  <section class="hero-section" aria-labelledby="hero-title">
    <div class="hero-art" aria-hidden="true">
      <div class="desk">
        <div class="screen">
          <div class="cat-face">
            <span></span>
            <span></span>
          </div>
          <div class="code-blocks">
            <i></i>
            <i></i>
            <i></i>
          </div>
        </div>
        <div class="keyboard"></div>
      </div>
      <div class="floating-block block-one">كرر</div>
      <div class="floating-block block-two">تحرك</div>
      <div class="floating-block block-three">ابدأ</div>
    </div>

    <div class="hero-copy">
      <p class="eyebrow">{{ eyebrow }}</p>
      <h1 id="hero-title">{{ title }}</h1>
      <p>{{ description }}</p>
      <div class="hero-actions">
        <a
          :href="scratchUrl"
          class="primary-action secondary-action"
          target="_blank"
          rel="noopener noreferrer"
        >
          فتح موقع سكراتش
        </a>
        <a href="#homework" class="primary-action">تسليم الواجب</a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  eyebrow: string
  title: string
  description: string
  scratchUrl: string
}>()
</script>
