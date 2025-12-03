import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  ArrowRight,
  AlertTriangle,
  TrendingDown,
  MapPin,
  Factory,
  Clock,
  DollarSign,
  Users,
  Truck,
  Package,
  Zap,
  CheckCircle,
  PlayCircle,
  Calendar,
  Target,
  Eye,
  BarChart3,
  TrendingUp,
  Filter,
  FileDown,
  Network
} from "lucide-react";
import { WorkflowProcessor } from "@/components/workflow/WorkflowProcessor";
import { useDashboardFilters } from "@/contexts/DashboardFiltersContext";
import { TariffMeshDiagram } from "./TariffMeshDiagram";

interface AlertDetailProps {
  alertId: string;
  onBack: () => void;
}

export function AlertDetail({ alertId, onBack }: AlertDetailProps) {
  const { filters } = useDashboardFilters();
  const [executedActions, setExecutedActions] = useState<string[]>([]);
  const [rcaProgress, setRcaProgress] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [selectedActions, setSelectedActions] = useState<string[]>([]);
  const [showSimulation, setShowSimulation] = useState(false);
  const [shouldAnimateWorkflow, setShouldAnimateWorkflow] = useState(false);
  const [deepDiveActionId, setDeepDiveActionId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("understand");
  const [showDataSourceDialog, setShowDataSourceDialog] = useState(false);

  // Log filters to verify they persist
  useEffect(() => {
    console.log('AlertDetail - Active Filters:', filters);
  }, [filters]);

  // Simulate RCA analysis progress
  useState(() => {
    const steps = [
      { progress: 0, delay: 0 },
      { progress: 33, delay: 1500 },
      { progress: 66, delay: 1500 },
      { progress: 100, delay: 1500 }
    ];

    steps.forEach((step, index) => {
      setTimeout(() => {
        setRcaProgress(step.progress);
        if (index === steps.length - 1) {
          setTimeout(() => setShowContent(true), 500);
        }
      }, steps.slice(0, index + 1).reduce((acc, s) => acc + s.delay, 0));
    });
  });

  // Get alert-specific data based on alertId
  const getAlertData = () => {
    if (alertId === "6") {
      return {
        id: alertId,
        title: "CRITICAL ALERT: US Tariff Impact - Chinese Additive Imports (Section 301)",
        severity: "critical" as const,
        timeDetected: "10 hours ago",
        impact: "$5.2M annual tariff-driven cost increase",
        region: "Americas (United States)",
        affectedAssets: ["Performance Additives", "US Blending Facilities", "Americas Distribution Network"],

        affectedProducts: [
          {
            category: "Performance Additives",
            hsnCode: "3811.21.10, 3811.21.20, 3811.21.30",
            impact: "$5.2M",
            tariffChange: "10% increase (25% → 35%) US Section 301 China Tariffs",
            products: [
              { name: "Viscosity Modifier VM-350 Polymeric", sku: "VM-350-BULK, VM-350-IBC", route: "Shenzhen, China → Los Angeles Port → US Blending Facilities" },
              { name: "Pour Point Depressant PPD-220", sku: "PPD-220-DRUM, PPD-220-BULK", route: "Ningbo, China → Long Beach → Houston Blending Plant" },
              { name: "Dispersant Additive DA-500", sku: "DA-500-IBC, DA-500-25KG", route: "Guangzhou, China → Seattle → Midwest Distribution" }
            ]
          },
          {
            category: "US Motor Oil Products (Affected by Additive Cost)",
            hsnCode: "2710.19.31, 2710.19.41, 2710.19.85",
            impact: "$3.1M Increase in landed cost",
            tariffChange: "Indirect impact from additive cost increase",
            products: [
              { name: "Castrol GTX 5W-30 Conventional Motor Oil", sku: "GTX-5W30-1QT, GTX-5W30-5QT", route: "Houston Blending → US Retail Network" },
              { name: "Castrol EDGE 0W-40 Full Synthetic", sku: "EDGE-0W40-1QT, EDGE-0W40-5QT", route: "Los Angeles Blending → AutoZone/O'Reilly Distribution" },
              { name: "Castrol Transmax ATF Dexron VI", sku: "ATF-DEX6-1QT, ATF-DEX6-GAL", route: "Midwest Blending → Walmart/NAPA Auto Parts" }
            ]
          }
        ],

        rootCause: {
          primary: "US Section 301 Tariff Escalation on Chinese Chemical Additives",
          contributing: [
            "USTR (US Trade Representative) escalated tariffs on chemical additives from 25% to 35% effective immediately",
            "85% of US additive supply sourced from China (Shenzhen, Ningbo, Guangzhou manufacturing hubs)",
            "Limited US domestic additive capacity - Lubrizol and Afton Chemical at 92% capacity utilization",
            "Long supplier qualification cycles (6-9 months) preventing rapid supplier diversification",
            "No advance industry consultation - tariff published with 2 months enforcement window",
            "US lubricant blending facilities (Houston, Los Angeles, Midwest) critically dependent on Chinese additives"
          ],
          timeline: [
            { time: "10h ago", event: "US Section 301 tariff escalation published by USTR - 25% → 35% on chemical additives (HTS 3811.21)" },
            { time: "8h ago", event: "US Customs & Border Protection updated tariff classification system" },
            { time: "6h ago", event: "Castrol Americas supply chain monitoring system flagged $5.2M cost impact" },
            { time: "4h ago", event: "Emergency supplier calls with Chinese additive manufacturers - confirmed immediate tariff application" },
            { time: "2h ago", event: "Americas leadership activated cross-functional crisis response team" },
            { time: "1h ago", event: "Contacted Lubrizol USA and Afton Chemical - limited short-term capacity available" }
          ]
        },

        impactData: {
          financial: {
            immediate: "$3.2M Indirect impact from additive cost increase",
            penalties: "$5.2M annual tariff exposure",
            total: "$8.4M total annual margin erosion including pricing pressure"
          },
          operational: {
            otif: "Contract renegotiations required for 52% of US automotive OEM and retail accounts",
            stockout: "Domestic sourcing diversification required within 60-90 days to avoid supply risk",
            production: "7 US blending facilities affected: Houston, Los Angeles, Chicago, Newark, Atlanta, Dallas, Detroit"
          },
          customers: [
            { name: "AutoZone (US Retail Chain)", impact: "Price increase negotiations - 12% of Americas volume", severity: "critical" },
            { name: "O'Reilly Auto Parts", impact: "Margin compression on Castrol GTX & EDGE portfolio", severity: "critical" },
            { name: "Walmart US Automotive", impact: "Private label and branded motor oil pricing pressure", severity: "high" },
            { name: "General Motors / Ford Motor Company", impact: "OEM factory-fill and service network cost pass-through negotiations", severity: "high" },
            { name: "NAPA Auto Parts", impact: "Transmission fluid and specialty lubricant pricing adjustments required", severity: "high" }
          ]
        },

        recommendations: [
          {
            id: "1",
            action: "Activate US Domestic Additive Suppliers",
            description: "Immediately engage Lubrizol USA (Ohio) and Afton Chemical (Virginia) to secure 40% of critical additive volume. Negotiate premium pricing for expedited capacity allocation. Fast-track supplier qualification with compressed testing protocols for VM-350, PPD-220, and DA-500 equivalents.",
            impact: "Eliminate $3.1M of tariff exposure, reduce dependency on Chinese imports by 40%",
            cost: "$850K premium pricing + $180K expedited qualification costs",
            confidence: 75,
            owner: "Procurement Director - Americas & Technical Quality Team",
            timeline: "45-60 days"
          },
          {
            id: "2",
            action: "Strategic Price Adjustments - US Market",
            description: "Implement US market pricing strategy: 85% tariff pass-through on flexible retail contracts (AutoZone, O'Reilly), 50% cost recovery on locked OEM contracts (GM, Ford) via renegotiation, value-added programs (extended warranties, technical support) to minimize customer resistance.",
            impact: "Recover $4.4M (85%) of margin loss through pricing adjustments",
            cost: "$75K contract renegotiation resources, estimated 3-5% volume risk on price-sensitive consumer segments",
            confidence: 80,
            owner: "Commercial Director - Americas & Key Account Managers",
            timeline: "Immediate - 3 weeks"
          },
          {
            id: "3",
            action: "Emergency Inventory Build - Pre-Tariff Additive Stock",
            description: "Place emergency purchase orders for 10-week supply of VM-350, PPD-220, and DA-500 at current 35% tariff rate (locking in current pricing before potential further escalation). Expedite ocean freight and air freight for critical SKUs. Build strategic buffer to cover domestic sourcing transition period.",
            impact: "10-week cost certainty, supply continuity during sourcing diversification",
            cost: "$2.8M working capital (inventory spike) + $420K premium logistics (partial air freight)",
            confidence: 90,
            owner: "Supply Planning Manager - Americas & Logistics",
            timeline: "Immediate - 14 days"
          },
          {
            id: "4",
            action: "Trade Policy Advocacy & Tariff Exemption Request",
            description: "Coordinate with American Petroleum Institute (API) and American Chemistry Council to petition USTR for chemical additive tariff exemption or 12-month phase-in period. Engage trade law consultants to prepare exclusion request demonstrating limited US manufacturing capacity and supply chain criticality.",
            impact: "20-30% probability of tariff reduction, phase-in extension, or HTS-specific exemption",
            cost: "$185K advocacy, legal fees, and trade consultancy",
            confidence: 40,
            owner: "Government Affairs - Americas & External Affairs VP",
            timeline: "2-8 weeks (parallel track, low certainty)"
          },
          {
            id: "5",
            action: "Product Reformulation - Reduced Additive Dependency",
            description: "Accelerate R&D program to develop reformulated motor oil blends with lower additive treat rates. Launch 'American Made Additives' marketing campaign for domestically-sourced SKUs. Prioritize lower-cost conventional motor oils (GTX) over premium synthetics to reduce per-unit tariff impact.",
            impact: "Long-term structural cost reduction $1.2M annually, enhanced supply chain resilience",
            cost: "$680K R&D reformulation + $220K marketing investment",
            confidence: 70,
            owner: "R&D Director - Americas & Product Marketing",
            timeline: "4-7 months"
          }
        ]
      };
    }

    // Default data for other alerts (Base Oil Shortage scenario)
    return {
      id: alertId,
      title: "Base Oil & Additive Shortage - Critical Supply Risk",
      severity: "critical" as const,
      timeDetected: "2 hours ago",
      impact: "€6M penalties + OTIF drop to 87%",
      region: "EMEA North",
      affectedAssets: ["Hamburg DC", "Rotterdam Plant", "Base Oil X", "Additive A-VMX320"],

      rootCause: {
        primary: "Hamburg Port Disruption",
        contributing: [
          "Supplier X quality audit delays (3-week hold)",
          "Summer demand surge +12% above forecast",
          "Limited alternate supplier capacity",
          "Logistics bottleneck at North Sea terminals"
        ],
        timeline: [
          { time: "72h ago", event: "Hamburg port labor strike begins" },
          { time: "48h ago", event: "Supplier X audit findings trigger quality hold" },
          { time: "24h ago", event: "Demand surge detected in POS data" },
          { time: "2h ago", event: "Inventory health algorithm triggers critical alert" }
        ]
      },

      impactData: {
        financial: {
          immediate: "€2.3M revenue at risk",
          penalties: "€6M OEM contract penalties",
          total: "€8.3M total exposure"
        },
        operational: {
          otif: "87% (target: 95%)",
          stockout: "N.Africa in 3 weeks",
          production: "4 plants affected"
        },
        customers: [
          { name: "BMW Group", impact: "Premium grade shortfall 15%", severity: "critical" },
          { name: "Mercedes-Benz", impact: "Delayed shipments 2-3 days", severity: "high" },
          { name: "North Africa Distributors", impact: "Stockout risk 3 weeks", severity: "critical" }
        ]
      },

      recommendations: [
        {
          id: "1",
          action: "Emergency Procurement - Base Oil X",
          description: "Activate emergency procurement from Supplier Y (Malaysia) with expedited shipping",
          impact: "Cover 60% of shortfall, +5 days lead time",
          cost: "€450K premium",
          confidence: 85,
          owner: "Procurement Team",
          timeline: "24-48 hours"
        },
        {
          id: "2",
          action: "Intra-Regional Stock Transfer",
          description: "Transfer 2,400 MT Base Oil from APAC surplus to EMEA via expedited shipping",
          impact: "Cover 35% of shortfall, restore OTIF to 92%",
          cost: "€280K logistics premium",
          confidence: 90,
          owner: "Supply Planning",
          timeline: "3-5 days"
        },
        {
          id: "3",
          action: "Customer Communication & Prioritization",
          description: "Proactive OEM communication with premium customer priority allocation",
          impact: "Reduce penalty exposure by 70%",
          cost: "€0",
          confidence: 75,
          owner: "Customer Service",
          timeline: "Immediate"
        },
        {
          id: "4",
          action: "Local Supplier Activation",
          description: "Accelerate qualification of European additive suppliers with temporary approval",
          impact: "15% shortfall coverage, long-term resilience",
          cost: "€120K qualification costs",
          confidence: 65,
          owner: "Technical Team",
          timeline: "1-2 weeks"
        }
      ]
    };
  };

  const alertData = getAlertData();

  const triggerWorkflow = (actionId: string) => {
    setExecutedActions(prev => {
      if (!prev.includes(actionId)) {
        setShouldAnimateWorkflow(true); // Trigger animation on new execution
        setActiveTab("workflow"); // Switch to workflow tab
        return [...prev, actionId];
      }
      return prev;
    });
  };

  const resetSimulation = () => {
    setShowSimulation(false);
    setSelectedActions([]);
    setExecutedActions([]);
  };

  const toggleActionSelection = (actionId: string) => {
    setSelectedActions(prev => {
      if (prev.includes(actionId)) {
        return prev.filter(id => id !== actionId);
      }
      return [...prev, actionId];
    });
  };

  const handleSimulate = () => {
    if (selectedActions.length >= 2) {
      setShowSimulation(true);
    }
  };

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-card border-b border-border p-6 animate-slide-in-right">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Command Center
            </Button>

            <Badge variant="secondary" className="bg-gradient-critical text-critical-foreground">
              <AlertTriangle className="h-3 w-3 mr-1" />
              CRITICAL
            </Badge>

            <div className="text-xs text-muted-foreground flex items-center space-x-1">
              <Clock className="h-3 w-3" />
              <span>Detected {alertData.timeDetected}</span>
            </div>
          </div>

          {alertId === "6" && (
            <div className="flex flex-col gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.open('http://localhost:8081', '_blank')}
                className="flex items-center gap-2"
              >
                Go to Tariff Resiliency Dashboard
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowDataSourceDialog(true)}
                className="flex items-center gap-2"
              >
                <Network className="h-4 w-4" />
                Data Source
              </Button>
            </div>
          )}
        </div>

        <h1 className="text-2xl font-bold text-foreground mb-2">
          {alertData.title}
        </h1>

        <div className="flex items-center space-x-6 text-sm">
          <div className="flex items-center space-x-1 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{alertData.region}</span>
          </div>
          <div className="flex items-center space-x-1 text-critical font-semibold">
            <DollarSign className="h-4 w-4" />
            <span>{alertData.impact}</span>
          </div>
          {/* Display active filters */}
          {(filters.selectedRegion !== 'All Regions' ||
            filters.selectedPlant !== 'All Plants' ||
            filters.selectedSKU !== 'All SKUs' ||
            filters.selectedSupplier !== 'All Suppliers') && (
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                Active Filters:
                {filters.selectedRegion !== 'All Regions' && ` Region: ${filters.selectedRegion}`}
                {filters.selectedPlant !== 'All Plants' && ` Plant: ${filters.selectedPlant}`}
                {filters.selectedSKU !== 'All SKUs' && ` SKU: ${filters.selectedSKU}`}
                {filters.selectedSupplier !== 'All Suppliers' && ` Supplier: ${filters.selectedSupplier}`}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="understand">Understand Alert</TabsTrigger>
            <TabsTrigger value="actions">Recommended Actions</TabsTrigger>
            <TabsTrigger value="simulator">Decision Simulator</TabsTrigger>
            <TabsTrigger value="workflow">Trigger Workflow</TabsTrigger>
            <TabsTrigger value="track">Track Impact</TabsTrigger>
          </TabsList>

          {/* Understand Alert Tab */}
          <TabsContent value="understand" className="space-y-6">
            {!showContent ? (
              <Card className="bg-gradient-card border-border shadow-card">
                <div className="p-12 space-y-8">
                  <div className="text-center space-y-4">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4 animate-pulse">
                      <Zap className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">Root Cause Analysis in Progress</h3>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className={cn(
                          "font-medium transition-colors duration-300",
                          rcaProgress >= 33 ? "text-success" : "text-muted-foreground"
                        )}>
                          {rcaProgress >= 33 ? <CheckCircle className="inline h-4 w-4 mr-2" /> : <Clock className="inline h-4 w-4 mr-2" />}
                          Initiating RCA Agent
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className={cn(
                          "font-medium transition-colors duration-300",
                          rcaProgress >= 66 ? "text-success" : rcaProgress >= 33 ? "text-primary" : "text-muted-foreground"
                        )}>
                          {rcaProgress >= 66 ? <CheckCircle className="inline h-4 w-4 mr-2" /> : rcaProgress >= 33 ? <Clock className="inline h-4 w-4 mr-2 animate-pulse" /> : <Clock className="inline h-4 w-4 mr-2" />}
                          Analysis in Progress
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className={cn(
                          "font-medium transition-colors duration-300",
                          rcaProgress >= 100 ? "text-success" : rcaProgress >= 66 ? "text-primary" : "text-muted-foreground"
                        )}>
                          {rcaProgress >= 100 ? <CheckCircle className="inline h-4 w-4 mr-2" /> : rcaProgress >= 66 ? <Clock className="inline h-4 w-4 mr-2 animate-pulse" /> : <Clock className="inline h-4 w-4 mr-2" />}
                          Analysing Primary Cause and Contributing Factors to Create Financial Impact Details
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Progress value={rcaProgress} className="h-2" />
                      <p className="text-center text-xs text-muted-foreground">{rcaProgress}% Complete</p>
                    </div>
                  </div>
                </div>
              </Card>
            ) : (
              <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Root Cause Analysis */}
              <Card className="bg-gradient-card border-border shadow-card">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Root Cause Analysis Agent</h3>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Primary Cause</h4>
                      <div className="bg-critical/10 border border-critical/20 rounded-lg p-3">
                        <div className="flex items-center space-x-2">
                          <AlertTriangle className="h-4 w-4 text-critical" />
                          <span className="text-foreground font-medium">{alertData.rootCause.primary}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-foreground mb-2">Contributing Factors</h4>
                      <div className="space-y-2">
                        {alertData.rootCause.contributing.map((factor, index) => (
                          <div key={index} className="flex items-start space-x-2 text-sm">
                            <div className="w-2 h-2 bg-warning rounded-full mt-2 flex-shrink-0" />
                            <span className="text-muted-foreground">{factor}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Impact Simulation */}
              <Card className="bg-gradient-card border-border shadow-card">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Impact Simulation</h3>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Financial Impact</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Indirect Cost</span>
                          <span className="text-critical font-medium">{alertData.impactData.financial.immediate}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Direct Cost</span>
                          <span className="text-critical font-medium">{alertData.impactData.financial.penalties}</span>
                        </div>
                        <div className="border-t border-border pt-2">
                          <div className="flex justify-between font-semibold">
                            <span className="text-foreground">Total Exposure</span>
                            <span className="text-critical">{alertData.impactData.financial.total}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-foreground mb-2">Operational Impact</h4>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-muted-foreground">OTIF Performance</span>
                            <span className="text-warning font-medium">{alertData.impactData.operational.otif}</span>
                          </div>
                          <Progress value={87} className="h-2" />
                        </div>
                        <div className="text-sm">
                          <span className="text-muted-foreground">Stockout Risk: </span>
                          <span className="text-critical font-medium">{alertData.impactData.operational.stockout}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Timeline */}
            <Card className="bg-gradient-card border-border shadow-card">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Event Timeline</h3>
                <div className="space-y-4">
                  {alertData.rootCause.timeline.map((event, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-3 h-3 bg-primary rounded-full mt-1 flex-shrink-0" />
                      <div className="space-y-1">
                        <div className="text-sm font-medium text-foreground">{event.time}</div>
                        <div className="text-sm text-muted-foreground">{event.event}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Affected Products - Show for Tariff Alert */}
            {alertId === "6" && alertData.affectedProducts && (
              <Card className="bg-gradient-card border-border shadow-card">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Affected Products by Category</h3>
                  <div className="space-y-6">
                    {alertData.affectedProducts.map((productGroup, groupIndex) => {
                      // Define product-level cost breakdowns
                      const productCosts = groupIndex === 0
                        ? ["$2.1M", "$1.8M", "$1.3M"] // Performance Additives: VM-350, PPD-220, DA-500
                        : ["$1.4M", "$1.1M", "$0.6M"]; // US Motor Oil Products: GTX, EDGE, Transmax

                      return (
                        <div key={groupIndex} className="border border-border rounded-lg p-4 bg-secondary/10">
                          <div className="flex items-start justify-between mb-3">
                            <div className="space-y-1">
                              <h4 className="font-semibold text-foreground">{productGroup.category}</h4>
                              <div className="flex flex-wrap gap-2 text-xs">
                                <Badge variant="outline" className="font-mono">HSN: {productGroup.hsnCode}</Badge>
                                <Badge variant="destructive" className="text-xs">{productGroup.tariffChange}</Badge>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-bold text-critical">{productGroup.impact}</div>
                              <div className="text-xs text-muted-foreground">Financial Impact</div>
                            </div>
                          </div>

                          <div className="space-y-3 mt-4">
                            {productGroup.products.map((product, productIndex) => (
                              <div key={productIndex} className="bg-background/50 rounded-md p-3 border-l-2 border-primary">
                                <div className="flex items-start justify-between mb-2">
                                  <div className="font-medium text-foreground text-sm">{product.name}</div>
                                  <div className="text-sm font-bold text-critical ml-2">{productCosts[productIndex]}</div>
                                </div>
                                <div className="space-y-1 text-xs">
                                  <div className="flex items-start">
                                    <Package className="h-3 w-3 mr-1 mt-0.5 text-muted-foreground flex-shrink-0" />
                                    <span className="text-muted-foreground">SKUs: <span className="text-foreground font-mono">{product.sku}</span></span>
                                  </div>
                                  <div className="flex items-start">
                                    <Truck className="h-3 w-3 mr-1 mt-0.5 text-muted-foreground flex-shrink-0" />
                                    <span className="text-muted-foreground">Route: <span className="text-foreground">{product.route}</span></span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Card>
            )}

            {/* Affected Customers */}
            <Card className="bg-gradient-card border-border shadow-card">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Customer Impact Assessment</h3>
                <div className="space-y-3">
                  {alertData.impactData.customers.map((customer, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg">
                      <div className="space-y-1">
                        <div className="font-medium text-foreground">{customer.name}</div>
                        <div className="text-sm text-muted-foreground">{customer.impact}</div>
                      </div>
                      <Badge variant={customer.severity === "critical" ? "destructive" : "secondary"}>
                        {customer.severity}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
            </div>
            )}
          </TabsContent>

          {/* Recommended Actions Tab */}
          <TabsContent value="actions" className="space-y-6">
            <div className="space-y-4">
              {alertData.recommendations.map((action) => (
                <Card key={action.id} className="bg-gradient-card border-border shadow-card hover:shadow-command transition-all duration-300">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-foreground">{action.action}</h3>
                        <p className="text-muted-foreground">{action.description}</p>
                      </div>
                      <Badge variant="outline" className={cn(
                        "ml-4",
                        action.confidence >= 80 && "border-success text-success",
                        action.confidence >= 60 && action.confidence < 80 && "border-warning text-warning",
                        action.confidence < 60 && "border-critical text-critical"
                      )}>
                        {action.confidence}% confidence
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                      <div className="space-y-1">
                        <div className="text-xs text-muted-foreground uppercase tracking-wide">Impact</div>
                        <div className="text-sm font-medium text-foreground">{action.impact}</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs text-muted-foreground uppercase tracking-wide">Cost</div>
                        <div className="text-sm font-medium text-warning">{action.cost}</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs text-muted-foreground uppercase tracking-wide">Owner</div>
                        <div className="text-sm font-medium text-foreground flex items-center">
                          <Users className="h-3 w-3 mr-1" />
                          {action.owner}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs text-muted-foreground uppercase tracking-wide">Timeline</div>
                        <div className="text-sm font-medium text-foreground flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {action.timeline}
                        </div>
                      </div>
                    </div>

                    <Button
                      className="w-full"
                      variant="outline"
                      onClick={() => setDeepDiveActionId(action.id)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Deep Dive
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Decision Simulator Tab */}
          <TabsContent value="simulator" className="space-y-6">
            {!showSimulation ? (
              <div className="space-y-6">
                <Card className="bg-gradient-card border-border shadow-card">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-2">Select Actions to Compare</h3>
                    <p className="text-muted-foreground text-sm mb-6">Choose 2 or more recommended actions to compare their potential impact</p>

                    <div className="space-y-4">
                      {alertData.recommendations.map((action) => (
                        <div
                          key={action.id}
                          className={cn(
                            "border rounded-lg p-4 cursor-pointer transition-all duration-300",
                            selectedActions.includes(action.id)
                              ? "border-primary bg-primary/10 shadow-md"
                              : "border-border bg-secondary/20 hover:border-primary/50"
                          )}
                          onClick={() => toggleActionSelection(action.id)}
                        >
                          <div className="flex items-start space-x-3">
                            <div className={cn(
                              "w-5 h-5 rounded border-2 flex items-center justify-center mt-1 transition-colors",
                              selectedActions.includes(action.id)
                                ? "border-primary bg-primary"
                                : "border-muted-foreground"
                            )}>
                              {selectedActions.includes(action.id) && (
                                <CheckCircle className="h-3 w-3 text-primary-foreground" />
                              )}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-foreground mb-1">{action.action}</h4>
                              <p className="text-sm text-muted-foreground mb-2">{action.description}</p>
                              <div className="flex flex-wrap gap-3 text-xs">
                                <span className="text-muted-foreground">Cost: <span className="text-warning font-medium">{action.cost}</span></span>
                                <span className="text-muted-foreground">Timeline: <span className="text-foreground font-medium">{action.timeline}</span></span>
                                <span className="text-muted-foreground">Confidence: <span className="text-success font-medium">{action.confidence}%</span></span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        {selectedActions.length === 0 && "Select 2 or more actions to compare"}
                        {selectedActions.length === 1 && "Select 1 or more actions to compare"}
                        {selectedActions.length >= 2 && `${selectedActions.length} actions selected - Ready to simulate`}
                      </div>
                      <Button
                        onClick={handleSimulate}
                        disabled={selectedActions.length < 2}
                        className="min-w-32"
                      >
                        <BarChart3 className="h-4 w-4 mr-2" />
                        Simulate
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            ) : (
              <div className="space-y-6 animate-fade-in">
                <Card className="bg-gradient-card border-border shadow-card">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold text-foreground">Comparison Results</h3>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={resetSimulation}
                      >
                        Reset & Start New Simulation
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
                      {selectedActions.map((actionId) => {
                        const action = alertData.recommendations.find(a => a.id === actionId);
                        if (!action) return null;
                        return (
                          <div key={actionId} className="bg-secondary/20 rounded-lg p-4">
                            <h4 className="font-semibold text-foreground mb-3 text-sm">{action.action}</h4>
                            <div className="space-y-2 text-xs">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Cost</span>
                                <span className="font-medium text-warning">{action.cost}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Timeline</span>
                                <span className="font-medium text-foreground">{action.timeline}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Confidence</span>
                                <span className="font-medium text-success">{action.confidence}%</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Comparison Charts */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* ROI Comparison */}
                      <Card className="bg-gradient-card border-border">
                        <div className="p-6">
                          <h4 className="font-semibold text-foreground mb-4 flex items-center">
                            <TrendingUp className="h-4 w-4 mr-2 text-success" />
                            ROI Comparison (12 Months)
                          </h4>
                          <div className="space-y-4">
                            {selectedActions.map((actionId, index) => {
                              const action = alertData.recommendations.find(a => a.id === actionId);
                              const roi = [285, 320, 180, 240][parseInt(actionId) - 1];
                              return (
                                <div key={actionId}>
                                  <div className="flex justify-between text-sm mb-2">
                                    <span className="text-muted-foreground truncate pr-2">{action?.action}</span>
                                    <span className="font-bold text-success">{roi}%</span>
                                  </div>
                                  <div className="w-full bg-secondary rounded-full h-3">
                                    <div
                                      className={cn(
                                        "h-3 rounded-full transition-all duration-1000",
                                        index === 0 ? "bg-primary" : "bg-accent"
                                      )}
                                      style={{ width: `${(roi / 320) * 100}%` }}
                                    />
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </Card>

                      {/* NPV Comparison */}
                      <Card className="bg-gradient-card border-border">
                        <div className="p-6">
                          <h4 className="font-semibold text-foreground mb-4 flex items-center">
                            <DollarSign className="h-4 w-4 mr-2 text-success" />
                            Net Present Value
                          </h4>
                          <div className="space-y-4">
                            {selectedActions.map((actionId, index) => {
                              const action = alertData.recommendations.find(a => a.id === actionId);
                              const npv = ["€3.2M", "€4.1M", "€2.8M", "€1.9M"][parseInt(actionId) - 1];
                              const npvValue = [3.2, 4.1, 2.8, 1.9][parseInt(actionId) - 1];
                              return (
                                <div key={actionId}>
                                  <div className="flex justify-between text-sm mb-2">
                                    <span className="text-muted-foreground truncate pr-2">{action?.action}</span>
                                    <span className="font-bold text-success">{npv}</span>
                                  </div>
                                  <div className="w-full bg-secondary rounded-full h-3">
                                    <div
                                      className={cn(
                                        "h-3 rounded-full transition-all duration-1000",
                                        index === 0 ? "bg-primary" : "bg-accent"
                                      )}
                                      style={{ width: `${(npvValue / 4.1) * 100}%` }}
                                    />
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </Card>

                      {/* Risk Assessment */}
                      <Card className="bg-gradient-card border-border">
                        <div className="p-6">
                          <h4 className="font-semibold text-foreground mb-4 flex items-center">
                            <AlertTriangle className="h-4 w-4 mr-2 text-warning" />
                            Risk Assessment
                          </h4>
                          <div className="space-y-4">
                            {selectedActions.map((actionId, index) => {
                              const action = alertData.recommendations.find(a => a.id === actionId);
                              const risk = ["Low", "Medium", "Medium", "High"][parseInt(actionId) - 1];
                              const riskValue = [25, 50, 50, 85][parseInt(actionId) - 1];
                              return (
                                <div key={actionId}>
                                  <div className="flex justify-between text-sm mb-2">
                                    <span className="text-muted-foreground truncate pr-2">{action?.action}</span>
                                    <span className={cn(
                                      "font-bold",
                                      risk === "Low" && "text-success",
                                      risk === "Medium" && "text-warning",
                                      risk === "High" && "text-critical"
                                    )}>{risk}</span>
                                  </div>
                                  <div className="w-full bg-secondary rounded-full h-3">
                                    <div
                                      className={cn(
                                        "h-3 rounded-full transition-all duration-1000",
                                        risk === "Low" && "bg-success",
                                        risk === "Medium" && "bg-warning",
                                        risk === "High" && "bg-critical"
                                      )}
                                      style={{ width: `${riskValue}%` }}
                                    />
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </Card>

                      {/* Implementation Complexity */}
                      <Card className="bg-gradient-card border-border">
                        <div className="p-6">
                          <h4 className="font-semibold text-foreground mb-4 flex items-center">
                            <Target className="h-4 w-4 mr-2 text-primary" />
                            Implementation Complexity
                          </h4>
                          <div className="space-y-4">
                            {selectedActions.map((actionId, index) => {
                              const action = alertData.recommendations.find(a => a.id === actionId);
                              const complexity = ["High", "High", "Low", "Very High"][parseInt(actionId) - 1];
                              const complexityValue = [75, 75, 30, 95][parseInt(actionId) - 1];
                              return (
                                <div key={actionId}>
                                  <div className="flex justify-between text-sm mb-2">
                                    <span className="text-muted-foreground truncate pr-2">{action?.action}</span>
                                    <span className="font-bold text-foreground">{complexity}</span>
                                  </div>
                                  <div className="w-full bg-secondary rounded-full h-3">
                                    <div
                                      className={cn(
                                        "h-3 rounded-full transition-all duration-1000",
                                        index === 0 ? "bg-primary" : "bg-accent"
                                      )}
                                      style={{ width: `${complexityValue}%` }}
                                    />
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </Card>
                    </div>
                  </div>
                </Card>

                {/* Choose Actions to Execute */}
                <Card className="bg-gradient-card border-border shadow-card">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Choose Actions to Execute</h3>
                    <p className="text-muted-foreground text-sm mb-6">Select one or more of the compared actions to trigger workflows simultaneously</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {selectedActions.map((actionId) => {
                        const action = alertData.recommendations.find(a => a.id === actionId);
                        if (!action) return null;
                        const isExecuted = executedActions.includes(actionId);
                        return (
                          <Card key={actionId} className={cn(
                            "border transition-all",
                            isExecuted ? "bg-success/10 border-success" : "bg-secondary/20 border-border hover:border-primary"
                          )}>
                            <div className="p-4">
                              <div className="flex items-start justify-between mb-3">
                                <h4 className="font-semibold text-foreground text-sm flex-1">{action.action}</h4>
                                {isExecuted && (
                                  <Badge variant="outline" className="border-success text-success ml-2">
                                    Executed
                                  </Badge>
                                )}
                              </div>
                              <Button
                                className="w-full"
                                disabled={isExecuted}
                                onClick={() => {
                                  triggerWorkflow(actionId);
                                }}
                                variant={isExecuted ? "secondary" : "default"}
                              >
                                {isExecuted ? (
                                  <>
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    Executed
                                  </>
                                 ) : (
                                  <>
                                    <PlayCircle className="h-4 w-4 mr-2" />
                                    Execute &lt;Action On {alertId === "6" ? "Tariff Manager" : "Supply Chain"}&gt;
                                  </>
                                )}
                              </Button>
                            </div>
                          </Card>
                        );
                      })}
                    </div>
                    {executedActions.length > 0 && (
                      <div className="mt-4 space-y-2">
                        <div className="text-sm text-muted-foreground">
                          {executedActions.length} {executedActions.length === 1 ? 'action' : 'actions'} executed
                        </div>
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={resetSimulation}
                        >
                          Reset & Start New Simulation
                        </Button>
                      </div>
                    )}
                  </div>
                </Card>
              </div>
            )}
          </TabsContent>

          {/* Trigger Workflow Tab */}
          <TabsContent value="workflow" className="space-y-6">
            {executedActions.length > 0 ? (
              <>
                {/* --- Consolidated Execution Status --- */}
                <Card className="bg-gradient-card border-border shadow-card">
                  <div className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <CheckCircle className="h-6 w-6 text-success" />
                      <h3 className="text-lg font-semibold text-foreground">
                        {executedActions.length} {executedActions.length === 1 ? 'Workflow' : 'Workflows'} Initiated
                      </h3>
                    </div>

                    <div className="space-y-3 mb-6">
                      {executedActions.map((actionId, index) => {
                        const action = alertData.recommendations.find(r => r.id === actionId);
                        return (
                          <div key={actionId} className="bg-success/10 border border-success/20 rounded-lg p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <Badge variant="outline" className="border-success text-success">
                                    Strategy {index + 1}
                                  </Badge>
                                  <span className="font-semibold text-foreground">{action?.action}</span>
                                </div>
                                <p className="text-sm text-muted-foreground">{action?.description}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                      <p className="text-foreground">
                        Teams notifications sent and cases created in Castrol Workflow Management System.
                      </p>
                    </div>
                  </div>
                </Card>

                {/* --- Consolidated WorkflowProcessor --- */}
                <WorkflowProcessor
                  workflowName="Process PO - Multi-Strategy Execution"
                  workflowDescription="Processing consolidated workflows for all executed strategies"
                  executedActions={executedActions.map(actionId => {
                    const action = alertData.recommendations.find(r => r.id === actionId);
                    return action;
                  }).filter((action): action is NonNullable<typeof action> => action !== undefined)}
                  alertData={alertData}
                  shouldAnimate={shouldAnimateWorkflow}
                  onAnimationComplete={() => setShouldAnimateWorkflow(false)}
                />
              </>
            ) : (
              <Card className="bg-gradient-card border-border shadow-card">
                <div className="p-6 text-center">
                  <Zap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No Active Workflow</h3>
                  <p className="text-muted-foreground">
                    Execute actions from Decision Simulator to trigger a workflow.
                  </p>
                </div>
              </Card>
            )}
          </TabsContent>

          {/* Track Impact Tab */}
          <TabsContent value="track" className="space-y-6">
            {executedActions.length > 0 ? (
              <>
                {/* Consolidated Impact for All Executed Actions */}
                <Card className="bg-gradient-card border-border shadow-card">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-foreground">Consolidated Impact Summary</h3>
                      <Badge variant="outline" className="border-primary text-primary">
                        Tracking {executedActions.length} {executedActions.length === 1 ? 'Strategy' : 'Strategies'}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {executedActions.map((actionId, index) => {
                        const action = alertData.recommendations.find(r => r.id === actionId);
                        return (
                          <Card key={actionId} className="bg-secondary/20 border-border">
                            <div className="p-4">
                              <Badge variant="outline" className="border-success text-success mb-2">
                                Strategy {index + 1}
                              </Badge>
                              <h4 className="font-semibold text-foreground text-sm mb-2">{action?.action}</h4>
                              <div className="space-y-2 text-xs">
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Cost</span>
                                  <span className="text-warning font-medium">{action?.cost}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Impact</span>
                                  <span className="text-success font-medium truncate ml-2">{action?.impact}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">Status</span>
                                  <Badge variant="outline" className="border-primary text-primary text-xs">Active</Badge>
                                </div>
                              </div>
                            </div>
                          </Card>
                        );
                      })}
                    </div>
                  </div>
                </Card>

                {/* Individual Action Impact Details */}
                {executedActions.map((actionId, index) => {
                  const executedAction = alertData.recommendations.find(r => r.id === actionId);
                  const impactMetrics = (() => {
                    // Calculate dynamic impact based on executed action
                    if (executedAction?.id === "1") {
                      return [
                        { label: "Tariff Cost Mitigation", current: "€8.5M", target: "€8.5M", progress: 30, status: "Regional sourcing diversification in progress" },
                        { label: "Margin Restoration", current: "80%", target: "100%", progress: 45, status: "Target margins recovering" },
                        { label: "Supplier Qualification", current: "EU refineries & US suppliers activated", target: "", progress: 60, status: "Transition costs: €3.2M" }
                      ];
                    } else if (executedAction?.id === "2") {
                      return [
                        { label: "Price Recovery", current: "€10.6M", target: "€15.2M", progress: 70, status: "Contract amendments in progress" },
                        { label: "Customer Negotiations", current: "120 customers", target: "145 customers", progress: 45, status: "Commercial teams engaging" },
                        { label: "Volume Risk", current: "5-10%", target: "0%", progress: 35, status: "Monitoring price-sensitive segments" }
                      ];
                    } else if (executedAction?.id === "3") {
                      return [
                        { label: "Strategic Inventory Build", current: "8-week buffer", target: "10-week buffer", progress: 85, status: "Fast-track shipments arriving" },
                        { label: "Pre-Tariff Stock Secured", current: "€4.8M", target: "€4.8M", progress: 90, status: "Emergency orders at pre-tariff rates" },
                        { label: "Margin Protection", current: "10 weeks", target: "10 weeks", progress: 95, status: "Buffer for sourcing transition" }
                      ];
                    } else if (executedAction?.id === "4") {
                      return [
                        { label: "Government Lobbying", current: "15-25% probability", target: "50%", progress: 25, status: "Industry associations engaged" },
                        { label: "Advocacy Investment", current: "€300K", target: "€300K", progress: 50, status: "Legal & trade consultancy activated" },
                        { label: "Policy Impact", current: "2-6 weeks", target: "12-month delay", progress: 35, status: "Tariff exemptions being negotiated" }
                      ];
                    } else if (executedAction?.id === "5") {
                      return [
                        { label: "Portfolio Optimization", current: "€2.5M annual", target: "€2.5M", progress: 40, status: "Regional SKUs in development" },
                        { label: "Local Formulations", current: "R&D phase", target: "Launch", progress: 30, status: "Reducing import dependency" },
                        { label: "Investment", current: "€1.2M", target: "€1.2M", progress: 55, status: "R&D, reformulation & marketing" }
                      ];
                    }
                    // Default for non-tariff alerts
                    return [
                      { label: "OTIF Recovery", current: "89%", target: "95%", progress: 78, status: "Emergency procurement improving delivery" },
                      { label: "Financial Recovery", current: "€2.1M", target: "€8.3M", progress: 25, status: "Actions initiated, impact pending" },
                      { label: "Customer Impact", current: "Premium accounts secured", target: "", progress: 85, status: "Penalty exposure reduced by 70%" }
                    ];
                  })();

                  return (
                    <div key={actionId} className="space-y-4">
                      <Card className="bg-gradient-card border-border shadow-card">
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-foreground">
                              <Badge variant="outline" className="border-primary text-primary mr-2">
                                Strategy {index + 1}
                              </Badge>
                              {executedAction?.action}
                            </h3>
                          </div>
                          <div className="space-y-4">
                            {impactMetrics.map((metric, index) => (
                              <div key={index}>
                                <div className="flex justify-between text-sm mb-2">
                                  <span className="text-muted-foreground">{metric.label}</span>
                                  <span className="text-foreground font-medium">
                                    {metric.current}{metric.target ? ` of ${metric.target}` : ''}
                                  </span>
                                </div>
                                <Progress value={metric.progress} className="h-2" />
                                <div className="text-xs text-muted-foreground mt-1">{metric.status}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </Card>

                      <Card className="bg-gradient-card border-border shadow-card">
                        <div className="p-6">
                          <h3 className="text-lg font-semibold text-foreground mb-4">Action Effectiveness</h3>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 bg-success/10 border border-success/20 rounded-lg">
                              <span className="text-sm text-foreground">{executedAction?.action}</span>
                              <Badge variant="outline" className="border-success text-success">In Progress</Badge>
                            </div>
                            <div className="bg-secondary/20 rounded-lg p-4 space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Cost Incurred</span>
                                <span className="text-warning font-medium">{executedAction?.cost}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Timeline</span>
                                <span className="text-foreground font-medium">{executedAction?.timeline}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Expected Impact</span>
                                <span className="text-success font-medium">{executedAction?.impact}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Confidence</span>
                                <span className="text-success font-medium">{executedAction?.confidence}%</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Compliance</span>
                                <span className="text-success font-medium">HSN Code Revalidated</span>
                              </div>
                            </div>

                            {/* Document Download Buttons */}
                            <div className="flex gap-2 mt-4 justify-end">
                              <Button
                                variant="outline"
                                size="sm"
                                className="gap-2"
                                onClick={() => {
                                  // Generate and download Revised Country of Origin document
                                  const actionId = executedAction?.id || '001';
                                  const actionName = executedAction?.action || 'N/A';
                                  const today = new Date().toLocaleDateString();
                                  const nextYear = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString();
                                  const effectiveDate = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toLocaleDateString();
                                  const timestamp = Date.now();
                                  const isoDate = new Date().toISOString();

                                  const docContent = `REVISED COUNTRY OF ORIGIN CERTIFICATE

Certificate Number: COO-US-2025-${actionId}
Issue Date: ${today}
Valid Until: ${nextYear}

PRODUCT INFORMATION:
Product: ${actionName}
HSN Code: 3811.21.10, 3811.21.20, 3811.21.30
Category: Performance Additives

ORIGIN VERIFICATION:
Primary Origin: United States
Manufacturing Facilities: Lubrizol USA (Ohio), Afton Chemical (Virginia)
Compliance Status: HSN Code Revalidated
Certificate Validity: Active

TARIFF & TRADE INFORMATION:
Current Tariff Rate: 35% (US Section 301 - China)
Previous Tariff Rate: 25% (US Section 301 - China)
Effective Date: ${effectiveDate}
Tariff Classification: Additional Duties on Chinese Imports
Trade Agreement: Section 301 Trade Act Investigation

DOMESTIC CONTENT VERIFICATION:
US Content Percentage: 100%
Qualifying Processing: Yes
Regional Value Content: Compliant
Rules of Origin: Substantial Transformation in USA

SUPPLIER DETAILS:
Primary Supplier: Lubrizol USA
Address: 29400 Lakeland Blvd, Wickliffe, OH 44092
Certification: ISO 9001:2015, API Certified

Secondary Supplier: Afton Chemical Corporation
Address: 500 Spring St, Richmond, VA 23219
Certification: ISO 9001:2015, IATF 16949

CUSTOMS & COMPLIANCE:
Customs Broker: American Logistics Solutions
Entry Number: US-${timestamp}
Port of Entry: Los Angeles, CA / Long Beach, CA
Importer of Record: Castrol Americas Inc.

CERTIFICATE AUTHORITY:
Issued By: US Customs and Border Protection
Certifying Officer: Trade Compliance Department
Contact: trade.compliance@castrol.com
Phone: +1-800-462-0835

This certificate confirms that the products listed above meet the country of origin requirements
and comply with all applicable US trade regulations and tariff classifications.

Digitally Signed and Verified
${isoDate}`;

                                  const blob = new Blob([docContent], { type: 'text/plain' });
                                  const url = URL.createObjectURL(blob);
                                  const a = document.createElement('a');
                                  a.href = url;
                                  a.download = `Revised_Country_of_Origin_${actionId}.txt`;
                                  document.body.appendChild(a);
                                  a.click();
                                  document.body.removeChild(a);
                                  URL.revokeObjectURL(url);
                                }}
                              >
                                <FileDown className="h-4 w-4" />
                                Revised Country of Origin
                              </Button>

                              {/* Contract Addendum button - only visible for strategy 2 */}
                              {executedAction?.id === "2" && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="gap-2"
                                  onClick={() => {
                                    // Generate and download Contract Addendum document
                                    const actionId = executedAction?.id || '002';
                                    const today = new Date().toLocaleDateString();
                                    const effectiveDate = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toLocaleDateString();
                                    const timestamp = Date.now();
                                    const isoDate = new Date().toISOString();

                                    const docContent = `CONTRACT ADDENDUM - TARIFF COST ADJUSTMENT PROVISIONS

Addendum Number: CA-US-2025-${actionId}
Effective Date: ${today}
Contract Reference: Strategic Pricing Agreement - Americas Region

PARTIES:
Supplier: Castrol Americas Inc.
Address: 1500 Valley Road, Wayne, NJ 07470
Federal Tax ID: XX-XXXXXXX

Customer: [Customer Name]
Address: [Customer Address]
Customer ID: [Customer ID]

BACKGROUND:
This Contract Addendum ("Addendum") is entered into to address the impact of new and
changed tariff regulations affecting imported petroleum additives under US Section 301
Trade Act provisions, specifically:

- Chinese additive imports (HSN: 3811.21.10, 3811.21.20, 3811.21.30)
- Tariff increase from 25% to 35% effective ${effectiveDate}
- Estimated annual impact: $5.2M across Americas operations

TARIFF ADJUSTMENT PROVISIONS:

1. COST PASS-THROUGH MECHANISM
   1.1 Flexible Retail Contracts: 85% tariff pass-through
       - Applicable to: AutoZone, O'Reilly Auto Parts, NAPA Auto Parts
       - Adjustment calculation: (New Tariff Rate - Old Tariff Rate) × Import Volume × 85%
       - Price increase effective: 30 days from notice

   1.2 Locked OEM Contracts: 50% cost recovery
       - Applicable to: GM, Ford Motor Company, OEM factory-fill programs
       - Requires good-faith renegotiation
       - Recovery through value-added programs and technical support

2. PRICE ADJUSTMENT NOTIFICATION
   2.1 Castrol shall provide written notice 30 days prior to price adjustment
   2.2 Notice shall include:
       - Specific tariff regulation reference
       - Calculation methodology
       - Effective date of adjustment
       - Product SKUs affected

3. DOCUMENTATION REQUIREMENTS
   3.1 Castrol shall maintain and provide upon request:
       - US Customs Entry Documents
       - Tariff rate verification
       - Import volume records
       - Cost basis calculations

4. DISPUTE RESOLUTION
   4.1 Good faith negotiation period: 15 business days
   4.2 Mediation if unresolved: American Arbitration Association
   4.3 Governing law: State of New Jersey

5. COST RECOVERY TIMELINE
   5.1 Immediate implementation: Flexible retail contracts
   5.2 Renegotiation period: 3 weeks for OEM contracts
   5.3 Quarterly reconciliation of actual tariff costs vs. recovered amounts

6. VOLUME RISK ACKNOWLEDGMENT
   6.1 Parties acknowledge potential 3-5% volume reduction on price-sensitive segments
   6.2 Both parties commit to maintaining strategic relationship
   6.3 Performance review: Quarterly business reviews

7. MITIGATION EFFORTS
   7.1 Castrol commits to:
       - Domestic supplier diversification (Lubrizol USA, Afton Chemical)
       - Product reformulation programs
       - Supply chain optimization
   7.2 Cost savings from mitigation shared: 50/50 split after recovery of investment

8. TERM AND TERMINATION
   8.1 Effective upon signature by both parties
   8.2 Remains in effect until tariff rate returns to pre-escalation levels
   8.3 Either party may terminate with 90 days written notice

9. VALUE-ADDED PROGRAMS (OEM CONTRACTS ONLY)
   9.1 Extended product warranties: +6 months
   9.2 Enhanced technical support: Dedicated account engineer
   9.3 Priority allocation during supply constraints
   9.4 Co-marketing opportunities

10. ANNUAL REVIEW CLAUSE
    10.1 Parties agree to annual review of tariff landscape
    10.2 Adjustment provisions subject to mutual renegotiation
    10.3 Market conditions and competitive factors to be considered

FINANCIAL SUMMARY:
Expected Cost Recovery: $4.4M (85% of tariff impact)
Implementation Cost: $75K (contract renegotiation resources)
Volume Risk: 3-5% on price-sensitive consumer segments
Confidence Level: 80%

SIGNATURES:

For Castrol Americas Inc.:
Name: ___________________________
Title: Commercial Director - Americas
Date: ${today}

For [Customer]:
Name: ___________________________
Title: ___________________________
Date: ___________________________

WITNESS:
Name: ___________________________
Date: ___________________________

This Addendum is a legally binding supplement to the existing supply agreement and
shall be governed by the terms of the original contract except as modified herein.

Document ID: CA-${timestamp}
Generated: ${isoDate}`;

                                    const blob = new Blob([docContent], { type: 'text/plain' });
                                    const url = URL.createObjectURL(blob);
                                    const a = document.createElement('a');
                                    a.href = url;
                                    a.download = `Contract_Addendum_Strategy2_${actionId}.txt`;
                                    document.body.appendChild(a);
                                    a.click();
                                    document.body.removeChild(a);
                                    URL.revokeObjectURL(url);
                                  }}
                                >
                                  <FileDown className="h-4 w-4" />
                                  Contract Addendum
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </Card>
                    </div>
                  );
                })}
              </>
            ) : (
              <Card className="bg-gradient-card border-border shadow-card">
                <div className="p-6 text-center">
                  <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No Actions Executed</h3>
                  <p className="text-muted-foreground">
                    Execute one or more actions from the Decision Simulator to track their real-time impact.
                  </p>
                </div>
              </Card>
            )}

            {executedActions.length > 0 && (
              <Card className="bg-gradient-card border-border shadow-card">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Lessons Learned & Playbook Update</h3>
                  <div className="space-y-3">
                    <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                      <h4 className="font-medium text-foreground mb-2">Key Insights</h4>
                      {alertId === "6" ? (
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Multi-region tariff exposure requires distributed sourcing strategy across all categories</li>
                          <li>• Pre-qualified regional suppliers (EU refineries, US additives, India blending) critical for rapid response</li>
                          <li>• Strategic inventory buffers (8-10 weeks) provide essential runway for sourcing transitions</li>
                          <li>• Coordinated government affairs approach across regions accelerates policy engagement</li>
                          <li>• Product portfolio optimization toward regional SKUs reduces structural tariff vulnerability</li>
                        </ul>
                      ) : (
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Hamburg port dependency requires diversification strategy</li>
                          <li>• Summer demand models need +15% buffer for festival seasons</li>
                          <li>• Pre-qualified alternate suppliers reduced response time by 40%</li>
                        </ul>
                      )}
                    </div>
                    {/* <Button variant="outline" className="w-full">
                      <Target className="h-4 w-4 mr-2" />
                      Update Supply Chain Playbook
                    </Button> */}
                  </div>
                </div>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Deep Dive Dialog */}
      <Dialog open={deepDiveActionId !== null} onOpenChange={(open) => !open && setDeepDiveActionId(null)}>
        {deepDiveActionId && (
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogTitle className="sr-only">Deep Dive Analysis</DialogTitle>
          {(() => {
            const action = alertData.recommendations.find(r => r.id === deepDiveActionId);

            // Deep dive data based on action ID
            const getDeepDiveData = () => {
              if (deepDiveActionId === "1") {
                return {
                  title: "Activate US Domestic Additive Suppliers - Deep Dive Analysis",
                  overview: "Comprehensive analysis of transitioning from Chinese additives to US domestic suppliers (Lubrizol USA & Afton Chemical) to mitigate Section 301 tariff impact.",
                  sections: [
                    {
                      title: "Current US Supply Chain Analysis",
                      items: [
                        { label: "China Additive Imports (Current)", value: "$5.2M annual exposure to 35% US Section 301 tariff" },
                        { label: "Primary Chinese Suppliers", value: "Shenzhen, Ningbo, Guangzhou - VM-350, PPD-220, DA-500" },
                        { label: "US Import Dependency", value: "85% of US additive supply sourced from China" },
                        { label: "Total US Tariff Impact", value: "$5.2M annual" }
                      ]
                    },
                    {
                      title: "US Domestic Sourcing Alternatives",
                      items: [
                        { label: "Lubrizol USA (Ohio)", value: "Target 25% of US additive volume - Wickliffe manufacturing facility" },
                        { label: "Afton Chemical (Virginia)", value: "Target 15% of US volume - Richmond plant capacity expansion" },
                        { label: "Combined US Capacity", value: "40% of critical additive volume with domestic suppliers" },
                        { label: "Qualification Timeline", value: "45-60 days compressed testing for VM-350, PPD-220, DA-500 equivalents" }
                      ]
                    },
                    {
                      title: "US Financial Impact Model",
                      items: [
                        { label: "Transition Cost", value: "$850K premium pricing + $180K expedited qualification" },
                        { label: "Tariff Savings (Year 1)", value: "$3.1M eliminated tariff exposure (40% of $5.2M)" },
                        { label: "Net Benefit Year 1", value: "$3.1M - $1.03M = $2.07M net savings" },
                        { label: "Ongoing Annual Savings", value: "$2.5M from Year 2 onwards (as premium pricing normalizes)" }
                      ]
                    },
                    {
                      title: "US Supply Chain Risk Assessment",
                      items: [
                        { label: "Supplier Capacity Risk", value: "Medium - Lubrizol at 92% capacity, requires premium pricing" },
                        { label: "Quality Risk", value: "Low - Both suppliers API/OEM certified, established US standards" },
                        { label: "Logistics Risk", value: "Low - Domestic trucking Houston/LA/Chicago blending facilities" },
                        { label: "Contract Risk", value: "Medium - 2-year volume commitments required by US suppliers" }
                      ]
                    }
                  ]
                };
              } else if (deepDiveActionId === "2") {
                return {
                  title: "Strategic Price Adjustments - US Market Deep Dive",
                  overview: "Detailed US market pricing strategy to recover Section 301 tariff costs through customer-specific negotiations with AutoZone, O'Reilly, GM, Ford, and Walmart.",
                  sections: [
                    {
                      title: "US Pricing Strategy by Customer Segment",
                      items: [
                        { label: "Flexible Retail Contracts (AutoZone, O'Reilly)", value: "85% tariff pass-through - 8-9% price increase" },
                        { label: "Locked OEM Contracts (GM, Ford)", value: "50% cost recovery via renegotiation - 4-5% increase" },
                        { label: "Mass Retail (Walmart)", value: "70% pass-through - 6-7% increase with volume incentives" },
                        { label: "NAPA Auto Parts", value: "75% recovery - 7-8% increase on transmission fluids" }
                      ]
                    },
                    {
                      title: "US Customer Negotiation Playbook",
                      items: [
                        { label: "AutoZone (12% of Americas volume)", value: "Tariff transparency presentation, 60-day implementation phase" },
                        { label: "General Motors / Ford OEM", value: "Executive engagement, joint cost optimization workshops" },
                        { label: "Walmart US Automotive", value: "Category management review, promotional support trade-off" },
                        { label: "O'Reilly Auto Parts", value: "Regional pricing adjustments, extended payment terms" }
                      ]
                    },
                    {
                      title: "US Revenue Recovery Forecast",
                      items: [
                        { label: "Target Recovery", value: "$4.4M out of $5.2M total US tariff cost (85% recovery rate)" },
                        { label: "Volume Risk", value: "3-5% volume decline in price-sensitive DIY consumer segments" },
                        { label: "Net Revenue Impact", value: "+$3.9M after volume adjustment" },
                        { label: "US Implementation Timeline", value: "Immediate - 3 weeks for retail, 6-8 weeks for OEM" }
                      ]
                    },
                    {
                      title: "US Competitive Analysis",
                      items: [
                        { label: "Shell Lubricants US", value: "Implementing 7-9% increase, similar Section 301 impact" },
                        { label: "Valvoline US", value: "6-8% selective increase on synthetic motor oils" },
                        { label: "Pennzoil (Shell)", value: "Mixed response, 5-7% average across product lines" },
                        { label: "US Market Positioning", value: "Maintain Castrol premium brand with tariff justification" }
                      ]
                    }
                  ]
                };
              } else if (deepDiveActionId === "3") {
                return {
                  title: "Emergency US Inventory Build - Pre-Tariff Additive Stock",
                  overview: "Fast-track US inventory strategy to build 10-week buffer of Chinese additives at current 35% tariff rate before potential further escalation.",
                  sections: [
                    {
                      title: "US Inventory Build Strategy",
                      items: [
                        { label: "VM-350 (China to US)", value: "10-week buffer - Lock in 35% rate before potential 45-50% escalation" },
                        { label: "PPD-220 (Ningbo to Long Beach)", value: "10-week supply - Houston Blending Plant coverage" },
                        { label: "DA-500 (Guangzhou to Seattle)", value: "10-week buffer - Midwest Distribution continuity" },
                        { label: "Total US Investment", value: "$2.8M working capital (inventory spike), 5-month payback" }
                      ]
                    },
                    {
                      title: "US Fast-Track Logistics",
                      items: [
                        { label: "Air Freight (Critical SKUs)", value: "VM-350 via air cargo (Shenzhen to LA: 2-3 days vs. 6-8 weeks sea)" },
                        { label: "Express Sea Shipping", value: "PPD-220/DA-500 expedited containers, priority US port handling" },
                        { label: "US Logistics Premium", value: "$420K (partial air freight + express sea + priority customs clearance)" },
                        { label: "US Arrival Timeline", value: "70% of inventory arriving within 14 days at US ports" }
                      ]
                    },
                    {
                      title: "US Cost-Benefit Analysis",
                      items: [
                        { label: "US Inventory Carrying Cost", value: "$2.8M × 15% annual × 5 months = $175K" },
                        { label: "US Logistics Premium", value: "$420K expedited shipping to US facilities" },
                        { label: "Total US Cost", value: "$595K" },
                        { label: "US Tariff Risk Hedge", value: "$1.8M (protection against further escalation to 45-50%)" },
                        { label: "Net US Benefit", value: "$1.2M - Highly favorable 200% ROI on cost certainty" }
                      ]
                    },
                    {
                      title: "US Storage & Distribution",
                      items: [
                        { label: "Houston Blending Facility", value: "Expand additive tank capacity by 800 MT" },
                        { label: "Los Angeles Distribution Center", value: "Pre-position 600 MT near West Coast customers" },
                        { label: "Midwest Hub (Chicago)", value: "Strategic buffer 400 MT for central US distribution" },
                        { label: "US Storage Cost", value: "Included in $175K carrying cost (5 months average)" }
                      ]
                    }
                  ]
                };
              } else if (deepDiveActionId === "4") {
                return {
                  title: "US Trade Policy Advocacy & Section 301 Tariff Exemption Request",
                  overview: "Coordinate with American Petroleum Institute and American Chemistry Council to petition USTR for chemical additive tariff exemption or phase-in period.",
                  sections: [
                    {
                      title: "US Advocacy Targets & Strategies",
                      items: [
                        { label: "American Petroleum Institute (API)", value: "Lead industry coalition for HTS 3811.21 tariff exemption petition" },
                        { label: "American Chemistry Council", value: "Section 301 exclusion request - demonstrate limited US manufacturing capacity" },
                        { label: "US Trade Representative (USTR)", value: "Product Exclusion Request under Section 301 framework with supply chain impact data" },
                        { label: "US Industry Coordination", value: "Joint petition with Shell, Valvoline, Chevron - unified lubricants industry voice" }
                      ]
                    },
                    {
                      title: "US Legal & Regulatory Approach",
                      items: [
                        { label: "Section 301 Exclusion Process", value: "Formal petition demonstrating US supply constraints (Lubrizol/Afton 92% capacity)" },
                        { label: "US Trade Law Consultancy", value: "Akin Gump - Section 301 expertise, prior USTR exemption successes" },
                        { label: "Congressional Engagement", value: "Ohio/Virginia Representatives (Lubrizol/Afton districts) for supplier capacity testimony" },
                        { label: "US Commerce Department", value: "Industry roundtable on chemical manufacturing capacity gaps" }
                      ]
                    },
                    {
                      title: "US Investment & Timeline",
                      items: [
                        { label: "US Advocacy Investment", value: "$185K (API membership, legal fees, trade consultancy, DC lobbying)" },
                        { label: "USTR Submission Timeline", value: "2-8 weeks for petition preparation and filing" },
                        { label: "USTR Review Period", value: "4-12 months for exclusion request decisions" },
                        { label: "Success Probability", value: "20-30% for exemption, 40% for 12-month phase-in extension" }
                      ]
                    },
                    {
                      title: "US Potential Outcomes",
                      items: [
                        { label: "Best Case", value: "Full HTS 3811.21 exemption - $5.2M annual US savings" },
                        { label: "Moderate Case", value: "12-month phase-in period - $2.6M first-year US relief" },
                        { label: "Minimal Case", value: "Partial exemption (VM-350 only) - $2.0M selective US relief" },
                        { label: "Worst Case", value: "No relief, but Congressional awareness for future US trade policy influence" }
                      ]
                    }
                  ]
                };
              } else if (deepDiveActionId === "5") {
                return {
                  title: "US Product Reformulation - Reduced Additive Dependency",
                  overview: "Accelerate US R&D program for motor oil blends with lower additive treat rates and launch 'American Made Additives' marketing campaign.",
                  sections: [
                    {
                      title: "US Portfolio Transformation Strategy",
                      items: [
                        { label: "Current US Additive Dependency", value: "85% of US supply from China - VM-350, PPD-220, DA-500" },
                        { label: "Target US Formulation", value: "30% reduced additive treat rate in conventional motor oils (GTX line)" },
                        { label: "US Domestic Sourcing Goal", value: "60% US-sourced additives by 2026 (18-month transformation)" },
                        { label: "US Supply Chain Resilience", value: "Eliminate China single-source dependency on performance additives" }
                      ]
                    },
                    {
                      title: "US R&D Investment Areas",
                      items: [
                        { label: "Low-Treat Formulations", value: "$380K - Develop GTX conventional oils with 25-30% lower additive content" },
                        { label: "US Additive Qualification", value: "$220K - Fast-track Lubrizol/Afton equivalents for EDGE synthetics" },
                        { label: "US OEM Approval Testing", value: "$80K - GM/Ford factory-fill re-approval for reformulated blends" },
                        { label: "Total US R&D Budget", value: "$680K over 12 months" }
                      ]
                    },
                    {
                      title: "US Champion SKU Development",
                      items: [
                        { label: "Castrol GTX 'American Formula'", value: "Conventional 5W-30 with US Lubrizol additives, lower treat rate" },
                        { label: "Castrol EDGE 'US Blend'", value: "Synthetic 0W-40 with Afton Chemical package, domestic sourcing badge" },
                        { label: "'American Made Additives' Campaign", value: "$220K marketing investment targeting patriotic US consumers" },
                        { label: "US Market Positioning", value: "Premium domestic brand with tariff-resilient cost structure" }
                      ]
                    },
                    {
                      title: "US Financial Impact (36-Month Horizon)",
                      items: [
                        { label: "US Investment Required", value: "$900K (R&D + marketing + US supply chain setup)" },
                        { label: "Year 1 US Savings", value: "$400K (10% volume shift to low-treat GTX)" },
                        { label: "Year 2 US Savings", value: "$1.2M (full US reformulated portfolio launch)" },
                        { label: "Year 3+ US Structural Benefit", value: "$1.2M+ annual US savings + enhanced tariff resilience" },
                        { label: "Cumulative 3-Year US ROI", value: "$2.8M savings vs. $900K investment = 311% ROI" }
                      ]
                    }
                  ]
                };
              }

              // Default for Base Oil Shortage scenario actions
              if (deepDiveActionId === "1") {
                return {
                  title: "Emergency Procurement Analysis",
                  overview: "Detailed analysis of emergency procurement strategy from alternate supplier (Supplier Y - Malaysia).",
                  sections: [
                    {
                      title: "Supplier Analysis",
                      items: [
                        { label: "Supplier Name", value: "Supplier Y - Petronas Lubricants (Malaysia)" },
                        { label: "Available Capacity", value: "3,200 MT Group III Base Oil 150N" },
                        { label: "Quality Certification", value: "ISO 9001, API Group III certified" },
                        { label: "Previous Relationship", value: "Pre-qualified alternate supplier since 2022" }
                      ]
                    },
                    {
                      title: "Cost Structure",
                      items: [
                        { label: "Base Price Premium", value: "€285K (8% above Supplier X standard rate)" },
                        { label: "Expedited Shipping", value: "€165K (air cargo for critical 800 MT + express sea)" },
                        { label: "Quality Testing", value: "€15K (accelerated certification testing)" },
                        { label: "Total Premium Cost", value: "€450K above normal procurement" }
                      ]
                    },
                    {
                      title: "Logistics Timeline",
                      items: [
                        { label: "Order Confirmation", value: "24 hours (existing framework agreement)" },
                        { label: "Production Lead Time", value: "5-7 days (priority production slot)" },
                        { label: "Air Cargo (Critical)", value: "800 MT arriving in 48 hours from dispatch" },
                        { label: "Express Sea Freight", value: "2,200 MT arriving in 12-14 days" }
                      ]
                    },
                    {
                      title: "Risk Mitigation",
                      items: [
                        { label: "Shortfall Coverage", value: "60% of 4,800 MT total shortfall = 2,880 MT secured" },
                        { label: "OTIF Recovery", value: "Expected improvement from 87% to 91-92%" },
                        { label: "Contract Penalty Avoidance", value: "€2.8M of €6M OEM penalties avoided" },
                        { label: "Customer Impact", value: "BMW & Mercedes shipments secured, N.Africa risk reduced" }
                      ]
                    }
                  ]
                };
              } else if (deepDiveActionId === "2") {
                return {
                  title: "Intra-Regional Stock Transfer Deep Dive",
                  overview: "Comprehensive analysis of transferring surplus inventory from APAC to cover EMEA shortfall.",
                  sections: [
                    {
                      title: "Inventory Analysis",
                      items: [
                        { label: "APAC Surplus Location", value: "Singapore Hub - 3,800 MT Group III Base Oil 150N" },
                        { label: "Transfer Quantity", value: "2,400 MT (63% of surplus, maintains APAC 4-week cover)" },
                        { label: "Current APAC Demand", value: "12% below forecast due to China economic slowdown" },
                        { label: "Opportunity Cost", value: "Low - APAC market unlikely to absorb surplus in Q3" }
                      ]
                    },
                    {
                      title: "Logistics Execution",
                      items: [
                        { label: "Shipping Route", value: "Singapore → Suez Canal → Rotterdam (expedited container)" },
                        { label: "Transit Time", value: "18-22 days (vs. 28-32 days standard)" },
                        { label: "Container Cost", value: "€280K (priority booking + Suez fast-track)" },
                        { label: "Handling & Distribution", value: "€35K (Rotterdam port to EMEA distribution network)" }
                      ]
                    },
                    {
                      title: "Impact Assessment",
                      items: [
                        { label: "Shortfall Coverage", value: "35% of 4,800 MT gap = 1,680 MT effective coverage" },
                        { label: "OTIF Improvement", value: "Combined with Action 1, OTIF recovers to 92-94%" },
                        { label: "Total Gap Closure", value: "60% (Action 1) + 35% (Action 2) = 95% shortfall resolved" },
                        { label: "Residual Risk", value: "5% gap manageable via customer prioritization" }
                      ]
                    },
                    {
                      title: "Strategic Benefits",
                      items: [
                        { label: "Capital Efficiency", value: "Leverage existing inventory vs. new procurement" },
                        { label: "Regional Flexibility", value: "Proves cross-region inventory sharing model" },
                        { label: "Cost Competitiveness", value: "€280K transfer cost vs. €450K emergency procurement" },
                        { label: "Supply Chain Resilience", value: "Validates multi-hub strategy for future disruptions" }
                      ]
                    }
                  ]
                };
              } else if (deepDiveActionId === "3") {
                return {
                  title: "Customer Communication & Prioritization Strategy",
                  overview: "Proactive customer engagement and prioritization framework to manage supply constraints and maintain relationships.",
                  sections: [
                    {
                      title: "Customer Segmentation",
                      items: [
                        { label: "Tier 1 - Critical OEMs", value: "BMW, Mercedes-Benz, Volkswagen Group (45% revenue, full allocation)" },
                        { label: "Tier 2 - Strategic Industrial", value: "North Africa distributors, key B2B partners (30% revenue, 85% allocation)" },
                        { label: "Tier 3 - Standard Customers", value: "Retail and smaller distributors (25% revenue, 60% allocation)" },
                        { label: "Prioritization Criteria", value: "Revenue, contract penalties, relationship value, growth potential" }
                      ]
                    },
                    {
                      title: "Communication Playbook",
                      items: [
                        { label: "Tier 1 Approach", value: "Executive-level calls, supply assurance letters, alternative product offerings" },
                        { label: "Tier 2 Approach", value: "Account manager engagement, transparent timelines, phased delivery plans" },
                        { label: "Tier 3 Approach", value: "Email notifications, customer portal updates, substitute product recommendations" },
                        { label: "Transparency Level", value: "High - Share Hamburg disruption details, recovery actions, expected timelines" }
                      ]
                    },
                    {
                      title: "Mitigation Offers",
                      items: [
                        { label: "Alternative Products", value: "Offer Group II+ base oils as temporary substitutes (90% performance)" },
                        { label: "Phased Delivery", value: "Partial shipments to maintain production continuity" },
                        { label: "Cost Sharing", value: "Absorb 50% of expedited shipping costs for Tier 1 customers" },
                        { label: "Service Credits", value: "€150K in service credits for customers experiencing >5 day delays" }
                      ]
                    },
                    {
                      title: "Expected Outcomes",
                      items: [
                        { label: "Tier 1 Retention", value: "100% - Full supply maintained via Actions 1 & 2" },
                        { label: "Tier 2 Satisfaction", value: "85% - Minor delays but transparent communication" },
                        { label: "Tier 3 Impact", value: "40% volume reduction, but relationship maintained with alternatives" },
                        { label: "Reputation Protection", value: "Proactive approach limits negative market sentiment" }
                      ]
                    }
                  ]
                };
              } else if (deepDiveActionId === "4") {
                return {
                  title: "Production Flexibility & Reformulation",
                  overview: "Optimize production processes and reformulate products to utilize available materials and reduce dependency on constrained Base Oil X.",
                  sections: [
                    {
                      title: "Reformulation Strategy",
                      items: [
                        { label: "Target Products", value: "12 premium motor oil SKUs currently using Base Oil X" },
                        { label: "Alternative Base Stocks", value: "Group II+ and Group III blends (already qualified)" },
                        { label: "Performance Impact", value: "Minimal - 2-3% viscosity variation within OEM spec limits" },
                        { label: "Reformulation Timeline", value: "2-3 weeks for R&D validation, production changeover" }
                      ]
                    },
                    {
                      title: "Production Line Optimization",
                      items: [
                        { label: "Rotterdam Plant", value: "Shift 40% capacity to Group II+ formulations" },
                        { label: "Hamburg DC", value: "Prioritize blending operations for Tier 1 customer orders" },
                        { label: "Batch Sizing", value: "Reduce batch sizes to maximize production flexibility" },
                        { label: "Shift Operations", value: "Add weekend shifts (€85K labor premium) to maximize throughput" }
                      ]
                    },
                    {
                      title: "Material Substitution Analysis",
                      items: [
                        { label: "Base Oil X Usage", value: "Current: 4,800 MT/month → Target: 3,200 MT/month (33% reduction)" },
                        { label: "Group II+ Substitution", value: "Increase by 1,600 MT/month from existing inventory" },
                        { label: "Additive Package Adjustment", value: "€45K investment in enhanced additive packages for performance" },
                        { label: "OEM Approval Status", value: "Pre-approved formulations under existing certifications" }
                      ]
                    },
                    {
                      title: "Financial Impact",
                      items: [
                        { label: "Reformulation Costs", value: "€120K (R&D, quality testing, process validation)" },
                        { label: "Production Premium", value: "€85K (weekend shifts, reduced batch efficiency)" },
                        { label: "Material Cost Difference", value: "+€60K (Group II+ base oil premium)" },
                        { label: "Total Investment", value: "€265K to reduce Base Oil X dependency by 33%" },
                        { label: "Benefit", value: "Avoid €1.8M in contract penalties, improve supply resilience" }
                      ]
                    }
                  ]
                };
              }

              return {
                title: "Action Analysis",
                overview: "Detailed breakdown and supporting data for this recommended action.",
                sections: [
                  {
                    title: "Overview",
                    items: [
                      { label: "Action", value: action?.action || "N/A" },
                      { label: "Confidence Level", value: `${action?.confidence}%` },
                      { label: "Expected Impact", value: action?.impact || "N/A" },
                      { label: "Estimated Cost", value: action?.cost || "N/A" }
                    ]
                  }
                ]
              };
            };

            const deepDiveData = getDeepDiveData();

            return (
              <div className="space-y-6">
                {/* Header */}
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-foreground">{deepDiveData.title}</h3>
                  <p className="text-muted-foreground">{deepDiveData.overview}</p>
                </div>

                {/* Sections */}
                {deepDiveData.sections.map((section, sectionIndex) => (
                  <Card key={sectionIndex} className="bg-gradient-card border-border">
                    <div className="p-6">
                      <h4 className="text-lg font-semibold text-foreground mb-4">{section.title}</h4>
                      <div className="space-y-3">
                        {section.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex flex-col space-y-1">
                            <div className="flex items-start justify-between">
                              <span className="text-sm font-medium text-muted-foreground">{item.label}</span>
                              <span className="text-sm text-foreground text-right ml-4">{item.value}</span>
                            </div>
                            {itemIndex < section.items.length - 1 && (
                              <div className="h-px bg-border" />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                ))}

                {/* Action Summary */}
                <Card className="bg-primary/10 border-primary/20">
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-muted-foreground">Confidence Level</div>
                        <div className="text-2xl font-bold text-foreground">{action?.confidence}%</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">Timeline</div>
                        <div className="text-lg font-semibold text-foreground">{action?.timeline}</div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            );
          })()}
        </DialogContent>
        )}
      </Dialog>

      {/* Data Source Dialog - Now showing the full mesh diagram */}
      <Dialog open={showDataSourceDialog} onOpenChange={setShowDataSourceDialog}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Tariff Alert - Agentic Intelligence Architecture</DialogTitle>
            <DialogDescription>
              Complete workflow mesh showing data sources, intelligent agents, and the 5-tab workflow system
            </DialogDescription>
          </DialogHeader>
          <TariffMeshDiagram />
        </DialogContent>
      </Dialog>
    </div>
  );
}