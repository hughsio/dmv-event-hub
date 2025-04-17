# Setting Up Supabase for DMV Event Hub

This guide will help you set up Supabase for storing user events data.

## Steps to Set Up Supabase

1. **Create a Supabase Account**
   - Go to [Supabase](https://supabase.com/) and sign up for an account if you don't have one
   - Create a new project with a name like "dmv-event-hub"

2. **Get Your API Keys**
   - In your Supabase project dashboard, go to Settings > API
   - Copy the `URL` and `anon` key
   - Add these to your `.env` file:
     ```
     VITE_SUPABASE_URL=your_supabase_url
     VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```

3. **Set Up the Database Tables**
   - Go to the SQL Editor in your Supabase dashboard
   - Create a new query
   - Copy and paste the contents of `supabase/migrations/20240606_init.sql`
   - Run the SQL query

4. **Fix RLS Policies for Clerk Integration**
   - If you encounter issues with Row Level Security (RLS) policies:
   - Go to the SQL Editor in your Supabase dashboard
   - Create a new query
   - Copy and paste the contents of `supabase/migrations/20240609_simplify_rls.sql` 
   - Run the SQL query
   - This will create simpler RLS policies that should fix any 400 errors

## Fixing the 400 Error

If you're seeing a 400 error in the console related to Supabase, it's likely due to one of these issues:

1. **Authentication conflicts**: Supabase's auth system is trying to refresh a token that doesn't exist since we're using Clerk
   - Our fix: We've disabled auto token refresh and session persistence in the Supabase client

2. **RLS policy conflicts**: Supabase's Row Level Security is blocking the requests
   - Our fix: We've created more permissive RLS policies that allow all operations

3. **CORS issues**: Your browser is blocking cross-origin requests
   - Fix: Add your application domain to the allowed origins in Supabase settings

To resolve this issue, make sure you:
- Run the latest SQL migration (`20240609_simplify_rls.sql`)
- Use the updated Supabase client from our code (with auth auto-refresh disabled)
- Configure CORS settings in Supabase dashboard

## Clerk and Supabase Integration

Since we're using Clerk for authentication and Supabase for data storage, we need to:

1. **Use Clerk's user ID in Supabase tables**
   - We store Clerk's user ID in the `user_id` column of Supabase tables
   - We filter data by user ID in our application code
   - We use RLS policies that allow authenticated users to access the tables

2. **For advanced JWT integration (optional)**
   - Generate a Supabase JWT template in Clerk
   - Configure Clerk to generate JWTs that Supabase can validate
   - Update the Supabase client to use these JWTs
   - This enables true row-level security based on the authenticated user

## Testing the Setup

1. Sign in to your application using Clerk
2. Try to save or like an event
3. Go to your Supabase Dashboard > Table Editor
4. Check the `saved_events` and `liked_events` tables to confirm data is being stored

## Troubleshooting

- **"Failed to fetch your saved events" error**:
  - This usually means the RLS policies are preventing access
  - Run the `20240609_simplify_rls.sql` migration to fix this
  - Check the browser console for more specific error messages

- **Supabase 400 error**:
  - This is likely related to auth conflicts between Clerk and Supabase
  - Our updated code should fix this by disabling Supabase's auth auto-refresh

- **CORS errors**: 
  - Make sure your Supabase project has your app's URL in the allowed origins
  - Go to Settings > API > CORS > Add your frontend URL

- **Authentication issues**: 
  - Check that you're using the correct API keys
  - Make sure Clerk is properly initialized

- **Database errors**: 
  - Verify that the tables were created correctly
  - Check the RLS policies in the Supabase dashboard

## Security Considerations for Production

For a production environment, you should consider:

1. **Implementing proper RLS policies** based on user authentication
2. **Setting up proper JWT verification** between Clerk and Supabase
3. **Data validation** on both client and server sides
4. **Regular security audits** of your database and access patterns

## Next Steps

- Consider adding more tables for storing user-created events
- Set up PostgreSQL triggers for event-driven operations
- Implement full-text search for events using Supabase's search capabilities 