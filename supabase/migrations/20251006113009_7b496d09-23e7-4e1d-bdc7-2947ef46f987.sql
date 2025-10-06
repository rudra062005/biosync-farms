-- Fix security issue: Remove anonymous access to chat messages

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view their own messages" ON public.chat_messages;
DROP POLICY IF EXISTS "Users can insert their own messages" ON public.chat_messages;

-- Make user_id NOT NULL to prevent future NULL values
ALTER TABLE public.chat_messages 
ALTER COLUMN user_id SET NOT NULL;

-- Create new secure policies that require authentication
CREATE POLICY "Users can view their own messages" 
ON public.chat_messages 
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own messages" 
ON public.chat_messages 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = user_id);