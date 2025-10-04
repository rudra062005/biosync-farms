import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Video, Award, Map, Brain, FileCheck, BarChart3, MessageSquare, ArrowRight, CheckCircle } from "lucide-react";
import heroImage from "@/assets/hero-farm.jpg";

const Index = () => {
  const features = [
    {
      icon: Brain,
      title: "AI Risk Assessment",
      description: "Get instant biosecurity scores with AI-powered recommendations tailored to your farm",
      color: "text-primary"
    },
    {
      icon: Video,
      title: "Video Learning Hub",
      description: "Access expert-led video lessons with multilingual subtitles and offline downloads",
      color: "text-accent"
    },
    {
      icon: Award,
      title: "Gamified Compliance",
      description: "Earn badges and certificates as you improve your farm's biosecurity practices",
      color: "text-warning"
    },
    {
      icon: Map,
      title: "Disease Outbreak Map",
      description: "Stay updated with real-time alerts on disease outbreaks in your region",
      color: "text-destructive"
    },
    {
      icon: MessageSquare,
      title: "BioSecure Chatbot",
      description: "Get instant answers to your biosecurity questions via voice or text",
      color: "text-success"
    },
    {
      icon: FileCheck,
      title: "Digital Health Passport",
      description: "Maintain complete vaccination and inspection records with QR verification",
      color: "text-accent"
    }
  ];

  const stats = [
    { value: "10,000+", label: "Farms Protected" },
    { value: "50+", label: "Expert Videos" },
    { value: "95%", label: "Compliance Rate" },
    { value: "24/7", label: "AI Support" }
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
              <p className="text-xs text-muted-foreground">Farm Biosecurity Portal</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-4">
            <Link to="/about">
              <Button variant="ghost" size="sm">About</Button>
            </Link>
            <Link to="/learning">
              <Button variant="ghost" size="sm">Learning Hub</Button>
            </Link>
            <Link to="/map">
              <Button variant="ghost" size="sm">Disease Map</Button>
            </Link>
            <Link to="/auth">
              <Button variant="default" size="sm">Login</Button>
            </Link>
          </nav>
          <Link to="/auth" className="md:hidden">
            <Button variant="default" size="sm">Login</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <div className="container mx-auto px-4 py-16 md:py-24 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Shield className="h-4 w-4" />
                Smart India Hackathon 2025
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Protect Your Farm with
                <span className="gradient-hero bg-clip-text text-transparent"> AI-Powered </span>
                Biosecurity
              </h2>
              <p className="text-lg text-muted-foreground">
                Comprehensive biosecurity management for pig and poultry farms. Get instant AI assessments, 
                learn from expert videos, track compliance, and stay ahead of disease outbreaks.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/auth">
                  <Button variant="hero" size="xl" className="w-full sm:w-auto">
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/assessment">
                  <Button variant="outline" size="xl" className="w-full sm:w-auto">
                    Take Assessment
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-6 pt-4">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-primary">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl blur-3xl" />
              <img 
                src={heroImage} 
                alt="Modern biosecure farm facility" 
                className="relative rounded-2xl shadow-2xl w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need for <span className="text-primary">Complete Biosecurity</span>
            </h3>
            <p className="text-muted-foreground text-lg">
              Comprehensive tools designed specifically for Indian pig and poultry farmers
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="border-2 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <feature.icon className={`h-12 w-12 ${feature.color} mb-4`} />
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              How It Works
            </h3>
            <p className="text-muted-foreground text-lg">
              Simple 4-step process to secure your farm
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              { step: "1", title: "Sign Up", desc: "Create your free account in under 2 minutes" },
              { step: "2", title: "Assess", desc: "Complete the AI-powered biosecurity questionnaire" },
              { step: "3", title: "Learn", desc: "Watch videos and take quizzes to improve knowledge" },
              { step: "4", title: "Comply", desc: "Implement recommendations and earn certificates" }
            ].map((item, index) => (
              <div key={index} className="text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto shadow-lg">
                  {item.step}
                </div>
                <h4 className="font-bold text-lg">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary to-primary-glow text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h3 className="text-3xl md:text-4xl font-bold">
              Ready to Secure Your Farm?
            </h3>
            <p className="text-lg opacity-90">
              Join thousands of farmers already protecting their livestock with BioSecure India
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link to="/auth">
                <Button variant="secondary" size="xl" className="w-full sm:w-auto shadow-xl">
                  Start Free Assessment
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/learning">
                <Button variant="outline" size="xl" className="w-full sm:w-auto border-2 border-primary-foreground/20 bg-primary-foreground/10 hover:bg-primary-foreground/20 text-primary-foreground">
                  Explore Learning Hub
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-primary" />
                <span className="font-bold text-lg">BioSecure India</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Empowering farmers with AI-driven biosecurity solutions
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Features</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/assessment" className="hover:text-primary">Risk Assessment</Link></li>
                <li><Link to="/learning" className="hover:text-primary">Learning Hub</Link></li>
                <li><Link to="/map" className="hover:text-primary">Disease Map</Link></li>
                <li><Link to="/compliance" className="hover:text-primary">Compliance Tracker</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">Documentation</a></li>
                <li><a href="#" className="hover:text-primary">Video Tutorials</a></li>
                <li><a href="#" className="hover:text-primary">FAQ</a></li>
                <li><a href="#" className="hover:text-primary">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary">Terms of Service</a></li>
                <li><a href="#" className="hover:text-primary">Contact Us</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>Built for Smart India Hackathon 2025 by Team BioSecure 🚀</p>
            <p className="mt-2">© 2025 BioSecure India Portal. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
