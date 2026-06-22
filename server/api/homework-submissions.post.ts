const storageBucket = 'scratch-homework'

const sanitizePathPart = (value: string) => value
  .trim()
  .normalize('NFKD')
  .replace(/[^a-zA-Z0-9-]+/g, '-')
  .replace(/-+/g, '-')
  .replace(/^-|-$/g, '')
  .toLowerCase()

const buildStoragePath = (homeworkId: string, fileName: string) => {
  const homeworkPart = sanitizePathPart(homeworkId) || 'homework'
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
  const randomPart = Math.random().toString(36).slice(2, 10)
  const baseFileName = fileName.replace(/\.[^.]+$/, '')
  const safeFileName = sanitizePathPart(baseFileName) || 'scratch-project'

  return `${homeworkPart}/${timestamp}-${randomPart}-${safeFileName}.sb3`
}

type MultipartFormData = Awaited<ReturnType<typeof readMultipartFormData>>

const getFieldValue = (formData: MultipartFormData, name: string) => {
  const field = formData?.find((part) => part.name === name)

  return field?.data.toString('utf8').trim() ?? ''
}

export default defineEventHandler(async (event) => {
  const formData = await readMultipartFormData(event)

  if (!formData) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing form data.'
    })
  }

  const studentName = getFieldValue(formData, 'studentName')
  const homeworkId = getFieldValue(formData, 'homeworkId')
  const projectFile = formData.find((part) => part.name === 'project' && part.filename)

  if (!studentName || !homeworkId || !projectFile?.filename || !projectFile.data.length) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Student name, homework, and project file are required.'
    })
  }

  if (!projectFile.filename.toLowerCase().endsWith('.sb3')) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Project file must use the .sb3 extension.'
    })
  }

  const supabase = useServerSupabaseClient()
  const { data: homework, error: homeworkError } = await supabase
    .from('homeworks')
    .select('id, title')
    .eq('id', homeworkId)
    .eq('is_active', true)
    .single()

  if (homeworkError || !homework) {
    throw createError({
      statusCode: 400,
      statusMessage: homeworkError?.message ?? 'Selected homework was not found.'
    })
  }

  const filePath = buildStoragePath(homeworkId, projectFile.filename)
  const uploadResult = await supabase.storage
    .from(storageBucket)
    .upload(filePath, projectFile.data, {
      contentType: projectFile.type || 'application/octet-stream',
      upsert: false
    })

  if (uploadResult.error) {
    throw createError({
      statusCode: 500,
      statusMessage: uploadResult.error.message
    })
  }

  const insertResult = await supabase
    .from('homework_submissions')
    .insert({
      student_name: studentName,
      homework_id: homeworkId,
      homework_title: homework.title,
      storage_bucket: storageBucket,
      file_path: filePath,
      file_name: projectFile.filename,
      file_size_bytes: projectFile.data.length
    })

  if (insertResult.error) {
    throw createError({
      statusCode: 500,
      statusMessage: insertResult.error.message
    })
  }

  return {
    success: true
  }
})