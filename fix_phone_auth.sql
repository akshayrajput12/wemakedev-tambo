-- Run this script in your Supabase SQL Editor to fix the phone auth error

-- 1. Make email nullable in profiles to support phone-only auth
ALTER TABLE public.profiles ALTER COLUMN email DROP NOT NULL;

-- 2. Add phone column to profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS phone text;

-- 3. Update the handle_new_user trigger function to include phone and handle missing email
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, phone, is_admin, full_name, avatar_url)
  VALUES (
    new.id,
    new.email,
    new.phone,
    false,
    COALESCE(new.raw_user_meta_data->>'full_name', ''),
    new.raw_user_meta_data->>'avatar_url'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
