import { MapPin, Navigation, Zap } from "lucide-react";

interface Vehicle {
  id: string;
  lat: number;
  lng: number;
  type: 'ambulance' | 'firetruck' | 'police';
  name: string;
}

const mockVehicles: Vehicle[] = [
  { id: '1', lat: 6.9271, lng: 79.8612, type: 'ambulance', name: 'Ambulance 01' },
  { id: '2', lat: 6.935, lng: 79.845, type: 'firetruck', name: 'Fire Truck 01' },
  { id: '3', lat: 6.940, lng: 79.850, type: 'police', name: 'Patrol Unit 03' },
  { id: '4', lat: 6.930, lng: 79.855, type: 'police', name: 'Patrol Unit 07' },
];

const MapSection = () => {
  const getVehicleIcon = (type: string) => {
    switch (type) {
      case 'ambulance': return '🚑';
      case 'firetruck': return '🚒';
      case 'police': return '🚓';
      default: return '🚗';
    }
  };

  const getVehicleColor = (type: string) => {
    switch (type) {
      case 'ambulance': return 'status-red';
      case 'firetruck': return 'status-yellow';
      case 'police': return 'text-primary';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="dashboard-card p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold flex items-center space-x-2">
          <Navigation className="w-5 h-5 text-primary" />
          <span>Real-Time Vehicle Tracking</span>
        </h2>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Zap className="w-4 h-4" />
          <span>Live Updates</span>
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="relative bg-[hsl(217_25%_10%)] rounded-lg h-96 mb-4 overflow-hidden border border-[hsl(var(--card-border))]">
        {/* Grid pattern for map effect */}
        <div className="absolute inset-0 opacity-20">
          <div className="grid grid-cols-12 gap-px h-full">
            {Array.from({ length: 144 }).map((_, i) => (
              <div key={i} className="bg-primary/10"></div>
            ))}
          </div>
        </div>
        
        {/* Vehicle markers overlay */}
        <div className="absolute inset-0 p-4">
          <div className="text-center text-primary/60 mt-20 mb-8">
            <MapPin className="w-12 h-12 mx-auto mb-2" />
            <p className="text-lg font-medium">Interactive Map View</p>
            <p className="text-sm text-muted-foreground">Real-time vehicle positions will display here</p>
          </div>
          
          {/* Mock vehicle positions */}
          <div className="grid grid-cols-2 gap-4 mt-8">
            {mockVehicles.map((vehicle, index) => (
              <div key={vehicle.id} 
                   className={`absolute animate-pulse cursor-pointer`}
                   style={{
                     left: `${20 + (index * 15)}%`,
                     top: `${40 + (index * 8)}%`,
                   }}>
                <div className="bg-card border border-card-border rounded-lg p-2 shadow-lg">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{getVehicleIcon(vehicle.type)}</span>
                    <div>
                      <div className={`font-medium text-sm ${getVehicleColor(vehicle.type)}`}>
                        {vehicle.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {vehicle.lat.toFixed(4)}, {vehicle.lng.toFixed(4)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Vehicle Legend */}
      <div className="flex items-center justify-center space-x-6 text-sm">
        <div className="flex items-center space-x-2">
          <span>🚑</span>
          <span className="text-emergency-red">Ambulance</span>
        </div>
        <div className="flex items-center space-x-2">
          <span>🚒</span>
          <span className="text-[hsl(var(--warning-amber))]">Fire Truck</span>
        </div>
        <div className="flex items-center space-x-2">
          <span>🚓</span>
          <span className="text-primary">Police</span>
        </div>
      </div>
    </div>
  );
};

export default MapSection;