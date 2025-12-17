-- =====================================================
-- Extensions
-- =====================================================
create extension if not exists "pgcrypto";

-- =====================================================
-- PROFILES (linked to auth.users)
-- =====================================================
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  avatar_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- =====================================================
-- TASKS
-- =====================================================
create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  title varchar(100) not null,
  description text,
  due_date timestamptz,
  priority varchar(20) not null
    check (priority in ('Low', 'Medium', 'High', 'Urgent')),
  status varchar(20) not null
    check (status in ('To Do', 'In Progress', 'Review', 'Completed')),
  creator_id uuid not null references public.profiles(id) on delete cascade,
  assigned_to_id uuid references public.profiles(id) on delete set null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- =====================================================
-- NOTIFICATIONS
-- =====================================================
create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  task_id uuid not null references public.tasks(id) on delete cascade,
  message text not null,
  is_read boolean default false,
  created_at timestamptz default now()
);

-- =====================================================
-- AUDIT LOGS
-- =====================================================
create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  task_id uuid not null references public.tasks(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  action varchar(50) not null,
  old_value jsonb,
  new_value jsonb,
  created_at timestamptz default now()
);

-- =====================================================
-- INDEXES
-- =====================================================
create index if not exists idx_tasks_creator on tasks(creator_id);
create index if not exists idx_tasks_assigned on tasks(assigned_to_id);
create index if not exists idx_tasks_status on tasks(status);
create index if not exists idx_tasks_priority on tasks(priority);
create index if not exists idx_tasks_due on tasks(due_date);
create index if not exists idx_notifications_user on notifications(user_id);
create index if not exists idx_audit_task on audit_logs(task_id);

-- =====================================================
-- ROW LEVEL SECURITY
-- =====================================================
alter table profiles enable row level security;
alter table tasks enable row level security;
alter table notifications enable row level security;
alter table audit_logs enable row level security;

-- =====================================================
-- RLS POLICIES
-- =====================================================

-- Profiles
create policy "Read own profile"
on profiles for select
using (auth.uid() = id);

create policy "Update own profile"
on profiles for update
using (auth.uid() = id);

-- Tasks
create policy "Read own or assigned tasks"
on tasks for select
using (auth.uid() = creator_id or auth.uid() = assigned_to_id);

create policy "Create tasks"
on tasks for insert
with check (auth.uid() = creator_id);

create policy "Update own or assigned tasks"
on tasks for update
using (auth.uid() = creator_id or auth.uid() = assigned_to_id);

create policy "Delete own tasks"
on tasks for delete
using (auth.uid() = creator_id);

-- Notifications
create policy "Read own notifications"
on notifications for select
using (auth.uid() = user_id);

create policy "Update own notifications"
on notifications for update
using (auth.uid() = user_id);

-- Audit Logs
create policy "Read audit logs for own tasks"
on audit_logs for select
using (
  exists (
    select 1 from tasks
    where tasks.id = audit_logs.task_id
    and (tasks.creator_id = auth.uid()
      or tasks.assigned_to_id = auth.uid())
  )
);

-- =====================================================
-- UPDATED_AT TRIGGER
-- =====================================================
create or replace function public.update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_profiles_updated_at
before update on profiles
for each row execute function update_updated_at_column();

create trigger update_tasks_updated_at
before update on tasks
for each row execute function update_updated_at_column();

-- =====================================================
-- AUTO CREATE PROFILE ON SIGNUP
-- =====================================================
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
as $$
begin
  insert into profiles (id, email)
  values (new.id, new.email)
  on conflict do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

-- =====================================================
-- REALTIME
-- =====================================================
alter publication supabase_realtime add table tasks;
alter publication supabase_realtime add table notifications;
