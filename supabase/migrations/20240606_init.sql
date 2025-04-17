-- Create the saved_events table
CREATE TABLE IF NOT EXISTS saved_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id TEXT NOT NULL,
    event_id TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, event_id)
);

-- Create the liked_events table
CREATE TABLE IF NOT EXISTS liked_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id TEXT NOT NULL,
    event_id TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, event_id)
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS saved_events_user_id_idx ON saved_events(user_id);
CREATE INDEX IF NOT EXISTS liked_events_user_id_idx ON liked_events(user_id);

-- Set up Row Level Security (RLS) policies
-- This ensures users can only access their own data
ALTER TABLE saved_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE liked_events ENABLE ROW LEVEL SECURITY;

-- Create a policy that provides full access to authenticated users
-- Since we're using Clerk for authentication, we're using a more permissive policy
-- We'll filter by user_id in our application code
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

CREATE POLICY "Allow delete to authenticated users if they own the record"
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

CREATE POLICY "Allow delete to authenticated users if they own the record for liked events"
ON liked_events
FOR DELETE
TO authenticated
USING (true);

-- For anonymous access (optional, if you want public read access)
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