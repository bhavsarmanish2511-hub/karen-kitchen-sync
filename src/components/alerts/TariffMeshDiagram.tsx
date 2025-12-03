import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

// Define data sources and agents for each workflow tab
const workflowDataMapping = {
  "Understand Alert": {
    dataSources: [
      { name: "US Trade Representative", desc: "Section 301 tariff rates tracking" },
      { name: "US Customs & Border Protection", desc: "HTS code classification" },
      { name: "SAP GTS", desc: "Component origin tracking" },
      { name: "Trade Policy Monitor", desc: "Federal Register monitoring" }
    ],
    agents: [
      "Tariff Rate Monitor", "HTS Classification Agent", "Origin Tracking Agent",
      "Policy Alert Agent", "Duty Impact Calculator", "Cost Analysis Agent",
      "Compliance Validator", "Financial Impact Agent", "Timeline Tracker"
    ]
  },
  "Recommended Actions": {
    dataSources: [
      { name: "Supplier Network Data", desc: "Alternative supplier capacity and pricing" },
      { name: "SAP GTS", desc: "Product BOM and origin data" },
      { name: "US Customs & Border Protection", desc: "Tariff classification options" },
      { name: "Trade Policy Monitor", desc: "Trade advocacy opportunities" }
    ],
    agents: [
      "Supplier Capacity Agent", "Cost Analysis Agent", "Risk Assessment Agent",
      "Supply Chain Agent", "Product Impact Agent", "Customer Impact Agent",
      "Trade Rule Agent", "Financial Impact Agent"
    ]
  },
  "Decision Simulator": {
    dataSources: [
      { name: "Supplier Network Data", desc: "Multi-scenario supplier data" },
      { name: "SAP GTS", desc: "Cost and origin modeling" },
      { name: "US Trade Representative", desc: "Tariff rate scenarios" },
      { name: "Trade Policy Monitor", desc: "Policy change probability" }
    ],
    agents: [
      "Duty Impact Calculator", "Cost Analysis Agent", "Risk Assessment Agent",
      "Financial Impact Agent", "Supply Chain Agent", "Customer Impact Agent",
      "Timeline Tracker", "Trade Rule Agent"
    ]
  },
  "Trigger Workflow": {
    dataSources: [
      { name: "Supplier Network Data", desc: "Automated procurement execution" },
      { name: "SAP GTS", desc: "Contract and inventory systems" },
      { name: "US Customs & Border Protection", desc: "Compliance documentation" }
    ],
    agents: [
      "Supply Chain Agent", "Supplier Capacity Agent", "Financial Impact Agent",
      "Customer Impact Agent", "Compliance Validator", "Timeline Tracker",
      "Product Impact Agent"
    ]
  },
  "Track Impact": {
    dataSources: [
      { name: "Supplier Network Data", desc: "Real-time delivery performance" },
      { name: "SAP GTS", desc: "Cost and inventory actuals" },
      { name: "US Trade Representative", desc: "Ongoing tariff monitoring" },
      { name: "Trade Policy Monitor", desc: "Policy change tracking" }
    ],
    agents: [
      "Cost Analysis Agent", "Financial Impact Agent", "Risk Assessment Agent",
      "Supply Chain Agent", "Customer Impact Agent", "Timeline Tracker",
      "Tariff Rate Monitor", "Policy Alert Agent"
    ]
  }
};

