import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CartItem } from '@/types/inventory';
import { refrigeratorItems, kitchenItems, inventoryData, aiGeneratedItems } from '@/data/inventoryData';

interface InventoryContextType {
  // Inventory data
  refrigeratorItems: typeof refrigeratorItems;
  kitchenItems: typeof kitchenItems;
  inventoryData: typeof inventoryData;
  aiGeneratedItems: typeof aiGeneratedItems;
  
  // Cart functionality
  cartItems: CartItem[];
  addToCart: (item: { id: string; name: string; category: string; price: number; icon: string }) => void;
  removeFromCart: (id: string) => void;
  updateCartQuantity: (id: string, change: number) => void;
  clearCart: () => void;
  
  // Computed values
  totalCartItems: number;
  totalCartCost: number;
  refrigeratorCount: number;
  kitchenCount: number;
  inventoryCount: number;
  aiGeneratedCount: number;
}

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (context === undefined) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
};

interface InventoryProviderProps {
  children: ReactNode;
}

export const InventoryProvider: React.FC<InventoryProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: "1", name: "Milk", category: "Dairy", quantity: 1, price: 4.99, icon: "🥛" },
    { id: "2", name: "Vertical Farm Broccoli", category: "Vegetables", quantity: 2, price: 7.99, icon: "🥦" },
    { id: "3", name: "Lab-Grown Chicken Breast", category: "Protein", quantity: 1, price: 18.99, icon: "🍗" },
  ]);

  const addToCart = (item: { id: string; name: string; category: string; price: number; icon: string }) => {
    setCartItems(prev => {
      const existingItem = prev.find(cartItem => cartItem.name === item.name);
      if (existingItem) {
        return prev.map(cartItem =>
          cartItem.name === item.name
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        const newItem: CartItem = {
          id: `cart_${Date.now()}_${item.id}`,
          name: item.name,
          category: item.category,
          quantity: 1,
          price: item.price,
          icon: item.icon
        };
        return [...prev, newItem];
      }
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateCartQuantity = (id: string, change: number) => {
    setCartItems(prev => 
      prev.map(item => 
        item.id === id 
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // Computed values
  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalCartCost = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const refrigeratorCount = refrigeratorItems.length;
  const kitchenCount = kitchenItems.length;
  const inventoryCount = Object.values(inventoryData).flat().length;
  const aiGeneratedCount = aiGeneratedItems.length;

  const value: InventoryContextType = {
    refrigeratorItems,
    kitchenItems,
    inventoryData,
    aiGeneratedItems,
    cartItems,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    totalCartItems,
    totalCartCost,
    refrigeratorCount,
    kitchenCount,
    inventoryCount,
    aiGeneratedCount,
  };

  return (
    <InventoryContext.Provider value={value}>
      {children}
    </InventoryContext.Provider>
  );
};