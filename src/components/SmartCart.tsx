import { useState } from "react";
import { ShoppingCart, Send, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CartItem } from "./cart/CartItem";
import { KarenSuggestions } from "./cart/KarenSuggestions";
import { CheckoutConfirmation } from "./cart/CheckoutConfirmation";

interface CartItemType {
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
  urgency: 'low' | 'medium' | 'high';
  type: 'missing' | 'replacement' | 'upgrade' | 'health' | 'seasonal';
}

interface ReplacementSuggestion {
  originalId: string;
  originalName: string;
  replacement: SuggestionItem;
  reason: string;
}

const initialSuggestions: SuggestionItem[] = [
  { id: "s1", name: "Neural Enhancement Vitamins", reason: "Perfect for your 5-year-old's cognitive development", price: 24.99, icon: "🧠", category: "Health", urgency: "medium", type: "health" },
  { id: "s2", name: "Hydroponic Kale", reason: "Missing from your smart refrigerator", price: 8.99, icon: "🌱", category: "Vegetables", urgency: "high", type: "missing" },
  { id: "s3", name: "Quantum Baby Formula", reason: "Running low based on AI consumption tracking", price: 32.99, icon: "🍼", category: "Baby", urgency: "high", type: "missing" },
  { id: "s4", name: "Bio-Engineered Strawberries", reason: "Peak season for enhanced nutrients", price: 15.99, icon: "🍓", category: "Fruits", urgency: "low", type: "seasonal" },
  { id: "s5", name: "Smart Cleaning Pods", reason: "Household maintenance due tomorrow", price: 18.49, icon: "🧽", category: "Cleaning", urgency: "medium", type: "missing" },
  { id: "s6", name: "Probiotic Yogurt Cubes", reason: "Boost immunity for family health", price: 12.99, icon: "🥛", category: "Health", urgency: "low", type: "health" },
  { id: "s7", name: "Vertical Farm Spinach", reason: "High in iron, great for energy", price: 7.49, icon: "🥬", category: "Vegetables", urgency: "medium", type: "health" },
  { id: "s8", name: "Lab-Grown Salmon", reason: "Omega-3 for brain development", price: 28.99, icon: "🐟", category: "Protein", urgency: "low", type: "health" },
];

const initialReplacements: ReplacementSuggestion[] = [
  {
    originalId: "1",
    originalName: "Milk",
    replacement: { id: "r1", name: "Nano-Enhanced Milk", reason: "Longer freshness with nano-preservation", price: 6.99, icon: "🥛", category: "Dairy", urgency: "medium", type: "upgrade" },
    reason: "Lasts 3x longer with enhanced nutrition profile"
  },
  {
    originalId: "3",
    originalName: "Lab-Grown Chicken Breast",
    replacement: { id: "r2", name: "Premium Lab-Grown Chicken", reason: "Higher protein content and better texture", price: 22.99, icon: "🍗", category: "Protein", urgency: "low", type: "upgrade" },
    reason: "30% more protein with superior taste enhancement"
  }
];

export const SmartCart = () => {
  const [cartItems, setCartItems] = useState<CartItemType[]>([
    { id: "1", name: "Milk", category: "Dairy", quantity: 1, price: 4.99, icon: "🥛" },
    { id: "2", name: "Vertical Farm Broccoli", category: "Vegetables", quantity: 2, price: 7.99, icon: "🥦" },
    { id: "3", name: "Lab-Grown Chicken Breast", category: "Protein", quantity: 1, price: 18.99, icon: "🍗" },
  ]);
  
  const [suggestions] = useState<SuggestionItem[]>(initialSuggestions);
  const [replacements, setReplacements] = useState<ReplacementSuggestion[]>(initialReplacements);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [replacingItems, setReplacingItems] = useState<Set<string>>(new Set());

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
    const newItem: CartItemType = {
      id: `cart_${Date.now()}`,
      name: suggestion.name,
      category: suggestion.category,
      quantity: 1,
      price: suggestion.price,
      icon: suggestion.icon
    };
    setCartItems(items => [...items, newItem]);
  };

  const handleReplaceItem = (replacement: ReplacementSuggestion) => {
    setReplacingItems(prev => new Set([...prev, replacement.originalId]));
    
    setTimeout(() => {
      setCartItems(items => 
        items.map(item => 
          item.id === replacement.originalId 
            ? {
                ...item,
                name: replacement.replacement.name,
                price: replacement.replacement.price,
                icon: replacement.replacement.icon,
                category: replacement.replacement.category
              }
            : item
        )
      );
      
      setReplacements(prev => prev.filter(r => r.originalId !== replacement.originalId));
      setReplacingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(replacement.originalId);
        return newSet;
      });
    }, 1000);
  };

  const handleDismissReplacement = (originalId: string) => {
    setReplacements(prev => prev.filter(r => r.originalId !== originalId));
  };

  const handleCheckout = () => {
    setShowCheckout(true);
    setTimeout(() => {
      setShowCheckout(false);
      setCartItems([]);
      setReplacements(initialReplacements);
    }, 4000);
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
              <div className="space-y-3 max-h-64 overflow-y-auto scrollbar-hide">
                {cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    {...item}
                    onQuantityChange={updateQuantity}
                    onRemove={removeItem}
                    isReplacing={replacingItems.has(item.id)}
                  />
                ))}
                {cartItems.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <ShoppingCart className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>Your smart cart is empty</p>
                    <p className="text-xs">Karen will suggest items based on your needs</p>
                  </div>
                )}
              </div>

              {/* Karen's AI Suggestions */}
              <KarenSuggestions
                suggestions={suggestions}
                replacements={replacements}
                onAddSuggestion={addSuggestionToCart}
                onReplaceItem={handleReplaceItem}
                onDismissReplacement={handleDismissReplacement}
              />

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
                  className="w-full bg-gradient-accent shadow-glow-accent hover:shadow-glow-primary animate-pulse-glow"
                  onClick={handleCheckout}
                  disabled={cartItems.length === 0}
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send to Quantum Store
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Checkout Confirmation Modal */}
      <CheckoutConfirmation
        isVisible={showCheckout}
        totalItems={totalItems}
        totalCost={totalCost}
      />
    </>
  );
};