import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { TrendChart } from "./TrendChart";
import { TrendingUp, TrendingDown, Target, AlertTriangle, Calendar, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

interface KPIDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  kpiTitle: string;
  kpiData: any;
}

const getDetailedData = (kpiTitle: string) => {
  switch (kpiTitle.toLowerCase()) {
    case "inventory cover":
      return {
        description: "Days of inventory coverage across all product categories",
        target: "45 days",
        ytdPerformance: "+2.1 days",
        forecast: "46 days EOY",
        regionalBreakdown: [
          { region: "Base Oils", value: "42 days", share: "Target 45", trend: "-3 days" },
          { region: "Additives", value: "38 days", share: "Target 40", trend: "-2 days" },
          { region: "Finished Goods", value: "48 days", share: "Target 45", trend: "+3 days" },
          { region: "Packaging", value: "52 days", share: "Target 50", trend: "+2 days" }
        ],
        trendData: [
          { label: "Q1", value: 43, target: 45 },
          { label: "Q2", value: 44, target: 45 },
          { label: "Q3", value: 45, target: 45 },
          { label: "Q4", value: 46, target: 45 }
        ],
        risks: [
          "Excess inventory in Marine Oils creating working capital constraints",
          "Low cover in Base Oils due to Hamburg port disruptions",
          "Seasonal demand fluctuations requiring buffer stock adjustments"
        ]
      };

    case "forecast accuracy":
      return {
        description: "Mean Absolute Percentage Error (MAPE) across product portfolio",
        target: "85% MAPE",
        ytdPerformance: "-1.5%",
        forecast: "83% EOY",
        regionalBreakdown: [
          { region: "Premium Grades", value: "88%", share: "Target 90", trend: "-2%" },
          { region: "Motorcycle Oils", value: "75%", share: "Target 85", trend: "-10%" },
          { region: "Industrial", value: "91%", share: "Target 88", trend: "+3%" },
          { region: "Marine", value: "84%", share: "Target 85", trend: "-1%" }
        ],
        trendData: [
          { label: "Q1", value: 84, target: 85 },
          { label: "Q2", value: 83, target: 85 },
          { label: "Q3", value: 82, target: 85 },
          { label: "Q4", value: 83, target: 85 }
        ],
        risks: [
          "Motorcycle oil demand surge unpredicted by historical models",
          "Industrial market slowdown in EMEA reducing accuracy",
          "New product launches affecting baseline forecasts"
        ]
      };

    case "inventory health":
      return {
        description: "Composite index measuring inventory quality and velocity",
        target: "80 Index",
        ytdPerformance: "-8 pts",
        forecast: "72 Index EOY",
        regionalBreakdown: [
          { region: "Slow Moving", value: "15%", share: "Target 10%", trend: "+5%" },
          { region: "Obsolete", value: "8%", share: "Target 5%", trend: "+3%" },
          { region: "Excess", value: "22%", share: "Target 15%", trend: "+7%" },
          { region: "Optimal", value: "55%", share: "Target 70%", trend: "-15%" }
        ],
        trendData: [
          { label: "Q1", value: 78, target: 80 },
          { label: "Q2", value: 75, target: 80 },
          { label: "Q3", value: 73, target: 80 },
          { label: "Q4", value: 72, target: 80 }
        ],
        risks: [
          "€3.5M tied up in slow-moving marine oil inventory",
          "Obsolete SKUs from discontinued product lines requiring write-off",
          "Excess stock accumulation in low-demand European industrial markets"
        ]
      };

    case "risk score":
      return {
        description: "Composite supply chain risk assessment across multiple dimensions",
        target: "Low Risk",
        ytdPerformance: "Elevated",
        forecast: "High Risk EOY",
        regionalBreakdown: [
          { region: "Supply Risk", value: "78", share: "Target 50", trend: "+28 pts" },
          { region: "Demand Risk", value: "65", share: "Target 50", trend: "+15 pts" },
          { region: "Quality Risk", value: "45", share: "Target 30", trend: "+15 pts" },
          { region: "Logistics Risk", value: "82", share: "Target 50", trend: "+32 pts" },
          { region: "Tariff Risk", value: "88", share: "Target 50", trend: "+38 pts" }
        ],
        trendData: [
          { label: "Supply", value: 78, target: 50 },
          { label: "Demand", value: 65, target: 50 },
          { label: "Quality", value: 45, target: 30 },
          { label: "Logistics", value: 82, target: 50 }
        ],
        risks: [
          "Hamburg port disruptions creating 6-week delay in base oil deliveries",
          "Quality non-conformance at Silvassa requiring production halts",
          "Geopolitical tensions increasing tariff exposure by €15.2M",
          "Carrier capacity constraints limiting delivery flexibility"
        ]
      };

    case "tariff impact":
      return {
        description: "Total financial impact from tariff changes across affected products",
        target: "€5M Impact",
        ytdPerformance: "+€3.5M",
        forecast: "€18M EOY",
        affectedProducts: [
          {
            product: "Base Oils",
            hsnCode: "2710.12",
            skus: ["Group II Base Oil", "Group III Base Oil"],
            tariffPercent: "18%",
            routes: ["Gulf → Rotterdam", "Singapore → Hamburg"],
            impact: "€8.5M",
            trend: "+€2.2M"
          },
          {
            product: "Additives",
            hsnCode: "3811.21",
            skus: ["Viscosity Modifiers", "Performance Additives"],
            tariffPercent: "35%",
            routes: ["China → USA", "China → India"],
            impact: "€5.2M",
            trend: "+€1.8M"
          },
          {
            product: "Motor Oil",
            hsnCode: "2710.19",
            skus: ["Synthetic 5W-30", "Synthetic 5W-40"],
            tariffPercent: "12.5%",
            routes: ["EMEA → India"],
            impact: "€1.2M",
            trend: "+€0.5M"
          },
          {
            product: "Transmission Fluids",
            hsnCode: "2710.19",
            skus: ["ATF-DEX6", "CVT-PREM"],
            tariffPercent: "30%",
            routes: ["EMEA → India"],
            impact: "€1.8M",
            trend: "+€0.5M"
          }
        ],
        trendData: [
          { label: "Base Oils", value: 85, target: 50 },
          { label: "Additives", value: 52, target: 30 },
          { label: "Motor Oil", value: 12, target: 10 },
          { label: "Transmission", value: 8, target: 5 }
        ],
        risks: [
          "EU tariff on Gulf base oils adding €85/MT to feedstock costs",
          "US-China Section 301 tariffs at 35% on critical additives",
          "India import duty increase affecting premium product margins",
          "ASEAN FTA quota reductions impacting transmission fluid routes"
        ]
      };

    case "revenue":
      return {
        description: "Total revenue across all regions and product lines",
        target: "€2.6B",
        ytdPerformance: "+8.7%",
        forecast: "€2.75B EOY",
        regionalBreakdown: [
          { region: "EMEA", value: "€1.1B", share: "46%", trend: "+15%" },
          { region: "APAC", value: "€0.8B", share: "33%", trend: "+12%" },
          { region: "Americas", value: "€0.5B", share: "21%", trend: "+5%" }
        ],
        productMix: [
          { product: "Automotive Oils", value: "€1.4B", share: "58%" },
          { product: "Industrial Fluids", value: "€0.7B", share: "29%" },
          { product: "Marine Lubricants", value: "€0.3B", share: "13%" }
        ],
        trendData: [
          { label: "Q1", value: 85, target: 90 },
          { label: "Q2", value: 92, target: 90 },
          { label: "Q3", value: 98, target: 95 },
          { label: "Q4", value: 102, target: 100 }
        ],
        risks: [
          "Currency fluctuations in emerging markets",
          "Raw material cost inflation",
          "Geopolitical tensions affecting supply"
        ]
      };

    case "volume":
      return {
        description: "Total product volume shipped across all channels",
        target: "2.1M MT",
        ytdPerformance: "+3.2%",
        forecast: "2.2M MT EOY",
        regionalBreakdown: [
          { region: "India", value: "0.9M MT", share: "50%", trend: "+18%" },
          { region: "EMEA", value: "0.5M MT", share: "28%", trend: "-2%" },
          { region: "APAC", value: "0.4M MT", share: "22%", trend: "+8%" }
        ],
        productMix: [
          { product: "Motorcycle Oils", value: "0.8M MT", share: "44%" },
          { product: "Automotive Oils", value: "0.6M MT", share: "33%" },
          { product: "Industrial", value: "0.4M MT", share: "23%" }
        ],
        trendData: [
          { label: "Jan", value: 88, target: 85 },
          { label: "Feb", value: 92, target: 90 },
          { label: "Mar", value: 96, target: 95 },
          { label: "Apr", value: 89, target: 95 }
        ],
        risks: [
          "Seasonal demand fluctuations",
          "Competitor pricing pressure",
          "Supply chain disruptions"
        ]
      };

    case "otif %":
      return {
        description: "On-Time In-Full delivery performance",
        target: "95%",
        ytdPerformance: "-2.1%",
        forecast: "89% EOY",
        regionalBreakdown: [
          { region: "Americas", value: "94%", share: "Best", trend: "+1%" },
          { region: "APAC", value: "89%", share: "Good", trend: "-1%" },
          { region: "EMEA", value: "82%", share: "Risk", trend: "-8%" }
        ],
        rootCauses: [
          { cause: "Hamburg port disruption", impact: "-6%" },
          { cause: "Carrier capacity constraints", impact: "-2%" },
          { cause: "Inventory stockouts", impact: "-3%" }
        ],
        trendData: [
          { label: "EMEA", value: 82, target: 95 },
          { label: "Americas", value: 94, target: 95 },
          { label: "APAC", value: 89, target: 95 },
          { label: "India", value: 85, target: 90 }
        ],
        risks: [
          "Customer penalty clauses activation",
          "Loss of preferred supplier status",
          "Revenue impact from stockouts"
        ]
      };

    default:
      return null;
  }
};

export function KPIDetailModal({ isOpen, onClose, kpiTitle, kpiData }: KPIDetailModalProps) {
  const detailData = getDetailedData(kpiTitle);

  if (!detailData) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className={cn(
              "w-3 h-3 rounded-full",
              `bg-kpi-${kpiData.color}`
            )} />
            {kpiTitle} - Deep Dive Analysis
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Key Metrics Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Current</span>
              </div>
              <div className="text-2xl font-bold text-foreground">
                {kpiData.value} {kpiData.unit}
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Target</span>
              </div>
              <div className="text-2xl font-bold text-foreground">
                {detailData.target}
              </div>
            </Card>

            {/* <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">YTD</span>
              </div>
              <div className={cn(
                "text-2xl font-bold",
                detailData.ytdPerformance.startsWith("+") ? "text-success" : "text-critical"
              )}>
                {detailData.ytdPerformance}
              </div>
            </Card> */}

            <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Forecast</span>
              </div>
              <div className="text-2xl font-bold text-foreground">
                {detailData.forecast}
              </div>
            </Card>
          </div>

          <Separator />

          {/* Performance Trend */}
          {/* <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Performance Trend</h3>
            <TrendChart
              title={`${kpiTitle} vs Target`}
              data={detailData.trendData}
              color="bg-success"
            />
          </div> */}

          <Separator />

          {/* Regional/Product Breakdown or Affected Products for Tariff */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {detailData.affectedProducts ? (
              <div className="md:col-span-2">
                <h3 className="text-lg font-semibold text-foreground mb-4">Affected Products by HSN Code</h3>
                <div className="space-y-4">
                  {detailData.affectedProducts.map((product, index) => (
                    <div key={index} className="p-4 bg-muted rounded-lg border border-warning/30">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <div className="font-bold text-foreground text-lg">{product.product}</div>
                          <div className="text-sm text-muted-foreground">HSN: {product.hsnCode}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-lg text-critical">{product.impact}</div>
                          <div className="text-sm text-muted-foreground">{product.trend} increase</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <div className="text-muted-foreground mb-1">Affected SKUs:</div>
                          <div className="text-foreground font-medium">
                            {product.skus.join(", ")}
                          </div>
                        </div>
                        <div>
                          <div className="text-muted-foreground mb-1">Routes:</div>
                          <div className="text-foreground font-medium">
                            {product.routes.join(", ")}
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 pt-3 border-t border-border">
                        <Badge variant="outline" className="text-critical border-critical">
                          Tariff: {product.tariffPercent}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    {detailData.regionalBreakdown ? "Category Breakdown" : "Root Causes"}
                  </h3>
                  <div className="space-y-3">
                    {(detailData.regionalBreakdown || detailData.rootCauses)?.map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                        <div>
                          <div className="font-medium text-foreground">
                            {'region' in item ? item.region : item.cause}
                          </div>
                          {'share' in item && (
                            <div className="text-sm text-muted-foreground">{item.share}</div>
                          )}
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-foreground">
                            {'value' in item ? item.value : item.impact}
                          </div>
                          {'trend' in item && (
                            <div className={cn(
                              "text-sm flex items-center gap-1",
                              item.trend.startsWith("+") && !item.region?.includes("Risk") ? "text-success" : "text-critical"
                            )}>
                              {item.trend.startsWith("+") && !item.region?.includes("Risk") ?
                                <TrendingUp className="w-3 h-3" /> :
                                <TrendingDown className="w-3 h-3" />
                              }
                              {item.trend}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {detailData.productMix && (
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">Product Mix</h3>
                    <div className="space-y-3">
                      {detailData.productMix.map((product, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                          <div className="font-medium text-foreground">{product.product}</div>
                          <div className="text-right">
                            <div className="font-bold text-foreground">{product.value}</div>
                            <div className="text-sm text-muted-foreground">{product.share} of total</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          <Separator />

          {/* Risks & Actions */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-warning" />
              Key Risks & Mitigation
            </h3>
            <div className="space-y-2">
              {detailData.risks.map((risk, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-warning/10 border border-warning/20 rounded-lg">
                  <AlertTriangle className="w-4 h-4 text-warning mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-foreground">{risk}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button>
              Create Action Plan
            </Button>
            <Button variant="secondary">
              Schedule Review
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}