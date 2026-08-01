-- FIT TRACKER 5.0 cloud sync
-- Run once in Supabase Dashboard > SQL Editor.

create table if not exists public.fit_tracker_states (
  user_id uuid primary key references auth.users(id) on delete cascade,
  payload jsonb not null default '{}'::jsonb,
  app_version text not null default '5.0',
  revision bigint not null default 1,
  device_id text,
  updated_at timestamptz not null default now()
);

alter table public.fit_tracker_states enable row level security;

drop policy if exists "fit_tracker_select_own" on public.fit_tracker_states;
create policy "fit_tracker_select_own"
on public.fit_tracker_states
for select
to authenticated
using ((select auth.uid()) = user_id);

drop policy if exists "fit_tracker_insert_own" on public.fit_tracker_states;
create policy "fit_tracker_insert_own"
on public.fit_tracker_states
for insert
to authenticated
with check ((select auth.uid()) = user_id);

drop policy if exists "fit_tracker_update_own" on public.fit_tracker_states;
create policy "fit_tracker_update_own"
on public.fit_tracker_states
for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

revoke all on table public.fit_tracker_states from anon;
grant select, insert, update on table public.fit_tracker_states to authenticated;

comment on table public.fit_tracker_states is
'One encrypted-transport JSON snapshot per FIT TRACKER user. Row-level security prevents cross-user access.';
