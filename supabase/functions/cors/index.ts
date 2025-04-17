// Follow this setup guide to integrate the Deno runtime into your application:
// https://deno.land/manual/examples/deploy_node_app
// This is a Supabase Edge Function that serves as a CORS proxy
// to allow cross-origin requests to your Supabase database
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
// Configure allowed origins
const ALLOWED_ORIGINS = [
  // Add your application URLs here
  "http://localhost:5173",
  "http://localhost:3000"
];
// Respond to OPTIONS requests (CORS preflight)
const handleOptions = (req)=>{
  const origin = req.headers.get("Origin") || "";
  // Check if the origin is allowed
  if (ALLOWED_ORIGINS.includes(origin) || ALLOWED_ORIGINS.includes("*")) {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
        "Access-Control-Max-Age": "86400"
      }
    });
  }
  // Origin not allowed
  return new Response("Not allowed", {
    status: 403
  });
};
// Handle actual request
const handleRequest = async (req)=>{
  const origin = req.headers.get("Origin") || "";
  // Check if the origin is allowed
  if (!ALLOWED_ORIGINS.includes(origin) && !ALLOWED_ORIGINS.includes("*")) {
    return new Response("Not allowed", {
      status: 403
    });
  }
  // Get the URL parameters
  const url = new URL(req.url);
  const target = url.searchParams.get("url");
  if (!target) {
    return new Response("Missing 'url' parameter", {
      status: 400
    });
  }
  try {
    // Forward the request to the target URL
    const response = await fetch(target, {
      method: req.method,
      headers: req.headers,
      body: req.body ? req.body : undefined
    });
    // Create a new response with CORS headers
    const newResponse = new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers
    });
    // Add CORS headers
    newResponse.headers.set("Access-Control-Allow-Origin", origin);
    return newResponse;
  } catch (error) {
    return new Response(`Error: ${error.message}`, {
      status: 500
    });
  }
};
// Main handler function for all requests
serve(async (req)=>{
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return handleOptions(req);
  }
  // Handle actual requests
  return handleRequest(req);
});
