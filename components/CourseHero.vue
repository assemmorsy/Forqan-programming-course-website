<template>
  <section class="hero-section" aria-labelledby="hero-title">
    <div class="hero-copy">
      <p class="eyebrow">{{ eyebrow }}</p>
      <h1 id="hero-title">{{ title }}</h1>
      <p>{{ description }}</p>
      <div class="hero-actions">
        <a :href="scratchUrl" class="primary-action secondary-action" target="_blank" rel="noopener noreferrer">
          فتح موقع سكراتش
        </a>
        <NuxtLink to="/homework" class="primary-action">تسليم الواجب</NuxtLink>
      </div>
    </div>

    <div class="hero-art" aria-hidden="true">
      <div class="mosque-mark">
        <div class="minaret minaret-right"></div>
        <div class="mosque-dome"></div>
        <div class="minaret minaret-left"></div>
      </div>
      <div class="crescent-mark"></div>
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
      <div class="floating-block block-four">إذا ضغطت</div>
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
