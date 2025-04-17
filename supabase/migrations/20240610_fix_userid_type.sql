-- Alter the user_id column type from UUID to TEXT for liked_events
ALTER TABLE public.liked_events
ALTER COLUMN user_id TYPE TEXT;

-- Alter the user_id column type from UUID to TEXT for saved_events
ALTER TABLE public.saved_events
ALTER COLUMN user_id TYPE TEXT;

-- Optional: Add comments to the columns for clarity
COMMENT ON COLUMN public.liked_events.user_id IS 'Stores the Clerk User ID (text format).';
COMMENT ON COLUMN public.saved_events.user_id IS 'Stores the Clerk User ID (text format).'; 