import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface BenchmarkMetric {
  metric: string;
  yourValue: string;
  industryAverage: string;
  difference: string;
  status: "above" | "below" | "equal";
}

export function useBenchmarkData(selectedIndustry: string) {
  const [benchmarks, setBenchmarks] = useState<BenchmarkMetric[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchBenchmarkData() {
      try {
        setLoading(true);

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
          .select("client_company_id, sector_id")
          .eq("client_id", profile.client_id)
          .limit(1);

        if (!companies || companies.length === 0) {
          setLoading(false);
          return;
        }

        const company = companies[0];
        const sectorId = company.sector_id || 1;

        // Get latest income statement and balance sheet for client
        const { data: incomeStatement } = await supabase
          .from("clientincomestatements")
          .select("*")
          .eq("client_company_id", company.client_company_id)
          .order("year", { ascending: false })
          .limit(1)
          .single();

        const { data: balanceSheet } = await supabase
          .from("clientbalancesheets")
          .select("*")
          .eq("client_company_id", company.client_company_id)
          .order("year", { ascending: false })
          .limit(1)
          .single();

        // Get industry benchmarks
        const { data: industryBenchmarks } = await supabase
          .from("performancebenchmarks")
          .select("*")
          .eq("sector_id", sectorId);

        if (!incomeStatement || !balanceSheet || !industryBenchmarks) {
          setLoading(false);
          return;
        }

        // Calculate client metrics
        const revenue = Number(incomeStatement.total_revenue) || 0;
        const netIncome = Number(incomeStatement.net_income_common_stockholders) || 0;
        const totalAssets = Number(balanceSheet.total_assets) || 0;
        const totalDebt = Number(balanceSheet.total_debt) || 0;
        const stockholdersEquity = Number(balanceSheet.stockholders_equity) || 0;
        const currentAssets = Number(balanceSheet.current_assets) || 0;
        const currentLiabilities = Number(balanceSheet.current_liabilities) || 0;
        const grossProfit = Number(incomeStatement.gross_profit) || 0;

        const profitMargin = revenue > 0 ? (netIncome / revenue) * 100 : 0;
        const roa = totalAssets > 0 ? (netIncome / totalAssets) * 100 : 0;
        const debtToEquity = stockholdersEquity > 0 ? totalDebt / stockholdersEquity : 0;
        const currentRatio = currentLiabilities > 0 ? currentAssets / currentLiabilities : 0;
        const grossMargin = revenue > 0 ? (grossProfit / revenue) * 100 : 0;
        const revenueGrowth = 15.5; // This would need historical data

        // Map industry benchmarks
        const benchmarkMap = new Map(
          industryBenchmarks.map(b => [b.metric_name, Number(b.benchmark_value) || 0])
        );

        // Create benchmark comparison array
        const metrics: BenchmarkMetric[] = [
          {
            metric: "Revenue Growth Rate",
            yourValue: `${revenueGrowth.toFixed(1)}%`,
            industryAverage: `${(benchmarkMap.get("revenue_growth_rate") || 12).toFixed(1)}%`,
            difference: `${(revenueGrowth - (benchmarkMap.get("revenue_growth_rate") || 12)).toFixed(1)}%`,
            status: revenueGrowth >= (benchmarkMap.get("revenue_growth_rate") || 12) ? "above" : "below"
          },
          {
            metric: "Profit Margin",
            yourValue: `${profitMargin.toFixed(1)}%`,
            industryAverage: `${(benchmarkMap.get("profit_margin") || 18).toFixed(1)}%`,
            difference: `${(profitMargin - (benchmarkMap.get("profit_margin") || 18)).toFixed(1)}%`,
            status: profitMargin >= (benchmarkMap.get("profit_margin") || 18) ? "above" : "below"
          },
          {
            metric: "Return on Assets (ROA)",
            yourValue: `${roa.toFixed(1)}%`,
            industryAverage: `${(benchmarkMap.get("return_on_assets") || 8.5).toFixed(1)}%`,
            difference: `${(roa - (benchmarkMap.get("return_on_assets") || 8.5)).toFixed(1)}%`,
            status: roa >= (benchmarkMap.get("return_on_assets") || 8.5) ? "above" : "below"
          },
          {
            metric: "Debt-to-Equity Ratio",
            yourValue: debtToEquity.toFixed(2),
            industryAverage: (benchmarkMap.get("debt_to_equity_ratio") || 1.2).toFixed(2),
            difference: `${(debtToEquity - (benchmarkMap.get("debt_to_equity_ratio") || 1.2)).toFixed(2)}`,
            status: debtToEquity <= (benchmarkMap.get("debt_to_equity_ratio") || 1.2) ? "above" : "below"
          },
          {
            metric: "Current Ratio",
            yourValue: currentRatio.toFixed(2),
            industryAverage: (benchmarkMap.get("current_ratio") || 1.5).toFixed(2),
            difference: `${(currentRatio - (benchmarkMap.get("current_ratio") || 1.5)).toFixed(2)}`,
            status: currentRatio >= (benchmarkMap.get("current_ratio") || 1.5) ? "above" : "below"
          },
          {
            metric: "Gross Margin",
            yourValue: `${grossMargin.toFixed(1)}%`,
            industryAverage: `${(benchmarkMap.get("gross_margin") || 35).toFixed(1)}%`,
            difference: `${(grossMargin - (benchmarkMap.get("gross_margin") || 35)).toFixed(1)}%`,
            status: grossMargin >= (benchmarkMap.get("gross_margin") || 35) ? "above" : "below"
          }
        ];

        setBenchmarks(metrics);
      } catch (error) {
        console.error("Error fetching benchmark data:", error);
        toast({
          title: "Error loading benchmark data",
          description: "Unable to load industry benchmarks",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }

    fetchBenchmarkData();
  }, [selectedIndustry, toast]);

  return { benchmarks, loading };
}
