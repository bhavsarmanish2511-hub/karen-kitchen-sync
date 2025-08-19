import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Apple, Coffee, Milk, Utensils } from "lucide-react";

interface InventoryExplorerCardProps {
  onClick: () => void;
}

export const InventoryExplorerCard = ({ onClick }: InventoryExplorerCardProps) => {
  return (
    <Card 
      className="glass-card floating-card-hover neon-border cursor-pointer group xl:col-span-2"
      onClick={onClick}
    >
      <CardHeader>
        <CardTitle className="text-primary flex items-center gap-2">
          <Package className="w-5 h-5" />
          Inventory Explorer
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Category Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="flex flex-col items-center p-3 rounded-lg bg-gradient-surface border border-border/20 hover:border-accent/50 transition-colors">
              <Apple className="w-8 h-8 text-accent mb-2" />
              <span className="text-sm font-medium">Vegetables</span>
              <span className="text-xs text-muted-foreground">8 items</span>
              <div className="w-full bg-border rounded-full h-1.5 mt-2">
                <div className="bg-warning h-1.5 rounded-full" style={{ width: '40%' }}></div>
              </div>
            </div>

            <div className="flex flex-col items-center p-3 rounded-lg bg-gradient-surface border border-border/20 hover:border-accent/50 transition-colors">
              <Utensils className="w-8 h-8 text-accent mb-2" />
              <span className="text-sm font-medium">Groceries</span>
              <span className="text-xs text-muted-foreground">15 items</span>
              <div className="w-full bg-border rounded-full h-1.5 mt-2">
                <div className="bg-success h-1.5 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>

            <div className="flex flex-col items-center p-3 rounded-lg bg-gradient-surface border border-border/20 hover:border-accent/50 transition-colors">
              <Coffee className="w-8 h-8 text-accent mb-2" />
              <span className="text-sm font-medium">Beverages</span>
              <span className="text-xs text-muted-foreground">6 items</span>
              <div className="w-full bg-border rounded-full h-1.5 mt-2">
                <div className="bg-success h-1.5 rounded-full" style={{ width: '70%' }}></div>
              </div>
            </div>

            <div className="flex flex-col items-center p-3 rounded-lg bg-gradient-surface border border-border/20 hover:border-accent/50 transition-colors">
              <Milk className="w-8 h-8 text-accent mb-2" />
              <span className="text-sm font-medium">Consumables</span>
              <span className="text-xs text-muted-foreground">11 items</span>
              <div className="w-full bg-border rounded-full h-1.5 mt-2">
                <div className="bg-accent h-1.5 rounded-full" style={{ width: '90%' }}></div>
              </div>
            </div>
          </div>

          {/* Quick Insights */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-accent text-accent-foreground">
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              <span className="font-medium">Total Inventory Value</span>
            </div>
            <span className="text-lg font-bold">$342</span>
          </div>

          <div className="text-xs text-accent text-center group-hover:animate-pulse">
            Click to explore categories in detail →
          </div>
        </div>
      </CardContent>
    </Card>
  );
};