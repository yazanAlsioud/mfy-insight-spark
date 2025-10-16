import { useState, useEffect } from "react";
import { Building2, Save } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

interface Company {
  client_company_id: number;
  company_name: string;
  industry: string;
  sector_id: number;
}

interface Sector {
  sector_id: number;
  sector_name: string;
  description: string;
}

const CompanySetup = () => {
  const [company, setCompany] = useState<Company | null>(null);
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [clientId, setClientId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    company_name: "",
    industry: "",
    sector_id: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Get current user profile
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Get user's profile with client_id
      const { data: profile } = await supabase
        .from("profiles")
        .select("client_id")
        .eq("id", user.id)
        .single();

      if (!profile?.client_id) {
        toast({
          title: "Profile not found",
          description: "Please contact support",
          variant: "destructive",
        });
        return;
      }

      setClientId(profile.client_id);

      // Get sectors for dropdown
      const { data: sectorsData, error: sectorsError } = await supabase
        .from("sectors")
        .select("*")
        .order("sector_name");

      if (sectorsError) throw sectorsError;
      setSectors(sectorsData || []);

      // Get client's company if exists
      const { data: companyData, error: companyError } = await supabase
        .from("clientcompanies")
        .select("*")
        .eq("client_id", profile.client_id)
        .limit(1)
        .maybeSingle();

      if (companyError && companyError.code !== 'PGRST116') throw companyError;

      if (companyData) {
        setCompany(companyData);
        setFormData({
          company_name: companyData.company_name || "",
          industry: companyData.industry || "",
          sector_id: companyData.sector_id?.toString() || "",
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast({
        title: "Error loading data",
        description: "Unable to load company information",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!clientId) {
      toast({
        title: "Error",
        description: "Client ID not found",
        variant: "destructive",
      });
      return;
    }

    if (!formData.company_name || !formData.industry || !formData.sector_id) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      setSaving(true);

      const companyPayload = {
        client_id: clientId,
        company_name: formData.company_name.trim(),
        industry: formData.industry.trim(),
        sector_id: parseInt(formData.sector_id),
      };

      if (company) {
        // Update existing company
        const { data, error } = await supabase
          .from("clientcompanies")
          .update(companyPayload)
          .eq("client_company_id", company.client_company_id)
          .select()
          .single();

        if (error) throw error;
        setCompany(data);
      } else {
        // Insert new company
        const { data, error } = await supabase
          .from("clientcompanies")
          .insert(companyPayload)
          .select()
          .single();

        if (error) throw error;
        setCompany(data);
      }

      toast({
        title: "Success",
        description: "Company details saved successfully",
      });
    } catch (error) {
      console.error("Error saving company:", error);
      toast({
        title: "Error saving company",
        description: "Unable to save company details",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 max-w-3xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Company Setup</h1>
        <p className="text-muted-foreground mt-1">
          Configure your company information and settings.
        </p>
      </div>

      {/* Company Details Form */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="w-5 h-5" />
            Company Information
          </CardTitle>
          <CardDescription>
            Enter your company details to enable financial analysis and benchmarking.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="company_name">Company Name *</Label>
                <Input
                  id="company_name"
                  placeholder="Enter your company name"
                  value={formData.company_name}
                  onChange={(e) =>
                    setFormData({ ...formData, company_name: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="industry">Industry *</Label>
                <Input
                  id="industry"
                  placeholder="e.g., Technology, Healthcare, Finance"
                  value={formData.industry}
                  onChange={(e) =>
                    setFormData({ ...formData, industry: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sector">Sector *</Label>
                <Select
                  value={formData.sector_id}
                  onValueChange={(value) =>
                    setFormData({ ...formData, sector_id: value })
                  }
                >
                  <SelectTrigger id="sector">
                    <SelectValue placeholder="Select a sector" />
                  </SelectTrigger>
                  <SelectContent>
                    {sectors.map((sector) => (
                      <SelectItem
                        key={sector.sector_id}
                        value={sector.sector_id.toString()}
                      >
                        {sector.sector_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formData.sector_id && sectors.length > 0 && (
                  <p className="text-sm text-muted-foreground">
                    {sectors.find(s => s.sector_id.toString() === formData.sector_id)?.description}
                  </p>
                )}
              </div>

              <Button
                onClick={handleSave}
                disabled={saving}
                className="w-full"
              >
                <Save className="w-4 h-4 mr-2" />
                {saving ? "Saving..." : company ? "Update Company" : "Create Company"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Info Card */}
      <Card className="shadow-card bg-muted/50">
        <CardContent className="pt-6">
          <div className="space-y-2">
            <h3 className="font-semibold text-foreground">Why set up your company?</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Enable industry benchmark comparisons</li>
              <li>• Get tailored financial insights and recommendations</li>
              <li>• Track KPIs relevant to your sector</li>
              <li>• Store and analyze your financial data securely</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompanySetup;
