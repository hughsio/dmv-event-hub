-- Drop all existing policies
DROP POLICY IF EXISTS "Users can only CRUD their own saved events" ON saved_events;
DROP POLICY IF EXISTS "Users can only CRUD their own liked events" ON liked_events;
DROP POLICY IF EXISTS "Allow read access to all authenticated users" ON saved_events;
DROP POLICY IF EXISTS "Allow insert to all authenticated users" ON saved_events;
DROP POLICY IF EXISTS "Allow delete to authenticated users" ON saved_events;
DROP POLICY IF EXISTS "Allow read access to all authenticated users for liked events" ON liked_events;
DROP POLICY IF EXISTS "Allow insert to all authenticated users for liked events" ON liked_events;
DROP POLICY IF EXISTS "Allow delete to authenticated users for liked events" ON liked_events;
DROP POLICY IF EXISTS "Allow anonymous read access" ON saved_events;
DROP POLICY IF EXISTS "Allow anonymous read access for liked events" ON liked_events;

-- Simplify by creating a single policy for each table that allows all operations to everyone
-- This is generally NOT recommended for production use, but will help diagnose if RLS is causing the 400 errors
CREATE POLICY "Allow all operations for everyone on saved events" 
ON saved_events 
FOR ALL 
TO public 
USING (true);

CREATE POLICY "Allow all operations for everyone on liked events" 
ON liked_events 
FOR ALL 
TO public 
USING (true);

-- If above doesn't work, you can temporarily disable RLS completely as a test
-- This is ONLY for debugging and should not be used in production
-- ALTER TABLE saved_events DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE liked_events DISABLE ROW LEVEL SECURITY; 