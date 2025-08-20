import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Refrigerator, Droplets, Egg, Carrot } from "lucide-react";
import { useInventory } from "@/contexts/InventoryContext";

interface SmartRefrigeratorCardProps {
  onClick: () => void;
}

export const SmartRefrigeratorCard = ({ onClick }: SmartRefrigeratorCardProps) => {
  const { refrigeratorCount, refrigeratorItems } = useInventory();
  
  const expiringCount = refrigeratorItems.filter(item => item.expiryDays <= 3).length;
  return (
    <Card 
      className="glass-card floating-card-hover neon-border cursor-pointer group"
      onClick={onClick}
    >
      <CardHeader>
        <CardTitle className="text-primary flex items-center gap-2">
          <Refrigerator className="w-5 h-5" />
          Smart Refrigerator
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-2">
            <div className="text-center">
              <div className="metric-value">{refrigeratorCount}</div>
              <p className="text-xs text-muted-foreground">Items</p>
            </div>
            <div className="text-center">
              <div className="metric-value">{expiringCount}</div>
              <p className="text-xs text-muted-foreground">Expiring</p>
            </div>
            <div className="text-center">
              <div className="metric-value">85%</div>
              <p className="text-xs text-muted-foreground">Full</p>
            </div>
          </div>

          {/* Key Items */}
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 rounded-lg bg-gradient-surface">
              <div className="flex items-center gap-2">
                <Droplets className="w-4 h-4 text-accent" />
                <span className="text-sm">Milk</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-warning">200ml</div>
                <div className="text-xs text-muted-foreground">Expires tomorrow</div>
              </div>
            </div>

            <div className="flex items-center justify-between p-2 rounded-lg bg-gradient-surface">
              <div className="flex items-center gap-2">
                <Egg className="w-4 h-4 text-accent" />
                <span className="text-sm">Eggs</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-success">2 left</div>
                <div className="text-xs text-muted-foreground">Fresh</div>
              </div>
            </div>

            <div className="flex items-center justify-between p-2 rounded-lg bg-gradient-surface">
              <div className="flex items-center gap-2">
                <Carrot className="w-4 h-4 text-accent" />
                <span className="text-sm">Vegetables</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-destructive">Low</div>
                <div className="text-xs text-muted-foreground">Restock needed</div>
              </div>
            </div>
          </div>

          <div className="text-xs text-accent text-center group-hover:animate-pulse">
            Click to view detailed inventory →
          </div>
        </div>
      </CardContent>
    </Card>
  );
};