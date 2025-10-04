import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, Video, Award, Map, FileCheck, BarChart3, 
  AlertTriangle, CheckCircle, TrendingUp, Clock, 
  PlayCircle, BookOpen, Trophy, ArrowRight 
} from "lucide-react";

const Dashboard = () => {
  const [biosecurityScore] = useState(72);
  const [complianceLevel] = useState("Silver");

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };

  const getScoreGradient = (score: number) => {
    if (score >= 80) return "from-success to-success/70";
    if (score >= 60) return "from-warning to-warning/70";
    return "from-destructive to-destructive/70";
  };

  const quickActions = [
    { icon: Shield, label: "Take Assessment", to: "/assessment", variant: "default" as const },
    { icon: Video, label: "Watch Videos", to: "/learning", variant: "accent" as const },
    { icon: Map, label: "View Disease Map", to: "/map", variant: "warning" as const },
    { icon: FileCheck, label: "Health Passport", to: "/passport", variant: "success" as const },
  ];

  const recentActivities = [
    { icon: CheckCircle, text: "Completed 'Farm Disinfection' video", time: "2 hours ago", color: "text-success" },
    { icon: Award, text: "Earned Bronze Compliance Badge", time: "1 day ago", color: "text-warning" },
    { icon: PlayCircle, text: "Started 'ASF Prevention' course", time: "3 days ago", color: "text-accent" },
  ];

  const recommendations = [
    { 
      priority: "High", 
      title: "Improve Visitor Biosecurity", 
      description: "Implement strict visitor protocols and disinfection procedures",
      icon: AlertTriangle,
      color: "text-destructive"
    },
    { 
      priority: "Medium", 
      title: "Complete Vaccination Records", 
      description: "Update your digital health passport with recent vaccinations",
      icon: FileCheck,
      color: "text-warning"
    },
    { 
      priority: "Low", 
      title: "Watch Advanced Training Videos", 
      description: "3 new expert videos available on disease prevention",
      icon: Video,
      color: "text-accent"
    },
  ];

  const upcomingTasks = [
    { task: "Complete ASF Prevention Quiz", deadline: "Due in 2 days", icon: BookOpen },
    { task: "Update Vaccination Records", deadline: "Due in 5 days", icon: FileCheck },
    { task: "Monthly Biosecurity Audit", deadline: "Due in 7 days", icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-xl font-bold text-foreground">BioSecure India</h1>
              <p className="text-xs text-muted-foreground">Farmer Dashboard</p>
            </div>
          </div>
          <nav className="flex items-center gap-2">
            <Link to="/learning">
              <Button variant="ghost" size="sm">Learning</Button>
            </Link>
            <Link to="/map">
              <Button variant="ghost" size="sm">Map</Button>
            </Link>
            <Link to="/compliance">
              <Button variant="ghost" size="sm">Compliance</Button>
            </Link>
            <Button variant="outline" size="sm">Profile</Button>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Welcome Section */}
        <div>
          <h2 className="text-3xl font-bold mb-2">Welcome back, Farmer! 👋</h2>
          <p className="text-muted-foreground">Here's your farm biosecurity overview</p>
        </div>

        {/* Score and Compliance Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Biosecurity Score */}
          <Card className="border-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Biosecurity Score</CardTitle>
                  <CardDescription>Based on your last assessment</CardDescription>
                </div>
                <Shield className={`h-12 w-12 ${getScoreColor(biosecurityScore)}`} />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <div className={`score-reveal text-6xl font-bold ${getScoreColor(biosecurityScore)} text-center mb-2`}>
                  {biosecurityScore}
                  <span className="text-2xl">/100</span>
                </div>
                <Progress value={biosecurityScore} className="h-3" />
              </div>
              <div className="flex items-center justify-between text-sm">
                <Badge variant={biosecurityScore >= 80 ? "default" : "secondary"} className="text-xs">
                  {biosecurityScore >= 80 ? "High" : biosecurityScore >= 60 ? "Medium" : "Low"} Risk Level
                </Badge>
                <Link to="/assessment">
                  <Button variant="link" size="sm" className="h-auto p-0">
                    Retake Assessment <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Compliance Level */}
          <Card className="border-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Compliance Level</CardTitle>
                  <CardDescription>Your current achievement tier</CardDescription>
                </div>
                <Trophy className="h-12 w-12 text-warning badge-glow" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center space-y-2">
                <div className="text-5xl font-bold text-warning">{complianceLevel}</div>
                <p className="text-sm text-muted-foreground">72% to Gold Level</p>
                <Progress value={72} className="h-3" />
              </div>
              <div className="flex gap-2 justify-center">
                <Badge variant="outline" className="border-muted-foreground/30">Bronze ✓</Badge>
                <Badge variant="default" className="bg-warning">Silver ✓</Badge>
                <Badge variant="outline" className="border-warning/50 text-warning">Gold</Badge>
              </div>
              <Link to="/compliance">
                <Button variant="outline" className="w-full">
                  View Progress <TrendingUp className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and features</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <Link key={index} to={action.to}>
                  <Button 
                    variant={action.variant} 
                    className="w-full h-auto flex-col py-6 gap-2"
                  >
                    <action.icon className="h-8 w-8" />
                    <span className="text-sm font-medium">{action.label}</span>
                  </Button>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recommendations */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Recommendations</CardTitle>
                <CardDescription>Personalized actions to improve your score</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recommendations.map((rec, index) => (
                  <div key={index} className="flex gap-4 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                    <rec.icon className={`h-8 w-8 ${rec.color} shrink-0`} />
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <Badge variant={rec.priority === "High" ? "destructive" : rec.priority === "Medium" ? "secondary" : "outline"}>
                          {rec.priority}
                        </Badge>
                        <h4 className="font-semibold">{rec.title}</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">{rec.description}</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest actions and achievements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <activity.icon className={`h-5 w-5 ${activity.color} mt-0.5`} />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.text}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                          <Clock className="h-3 w-3" />
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Tasks */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Tasks</CardTitle>
                <CardDescription>Don't miss these deadlines</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingTasks.map((task, index) => (
                    <div key={index} className="space-y-2 pb-4 border-b last:border-0 last:pb-0">
                      <div className="flex items-start gap-2">
                        <task.icon className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{task.task}</p>
                          <p className="text-xs text-muted-foreground">{task.deadline}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Stats Card */}
            <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
              <CardHeader>
                <CardTitle>Learning Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Videos Watched</span>
                    <span className="font-bold">12/50</span>
                  </div>
                  <Progress value={24} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Quizzes Passed</span>
                    <span className="font-bold">8/15</span>
                  </div>
                  <Progress value={53} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Certificates Earned</span>
                    <span className="font-bold">3</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
