<template>
  <header class="site-navbar">
    <NuxtLink to="/" class="brand-link" aria-label="الصفحة الرئيسية">
      <span class="brand-logo" aria-hidden="true">
        <span class="logo-minaret"></span>
        <span class="logo-dome"></span>
        <span class="logo-code"></span>
      </span>
      <span>
        <strong>أشبال الفرقان</strong>
        <small>برمجة بسكراتش</small>
      </span>
    </NuxtLink>

    <nav class="nav-links" aria-label="التنقل الرئيسي">
      <NuxtLink v-for="link in links" :key="link.to" :to="link.to">
        {{ link.label }}
      </NuxtLink>
    </nav>
  </header>
</template>

<script setup lang="ts">
const links = [
  { to: '/', label: 'الرئيسية' },
  { to: '/content', label: 'المحتوى التعليمي' },
  { to: '/videos', label: 'الفيديوهات' },
  { to: '/homework', label: 'الواجب' }
]
</script>
