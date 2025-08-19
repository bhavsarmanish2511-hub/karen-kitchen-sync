import { X, Refrigerator, ChefHat, ShoppingCart, Receipt, Package } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RefrigeratorDetails } from "./modals/RefrigeratorDetails";
import { KitchenDetails } from "./modals/KitchenDetails";
import { GroceryListDetails } from "./modals/GroceryListDetails";
import { PurchaseHistoryDetails } from "./modals/PurchaseHistoryDetails";
import { InventoryDetails } from "./modals/InventoryDetails";

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'refrigerator' | 'kitchen' | 'grocery-list' | 'history' | 'inventory' | null;
  data?: any;
}

const getModalConfig = (type: DetailModalProps['type']) => {
  switch (type) {
    case 'refrigerator':
      return {
        title: 'Smart Refrigerator',
        icon: Refrigerator,
        component: RefrigeratorDetails
      };
    case 'kitchen':
      return {
        title: 'Smart Kitchen',
        icon: ChefHat,
        component: KitchenDetails
      };
    case 'grocery-list':
      return {
        title: 'AI-Generated Grocery List',
        icon: ShoppingCart,
        component: GroceryListDetails
      };
    case 'history':
      return {
        title: 'Purchase History',
        icon: Receipt,
        component: PurchaseHistoryDetails
      };
    case 'inventory':
      return {
        title: 'Inventory Explorer',
        icon: Package,
        component: InventoryDetails
      };
    default:
      return null;
  }
};

export const DetailModal = ({ isOpen, onClose, type, data }: DetailModalProps) => {
  const config = getModalConfig(type);

  if (!config) return null;

  const { title, icon: Icon, component: Component } = config;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden glass-card border-accent/30">
        <DialogHeader className="border-b border-border/30 pb-4">
          <DialogTitle className="text-2xl holographic-text flex items-center gap-3">
            <Icon className="w-6 h-6 text-accent" />
            {title}
          </DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4" />
          </Button>
        </DialogHeader>
        
        <div className="overflow-y-auto max-h-[calc(90vh-100px)] p-4">
          <Component data={data} />
        </div>
      </DialogContent>
    </Dialog>
  );
};