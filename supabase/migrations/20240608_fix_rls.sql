-- First, drop existing policies if they exist
DROP POLICY IF EXISTS "Users can only CRUD their own saved events" ON saved_events;
DROP POLICY IF EXISTS "Users can only CRUD their own liked events" ON liked_events;

-- Create new policies for saved_events that work with Clerk auth integration
CREATE POLICY "Allow read access to all authenticated users"
ON saved_events
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Allow insert to all authenticated users"
ON saved_events
FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Allow delete to authenticated users"
ON saved_events
FOR DELETE
TO authenticated
USING (true);

-- Similar policies for liked_events
CREATE POLICY "Allow read access to all authenticated users for liked events"
ON liked_events
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Allow insert to all authenticated users for liked events"
ON liked_events
FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Allow delete to authenticated users for liked events"
ON liked_events
FOR DELETE
TO authenticated
USING (true);

-- For anonymous access (for better compatibility with Clerk)
CREATE POLICY "Allow anonymous read access"
ON saved_events
FOR SELECT
TO anon
USING (true);

CREATE POLICY "Allow anonymous read access for liked events"
ON liked_events
FOR SELECT
TO anon
USING (true); 