export function TariffMeshDiagram() {
  const [selectedWorkflow, setSelectedWorkflow] = useState<keyof typeof workflowDataMapping | null>(null);

  const getHighlightedItems = () => {
    if (!selectedWorkflow) return { agents: [], dataSources: [] };
    return {
      agents: workflowDataMapping[selectedWorkflow].agents,
      dataSources: workflowDataMapping[selectedWorkflow].dataSources.map(d => d.name)
    };
  };

  const highlighted = getHighlightedItems();

  return (
    <div className="w-full bg-gradient-to-b from-background via-accent/5 to-background p-8 rounded-lg border border-border/50">

      {/* Header */}
      <div className="text-center mb-12 space-y-3 relative" style={{ zIndex: 1 }}>
        <div className="flex items-center justify-center gap-3">
          <div className="w-12 h-12 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center">
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-foreground">Tariff Alert - Agentic Intelligence Mesh</h2>
        </div>
        <p className="text-muted-foreground text-sm">Real-time intelligent orchestration across global tariff monitoring sources</p>
      </div>

      {/* Workflow Agents - Top Layer (5 Tabs) */}
      <div className="relative mb-4">
        <div className="grid grid-cols-5 gap-4">
          <WorkflowAgentCard
            color="red"
            icon="🔍"
            title="Understand Alert"
            description="Root cause analysis & impact assessment"
            details={[
              "Tariff change detection",
              "Financial impact calculation",
              "Customer exposure analysis",
              "Timeline reconstruction"
            ]}
            workflowKey="Understand Alert"
            isSelected={selectedWorkflow === "Understand Alert"}
            onClick={() => setSelectedWorkflow(selectedWorkflow === "Understand Alert" ? null : "Understand Alert")}
          />

          <WorkflowAgentCard
            color="emerald"
            icon="💡"
            title="Recommended Actions"
            description="AI-generated mitigation strategies"
            details={[
              "Supplier diversification",
              "Pricing strategies",
              "Inventory optimization",
              "Trade policy advocacy"
            ]}
            workflowKey="Recommended Actions"
            isSelected={selectedWorkflow === "Recommended Actions"}
            onClick={() => setSelectedWorkflow(selectedWorkflow === "Recommended Actions" ? null : "Recommended Actions")}
          />

          <WorkflowAgentCard
            color="amber"
            icon="🎯"
            title="Decision Simulator"
            description="Scenario modeling & optimization"
            details={[
              "Multi-action simulation",
              "Cost-benefit analysis",
              "Risk trade-off modeling",
              "Timeline optimization"
            ]}
            workflowKey="Decision Simulator"
            isSelected={selectedWorkflow === "Decision Simulator"}
            onClick={() => setSelectedWorkflow(selectedWorkflow === "Decision Simulator" ? null : "Decision Simulator")}
          />

          <WorkflowAgentCard
            color="violet"
            icon="⚡"
            title="Trigger Workflow"
            description="Automated execution engine"
            details={[
              "Procurement automation",
              "Contract negotiation",
              "Inventory adjustments",
              "Stakeholder notifications"
            ]}
            workflowKey="Trigger Workflow"
            isSelected={selectedWorkflow === "Trigger Workflow"}
            onClick={() => setSelectedWorkflow(selectedWorkflow === "Trigger Workflow" ? null : "Trigger Workflow")}
          />

          <WorkflowAgentCard
            color="sky"
            icon="📊"
            title="Track Impact"
            description="Real-time performance monitoring"
            details={[
              "Cost savings tracking",
              "OTIF monitoring",
              "Risk reduction metrics",
              "Playbook learning"
            ]}
            workflowKey="Track Impact"
            isSelected={selectedWorkflow === "Track Impact"}
            onClick={() => setSelectedWorkflow(selectedWorkflow === "Track Impact" ? null : "Track Impact")}
          />
        </div>
      </div>

      {/* Connector: Workflow → Central Hub */}
      <div className="flex justify-center mb-4">
        <div className="w-0.5 h-8 bg-gradient-to-b from-primary/60 to-primary/30 animate-pulse" />
      </div>

      {/* Central Intelligence Hub */}
      <div className="flex justify-center mb-4">
        <Card className="w-96 p-6 bg-gradient-to-br from-primary/20 via-primary/10 to-accent/10 border-2 border-primary shadow-lg shadow-primary/20">
          <div className="flex items-center justify-center gap-3 mb-2">
            <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <h3 className="text-xl font-bold text-foreground">Central Alert Intelligence Hub</h3>
          </div>
          <p className="text-center text-sm text-muted-foreground">Central Orchestration & Decision Engine</p>
        </Card>
      </div>

      {/* Connector: Central Hub → Agents */}
      <div className="flex justify-center mb-4">
        <div className="w-0.5 h-8 bg-gradient-to-b from-primary/60 to-primary/30 animate-pulse" />
      </div>

      {/* Middle Agent Layer */}
      <div className="mb-4">
        <div className="grid grid-cols-5 gap-3">
          <AgentBadge color="blue" label="Tariff Rate Monitor" isHighlighted={highlighted.agents.includes("Tariff Rate Monitor")} />
          <AgentBadge color="purple" label="HTS Classification Agent" isHighlighted={highlighted.agents.includes("HTS Classification Agent")} />
          <AgentBadge color="pink" label="Origin Tracking Agent" isHighlighted={highlighted.agents.includes("Origin Tracking Agent")} />
          <AgentBadge color="cyan" label="Supplier Capacity Agent" isHighlighted={highlighted.agents.includes("Supplier Capacity Agent")} />
          <AgentBadge color="green" label="Policy Alert Agent" isHighlighted={highlighted.agents.includes("Policy Alert Agent")} />

          <AgentBadge color="blue" label="Duty Impact Calculator" isHighlighted={highlighted.agents.includes("Duty Impact Calculator")} />
          <AgentBadge color="purple" label="Cost Analysis Agent" isHighlighted={highlighted.agents.includes("Cost Analysis Agent")} />
          <AgentBadge color="pink" label="Compliance Validator" isHighlighted={highlighted.agents.includes("Compliance Validator")} />
          <AgentBadge color="cyan" label="Risk Assessment Agent" isHighlighted={highlighted.agents.includes("Risk Assessment Agent")} />
          <AgentBadge color="green" label="Trade Rule Agent" isHighlighted={highlighted.agents.includes("Trade Rule Agent")} />

          <AgentBadge color="blue" label="Financial Impact Agent" isHighlighted={highlighted.agents.includes("Financial Impact Agent")} />
          <AgentBadge color="purple" label="Supply Chain Agent" isHighlighted={highlighted.agents.includes("Supply Chain Agent")} />
          <AgentBadge color="pink" label="Product Impact Agent" isHighlighted={highlighted.agents.includes("Product Impact Agent")} />
          <AgentBadge color="cyan" label="Customer Impact Agent" isHighlighted={highlighted.agents.includes("Customer Impact Agent")} />
          <AgentBadge color="green" label="Timeline Tracker" isHighlighted={highlighted.agents.includes("Timeline Tracker")} />
        </div>
      </div>

      {/* Connector: Agents → Data Sources */}
      <div className="flex justify-center mb-4">
        <div className="w-0.5 h-8 bg-gradient-to-b from-primary/60 to-primary/30 animate-pulse" />
      </div>

      {/* Data Sources Section */}
      <div>
        <h3 className="text-center text-lg font-semibold text-foreground/80 mb-6 tracking-wider">DATA SOURCES OF TRUTH</h3>
        <div className="grid grid-cols-5 gap-4">
          <DataSourceCard
            name="US Trade Representative"
            label="REAL-TIME TARIFF DATABASE"
            description="Section 301 tariff rates and classifications"
            color="blue"
            isHighlighted={highlighted.dataSources.includes("US Trade Representative")}
          />

          <DataSourceCard
            name="US Customs & Border Protection"
            label="HTS CODE INTELLIGENCE"
            description="Harmonized tariff schedule tracking"
            color="purple"
            isHighlighted={highlighted.dataSources.includes("US Customs & Border Protection")}
          />

          <DataSourceCard
            name="SAP GTS"
            label="GLOBAL TRADE SERVICES"
            description="Component origin tracking via BOM"
            color="pink"
            isHighlighted={highlighted.dataSources.includes("SAP GTS")}
          />

          <DataSourceCard
            name="Supplier Network Data"
            label="SUPPLY CHAIN INTELLIGENCE"
            description="Real-time supplier capacity and pricing"
            color="cyan"
            isHighlighted={highlighted.dataSources.includes("Supplier Network Data")}
          />

          <DataSourceCard
            name="Trade Policy Monitor"
            label="REGULATORY INTELLIGENCE"
            description="Federal Register & trade announcements"
            color="green"
            isHighlighted={highlighted.dataSources.includes("Trade Policy Monitor")}
          />
        </div>
      </div>
    </div>
  );
}

