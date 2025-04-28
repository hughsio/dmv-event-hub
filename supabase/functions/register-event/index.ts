// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts"

import { serve } from 'https://deno.land/std@0.218.0/http/server.ts';
import { createClient } from 'npm:@supabase/supabase-js@^2.30';
import { createClerkClient } from 'npm:@clerk/clerk-sdk-node@^4'; 
import * as cors from 'https://deno.land/x/cors@v1.2.2/mod.ts'; 

// Load Clerk Secret Key from environment variables
const clerkSecretKey = Deno.env.get('CLERK_SECRET_KEY');
if (!clerkSecretKey) {
  throw new Error('CLERK_SECRET_KEY environment variable is not set.');
}

// Initialize Clerk client using createClerkClient
const clerkClient = createClerkClient({ secretKey: clerkSecretKey });

console.log('Register Event function initialized');

// Define reusable CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': 'http://localhost:8080', // Or specify your frontend origin e.g. 'http://localhost:8080'
  'Access-Control-Allow-Methods': 'POST, OPTIONS', // Allow POST and OPTIONS
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type', // Crucial headers used by Supabase client
};

serve(async (req) => {
  // Handle CORS preflight request manually
  if (req.method === 'OPTIONS') {
    console.log('Handling OPTIONS request');
    return new Response(null, { 
      status: 204, // No Content
      headers: corsHeaders 
    }); 
  }

  try {
    console.log('Received request:', req.method, req.url);
    const headers = Object.fromEntries(req.headers.entries());
    console.log('Request Headers:', headers);
    
    // Check Content-Type first
    const contentType = headers['content-type'] || '';
    if (!contentType.includes('application/json')) {
      console.warn(`Unexpected Content-Type: ${contentType}`);
    }

    // Parse body
    let body;
    try {
      const rawText = await req.text();
      console.log('Raw request body text:', rawText);
      
      try {
        // Try parsing the raw text
        body = JSON.parse(rawText);
        console.log('Body parsed manually from text:', body);
      } catch (parseErr) {
        console.error('Failed to parse raw text:', parseErr);
        throw new Error('Failed to parse request body as JSON');
      }
    } catch (textErr) {
      console.error('Failed to read request as text:', textErr);
      throw new Error('Failed to read request body');
    }
    
    const eventId = body?.eventId;
    if (!eventId) {
      throw new Error('Missing eventId in request body');
    }
    console.log(`Processing registration for eventId: ${eventId}`);

    // Extract and Verify Clerk Token
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new Error('Missing or invalid Authorization header');
    }

    const sessionToken = authHeader.substring(7); // Remove 'Bearer '
    console.log('Token length:', sessionToken.length);
    console.log('Token prefix:', sessionToken.substring(0, 10) + '...');

    // Declare userId outside the try block so it's available in the wider scope
    let userId: string;
    try {
      // Try/catch with more detailed logging
      console.log('Calling clerkClient.verifyToken...');
      
      // Verify the token using Clerk SDK
      const claims = await clerkClient.verifyToken(sessionToken);
      console.log('Token verified with claims structure:', Object.keys(claims));
      
      // Check for the subject claim 
      userId = claims.sub;
      if (!userId) {
        throw new Error('Could not extract user ID from token claims.');
      }
      console.log(`Token verified for userId: ${userId}`);
    } catch (clerkError) {
      console.error('Clerk verification error details:', 
                   clerkError instanceof Error 
                     ? { message: clerkError.message, name: clerkError.name } 
                     : 'Unknown error type');
      throw new Error(`Authentication failed: ${clerkError instanceof Error ? clerkError.message : 'Unknown error'}`);
    }

    // Create Supabase Admin Client (uses Service Role Key)
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

    // Insert registration into Supabase
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
         return new Response(JSON.stringify({ success: true, message: 'Already registered' }), {
           headers: { ...corsHeaders, 'Content-Type': 'application/json' },
           status: 200, 
         });
       } else {
         // Handle other database errors
         console.error('Database error:', error);
         throw new Error(`Database error: ${error.message}`);
       }
    }

    console.log('Registration successful:', data);
    // Return success response with CORS headers
    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Registration successful',
      data: data
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200
    });

  } catch (err) {
    // Improved error logging
    console.error('Error in function execution:', err);
    const errorStatus = 
      err instanceof Error && (
        err.message?.includes('Authorization') || 
        err.message?.includes('Authentication') ||
        err.message?.includes('extract user ID')
      ) ? 401 : (
        err instanceof Error && err.message?.includes('Missing eventId') ? 400 : 500
      );
      
    // Return error response with CORS headers
    return new Response(JSON.stringify({ 
      error: err instanceof Error ? err.message : 'Unknown error'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: errorStatus
    });
  }
}); 