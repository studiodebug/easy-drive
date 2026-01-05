-- Enable RLS policy for users table
-- Users can read their own data

CREATE POLICY "Users can read their own data" 
ON public.users 
FOR SELECT 
USING (auth.uid() = id);

