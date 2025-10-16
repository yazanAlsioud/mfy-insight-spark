-- Enable RLS on all remaining public tables

-- Enable RLS on clients table (contains sensitive user data)
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;

-- Clients can only view their own record
CREATE POLICY "Users can view their own client record"
ON public.clients
FOR SELECT
USING (
  client_id IN (
    SELECT client_id FROM public.profiles WHERE id = auth.uid()
  )
);

-- Enable RLS on market data tables (public benchmark data - readable by authenticated users)
ALTER TABLE public.balancesheets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.incomestatements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saudimarketcompanies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sectors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.performancebenchmarks ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to read public market benchmark data
CREATE POLICY "Authenticated users can view balance sheets"
ON public.balancesheets
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can view income statements"
ON public.incomestatements
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can view Saudi market companies"
ON public.saudimarketcompanies
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can view sectors"
ON public.sectors
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can view performance benchmarks"
ON public.performancebenchmarks
FOR SELECT
TO authenticated
USING (true);