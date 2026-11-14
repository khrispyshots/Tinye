-- Tinye's application database contains private metadata, never authoritative balances.
-- Wallet ownership is established by NEP-413 in the Next.js backend.
-- The backend uses a server-only secret key and scopes every query to the verified account.
begin;

create table if not exists public.tinye_profiles (
  account_id text not null check (length(account_id) between 2 and 64),
  network text not null default 'testnet' check (network = 'testnet'),
  display_name text not null check (length(display_name) between 1 and 60),
  preferences jsonb not null default '{"notifications":false,"reducedMotion":false}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (account_id, network)
);

create table if not exists public.tinye_goal_metadata (
  account_id text not null check (length(account_id) between 2 and 64),
  network text not null default 'testnet' check (network = 'testnet'),
  contract_id text not null,
  goal_id text not null check (length(goal_id) between 1 and 64),
  name text not null check (length(name) between 1 and 100),
  category text not null check (category in ('emergency','laptop','housing','education','travel','custom')),
  notes text not null default '' check (length(notes) <= 1000),
  updated_at timestamptz not null default now(),
  primary key (account_id, network, contract_id, goal_id)
);

create table if not exists public.tinye_sessions (
  token_hash text primary key check (length(token_hash) = 64),
  account_id text not null,
  public_key text not null,
  wallet_kind text not null default 'external' check (wallet_kind in ('external','embedded')),
  network text not null default 'testnet' check (network = 'testnet'),
  expires_at timestamptz not null,
  created_at timestamptz not null default now()
);
create index if not exists tinye_sessions_expiry on public.tinye_sessions (expires_at);

create table if not exists public.tinye_ephemeral (
  namespace text not null check (length(namespace) between 1 and 32),
  id_hash text not null check (length(id_hash) = 64),
  payload jsonb not null,
  expires_at timestamptz not null,
  primary key (namespace, id_hash)
);
create index if not exists tinye_ephemeral_expiry on public.tinye_ephemeral (namespace, expires_at);

-- No browser access: Supabase Auth identities are not verified NEAR identities.
-- There are deliberately no anon/authenticated policies on these private tables.
alter table public.tinye_profiles enable row level security;
alter table public.tinye_goal_metadata enable row level security;
alter table public.tinye_sessions enable row level security;
alter table public.tinye_ephemeral enable row level security;
revoke all on table public.tinye_profiles, public.tinye_goal_metadata, public.tinye_sessions, public.tinye_ephemeral from public, anon, authenticated;
grant select, insert, update, delete on table public.tinye_profiles, public.tinye_goal_metadata, public.tinye_sessions, public.tinye_ephemeral to service_role;

commit;
