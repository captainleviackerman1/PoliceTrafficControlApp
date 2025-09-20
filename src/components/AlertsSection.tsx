import { useState } from "react";
import { AlertTriangle, MapPin, Clock, CheckCircle, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Alert {
  id: string;
  location: string;
  status: 'active' | 'resolved';
  type: 'accident' | 'fire' | 'medical' | 'security';
  time: string;
  priority: 'high' | 'medium' | 'low';
}

const AlertsSection = () => {
  const { toast } = useToast();
  
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: '1',
      location: 'Main Street & 5th Avenue',
      status: 'active',
      type: 'accident',
      time: '14:32',
      priority: 'high'
    },
    {
      id: '2',
      location: 'City Hospital - Emergency',
      status: 'active',
      type: 'medical',
      time: '14:28',
      priority: 'high'
    },
    {
      id: '3',
      location: 'Park Avenue Bridge',
      status: 'resolved',
      type: 'security',
      time: '13:45',
      priority: 'medium'
    },
    {
      id: '4',
      location: 'Shopping Mall - North Wing',
      status: 'active',
      type: 'fire',
      time: '14:10',
      priority: 'high'
    }
  ]);

  const handleResolveAlert = (alertId: string) => {
    setAlerts(prev => 
      prev.map(alert => 
        alert.id === alertId 
          ? { ...alert, status: 'resolved' as const }
          : alert
      )
    );
    
    toast({
      title: "Alert Resolved",
      description: "Alert has been marked as resolved",
    });
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'accident': return '🚨';
      case 'fire': return '🔥';
      case 'medical': return '🏥';
      case 'security': return '🔒';
      default: return '⚠️';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-emergency-red';
      case 'medium': return 'text-[hsl(var(--warning-amber))]';
      case 'low': return 'text-[hsl(var(--emergency-green))]';
      default: return 'text-muted-foreground';
    }
  };

  const getPriorityBg = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-emergency-red/20 border-emergency-red/30';
      case 'medium': return 'bg-[hsl(var(--warning-amber))]/20 border-[hsl(var(--warning-amber))]/30';
      case 'low': return 'bg-[hsl(var(--emergency-green))]/20 border-[hsl(var(--emergency-green))]/30';
      default: return 'bg-muted/20 border-muted/30';
    }
  };

  const activeAlerts = alerts.filter(alert => alert.status === 'active');
  const resolvedAlerts = alerts.filter(alert => alert.status === 'resolved');

  return (
    <div className="dashboard-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold flex items-center space-x-2">
          <AlertTriangle className="w-5 h-5 text-primary" />
          <span>Emergency Alerts</span>
        </h2>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="emergency-indicator status-red"></div>
            <span className="text-sm text-muted-foreground">{activeAlerts.length} Active</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="emergency-indicator status-green"></div>
            <span className="text-sm text-muted-foreground">{resolvedAlerts.length} Resolved</span>
          </div>
        </div>
      </div>

      {/* Active Alerts */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3 text-emergency-red">🚨 Active Alerts</h3>
        <div className="space-y-3">
          {activeAlerts.map((alert) => (
            <div key={alert.id} className={`p-4 rounded-lg border ${getPriorityBg(alert.priority)} hover:bg-opacity-30 transition-all`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{getAlertIcon(alert.type)}</span>
                  <div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium text-foreground">{alert.location}</span>
                    </div>
                    <div className="flex items-center space-x-4 mt-1">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{alert.time}</span>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full bg-background/50 ${getPriorityColor(alert.priority)} font-medium uppercase`}>
                        {alert.priority} Priority
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleResolveAlert(alert.id)}
                    className="flex items-center space-x-2 px-3 py-2 bg-[hsl(var(--emergency-green))] text-white rounded-md hover:bg-[hsl(var(--emergency-green))]/80 transition-colors text-sm"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Mark Resolved</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {activeAlerts.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <CheckCircle className="w-12 h-12 mx-auto mb-2 text-[hsl(var(--emergency-green))]" />
            <p>No active alerts</p>
            <p className="text-sm">All clear in your area</p>
          </div>
        )}
      </div>

      {/* Recent Resolved Alerts */}
      <div>
        <h3 className="text-lg font-medium mb-3 text-[hsl(var(--emergency-green))]">✅ Recently Resolved</h3>
        <div className="space-y-2">
          {resolvedAlerts.slice(0, 3).map((alert) => (
            <div key={alert.id} className="p-3 rounded-lg bg-[hsl(var(--emergency-green))]/10 border border-[hsl(var(--emergency-green))]/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-lg opacity-60">{getAlertIcon(alert.type)}</span>
                  <div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-3 h-3 text-muted-foreground" />
                      <span className="text-sm text-foreground">{alert.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">Resolved at {alert.time}</span>
                    </div>
                  </div>
                </div>
                <XCircle className="w-4 h-4 text-[hsl(var(--emergency-green))]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlertsSection;