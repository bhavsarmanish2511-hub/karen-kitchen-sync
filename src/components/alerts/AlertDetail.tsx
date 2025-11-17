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
  Filter
} from "lucide-react";
import { WorkflowProcessor } from "@/components/workflow/WorkflowProcessor";
import { useDashboardFilters } from "@/contexts/DashboardFiltersContext";

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
        title: "CRITICAL: Global Tariff Impact - Multiple Product Categories",
        severity: "critical" as const,
        timeDetected: "2 hours ago",
        impact: "€15.2M tariff-driven cost increase",
        region: "Global",
        affectedAssets: ["Base Oils (EMEA)", "Additives (Americas)", "Motor Oils (India)", "Transmission Fluids (APAC)"],
        
        affectedProducts: [
          {
            category: "Base Oils - Group III",
            hsnCode: "2710.12.10 & 2710.12.20",
            impact: "€8.5M (+€2.2M)",
            tariffChange: "18% EU tariff on Gulf imports",
            products: [
              { name: "Group III Base Oil 150N", sku: "BO-150N-EMEA, BO-150N-BULK", route: "Gulf Refineries → Rotterdam → EMEA Plants" },
              { name: "Group III Base Oil 500N", sku: "BO-500N-EMEA, BO-500N-DRUM", route: "UAE → Antwerp → Distribution Centers" }
            ]
          },
          {
            category: "Performance Additives",
            hsnCode: "3811.21.10, 3811.21.20, 3811.21.30",
            impact: "$5.2M (+$1.8M)",
            tariffChange: "10% increase (25% → 35%) US Section 301",
            products: [
              { name: "Viscosity Modifier VM-350", sku: "VM-350-BULK, VM-350-IBC", route: "Shenzhen → Los Angeles → Silvassa Plant" },
              { name: "Pour Point Depressant PPD-220", sku: "PPD-220-DRUM, PPD-220-BULK", route: "Ningbo → West Coast USA" },
              { name: "Dispersant Additive DA-500", sku: "DA-500-IBC, DA-500-25KG", route: "Guangzhou → Long Beach → Americas" }
            ]
          },
          {
            category: "Synthetic Motor Oils",
            hsnCode: "2710.19.31, 2710.19.32",
            impact: "₹15 Cr margin impact",
            tariffChange: "5% duty increase (7.5% → 12.5%) India",
            products: [
              { name: "Castrol EDGE 5W-30", sku: "EDGE-5W30-1L, EDGE-5W30-4L, EDGE-5W30-208L", route: "Singapore → Mumbai Port → India Distribution" },
              { name: "Castrol MAGNATEC 5W-40", sku: "MAG-5W40-1L, MAG-5W40-3L", route: "Singapore → Chennai Port → South India" }
            ]
          },
          {
            category: "Transmission Fluids",
            hsnCode: "2710.19.85, 2710.19.86",
            impact: "$1.8M logistics cost",
            tariffChange: "30% quota reduction - Singapore-Thailand FTA",
            products: [
              { name: "ATF Dexron VI", sku: "ATF-DEX6-1L, ATF-DEX6-208L", route: "Europe → Singapore → Thailand Distribution" },
              { name: "CVT Fluid Premium", sku: "CVT-PREM-1L, CVT-PREM-20L", route: "Rotterdam → Singapore → ASEAN Markets" }
            ]
          }
        ],
        
        rootCause: {
          primary: "Coordinated Global Tariff & Trade Policy Changes",
          contributing: [
            "EU Commission 18% tariff on petroleum imports from Gulf region (EMEA impact)",
            "US Section 301 tariffs escalated 25% → 35% on Chinese chemical additives",
            "India Ministry of Finance raised import duties 7.5% → 12.5% on synthetic oils",
            "Singapore-Thailand FTA amendments reduced duty-free quotas by 30%",
            "No advance warning across regions - simultaneous policy implementation",
            "Limited alternative sourcing capacity in domestic markets"
          ],
          timeline: [
            { time: "10h ago", event: "US Section 301 tariff escalation announced (Additives)" },
            { time: "6h ago", event: "EU Commission tariff on Gulf Base Oils effective immediately" },
            { time: "5h ago", event: "India customs duty revision published (Motor Oils)" },
            { time: "3h ago", event: "Singapore-Thailand FTA quota changes implemented" },
            { time: "2h ago", event: "Global supply chain AI consolidated multi-region impact analysis" },
            { time: "1h ago", event: "Cross-functional crisis taskforce activated globally" }
          ]
        },

        impactData: {
          financial: {
            immediate: "€10.8M immediate landed cost increase across regions",
            penalties: "€15.2M total tariff exposure (YoY +€3.5M)",
            total: "€15.2M annualized tariff-driven margin erosion"
          },
          operational: {
            otif: "Price renegotiations needed for 45% of contracts globally",
            stockout: "Regional sourcing diversification required within 60-90 days",
            production: "18 distribution centers & 4 blending plants affected across EMEA, Americas, APAC, India"
          },
          customers: [
            { name: "BMW Group / Mercedes-Benz (EMEA)", impact: "Base Oil cost pass-through negotiations required", severity: "critical" },
            { name: "US Automotive OEMs & Retail Chains", impact: "Additive-dependent premium product pricing pressure", severity: "critical" },
            { name: "India Premium Motor Oil Distributors", impact: "Margin compression 4-5% on Castrol EDGE portfolio", severity: "high" },
            { name: "APAC Transmission Fluid Customers", impact: "Quota constraints affecting delivery reliability", severity: "high" }
          ]
        },

        recommendations: [
          {
            id: "1",
            action: "Regional Sourcing Diversification - Multi-Category",
            description: "EMEA: Shift 40% Base Oil to domestic EU refineries. Americas: Activate US-based additive suppliers (Lubrizol, Afton). India: Expand Silvassa blending from imported finished goods. APAC: Establish local ASEAN blending for transmission fluids.",
            impact: "Eliminate €8.5M of tariff exposure, restore 80% of target margins",
            cost: "€3.2M transition costs (supplier qualification, logistics, inventory buffer)",
            confidence: 80,
            owner: "Global Procurement & Regional Supply Directors",
            timeline: "60-90 days phased implementation"
          },
          {
            id: "2", 
            action: "Strategic Price Adjustments & Contract Amendments",
            description: "Implement tiered pricing strategy: 70% tariff pass-through on flex contracts, 40% recovery on locked OEM contracts through renegotiation, value-added service bundles to offset customer price resistance.",
            impact: "Recover €10.6M (70%) of margin erosion through pricing and contract amendments",
            cost: "€150K negotiation resources, 5-10% volume risk on price-sensitive segments",
            confidence: 75,
            owner: "Commercial Teams (EMEA, Americas, India, APAC)",
            timeline: "Immediate - 4 weeks"
          },
          {
            id: "3",
            action: "Accelerated Inventory Build - Pre-Tariff Stock", 
            description: "Fast-track in-transit shipments and place emergency orders for Base Oils, Additives, and Motor Oils at pre-tariff rates. Build 8-10 week strategic buffer across affected categories to provide sourcing transition runway.",
            impact: "10-week margin protection at pre-tariff cost, buffer for sourcing diversification",
            cost: "€4.8M working capital (temporary inventory spike, premium logistics)",
            confidence: 90,
            owner: "Supply Planning & Logistics",
            timeline: "Immediate - 10 days"
          },
          {
            id: "4",
            action: "Government Affairs & Industry Lobbying",
            description: "Coordinate with European Petroleum Association (Base Oils), American Chemistry Council (Additives), India Lubricant Manufacturers Association (Motor Oils) for tariff exemptions, phase-in periods, or FTA adjustments.",
            impact: "15-25% probability of 12-month implementation delay or category-specific exemptions",
            cost: "€300K advocacy investment, legal, and trade consultancy",
            confidence: 35,
            owner: "Government Affairs & Legal (Global coordination)",
            timeline: "2-6 weeks (parallel track)"
          },
          {
            id: "5",
            action: "Product Portfolio Optimization",
            description: "Accelerate transition to locally-sourced formulations, reduce dependency on import-heavy premium grades, launch 'regional champion' SKUs optimized for local supply chains to minimize cross-border tariff exposure.",
            impact: "Long-term structural cost reduction €2.5M annually, enhanced supply chain resilience",
            cost: "€1.2M R&D, reformulation, and marketing investment",
            confidence: 70,
            owner: "R&D, Product Management, Regional Marketing",
            timeline: "3-6 months"
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
        return [...prev, actionId];
      }
      return prev;
    });
    // In real app, this would trigger actual workflow systems
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
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => window.open('http://localhost:8081', '_blank')}
              className="flex items-center gap-2"
            >
              Go to Tariff Resiliency Dashboard
              <ArrowRight className="h-4 w-4" />
            </Button>
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
        <Tabs defaultValue="understand" className="space-y-6">
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
                          <span className="text-muted-foreground">Immediate Revenue Risk</span>
                          <span className="text-critical font-medium">{alertData.impactData.financial.immediate}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">OEM Penalties</span>
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
                    {alertData.affectedProducts.map((productGroup, groupIndex) => (
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
                              <div className="font-medium text-foreground text-sm mb-2">{product.name}</div>
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
                    ))}
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
                                    Execute
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
                    Select an action from the "Recommended Actions" tab to trigger a workflow.
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
                  title: "Emergency Procurement - Regional Sourcing Strategy",
                  overview: "Comprehensive analysis of regional sourcing diversification to mitigate tariff impact on Base Oils and Additives.",
                  sections: [
                    {
                      title: "Current Supply Chain Analysis",
                      items: [
                        { label: "Gulf Region Imports", value: "€8.5M annual exposure to 18% EU tariff" },
                        { label: "China Additive Imports", value: "$5.2M impacted by 35% US Section 301 tariff" },
                        { label: "India Synthetic Oils", value: "₹15 Cr margin compression due to reciprocal tariffs" },
                        { label: "Total Tariff Impact", value: "€15.2M across global operations" }
                      ]
                    },
                    {
                      title: "Regional Sourcing Alternatives",
                      items: [
                        { label: "EMEA Base Oils", value: "EU refineries (Rotterdam, Antwerp) - Zero tariff exposure" },
                        { label: "Americas Additives", value: "US suppliers (Texas, Louisiana) - Domestic sourcing benefit" },
                        { label: "APAC Motor Oils", value: "India local formulation - Eliminate import dependency" },
                        { label: "Qualification Timeline", value: "4-8 weeks for supplier approval and testing" }
                      ]
                    },
                    {
                      title: "Financial Impact Model",
                      items: [
                        { label: "Transition Cost", value: "€3.2M (supplier qualification, logistics setup)" },
                        { label: "Tariff Savings (Year 1)", value: "€8.5M - €3.2M = €5.3M net benefit" },
                        { label: "Ongoing Annual Savings", value: "€8.5M from Year 2 onwards" },
                        { label: "ROI", value: "165% in first year, sustained cost reduction thereafter" }
                      ]
                    },
                    {
                      title: "Risk Assessment",
                      items: [
                        { label: "Supplier Capacity Risk", value: "Medium - EU refiners have 70% capacity utilization" },
                        { label: "Quality Risk", value: "Low - Pre-qualified suppliers with ISO certifications" },
                        { label: "Logistics Risk", value: "Low - Established EMEA distribution network" },
                        { label: "Contract Risk", value: "Medium - Negotiating 3-year agreements with volume commitments" }
                      ]
                    }
                  ]
                };
              } else if (deepDiveActionId === "2") {
                return {
                  title: "Strategic Price Increase & Customer Negotiation",
                  overview: "Detailed strategy for recovering tariff costs through selective price increases and value-based customer negotiations.",
                  sections: [
                    {
                      title: "Pricing Strategy by Segment",
                      items: [
                        { label: "Premium OEM Segment", value: "7-9% price increase - High brand loyalty, low price sensitivity" },
                        { label: "Industrial B2B Segment", value: "5-7% increase with contract renegotiation clause" },
                        { label: "Distributor Channel", value: "4-6% increase with volume commitment incentives" },
                        { label: "Price-Sensitive Retail", value: "2-4% increase to minimize volume loss risk" }
                      ]
                    },
                    {
                      title: "Customer Negotiation Playbook",
                      items: [
                        { label: "Top 20 OEM Customers", value: "Executive-level engagement, tariff transparency, joint value creation" },
                        { label: "Mid-Tier Industrial", value: "Commercial team negotiations, 3-6 month phased implementation" },
                        { label: "Distributor Network", value: "Regional pricing adjustments, performance-based incentives" },
                        { label: "Retail Partners", value: "Market-based competitive pricing with promotional support" }
                      ]
                    },
                    {
                      title: "Revenue Recovery Forecast",
                      items: [
                        { label: "Target Recovery", value: "€10.6M out of €15.2M total tariff cost (70% recovery rate)" },
                        { label: "Volume Risk", value: "5-10% volume decline in price-sensitive segments" },
                        { label: "Net Revenue Impact", value: "+€8.2M after volume adjustment" },
                        { label: "Implementation Timeline", value: "3 months for full rollout across regions" }
                      ]
                    },
                    {
                      title: "Competitive Analysis",
                      items: [
                        { label: "Shell Lubricants", value: "Implementing 6-8% increase, similar tariff impact" },
                        { label: "TotalEnergies", value: "Selective 5-7% increase, focusing on premium segment" },
                        { label: "Regional Players", value: "Mixed response, 3-5% average increase" },
                        { label: "Competitive Positioning", value: "Maintain premium positioning with value justification" }
                      ]
                    }
                  ]
                };
              } else if (deepDiveActionId === "3") {
                return {
                  title: "Strategic Inventory Build - Pre-Tariff Acceleration",
                  overview: "Fast-track inventory strategy to lock in pre-tariff pricing and create cost buffer against tariff implementation.",
                  sections: [
                    {
                      title: "Inventory Build Strategy",
                      items: [
                        { label: "Base Oils (Gulf Region)", value: "10-week buffer (vs. 6-week normal) - Lock in pre-18% tariff rates" },
                        { label: "Additives (China)", value: "8-week buffer - Before 35% US tariff effective date" },
                        { label: "Motor Oils (India)", value: "12-week buffer - Hedge against reciprocal tariff uncertainty" },
                        { label: "Total Investment", value: "€4.5M working capital increase, 6-month payback" }
                      ]
                    },
                    {
                      title: "Fast-Track Logistics",
                      items: [
                        { label: "Air Freight Acceleration", value: "High-value additives via air cargo (2-3 days vs. 6-8 weeks sea)" },
                        { label: "Express Sea Shipping", value: "Dedicated container blocks, priority port handling" },
                        { label: "Logistics Premium", value: "€800K expedited shipping cost, offset by tariff savings" },
                        { label: "Arrival Timeline", value: "65% of inventory arriving within 4 weeks" }
                      ]
                    },
                    {
                      title: "Cost-Benefit Analysis",
                      items: [
                        { label: "Inventory Carrying Cost", value: "€4.5M × 15% annual rate × 6 months = €337K" },
                        { label: "Logistics Premium", value: "€800K expedited shipping" },
                        { label: "Total Cost", value: "€1.14M" },
                        { label: "Tariff Savings", value: "€2.8M (pre-tariff vs. post-tariff on 10-week inventory)" },
                        { label: "Net Benefit", value: "€1.66M - Highly favorable 145% ROI" }
                      ]
                    },
                    {
                      title: "Storage & Distribution",
                      items: [
                        { label: "Rotterdam Hub", value: "Expand tank capacity by 2,500 MT for Base Oils" },
                        { label: "Silvassa Plant (India)", value: "Additional 1,200 MT additive storage" },
                        { label: "US Distribution Centers", value: "Pre-position 8-week inventory near key customers" },
                        { label: "Storage Cost", value: "Included in €337K carrying cost estimate" }
                      ]
                    }
                  ]
                };
              } else if (deepDiveActionId === "4") {
                return {
                  title: "Trade Association Engagement & Tariff Advocacy",
                  overview: "Multi-regional trade association strategy to negotiate tariff exemptions, phase-in periods, and FTA adjustments.",
                  sections: [
                    {
                      title: "Advocacy Targets & Strategies",
                      items: [
                        { label: "European Petroleum Association", value: "Base Oils tariff exemption for Gulf imports - HS 2710.12.10 & 2710.12.20" },
                        { label: "American Chemistry Council", value: "Section 301 tariff relief for specialty additives - HS 3811.21 series" },
                        { label: "India Lubricant Association", value: "Reciprocal tariff negotiation with Gulf Cooperation Council" },
                        { label: "Global Coordinated Effort", value: "Unified industry voice across 3 major trade regions" }
                      ]
                    },
                    {
                      title: "Legal & Regulatory Approach",
                      items: [
                        { label: "EU Trade Defense", value: "Article 28 exemption application for critical industrial inputs" },
                        { label: "US Trade Representative", value: "Product Exclusion Request under Section 301 framework" },
                        { label: "India MoCI Engagement", value: "Bilateral trade talks, FTA amendment proposals" },
                        { label: "Legal Consultancy", value: "White & Case (EU), Akin Gump (US), Cyril Amarchand (India)" }
                      ]
                    },
                    {
                      title: "Investment & Timeline",
                      items: [
                        { label: "Advocacy Investment", value: "€300K (trade association membership, legal fees, lobbying)" },
                        { label: "Expected Timeline", value: "2-6 weeks for initial submissions, 6-18 months for decisions" },
                        { label: "Success Probability", value: "15-25% for exemptions, 40-60% for phase-in extensions" },
                        { label: "Parallel Track", value: "Run alongside immediate mitigation strategies (sourcing, pricing)" }
                      ]
                    },
                    {
                      title: "Potential Outcomes",
                      items: [
                        { label: "Best Case", value: "Full exemption for Base Oils & Additives - €15.2M annual savings" },
                        { label: "Moderate Case", value: "12-month phase-in period - €7.6M first-year relief" },
                        { label: "Minimal Case", value: "Product category exemptions - €3-5M selective relief" },
                        { label: "Worst Case", value: "No relief, but industry goodwill and policy influence maintained" }
                      ]
                    }
                  ]
                };
              } else if (deepDiveActionId === "5") {
                return {
                  title: "Product Portfolio Optimization & Localization",
                  overview: "Long-term strategy to reduce import dependency through local sourcing, product reformulation, and regional champion SKUs.",
                  sections: [
                    {
                      title: "Portfolio Transformation Strategy",
                      items: [
                        { label: "Current Import Dependency", value: "65% of Base Oils from Gulf, 40% of Additives from China" },
                        { label: "Target Localization", value: "80% regional sourcing by 2026 (18-month transformation)" },
                        { label: "Regional Champion SKUs", value: "Launch 12 new locally-optimized products per region" },
                        { label: "Supply Chain Resilience", value: "Eliminate single-source dependencies, build multi-country supply base" }
                      ]
                    },
                    {
                      title: "R&D Investment Areas",
                      items: [
                        { label: "Local Base Stock Formulations", value: "€450K - Develop Group II+ alternatives using regional refineries" },
                        { label: "Additive Substitution", value: "€320K - Qualify lower-tariff additive sources (EU, ASEAN)" },
                        { label: "Performance Testing", value: "€280K - OEM approval testing for reformulated products" },
                        { label: "Total R&D Budget", value: "€1.05M over 12 months" }
                      ]
                    },
                    {
                      title: "Regional Champion SKU Examples",
                      items: [
                        { label: "EMEA - 'Castrol EuroEdge'", value: "100% EU-sourced Group II+ base oil, local additives" },
                        { label: "Americas - 'Castrol StarShield'", value: "US/Mexico blended, reduced China additive content" },
                        { label: "India - 'Castrol BharatMax'", value: "India-refined base oils, ASEAN additive suppliers" },
                        { label: "Market Positioning", value: "Premium regional brands with cost-competitive structure" }
                      ]
                    },
                    {
                      title: "Financial Impact (36-Month Horizon)",
                      items: [
                        { label: "Investment Required", value: "€1.2M (R&D + marketing + supply chain setup)" },
                        { label: "Year 1 Savings", value: "€800K (partial volume shift to localized SKUs)" },
                        { label: "Year 2 Savings", value: "€2.5M (full regional portfolio launch)" },
                        { label: "Year 3+ Structural Benefit", value: "€2.5M+ annual savings, enhanced supply chain resilience" },
                        { label: "Cumulative 3-Year ROI", value: "€5.8M savings vs. €1.2M investment = 383% ROI" }
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
    </div>
  );
}