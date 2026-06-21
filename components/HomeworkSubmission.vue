<template>
  <section id="homework" class="content-band homework-section" :class="{ 'homework-section-compact': !showIntro }"
    aria-labelledby="homework-title">
    <div v-if="showIntro" class="homework-copy">
      <p class="eyebrow">{{ eyebrow }}</p>
      <h2 id="homework-title">{{ title }}</h2>
      <p>{{ description }}</p>
    </div>

    <form class="homework-form" @submit.prevent="submitHomework">
      <p class="homework-name-alert">
        تنبيه: اكتب اسم الطالب كاملًا كما هو مسجل في الدورة.
      </p>

      <label>
        اسم الطالب
        <input v-model="form.studentName" name="studentName" type="text" required placeholder="مثال: أحمد محمد">
      </label>

      <label>
        الواجب
        <select v-model="form.homeworkId" name="homeworkId" required>
          <option value="" disabled>اختر الواجب المطلوب تسليمه</option>
          <option v-for="assignment in availableAssignments" :key="assignment.id" :value="assignment.id">
            {{ assignment.title }}
          </option>
        </select>
      </label>

      <div v-if="selectedAssignment" class="homework-help">
        <p>وصف الواجب : {{ selectedAssignment.description }}</p>
        <p>خطوات الواجب :</p>
        <ol v-if="selectedAssignment.steps?.length">
          <li v-for="step in selectedAssignment.steps" :key="step">{{ step }}</li>
        </ol>
      </div>


      <label class="file-drop homework-upload">
        <input ref="homeworkInput" type="file" name="project" accept=".sb3" required @change="handleHomeworkChange">
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
type Assignment = {
  id: string
  title: string
  description: string
  steps?: string[]
}

const props = withDefaults(defineProps<{
  eyebrow: string
  title: string
  description: string
  assignments?: Assignment[]
  showIntro?: boolean
}>(), {
  assignments: () => [],
  showIntro: true
})

const homeworkInput = ref<HTMLInputElement | null>(null)
const homeworkFile = ref<File | null>(null)
const homeworkFileName = ref('')
const isSubmitting = ref(false)
const submitMessage = ref('')
const submitError = ref(false)
const databaseAssignments = ref<Assignment[]>([])

const form = reactive({
  studentName: '',
  homeworkId: ''
})

const availableAssignments = computed(() => (
  databaseAssignments.value.length > 0 ? databaseAssignments.value : props.assignments
))

const selectedAssignment = computed(() => (
  availableAssignments.value.find((assignment) => assignment.id === form.homeworkId)
))

const loadHomeworks = async () => {
  try {
    databaseAssignments.value = await $fetch<Assignment[]>('/api/homeworks')
  } catch (error) {
    console.info('Using local homework list because Supabase homeworks could not be loaded.', error)
  }
}

onMounted(() => {
  loadHomeworks()
})

const handleHomeworkChange = (event: Event) => {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0] ?? null

  homeworkFile.value = file
  homeworkFileName.value = file?.name ?? ''
}

const getSubmitErrorMessage = (error: unknown) => {
  const message = error instanceof Error
    ? error.message
    : typeof error === 'object' && error && 'message' in error
      ? String(error.message)
      : ''

  if (message.toLowerCase().includes('bucket not found')) {
    return 'تعذر رفع الملف: مجلد التخزين scratch-homework غير موجود في Supabase.'
  }

  if (message.toLowerCase().includes('row-level security')) {
    return 'تعذر إرسال الواجب: راجع سياسات الأمان RLS في Supabase.'
  }

  return message
    ? `تعذر إرسال الواجب: ${message}`
    : 'تعذر إرسال الواجب. تأكد من إعداد Supabase وحاول مرة أخرى.'
}

const submitHomework = async () => {
  submitMessage.value = ''
  submitError.value = false

  if (!homeworkFile.value) {
    submitError.value = true
    submitMessage.value = 'اختر ملف مشروع سكراتش أولا.'
    return
  }

  if (!form.homeworkId || !selectedAssignment.value) {
    submitError.value = true
    submitMessage.value = 'اختر الواجب الذي تريد تسليمه.'
    return
  }

  if (!homeworkFile.value.name.toLowerCase().endsWith('.sb3')) {
    submitError.value = true
    submitMessage.value = 'يجب أن يكون الملف بصيغة .sb3.'
    return
  }

  isSubmitting.value = true

  try {
    const formData = new FormData()
    formData.append('studentName', form.studentName)
    formData.append('homeworkId', form.homeworkId)
    formData.append('project', homeworkFile.value)

    await $fetch('/api/homework-submissions', {
      method: 'POST',
      body: formData
    })

    submitMessage.value = 'تم إرسال الواجب بنجاح.'
    form.studentName = ''
    form.homeworkId = ''
    homeworkFile.value = null
    homeworkFileName.value = ''

    if (homeworkInput.value) {
      homeworkInput.value.value = ''
    }
  } catch (error) {
    console.error(error)
    submitError.value = true
    submitMessage.value = getSubmitErrorMessage(error)
  } finally {
    isSubmitting.value = false
  }
}
</script>
