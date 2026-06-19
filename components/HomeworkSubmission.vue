<template>
  <section id="homework" class="content-band homework-section" aria-labelledby="homework-title">
    <div class="homework-copy">
      <p class="eyebrow">{{ eyebrow }}</p>
      <h2 id="homework-title">{{ title }}</h2>
      <p>{{ description }}</p>
    </div>

    <form class="homework-form" @submit.prevent="submitHomework">
      <label>
        اسم الطالب
        <input v-model="form.studentName" name="studentName" type="text" required placeholder="مثال: أحمد محمد">
      </label>

      <label>
        ملاحظات قصيرة
        <textarea v-model="form.notes" name="notes" rows="4" placeholder="ما الذي تعلمته في هذا المشروع؟"></textarea>
      </label>

      <label class="file-drop homework-upload">
        <input
          ref="homeworkInput"
          type="file"
          name="project"
          accept=".sb3"
          required
          @change="handleHomeworkChange"
        >
        <span>{{ homeworkFileName || 'رفع ملف مشروع سكراتش' }}</span>
        <small>الملف المطلوب بصيغة .sb3</small>
      </label>

      <button class="primary-action form-button" type="submit" :disabled="isSubmitting">
        {{ isSubmitting ? 'جار الإرسال...' : 'إرسال الواجب' }}
      </button>

      <p v-if="submitMessage" class="submit-message" :class="{ error: submitError }">
        {{ submitMessage }}
      </p>
    </form>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  eyebrow: string
  title: string
  description: string
}>()

const homeworkInput = ref<HTMLInputElement | null>(null)
const homeworkFile = ref<File | null>(null)
const homeworkFileName = ref('')
const isSubmitting = ref(false)
const submitMessage = ref('')
const submitError = ref(false)

const form = reactive({
  studentName: '',
  notes: ''
})

const handleHomeworkChange = (event: Event) => {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0] ?? null

  homeworkFile.value = file
  homeworkFileName.value = file?.name ?? ''
}

const submitHomework = async () => {
  submitMessage.value = ''
  submitError.value = false

  if (!homeworkFile.value) {
    submitError.value = true
    submitMessage.value = 'اختر ملف مشروع سكراتش أولا.'
    return
  }

  if (!homeworkFile.value.name.toLowerCase().endsWith('.sb3')) {
    submitError.value = true
    submitMessage.value = 'يجب أن يكون الملف بصيغة .sb3.'
    return
  }

  const payload = new FormData()
  payload.append('studentName', form.studentName)
  payload.append('notes', form.notes)
  payload.append('project', homeworkFile.value)

  isSubmitting.value = true

  try {
    await $fetch('/api/homework', {
      method: 'POST',
      body: payload
    })

    submitMessage.value = 'تم إرسال الواجب بنجاح.'
    form.studentName = ''
    form.notes = ''
    homeworkFile.value = null
    homeworkFileName.value = ''

    if (homeworkInput.value) {
      homeworkInput.value.value = ''
    }
  } catch {
    submitError.value = true
    submitMessage.value = 'تعذر إرسال الواجب. حاول مرة أخرى.'
  } finally {
    isSubmitting.value = false
  }
}
</script>
