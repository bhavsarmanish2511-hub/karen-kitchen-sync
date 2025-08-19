import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Brain, Clock, CheckCircle2, Send, Trash2 } from "lucide-react";

interface GroceryListDetailsProps {
  data?: any;
}

interface GroceryItem {
  id: string;
  name: string;
  quantity: string;
  estimatedPrice: number;
  category: string;
  priority: 'urgent' | 'high' | 'medium' | 'low';
  aiSuggested: boolean;
  forChild: boolean;
  completed: boolean;
}

const initialGroceryItems: GroceryItem[] = [
  { id: '1', name: 'Milk', quantity: '2L', estimatedPrice: 4.99, category: 'Dairy', priority: 'urgent', aiSuggested: true, forChild: false, completed: false },
  { id: '2', name: 'Organic Apples', quantity: '1kg', estimatedPrice: 6.99, category: 'Fruits', priority: 'high', aiSuggested: true, forChild: true, completed: false },
  { id: '3', name: 'Whole Grain Bread', quantity: '1 loaf', estimatedPrice: 3.49, category: 'Bakery', priority: 'medium', aiSuggested: false, forChild: false, completed: false },
  { id: '4', name: 'Greek Yogurt', quantity: '4 cups', estimatedPrice: 8.99, category: 'Dairy', priority: 'medium', aiSuggested: true, forChild: true, completed: false },
  { id: '5', name: 'Chicken Breast', quantity: '1kg', estimatedPrice: 12.99, category: 'Meat', priority: 'high', aiSuggested: false, forChild: false, completed: false },
  { id: '6', name: 'Pasta', quantity: '500g', estimatedPrice: 2.99, category: 'Pantry', priority: 'low', aiSuggested: false, forChild: false, completed: false },
];

export const GroceryListDetails = ({ data }: GroceryListDetailsProps) => {
  const [items, setItems] = useState<GroceryItem[]>(initialGroceryItems);

  const toggleItem = (id: string) => {
    setItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-destructive';
      case 'high': return 'bg-warning';
      case 'medium': return 'bg-accent';
      case 'low': return 'bg-muted';
      default: return 'bg-muted';
    }
  };

  const totalEstimated = items.reduce((sum, item) => sum + item.estimatedPrice, 0);
  const completedItems = items.filter(item => item.completed).length;
  const childItems = items.filter(item => item.forChild).length;

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass-card neon-border">
          <CardContent className="p-4 text-center">
            <div className="metric-value">{items.length}</div>
            <p className="text-sm text-muted-foreground">Total Items</p>
          </CardContent>
        </Card>
        
        <Card className="glass-card neon-border">
          <CardContent className="p-4 text-center">
            <div className="metric-value text-success">${totalEstimated.toFixed(2)}</div>
            <p className="text-sm text-muted-foreground">Estimated Total</p>
          </CardContent>
        </Card>
        
        <Card className="glass-card neon-border">
          <CardContent className="p-4 text-center">
            <div className="metric-value text-accent">{childItems}</div>
            <p className="text-sm text-muted-foreground">For Child</p>
          </CardContent>
        </Card>
        
        <Card className="glass-card neon-border">
          <CardContent className="p-4 text-center">
            <div className="metric-value">{completedItems}/{items.length}</div>
            <p className="text-sm text-muted-foreground">Completed</p>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button className="bg-gradient-accent hover:opacity-80 flex-1">
          <Send className="w-4 h-4 mr-2" />
          Send to Store
        </Button>
        <Button variant="outline" className="neon-border">
          <Brain className="w-4 h-4 mr-2" />
          Get AI Suggestions
        </Button>
      </div>

      {/* Shopping List */}
      <Card className="glass-card border border-border/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-accent" />
            Shopping List
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {items.map((item) => (
              <div 
                key={item.id} 
                className={`flex items-center gap-3 p-3 rounded-lg bg-gradient-surface border border-border/20 ${
                  item.completed ? 'opacity-60' : ''
                }`}
              >
                <Checkbox
                  checked={item.completed}
                  onCheckedChange={() => toggleItem(item.id)}
                  className="border-accent"
                />
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`font-medium ${item.completed ? 'line-through' : ''}`}>
                      {item.name}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      ({item.quantity})
                    </span>
                    
                    <div className="flex gap-1 ml-auto">
                      <Badge 
                        variant="secondary" 
                        className={`text-xs ${getPriorityColor(item.priority)}`}
                      >
                        {item.priority}
                      </Badge>
                      
                      {item.aiSuggested && (
                        <Badge variant="secondary" className="text-xs bg-primary">
                          <Brain className="w-3 h-3 mr-1" />
                          AI
                        </Badge>
                      )}
                      
                      {item.forChild && (
                        <Badge variant="secondary" className="text-xs bg-accent">
                          Child
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{item.category}</span>
                    <span className="text-sm font-semibold text-success">
                      ${item.estimatedPrice.toFixed(2)}
                    </span>
                  </div>
                </div>
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeItem(item.id)}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};