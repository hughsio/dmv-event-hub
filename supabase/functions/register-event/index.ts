// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts"


import { serve } from 'https://deno.land/std@0.218.0/http/server.ts';
// Import Supabase using the npm: specifier directly
import { createClient } from 'npm:@supabase/supabase-js@^2.30';
import { createClerkClient } from 'npm:@clerk/backend@^0.35';
import cors from 'https://deno.land/x/cors@v1.2.2/mod.ts'; // Use direct URL for CORS

// Load Clerk Secret Key from environment variables
const clerkSecretKey = Deno.env.get('CLERK_SECRET_KEY');
if (!clerkSecretKey) {
  throw new Error('CLERK_SECRET_KEY environment variable is not set.');
}

// Initialize Clerk client
// Note: Using the Node SDK in Deno might require specific instantiation patterns or polyfills.
// This assumes basic compatibility holds.
const clerkClient = createClerkClient({ secretKey: clerkSecretKey });

console.log('Register Event function initialized');

serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    return cors(req, new Response(null, { status: 204 })); // Respond to OPTIONS requests
  }

  try {
    console.log('Received request:', req.method, req.url);

    // 1. Extract Event ID from request body
    const { eventId } = await req.json();
    if (!eventId) {
      throw new Error('Missing eventId in request body');
    }
    console.log(`Processing registration for eventId: ${eventId}`);

    // 2. Extract and Verify Clerk Token from Authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new Error('Missing or invalid Authorization header');
    }
    const sessionToken = authHeader.substring(7); // Remove 'Bearer '
    console.log('Verifying session token...');

    // Verify the token using Clerk SDK
    // Note: Adjust based on the exact method provided by @clerk/backend
    const claims = await clerkClient.verifyToken(sessionToken);
    const userId = claims.sub; // Standard JWT subject claim for user ID

    if (!userId) {
      throw new Error('Could not extract user ID from token claims.');
    }
    console.log(`Token verified for userId: ${userId}`);

    // 3. Create Supabase Admin Client (uses Service Role Key)
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Supabase URL or Service Role Key environment variable is not set.');
    }

    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        // Required for service role client
        autoRefreshToken: false,
        persistSession: false
      }
    });
    console.log('Supabase admin client created.');

    // 4. Insert registration into Supabase
    console.log(`Attempting to insert registration: user_id=${userId}, event_id=${eventId}`);
    const { data, error } = await supabaseAdmin
      .from('registrations')
      .insert([{ user_id: userId, event_id: eventId }])
      .select() // Optionally select the inserted row to confirm
      .single(); // Expecting a single row or null

    if (error) {
       // Handle potential unique constraint violation (already registered)
       if (error.code === '23505') { 
         console.warn(`User ${userId} already registered for event ${eventId}.`);
         // Still return success as the desired state (registered) is achieved
         return cors(req, new Response(JSON.stringify({ success: true, message: 'Already registered' }), {
           headers: { 'Content-Type': 'application/json' },
           status: 200, 
         }));
       } else {
         // Handle other database errors
         console.error('Supabase insert error:', error);
         throw new Error(`Supabase error: ${error.message}`);
       }
    }

    console.log('Registration successful:', data);
    // 5. Return success response
    return cors(req, new Response(JSON.stringify({ success: true, registration: data }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    }));

  } catch (err) {
    console.error('Error in function execution:', err);
    // Return error response
    // Use CORS middleware for error responses too
    const errorResponse = new Response(JSON.stringify({ error: err.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: err.message.includes('Authorization') || err.message.includes('extract user ID') ? 401 : 400, // Use 401 for auth errors
    });
    return cors(req, errorResponse);
  }
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/register-event' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