// Data source cards: black text when highlighted
function DataSourceCard({
  name,
  label,
  description,
  color,
  isHighlighted
}: {
  name: string;
  label: string;
  description: string;
  color: string;
  isHighlighted: boolean;
}) {
  const colorClasses = {
    blue: isHighlighted
      ? "from-blue-500/30 to-blue-600/20 border-blue-500/80 shadow-lg shadow-blue-500/50"
      : "from-blue-500/10 to-blue-600/5 border-blue-500/30 hover:border-blue-500/60",
    purple: isHighlighted
      ? "from-purple-500/30 to-purple-600/20 border-purple-500/80 shadow-lg shadow-purple-500/50"
      : "from-purple-500/10 to-purple-600/5 border-purple-500/30 hover:border-purple-500/60",
    pink: isHighlighted
      ? "from-pink-500/30 to-pink-600/20 border-pink-500/80 shadow-lg shadow-pink-500/50"
      : "from-pink-500/10 to-pink-600/5 border-pink-500/30 hover:border-pink-500/60",
    cyan: isHighlighted
      ? "from-cyan-500/30 to-cyan-600/20 border-cyan-500/80 shadow-lg shadow-cyan-500/50"
      : "from-cyan-500/10 to-cyan-600/5 border-cyan-500/30 hover:border-cyan-500/60",
    green: isHighlighted
      ? "from-green-500/30 to-green-600/20 border-green-500/80 shadow-lg shadow-green-500/50"
      : "from-green-500/10 to-green-600/5 border-green-500/30 hover:border-green-500/60"
  };

  return (
    <Card
      className={`p-4 bg-gradient-to-br ${colorClasses[color as keyof typeof colorClasses]} transition-all duration-300 ${
        isHighlighted ? "scale-105 ring-2 ring-current text-black" : "text-muted-foreground"
      }`}
    >
      <div className={`text-xs font-semibold mb-2 ${isHighlighted ? "text-black" : "text-foreground/80"}`}>{name}</div>
      <div className={`text-xs font-medium mb-1 ${isHighlighted ? "text-black" : "text-muted-foreground"}`}>{label}</div>
      <div className={`text-xs ${isHighlighted ? "text-black/80" : "text-muted-foreground/70"}`}>{description}</div>
    </Card>
  );
}

