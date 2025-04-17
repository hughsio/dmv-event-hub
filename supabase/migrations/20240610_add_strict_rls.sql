-- Drop the overly permissive policies first
DROP POLICY IF EXISTS "Allow all operations for everyone on saved events" ON public.saved_events;
DROP POLICY IF EXISTS "Allow all operations for everyone on liked events" ON public.liked_events;

-- Re-enable Row Level Security if it was disabled for debugging
-- (Uncomment the lines below if you previously ran DISABLE ROW LEVEL SECURITY)
-- ALTER TABLE public.saved_events ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.liked_events ENABLE ROW LEVEL SECURITY;

-- Policies for saved_events table
-- Allow authenticated users to read all rows (filtering happens in application code)
CREATE POLICY "Allow authenticated read access on saved events" 
ON public.saved_events 
FOR SELECT 
TO authenticated 
USING (true);

-- Allow authenticated users to insert rows (application code provides user_id)
CREATE POLICY "Allow authenticated insert on saved events" 
ON public.saved_events 
FOR INSERT 
TO authenticated 
WITH CHECK (true);

-- Allow authenticated users to delete rows (application code matches user_id)
CREATE POLICY "Allow authenticated delete on saved events" 
ON public.saved_events 
FOR DELETE 
TO authenticated 
USING (true);

-- Policies for liked_events table
-- Allow authenticated users to read all rows (filtering happens in application code)
CREATE POLICY "Allow authenticated read access on liked events" 
ON public.liked_events 
FOR SELECT 
TO authenticated 
USING (true);

-- Allow authenticated users to insert rows (application code provides user_id)
CREATE POLICY "Allow authenticated insert on liked events" 
ON public.liked_events 
FOR INSERT 
TO authenticated 
WITH CHECK (true);

-- Allow authenticated users to delete rows (application code matches user_id)
CREATE POLICY "Allow authenticated delete on liked events" 
ON public.liked_events 
FOR DELETE 
TO authenticated 
USING (true);

-- Optional: Keep anonymous read access if needed (e.g., for public event pages showing like counts)
-- If you don't need anonymous reads, you can remove these two policies.
CREATE POLICY "Allow anonymous read access on saved events" 
ON public.saved_events 
FOR SELECT 
TO anon 
USING (true);

CREATE POLICY "Allow anonymous read access on liked events" 
ON public.liked_events 
FOR SELECT 
TO anon 
USING (true); 