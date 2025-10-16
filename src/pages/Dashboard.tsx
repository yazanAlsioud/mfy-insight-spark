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

const Dashboard = () => {
  const upcomingGoals = [
    { goal: "Increase revenue by 15%", progress: 78, target: "Q4 2024" },
    { goal: "Reduce operating costs by 8%", progress: 45, target: "Q1 2025" },
    { goal: "Improve profit margin to 25%", progress: 62, target: "Q4 2024" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome back! Here's your financial overview for September 2024.
        </p>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Revenue"
          value="$2.4M"
          change="12.5%"
          changeType="positive"
          icon={DollarSign}
          description="vs last month"
        />
        <MetricCard
          title="Net Income"
          value="$480K"
          change="8.2%"
          changeType="positive"
          icon={TrendingUp}
          description="vs last month"
        />
        <MetricCard
          title="Operating Expenses"
          value="$1.2M"
          change="3.1%"
          changeType="negative"
          icon={TrendingDown}
          description="vs last month"
        />
        <MetricCard
          title="Profit Margin"
          value="20.5%"
          change="2.3%"
          changeType="positive"
          icon={PieChart}
          description="vs last month"
        />
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