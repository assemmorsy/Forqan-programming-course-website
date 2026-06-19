import { mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { randomUUID } from 'node:crypto'

export default defineEventHandler(async (event) => {
  const parts = await readMultipartFormData(event)

  if (!parts) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing form data'
    })
  }

  const studentName = parts.find((part) => part.name === 'studentName')?.data.toString('utf8').trim()
  const notes = parts.find((part) => part.name === 'notes')?.data.toString('utf8').trim() ?? ''
  const project = parts.find((part) => part.name === 'project')

  if (!studentName || !project?.filename) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Student name and project file are required'
    })
  }

  if (!project.filename.toLowerCase().endsWith('.sb3')) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Only .sb3 Scratch project files are accepted'
    })
  }

  const uploadDir = join(process.cwd(), '.data', 'homework')
  await mkdir(uploadDir, { recursive: true })

  const safeStudentName = studentName.replace(/[^\p{L}\p{N} -]/gu, '').trim() || 'student'
  const savedFileName = `${Date.now()}-${randomUUID()}-${safeStudentName}.sb3`
  const savedPath = join(uploadDir, savedFileName)

  await writeFile(savedPath, project.data)

  return {
    ok: true,
    studentName,
    notes,
    fileName: savedFileName
  }
})
