-- Add INSERT and UPDATE policies for clientcompanies table

-- Allow users to insert their own companies
CREATE POLICY "Users can insert their own companies"
ON public.clientcompanies
FOR INSERT
WITH CHECK (
  client_id IN (
    SELECT client_id FROM public.profiles WHERE id = auth.uid()
  )
);

-- Allow users to update their own companies
CREATE POLICY "Users can update their own companies"
ON public.clientcompanies
FOR UPDATE
USING (
  client_id IN (
    SELECT client_id FROM public.profiles WHERE id = auth.uid()
  )
);