-- Fix PUBLIC_DATA_EXPOSURE: Restrict profile visibility to authenticated users only
DROP POLICY IF EXISTS "Anyone can view profiles" ON public.profiles;

CREATE POLICY "Authenticated users can view profiles"
ON public.profiles
FOR SELECT
TO authenticated
USING (true);

-- Fix MISSING_RLS: Add UPDATE policy for profiles (defense-in-depth)
CREATE POLICY "Users can update own profile"
ON public.profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);