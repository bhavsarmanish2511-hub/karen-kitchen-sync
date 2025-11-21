import { useState, useMemo } from "react";
import { CommandHeader } from "@/components/dashboard/CommandHeader";
import { KPICard } from "@/components/dashboard/KPICard";
import { AlertCard } from "@/components/dashboard/AlertCard";
import { TrendChart } from "@/components/dashboard/TrendChart";
import { AlertDetail } from "@/components/alerts/AlertDetail";
import { SupplyChainMap } from "@/components/dashboard/SupplyChainMap";
import { AIExecutiveBrief } from "@/components/dashboard/AIExecutiveBrief";
import { KPIDetailModal } from "@/components/dashboard/KPIDetailModal";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Map, Bot } from "lucide-react";
import { DashboardFiltersProvider, useDashboardFilters } from "@/contexts/DashboardFiltersContext";
import { getFilteredKPIData, getFilteredAlerts, getFilteredInsights } from "@/data/mockData";

function DashboardContent() {
  const { filters } = useDashboardFilters();
  const [selectedAlert, setSelectedAlert] = useState<string | null>(null);
  const [selectedKPI, setSelectedKPI] = useState<{
    title: string;
    data: any;
  } | null>(null);
  const [showAIBrief, setShowAIBrief] = useState(false);
  const [currentView, setCurrentView] = useState<"overview" | "map" | "ai">(
    "map"
  );

  // Get filtered data based on current filter selections
  const kpiData = useMemo(() => 
    getFilteredKPIData(
      filters.selectedProduct,
      filters.selectedRegion,
      filters.selectedPlant,
      filters.selectedSKU,
      filters.selectedSupplier
    ),
    [filters]
  );

  const alertsData = useMemo(() => 
    getFilteredAlerts(
      filters.selectedProduct,
      filters.selectedRegion,
      filters.selectedPlant,
      filters.selectedSKU,
      filters.selectedSupplier
    ),
    [filters]
  );

  const aiInsights = useMemo(() => 
    getFilteredInsights(
      filters.selectedProduct,
      filters.selectedRegion,
      filters.selectedPlant,
      filters.selectedSKU,
      filters.selectedSupplier
    ),
    [filters]
  );

  const handleAlertClick = (alertId: string) => {
    setSelectedAlert(alertId);
  };

  const handleBackToDashboard = () => {
    setSelectedAlert(null);
  };

  const handleKPIClick = (title: string, data: any) => {
    // All KPIs now use the modal with detailed data
    setSelectedKPI({ title, data });
  };

  const handleViewChange = (view: "overview" | "map" | "ai") => {
    setCurrentView(view);
  };

  // If an alert is selected, show the detailed view
  if (selectedAlert) {
    return (
      <AlertDetail alertId={selectedAlert} onBack={handleBackToDashboard} />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <CommandHeader />

      {/* View Navigation */}
      <div className="p-6 pb-0">
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant={currentView === "overview" ? "default" : "outline"}
            onClick={() => handleViewChange("overview")}
            className="flex items-center gap-2"
          >
            <TrendingUp className="w-4 h-4" />
            Executive Overview
          </Button>
          <Button
            variant={currentView === "map" ? "default" : "outline"}
            onClick={() => handleViewChange("map")}
            className="flex items-center gap-2"
          >
            <Map className="w-4 h-4" />
            Supply Chain Alerts
          </Button>
          {/* <Button 
            variant={currentView === "ai" ? "default" : "outline"}
            onClick={() => handleViewChange("ai")}
            className="flex items-center gap-2"
          >
            <Bot className="w-4 h-4" />
            AI Executive Brief
          </Button> */}
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Conditional Views */}
        {currentView === "overview" && (
          <>
            {/* KPI Scorecard */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">
                  Executive KPI Scorecard
                </h2>
                <div className="text-sm text-muted-foreground">
                  Click any KPI for detailed analysis
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
                {kpiData.map((kpi, index) => (
                  <KPICard
                    key={index}
                    {...kpi}
                    onClick={() => handleKPIClick(kpi.title, kpi)}
                  />
                ))}
              </div>
            </section>

            <div className="h-[calc(100vh-200px)]">
              <AIExecutiveBrief 
                kpiData={kpiData} 
                alertsData={alertsData}
                insights={aiInsights}
              />
            </div>

            {/* Main Dashboard Grid */}
            {/* <div className="grid grid-cols-1 lg:grid-cols-4 gap-6"> */}
            {/* Critical Alerts */}
            {/* <div className="lg:col-span-3 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-foreground">Critical Alerts Inbox</h2>
                  <Button variant="outline" size="sm">
                    View All Alerts
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
                <div className="space-y-3">
                  {alertsData.map((alert) => (
                    <AlertCard 
                      key={alert.id} 
                      {...alert} 
                      onClick={() => handleAlertClick(alert.id)}
                    />
                  ))}
                </div>
              </div> */}

            {/* AI Executive Assistant */}
            {/* <div className="lg:col-span-1">
                <AIExecutiveBrief kpiData={kpiData} alertsData={alertsData} />
              </div>
            </div> */}
          </>
        )}

        {currentView === "map" && <SupplyChainMap />}

        {/* {currentView === "ai" && (
          <div className="h-[calc(100vh-200px)]">
            <AIExecutiveBrief kpiData={kpiData} alertsData={alertsData} />
          </div>
        )} */}

        {/* KPI Detail Modal */}
        {selectedKPI && (
          <KPIDetailModal
            isOpen={!!selectedKPI}
            onClose={() => setSelectedKPI(null)}
            kpiTitle={selectedKPI.title}
            kpiData={selectedKPI.data}
          />
        )}
      </div>
    </div>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
