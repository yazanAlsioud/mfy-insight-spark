-- Create table to track file uploads
CREATE TABLE public.file_uploads (
  upload_id SERIAL PRIMARY KEY,
  client_company_id INTEGER NOT NULL,
  filename VARCHAR(255) NOT NULL,
  file_type VARCHAR(50) NOT NULL,
  file_size INTEGER,
  upload_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status VARCHAR(50) DEFAULT 'processing',
  records_count INTEGER DEFAULT 0,
  error_message TEXT,
  CONSTRAINT fk_file_uploads_client_company_id 
    FOREIGN KEY (client_company_id) 
    REFERENCES public.clientcompanies(client_company_id) 
    ON DELETE CASCADE
);

-- Enable RLS
ALTER TABLE public.file_uploads ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own uploads"
ON public.file_uploads
FOR SELECT
USING (
  client_company_id IN (
    SELECT client_company_id FROM public.clientcompanies 
    WHERE client_id IN (
      SELECT client_id FROM public.profiles WHERE id = auth.uid()
    )
  )
);

CREATE POLICY "Users can insert their own uploads"
ON public.file_uploads
FOR INSERT
WITH CHECK (
  client_company_id IN (
    SELECT client_company_id FROM public.clientcompanies 
    WHERE client_id IN (
      SELECT client_id FROM public.profiles WHERE id = auth.uid()
    )
  )
);

CREATE POLICY "Users can update their own uploads"
ON public.file_uploads
FOR UPDATE
USING (
  client_company_id IN (
    SELECT client_company_id FROM public.clientcompanies 
    WHERE client_id IN (
      SELECT client_id FROM public.profiles WHERE id = auth.uid()
    )
  )
);

CREATE POLICY "Users can delete their own uploads"
ON public.file_uploads
FOR DELETE
USING (
  client_company_id IN (
    SELECT client_company_id FROM public.clientcompanies 
    WHERE client_id IN (
      SELECT client_id FROM public.profiles WHERE id = auth.uid()
    )
  )
);