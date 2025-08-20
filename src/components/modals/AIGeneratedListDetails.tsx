import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, Plus, ShoppingCart } from "lucide-react";
import { useInventory } from "@/contexts/InventoryContext";

interface AIGeneratedListDetailsProps {
  data?: any;
}

export const AIGeneratedListDetails = ({ data }: AIGeneratedListDetailsProps) => {
  const { aiGeneratedItems, addToCart } = useInventory();
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-destructive';
      case 'medium': return 'text-warning';
      default: return 'text-success';
    }
  };

  const totalEstimated = aiGeneratedItems.reduce((sum, item) => sum + item.price, 0);
  const highPriorityCount = aiGeneratedItems.filter(item => item.priority === 'high').length;

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass-card neon-border">
          <CardContent className="p-4 text-center">
            <div className="metric-value">{aiGeneratedItems.length}</div>
            <p className="text-sm text-muted-foreground">AI Suggestions</p>
          </CardContent>
        </Card>
        
        <Card className="glass-card neon-border">
          <CardContent className="p-4 text-center">
            <div className="metric-value text-success">${totalEstimated.toFixed(0)}</div>
            <p className="text-sm text-muted-foreground">Total Estimated</p>
          </CardContent>
        </Card>
        
        <Card className="glass-card neon-border">
          <CardContent className="p-4 text-center">
            <div className="metric-value text-destructive">{highPriorityCount}</div>
            <p className="text-sm text-muted-foreground">High Priority</p>
          </CardContent>
        </Card>
        
        <Card className="glass-card neon-border">
          <CardContent className="p-4 text-center">
            <div className="metric-value text-accent">Karen</div>
            <p className="text-sm text-muted-foreground">AI Assistant</p>
          </CardContent>
        </Card>
      </div>

      {/* AI Assistant Header */}
      <Card className="glass-card border border-accent/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-accent">
            <Brain className="w-5 h-5" />
            Karen's Smart Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Based on your smart home data, shopping patterns, and family needs, here are my personalized suggestions:
          </p>
        </CardContent>
      </Card>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {aiGeneratedItems.map((item) => (
          <Card key={item.id} className="glass-card border border-border/30 hover:border-accent/50 transition-colors">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <span className="text-2xl">{item.icon}</span>
                {item.name}
                <Badge variant="outline" className={`ml-auto ${getPriorityColor(item.priority)}`}>
                  {item.priority}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Category:</span>
                <span className="font-semibold">{item.category}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Price:</span>
                <span className="font-semibold text-success">${item.price.toFixed(2)}</span>
              </div>

              <div className="p-2 rounded-lg bg-gradient-accent/10 border border-accent/20">
                <p className="text-sm text-card-foreground">{item.reason}</p>
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
                  icon: item.icon
                })}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};