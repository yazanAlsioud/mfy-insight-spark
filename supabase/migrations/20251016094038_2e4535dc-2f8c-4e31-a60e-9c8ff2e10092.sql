-- Create KPIs table to store client key performance indicators
CREATE TABLE public.kpis (
  kpi_id SERIAL PRIMARY KEY,
  client_company_id INTEGER NOT NULL,
  metric_name VARCHAR(255) NOT NULL,
  description TEXT,
  target_value NUMERIC NOT NULL,
  current_value NUMERIC,
  target_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT fk_kpis_client_company_id 
    FOREIGN KEY (client_company_id) 
    REFERENCES public.clientcompanies(client_company_id) 
    ON DELETE CASCADE
);

-- Enable RLS
ALTER TABLE public.kpis ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Users can view their own KPIs
CREATE POLICY "Users can view their own KPIs"
ON public.kpis
FOR SELECT
USING (
  client_company_id IN (
    SELECT client_company_id FROM public.clientcompanies 
    WHERE client_id IN (
      SELECT client_id FROM public.profiles WHERE id = auth.uid()
    )
  )
);

-- RLS Policy: Users can insert their own KPIs
CREATE POLICY "Users can insert their own KPIs"
ON public.kpis
FOR INSERT
WITH CHECK (
  client_company_id IN (
    SELECT client_company_id FROM public.clientcompanies 
    WHERE client_id IN (
      SELECT client_id FROM public.profiles WHERE id = auth.uid()
    )
  )
);

-- RLS Policy: Users can update their own KPIs
CREATE POLICY "Users can update their own KPIs"
ON public.kpis
FOR UPDATE
USING (
  client_company_id IN (
    SELECT client_company_id FROM public.clientcompanies 
    WHERE client_id IN (
      SELECT client_id FROM public.profiles WHERE id = auth.uid()
    )
  )
);

-- RLS Policy: Users can delete their own KPIs
CREATE POLICY "Users can delete their own KPIs"
ON public.kpis
FOR DELETE
USING (
  client_company_id IN (
    SELECT client_company_id FROM public.clientcompanies 
    WHERE client_id IN (
      SELECT client_id FROM public.profiles WHERE id = auth.uid()
    )
  )
);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_kpis_updated_at
BEFORE UPDATE ON public.kpis
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();