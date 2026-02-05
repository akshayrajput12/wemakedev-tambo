-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. ENUMS
create type job_status as enum ('open', 'closed', 'draft');
create type application_status as enum ('new', 'review', 'interview', 'hired', 'rejected');
create type job_type as enum ('Full-time', 'Part-time', 'Contract', 'Internship');

-- 2. PROFILES
create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  email text not null,
  is_admin boolean default false,
  full_name text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. JOBS
create table public.jobs (
  id uuid default uuid_generate_v4() primary key,
  slug text unique not null,
  title text not null,
  
  -- Company Info
  company_name text not null,
  company_industry text,
  company_size text,
  company_description text,
  company_location text, 
  logo_url text,
  banner_url text,

  -- Job Details
  location text not null,
  type job_type not null default 'Full-time',
  salary_range text,
  status job_status default 'draft',
  level text,
  deadline date,
  job_code text,
  
  -- Content
  description text,
  responsibilities text,
  requirements text,
  benefits text,
  
  -- Metadata
  tags text[], 
  is_featured boolean default false,
  
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  posted_at timestamp with time zone
);

-- 4. APPLICATIONS
create table public.applications (
  id uuid default uuid_generate_v4() primary key,
  job_id uuid references public.jobs(id) on delete cascade not null,
  user_id uuid references public.profiles(id) on delete set null,
  
  -- Candidate Details
  candidate_name text not null,
  candidate_email text not null,
  candidate_phone text,
  candidate_location text,
  experience_summary text,
  
  -- Assets
  resume_url text not null, -- Stores the full path in storage bucket
  cover_letter text,
  
  -- Additional Info
  expected_salary text,
  portfolio_url text,
  github_url text,
  linkedin_url text,
  
  -- Admin Data
  status application_status default 'new',
  
  -- Notes stored as JSONB array to avoid separate table
  -- Format: [{ "content": "Great candidate", "author_id": "uuid", "created_at": "ISO-Date" }]
  notes jsonb default '[]'::jsonb,
  
  applied_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. AUTOMATIC PROFILE CREATION (TRIGGERS)
-- Function to handle new user creation
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, is_admin, full_name, avatar_url)
  values (
    new.id,
    new.email,
    false, -- Default is_admin to false
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to call the function on new user signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 6. RLS & SECURITY
alter table public.profiles enable row level security;
alter table public.jobs enable row level security;
alter table public.applications enable row level security;

-- Helper Function to prevent recursion in policies
create or replace function public.is_admin()
returns boolean as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
    and is_admin = true
  );
$$ language sql security definer;

-- Policies: PROFILES
create policy "Users view own profile" on public.profiles for select using (auth.uid() = id);
create policy "Admins view all profiles" on public.profiles for select using (
  public.is_admin()
);
create policy "Users update own profile" on public.profiles for update using (auth.uid() = id);

-- Policies: JOBS
create policy "Public view open jobs" on public.jobs for select using (status = 'open');
create policy "Admins manage jobs" on public.jobs for all using (
  public.is_admin()
);

-- Policies: APPLICATIONS
-- Public/Guest Apply
create policy "Public insert application" on public.applications for insert to authenticated, anon with check (true);

-- Admins View/Edit All
create policy "Admins view all applications" on public.applications for select using (
  public.is_admin()
);
create policy "Admins update applications" on public.applications for update using (
  public.is_admin()
);

-- Candidates View Own
create policy "Candidates view own applications" on public.applications for select using (
  auth.uid() = user_id
);

-- 7. STORAGE BUCKETS (Script to run in SQL Editor)
-- Note: 'storage' schema is managed by Supabase. We insert into storage.buckets.

insert into storage.buckets (id, name, public)
values ('resumes', 'resumes', false) -- Private bucket
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('public-assets', 'public-assets', true) -- Public assets (logos, banners)
on conflict (id) do nothing;

-- 8. STORAGE POLICIES (RLS for storage.objects)

-- RESUMES BUCKET POLICIES
-- Policy 1: Anyone can upload a resume (Create)
create policy "Public Upload Resumes"
on storage.objects for insert
to public
with check ( bucket_id = 'resumes' );

-- Policy 2: Admins can view/download all resumes
create policy "Admins View All Resumes"
on storage.objects for select
to authenticated
using (
  bucket_id = 'resumes' 
  and public.is_admin()
);

-- Policy 3: Owners can view/download their own resumes
create policy "Owners View Own Resumes"
on storage.objects for select
to authenticated
using (
  bucket_id = 'resumes' 
  and owner = auth.uid()
);

-- PUBLIC ASSETS BUCKET POLICIES (Logos, Banners)
-- Policy 1: Public Read
create policy "Public Read Assets"
on storage.objects for select
to public
using ( bucket_id = 'public-assets' );

-- Policy 2: Admins Upload/Update/Delete
create policy "Admins Manage Assets"
on storage.objects for all
to authenticated
using (
  bucket_id = 'public-assets' 
  and public.is_admin()
);
