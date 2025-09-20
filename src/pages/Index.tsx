import DashboardHeader from "@/components/DashboardHeader";
import MapSection from "@/components/MapSection";
import TrafficControlPanel from "@/components/TrafficControlPanel";
import AlertsSection from "@/components/AlertsSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-6">
        <DashboardHeader />
        
        <div className="grid gap-6">
          {/* Map Section - Top */}
          <MapSection />
          
          {/* Traffic Control Panel - Middle */}
          <TrafficControlPanel />
          
          {/* Alerts Section - Bottom */}
          <AlertsSection />
        </div>
      </main>
    </div>
  );
};

export default Index;
