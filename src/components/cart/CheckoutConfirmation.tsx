import { Check, Zap, Truck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface CheckoutConfirmationProps {
  isVisible: boolean;
  totalItems: number;
  totalCost: number;
}

export const CheckoutConfirmation = ({ isVisible, totalItems, totalCost }: CheckoutConfirmationProps) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-md z-[100] flex items-center justify-center animate-fade-in">
      <Card className="glass-card neon-border shadow-glow-accent animate-scale-in max-w-md mx-4">
        <CardContent className="p-8 text-center space-y-6">
          {/* Success Animation */}
          <div className="w-20 h-20 mx-auto bg-gradient-accent rounded-full flex items-center justify-center animate-pulse-glow relative">
            <Check className="w-10 h-10 text-primary-foreground" />
            <div className="absolute inset-0 rounded-full border-2 border-accent animate-ping opacity-30"></div>
          </div>

          {/* Success Message */}
          <div className="space-y-2">
            <h3 className="text-2xl font-bold holographic-text">Order Transmitted!</h3>
            <p className="text-muted-foreground">
              Your futuristic shopping list has been sent to the quantum marketplace
            </p>
          </div>

          {/* Order Details */}
          <div className="space-y-3 p-4 rounded-lg bg-gradient-surface border border-border/20">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Items:</span>
              <span className="metric-value">{totalItems}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Total Cost:</span>
              <span className="metric-value">${totalCost.toFixed(2)}</span>
            </div>
            <div className="animate-holographic h-1 bg-gradient-accent rounded-full"></div>
          </div>

          {/* Delivery Info */}
          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-accent animate-pulse-glow" />
              <span>AI Processing</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-accent animate-pulse-glow" />
              <span>Drone Delivery: 25 min</span>
            </div>
          </div>

          {/* Loading Bar */}
          <div className="w-full bg-border/20 rounded-full h-2 overflow-hidden">
            <div className="h-full bg-gradient-accent animate-[slide-in-right_3s_ease-out] rounded-full"></div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};