-- Run this in Supabase SQL Editor before publishing the site.
-- It can be run again when you add or edit homework rows.

create table if not exists public.homeworks (
  id text primary key,
  title text not null,
  description text not null,
  steps jsonb not null default '[]'::jsonb,
  lesson_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.homeworks
  add column if not exists steps jsonb not null default '[]'::jsonb;

insert into public.homeworks (id, title, description, steps, lesson_order, is_active)
values
  (
    'lesson-01',
    'واجب المحاضرة الأولى',
    'تجربة تحريك الشخصية وإضافة حدث البداية.',
    '["افتح Scratch وابدأ مشروعًا جديدًا.", "اختر شخصية مناسبة.", "اجعل الشخصية تتحرك عند الضغط على العلم الأخضر.", "احفظ المشروع كملف .sb3 وارفعه من صفحة الواجب."]'::jsonb,
    1,
    true
  ),
  (
    'lesson-02',
    'واجب المحاضرة الثانية',
    'إضافة خلفية وتفاعل بسيط بين اللاعب والعناصر.',
    '["أضف خلفية مناسبة للعبة.", "أضف عنصرًا جديدًا يتفاعل مع اللاعب.", "استخدم حدثًا أو حركة بسيطة.", "احفظ المشروع وارفع ملف .sb3."]'::jsonb,
    2,
    true
  ),
  (
    'lesson-03',
    'واجب المحاضرة الثالثة',
    'استخدام الشروط أو النقاط داخل اللعبة.',
    '["أضف شرطًا داخل اللعبة.", "أضف متغيرًا للنقاط أو المحاولات.", "جرّب اللعبة وتأكد أن الشرط يعمل.", "ارفع ملف المشروع بعد الحفظ."]'::jsonb,
    3,
    true
  ),
  (
    'final-project',
    'المشروع النهائي',
    'تسليم اللعبة الكاملة بعد تطوير الفكرة والشخصيات وطريقة الفوز.',
    '["حدد فكرة اللعبة.", "أضف الشخصيات والخلفيات.", "أضف طريقة للفوز أو الخسارة.", "جرّب اللعبة كاملة ثم ارفع ملف .sb3 النهائي."]'::jsonb,
    99,
    true
  )
on conflict (id) do update
set
  title = excluded.title,
  description = excluded.description,
  steps = excluded.steps,
  lesson_order = excluded.lesson_order,
  is_active = excluded.is_active,
  updated_at = now();

create table if not exists public.homework_submissions (
  id uuid primary key default gen_random_uuid(),
  student_name text not null,
  homework_id text not null,
  homework_title text not null,
  notes text,
  storage_bucket text not null default 'scratch-homework',
  file_path text not null,
  file_name text not null,
  file_size_bytes bigint,
  created_at timestamptz not null default now()
);

alter table public.homework_submissions
  add column if not exists storage_bucket text not null default 'scratch-homework',
  add column if not exists file_size_bytes bigint;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'homework_submissions_homework_id_fkey'
  ) then
    alter table public.homework_submissions
      add constraint homework_submissions_homework_id_fkey
      foreign key (homework_id)
      references public.homeworks(id);
  end if;
end $$;

alter table public.homeworks enable row level security;
alter table public.homework_submissions enable row level security;

drop policy if exists "Allow public active homework reads" on public.homeworks;
drop policy if exists "Allow public homework inserts" on public.homework_submissions;

create policy "Allow public active homework reads"
on public.homeworks
for select
to anon
using (is_active = true);

create policy "Allow public homework inserts"
on public.homework_submissions
for insert
to anon
with check (
  storage_bucket = 'scratch-homework'
  and lower(file_name) like '%.sb3'
  and exists (
    select 1
    from public.homeworks
    where homeworks.id = homework_submissions.homework_id
      and homeworks.is_active = true
  )
);

grant select on public.homeworks to anon;
grant insert on public.homework_submissions to anon;

insert into storage.buckets (id, name, public, file_size_limit)
values ('scratch-homework', 'scratch-homework', false, 52428800)
on conflict (id) do nothing;

drop policy if exists "Allow public scratch homework uploads" on storage.objects;

create policy "Allow public scratch homework uploads"
on storage.objects
for insert
to anon
with check (
  bucket_id = 'scratch-homework'
  and lower(name) like '%.sb3'
);
