-- Add INSERT and UPDATE policies for client financial data tables

-- clientincomestatements INSERT policy
CREATE POLICY "Users can insert their own income statements"
ON public.clientincomestatements
FOR INSERT
WITH CHECK (
  client_company_id IN (
    SELECT client_company_id FROM public.clientcompanies 
    WHERE client_id IN (
      SELECT client_id FROM public.profiles WHERE id = auth.uid()
    )
  )
);

-- clientincomestatements UPDATE policy
CREATE POLICY "Users can update their own income statements"
ON public.clientincomestatements
FOR UPDATE
USING (
  client_company_id IN (
    SELECT client_company_id FROM public.clientcompanies 
    WHERE client_id IN (
      SELECT client_id FROM public.profiles WHERE id = auth.uid()
    )
  )
);

-- clientbalancesheets INSERT policy
CREATE POLICY "Users can insert their own balance sheets"
ON public.clientbalancesheets
FOR INSERT
WITH CHECK (
  client_company_id IN (
    SELECT client_company_id FROM public.clientcompanies 
    WHERE client_id IN (
      SELECT client_id FROM public.profiles WHERE id = auth.uid()
    )
  )
);

-- clientbalancesheets UPDATE policy
CREATE POLICY "Users can update their own balance sheets"
ON public.clientbalancesheets
FOR UPDATE
USING (
  client_company_id IN (
    SELECT client_company_id FROM public.clientcompanies 
    WHERE client_id IN (
      SELECT client_id FROM public.profiles WHERE id = auth.uid()
    )
  )
);