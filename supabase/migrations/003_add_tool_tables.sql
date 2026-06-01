-- ═══════════════════════════════════════════════════════════
-- Sprint 5: Tabelas para Tool Use dos agentes
-- Cole no Supabase SQL Editor e clique em "Run"
-- ═══════════════════════════════════════════════════════════

-- ─── Leads capturados pela Clara ─────────────────────────
create table if not exists public.leads (
  id               uuid        primary key default gen_random_uuid(),
  user_id          uuid        not null references public.profiles(id) on delete cascade,
  contact_phone    text        not null,
  contact_name     text,
  service_interest text,
  urgency          text        check (urgency in ('urgente', 'normal', 'pode esperar')),
  notes            text,
  status           text        not null default 'novo'
                               check (status in ('novo', 'contatado', 'convertido', 'perdido')),
  created_at       timestamptz default now()
);

create index if not exists idx_leads_user on public.leads (user_id, created_at desc);
alter table public.leads enable row level security;
create policy "Users manage own leads"
  on public.leads for all using (auth.uid() = user_id);

-- ─── Agendamentos criados pelo Lucas ─────────────────────
create table if not exists public.appointments (
  id               uuid        primary key default gen_random_uuid(),
  user_id          uuid        not null references public.profiles(id) on delete cascade,
  contact_phone    text        not null,
  contact_name     text,
  address          text,
  scheduled_at     timestamptz,
  notes            text,
  status           text        not null default 'agendado'
                               check (status in ('agendado', 'confirmado', 'realizado', 'cancelado')),
  google_event_id  text,
  created_at       timestamptz default now()
);

create index if not exists idx_appointments_user on public.appointments (user_id, scheduled_at);
alter table public.appointments enable row level security;
create policy "Users manage own appointments"
  on public.appointments for all using (auth.uid() = user_id);

-- ─── Pedidos de orçamento do Otávio ──────────────────────
create table if not exists public.quotes (
  id               uuid        primary key default gen_random_uuid(),
  user_id          uuid        not null references public.profiles(id) on delete cascade,
  contact_phone    text        not null,
  contact_name     text,
  service_type     text,
  details          jsonb,
  urgency          text,
  status           text        not null default 'pendente'
                               check (status in ('pendente', 'em_cotacao', 'enviado', 'aprovado', 'recusado')),
  created_at       timestamptz default now()
);

create index if not exists idx_quotes_user on public.quotes (user_id, created_at desc);
alter table public.quotes enable row level security;
create policy "Users manage own quotes"
  on public.quotes for all using (auth.uid() = user_id);

-- ─── Lançamentos financeiros da Helena ───────────────────
create table if not exists public.financial_entries (
  id               uuid        primary key default gen_random_uuid(),
  user_id          uuid        not null references public.profiles(id) on delete cascade,
  contact_phone    text,
  contact_name     text,
  description      text        not null,
  amount           numeric(10,2),
  entry_type       text        not null check (entry_type in ('receita', 'despesa')),
  payment_method   text,
  status           text        not null default 'pendente'
                               check (status in ('pendente', 'pago', 'cancelado')),
  due_date         date,
  paid_at          timestamptz,
  notes            text,
  created_at       timestamptz default now()
);

create index if not exists idx_financial_user on public.financial_entries (user_id, created_at desc);
alter table public.financial_entries enable row level security;
create policy "Users manage own financials"
  on public.financial_entries for all using (auth.uid() = user_id);

-- ─── Fila de conteúdo Instagram da Maya ──────────────────
create table if not exists public.instagram_queue (
  id               uuid        primary key default gen_random_uuid(),
  user_id          uuid        not null references public.profiles(id) on delete cascade,
  caption          text        not null,
  hashtags         text,
  post_type        text        not null default 'feed'
                               check (post_type in ('feed', 'story', 'reels')),
  scheduled_for    timestamptz,
  status           text        not null default 'rascunho'
                               check (status in ('rascunho', 'agendado', 'publicado')),
  created_at       timestamptz default now()
);

create index if not exists idx_instagram_user on public.instagram_queue (user_id, created_at desc);
alter table public.instagram_queue enable row level security;
create policy "Users manage own instagram queue"
  on public.instagram_queue for all using (auth.uid() = user_id);
