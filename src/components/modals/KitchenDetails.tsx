import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Wheat, Coffee, Cookie, Utensils, Calendar, Plus } from "lucide-react";
import { useInventory } from "@/contexts/InventoryContext";

interface KitchenDetailsProps {
  data?: any;
}

const iconMap: { [key: string]: any } = {
  'Grains': Wheat,
  'Cooking': Coffee,
  'Baking': Wheat,
  'Snacks': Cookie,
  'Legumes': Utensils,
  'Seasoning': Utensils,
  'Natural Sweetener': Coffee,
  'Condiments': Utensils,
  'Beverages': Coffee
};

export const KitchenDetails = ({ data }: KitchenDetailsProps) => {
  const { kitchenItems, addToCart } = useInventory();
  
  const runningLowCount = kitchenItems.filter(item => item.stockLevel < 50).length;
  const totalValue = kitchenItems.reduce((sum, item) => sum + item.price, 0);
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
            <div className="metric-value">{kitchenItems.length}</div>
            <p className="text-sm text-muted-foreground">Pantry Items</p>
          </CardContent>
        </Card>
        
        <Card className="glass-card neon-border">
          <CardContent className="p-4 text-center">
            <div className="metric-value text-warning">{runningLowCount}</div>
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
            <div className="metric-value text-success">${totalValue.toFixed(0)}</div>
            <p className="text-sm text-muted-foreground">Pantry Value</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {kitchenItems.map((item) => {
          const Icon = iconMap[item.category] || Wheat;
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

                {/* Nutritional Value */}
                {item.nutritionalValue && (
                  <div className="p-2 rounded-lg bg-gradient-primary/10 border border-primary/20">
                    <p className="text-xs text-muted-foreground">Nutritional Value:</p>
                    <p className="text-xs text-card-foreground">{item.nutritionalValue}</p>
                  </div>
                )}
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full neon-border"
                  onClick={() => addToCart({
                    id: item.id,
                    name: item.name,
                    category: item.category,
                    price: item.price,
                    icon: item.category === 'Grains' ? '🌾' : 
                          item.category === 'Cooking' ? '🫒' :
                          item.category === 'Snacks' ? '🍪' :
                          item.category === 'Beverages' ? '☕' : '🥄'
                  })}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};