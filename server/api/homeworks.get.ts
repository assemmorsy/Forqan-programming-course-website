export default defineEventHandler(async () => {
  const supabase = useServerSupabaseClient()
  const { data, error } = await supabase
    .from('homeworks')
    .select('id, title, description, steps')
    .eq('is_active', true)
    .order('lesson_order', { ascending: true })

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message
    })
  }

  return (data ?? []).map((homework) => ({
    id: homework.id,
    title: homework.title,
    description: homework.description,
    steps: Array.isArray(homework.steps)
      ? homework.steps.filter((step): step is string => typeof step === 'string' && step.trim().length > 0)
      : []
  }))
})