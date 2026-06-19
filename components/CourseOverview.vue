<template>
  <section class="content-band overview-section" aria-labelledby="overview-title">
    <div class="overview-copy">
      <p class="eyebrow">{{ eyebrow }}</p>
      <h2 id="overview-title">{{ title }}</h2>
      <p>{{ description }}</p>
    </div>

    <div class="overview-list">
      <article v-for="item in items" :key="item.title" class="overview-item">
        <span class="overview-marker" aria-hidden="true"></span>
        <div>
          <h3>{{ item.title }}</h3>
          <p>{{ item.text }}</p>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  eyebrow: string
  title: string
  description: string
  items: Array<{
    title: string
    text: string
  }>
}>()
</script>
