import { Plus, Minus, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CartItemProps {
  id: string;
  name: string;
  category: string;
  quantity: number;
  price: number;
  icon: string;
  onQuantityChange: (id: string, change: number) => void;
  onRemove: (id: string) => void;
  isReplacing?: boolean;
}

export const CartItem = ({ 
  id, 
  name, 
  category, 
  quantity, 
  price, 
  icon, 
  onQuantityChange, 
  onRemove,
  isReplacing = false 
}: CartItemProps) => {
  return (
    <div className={`flex items-center justify-between p-3 rounded-lg bg-gradient-surface border border-border/20 transition-all duration-300 ${isReplacing ? 'animate-pulse bg-gradient-primary/20' : ''}`}>
      <div className="flex items-center gap-3">
        <span className="text-2xl animate-pulse-glow">{icon}</span>
        <div>
          <p className="font-medium text-card-foreground">{name}</p>
          <p className="text-xs text-muted-foreground">{category}</p>
          <p className="text-xs text-accent font-medium">${price.toFixed(2)}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          className="w-6 h-6 neon-border hover:bg-gradient-accent/20"
          onClick={() => onQuantityChange(id, -1)}
        >
          <Minus className="w-3 h-3" />
        </Button>
        
        <span className="w-8 text-center text-sm font-medium metric-value">
          {quantity}
        </span>
        
        <Button
          variant="outline"
          size="icon"
          className="w-6 h-6 neon-border hover:bg-gradient-accent/20"
          onClick={() => onQuantityChange(id, 1)}
        >
          <Plus className="w-3 h-3" />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          className="w-6 h-6 text-destructive hover:text-destructive hover:bg-destructive/20"
          onClick={() => onRemove(id)}
        >
          <X className="w-3 h-3" />
        </Button>
      </div>
    </div>
  );
};