import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Shield, Video, PlayCircle, Clock, BookOpen, 
  Award, Download, Search, Filter, ChevronRight,
  CheckCircle, Star, TrendingUp
} from "lucide-react";

interface VideoModule {
  id: string;
  title: string;
  description: string;
  duration: number;
  language: string[];
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  category: string;
  thumbnail: string;
  instructor: string;
  views: number;
  rating: number;
  hasQuiz: boolean;
  completed: boolean;
  tags: string[];
}

const Learning = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const videoModules: VideoModule[] = [
    {
      id: "vid_001",
      title: "Farm-level Disinfection Practices",
      description: "Learn essential disinfection protocols to prevent disease spread in your farm facilities",
      duration: 420,
      language: ["English", "Hindi"],
      difficulty: "Beginner",
      category: "Biosecurity Basics",
      thumbnail: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=500&h=300&fit=crop",
      instructor: "Dr. Priya Sharma",
      views: 1250,
      rating: 4.8,
      hasQuiz: true,
      completed: true,
      tags: ["disinfection", "ASF", "poultry"]
    },
    {
      id: "vid_002",
      title: "African Swine Fever Prevention",
      description: "Comprehensive guide to preventing ASF outbreaks with proven biosecurity measures",
      duration: 540,
      language: ["English", "Hindi"],
      difficulty: "Intermediate",
      category: "Disease Prevention",
      thumbnail: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=500&h=300&fit=crop",
      instructor: "Dr. Rajesh Kumar",
      views: 2100,
      rating: 4.9,
      hasQuiz: true,
      completed: false,
      tags: ["ASF", "prevention", "pigs"]
    },
    {
      id: "vid_003",
      title: "Visitor Management Protocols",
      description: "Implement effective visitor control systems to minimize external contamination risks",
      duration: 300,
      language: ["English", "Hindi", "Tamil"],
      difficulty: "Beginner",
      category: "Biosecurity Basics",
      thumbnail: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500&h=300&fit=crop",
      instructor: "Dr. Meena Patel",
      views: 890,
      rating: 4.7,
      hasQuiz: true,
      completed: false,
      tags: ["visitors", "access control", "protocols"]
    },
    {
      id: "vid_004",
      title: "Vaccination Schedule Management",
      description: "Master proper vaccination timing and record-keeping for optimal flock/herd health",
      duration: 480,
      language: ["English", "Hindi"],
      difficulty: "Intermediate",
      category: "Health Management",
      thumbnail: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=500&h=300&fit=crop",
      instructor: "Dr. Amit Singh",
      views: 1680,
      rating: 4.8,
      hasQuiz: true,
      completed: false,
      tags: ["vaccination", "health", "records"]
    },
    {
      id: "vid_005",
      title: "Avian Influenza Outbreak Response",
      description: "Critical steps to take during suspected or confirmed avian influenza outbreaks",
      duration: 600,
      language: ["English", "Hindi"],
      difficulty: "Advanced",
      category: "Disease Prevention",
      thumbnail: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=500&h=300&fit=crop",
      instructor: "Dr. Sunita Reddy",
      views: 3200,
      rating: 4.9,
      hasQuiz: true,
      completed: false,
      tags: ["avian flu", "outbreak", "poultry"]
    },
    {
      id: "vid_006",
      title: "Feed and Water Biosecurity",
      description: "Protect your feed and water sources from contamination and disease transmission",
      duration: 360,
      language: ["English", "Hindi"],
      difficulty: "Beginner",
      category: "Biosecurity Basics",
      thumbnail: "https://images.unsplash.com/photo-1416339442236-8ceb164046f8?w=500&h=300&fit=crop",
      instructor: "Dr. Vikram Joshi",
      views: 1050,
      rating: 4.6,
      hasQuiz: true,
      completed: true,
      tags: ["feed", "water", "contamination"]
    }
  ];

  const categories = [
    { id: "all", label: "All Courses", count: videoModules.length },
    { id: "biosecurity", label: "Biosecurity Basics", count: 3 },
    { id: "disease", label: "Disease Prevention", count: 2 },
    { id: "health", label: "Health Management", count: 1 }
  ];

  const stats = [
    { icon: PlayCircle, label: "Videos Available", value: "50+", color: "text-accent" },
    { icon: CheckCircle, label: "Completed", value: "2", color: "text-success" },
    { icon: Award, label: "Certificates", value: "3", color: "text-warning" },
    { icon: TrendingUp, label: "Progress", value: "24%", color: "text-primary" }
  ];

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} min`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-success/10 text-success";
      case "Intermediate": return "bg-warning/10 text-warning";
      case "Advanced": return "bg-destructive/10 text-destructive";
      default: return "bg-muted text-muted-foreground";
    }
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
              <p className="text-xs text-muted-foreground">Learning Hub</p>
            </div>
          </div>
          <nav className="flex items-center gap-2">
            <Link to="/dashboard">
              <Button variant="ghost" size="sm">Dashboard</Button>
            </Link>
            <Link to="/compliance">
              <Button variant="ghost" size="sm">Compliance</Button>
            </Link>
            <Button variant="outline" size="sm">My Progress</Button>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-primary/10 via-accent/5 to-background rounded-2xl p-8 border border-primary/20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Video className="h-4 w-4" />
              Expert-Led Training
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Master Biosecurity with Video Learning
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Access expert-led video courses with multilingual subtitles, downloadable resources, 
              and interactive quizzes to earn certificates.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="hero" size="lg">
                <PlayCircle className="mr-2 h-5 w-5" />
                Start Learning
              </Button>
              <Button variant="outline" size="lg">
                <Download className="mr-2 h-5 w-5" />
                Offline Mode
              </Button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-lg bg-muted ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search and Filter */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search videos, topics, or instructors..." 
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
                <Button variant="outline">
                  Difficulty
                </Button>
                <Button variant="outline">
                  Language
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Categories Tabs */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="w-full justify-start overflow-x-auto">
            {categories.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-2">
                {category.label}
                <Badge variant="secondary" className="ml-1">{category.count}</Badge>
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videoModules.map((video) => (
                <Card key={video.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden border-2 hover:border-primary/50">
                  <div className="relative">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title} 
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {video.completed && (
                      <div className="absolute top-2 right-2 bg-success text-success-foreground rounded-full p-2">
                        <CheckCircle className="h-5 w-5" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="secondary" size="lg" className="shadow-xl">
                        <PlayCircle className="mr-2 h-5 w-5" />
                        Watch Now
                      </Button>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium">
                      {formatDuration(video.duration)}
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <Badge className={getDifficultyColor(video.difficulty)} variant="secondary">
                        {video.difficulty}
                      </Badge>
                      {video.hasQuiz && (
                        <Badge variant="outline" className="border-accent/50 text-accent">
                          <BookOpen className="h-3 w-3 mr-1" />
                          Quiz
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-lg leading-tight line-clamp-2">{video.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{video.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">By {video.instructor}</span>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-warning fill-warning" />
                          <span className="font-medium">{video.rating}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {video.tags.slice(0, 3).map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <Link to={video.hasQuiz ? `/quiz/${video.id}` : "#"}>
                        <Button variant={video.completed ? "outline" : "default"} className="w-full">
                          {video.completed ? "Watch Again" : video.hasQuiz ? "Take Quiz" : "Start Learning"}
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Continue Learning Section */}
        {videoModules.some(v => !v.completed) && (
          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-background">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PlayCircle className="h-6 w-6 text-primary" />
                Continue Learning
              </CardTitle>
              <CardDescription>Pick up where you left off</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {videoModules.filter(v => !v.completed).slice(0, 2).map((video) => (
                  <div key={video.id} className="flex gap-4 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title} 
                      className="w-24 h-16 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm line-clamp-1">{video.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        <Clock className="inline h-3 w-3 mr-1" />
                        {formatDuration(video.duration)}
                      </p>
                      <Link to={`/video/${video.id}`}>
                        <Button variant="link" size="sm" className="h-auto p-0 mt-2">
                          Continue <ChevronRight className="ml-1 h-3 w-3" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Learning;
