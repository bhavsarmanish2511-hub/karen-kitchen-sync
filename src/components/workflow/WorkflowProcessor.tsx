import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Bot,
  Send,
  CheckCircle,
  Loader2,
  ArrowRight,
  Mic,
  MicOff,
  Maximize2,
  X,
  FileText,
  Package,
  Database,
  Wrench,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useDashboardFilters } from "@/contexts/DashboardFiltersContext";
import { getFilteredAlerts } from "@/data/mockData";

interface Message {
  id: string;
  type: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
  agent?: "orchestrator" | "procurement" | "inventory" | "tool";
}

interface AgentAction {
  id: string;
  agentType: "orchestrator" | "tool";
  title: string;
  description?: string;
  status: "pending" | "in-progress" | "completed";
  outputs?: { label: string; value: string }[];
  timestamp: Date;
}

interface WorkflowProcessorProps {
  workflowName: string;
  workflowDescription: string;
  executedActions?: Array<{
    id: string;
    action: string;
    description: string;
    cost: string;
    timeline: string;
    confidence?: number;
    impact?: string;
  }>;
  alertData?: {
    affectedProducts?: Array<{
      category?: string;
      hsnCode?: string;
      products?: Array<{
        name?: string;
        sku?: string;
        route?: string;
      }>;
    }>;
  };
}

