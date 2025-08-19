import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Wheat, Coffee, Cookie, Utensils, Calendar, Plus } from "lucide-react";

interface KitchenDetailsProps {
  data?: any;
}

interface KitchenItem {
  id: string;
  name: string;
  quantity: string;
  unit: string;
  stockLevel: number;
  weeksRemaining: number;
  category: string;
  icon: any;
}

const kitchenItems: KitchenItem[] = [
  { id: '1', name: 'Basmati Rice', quantity: '5', unit: 'kg', stockLevel: 85, weeksRemaining: 2, category: 'Grains', icon: Wheat },
  { id: '2', name: 'Cooking Oil', quantity: '1', unit: 'L', stockLevel: 40, weeksRemaining: 1, category: 'Cooking', icon: Coffee },
  { id: '3', name: 'Whole Wheat Flour', quantity: '2.5', unit: 'kg', stockLevel: 70, weeksRemaining: 3, category: 'Baking', icon: Wheat },
  { id: '4', name: 'Kids Snacks', quantity: '15', unit: 'packs', stockLevel: 95, weeksRemaining: 4, category: 'Snacks', icon: Cookie },
  { id: '5', name: 'Pasta', quantity: '800', unit: 'g', stockLevel: 60, weeksRemaining: 2, category: 'Grains', icon: Utensils },
  { id: '6', name: 'Olive Oil', quantity: '500', unit: 'ml', stockLevel: 30, weeksRemaining: 1, category: 'Cooking', icon: Coffee },
];

export const KitchenDetails = ({ data }: KitchenDetailsProps) => {
  const getStockColor = (level: number) => {
    if (level >= 70) return 'text-success';
    if (level >= 40) return 'text-warning';
    return 'text-destructive';
  };

  const getStockText = (level: number) => {
    if (level >= 70) return 'Well Stocked';
    if (level >= 40) return 'Running Low';
    return 'Restock Soon';
  };

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass-card neon-border">
          <CardContent className="p-4 text-center">
            <div className="metric-value">24</div>
            <p className="text-sm text-muted-foreground">Pantry Items</p>
          </CardContent>
        </Card>
        
        <Card className="glass-card neon-border">
          <CardContent className="p-4 text-center">
            <div className="metric-value text-warning">5</div>
            <p className="text-sm text-muted-foreground">Running Low</p>
          </CardContent>
        </Card>
        
        <Card className="glass-card neon-border">
          <CardContent className="p-4 text-center">
            <div className="metric-value">92%</div>
            <p className="text-sm text-muted-foreground">Stocked</p>
          </CardContent>
        </Card>
        
        <Card className="glass-card neon-border">
          <CardContent className="p-4 text-center">
            <div className="metric-value text-success">$215</div>
            <p className="text-sm text-muted-foreground">Pantry Value</p>
          </CardContent>
        </Card>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {kitchenItems.map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.id} className="glass-card border border-border/30 hover:border-accent/50 transition-colors">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Icon className="w-5 h-5 text-accent" />
                  {item.name}
                  <span className="text-sm text-muted-foreground ml-auto">{item.category}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Quantity:</span>
                  <span className="font-semibold">{item.quantity} {item.unit}</span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Stock Level:</span>
                    <span className={`text-sm font-semibold ${getStockColor(item.stockLevel)}`}>
                      {getStockText(item.stockLevel)}
                    </span>
                  </div>
                  <Progress value={item.stockLevel} className="h-2" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Supply lasts:</span>
                  </div>
                  <span className={`text-sm font-semibold ${
                    item.weeksRemaining <= 1 ? 'text-destructive' : 
                    item.weeksRemaining <= 2 ? 'text-warning' : 'text-success'
                  }`}>
                    {item.weeksRemaining} weeks
                  </span>
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full neon-border"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add to Shopping List
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};