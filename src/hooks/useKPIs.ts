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

        const companyId = companies[0].client_company_id;

        // Fetch KPIs
        const { data: kpisData, error: kpisError } = await supabase
          .from("kpis")
          .select("*")
          .eq("client_company_id", companyId)
          .order("created_at", { ascending: false })
          .limit(3);

        if (kpisError) throw kpisError;

        if (!kpisData || kpisData.length === 0) {
          setKpis([]);
          setLoading(false);
          return;
        }

        // Fetch financial data for calculations
        const { data: incomeStatements } = await supabase
          .from("clientincomestatements")
          .select("*")
          .eq("client_company_id", companyId)
          .order("year", { ascending: false })
          .order("quarter", { ascending: false })
          .limit(4); // Get last 4 quarters for growth calculations

        const { data: balanceSheets } = await supabase
          .from("clientbalancesheets")
          .select("*")
          .eq("client_company_id", companyId)
          .order("year", { ascending: false })
          .order("quarter", { ascending: false })
          .limit(2);

        // Calculate current values for each KPI
        const kpisWithValues = kpisData.map((kpi) => {
          let currentValue = 0;

          if (incomeStatements && incomeStatements.length > 0 && balanceSheets && balanceSheets.length > 0) {
            const latest = incomeStatements[0];
            const previous = incomeStatements[1];
            const latestBS = balanceSheets[0];

            const revenue = Number(latest.total_revenue) || 0;
            const netIncome = Number(latest.net_income_common_stockholders) || 0;
            const totalAssets = Number(latestBS.total_assets) || 0;
            const totalDebt = Number(latestBS.total_debt) || 0;
            const stockholdersEquity = Number(latestBS.stockholders_equity) || 0;
            const currentAssets = Number(latestBS.current_assets) || 0;
            const currentLiabilities = Number(latestBS.current_liabilities) || 0;
            const grossProfit = Number(latest.gross_profit) || 0;
            const operatingExpenses = Number(latest.operating_expense) || 0;

            switch (kpi.metric_name) {
              case "revenue_growth":
                if (previous) {
                  const prevRevenue = Number(previous.total_revenue) || 0;
                  currentValue = prevRevenue > 0 ? ((revenue - prevRevenue) / prevRevenue) * 100 : 0;
                }
                break;

              case "profit_margin":
                currentValue = revenue > 0 ? (netIncome / revenue) * 100 : 0;
                break;

              case "operating_expenses":
                if (previous) {
                  const prevExpenses = Number(previous.operating_expense) || 0;
                  currentValue = prevExpenses > 0 ? ((operatingExpenses - prevExpenses) / prevExpenses) * 100 : 0;
                }
                break;

              case "net_income":
                if (previous) {
                  const prevNetIncome = Number(previous.net_income_common_stockholders) || 0;
                  currentValue = prevNetIncome > 0 ? ((netIncome - prevNetIncome) / prevNetIncome) * 100 : 0;
                }
                break;

              case "roa":
                currentValue = totalAssets > 0 ? (netIncome / totalAssets) * 100 : 0;
                break;

              case "current_ratio":
                currentValue = currentLiabilities > 0 ? currentAssets / currentLiabilities : 0;
                break;

              case "debt_to_equity":
                currentValue = stockholdersEquity > 0 ? totalDebt / stockholdersEquity : 0;
                break;

              case "gross_margin":
                currentValue = revenue > 0 ? (grossProfit / revenue) * 100 : 0;
                break;

              default:
                currentValue = 0;
            }
          }

          return {
            ...kpi,
            current_value: currentValue,
          };
        });

        setKpis(kpisWithValues);
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
