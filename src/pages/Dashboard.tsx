import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  PieChart,
  Activity,
  Users,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";
import { MetricCard } from "@/components/MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useFinancialData } from "@/hooks/useFinancialData";
import { Skeleton } from "@/components/ui/skeleton";

const Dashboard = () => {
  const { metrics, loading } = useFinancialData();

  const upcomingGoals = [
    { goal: "Increase revenue by 15%", progress: 78, target: "Q4 2024" },
    { goal: "Reduce operating costs by 8%", progress: 45, target: "Q1 2025" },
    { goal: "Improve profit margin to 25%", progress: 62, target: "Q4 2024" },
  ];

  const formatCurrency = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
    return `$${value.toFixed(0)}`;
  };

  const formatPercentage = (value: number) => `${Math.abs(value).toFixed(1)}%`;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome back! Here's your financial overview.
        </p>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {loading ? (
          <>
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="shadow-card">
                <CardHeader className="pb-2">
                  <Skeleton className="h-4 w-24" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-8 w-32 mb-2" />
                  <Skeleton className="h-3 w-20" />
                </CardContent>
              </Card>
            ))}
          </>
        ) : metrics ? (
          <>
            <MetricCard
              title="Total Revenue"
              value={formatCurrency(metrics.totalRevenue)}
              change={formatPercentage(metrics.revenueChange)}
              changeType={metrics.revenueChange >= 0 ? "positive" : "negative"}
              icon={DollarSign}
              description="vs last period"
            />
            <MetricCard
              title="Net Income"
              value={formatCurrency(metrics.netIncome)}
              change={formatPercentage(metrics.netIncomeChange)}
              changeType={metrics.netIncomeChange >= 0 ? "positive" : "negative"}
              icon={TrendingUp}
              description="vs last period"
            />
            <MetricCard
              title="Operating Expenses"
              value={formatCurrency(metrics.operatingExpenses)}
              change={formatPercentage(metrics.expenseChange)}
              changeType={metrics.expenseChange >= 0 ? "negative" : "positive"}
              icon={TrendingDown}
              description="vs last period"
            />
            <MetricCard
              title="Profit Margin"
              value={`${metrics.profitMargin.toFixed(1)}%`}
              change={formatPercentage(metrics.marginChange)}
              changeType={metrics.marginChange >= 0 ? "positive" : "negative"}
              icon={PieChart}
              description="vs last period"
            />
          </>
        ) : (
          <Card className="col-span-full shadow-card">
            <CardContent className="p-6 text-center text-muted-foreground">
              No financial data available. Please upload your financial statements.
            </CardContent>
          </Card>
        )}
      </div>

      {/* Performance vs Goals */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Performance vs Goals
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {upcomingGoals.map((goal, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{goal.goal}</span>
                <span className="text-muted-foreground">{goal.target}</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${goal.progress}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{goal.progress}% complete</span>
                <span>{100 - goal.progress}% remaining</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <p className="text-sm text-muted-foreground">
            Get started with these common tasks
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link to="/benchmark">
              <Button variant="outline" className="h-auto p-4 flex flex-col items-start space-y-2 w-full">
                <TrendingUp className="w-6 h-6 text-primary" />
                <div className="text-left">
                  <div className="font-medium">View Benchmark</div>
                  <div className="text-xs text-muted-foreground">Compare with industry</div>
                </div>
                <ArrowRight className="w-4 h-4 ml-auto text-muted-foreground" />
              </Button>
            </Link>
            
            <Link to="/data-entry">
              <Button variant="outline" className="h-auto p-4 flex flex-col items-start space-y-2 w-full">
                <Activity className="w-6 h-6 text-success" />
                <div className="text-left">
                  <div className="font-medium">Upload Data</div>
                  <div className="text-xs text-muted-foreground">Add financial statements</div>
                </div>
                <ArrowRight className="w-4 h-4 ml-auto text-muted-foreground" />
              </Button>
            </Link>
            
            <Link to="/chatbot">
              <Button variant="outline" className="h-auto p-4 flex flex-col items-start space-y-2 w-full">
                <Users className="w-6 h-6 text-warning" />
                <div className="text-left">
                  <div className="font-medium">Ask AI Assistant</div>
                  <div className="text-xs text-muted-foreground">Get insights & advice</div>
                </div>
                <ArrowRight className="w-4 h-4 ml-auto text-muted-foreground" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;