# Twilio OTP & Supabase Configuration Guide
    
## 1. Twilio SMS Template
To ensure your OTP messages look professional and match your "Jabbrr Afghani India" branding, use the following template.

### Recommended Template Text:
```text
Your Jabbrr Afghani verification code is: {{code}}. Do not share this code with anyone.
```
*(Note: Keep it short to ensure deliverability and readability)*

### How to Configure in Twilio:
1.  Log in to your **Twilio Console**.
2.  Go to **Verify** > **Services**.
3.  Select your service (the one you linked to Supabase).
4.  Click on **Templates** in the left sidebar.
5.  Select **SMS**.
6.  Edit the message body to: `Your Jabbrr Afghani verification code is: {{code}}. Do not share this code with anyone.`
7.  Save changes.

---

## 2. Supabase Phone Auth Configuration
Ensure you have completed these steps to enable Phone Auth with Twilio.

1.  Go to your **Supabase Dashboard** > **Authentication** > **Providers**.
2.  Select **Phone**.
3.  **Enable Phone Provider**: Toggle ON.
4.  **SMS Provider**: Select "Twilio Verify".
5.  **Twilio Account SID**: Paste your Account SID (starts with `AC...`).
6.  **Twilio Auth Token**: Paste your Auth Token.
7.  **Twilio Message Service SID**: Paste your Verify Service SID (starts with `VA...`).
8.  **Save**.

---

## 3. Database Schema Update (Crucial!)
Since we are moving to Phone-only auth, users might not have emails. You **MUST** run the following SQL in your Supabase SQL Editor if you haven't already:

```sql
-- Make email nullable
ALTER TABLE public.profiles ALTER COLUMN email DROP NOT NULL;

-- Add phone column
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS phone text;

-- Update trigger for new users
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
```