export function WorkflowProcessor({
  workflowName,
  workflowDescription,
  executedActions = [],
  alertData,
}: WorkflowProcessorProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [agentActions, setAgentActions] = useState<AgentAction[]>([]);
  const [workflowStatus, setWorkflowStatus] = useState<"idle" | "processing" | "completed">("idle");
  const [currentStep, setCurrentStep] = useState(0);
  const { toast } = useToast();
  const { filters } = useDashboardFilters();

  // Generate workflow data for all executed actions
  const workflowDatasets = executedActions.map((action, index) => {
    const productCategory = alertData?.affectedProducts?.[index % (alertData?.affectedProducts?.length || 1)];
    const product = productCategory?.products?.[0];
    
    const productName = product?.name || "Castrol EDGE 5W-30";
    const productHSN = productCategory?.hsnCode || "2710.19.31";
    const productSKUString = product?.sku || "EDGE-5W30-1L, EDGE-5W30-4L";
    const skuArray = productSKUString.split(",").map(s => s.trim());
    const productSKU = skuArray[0] || "EDGE-5W30-1L";
    const secondarySKU = skuArray[1] || "EDGE-5W30-4L";
    
    const requiredQty = action?.description.includes("Base Oil") ? "150" : 
                       action?.description.includes("Additive") ? "80" : 
                       action?.description.includes("Viscosity") ? "95" : "120";
    
    return {
      action,
      productName,
      productHSN,
      productSKU,
      secondarySKU,
      requiredQty,
      orderId: `ORD${Math.floor(100000 + Math.random() * 900000)}`,
      insufficientItem: productSKU,
      sufficientItem: secondarySKU
    };
  });
  
  // Function to generate orchestrator steps for a specific dataset
  const generateOrchestratorSteps = (dataset: typeof workflowDatasets[0]) => [
    {
      id: "orch-1",
      title: "Identified Workflow: Process PO",
      description: "",
      outputs: [],
    },
    {
      id: "orch-2",
      title: "Creating Plan for executing workflow tasks",
      description: "",
      outputs: [],
    },
    {
      id: "orch-3",
      title: "Action: Parse 'PO_Procurement.pdf' for material numbers and quantities.",
      description: "",
      outputs: [],
    },
    {
      id: "orch-4",
      title: `Action: Find latest STP document path for HSN code ${dataset.productHSN}.`,
      description: "",
      outputs: [],
    },
    {
      id: "orch-5",
      title: "Action: Parse STP document to identify materials and quantities.",
      description: "",
      outputs: [],
    },
    {
      id: "orch-6",
      title: "Action: Check inventory quantities for specified materials and consumables.",
      description: "",
      outputs: [],
    },
    {
      id: "orch-7",
      title: `Action: Order missing material ${dataset.insufficientItem}.`,
      description: "",
      outputs: [],
    },
  ];

  // Function to generate tool agent outputs for a specific dataset
  const generateToolAgentOutputs = (dataset: typeof workflowDatasets[0]) => [
    {
      id: "tool-1",
      label: "Extracted details from purchase order document.",
      value: `Product: ${dataset.productName}, HSN Code: ${dataset.productHSN}, Quantity: ${dataset.requiredQty} metric tons`,
    },
    {
      id: "tool-2",
      label: "File path for STP Procurement document.",
      value: `/documents/STP_${dataset.productHSN.replace(/\./g, "_")}_v2.3.pdf`,
    },
    {
      id: "tool-3",
      label: "Extracted details for Procurement STP document.",
      value: `Required: ${dataset.insufficientItem} (${Math.floor(Number(dataset.requiredQty) * 0.6)} metric tons), ${dataset.sufficientItem} (${Math.floor(Number(dataset.requiredQty) * 0.4)} metric tons)`,
    },
    {
      id: "tool-4",
      label: "Inventory list with quantities.",
      value: `${dataset.insufficientItem}: 0 metric tons (Insufficient ⚠️), ${dataset.sufficientItem}: ${Math.floor(Number(dataset.requiredQty) * 0.5)} metric tons (Sufficient ✓)`,
    },
    {
      id: "tool-5",
      label: `Order placed for ${Math.floor(Number(dataset.requiredQty) * 0.8)} metric tons of ${dataset.insufficientItem}.`,
      value: `Order ID: ${dataset.orderId}`,
    },
  ];

  // Generate dynamic context based on executed actions
  const generateActionContext = () => {
    if (executedActions.length === 0) return null;
    
    const contexts = executedActions.map((action, idx) => {
      const dataset = workflowDatasets[idx];
      return {
        strategy: action.action,
        description: action.description,
        cost: action.cost,
        timeline: action.timeline,
        impact: action.impact || "Not specified",
        product: dataset?.productName || "Product",
        hsn: dataset?.productHSN || "N/A",
        sku: dataset?.productSKU || "N/A",
        qty: dataset?.requiredQty || "0"
      };
    });
    
    return contexts;
  };

  // Auto-start workflow when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      processWorkflow();
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const addChatMessage = (
    content: string, 
    type: "user" | "assistant" = "assistant",
    agent?: "orchestrator" | "procurement" | "inventory" | "tool"
  ) => {
    const newMessage: Message = {
      id: `${type}-${Date.now()}-${Math.random()}`,
      type,
      content,
      timestamp: new Date(),
      agent,
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const processWorkflow = async () => {
    setWorkflowStatus("processing");
    setIsProcessing(true);

    const actionContexts = generateActionContext();

    // Dynamic initial orchestrator message based on selected actions
    if (actionContexts && actionContexts.length > 0) {
      const strategyList = actionContexts.map((ctx, idx) => `${idx + 1}. ${ctx.strategy}`).join("\n");
      addChatMessage(
        `Hello! I'm the Orchestrator Agent analyzing your selected mitigation strategies:\n\n${strategyList}\n\nI will now coordinate multi-agent workflow execution to implement these strategies. Total strategies: ${actionContexts.length}`,
        "assistant",
        "orchestrator"
      );
      
      addChatMessage(
        `**Strategy Analysis:**\n${actionContexts.map((ctx, idx) => 
          `\n**Strategy ${idx + 1}: ${ctx.strategy}**\n- Cost: ${ctx.cost}\n- Timeline: ${ctx.timeline}\n- Expected Impact: ${ctx.impact}\n- Target Product: ${ctx.product} (HSN: ${ctx.hsn})`
        ).join('\n')}`,
        "assistant",
        "orchestrator"
      );
    } else {
      addChatMessage(`Hello! I'm analyzing purchase orders for workflow processing. No specific strategies selected yet.`, "assistant", "orchestrator");
    }

    // Process each strategy separately with unique workflow data
    for (let strategyIdx = 0; strategyIdx < workflowDatasets.length; strategyIdx++) {
      const dataset = workflowDatasets[strategyIdx];
      const ctx = actionContexts?.[strategyIdx];
      const orchestratorSteps = generateOrchestratorSteps(dataset);
      const toolAgentOutputs = generateToolAgentOutputs(dataset);
      
      // Add separator for multiple strategies
      if (strategyIdx > 0) {
        addChatMessage(
          `\n---\n\n🔄 **Processing Next Strategy: ${ctx?.strategy}**\n\nInitiating workflow for strategy ${strategyIdx + 1} of ${workflowDatasets.length}...`,
          "assistant",
          "orchestrator"
        );
      }

      // Add orchestrator actions progressively with dynamic context for this strategy
      for (let i = 0; i < orchestratorSteps.length; i++) {
        const newAction: AgentAction = {
          id: `action-${strategyIdx}-${Date.now()}-${i}`,
          agentType: "orchestrator",
          title: orchestratorSteps[i].title,
          description: orchestratorSteps[i].description,
          status: "completed",
          outputs: orchestratorSteps[i].outputs,
          timestamp: new Date(),
        };
        
        setAgentActions((prev) => [...prev, newAction]);

        // Add tool agent output action
        const addToolOutput = (index: number) => {
          const output = toolAgentOutputs[index];
          const toolAction: AgentAction = {
            id: `tool-${strategyIdx}-${Date.now()}-${index}`,
            agentType: "tool",
            title: output.label,
            status: "completed",
            outputs: [{ label: output.label, value: output.value }],
            timestamp: new Date(),
          };
          setAgentActions((prev) => [...prev, toolAction]);
        };

        // Add corresponding tool agent outputs and chat messages for specific steps
        if (i === 2) {
          addToolOutput(0);
          
          if (ctx) {
            addChatMessage(
              `📄 **Document Analysis Complete**\n\nI've extracted procurement requirements aligned with your selected strategy "${ctx.strategy}":\n\n- Product: ${ctx.product}\n- HSN Code: ${ctx.hsn}\n- Required Quantity: ${ctx.qty} metric tons\n- Timeline Constraint: ${ctx.timeline}\n\nProceeding to validate against Standard Technical Procedures...`,
              "assistant",
              "tool"
            );
          } else {
            addChatMessage(`I've extracted the details from the PO. Product: ${dataset.productName}, HSN Code: ${dataset.productHSN}, Quantity: ${dataset.requiredQty} metric tons. Now checking the STP document...`, "assistant", "tool");
          }
        } else if (i === 3) {
          addToolOutput(1);
          addChatMessage(`🔍 **STP Document Located**\n\nFound technical specification document at: /documents/STP_${dataset.productHSN.replace(/\./g, "_")}_v2.3.pdf\n\nParsing material composition and consumable requirements...`, "assistant", "tool");
        } else if (i === 4) {
          addToolOutput(2);
          
          if (ctx) {
            addChatMessage(
              `📋 **STP Requirements Parsed**\n\nMaterial breakdown for strategy execution:\n- Primary Component: ${dataset.insufficientItem} (${Math.floor(Number(dataset.requiredQty) * 0.6)} metric tons)\n- Secondary Component: ${dataset.sufficientItem} (${Math.floor(Number(dataset.requiredQty) * 0.4)} metric tons)\n\nInitiating inventory validation with Inventory Management Agent...`,
              "assistant",
              "orchestrator"
            );
          } else {
            addChatMessage(`The STP requires: ${dataset.insufficientItem} (${Math.floor(Number(dataset.requiredQty) * 0.6)} metric tons) and ${dataset.sufficientItem} (${Math.floor(Number(dataset.requiredQty) * 0.4)} metric tons). Checking inventory levels with the Inventory Agent...`, "assistant", "orchestrator");
          }
        } else if (i === 5) {
          addToolOutput(3);
          
          if (ctx) {
            addChatMessage(
              `📊 **Inventory Status Report**\n\nCurrent stock levels:\n- ${dataset.insufficientItem}: 0 metric tons ⚠️ **CRITICAL SHORTAGE**\n- ${dataset.sufficientItem}: ${Math.floor(Number(dataset.requiredQty) * 0.5)} metric tons ✅ **SUFFICIENT**\n\n⚠️ Identified gap conflicts with strategy "${ctx.strategy}" timeline (${ctx.timeline}). Escalating to Procurement Agent for emergency sourcing...`,
              "assistant",
              "inventory"
            );
          } else {
            addChatMessage(`Current inventory shows ${dataset.insufficientItem}: 0 metric tons (Insufficient ⚠️), ${dataset.sufficientItem}: ${Math.floor(Number(dataset.requiredQty) * 0.5)} metric tons (Sufficient ✓)`, "assistant", "inventory");
          }
          
          if (ctx) {
            addChatMessage(
              `🔄 **Orchestrator Decision**\n\nBased on inventory gap analysis, coordinating with Procurement Agent to execute emergency material acquisition. This action directly supports the strategy implementation timeline.`,
              "assistant",
              "orchestrator"
            );
          } else {
            addChatMessage(`I see we're missing ${dataset.insufficientItem}. Let me coordinate with the Procurement Agent to place an order...`, "assistant", "orchestrator");
          }
        } else if (i === 6) {
          addToolOutput(4);
          
          if (ctx) {
            addChatMessage(
              `✅ **Procurement Order Confirmed**\n\n**Order Details:**\n- Order ID: ${dataset.orderId}\n- Material: ${dataset.insufficientItem}\n- Quantity: ${Math.floor(Number(dataset.requiredQty) * 0.8)} metric tons\n- Estimated Cost Impact: ${ctx.cost}\n- Delivery Alignment: ${ctx.timeline}\n\n📦 This procurement directly supports strategy: "${ctx.strategy}"\n\nOrder tracking activated. Supplier coordination in progress.`,
              "assistant",
              "procurement"
            );
          } else {
            addChatMessage(`Order placed successfully! Order ID: ${dataset.orderId} for ${Math.floor(Number(dataset.requiredQty) * 0.8)} metric tons of ${dataset.insufficientItem}.`, "assistant", "procurement");
          }
        }
      }
    }

    // Dynamic final response based on selected strategies
    if (actionContexts && actionContexts.length > 0) {
      const summaryText = actionContexts.map((ctx, idx) => {
        const dataset = workflowDatasets[idx];
        return `\n**Strategy ${idx + 1}: ${ctx.strategy}**\n- Procurement Order: ${dataset?.orderId}\n- Material: ${ctx.product} (SKU: ${ctx.sku})\n- Quantity Ordered: ${Math.floor(Number(ctx.qty) * 0.8)} metric tons\n- Cost Impact: ${ctx.cost}\n- Implementation Timeline: ${ctx.timeline}\n- Expected Business Impact: ${ctx.impact}`;
      }).join('\n\n');
      
      addChatMessage(
        `🎯 **Multi-Strategy Execution Summary**\n\nI have successfully coordinated the implementation of ${actionContexts.length} mitigation strateg${actionContexts.length !== 1 ? 'ies' : 'y'} through automated agent orchestration:\n${summaryText}\n\n✅ **Next Steps:**\n1. Monitor supplier delivery progress\n2. Track procurement order fulfillment\n3. Update stakeholders on strategy execution status\n4. Prepare for production scheduling upon material receipt\n\n📊 **Confidence Level:** High - All agent coordination completed successfully\n\n💬 If you need to adjust any strategy parameters or have questions about the execution plan, I'm here to assist!`,
        "assistant",
        "orchestrator"
      );
    } else {
      const dataset = workflowDatasets[0];
      if (dataset) {
        addChatMessage(
          `**Final Summary:**\n\n✅ **Action Taken:** An order has been placed for ${Math.floor(Number(dataset.requiredQty) * 0.8)} metric tons of ${dataset.productName} SKU (${dataset.insufficientItem}) to fulfill the requirement.\n\n📦 **Order ID:** ${dataset.orderId}\n\n📍 **Product:** ${dataset.productName} (HSN: ${dataset.productHSN})\n\n⏳ **Status:** The PO can be processed once the ordered item is received.\n\nIf you have any further questions or need additional assistance, please let me know!`,
          "assistant",
          "orchestrator"
        );
      }
    }

    setWorkflowStatus("completed");
    setIsProcessing(false);

    // Add orchestrator end message
    const endAction: AgentAction = {
      id: `end-${Date.now()}`,
      agentType: "orchestrator",
      title: "End",
      status: "completed",
      timestamp: new Date(),
    };
    setAgentActions((prev) => [...prev, endAction]);
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || workflowStatus !== "completed") return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsProcessing(true);

    // Simulate AI response
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const aiMessage: Message = {
      id: `assistant-${Date.now()}`,
      type: "assistant",
      content: "I can help you with that. Let me analyze the workflow results and provide additional insights.",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, aiMessage]);
    setIsProcessing(false);
  };

  const handleVoiceInput = () => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition =
        (window as any).webkitSpeechRecognition ||
        (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();

      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
        toast({
          title: "Voice Recognition Error",
          description: "Please try again or use text input.",
          variant: "destructive",
        });
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } else {
      toast({
        title: "Voice Not Supported",
        description: "Voice input is not supported in this browser.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <Card className="bg-gradient-card border-border">
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-foreground mb-1">
                WORKFLOW PROCESSOR
              </h2>
              <div className="flex items-center gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Workflow Name: </span>
                  <span className="text-foreground font-medium">{workflowName}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Workflow Description: </span>
                  <span className="text-foreground">{workflowDescription}</span>
                </div>
              </div>
              {executedActions.length > 0 && (
                <div className="mt-2 space-y-2">
                  {executedActions.map((action, index) => (
                    <div key={action.id} className="p-3 bg-primary/10 border border-primary/20 rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="text-sm">
                            <Badge variant="outline" className="border-success text-success mr-2">
                              Strategy {index + 1}
                            </Badge>
                            <span className="text-foreground font-semibold">{action.action}</span>
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">{action.description}</div>
                          <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
                            <span className="text-muted-foreground">Cost: <span className="text-warning font-medium">{action.cost}</span></span>
                            <span className="text-muted-foreground">Timeline: <span className="text-foreground font-medium">{action.timeline}</span></span>
                            {action.confidence && (
                              <span className="text-muted-foreground">Confidence: <span className="text-success font-medium">{action.confidence}%</span></span>
                            )}
                            {action.impact && (
                              <span className="text-muted-foreground">Expected Impact: <span className="text-success font-medium">{action.impact}</span></span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Maximize2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <X className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <FileText className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Status Banner */}
        <div className="px-4 py-3 bg-secondary/20 border-b border-border">
          <div className="flex items-center justify-center gap-3">
            <CheckCircle className="h-5 w-5 text-success" />
            <span className="text-foreground font-medium">
              Workflow Executed Successfully
            </span>
          </div>
        </div>
      </Card>

      {/* Main Content - Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left Side - Agent Interactions */}
        <Card className="bg-gradient-card border-border">
          <ScrollArea className="h-[600px]">
            <div className="p-6 space-y-6">
              {/* Orchestrator Section */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="mb-2">
                      <span className="text-sm text-muted-foreground">Agent:</span>
                      <div className="text-lg font-semibold text-primary">
                        Orchestrator
                      </div>
                    </div>

                    <div className="space-y-3">
                      {agentActions
                        .filter((action) => action.agentType === "orchestrator")
                        .map((action, index) => (
                          <div
                            key={action.id}
                            className="flex items-start gap-3"
                          >
                            <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                            <div className="flex-1">
                              <div className="text-sm text-foreground">
                                {action.title}
                              </div>
                              {action.description && (
                                <div className="text-xs text-muted-foreground mt-1">
                                  {action.description}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Tool Agent Section */}
              {agentActions.some((a) => a.agentType === "tool") && (
                <div className="space-y-4 pl-8">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-5 h-5 text-cyan-500" />
                    </div>
                    <div className="flex-1">
                      <div className="mb-2">
                        <span className="text-sm text-muted-foreground">Agent:</span>
                        <div className="text-lg font-semibold text-cyan-500">
                          ToolAgent
                        </div>
                      </div>

                      <div className="space-y-3">
                        {agentActions
                          .filter((action) => action.agentType === "tool")
                          .map((action) => (
                            <div
                              key={action.id}
                              className="bg-secondary/30 border border-border rounded-lg p-3"
                            >
                              <div className="flex items-start gap-2 mb-2">
                                <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                                <div className="text-sm font-medium text-foreground">
                                  Output: {action.title}
                                </div>
                              </div>
                              {action.outputs?.map((output, idx) => (
                                <div
                                  key={idx}
                                  className="text-xs text-muted-foreground ml-6"
                                >
                                  {output.value}
                                </div>
                              ))}
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Session Token Usage (only show when completed) */}
              {workflowStatus === "completed" && (
                <div className="border-t border-border pt-4 mt-6">
                  <div className="bg-secondary/20 rounded-lg p-4">
                    <div className="text-sm font-medium text-foreground mb-3">
                      Session Token Usage
                    </div>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <div>LLM Calls: 14</div>
                      <div>Input Tokens: 24,335</div>
                      <div>Output Tokens: 2,568</div>
                      <div className="font-medium text-foreground">LLM Cost: $0.09</div>
                    </div>
                  </div>
                </div>
              )}

              {workflowStatus === "processing" && agentActions.length === 0 && (
                <div className="flex items-center justify-center py-12">
                  <div className="text-center space-y-3">
                    <Loader2 className="h-8 w-8 text-primary animate-spin mx-auto" />
                    <div className="text-sm text-muted-foreground">
                      Initializing workflow agents...
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </Card>

        {/* Right Side - Chat Interface */}
        <Card className="bg-gradient-card border-border flex flex-col h-[600px]">
          {/* Chat Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.length === 0 && workflowStatus === "processing" && (
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-primary animate-pulse" />
                  </div>
                  <div className="bg-secondary border border-border rounded-lg p-3 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <span className="text-muted-foreground ml-2">Thinking...</span>
                    </div>
                  </div>
                </div>
              )}

              {messages.map((message) => {
                const getAgentConfig = (agent?: string) => {
                  switch (agent) {
                    case "orchestrator":
                      return {
                        icon: Bot,
                        color: "text-primary",
                        bg: "bg-primary/20",
                        label: "Orchestrator",
                      };
                    case "procurement":
                      return {
                        icon: Package,
                        color: "text-purple-500",
                        bg: "bg-purple-500/20",
                        label: "Procurement Agent",
                      };
                    case "inventory":
                      return {
                        icon: Database,
                        color: "text-orange-500",
                        bg: "bg-orange-500/20",
                        label: "Inventory Agent",
                      };
                    case "tool":
                      return {
                        icon: Wrench,
                        color: "text-cyan-500",
                        bg: "bg-cyan-500/20",
                        label: "Tool Agent",
                      };
                    default:
                      return {
                        icon: Bot,
                        color: "text-primary",
                        bg: "bg-primary/20",
                        label: "Assistant",
                      };
                  }
                };

                const agentConfig = getAgentConfig(message.agent);
                const AgentIcon = agentConfig.icon;

                return (
                  <div
                    key={message.id}
                    className={cn(
                      "flex gap-3",
                      message.type === "user" ? "justify-end" : "justify-start"
                    )}
                  >
                    {message.type !== "user" && (
                      <div
                        className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                          agentConfig.bg
                        )}
                      >
                        <AgentIcon className={cn("w-4 h-4", agentConfig.color)} />
                      </div>
                    )}

                    <div
                      className={cn(
                        "max-w-[85%] rounded-lg p-3 text-sm",
                        message.type === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary border border-border"
                      )}
                    >
                      {message.type !== "user" && message.agent && (
                        <div className={cn("text-xs font-semibold mb-1", agentConfig.color)}>
                          {agentConfig.label}
                        </div>
                      )}
                      <div className="whitespace-pre-wrap">{message.content}</div>
                      <div className="text-xs opacity-70 mt-2">
                        {message.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                );
              })}

              {isProcessing && messages.length > 0 && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-primary animate-pulse" />
                  </div>
                  <div className="bg-secondary border border-border rounded-lg p-3 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <span className="text-muted-foreground ml-2">
                        Processing...
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder={
                    workflowStatus === "completed"
                      ? "What's there in your mind ..."
                      : "Workflow in progress..."
                  }
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  disabled={workflowStatus !== "completed" || isProcessing}
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8"
                  onClick={handleVoiceInput}
                  disabled={workflowStatus !== "completed" || isProcessing}
                >
                  {isListening ? (
                    <MicOff className="w-4 h-4 text-primary animate-pulse" />
                  ) : (
                    <Mic className="w-4 h-4" />
                  )}
                </Button>
              </div>
              <Button
                onClick={handleSendMessage}
                disabled={
                  !inputMessage.trim() ||
                  workflowStatus !== "completed" ||
                  isProcessing
                }
                size="sm"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
