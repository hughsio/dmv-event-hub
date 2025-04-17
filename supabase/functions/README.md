# Supabase Edge Functions

This directory contains Edge Functions for Supabase that handle custom functionality beyond the built-in services.

## CORS Edge Function

The `cors` directory contains a CORS proxy function that allows cross-origin requests to your Supabase database. This is useful when the built-in CORS settings in the Supabase dashboard aren't working as expected.

### Deployment Steps

1. **Install Supabase CLI** (if not already installed):
   ```bash
   npm install -g supabase
   ```

2. **Login to Supabase CLI**:
   ```bash
   supabase login
   ```

3. **Link your project** (replace `your-project-ref` with your actual project reference ID):
   ```bash
   supabase link --project-ref your-project-ref
   ```

4. **Deploy the CORS function**:
   ```bash
   supabase functions deploy cors
   ```

5. **Make the function public** (so it doesn't require authentication):
   ```bash
   supabase functions update-config cors --no-verify-jwt
   ```

### Usage

Once deployed, your edge function will be available at:
```
https://[YOUR_PROJECT_REF].supabase.co/functions/v1/cors
```

You can use it as a proxy by passing the target URL as a parameter:
```
https://[YOUR_PROJECT_REF].supabase.co/functions/v1/cors?url=https://api.example.com/data
```

### Configuring Allowed Origins

Edit the `cors/index.ts` file to add your application domains to the `ALLOWED_ORIGINS` array:

```typescript
const ALLOWED_ORIGINS = [
  "http://localhost:5173",
  "https://your-production-domain.com", // Add your domains here
];
```

After making changes, redeploy the function:
```bash
supabase functions deploy cors
```

## Alternative: Direct CORS Configuration

Instead of using an Edge Function, you can also configure CORS directly in the Supabase dashboard:

1. Go to your Supabase project dashboard
2. Navigate to Settings > API > CORS
3. Add your application URLs to the "Additional allowed origins" field
4. Click "Save"

This approach is simpler but sometimes doesn't work for all use cases, which is why the Edge Function option is provided. 