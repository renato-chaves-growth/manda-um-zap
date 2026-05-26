-- Profiles: dados extras do usuário além do auth.users
create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  full_name text,
  whatsapp text,
  business_name text,
  plan text default 'free' check (plan in ('free', 'comecar', 'trabalhar', 'vender_mais', 'tudo_automatico')),
  plan_status text default 'active' check (plan_status in ('active', 'canceled', 'past_due')),
  role text default 'user' check (role in ('user', 'admin')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Trigger: criar profile automaticamente ao criar usuário
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, whatsapp)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'whatsapp'
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Configurações dos agentes por usuário
create table public.agent_configs (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  agent_id text not null check (agent_id in ('clara', 'otavio', 'lucas', 'helena', 'maya')),
  active boolean default false,
  settings jsonb default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(user_id, agent_id)
);

-- Função para criar configs padrão dos agentes ao criar profile
create or replace function public.handle_new_profile()
returns trigger as $$
begin
  insert into public.agent_configs (user_id, agent_id, active)
  values
    (new.id, 'clara',  true),
    (new.id, 'otavio', false),
    (new.id, 'lucas',  false),
    (new.id, 'helena', false),
    (new.id, 'maya',   false);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_profile_created
  after insert on public.profiles
  for each row execute procedure public.handle_new_profile();

-- RLS: usuário só acessa seus próprios dados
alter table public.profiles enable row level security;
alter table public.agent_configs enable row level security;

create policy "Users can view own profile"
  on public.profiles for select using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update using (auth.uid() = id);

create policy "Admins can view all profiles"
  on public.profiles for select using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

create policy "Users can view own agent configs"
  on public.agent_configs for select using (auth.uid() = user_id);

create policy "Users can update own agent configs"
  on public.agent_configs for update using (auth.uid() = user_id);

-- Atualizar updated_at automaticamente
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.handle_updated_at();

create trigger agent_configs_updated_at
  before update on public.agent_configs
  for each row execute procedure public.handle_updated_at();
