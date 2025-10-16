import { useState, useEffect } from "react";
import { Target, Plus, Trash2, Save } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

interface KPI {
  kpi_id: number;
  metric_name: string;
  description: string;
  target_value: number;
  current_value: number;
  target_date: string;
}

const availableMetrics = [
  { value: "revenue_growth", label: "Revenue Growth (%)" },
  { value: "profit_margin", label: "Profit Margin (%)" },
  { value: "operating_expenses", label: "Operating Expenses Reduction (%)" },
  { value: "net_income", label: "Net Income Growth (%)" },
  { value: "roa", label: "Return on Assets (%)" },
  { value: "current_ratio", label: "Current Ratio" },
  { value: "debt_to_equity", label: "Debt-to-Equity Ratio" },
  { value: "gross_margin", label: "Gross Margin (%)" },
];

const KPIs = () => {
  const [kpis, setKpis] = useState<KPI[]>([]);
  const [loading, setLoading] = useState(true);
  const [companyId, setCompanyId] = useState<number | null>(null);
  const [newKPI, setNewKPI] = useState({
    metric_name: "",
    description: "",
    target_value: "",
    target_date: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchKPIs();
  }, []);

  const fetchKPIs = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profile } = await supabase
        .from("profiles")
        .select("client_id")
        .eq("id", user.id)
        .single();

      if (!profile?.client_id) return;

      const { data: companies } = await supabase
        .from("clientcompanies")
        .select("client_company_id")
        .eq("client_id", profile.client_id)
        .limit(1);

      if (!companies || companies.length === 0) return;

      const clientCompanyId = companies[0].client_company_id;
      setCompanyId(clientCompanyId);

      const { data: kpisData, error } = await supabase
        .from("kpis")
        .select("*")
        .eq("client_company_id", clientCompanyId)
        .order("created_at", { ascending: false });

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
  };

  const handleAddKPI = async () => {
    if (!companyId) {
      toast({
        title: "Error",
        description: "No company found. Please set up your company first.",
        variant: "destructive",
      });
      return;
    }

    if (!newKPI.metric_name || !newKPI.target_value || !newKPI.target_date) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      const { data, error } = await supabase
        .from("kpis")
        .insert({
          client_company_id: companyId,
          metric_name: newKPI.metric_name,
          description: newKPI.description,
          target_value: parseFloat(newKPI.target_value),
          target_date: newKPI.target_date,
        })
        .select()
        .single();

      if (error) throw error;

      setKpis([data, ...kpis]);
      setNewKPI({
        metric_name: "",
        description: "",
        target_value: "",
        target_date: "",
      });

      toast({
        title: "KPI added",
        description: "Your KPI has been successfully added",
      });
    } catch (error) {
      console.error("Error adding KPI:", error);
      toast({
        title: "Error adding KPI",
        description: "Unable to add your KPI",
        variant: "destructive",
      });
    }
  };

  const handleDeleteKPI = async (kpiId: number) => {
    try {
      const { error } = await supabase
        .from("kpis")
        .delete()
        .eq("kpi_id", kpiId);

      if (error) throw error;

      setKpis(kpis.filter(kpi => kpi.kpi_id !== kpiId));
      toast({
        title: "KPI deleted",
        description: "Your KPI has been successfully deleted",
      });
    } catch (error) {
      console.error("Error deleting KPI:", error);
      toast({
        title: "Error deleting KPI",
        description: "Unable to delete your KPI",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Key Performance Indicators</h1>
        <p className="text-muted-foreground mt-1">
          Set and track your business goals and performance targets.
        </p>
      </div>

      {/* Add New KPI */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add New KPI
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="metric">Metric *</Label>
              <Select
                value={newKPI.metric_name}
                onValueChange={(value) => setNewKPI({ ...newKPI, metric_name: value })}
              >
                <SelectTrigger id="metric">
                  <SelectValue placeholder="Select a metric" />
                </SelectTrigger>
                <SelectContent>
                  {availableMetrics.map((metric) => (
                    <SelectItem key={metric.value} value={metric.value}>
                      {metric.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="target_value">Target Value *</Label>
              <Input
                id="target_value"
                type="number"
                step="0.01"
                placeholder="e.g., 15.5"
                value={newKPI.target_value}
                onChange={(e) => setNewKPI({ ...newKPI, target_value: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="target_date">Target Date *</Label>
              <Input
                id="target_date"
                type="date"
                value={newKPI.target_date}
                onChange={(e) => setNewKPI({ ...newKPI, target_date: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Optional description..."
                value={newKPI.description}
                onChange={(e) => setNewKPI({ ...newKPI, description: e.target.value })}
                rows={1}
              />
            </div>
          </div>

          <Button onClick={handleAddKPI} className="w-full md:w-auto">
            <Save className="w-4 h-4 mr-2" />
            Add KPI
          </Button>
        </CardContent>
      </Card>

      {/* Existing KPIs */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Your KPIs</h2>
        {loading ? (
          <div className="grid gap-4 md:grid-cols-2">
            {[1, 2].map((i) => (
              <Card key={i} className="shadow-card">
                <CardHeader>
                  <Skeleton className="h-6 w-48" />
                </CardHeader>
                <CardContent className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-32" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : kpis.length === 0 ? (
          <Card className="shadow-card">
            <CardContent className="p-6 text-center text-muted-foreground">
              No KPIs set yet. Add your first KPI above to start tracking your goals.
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {kpis.map((kpi) => (
              <Card key={kpi.kpi_id} className="shadow-card">
                <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                  <div className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">
                      {availableMetrics.find(m => m.value === kpi.metric_name)?.label || kpi.metric_name}
                    </CardTitle>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteKPI(kpi.kpi_id)}
                    className="h-8 w-8 text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </CardHeader>
                <CardContent className="space-y-2">
                  {kpi.description && (
                    <p className="text-sm text-muted-foreground">{kpi.description}</p>
                  )}
                  <div className="flex items-center justify-between pt-2">
                    <div>
                      <p className="text-xs text-muted-foreground">Target</p>
                      <p className="text-lg font-bold text-foreground">{kpi.target_value}%</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Target Date</p>
                      <p className="text-sm font-medium text-foreground">
                        {new Date(kpi.target_date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default KPIs;
