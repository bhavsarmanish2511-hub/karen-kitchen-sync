import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChefHat, Coffee, Cookie, Wheat } from "lucide-react";
import { useInventory } from "@/contexts/InventoryContext";

interface SmartKitchenCardProps {
  onClick: () => void;
}

export const SmartKitchenCard = ({ onClick }: SmartKitchenCardProps) => {
  const { kitchenCount, kitchenItems } = useInventory();
  
  const runningLowCount = kitchenItems.filter(item => item.stockLevel < 50).length;
  return (
    <Card 
      className="glass-card floating-card-hover neon-border cursor-pointer group"
      onClick={onClick}
    >
      <CardHeader>
        <CardTitle className="text-primary flex items-center gap-2">
          <ChefHat className="w-5 h-5" />
          Smart Kitchen
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-2">
            <div className="text-center">
              <div className="metric-value">{kitchenCount}</div>
              <p className="text-xs text-muted-foreground">Pantry Items</p>
            </div>
            <div className="text-center">
              <div className="metric-value">{runningLowCount}</div>
              <p className="text-xs text-muted-foreground">Running Low</p>
            </div>
            <div className="text-center">
              <div className="metric-value">92%</div>
              <p className="text-xs text-muted-foreground">Stocked</p>
            </div>
          </div>

          {/* Key Items */}
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 rounded-lg bg-gradient-surface">
              <div className="flex items-center gap-2">
                <Wheat className="w-4 h-4 text-accent" />
                <span className="text-sm">Rice</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-success">5kg</div>
                <div className="text-xs text-muted-foreground">2 weeks supply</div>
              </div>
            </div>

            <div className="flex items-center justify-between p-2 rounded-lg bg-gradient-surface">
              <div className="flex items-center gap-2">
                <Coffee className="w-4 h-4 text-accent" />
                <span className="text-sm">Cooking Oil</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-warning">1L</div>
                <div className="text-xs text-muted-foreground">Consider restocking</div>
              </div>
            </div>

            <div className="flex items-center justify-between p-2 rounded-lg bg-gradient-surface">
              <div className="flex items-center gap-2">
                <Cookie className="w-4 h-4 text-accent" />
                <span className="text-sm">Kid's Snacks</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-success">Full</div>
                <div className="text-xs text-muted-foreground">Well stocked</div>
              </div>
            </div>
          </div>

          <div className="text-xs text-accent text-center group-hover:animate-pulse">
            Click to explore pantry →
          </div>
        </div>
      </CardContent>
    </Card>
  );
};