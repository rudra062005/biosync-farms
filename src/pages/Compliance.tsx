import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Shield, Trophy, CheckCircle, Clock, Calendar,
  TrendingUp, Award, Target, Star, ChevronRight
} from "lucide-react";
import { toast } from "sonner";

interface ComplianceTask {
  id: string;
  category: string;
  task: string;
  description: string;
  completed: boolean;
  points: number;
  deadline?: string;
}

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedDate?: string;
  progress: number;
  requirement: string;
}

const Compliance = () => {
  const [tasks, setTasks] = useState<ComplianceTask[]>([
    {
      id: "task_001",
      category: "Daily Operations",
      task: "Complete daily health inspection logs",
      description: "Record health status of all animals daily",
      completed: true,
      points: 10,
      deadline: "2025-10-05"
    },
    {
      id: "task_002",
      category: "Facility Management",
      task: "Perform weekly disinfection routine",
      description: "Disinfect all farm facilities and equipment",
      completed: true,
      points: 15,
      deadline: "2025-10-06"
    },
    {
      id: "task_003",
      category: "Training & Education",
      task: "Complete 'ASF Prevention' video course",
      description: "Watch video and pass the quiz",
      completed: false,
      points: 20,
      deadline: "2025-10-08"
    },
    {
      id: "task_004",
      category: "Documentation",
      task: "Update vaccination records in Health Passport",
      description: "Ensure all vaccination records are current",
      completed: false,
      points: 15,
      deadline: "2025-10-07"
    },
    {
      id: "task_005",
      category: "Visitor Management",
      task: "Review and update visitor log procedures",
      description: "Ensure all visitors follow biosecurity protocols",
      completed: false,
      points: 10,
      deadline: "2025-10-10"
    },
    {
      id: "task_006",
      category: "Assessment",
      task: "Retake monthly biosecurity assessment",
      description: "Complete comprehensive farm assessment",
      completed: false,
      points: 25,
      deadline: "2025-10-15"
    }
  ]);

  const badges: Badge[] = [
    {
      id: "badge_bronze",
      name: "Bronze Guardian",
      description: "Complete 10 compliance tasks",
      icon: "🥉",
      earned: true,
      earnedDate: "2025-09-15",
      progress: 100,
      requirement: "10 tasks"
    },
    {
      id: "badge_silver",
      name: "Silver Protector",
      description: "Complete 25 compliance tasks and maintain 70% score",
      icon: "🥈",
      earned: true,
      earnedDate: "2025-09-28",
      progress: 100,
      requirement: "25 tasks + 70% score"
    },
    {
      id: "badge_gold",
      name: "Gold Champion",
      description: "Complete 50 tasks, maintain 85% score, earn 3 certificates",
      icon: "🥇",
      earned: false,
      progress: 72,
      requirement: "50 tasks + 85% score + 3 certificates"
    },
    {
      id: "badge_expert",
      name: "Biosecurity Expert",
      description: "Perfect compliance for 3 consecutive months",
      icon: "⭐",
      earned: false,
      progress: 33,
      requirement: "3 months perfect compliance"
    },
    {
      id: "badge_educator",
      name: "Learning Master",
      description: "Complete all video courses with 100% quiz scores",
      icon: "📚",
      earned: false,
      progress: 45,
      requirement: "All courses + perfect scores"
    },
    {
      id: "badge_innovator",
      name: "Innovation Pioneer",
      description: "Implement 5 advanced biosecurity measures",
      icon: "💡",
      earned: false,
      progress: 20,
      requirement: "5 advanced measures"
    }
  ];

  const completedTasks = tasks.filter(t => t.completed).length;
  const totalTasks = tasks.length;
  const completionPercentage = Math.round((completedTasks / totalTasks) * 100);
  const totalPoints = tasks.filter(t => t.completed).reduce((sum, t) => sum + t.points, 0);

  const currentLevel = totalPoints >= 200 ? "Gold" : totalPoints >= 100 ? "Silver" : "Bronze";
  const nextLevel = currentLevel === "Bronze" ? "Silver" : currentLevel === "Silver" ? "Gold" : "Platinum";
  const pointsToNext = currentLevel === "Bronze" ? 100 - totalPoints : currentLevel === "Silver" ? 200 - totalPoints : 300 - totalPoints;

  const handleTaskToggle = (taskId: string) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        const newCompleted = !task.completed;
        if (newCompleted) {
          toast.success(`Completed: ${task.task}`, {
            description: `+${task.points} points earned!`
          });
        }
        return { ...task, completed: newCompleted };
      }
      return task;
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-xl font-bold text-foreground">BioSecure India</h1>
              <p className="text-xs text-muted-foreground">Compliance Tracker</p>
            </div>
          </div>
          <nav className="flex items-center gap-2">
            <Link to="/dashboard">
              <Button variant="ghost" size="sm">Dashboard</Button>
            </Link>
            <Link to="/learning">
              <Button variant="ghost" size="sm">Learning</Button>
            </Link>
            <Button variant="outline" size="sm">Leaderboard</Button>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Hero Stats */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Progress Card */}
          <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-background">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">Compliance Progress</CardTitle>
                  <CardDescription>Your overall compliance status</CardDescription>
                </div>
                <Target className="h-12 w-12 text-primary" />
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Task Completion</span>
                  <span className="text-2xl font-bold text-primary">{completionPercentage}%</span>
                </div>
                <Progress value={completionPercentage} className="h-3" />
                <p className="text-xs text-muted-foreground mt-2">
                  {completedTasks} of {totalTasks} tasks completed
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <p className="text-sm text-muted-foreground">Total Points</p>
                  <p className="text-3xl font-bold text-primary">{totalPoints}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Current Level</p>
                  <Badge variant="default" className="text-base mt-1">{currentLevel}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Level Progress */}
          <Card className="border-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">Level Progress</CardTitle>
                  <CardDescription>Keep earning to reach {nextLevel} level</CardDescription>
                </div>
                <Trophy className="h-12 w-12 text-warning badge-glow" />
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-center">
                <div className="relative">
                  <div className="text-6xl">{currentLevel === "Bronze" ? "🥉" : currentLevel === "Silver" ? "🥈" : "🥇"}</div>
                  <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">
                    {totalPoints}
                  </div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Progress to {nextLevel}</span>
                  <span className="font-medium">{pointsToNext} points needed</span>
                </div>
                <Progress value={currentLevel === "Bronze" ? (totalPoints / 100) * 100 : currentLevel === "Silver" ? ((totalPoints - 100) / 100) * 100 : 0} className="h-3" />
              </div>
              <div className="flex gap-2 justify-center pt-2">
                <Badge variant={currentLevel === "Bronze" ? "default" : "outline"}>Bronze</Badge>
                <Badge variant={currentLevel === "Silver" ? "default" : "outline"}>Silver</Badge>
                <Badge variant={currentLevel === "Gold" ? "default" : "outline"}>Gold</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Badges Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-6 w-6 text-warning" />
              Achievement Badges
            </CardTitle>
            <CardDescription>Unlock badges by completing challenges</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {badges.map((badge) => (
                <div
                  key={badge.id}
                  className={`p-6 rounded-lg border-2 transition-all ${
                    badge.earned
                      ? "border-warning bg-warning/5 badge-glow"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-4xl">{badge.icon}</div>
                    {badge.earned && (
                      <Badge variant="default" className="bg-warning text-warning-foreground">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Earned
                      </Badge>
                    )}
                  </div>
                  <h4 className="font-bold text-lg mb-2">{badge.name}</h4>
                  <p className="text-sm text-muted-foreground mb-4">{badge.description}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{badge.progress}%</span>
                    </div>
                    <Progress value={badge.progress} className="h-2" />
                    <p className="text-xs text-muted-foreground">{badge.requirement}</p>
                  </div>
                  {badge.earned && badge.earnedDate && (
                    <p className="text-xs text-muted-foreground mt-3 flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Earned on {new Date(badge.earnedDate).toLocaleDateString()}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Task Checklist */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-6 w-6 text-success" />
              Compliance Tasks
            </CardTitle>
            <CardDescription>Complete tasks to earn points and maintain compliance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    task.completed
                      ? "border-success/30 bg-success/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <Checkbox
                      checked={task.completed}
                      onCheckedChange={() => handleTaskToggle(task.id)}
                      className="mt-1"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div className="flex-1">
                          <h4 className={`font-semibold ${task.completed ? "line-through text-muted-foreground" : ""}`}>
                            {task.task}
                          </h4>
                          <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                        </div>
                        <Badge variant="outline" className="shrink-0">
                          {task.points} pts
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1">
                          <Shield className="h-3 w-3" />
                          {task.category}
                        </span>
                        {task.deadline && (
                          <span className="inline-flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            Due {new Date(task.deadline).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <Card className="bg-gradient-to-br from-primary to-primary-glow text-primary-foreground border-0">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">Ready to Level Up?</h3>
                <p className="opacity-90">Complete more tasks and unlock exclusive badges</p>
              </div>
              <Link to="/learning">
                <Button variant="secondary" size="lg">
                  Start Learning <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Compliance;
