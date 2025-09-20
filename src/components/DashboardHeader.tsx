import { Shield, MapPin, Clock } from "lucide-react";

const DashboardHeader = () => {
  const currentTime = new Date().toLocaleTimeString();
  const currentDate = new Date().toLocaleDateString();

  return (
    <header className="dashboard-card mb-6 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Shield className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-2xl font-bold text-foreground">Police & Traffic Control</h1>
              <p className="text-muted-foreground">Emergency Services Dashboard</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>Central Command</span>
          </div>
          
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Clock className="w-4 h-4" />
            <div className="text-right">
              <div className="font-mono">{currentTime}</div>
              <div className="text-sm">{currentDate}</div>
            </div>
          </div>
          
          <div className="emergency-indicator status-green"></div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;