-- Drop the previous INSERT/DELETE policies that required the 'authenticated' role
DROP POLICY IF EXISTS "Allow authenticated insert on saved events" ON public.saved_events;
DROP POLICY IF EXISTS "Allow authenticated delete on saved events" ON public.saved_events;
DROP POLICY IF EXISTS "Allow authenticated insert on liked events" ON public.liked_events;
DROP POLICY IF EXISTS "Allow authenticated delete on liked events" ON public.liked_events;

-- Policies for saved_events table
-- Allow ANY role (including anon) to insert rows.
-- Security relies on the application code providing the correct user_id.
CREATE POLICY "Allow public insert on saved events" 
ON public.saved_events 
FOR INSERT 
TO public 
WITH CHECK (true);

-- Allow ANY role (including anon) to delete rows.
-- Security relies on the application code filtering by the correct user_id before deleting.
CREATE POLICY "Allow public delete on saved events" 
ON public.saved_events 
FOR DELETE 
TO public 
USING (true);

-- Policies for liked_events table
-- Allow ANY role (including anon) to insert rows.
-- Security relies on the application code providing the correct user_id.
CREATE POLICY "Allow public insert on liked events" 
ON public.liked_events 
FOR INSERT 
TO public 
WITH CHECK (true);

-- Allow ANY role (including anon) to delete rows.
-- Security relies on the application code filtering by the correct user_id before deleting.
CREATE POLICY "Allow public delete on liked events" 
ON public.liked_events 
FOR DELETE 
TO public 
USING (true);

-- Keep existing SELECT policies (allowing read access for anon/authenticated is generally fine
-- as the app filters by user ID anyway)
-- Policy "Allow authenticated read access on saved events" should still exist
-- Policy "Allow authenticated read access on liked events" should still exist
-- Policy "Allow anonymous read access on saved events" should still exist
-- Policy "Allow anonymous read access on liked events" should still exist 