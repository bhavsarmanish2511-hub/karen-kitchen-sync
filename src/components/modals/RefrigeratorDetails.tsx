import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Droplets, Egg, Carrot, Apple, Beef, Clock, Plus } from "lucide-react";

interface RefrigeratorDetailsProps {
  data?: any;
}

interface RefrigeratorItem {
  id: string;
  name: string;
  quantity: string;
  unit: string;
  freshness: number;
  expiryDays: number;
  category: string;
  icon: any;
}

const refrigeratorItems: RefrigeratorItem[] = [
  { id: '1', name: 'Milk', quantity: '200', unit: 'ml', freshness: 20, expiryDays: 1, category: 'Dairy', icon: Droplets },
  { id: '2', name: 'Eggs', quantity: '2', unit: 'pieces', freshness: 85, expiryDays: 7, category: 'Dairy', icon: Egg },
  { id: '3', name: 'Carrots', quantity: '500', unit: 'g', freshness: 60, expiryDays: 10, category: 'Vegetables', icon: Carrot },
  { id: '4', name: 'Apples', quantity: '1.2', unit: 'kg', freshness: 90, expiryDays: 14, category: 'Fruits', icon: Apple },
  { id: '5', name: 'Chicken Breast', quantity: '800', unit: 'g', freshness: 95, expiryDays: 3, category: 'Meat', icon: Beef },
  { id: '6', name: 'Greek Yogurt', quantity: '1', unit: 'container', freshness: 75, expiryDays: 5, category: 'Dairy', icon: Droplets },
];

export const RefrigeratorDetails = ({ data }: RefrigeratorDetailsProps) => {
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
            <div className="metric-value">12</div>
            <p className="text-sm text-muted-foreground">Total Items</p>
          </CardContent>
        </Card>
        
        <Card className="glass-card neon-border">
          <CardContent className="p-4 text-center">
            <div className="metric-value text-warning">3</div>
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
            <div className="metric-value text-success">$127</div>
            <p className="text-sm text-muted-foreground">Current Value</p>
          </CardContent>
        </Card>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {refrigeratorItems.map((item) => {
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