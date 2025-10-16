import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface KPI {
  kpi_id: number;
  metric_name: string;
  description: string;
  target_value: number;
  current_value: number;
  target_date: string;
}

export function useKPIs() {
  const [kpis, setKpis] = useState<KPI[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchKPIs() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          setLoading(false);
          return;
        }

        const { data: profile } = await supabase
          .from("profiles")
          .select("client_id")
          .eq("id", user.id)
          .single();

        if (!profile?.client_id) {
          setLoading(false);
          return;
        }

        const { data: companies } = await supabase
          .from("clientcompanies")
          .select("client_company_id")
          .eq("client_id", profile.client_id)
          .limit(1);

        if (!companies || companies.length === 0) {
          setLoading(false);
          return;
        }

        const { data: kpisData, error } = await supabase
          .from("kpis")
          .select("*")
          .eq("client_company_id", companies[0].client_company_id)
          .order("created_at", { ascending: false })
          .limit(3);

        if (error) throw error;
        setKpis(kpisData || []);
      } catch (error) {
        console.error("Error fetching KPIs:", error);
        toast({
          title: "Error loading KPIs",
          description: "Unable to load your KPIs",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }

    fetchKPIs();
  }, [toast]);

  return { kpis, loading };
}
