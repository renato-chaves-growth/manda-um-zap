-- ═══════════════════════════════════════════════════════════
-- MandaUmZap — Schema inicial
-- Cole este SQL no Supabase SQL Editor e clique em "Run"
-- ═══════════════════════════════════════════════════════════

-- ─── 1. Profiles ─────────────────────────────────────────────
create table if not exists public.profiles (
  id                 uuid        primary key references auth.users(id) on delete cascade,
  full_name          text,
  whatsapp           text,
  business_name      text,
  city               text,
  instagram          text,
  bio                text,
  margin             text,
  schedule           jsonb,
  whatsapp_instance  text,
  whatsapp_token     text,
  plan               text        not null default 'free',
  plan_status        text        not null default 'inactive',
  role               text        not null default 'user',
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Usuário lê próprio perfil"
  on public.profiles for select using (auth.uid() = id);

create policy "Usuário atualiza próprio perfil"
  on public.profiles for update using (auth.uid() = id);

-- ─── 2. Agent Configs ────────────────────────────────────────
create table if not exists public.agent_configs (
  id         uuid        primary key default gen_random_uuid(),
  user_id    uuid        not null references auth.users(id) on delete cascade,
  agent_id   text        not null,
  active     boolean     not null default false,
  settings   jsonb       not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, agent_id)
);

alter table public.agent_configs enable row level security;

create policy "Usuário lê próprios agentes"
  on public.agent_configs for select using (auth.uid() = user_id);

create policy "Usuário atualiza próprios agentes"
  on public.agent_configs for update using (auth.uid() = user_id);

create policy "Usuário insere próprios agentes"
  on public.agent_configs for insert with check (auth.uid() = user_id);

-- ─── 3. Trigger: criar profile + agent_configs no cadastro ───
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, whatsapp)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'whatsapp');

  insert into public.agent_configs (user_id, agent_id, active) values
    (new.id, 'clara',  false),
    (new.id, 'otavio', false),
    (new.id, 'lucas',  false),
    (new.id, 'helena', false),
    (new.id, 'maya',   false);

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ─── 4. updated_at automático ────────────────────────────────
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

create trigger set_profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.set_updated_at();

create trigger set_agent_configs_updated_at
  before update on public.agent_configs
  for each row execute procedure public.set_updated_at();
