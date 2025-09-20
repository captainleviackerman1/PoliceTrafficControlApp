import { useState } from "react";
import { TrafficCone, Power, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TrafficLight {
  direction: string;
  status: 'RED' | 'GREEN' | 'YELLOW';
}

const TrafficControlPanel = () => {
  const { toast } = useToast();
  
  const [trafficLights, setTrafficLights] = useState<TrafficLight[]>([
    { direction: 'North', status: 'RED' },
    { direction: 'South', status: 'GREEN' },
    { direction: 'East', status: 'YELLOW' },
    { direction: 'West', status: 'RED' },
  ]);

  const handleStatusChange = (direction: string, newStatus: 'RED' | 'GREEN' | 'YELLOW') => {
    setTrafficLights(prev => 
      prev.map(light => 
        light.direction === direction 
          ? { ...light, status: newStatus }
          : light
      )
    );
    
    toast({
      title: "Traffic Light Updated",
      description: `${direction} intersection set to ${newStatus}`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'RED': return 'status-red';
      case 'YELLOW': return 'status-yellow';
      case 'GREEN': return 'status-green';
      default: return 'bg-muted';
    }
  };

  const getStatusButtonClass = (status: string) => {
    switch (status) {
      case 'RED': return 'control-button-red';
      case 'YELLOW': return 'control-button-yellow';
      case 'GREEN': return 'control-button-green';
      default: return 'control-button';
    }
  };

  return (
    <div className="dashboard-card p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold flex items-center space-x-2">
          <TrafficCone className="w-5 h-5 text-primary" />
          <span>Traffic Light Control Center</span>
        </h2>
        <div className="flex items-center space-x-2">
          <Settings className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Manual Override Active</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[hsl(var(--card-border))]">
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">Direction</th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">Current Status</th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">Manual Override</th>
              <th className="text-left py-3 px-4 font-medium text-muted-foreground">Action</th>
            </tr>
          </thead>
          <tbody>
            {trafficLights.map((light) => (
              <tr key={light.direction} className="border-b border-[hsl(var(--card-border))]/50 hover:bg-accent/30 transition-colors">
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-2">
                    <Power className="w-4 h-4 text-primary" />
                    <span className="font-medium">{light.direction}</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-3">
                    <div className={`emergency-indicator ${getStatusColor(light.status)}`}></div>
                    <span className={`font-medium ${
                      light.status === 'RED' ? 'text-emergency-red' :
                      light.status === 'YELLOW' ? 'text-[hsl(var(--warning-amber))]' :
                      'text-[hsl(var(--emergency-green))]'
                    }`}>
                      {light.status}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className="text-sm bg-accent px-2 py-1 rounded text-accent-foreground">
                    ENABLED
                  </span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleStatusChange(light.direction, 'RED')}
                      className="control-button-red text-xs"
                      disabled={light.status === 'RED'}
                    >
                      RED
                    </button>
                    <button
                      onClick={() => handleStatusChange(light.direction, 'YELLOW')}
                      className="control-button-yellow text-xs"
                      disabled={light.status === 'YELLOW'}
                    >
                      YELLOW
                    </button>
                    <button
                      onClick={() => handleStatusChange(light.direction, 'GREEN')}
                      className="control-button-green text-xs"
                      disabled={light.status === 'GREEN'}
                    >
                      GREEN
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 p-3 bg-accent/20 rounded-lg border border-accent">
        <p className="text-sm text-muted-foreground">
          🚨 <strong>Emergency Override:</strong> All traffic lights can be controlled manually. 
          Changes will sync in real-time across all connected systems.
        </p>
      </div>
    </div>
  );
};

export default TrafficControlPanel;