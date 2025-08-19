import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart, Brain, CheckCircle2, Clock } from "lucide-react";

interface GroceryListCardProps {
  onClick: () => void;
}

export const GroceryListCard = ({ onClick }: GroceryListCardProps) => {
  return (
    <Card 
      className="glass-card floating-card-hover neon-border cursor-pointer group"
      onClick={onClick}
    >
      <CardHeader>
        <CardTitle className="text-primary flex items-center gap-2">
          <ShoppingCart className="w-5 h-5" />
          AI-Generated List
          <Brain className="w-4 h-4 text-accent animate-pulse" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-2">
            <div className="text-center">
              <div className="metric-value">14</div>
              <p className="text-xs text-muted-foreground">Items</p>
            </div>
            <div className="text-center">
              <div className="metric-value">$67</div>
              <p className="text-xs text-muted-foreground">Estimated</p>
            </div>
            <div className="text-center">
              <div className="metric-value">3</div>
              <p className="text-xs text-muted-foreground">For Child</p>
            </div>
          </div>

          {/* Key Items */}
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 rounded-lg bg-gradient-surface">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-warning" />
                <span className="text-sm">Milk (2L)</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-warning">Urgent</div>
                <div className="text-xs text-muted-foreground">Expires tomorrow</div>
              </div>
            </div>

            <div className="flex items-center justify-between p-2 rounded-lg bg-gradient-surface">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span className="text-sm">Organic Apples</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-accent">Kids Choice</div>
                <div className="text-xs text-muted-foreground">AI recommended</div>
              </div>
            </div>

            <div className="flex items-center justify-between p-2 rounded-lg bg-gradient-surface">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span className="text-sm">Whole Grain Bread</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-success">Regular</div>
                <div className="text-xs text-muted-foreground">Weekly purchase</div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 p-2 rounded-lg bg-gradient-accent text-accent-foreground">
            <Brain className="w-4 h-4" />
            <span className="text-sm font-medium">Karen's Smart Suggestions</span>
          </div>

          <div className="text-xs text-accent text-center group-hover:animate-pulse">
            Click to edit and send to store →
          </div>
        </div>
      </CardContent>
    </Card>
  );
};