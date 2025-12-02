import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function TariffMeshDiagram() {
  return (
    <div className="w-full bg-gradient-to-b from-background via-accent/5 to-background p-8 rounded-lg border border-border/50">
      {/* Header */}
      <div className="text-center mb-12 space-y-3">
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

      {/* Data Sources Section */}
      <div className="mb-8">
        <h3 className="text-center text-lg font-semibold text-foreground/80 mb-6 tracking-wider">DATA SOURCES OF TRUTH</h3>
        <div className="grid grid-cols-5 gap-4">
          <Card className="p-4 bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/30 hover:border-blue-500/60 transition-all duration-300">
            <div className="text-xs font-semibold text-blue-400 mb-2">US Trade Representative</div>
            <div className="text-xs text-muted-foreground font-medium mb-1">REAL-TIME TARIFF DATABASE</div>
            <div className="text-xs text-muted-foreground/70">Section 301 tariff rates and classifications</div>
          </Card>
          
          <Card className="p-4 bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-500/30 hover:border-purple-500/60 transition-all duration-300">
            <div className="text-xs font-semibold text-purple-400 mb-2">US Customs & Border Protection</div>
            <div className="text-xs text-muted-foreground font-medium mb-1">HTS CODE INTELLIGENCE</div>
            <div className="text-xs text-muted-foreground/70">Harmonized tariff schedule tracking</div>
          </Card>
          
          <Card className="p-4 bg-gradient-to-br from-pink-500/10 to-pink-600/5 border-pink-500/30 hover:border-pink-500/60 transition-all duration-300">
            <div className="text-xs font-semibold text-pink-400 mb-2">SAP GTS</div>
            <div className="text-xs text-muted-foreground font-medium mb-1">GLOBAL TRADE SERVICES</div>
            <div className="text-xs text-muted-foreground/70">Component origin tracking via BOM</div>
          </Card>
          
          <Card className="p-4 bg-gradient-to-br from-cyan-500/10 to-cyan-600/5 border-cyan-500/30 hover:border-cyan-500/60 transition-all duration-300">
            <div className="text-xs font-semibold text-cyan-400 mb-2">Supplier Network Data</div>
            <div className="text-xs text-muted-foreground font-medium mb-1">SUPPLY CHAIN INTELLIGENCE</div>
            <div className="text-xs text-muted-foreground/70">Real-time supplier capacity and pricing</div>
          </Card>
          
          <Card className="p-4 bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/30 hover:border-green-500/60 transition-all duration-300">
            <div className="text-xs font-semibold text-green-400 mb-2">Trade Policy Monitor</div>
            <div className="text-xs text-muted-foreground font-medium mb-1">REGULATORY INTELLIGENCE</div>
            <div className="text-xs text-muted-foreground/70">Federal Register & trade announcements</div>
          </Card>
        </div>
      </div>

      {/* Middle Agent Layer */}
      <div className="mb-8 relative">
        {/* Connection lines to center */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
          {/* Lines from agents to center */}
          {[...Array(15)].map((_, i) => {
            const x1 = ((i % 5) * 20 + 10) + '%';
            const y1 = Math.floor(i / 5) * 33 + 16 + '%';
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2="50%"
                y2="100%"
                stroke="url(#gradient)"
                strokeWidth="1"
                opacity="0.3"
                className="animate-pulse"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            );
          })}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>

        <div className="grid grid-cols-5 gap-3 relative" style={{ zIndex: 1 }}>
          {/* Row 1 - Monitoring Agents */}
          <AgentBadge color="blue" label="Tariff Rate Monitor" />
          <AgentBadge color="purple" label="HTS Classification Agent" />
          <AgentBadge color="pink" label="Origin Tracking Agent" />
          <AgentBadge color="cyan" label="Supplier Capacity Agent" />
          <AgentBadge color="green" label="Policy Alert Agent" />
          
          {/* Row 2 - Analysis Agents */}
          <AgentBadge color="blue" label="Duty Impact Calculator" />
          <AgentBadge color="purple" label="Cost Analysis Agent" />
          <AgentBadge color="pink" label="Compliance Validator" />
          <AgentBadge color="cyan" label="Risk Assessment Agent" />
          <AgentBadge color="green" label="Trade Rule Agent" />
          
          {/* Row 3 - Processing Agents */}
          <AgentBadge color="blue" label="Financial Impact Agent" />
          <AgentBadge color="purple" label="Supply Chain Agent" />
          <AgentBadge color="pink" label="Product Impact Agent" />
          <AgentBadge color="cyan" label="Customer Impact Agent" />
          <AgentBadge color="green" label="Timeline Tracker" />
        </div>
      </div>

      {/* Central Intelligence Hub */}
      <div className="flex justify-center mb-8 relative" style={{ zIndex: 2 }}>
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

      {/* Workflow Agents - Bottom Layer (5 Tabs) */}
      <div className="relative">
        {/* Connection lines from center to workflow agents */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0, top: '-60px' }}>
          {[...Array(5)].map((_, i) => {
            const x2 = ((i * 20) + 10) + '%';
            return (
              <line
                key={i}
                x1="50%"
                y1="0%"
                x2={x2}
                y2="100%"
                stroke="url(#gradient2)"
                strokeWidth="2"
                opacity="0.4"
                className="animate-pulse"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            );
          })}
          <defs>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.6" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
            </linearGradient>
          </defs>
        </svg>

        <div className="grid grid-cols-5 gap-4 relative" style={{ zIndex: 1 }}>
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
          />
        </div>
      </div>
    </div>
  );
}

// Helper component for agent badges
function AgentBadge({ color, label }: { color: string; label: string }) {
  const colorClasses = {
    blue: "bg-blue-500/10 border-blue-500/30 text-blue-400",
    purple: "bg-purple-500/10 border-purple-500/30 text-purple-400",
    pink: "bg-pink-500/10 border-pink-500/30 text-pink-400",
    cyan: "bg-cyan-500/10 border-cyan-500/30 text-cyan-400",
    green: "bg-green-500/10 border-green-500/30 text-green-400"
  };

  return (
    <div className={`px-3 py-2 rounded-lg border text-center text-xs font-medium transition-all duration-300 hover:scale-105 ${colorClasses[color as keyof typeof colorClasses]}`}>
      {label}
    </div>
  );
}

// Helper component for workflow agent cards
function WorkflowAgentCard({ 
  color, 
  icon, 
  title, 
  description, 
  details 
}: { 
  color: string; 
  icon: string; 
  title: string; 
  description: string; 
  details: string[];
}) {
  const colorClasses = {
    red: "from-red-500/10 to-red-600/5 border-red-500/40 hover:border-red-500/70",
    emerald: "from-emerald-500/10 to-emerald-600/5 border-emerald-500/40 hover:border-emerald-500/70",
    amber: "from-amber-500/10 to-amber-600/5 border-amber-500/40 hover:border-amber-500/70",
    violet: "from-violet-500/10 to-violet-600/5 border-violet-500/40 hover:border-violet-500/70",
    sky: "from-sky-500/10 to-sky-600/5 border-sky-500/40 hover:border-sky-500/70"
  };

  return (
    <Card className={`p-4 bg-gradient-to-br ${colorClasses[color as keyof typeof colorClasses]} transition-all duration-300 hover:scale-105 hover:shadow-lg`}>
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