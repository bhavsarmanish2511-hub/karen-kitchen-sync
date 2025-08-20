import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Droplets, Egg, Carrot, Apple, Beef, Clock, Plus } from "lucide-react";
import { useInventory } from "@/contexts/InventoryContext";

interface RefrigeratorDetailsProps {
  data?: any;
}

const iconMap: { [key: string]: any } = {
  'Dairy': Droplets,
  'Vegetables': Carrot,
  'Fruits': Apple,
  'Protein': Beef,
  'Beverages': Droplets
};

export const RefrigeratorDetails = ({ data }: RefrigeratorDetailsProps) => {
  const { refrigeratorItems, addToCart } = useInventory();
  
  const expiringCount = refrigeratorItems.filter(item => item.expiryDays <= 3).length;
  const totalValue = refrigeratorItems.reduce((sum, item) => sum + item.price, 0);
  const getFreshnessColor = (freshness: number) => {
    if (freshness >= 80) return 'text-success';
    if (freshness >= 50) return 'text-warning';
    return 'text-destructive';
  };

  const getFreshnessText = (freshness: number) => {
    if (freshness >= 80) return 'Fresh';
    if (freshness >= 50) return 'Good';
    return 'Check Soon';
  };

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass-card neon-border">
          <CardContent className="p-4 text-center">
            <div className="metric-value">{refrigeratorItems.length}</div>
            <p className="text-sm text-muted-foreground">Total Items</p>
          </CardContent>
        </Card>
        
        <Card className="glass-card neon-border">
          <CardContent className="p-4 text-center">
            <div className="metric-value text-warning">{expiringCount}</div>
            <p className="text-sm text-muted-foreground">Expiring Soon</p>
          </CardContent>
        </Card>
        
        <Card className="glass-card neon-border">
          <CardContent className="p-4 text-center">
            <div className="metric-value">85%</div>
            <p className="text-sm text-muted-foreground">Capacity Used</p>
          </CardContent>
        </Card>
        
        <Card className="glass-card neon-border">
          <CardContent className="p-4 text-center">
            <div className="metric-value text-success">${totalValue.toFixed(0)}</div>
            <p className="text-sm text-muted-foreground">Current Value</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {refrigeratorItems.map((item) => {
          const Icon = iconMap[item.category] || Droplets;
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
                    <span className="text-sm text-muted-foreground">Freshness:</span>
                    <span className={`text-sm font-semibold ${getFreshnessColor(item.freshness)}`}>
                      {getFreshnessText(item.freshness)}
                    </span>
                  </div>
                  <Progress value={item.freshness} className="h-2" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Expires in:</span>
                  </div>
                  <span className={`text-sm font-semibold ${
                    item.expiryDays <= 2 ? 'text-destructive' : 
                    item.expiryDays <= 5 ? 'text-warning' : 'text-success'
                  }`}>
                    {item.expiryDays} days
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
                    icon: item.category === 'Dairy' ? '🥛' : 
                          item.category === 'Vegetables' ? '🥕' :
                          item.category === 'Fruits' ? '🍎' :
                          item.category === 'Protein' ? '🍗' : '🥛'
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