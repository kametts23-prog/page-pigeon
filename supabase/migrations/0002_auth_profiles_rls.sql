alter table profiles
  add constraint profiles_auth_user_fk
  foreign key (id) references auth.users(id) on delete cascade;

alter table profiles enable row level security;
alter table books enable row level security;
alter table copies enable row level security;
alter table loans enable row level security;
alter table credit_ledger enable row level security;
alter table journey_events enable row level security;

create policy "Public profiles are readable"
on profiles for select
using (true);

create policy "Users can update their own profile"
on profiles for update
using (auth.uid() = id)
with check (auth.uid() = id);

create policy "Books are readable"
on books for select
using (true);

create policy "Available copies are readable"
on copies for select
using (true);

create policy "Owners can create copies"
on copies for insert
with check (auth.uid() = owner_id);

create policy "Owners can update copies"
on copies for update
using (auth.uid() = owner_id)
with check (auth.uid() = owner_id);

create policy "Loan parties can read loans"
on loans for select
using (auth.uid() = lender_id or auth.uid() = borrower_id);

create policy "Borrowers can request loans"
on loans for insert
with check (auth.uid() = borrower_id);

create policy "Users can read their credit ledger"
on credit_ledger for select
using (auth.uid() = user_id);

create policy "Journey events are readable"
on journey_events for select
using (true);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'display_name', split_part(new.email, '@', 1))
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
