import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, AlertTriangle, Info, X, MapPin, Calendar, TrendingUp } from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix leaflet default icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface DiseaseAlert {
  id: string;
  disease: string;
  location: string;
  state: string;
  latitude: number;
  longitude: number;
  severity: "Low" | "Medium" | "High" | "Critical";
  date: string;
  affectedFarms: number;
  animalType: "Pig" | "Poultry" | "Both";
  description: string;
}

const DiseaseMap = () => {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [selectedAlert, setSelectedAlert] = useState<DiseaseAlert | null>(null);
  const [filterSeverity, setFilterSeverity] = useState<string>("all");

  const diseaseAlerts: DiseaseAlert[] = [
    {
      id: "alert_001",
      disease: "African Swine Fever (ASF)",
      location: "Guwahati, Assam",
      state: "Assam",
      latitude: 26.1445,
      longitude: 91.7362,
      severity: "Critical",
      date: "2025-10-02",
      affectedFarms: 12,
      animalType: "Pig",
      description: "Multiple ASF outbreaks reported in pig farms. Immediate quarantine measures in effect."
    },
    {
      id: "alert_002",
      disease: "Avian Influenza H5N1",
      location: "Alappuzha, Kerala",
      state: "Kerala",
      latitude: 9.4981,
      longitude: 76.3388,
      severity: "High",
      date: "2025-10-01",
      affectedFarms: 8,
      animalType: "Poultry",
      description: "H5N1 detected in poultry farms. Mass culling operations underway."
    },
    {
      id: "alert_003",
      disease: "Porcine Reproductive and Respiratory Syndrome (PRRS)",
      location: "Ludhiana, Punjab",
      state: "Punjab",
      latitude: 30.9010,
      longitude: 75.8573,
      severity: "Medium",
      date: "2025-09-28",
      affectedFarms: 5,
      animalType: "Pig",
      description: "PRRS outbreak contained. Vaccination campaign initiated in surrounding areas."
    },
    {
      id: "alert_004",
      disease: "Newcastle Disease",
      location: "Namakkal, Tamil Nadu",
      state: "Tamil Nadu",
      latitude: 11.2189,
      longitude: 78.1677,
      severity: "Medium",
      date: "2025-09-25",
      affectedFarms: 6,
      animalType: "Poultry",
      description: "Newcastle disease outbreak in poultry clusters. Enhanced biosecurity measures advised."
    },
    {
      id: "alert_005",
      disease: "Foot and Mouth Disease",
      location: "Pune, Maharashtra",
      state: "Maharashtra",
      latitude: 18.5204,
      longitude: 73.8567,
      severity: "Low",
      date: "2025-09-20",
      affectedFarms: 3,
      animalType: "Both",
      description: "Minor FMD cases reported. Situation under control with vaccination."
    },
    {
      id: "alert_006",
      disease: "Classical Swine Fever",
      location: "Ranchi, Jharkhand",
      state: "Jharkhand",
      latitude: 23.3441,
      longitude: 85.3096,
      severity: "High",
      date: "2025-10-03",
      affectedFarms: 9,
      animalType: "Pig",
      description: "Classical Swine Fever spreading rapidly. Emergency response team deployed."
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Critical": return "hsl(0, 84%, 60%)";
      case "High": return "hsl(38, 90%, 55%)";
      case "Medium": return "hsl(38, 70%, 60%)";
      case "Low": return "hsl(142, 70%, 50%)";
      default: return "hsl(142, 70%, 50%)";
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "Critical": return "destructive";
      case "High": return "secondary";
      case "Medium": return "secondary";
      case "Low": return "outline";
      default: return "outline";
    }
  };

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Initialize map
    const map = L.map(mapContainerRef.current).setView([20.5937, 78.9629], 5);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    mapRef.current = map;

    // Add markers
    diseaseAlerts.forEach((alert) => {
      const color = getSeverityColor(alert.severity);
      
      const marker = L.circleMarker([alert.latitude, alert.longitude], {
        radius: alert.severity === "Critical" ? 15 : alert.severity === "High" ? 12 : 8,
        fillColor: color,
        color: "#fff",
        weight: 2,
        opacity: 1,
        fillOpacity: 0.7
      }).addTo(map);

      marker.bindPopup(`
        <div style="min-width: 200px;">
          <h3 style="font-weight: bold; margin-bottom: 8px;">${alert.disease}</h3>
          <p style="font-size: 14px; color: #666; margin-bottom: 4px;">${alert.location}</p>
          <p style="font-size: 12px; color: #999;">Severity: ${alert.severity}</p>
          <p style="font-size: 12px; color: #999;">Affected: ${alert.affectedFarms} farms</p>
        </div>
      `);

      marker.on('click', () => {
        setSelectedAlert(alert);
      });
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  const filteredAlerts = filterSeverity === "all" 
    ? diseaseAlerts 
    : diseaseAlerts.filter(alert => alert.severity === filterSeverity);

  const stats = [
    { label: "Active Alerts", value: diseaseAlerts.length, icon: AlertTriangle, color: "text-warning" },
    { label: "Critical Outbreaks", value: diseaseAlerts.filter(a => a.severity === "Critical").length, icon: Shield, color: "text-destructive" },
    { label: "Affected Farms", value: diseaseAlerts.reduce((sum, a) => sum + a.affectedFarms, 0), icon: TrendingUp, color: "text-primary" },
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
              <p className="text-xs text-muted-foreground">Disease Outbreak Map</p>
            </div>
          </div>
          <nav className="flex items-center gap-2">
            <Link to="/dashboard">
              <Button variant="ghost" size="sm">Dashboard</Button>
            </Link>
            <Link to="/learning">
              <Button variant="ghost" size="sm">Learning</Button>
            </Link>
            <Button variant="outline" size="sm">Subscribe to Alerts</Button>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 space-y-6">
        {/* Alert Banner */}
        <Card className="border-warning/50 bg-warning/5">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-warning shrink-0 mt-0.5" />
              <div>
                <p className="font-medium mb-1">Real-Time Disease Monitoring</p>
                <p className="text-sm text-muted-foreground">
                  This map shows active disease outbreaks across India. Click on markers for details. 
                  Stay informed and implement preventive measures in your region.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-lg bg-muted ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Map and Alerts Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Map */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle>Interactive Disease Map</CardTitle>
                <CardDescription>Click on markers to view outbreak details</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div ref={mapContainerRef} className="h-[600px] w-full" />
              </CardContent>
            </Card>
          </div>

          {/* Alerts List */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Active Alerts</CardTitle>
                <CardDescription>Recent disease outbreaks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Filter */}
                <div className="flex gap-2 flex-wrap">
                  <Button 
                    variant={filterSeverity === "all" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setFilterSeverity("all")}
                  >
                    All
                  </Button>
                  <Button 
                    variant={filterSeverity === "Critical" ? "destructive" : "outline"} 
                    size="sm"
                    onClick={() => setFilterSeverity("Critical")}
                  >
                    Critical
                  </Button>
                  <Button 
                    variant={filterSeverity === "High" ? "secondary" : "outline"} 
                    size="sm"
                    onClick={() => setFilterSeverity("High")}
                  >
                    High
                  </Button>
                </div>

                {/* Alert Cards */}
                <div className="space-y-3 max-h-[500px] overflow-y-auto">
                  {filteredAlerts.map((alert) => (
                    <div
                      key={alert.id}
                      className="p-3 rounded-lg border border-border hover:bg-muted/50 cursor-pointer transition-colors"
                      onClick={() => setSelectedAlert(alert)}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <Badge variant={getSeverityBadge(alert.severity) as any}>
                          {alert.severity}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{alert.animalType}</span>
                      </div>
                      <h4 className="font-semibold text-sm mb-1">{alert.disease}</h4>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {alert.location}
                      </p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(alert.date).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Alert Detail Modal */}
      {selectedAlert && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <Badge variant={getSeverityBadge(selectedAlert.severity) as any}>
                    {selectedAlert.severity} Alert
                  </Badge>
                  <CardTitle className="text-2xl">{selectedAlert.disease}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {selectedAlert.location}, {selectedAlert.state}
                  </CardDescription>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setSelectedAlert(null)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Date Reported</p>
                  <p className="font-medium">{new Date(selectedAlert.date).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Affected Farms</p>
                  <p className="font-medium">{selectedAlert.affectedFarms} farms</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Animal Type</p>
                  <p className="font-medium">{selectedAlert.animalType}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Severity Level</p>
                  <p className="font-medium">{selectedAlert.severity}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Description</p>
                <p className="text-sm">{selectedAlert.description}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="default" className="flex-1">
                  <Shield className="mr-2 h-4 w-4" />
                  View Prevention Steps
                </Button>
                <Button variant="outline" className="flex-1">
                  Subscribe to Updates
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default DiseaseMap;
