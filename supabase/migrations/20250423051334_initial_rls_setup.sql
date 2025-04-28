-- supabase/migrations/20250423051334_initial_rls_setup.sql

-- Ensure RLS is enabled and enforced on all relevant tables
ALTER TABLE IF EXISTS public.registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.registrations FORCE ROW LEVEL SECURITY;

ALTER TABLE IF EXISTS public.saved_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.saved_events FORCE ROW LEVEL SECURITY;

ALTER TABLE IF EXISTS public.liked_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.liked_events FORCE ROW LEVEL SECURITY;

-- Drop any potential leftover policies from previous attempts (just in case)
-- (Add specific old policy names here if you remember any, otherwise this section can be minimal)
DROP POLICY IF EXISTS "Deny all direct access to registrations" ON public.registrations;
DROP POLICY IF EXISTS "Allow authenticated read access on saved events" ON public.saved_events;
DROP POLICY IF EXISTS "Block authenticated writes on saved events" ON public.saved_events;
DROP POLICY IF EXISTS "Allow authenticated read access on liked events" ON public.liked_events;
DROP POLICY IF EXISTS "Block authenticated writes on liked events" ON public.liked_events;


-- == Define Initial Policies ==

-- registrations: Block all direct client access, rely on Edge Function
CREATE POLICY "Deny all direct access to registrations"
ON public.registrations
FOR ALL -- Applies to SELECT, INSERT, UPDATE, DELETE
USING (false)
WITH CHECK (false);

-- Allow authenticated users to SELECT only their own registrations
CREATE POLICY "Allow authenticated users to read their registrations"
  ON public.registrations
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Still block direct client writes (inserts/updates/deletes)
CREATE POLICY "Block authenticated writes on registrations"
  ON public.registrations
  FOR INSERT, UPDATE, DELETE
  TO authenticated
  WITH CHECK (false);

-- saved_events: Allow authenticated reads (INSECURE), block writes
-- WARNING: The SELECT policy allows any logged-in user to see all saved events.
-- TODO: Replace read policy with secure check (e.g., using Edge Function).
-- TODO: Implement Edge Function for insert/delete.
CREATE POLICY "Allow authenticated read access on saved events"
ON public.saved_events
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Block authenticated writes on saved events"
ON public.saved_events
FOR INSERT, UPDATE, DELETE -- Block writes directly from client
TO authenticated
USING (false) -- Doesn't matter much as CHECK is false
WITH CHECK (false);


-- liked_events: Allow authenticated reads (INSECURE), block writes
-- WARNING: The SELECT policy allows any logged-in user to see all liked events.
-- TODO: Replace read policy with secure check (e.g., using Edge Function).
-- TODO: Implement Edge Function for insert/delete.
CREATE POLICY "Allow authenticated read access on liked events"
ON public.liked_events
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Block authenticated writes on liked events"
ON public.liked_events
FOR INSERT, UPDATE, DELETE -- Block writes directly from client
TO authenticated
USING (false) -- Doesn't matter much as CHECK is false
WITH CHECK (false);
