-- First, populate the clients table with data from profiles
INSERT INTO public.clients (client_id, full_name, email, password_hash)
SELECT DISTINCT 
  p.client_id,
  p.full_name,
  p.email,
  'temp_hash_' || p.client_id  -- Temporary password hash
FROM public.profiles p
WHERE p.client_id IS NOT NULL
ON CONFLICT (client_id) DO NOTHING;

-- Now add foreign key constraints to link the tables properly

-- Link profiles to clients table
ALTER TABLE public.profiles
ADD CONSTRAINT fk_profiles_client_id 
FOREIGN KEY (client_id) 
REFERENCES public.clients(client_id) 
ON DELETE CASCADE;

-- Link clientcompanies to clients table
ALTER TABLE public.clientcompanies
ADD CONSTRAINT fk_clientcompanies_client_id 
FOREIGN KEY (client_id) 
REFERENCES public.clients(client_id) 
ON DELETE CASCADE;

-- Link clientincomestatements to clientcompanies table
ALTER TABLE public.clientincomestatements
ADD CONSTRAINT fk_clientincomestatements_client_company_id 
FOREIGN KEY (client_company_id) 
REFERENCES public.clientcompanies(client_company_id) 
ON DELETE CASCADE;

-- Link clientbalancesheets to clientcompanies table
ALTER TABLE public.clientbalancesheets
ADD CONSTRAINT fk_clientbalancesheets_client_company_id 
FOREIGN KEY (client_company_id) 
REFERENCES public.clientcompanies(client_company_id) 
ON DELETE CASCADE;

-- Add RLS policies for client data tables

-- Enable RLS on clientcompanies
ALTER TABLE public.clientcompanies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own companies"
ON public.clientcompanies
FOR SELECT
USING (
  client_id IN (
    SELECT client_id FROM public.profiles WHERE id = auth.uid()
  )
);

-- Enable RLS on clientincomestatements
ALTER TABLE public.clientincomestatements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own income statements"
ON public.clientincomestatements
FOR SELECT
USING (
  client_company_id IN (
    SELECT client_company_id FROM public.clientcompanies 
    WHERE client_id IN (
      SELECT client_id FROM public.profiles WHERE id = auth.uid()
    )
  )
);

-- Enable RLS on clientbalancesheets
ALTER TABLE public.clientbalancesheets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own balance sheets"
ON public.clientbalancesheets
FOR SELECT
USING (
  client_company_id IN (
    SELECT client_company_id FROM public.clientcompanies 
    WHERE client_id IN (
      SELECT client_id FROM public.profiles WHERE id = auth.uid()
    )
  )
);