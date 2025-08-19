import { useState } from "react";
import { ShoppingCart, Plus, Minus, X, Sparkles, Send, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface CartItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  price: number;
  icon: string;
}

interface SuggestionItem {
  id: string;
  name: string;
  reason: string;
  price: number;
  icon: string;
  category: string;
}

const initialSuggestions: SuggestionItem[] = [
  { id: "s1", name: "Neural Enhancement Vitamins", reason: "Great for your 5-year-old's brain development", price: 24.99, icon: "🧠", category: "Health" },
  { id: "s2", name: "Hydroponic Kale", reason: "Missing from your refrigerator", price: 8.99, icon: "🌱", category: "Vegetables" },
  { id: "s3", name: "Organic Baby Formula", reason: "Running low based on usage patterns", price: 32.99, icon: "🍼", category: "Baby" },
  { id: "s4", name: "Bio-Engineered Strawberries", reason: "Seasonal recommendation", price: 15.99, icon: "🍓", category: "Fruits" },
];

export const SmartCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: "1", name: "Milk", category: "Dairy", quantity: 1, price: 4.99, icon: "🥛" },
    { id: "2", name: "Vertical Farm Broccoli", category: "Vegetables", quantity: 2, price: 7.99, icon: "🥦" },
    { id: "3", name: "Lab-Grown Chicken Breast", category: "Protein", quantity: 1, price: 18.99, icon: "🍗" },
  ]);
  
  const [suggestions] = useState<SuggestionItem[]>(initialSuggestions);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalCost = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const updateQuantity = (id: string, change: number) => {
    setCartItems(items => 
      items.map(item => 
        item.id === id 
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const addSuggestionToCart = (suggestion: SuggestionItem) => {
    const newItem: CartItem = {
      id: `cart_${Date.now()}`,
      name: suggestion.name,
      category: suggestion.category,
      quantity: 1,
      price: suggestion.price,
      icon: suggestion.icon
    };
    setCartItems(items => [...items, newItem]);
  };

  const handleCheckout = () => {
    setShowCheckout(true);
    setTimeout(() => {
      setShowCheckout(false);
      setCartItems([]);
    }, 3000);
  };

  return (
    <>
      {/* Floating Cart Button */}
      {!isExpanded && (
        <Button
          onClick={() => setIsExpanded(true)}
          className="fixed top-6 right-6 w-16 h-16 rounded-full bg-gradient-accent shadow-glow-accent z-50 animate-pulse-glow"
          size="icon"
        >
          <ShoppingCart className="w-6 h-6" />
          {totalItems > 0 && (
            <Badge className="absolute -top-2 -right-2 bg-primary text-primary-foreground min-w-6 h-6 rounded-full flex items-center justify-center text-xs">
              {totalItems}
            </Badge>
          )}
        </Button>
      )}

      {/* Smart Cart Panel */}
      {isExpanded && (
        <div className="fixed top-6 right-6 w-96 max-h-[80vh] z-50 animate-scale-in">
          <Card className="glass-card neon-border shadow-glow-card">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-accent flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  Smart Cart
                </CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsExpanded(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Cart Items */}
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 rounded-lg bg-gradient-surface border border-border/20">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{item.icon}</span>
                      <div>
                        <p className="font-medium text-card-foreground">{item.name}</p>
                        <p className="text-xs text-muted-foreground">{item.category}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="w-6 h-6 neon-border"
                        onClick={() => updateQuantity(item.id, -1)}
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      
                      <span className="w-8 text-center text-sm font-medium">
                        {item.quantity}
                      </span>
                      
                      <Button
                        variant="outline"
                        size="icon"
                        className="w-6 h-6 neon-border"
                        onClick={() => updateQuantity(item.id, 1)}
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="icon"
                        className="w-6 h-6 text-destructive hover:text-destructive"
                        onClick={() => removeItem(item.id)}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Karen's AI Suggestions */}
              <div className="border-t border-border/20 pt-4">
                <Button
                  variant="ghost"
                  className="w-full justify-between text-accent hover:text-accent-foreground"
                  onClick={() => setShowSuggestions(!showSuggestions)}
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Karen's Suggestions
                  </span>
                  <Badge variant="secondary" className="text-xs">
                    {suggestions.length}
                  </Badge>
                </Button>

                {showSuggestions && (
                  <div className="space-y-2 mt-3 animate-fade-in">
                    {suggestions.map((suggestion) => (
                      <div key={suggestion.id} className="p-3 rounded-lg bg-gradient-primary/10 border border-primary/20">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{suggestion.icon}</span>
                            <div>
                              <p className="text-sm font-medium text-card-foreground">{suggestion.name}</p>
                              <p className="text-xs text-muted-foreground">{suggestion.reason}</p>
                              <p className="text-xs text-accent font-medium">${suggestion.price}</p>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            className="neon-border text-xs"
                            onClick={() => addSuggestionToCart(suggestion)}
                          >
                            Add
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Cart Summary */}
              <div className="border-t border-border/20 pt-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total Items:</span>
                  <span className="metric-value">{totalItems}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Estimated Cost:</span>
                  <span className="metric-value">${totalCost.toFixed(2)}</span>
                </div>

                <Button
                  className="w-full bg-gradient-accent shadow-glow-accent hover:shadow-glow-primary"
                  onClick={handleCheckout}
                  disabled={cartItems.length === 0}
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send to Store
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Checkout Confirmation Modal */}
      {showCheckout && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-md z-[100] flex items-center justify-center animate-fade-in">
          <Card className="glass-card neon-border shadow-glow-accent animate-scale-in max-w-md mx-4">
            <CardContent className="p-8 text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-gradient-accent rounded-full flex items-center justify-center animate-pulse-glow">
                <Check className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold holographic-text">Order Sent Successfully!</h3>
              <p className="text-muted-foreground">
                Your shopping list has been transmitted to the store. Estimated delivery: 45 minutes.
              </p>
              <div className="animate-holographic h-1 bg-gradient-accent rounded-full"></div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};