// Agent badges: black text when highlighted
function AgentBadge({ color, label, isHighlighted }: { color: string; label: string; isHighlighted: boolean }) {
  const colorClasses = {
    blue: isHighlighted
      ? "bg-blue-500/30 border-blue-500/80 shadow-lg shadow-blue-500/50 scale-105 text-black"
      : "bg-blue-500/10 border-blue-500/30 text-blue-400",
    purple: isHighlighted
      ? "bg-purple-500/30 border-purple-500/80 shadow-lg shadow-purple-500/50 scale-105 text-black"
      : "bg-purple-500/10 border-purple-500/30 text-purple-400",
    pink: isHighlighted
      ? "bg-pink-500/30 border-pink-500/80 shadow-lg shadow-pink-500/50 scale-105 text-black"
      : "bg-pink-500/10 border-pink-500/30 text-pink-400",
    cyan: isHighlighted
      ? "bg-cyan-500/30 border-cyan-500/80 shadow-lg shadow-cyan-500/50 scale-105 text-black"
      : "bg-cyan-500/10 border-cyan-500/30 text-cyan-400",
    green: isHighlighted
      ? "bg-green-500/30 border-green-500/80 shadow-lg shadow-green-500/50 scale-105 text-black"
      : "bg-green-500/10 border-green-500/30 text-green-400"
  };

  return (
    <div className={`px-3 py-2 rounded-lg border text-center text-xs font-medium transition-all duration-300 hover:scale-105 ${colorClasses[color as keyof typeof colorClasses]}`}>
      {label}
    </div>
  );
}

// WorkflowAgentCard (unchanged)
function WorkflowAgentCard({
  color,
  icon,
  title,
  description,
  details,
  workflowKey,
  isSelected,
  onClick
}: {
  color: string;
  icon: string;
  title: string;
  description: string;
  details: string[];
  workflowKey: keyof typeof workflowDataMapping;
  isSelected: boolean;
  onClick: () => void;
}) {
  const colorClasses = {
    red: isSelected
      ? "from-red-500/30 to-red-600/20 border-red-500/90 ring-2 ring-red-500/60 shadow-2xl shadow-red-500/50 scale-105"
      : "from-red-500/10 to-red-600/5 border-red-500/40 hover:border-red-500/70",
    emerald: isSelected
      ? "from-emerald-500/30 to-emerald-600/20 border-emerald-500/90 ring-2 ring-emerald-500/60 shadow-2xl shadow-emerald-500/50 scale-105"
      : "from-emerald-500/10 to-emerald-600/5 border-emerald-500/40 hover:border-emerald-500/70",
    amber: isSelected
      ? "from-amber-500/30 to-amber-600/20 border-amber-500/90 ring-2 ring-amber-500/60 shadow-2xl shadow-amber-500/50 scale-105"
      : "from-amber-500/10 to-amber-600/5 border-amber-500/40 hover:border-amber-500/70",
    violet: isSelected
      ? "from-violet-500/30 to-violet-600/20 border-violet-500/90 ring-2 ring-violet-500/60 shadow-2xl shadow-violet-500/50 scale-105"
      : "from-violet-500/10 to-violet-600/5 border-violet-500/40 hover:border-violet-500/70",
    sky: isSelected
      ? "from-sky-500/30 to-sky-600/20 border-sky-500/90 ring-2 ring-sky-500/60 shadow-2xl shadow-sky-500/50 scale-105"
      : "from-sky-500/10 to-sky-600/5 border-sky-500/40 hover:border-sky-500/70"
  };

  return (
    <Card
      onClick={onClick}
      className={`p-4 bg-gradient-to-br ${colorClasses[color as keyof typeof colorClasses]} transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer`}
    >
      <div className="text-2xl mb-2 text-center">{icon}</div>
      <div className="text-sm font-bold text-foreground mb-1 text-center">{title}</div>
      <div className="text-xs text-muted-foreground mb-3 text-center">{description}</div>
      <div className="space-y-1">
        {details.map((detail, i) => (
          <div key={i} className="text-xs text-muted-foreground/80 flex items-start gap-1">
            <span className="text-primary mt-0.5">•</span>
            <span>{detail}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}