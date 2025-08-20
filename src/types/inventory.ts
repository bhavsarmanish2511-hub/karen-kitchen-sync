export interface CartItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  price: number;
  icon: string;
}

export interface RefrigeratorItem {
  id: string;
  name: string;
  quantity: string;
  unit: string;
  freshness: number;
  expiryDays: number;
  category: string;
  price: number;
  nutritionalValue?: string;
}

export interface KitchenItem {
  id: string;
  name: string;
  quantity: string;
  unit: string;
  stockLevel: number;
  weeksRemaining: number;
  category: string;
  price: number;
  nutritionalValue?: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  quantity: string;
  unit: string;
  stockLevel: number;
  category: string;
  value: number;
  price: number;
  nutritionalValue?: string;
}

export interface AIGeneratedItem {
  id: string;
  name: string;
  reason: string;
  price: number;
  icon: string;
  category: string;
  priority: 'high' | 'medium' | 'low';
  nutritionalValue?: string;
}