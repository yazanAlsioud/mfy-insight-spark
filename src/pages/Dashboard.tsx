import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  PieChart,
  Activity,
  Users,
  Calendar,
  ArrowRight
} from "lucide-react";
import { MetricCard } from "@/components/MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Dashboard = () => {
  const recentActivities = [
    { 
      action: "Financial data uploaded", 
      file: "Q3_2024_financials.csv", 
      time: "2 hours ago",
      status: "completed" 
    },
    { 
      action: "Benchmark analysis generated", 
      file: "Industry comparison - SaaS", 
      time: "1 day ago",
      status: "completed" 
    },
    { 
      action: "AI insights generated", 
      file: "Cost optimization recommendations", 
      time: "2 days ago",
      status: "new" 
    },
    { 
      action: "Monthly report created", 
      file: "September 2024 Summary", 
      time: "3 days ago",
      status: "completed" 
    },
  ];

  const upcomingGoals = [
    { goal: "Increase revenue by 15%", progress: 78, target: "Q4 2024" },
    { goal: "Reduce operating costs by 8%", progress: 45, target: "Q1 2025" },
    { goal: "Improve profit margin to 25%", progress: 62, target: "Q4 2024" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here's your financial overview for September 2024.
          </p>
        </div>
        <Button className="bg-gradient-primary hover:opacity-90 transition-opacity">
          <Calendar className="w-4 h-4 mr-2" />
          View Full Report
        </Button>
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

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Performance vs Goals */}
        <Card className="lg:col-span-2 shadow-card">
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

        {/* Recent Activity */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <div className="space-y-1 flex-1">
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">{activity.file}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                    <Badge 
                      variant={activity.status === "new" ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {activity.status}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <p className="text-sm text-muted-foreground">
            Get started with these common tasks
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-start space-y-2">
              <TrendingUp className="w-6 h-6 text-primary" />
              <div className="text-left">
                <div className="font-medium">View Benchmark</div>
                <div className="text-xs text-muted-foreground">Compare with industry</div>
              </div>
              <ArrowRight className="w-4 h-4 ml-auto text-muted-foreground" />
            </Button>
            
            <Button variant="outline" className="h-auto p-4 flex flex-col items-start space-y-2">
              <Activity className="w-6 h-6 text-success" />
              <div className="text-left">
                <div className="font-medium">Upload Data</div>
                <div className="text-xs text-muted-foreground">Add financial statements</div>
              </div>
              <ArrowRight className="w-4 h-4 ml-auto text-muted-foreground" />
            </Button>
            
            <Button variant="outline" className="h-auto p-4 flex flex-col items-start space-y-2">
              <Users className="w-6 h-6 text-warning" />
              <div className="text-left">
                <div className="font-medium">Ask AI Assistant</div>
                <div className="text-xs text-muted-foreground">Get insights & advice</div>
              </div>
              <ArrowRight className="w-4 h-4 ml-auto text-muted-foreground" />
            </Button>
            
            <Button variant="outline" className="h-auto p-4 flex flex-col items-start space-y-2">
              <PieChart className="w-6 h-6 text-chart-revenue" />
              <div className="text-left">
                <div className="font-medium">Generate Report</div>
                <div className="text-xs text-muted-foreground">Create monthly summary</div>
              </div>
              <ArrowRight className="w-4 h-4 ml-auto text-muted-foreground" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;