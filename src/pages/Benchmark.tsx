import { TrendingUp, BarChart3, Target, Building2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Benchmark = () => {
  const benchmarkData = [
    {
      metric: "Profit Margin",
      yourValue: "20.5%",
      industryAvg: "18.2%",
      status: "above",
      difference: "+2.3%"
    },
    {
      metric: "Revenue Growth",
      yourValue: "12.5%",
      industryAvg: "15.8%",
      status: "below",
      difference: "-3.3%"
    },
    {
      metric: "Operating Efficiency",
      yourValue: "82%",
      industryAvg: "78%",
      status: "above",
      difference: "+4%"
    },
    {
      metric: "Cash Flow Ratio",
      yourValue: "1.45",
      industryAvg: "1.52",
      status: "below",
      difference: "-0.07"
    },
  ];

  const insights = [
    {
      title: "Strong Profit Margins",
      description: "Your profit margin is 2.3% above industry average, indicating excellent cost management.",
      type: "positive"
    },
    {
      title: "Revenue Growth Opportunity",
      description: "Consider expanding marketing efforts to match industry growth rate of 15.8%.",
      type: "improvement"
    },
    {
      title: "Operational Excellence",
      description: "Your operating efficiency exceeds industry standards by 4%.",
      type: "positive"
    },
  ];

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
        {benchmarkData.map((item, index) => (
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
                  <p className="text-2xl font-bold text-muted-foreground">{item.industryAvg}</p>
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
        ))}
      </div>

      {/* Insights & Recommendations */}
      <Card className="shadow-elevated">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            AI-Generated Insights
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Based on your benchmark analysis, here are key insights and recommendations.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {insights.map((insight, index) => (
            <div key={index} className="flex items-start space-x-4 p-4 bg-muted/50 rounded-lg">
              <div className={`w-3 h-3 rounded-full mt-1 ${
                insight.type === "positive" ? "bg-success" : "bg-warning"
              }`}></div>
              <div className="flex-1">
                <h4 className="font-medium text-foreground">{insight.title}</h4>
                <p className="text-sm text-muted-foreground mt-1">{insight.description}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

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