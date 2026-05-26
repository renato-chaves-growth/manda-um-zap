-- ─── Sprint 4: Conversations + perfil estendido ──────────────────────────

-- Adiciona campos ao profiles para integração WhatsApp e dados do negócio
alter table public.profiles
  add column if not exists whatsapp_instance text unique,   -- Z-API instanceId
  add column if not exists whatsapp_token    text,          -- Z-API instanceToken
  add column if not exists city               text,
  add column if not exists instagram          text,
  add column if not exists bio                text,
  add column if not exists margin             text default 'media',
  add column if not exists schedule           jsonb default '{
    "days": {"seg":true,"ter":true,"qua":true,"qui":true,"sex":true,"sab":true,"dom":false},
    "startTime": "08:00",
    "endTime": "18:00"
  }'::jsonb;

-- ─── Tabela de conversas ──────────────────────────────────────────────────
create table if not exists public.conversations (
  id           uuid        primary key default gen_random_uuid(),
  user_id      uuid        not null references public.profiles(id) on delete cascade,
  contact_phone text       not null,
  contact_name  text,
  agent_id      text       not null default 'clara',
  role          text       not null check (role in ('user', 'assistant')),
  content       text       not null,
  created_at    timestamptz default now()
);

-- Índice para buscar histórico rápido por marceneiro + contato
create index if not exists idx_conversations_lookup
  on public.conversations (user_id, contact_phone, created_at desc);

-- RLS
alter table public.conversations enable row level security;

create policy "Users see own conversations"
  on public.conversations for all
  using (auth.uid() = user_id);

-- Admins veem todas
create policy "Admins see all conversations"
  on public.conversations for select
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );
