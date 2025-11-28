// Mock data for dashboard based on filter selections

export interface FilteredKPIData {
  revenue: { value: string; trend: "up" | "down"; trendValue: string };
  volume: { value: string; unit: string; trend: "up" | "down"; trendValue: string };
  otif: { value: string; unit: string; trend: "up" | "down"; trendValue: string };
  inventoryCover: { value: string; unit: string; trend: "up" | "down"; trendValue: string };
  forecastAccuracy: { value: string; unit: string; trend: "up" | "down"; trendValue: string };
  inventoryHealth: { value: string; unit: string; trend: "up" | "down"; trendValue: string };
  riskScore: { value: string; trend: "up" | "down"; trendValue: string };
  tariffRisk: { value: string; unit: string; trend: "up" | "down"; trendValue: string };
}

export interface Alert {
  id: string;
  title: string;
  description: string;
  severity: "critical" | "high" | "medium" | "low";
  impact: string;
  region: string;
  timeDetected: string;
  affectedProducts?: {
    name: string;
    hsnCode: string;
    skus: string[];
    routes?: string[];
    impactPercentage?: string;
  }[];
}

export interface AIInsight {
  summary: string;
  keyFindings: string[];
  recommendations: string[];
  risks: string[];
}

// KPI data by product category
const kpiDataByProduct: Record<string, FilteredKPIData> = {
  "All Products": {
    revenue: { value: "€2.4B", trend: "up", trendValue: "+12.5%" },
    volume: { value: "1.8M", unit: "MT", trend: "up", trendValue: "+8.3%" },
    otif: { value: "87.2", unit: "%", trend: "down", trendValue: "-4.8%" },
    inventoryCover: { value: "45.2", unit: "days", trend: "up", trendValue: "+2.1 days" },
    forecastAccuracy: { value: "82.5", unit: "% MAPE", trend: "down", trendValue: "-1.5%" },
    inventoryHealth: { value: "73", unit: "Index", trend: "down", trendValue: "-8 pts" },
    riskScore: { value: "High", trend: "up", trendValue: "Critical" },
    tariffRisk: { value: "€15.2M", unit: "Impact", trend: "up", trendValue: "+€3.5M" },
  },
  "Motor Oil (2710.19)": {
    revenue: { value: "€980M", trend: "up", trendValue: "+15.2%" },
    volume: { value: "680K", unit: "MT", trend: "up", trendValue: "+10.5%" },
    otif: { value: "89.5", unit: "%", trend: "up", trendValue: "+2.3%" },
    inventoryCover: { value: "42.8", unit: "days", trend: "up", trendValue: "+1.8 days" },
    forecastAccuracy: { value: "85.2", unit: "% MAPE", trend: "up", trendValue: "+2.7%" },
    inventoryHealth: { value: "78", unit: "Index", trend: "up", trendValue: "+5 pts" },
    riskScore: { value: "Medium", trend: "down", trendValue: "Moderate" },
    tariffRisk: { value: "€5.8M", unit: "Impact", trend: "up", trendValue: "+€1.2M" },
  },
  "Industrial Lubricants (2710.19)": {
    revenue: { value: "€520M", trend: "up", trendValue: "+8.7%" },
    volume: { value: "340K", unit: "MT", trend: "up", trendValue: "+6.2%" },
    otif: { value: "91.2", unit: "%", trend: "up", trendValue: "+3.8%" },
    inventoryCover: { value: "48.5", unit: "days", trend: "up", trendValue: "+2.5 days" },
    forecastAccuracy: { value: "88.9", unit: "% MAPE", trend: "up", trendValue: "+3.2%" },
    inventoryHealth: { value: "82", unit: "Index", trend: "up", trendValue: "+9 pts" },
    riskScore: { value: "Low", trend: "down", trendValue: "Low" },
    tariffRisk: { value: "€2.1M", unit: "Impact", trend: "down", trendValue: "-€0.3M" },
  },
  "Transmission Fluids (2710.19)": {
    revenue: { value: "€285M", trend: "up", trendValue: "+11.3%" },
    volume: { value: "195K", unit: "MT", trend: "up", trendValue: "+9.1%" },
    otif: { value: "86.8", unit: "%", trend: "down", trendValue: "-2.4%" },
    inventoryCover: { value: "44.2", unit: "days", trend: "up", trendValue: "+1.6 days" },
    forecastAccuracy: { value: "81.5", unit: "% MAPE", trend: "down", trendValue: "-2.1%" },
    inventoryHealth: { value: "75", unit: "Index", trend: "down", trendValue: "-3 pts" },
    riskScore: { value: "Medium", trend: "up", trendValue: "Elevated" },
    tariffRisk: { value: "€1.8M", unit: "Impact", trend: "up", trendValue: "+€0.4M" },
  },
  "Hydraulic Oils (2710.19)": {
    revenue: { value: "€195M", trend: "up", trendValue: "+7.2%" },
    volume: { value: "145K", unit: "MT", trend: "up", trendValue: "+5.8%" },
    otif: { value: "88.4", unit: "%", trend: "up", trendValue: "+1.9%" },
    inventoryCover: { value: "46.8", unit: "days", trend: "up", trendValue: "+2.2 days" },
    forecastAccuracy: { value: "84.7", unit: "% MAPE", trend: "up", trendValue: "+1.5%" },
    inventoryHealth: { value: "79", unit: "Index", trend: "up", trendValue: "+6 pts" },
    riskScore: { value: "Low", trend: "down", trendValue: "Low" },
    tariffRisk: { value: "€0.8M", unit: "Impact", trend: "down", trendValue: "-€0.2M" },
  },
  "Marine Oils (2710.19)": {
    revenue: { value: "€165M", trend: "down", trendValue: "-3.5%" },
    volume: { value: "125K", unit: "MT", trend: "down", trendValue: "-2.8%" },
    otif: { value: "83.2", unit: "%", trend: "down", trendValue: "-6.3%" },
    inventoryCover: { value: "52.4", unit: "days", trend: "up", trendValue: "+4.5 days" },
    forecastAccuracy: { value: "76.8", unit: "% MAPE", trend: "down", trendValue: "-5.2%" },
    inventoryHealth: { value: "68", unit: "Index", trend: "down", trendValue: "-12 pts" },
    riskScore: { value: "High", trend: "up", trendValue: "Critical" },
    tariffRisk: { value: "€1.2M", unit: "Impact", trend: "up", trendValue: "+€0.5M" },
  },
  "Additives (3811.21)": {
    revenue: { value: "€145M", trend: "up", trendValue: "+18.5%" },
    volume: { value: "85K", unit: "MT", trend: "up", trendValue: "+14.2%" },
    otif: { value: "79.5", unit: "%", trend: "down", trendValue: "-8.7%" },
    inventoryCover: { value: "38.2", unit: "days", trend: "down", trendValue: "-3.8 days" },
    forecastAccuracy: { value: "72.3", unit: "% MAPE", trend: "down", trendValue: "-6.9%" },
    inventoryHealth: { value: "62", unit: "Index", trend: "down", trendValue: "-18 pts" },
    riskScore: { value: "Critical", trend: "up", trendValue: "Severe" },
    tariffRisk: { value: "$5.2M", unit: "US Impact", trend: "up", trendValue: "+$1.8M" },
  },
  "Base Oils (2710.12)": {
    revenue: { value: "€110M", trend: "up", trendValue: "+9.8%" },
    volume: { value: "230K", unit: "MT", trend: "up", trendValue: "+7.5%" },
    otif: { value: "81.8", unit: "%", trend: "down", trendValue: "-7.2%" },
    inventoryCover: { value: "39.5", unit: "days", trend: "down", trendValue: "-2.5 days" },
    forecastAccuracy: { value: "78.9", unit: "% MAPE", trend: "down", trendValue: "-4.8%" },
    inventoryHealth: { value: "65", unit: "Index", trend: "down", trendValue: "-15 pts" },
    riskScore: { value: "High", trend: "up", trendValue: "Critical" },
    tariffRisk: { value: "€8.5M", unit: "Impact", trend: "up", trendValue: "+€2.2M" },
  },
};

// Region-specific adjustments to KPI data
const regionMultipliers: Record<string, { revenue: number; volume: number; otif: number }> = {
  "All Regions": { revenue: 1.0, volume: 1.0, otif: 1.0 },
  "EMEA": { revenue: 0.35, volume: 0.32, otif: 0.92 },
  "Americas": { revenue: 0.28, volume: 0.26, otif: 0.89 },
  "APAC": { revenue: 0.22, volume: 0.24, otif: 0.87 },
  "India": { revenue: 0.15, volume: 0.18, otif: 0.85 },
  "EMEA North": { revenue: 0.18, volume: 0.16, otif: 0.90 },
  "EMEA South": { revenue: 0.17, volume: 0.16, otif: 0.94 },
  "India West": { revenue: 0.08, volume: 0.09, otif: 0.83 },
  "India South": { revenue: 0.07, volume: 0.09, otif: 0.87 },
  "APAC North": { revenue: 0.12, volume: 0.13, otif: 0.88 },
};

// Alerts database
const allAlerts: Alert[] = [
  {
    id: "1",
    title: "CRITICAL: Base Oil Category - Group III 150N (HSN: 2710.12.10) +18% Tariff Impact",
    description: "Highest Impact Product: Base Oil 150N - EMEA Grade | Category: Group III Base Oils | SKU: BO-150N-EMEA | HSN Code: 2710.12.10 | Route: Gulf Refineries → Rotterdam → EMEA Plants. EU Commission imposed 18% tariff affecting 45% of EMEA lubricant feedstock. Additional SKUs impacted: BO-150N-BULK. Cost increase: €85/MT premium for alternative sourcing.",
    severity: "critical",
    impact: "€8.5M cost increase",
    region: "EMEA",
    timeDetected: "2 hrs ago",
    affectedProducts: [
      {
        name: "Group III Base Oil 150N",
        hsnCode: "2710.12.10",
        skus: ["BO-150N-EMEA", "BO-150N-BULK"],
        routes: ["Gulf Refineries → Rotterdam → EMEA Plants", "Saudi Arabia → Hamburg Port"],
        impactPercentage: "18% tariff increase"
      },
      {
        name: "Group III Base Oil 500N",
        hsnCode: "2710.12.20",
        skus: ["BO-500N-EMEA", "BO-500N-DRUM"],
        routes: ["UAE → Antwerp → Distribution Centers"],
        impactPercentage: "18% tariff increase"
      }
    ]
  },
  {
    id: "2",
    title: "Base Oil & Additive Shortage - Critical Supply Risk",
    description: "Hamburg port disruption + Supplier X audit delays affecting Base Oil X & Additive A-VMX320 availability. Demand surge +12% for summer season.",
    severity: "critical",
    impact: "€6M penalties",
    region: "EMEA North",
    timeDetected: "4 hrs ago",
  },
  {
    id: "3",
    title: "HIGH ALERT: Synthetic Motor Oil - Castrol EDGE 5W-30 (HSN: 2710.19.31) +5% Duty",
    description: "Highest Impact Product: Castrol EDGE 5W-30 Fully Synthetic | Category: Premium Synthetic Motor Oils | SKU: EDGE-5W30-1L | HSN Code: 2710.19.31 | Route: Singapore Blending → Mumbai Port → India Distribution. Ministry of Finance raised import duties from 7.5% to 12.5%, impacting premium margins by 4-5%. Additional SKUs: EDGE-5W30-4L, EDGE-5W30-208L. Urgent action: Switch to Silvassa plant blending.",
    severity: "high",
    impact: "₹15 Cr margin impact",
    region: "India",
    timeDetected: "5 hrs ago",
    affectedProducts: [
      {
        name: "Castrol EDGE 5W-30",
        hsnCode: "2710.19.31",
        skus: ["EDGE-5W30-1L", "EDGE-5W30-4L", "EDGE-5W30-208L"],
        routes: ["Singapore Blending → Mumbai Port → India Distribution", "Europe → Mundra Port → West India"],
        impactPercentage: "5% duty increase (7.5% → 12.5%)"
      },
      {
        name: "Castrol MAGNATEC 5W-40",
        hsnCode: "2710.19.32",
        skus: ["MAG-5W40-1L", "MAG-5W40-3L"],
        routes: ["Singapore → Chennai Port → South India"],
        impactPercentage: "5% duty increase (7.5% → 12.5%)"
      }
    ]
  },
  {
    id: "4",
    title: "Motorcycle Oil Demand Surge - India Market",
    description: "Festive season demand spike +18% above forecast in motorcycle oils. Competitor stockout driving additional volume to Castrol channels.",
    severity: "high",
    impact: "₹12 Cr opportunity",
    region: "India",
    timeDetected: "6 hrs ago",
  },
  {
    id: "5",
    title: "Additive Quality Non-Conformance",
    description: "QA batch contamination detected for Additive Z. 3 lots quarantined at Plant Silvassa affecting premium grade blending.",
    severity: "high",
    impact: "OEM SLA risk",
    region: "India West",
    timeDetected: "8 hrs ago",
  },
  {
    id: "6",
    title: "CRITICAL ALERT: Viscosity Modifier VM-350 (HSN: 3811.21.10), US Section 301 tariffs escalated from 25% to 35% - Tariff effective 2 months from now",
    description: "Highest Impact Product: Viscosity Modifier VM-350 Polymeric | Category: Performance Additives | SKU: VM-350-BULK | HSN Code: 3811.21.10 | Route: Shenzhen Manufacturing → Los Angeles Port → US Blending Facilities. US Section 301 tariffs escalated from 25% to 35% (+10% increase). Additional SKUs: VM-350-IBC, PPD-220-DRUM, DA-500-IBC. Critical impact: 85% of US additive supply from China, Lubrizol USA and Afton Chemical at 92% capacity. Americas blending facilities (Houston, LA, Chicago, Newark, Atlanta, Dallas, Detroit) critically affected. Major retail accounts (AutoZone, O'Reilly, Walmart) and OEMs (GM, Ford) requiring price negotiations.",
    severity: "critical",
    impact: "$5.2M annual cost (+$1.8M YoY)",
    region: "Americas",
    timeDetected: "10 hrs ago",
    affectedProducts: [
      {
        name: "Viscosity Modifier VM-350 Polymeric",
        hsnCode: "3811.21.10",
        skus: ["VM-350-BULK", "VM-350-IBC"],
        routes: ["Shenzhen, China → Los Angeles Port → US Blending Facilities", "Shanghai → Houston Blending Plant"],
        impactPercentage: "10% tariff increase (25% → 35%)"
      },
      {
        name: "Pour Point Depressant PPD-220",
        hsnCode: "3811.21.20",
        skus: ["PPD-220-DRUM", "PPD-220-BULK"],
        routes: ["Ningbo, China → Long Beach → Houston Blending"],
        impactPercentage: "10% tariff increase (25% → 35%)"
      },
      {
        name: "Dispersant Additive DA-500",
        hsnCode: "3811.21.30",
        skus: ["DA-500-IBC", "DA-500-25KG"],
        routes: ["Guangzhou, China → Seattle → Midwest Distribution"],
        impactPercentage: "10% tariff increase (25% → 35%)"
      },
      {
        name: "US Motor Oil Products (Indirect Impact)",
        hsnCode: "2710.19.31, 2710.19.41",
        skus: ["GTX-5W30-1QT", "EDGE-0W40-1QT", "ATF-DEX6-1QT"],
        routes: ["Houston/LA/Chicago Blending → US Retail (AutoZone, O'Reilly, Walmart)"],
        impactPercentage: "$3.1M margin compression from additive cost increase"
      }
    ]
  },
  {
    id: "7",
    title: "Logistics Strike - Southern Europe",
    description: "Carrier labor strike in Italy impacting 40% of outbound shipments. No alternate carriers contracted for backup.",
    severity: "high",
    impact: "€2M penalties",
    region: "EMEA South",
    timeDetected: "12 hrs ago",
  },
  {
    id: "8",
    title: "Credit Risk Escalation - Distributor",
    description: "Alpha Oils distributor exceeded credit limit. AR aging >75 days with ₹8 Cr exposure due to slow sell-out.",
    severity: "medium",
    impact: "₹8 Cr exposure",
    region: "India South",
    timeDetected: "14 hrs ago",
  },
  {
    id: "9",
    title: "Marine Oil Inventory Excess - Singapore",
    description: "Slow-moving marine oil inventory at Singapore plant. 85 days cover vs 45 days target due to shipping industry downturn.",
    severity: "medium",
    impact: "€3.5M tied capital",
    region: "APAC",
    timeDetected: "16 hrs ago",
  },
  {
    id: "10",
    title: "MEDIUM ALERT: Transmission Fluid - ATF Dexron VI (HSN: 2710.19.85) -30% Quota",
    description: "Highest Impact Product: ATF Dexron VI Automatic Transmission Fluid | Category: Automotive Transmission Fluids | SKU: ATF-DEX6-1L | HSN Code: 2710.19.85 | Route: Europe Blending → Singapore Hub → Thailand Distribution. Singapore-Thailand FTA amendments reduce duty-free quotas by 30%. Additional SKU: ATF-DEX6-208L. Action required: Shift to local APAC blending to avoid quota constraints.",
    severity: "medium",
    impact: "$1.8M logistics",
    region: "APAC",
    timeDetected: "18 hrs ago",
    affectedProducts: [
      {
        name: "ATF Dexron VI",
        hsnCode: "2710.19.85",
        skus: ["ATF-DEX6-1L", "ATF-DEX6-208L"],
        routes: ["Europe → Singapore → Thailand Distribution", "Singapore Blending → Bangkok"],
        impactPercentage: "30% quota reduction"
      },
      {
        name: "CVT Fluid Premium",
        hsnCode: "2710.19.86",
        skus: ["CVT-PREM-1L", "CVT-PREM-20L"],
        routes: ["Rotterdam → Singapore Hub → ASEAN Markets"],
        impactPercentage: "30% quota reduction"
      }
    ]
  },
  {
    id: "11",
    title: "Premium Motor Oil - OTIF Degradation",
    description: "Premium 5W-30 OTIF dropped to 78% in Americas region. Root cause: shortage of specialty additives from TotalEnergies.",
    severity: "high",
    impact: "€4.2M lost sales",
    region: "Americas",
    timeDetected: "20 hrs ago",
  },
  {
    id: "12",
    title: "Industrial Lubricant Forecast Miss",
    description: "Industrial gear oil demand 22% below forecast in EMEA due to automotive manufacturing slowdown.",
    severity: "medium",
    impact: "€1.8M excess inventory",
    region: "EMEA",
    timeDetected: "22 hrs ago",
  },
];

// AI insights by filter combination
const insightsByProduct: Record<string, AIInsight> = {
  "All Products": {
    summary: "Overall supply chain performance shows strong revenue growth (+12.5%) but faces operational challenges with OTIF declining to 87.2% and elevated risk scores across critical categories.",
    keyFindings: [
      "Revenue growth driven primarily by Motor Oil (+15.2%) and Additives (+18.5%)",
      "OTIF performance degraded due to Hamburg port disruptions and additive supply constraints",
      "Inventory health declining (-8 pts) with growing excess stock in Marine Oils and slow-moving SKUs",
      "Critical supply risk elevated due to Base Oil and Additive shortages affecting premium grades",
    ],
    recommendations: [
      "Prioritize alternative sourcing for Base Oils and Additives to mitigate Hamburg port impact",
      "Implement expedited shipping for critical premium motor oil SKUs to recover OTIF performance",
      "Review marine oil production planning to align with current market demand",
      "Activate backup supplier protocols for specialty additives affecting OEM commitments",
    ],
    risks: [
      "€6M penalty exposure from Base Oil shortage affecting OEM supply agreements",
      "Customer satisfaction declining with OTIF below 90% threshold in key accounts",
      "Working capital tied up in €3.5M excess marine oil inventory",
      "Quality risks from quarantined additive batches potentially delaying premium product launches",
    ],
  },
  "Motor Oil (2710.19)": {
    summary: "Motor Oil segment demonstrates strong performance with revenue growth of +15.2% and improved OTIF to 89.5%. Inventory health improved significantly (+5 pts) with moderate risk profile.",
    keyFindings: [
      "Premium 5W-30 and 5W-40 SKUs driving volume growth (+10.5%)",
      "Forecast accuracy improved to 85.2% with better demand planning",
      "Inventory cover optimized at 42.8 days, slightly below target",
      "Americas region experiencing OTIF challenges (78%) due to specialty additive shortages",
    ],
    recommendations: [
      "Secure additional specialty additive capacity from Lubrizol and Infineum",
      "Increase safety stock for premium grades by 5 days to buffer supply volatility",
      "Expand Premium 5W-30 production capacity at Silvassa plant to meet India festive demand",
      "Implement dynamic pricing for high-demand premium SKUs to optimize margin",
    ],
    risks: [
      "€4.2M revenue at risk in Americas from OTIF degradation below customer SLAs",
      "Competitor stockouts in India creating temporary demand surge that may not sustain",
      "Additive supply constraints limiting premium product availability in Q4 peak season",
    ],
  },
  "Industrial Lubricants (2710.19)": {
    summary: "Industrial Lubricants showing excellent operational performance with 91.2% OTIF and strong inventory health (82 Index). Low risk profile with steady growth trajectory.",
    keyFindings: [
      "Gear oil and hydraulic oil categories performing above targets",
      "EMEA manufacturing slowdown reducing demand by 22% below forecast",
      "Forecast accuracy best-in-class at 88.9%",
      "Supply chain stability with minimal disruptions",
    ],
    recommendations: [
      "Redirect excess gear oil inventory from EMEA to growing APAC markets",
      "Reduce production orders for Q4 to align with lower EMEA demand",
      "Explore industrial lubricant opportunities in renewable energy sector",
      "Maintain current supplier partnerships - performance is optimal",
    ],
    risks: [
      "€1.8M excess inventory risk in EMEA industrial gear oils",
      "Automotive manufacturing slowdown may persist through Q1 2024",
      "Margin pressure from competitive pricing in mature EMEA markets",
    ],
  },
  "Additives (3811.21)": {
    summary: "Additives category faces critical operational challenges despite strong revenue growth (+18.5%). US Section 301 tariff escalation (25% → 35%) creating $5.2M annual cost impact. OTIF at 79.5% and inventory health at 62 Index indicate severe supply chain stress in Americas region.",
    keyFindings: [
      "US Section 301 tariffs on Chinese additives increased from 25% to 35% affecting $5.2M in annual costs",
      "85% of US additive supply sourced from China (Shenzhen, Ningbo, Guangzhou) with limited domestic alternatives",
      "Lubrizol USA and Afton Chemical at 92% capacity utilization - limited short-term expansion capability",
      "7 US blending facilities affected: Houston, Los Angeles, Chicago, Newark, Atlanta, Dallas, Detroit",
      "Major retail accounts (AutoZone, O'Reilly, Walmart) and OEMs (GM, Ford) requiring price renegotiations",
    ],
    recommendations: [
      "IMMEDIATE: Activate US domestic suppliers Lubrizol USA and Afton Chemical for 40% of critical volume",
      "Implement strategic pricing adjustments to recover 85% of tariff cost through retail and OEM negotiations",
      "Build 10-week emergency inventory buffer at current tariff rates before potential further escalation",
      "Engage American Petroleum Institute and American Chemistry Council for USTR tariff exemption petition",
      "Fast-track product reformulation program to reduce additive dependency and develop 'American Made' SKUs",
    ],
    risks: [
      "CRITICAL: $5.2M annual tariff exposure with potential for further US-China trade policy escalation",
      "$3.1M margin compression on US motor oil portfolio (GTX, EDGE, Transmax) from additive cost increases",
      "Customer contract renegotiations required for 52% of US automotive OEM and retail accounts (AutoZone, O'Reilly, Walmart)",
      "3-5% volume risk if pricing pass-through not accepted by price-sensitive consumer segments",
      "Limited domestic additive capacity (Lubrizol, Afton at 92%) constraining rapid supplier diversification",
      "Potential 6-9 month supplier qualification delays preventing immediate sourcing transition",
    ],
  },
  "Marine Oils (2710.19)": {
    summary: "Marine Oils segment under significant pressure with declining revenue (-3.5%), poor OTIF (83.2%), and degraded inventory health (68 Index). Critical risk level due to industry downturn.",
    keyFindings: [
      "Shipping industry downturn reducing marine oil demand by 2.8% volume",
      "Singapore plant holding 85 days inventory vs 45 days target",
      "€3.5M working capital tied in slow-moving marine oil inventory",
      "Forecast accuracy deteriorated to 76.8% due to volatile shipping market",
    ],
    recommendations: [
      "Reduce marine oil production by 30% for next two quarters",
      "Implement promotional pricing to liquidate excess inventory at Singapore warehouse",
      "Explore marine oil applications in alternative segments (industrial, power generation)",
      "Negotiate with shipping lines for long-term supply agreements to stabilize demand",
    ],
    risks: [
      "€3.5M inventory write-down risk if marine market doesn't recover by Q2 2024",
      "Storage capacity constraints at Singapore plant limiting new product intake",
      "Continued shipping industry weakness may persist through 2024",
      "Margin erosion from promotional pricing reducing profitability",
    ],
  },
};

// Function to get KPI data based on filters
export function getFilteredKPIData(
  product: string,
  region: string,
  plant: string,
  sku: string,
  supplier: string
): any[] {
  // Get base KPI data for selected product
  const baseData = kpiDataByProduct[product] || kpiDataByProduct["All Products"];

  // Apply region multiplier
  const regionMult = regionMultipliers[region] || regionMultipliers["All Regions"];

  // Calculate adjusted values
  const adjustedData = {
    revenue: {
      ...baseData.revenue,
      value: adjustRevenue(baseData.revenue.value, regionMult.revenue),
    },
    volume: {
      ...baseData.volume,
      value: adjustVolume(baseData.volume.value, regionMult.volume),
    },
    otif: {
      ...baseData.otif,
      value: adjustOTIF(baseData.otif.value, regionMult.otif),
    },
    inventoryCover: baseData.inventoryCover,
    forecastAccuracy: baseData.forecastAccuracy,
    inventoryHealth: baseData.inventoryHealth,
    riskScore: baseData.riskScore,
    tariffRisk: baseData.tariffRisk,
  };

  // Return as array format expected by Dashboard
  return [
    {
      title: "Revenue",
      value: adjustedData.revenue.value,
      trend: adjustedData.revenue.trend,
      trendValue: adjustedData.revenue.trendValue,
      color: "revenue" as const,
    },
    {
      title: "Volume",
      value: adjustedData.volume.value,
      unit: adjustedData.volume.unit,
      trend: adjustedData.volume.trend,
      trendValue: adjustedData.volume.trendValue,
      color: "volume" as const,
    },
    {
      title: "OTIF %",
      value: adjustedData.otif.value,
      unit: adjustedData.otif.unit,
      trend: adjustedData.otif.trend,
      trendValue: adjustedData.otif.trendValue,
      color: "otif" as const,
    },
    {
      title: "Inventory Cover",
      value: adjustedData.inventoryCover.value,
      unit: adjustedData.inventoryCover.unit,
      trend: adjustedData.inventoryCover.trend,
      trendValue: adjustedData.inventoryCover.trendValue,
      color: "inventory" as const,
    },
    {
      title: "Forecast Accuracy",
      value: adjustedData.forecastAccuracy.value,
      unit: adjustedData.forecastAccuracy.unit,
      trend: adjustedData.forecastAccuracy.trend,
      trendValue: adjustedData.forecastAccuracy.trendValue,
      color: "forecast" as const,
    },
    {
      title: "Inventory Health",
      value: adjustedData.inventoryHealth.value,
      unit: adjustedData.inventoryHealth.unit,
      trend: adjustedData.inventoryHealth.trend,
      trendValue: adjustedData.inventoryHealth.trendValue,
      color: "health" as const,
    },
    {
      title: "Risk Score",
      value: adjustedData.riskScore.value,
      trend: adjustedData.riskScore.trend,
      trendValue: adjustedData.riskScore.trendValue,
      color: "risk" as const,
    },
    {
      title: "Tariff Impact",
      value: adjustedData.tariffRisk.value,
      unit: adjustedData.tariffRisk.unit,
      trend: adjustedData.tariffRisk.trend,
      trendValue: adjustedData.tariffRisk.trendValue,
      color: "warning" as const,
    },
  ];
}

// Function to get filtered alerts
export function getFilteredAlerts(
  product: string,
  region: string,
  plant: string,
  sku: string,
  supplier: string
): Alert[] {
  let filtered = [...allAlerts];

  // Filter by region
  if (region !== "All Regions") {
    filtered = filtered.filter(alert =>
      alert.region === region ||
      (region === "EMEA" && (alert.region === "EMEA North" || alert.region === "EMEA South")) ||
      (region === "India" && (alert.region === "India West" || alert.region === "India South"))
    );
  }

  // Filter by product category
  if (product !== "All Products") {
    if (product.includes("Motor Oil")) {
      filtered = filtered.filter(alert =>
        alert.title.toLowerCase().includes("motor oil") ||
        alert.title.toLowerCase().includes("synthetic lubricants") ||
        alert.title.toLowerCase().includes("otif") ||
        alert.id === "3" || alert.id === "4" // India import duty & motorcycle oil
      );
    } else if (product.includes("Marine")) {
      filtered = filtered.filter(alert =>
        alert.title.toLowerCase().includes("marine")
      );
    } else if (product.includes("Additive")) {
      filtered = filtered.filter(alert =>
        alert.title.toLowerCase().includes("additive") ||
        alert.id === "2" || alert.id === "6" // Base oil & additive shortage, US-China tariff
      );
    } else if (product.includes("Base Oil")) {
      filtered = filtered.filter(alert =>
        alert.title.toLowerCase().includes("base oil") ||
        alert.id === "1" || alert.id === "2" // EU tariff & base oil shortage
      );
    } else if (product.includes("Industrial")) {
      filtered = filtered.filter(alert =>
        alert.title.toLowerCase().includes("industrial")
      );
    } else if (product.includes("Transmission")) {
      filtered = filtered.filter(alert =>
        alert.title.toLowerCase().includes("transmission")
      );
    }
  }

  // Filter by plant
  if (plant !== "All Plants") {
    if (plant === "Castrol Hamburg") {
      filtered = filtered.filter(alert =>
        alert.title.toLowerCase().includes("hamburg") ||
        alert.region === "EMEA North" ||
        alert.region === "EMEA South"
      );
    } else if (plant === "Castrol Silvassa") {
      filtered = filtered.filter(alert =>
        alert.region === "India West" ||
        alert.region === "India South" ||
        alert.title.toLowerCase().includes("silvassa")
      );
    } else if (plant === "Castrol Singapore") {
      filtered = filtered.filter(alert =>
        alert.region === "APAC" ||
        alert.title.toLowerCase().includes("singapore")
      );
    }
  }

  return filtered;
}

// Function to get AI insights based on filters
export function getFilteredInsights(
  product: string,
  region: string,
  plant: string,
  sku: string,
  supplier: string
): AIInsight {
  // Get base insights for product
  const baseInsight = insightsByProduct[product] || insightsByProduct["All Products"];

  // Customize insights based on region
  if (region !== "All Regions" && region !== "All") {
    return {
      ...baseInsight,
      summary: `${region} Region: ${baseInsight.summary}`,
      keyFindings: baseInsight.keyFindings.map(finding =>
        finding.includes("EMEA") && region.includes("EMEA") ? finding :
        finding.includes("India") && region.includes("India") ? finding :
        finding.includes("Americas") && region === "Americas" ? finding :
        finding.includes("APAC") && region.includes("APAC") ? finding :
        finding
      ),
    };
  }

  return baseInsight;
}

// Helper functions to adjust values
function adjustRevenue(value: string, multiplier: number): string {
  const numValue = parseFloat(value.replace(/[€M]/g, ""));
  const adjusted = (numValue * multiplier).toFixed(0);
  return value.includes("€") ? `€${adjusted}M` : value;
}

function adjustVolume(value: string, multiplier: number): string {
  const numValue = parseFloat(value.replace(/[MK]/g, ""));
  const unit = value.includes("M") ? "M" : "K";
  const adjusted = (numValue * multiplier).toFixed(0);
  return `${adjusted}${unit}`;
}

function adjustOTIF(value: string, multiplier: number): string {
  const numValue = parseFloat(value);
  const adjusted = (numValue * multiplier).toFixed(1);
  return adjusted;
}
