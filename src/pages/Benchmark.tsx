import { TrendingUp, BarChart3, Building2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useBenchmarkData } from "@/hooks/useBenchmarkData";
import { useState } from "react";

const Benchmark = () => {
  const [selectedIndustry, setSelectedIndustry] = useState("saas");
  const { benchmarks, loading } = useBenchmarkData(selectedIndustry);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Industry Benchmark</h1>
          <p className="text-muted-foreground mt-1">
            Compare your performance with industry standards and peers.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Select defaultValue="saas">
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select industry" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="saas">SaaS Technology</SelectItem>
              <SelectItem value="retail">Retail</SelectItem>
              <SelectItem value="manufacturing">Manufacturing</SelectItem>
              <SelectItem value="healthcare">Healthcare</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-gradient-primary hover:opacity-90">
            <BarChart3 className="w-4 h-4 mr-2" />
            Update Analysis
          </Button>
        </div>
      </div>

      {/* Benchmark Comparison */}
      <div className="grid gap-6 md:grid-cols-2">
        {loading ? (
          <>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="shadow-card">
                <CardHeader className="pb-3">
                  <Skeleton className="h-6 w-48" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-8 w-20" />
                    </div>
                    <div className="space-y-2 text-right">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-8 w-20" />
                    </div>
                  </div>
                  <Skeleton className="h-px w-full" />
                  <Skeleton className="h-4 w-24" />
                </CardContent>
              </Card>
            ))}
          </>
        ) : benchmarks.length > 0 ? (
          benchmarks.map((item, index) => (
            <Card key={index} className="shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center justify-between">
                  {item.metric}
                  <Badge 
                    variant={item.status === "above" ? "default" : "secondary"}
                    className={item.status === "above" ? "bg-success text-success-foreground" : ""}
                  >
                    {item.status === "above" ? "Above Average" : "Below Average"}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Your Performance</p>
                    <p className="text-2xl font-bold text-foreground">{item.yourValue}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Industry Average</p>
                    <p className="text-2xl font-bold text-muted-foreground">{item.industryAverage}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <span className="text-sm text-muted-foreground">Difference</span>
                  <span className={`text-sm font-medium ${
                    item.status === "above" ? "text-success" : "text-warning"
                  }`}>
                    {item.difference}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="col-span-full shadow-card">
            <CardContent className="p-6 text-center text-muted-foreground">
              No benchmark data available. Please ensure your financial data is uploaded.
            </CardContent>
          </Card>
        )}
      </div>

      {/* Industry Overview */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="w-5 h-5" />
            SaaS Technology Industry Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="text-center">
              <div className="text-2xl font-bold text-chart-revenue">15.8%</div>
              <div className="text-sm text-muted-foreground">Avg Revenue Growth</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-chart-profit">18.2%</div>
              <div className="text-sm text-muted-foreground">Avg Profit Margin</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">78%</div>
              <div className="text-sm text-muted-foreground">Avg Operating Efficiency</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Benchmark;