import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface FinancialMetrics {
  totalRevenue: number;
  netIncome: number;
  operatingExpenses: number;
  profitMargin: number;
  revenueChange: number;
  netIncomeChange: number;
  expenseChange: number;
  marginChange: number;
}

export function useFinancialData() {
  const [metrics, setMetrics] = useState<FinancialMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchFinancialData() {
      try {
        // Get current user profile
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          setLoading(false);
          return;
        }

        // Get user's profile with client_id
        const { data: profile } = await supabase
          .from("profiles")
          .select("client_id")
          .eq("id", user.id)
          .single();

        if (!profile?.client_id) {
          setLoading(false);
          return;
        }

        // Get client's companies
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

        // Get latest income statements (current and previous year for comparison)
        const { data: incomeStatements } = await supabase
          .from("clientincomestatements")
          .select("*")
          .eq("client_company_id", companyId)
          .order("year", { ascending: false })
          .limit(2);

        if (!incomeStatements || incomeStatements.length === 0) {
          setLoading(false);
          return;
        }

        const current = incomeStatements[0];
        const previous = incomeStatements.length > 1 ? incomeStatements[1] : null;

        // Calculate metrics
        const totalRevenue = Number(current.total_revenue) || 0;
        const netIncome = Number(current.net_income_common_stockholders) || 0;
        const operatingExpenses = Number(current.operating_expense) || 0;
        const profitMargin = totalRevenue > 0 ? (netIncome / totalRevenue) * 100 : 0;

        // Calculate changes from previous period
        let revenueChange = 0;
        let netIncomeChange = 0;
        let expenseChange = 0;
        let marginChange = 0;

        if (previous) {
          const prevRevenue = Number(previous.total_revenue) || 0;
          const prevNetIncome = Number(previous.net_income_common_stockholders) || 0;
          const prevExpenses = Number(previous.operating_expense) || 0;
          const prevMargin = prevRevenue > 0 ? (prevNetIncome / prevRevenue) * 100 : 0;

          revenueChange = prevRevenue > 0 ? ((totalRevenue - prevRevenue) / prevRevenue) * 100 : 0;
          netIncomeChange = prevNetIncome > 0 ? ((netIncome - prevNetIncome) / prevNetIncome) * 100 : 0;
          expenseChange = prevExpenses > 0 ? ((operatingExpenses - prevExpenses) / prevExpenses) * 100 : 0;
          marginChange = profitMargin - prevMargin;
        }

        setMetrics({
          totalRevenue,
          netIncome,
          operatingExpenses,
          profitMargin,
          revenueChange,
          netIncomeChange,
          expenseChange,
          marginChange,
        });
      } catch (error) {
        console.error("Error fetching financial data:", error);
        toast({
          title: "Error loading financial data",
          description: "Unable to load your financial metrics",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }

    fetchFinancialData();
  }, [toast]);

  return { metrics, loading };
}
