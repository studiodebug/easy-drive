-- Seed data for local development.
-- This file is executed after migrations on `supabase db reset` (see `supabase/config.toml`).

-- Make the seed re-runnable.
-- (Keep auth tables untouched; we only insert into them best-effort below.)
truncate table
  public.instructors,
  public.users,
  public.instructor_profiles,
  public.addresses
restart identity cascade;

-- ---------------------------------------------------------------------
-- 1) Create a few auth users (BEST-EFFORT)
-- ---------------------------------------------------------------------
-- Supabase owns the `auth` schema and its table definition can change between versions.
-- To avoid breaking `supabase db reset`, we attempt to insert with commonly-available columns.
-- If it fails, we emit a NOTICE and continue; you can still create users via the app/UI and
-- re-run seeds to populate `public.users` for those accounts.

do $$
declare
  instance uuid;
begin
  -- `auth.instances` exists in most Supabase setups; use it when available.
  begin
    execute 'select id from auth.instances limit 1' into instance;
  exception
    when undefined_table then
      instance := null;
  end;

  begin
    insert into auth.users (
      id,
      instance_id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      raw_app_meta_data,
      raw_user_meta_data,
      created_at,
      updated_at
    )
    select
      s.id,
      instance,
      'authenticated',
      'authenticated',
      s.email,
      crypt(s.password, gen_salt('bf')),
      now(),
      jsonb_build_object('provider', 'email', 'providers', jsonb_build_array('email')),
      jsonb_build_object('name', s.name),
      now(),
      now()
    from (
      values
        ('11111111-1111-1111-1111-111111111111'::uuid, 'ana.instructor@example.com',   'password123', 'Ana Instructor',   true,  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'::uuid, null::uuid),
        ('22222222-2222-2222-2222-222222222222'::uuid, 'bruno.instructor@example.com', 'password123', 'Bruno Instructor', true,  'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb'::uuid, null::uuid),
        ('33333333-3333-3333-3333-333333333333'::uuid, 'carla.student@example.com',    'password123', 'Carla Student',    false, null::uuid, 'cccccccc-cccc-cccc-cccc-cccccccccccc'::uuid),
        ('44444444-4444-4444-4444-444444444444'::uuid, 'diego.student@example.com',    'password123', 'Diego Student',    false, null::uuid, 'dddddddd-dddd-dddd-dddd-dddddddddddd'::uuid),
        ('55555555-5555-5555-5555-555555555555'::uuid, 'elisa.student@example.com',    'password123', 'Elisa Student',    false, null::uuid, 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee'::uuid)
    ) as s(id, email, password, name, is_instructor, instructor_id, student_id)
    on conflict (id) do nothing;
  exception
    when undefined_column or undefined_table or not_null_violation or invalid_text_representation or others then
      raise notice 'Seed: skipping auth.users inserts (auth schema differs or constraints). Create users normally via Supabase Auth and re-run seed.';
  end;
end $$;

-- ---------------------------------------------------------------------
-- 2) Public data
-- ---------------------------------------------------------------------

-- Addresses
insert into public.addresses (id, zipcode, number, street, neighborhood, city, state, country, coordinates) values
  ('a0a0a0a0-0000-0000-0000-000000000001', '01310-100', '100', 'Av. Paulista', 'Bela Vista', 'São Paulo', 'SP', 'BRAZIL', '-23.561414,-46.655881'),
  ('a0a0a0a0-0000-0000-0000-000000000002', '20040-020', '50',  'Av. Rio Branco', 'Centro', 'Rio de Janeiro', 'RJ', 'BRAZIL', '-22.904376,-43.175200'),
  ('a0a0a0a0-0000-0000-0000-000000000003', '30130-010', '12',  'Av. Afonso Pena', 'Centro', 'Belo Horizonte', 'MG', 'BRAZIL', '-19.919052,-43.938668'),
  ('a0a0a0a0-0000-0000-0000-000000000004', '80010-000', '77',  'Rua XV de Novembro', 'Centro', 'Curitiba', 'PR', 'BRAZIL', '-25.429596,-49.271272'),
  ('a0a0a0a0-0000-0000-0000-000000000005', '90010-000', '33',  'Av. Borges de Medeiros', 'Centro Histórico', 'Porto Alegre', 'RS', 'BRAZIL', '-30.032499,-51.230375'),
  ('a0a0a0a0-0000-0000-0000-000000000006', '60060-080', '19',  'Av. Beira Mar', 'Meireles', 'Fortaleza', 'CE', 'BRAZIL', '-3.718394,-38.499348'),
  ('a0a0a0a0-0000-0000-0000-000000000007', '40020-000', '8',   'Av. Sete de Setembro', 'Campo Grande', 'Salvador', 'BA', 'BRAZIL', '-12.981971,-38.512382'),
  ('a0a0a0a0-0000-0000-0000-000000000008', '69005-000', '210', 'Av. Eduardo Ribeiro', 'Centro', 'Manaus', 'AM', 'BRAZIL', '-3.130222,-60.023231');

-- Instructor profiles
insert into public.instructor_profiles (
  id,
  age,
  specialty,
  description,
  years_of_experience,
  complement,
  is_professional,
  current_drivers_license_type
) values
  ('f0f0f0f0-0000-0000-0000-000000000001', 32, 'Beginner drivers', 'Calm, methodical, great for nervous beginners.', 8,  'Speaks PT/EN', true,  'B'),
  ('f0f0f0f0-0000-0000-0000-000000000002', 41, 'Defensive driving', 'Focus on safe habits and real-world traffic.', 15, 'Weekend availability', true, 'AB'),
  ('f0f0f0f0-0000-0000-0000-000000000003', 29, 'Parking & maneuvers', 'Parallel parking wizard. Quick progress plan.', 6,  null, false, 'B');

-- Public users for the seed emails (only if the auth users exist)
-- Note: `public.users.id` has FK to `auth.users.id`.
insert into public.users (id, name, photo_url, document_type, document, address_id, instructor_id, student_id)
select
  au.id,
  s.name,
  null,
  'CPF'::public.document_type,
  lpad((floor(random() * 99999999999))::bigint::text, 11, '0'),
  case
    when s.is_instructor then 'a0a0a0a0-0000-0000-0000-000000000001'::uuid
    else 'a0a0a0a0-0000-0000-0000-000000000004'::uuid
  end,
  s.instructor_id,
  s.student_id
from (
  values
    ('11111111-1111-1111-1111-111111111111'::uuid, 'ana.instructor@example.com',   'password123', 'Ana Instructor',   true,  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'::uuid, null::uuid),
    ('22222222-2222-2222-2222-222222222222'::uuid, 'bruno.instructor@example.com', 'password123', 'Bruno Instructor', true,  'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb'::uuid, null::uuid),
    ('33333333-3333-3333-3333-333333333333'::uuid, 'carla.student@example.com',    'password123', 'Carla Student',    false, null::uuid, 'cccccccc-cccc-cccc-cccc-cccccccccccc'::uuid),
    ('44444444-4444-4444-4444-444444444444'::uuid, 'diego.student@example.com',    'password123', 'Diego Student',    false, null::uuid, 'dddddddd-dddd-dddd-dddd-dddddddddddd'::uuid),
    ('55555555-5555-5555-5555-555555555555'::uuid, 'elisa.student@example.com',    'password123', 'Elisa Student',    false, null::uuid, 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee'::uuid)
) as s(id, email, password, name, is_instructor, instructor_id, student_id)
join auth.users au on au.id = s.id
on conflict (id) do update
set
  name = excluded.name,
  address_id = excluded.address_id,
  instructor_id = excluded.instructor_id,
  student_id = excluded.student_id;

-- Instructors (only for users that have instructor_id set)
-- Note: instructors.id FK references public.users(instructor_id)
insert into public.instructors (id, drivers_license, rating, is_active, profile_id, address_id)
select
  u.instructor_id,
  'CNH-' || upper(substr(md5(u.instructor_id::text), 1, 9)),
  (3 + floor(random() * 3))::smallint,
  true,
  case
    when u.name ilike 'ana%' then 'f0f0f0f0-0000-0000-0000-000000000001'::uuid
    else 'f0f0f0f0-0000-0000-0000-000000000002'::uuid
  end,
  u.address_id
from public.users u
where u.instructor_id is not null
on conflict (id) do update
set
  rating = excluded.rating,
  is_active = excluded.is_active,
  profile_id = excluded.profile_id,
  address_id = excluded.address_id;


