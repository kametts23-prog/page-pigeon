create extension if not exists "pgcrypto";

create type copy_status as enum ('available','requested','lent','unavailable');
create type loan_status as enum (
  'requested','accepted','label_created','shipped','delivered','active',
  'return_started','return_shipped','return_delivered','completed',
  'declined','cancelled','expired','overdue','claim_open','lost'
);

create table profiles (
  id uuid primary key,
  display_name text not null,
  avatar_url text,
  postal_code text,
  account_status text not null default 'active',
  completed_borrows integer not null default 0,
  completed_loans integer not null default 0,
  on_time_returns integer not null default 0,
  created_at timestamptz not null default now()
);

create table books (
  id uuid primary key default gen_random_uuid(),
  isbn text unique,
  title text not null,
  author text,
  cover_url text,
  description text,
  publisher text,
  publication_date date,
  created_at timestamptz not null default now()
);

create table copies (
  id uuid primary key default gen_random_uuid(),
  public_code text unique not null,
  book_id uuid not null references books(id),
  owner_id uuid not null references profiles(id),
  condition text not null,
  replacement_value_cents integer not null check (replacement_value_cents >= 0),
  shipping_available boolean not null default true,
  local_available boolean not null default false,
  status copy_status not null default 'available',
  created_at timestamptz not null default now()
);

create table loans (
  id uuid primary key default gen_random_uuid(),
  copy_id uuid not null references copies(id),
  lender_id uuid not null references profiles(id),
  borrower_id uuid not null references profiles(id),
  status loan_status not null default 'requested',
  replacement_value_cents integer not null,
  requested_at timestamptz not null default now(),
  accepted_at timestamptz,
  delivered_at timestamptz,
  due_at timestamptz,
  returned_at timestamptz
);

create table credit_ledger (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id),
  amount integer not null,
  reason text not null,
  loan_id uuid references loans(id),
  state text not null default 'available',
  created_at timestamptz not null default now()
);

create table journey_events (
  id uuid primary key default gen_random_uuid(),
  copy_id uuid not null references copies(id),
  loan_id uuid references loans(id),
  origin_region text,
  destination_region text,
  created_at timestamptz not null default now()
);

create index copies_book_id_idx on copies(book_id);
create index copies_owner_id_idx on copies(owner_id);
create index loans_borrower_id_idx on loans(borrower_id);
create index loans_lender_id_idx on loans(lender_id);
create index credit_ledger_user_id_idx on credit_ledger(user_id);
