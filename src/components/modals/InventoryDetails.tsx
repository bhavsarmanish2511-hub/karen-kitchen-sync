import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Apple, Coffee, Milk, Utensils, Package, Plus } from "lucide-react";

interface InventoryDetailsProps {
  data?: any;
}

interface InventoryItem {
  id: string;
  name: string;
  quantity: string;
  unit: string;
  stockLevel: number;
  category: string;
  value: number;
}

const inventoryData = {
  vegetables: [
    { id: '1', name: 'Tomatoes', quantity: '1.2', unit: 'kg', stockLevel: 60, category: 'Fresh', value: 4.80 },
    { id: '2', name: 'Onions', quantity: '2', unit: 'kg', stockLevel: 85, category: 'Fresh', value: 3.20 },
    { id: '3', name: 'Spinach', quantity: '500', unit: 'g', stockLevel: 40, category: 'Leafy', value: 2.50 },
    { id: '4', name: 'Bell Peppers', quantity: '800', unit: 'g', stockLevel: 70, category: 'Fresh', value: 5.60 },
  ],
  groceries: [
    { id: '5', name: 'Basmati Rice', quantity: '5', unit: 'kg', stockLevel: 85, category: 'Grains', value: 15.99 },
    { id: '6', name: 'Whole Wheat Flour', quantity: '2', unit: 'kg', stockLevel: 70, category: 'Baking', value: 8.99 },
    { id: '7', name: 'Lentils', quantity: '1.5', unit: 'kg', stockLevel: 90, category: 'Legumes', value: 7.50 },
    { id: '8', name: 'Oats', quantity: '1', unit: 'kg', stockLevel: 45, category: 'Breakfast', value: 5.99 },
  ],
  beverages: [
    { id: '9', name: 'Orange Juice', quantity: '1', unit: 'L', stockLevel: 80, category: 'Juice', value: 3.99 },
    { id: '10', name: 'Green Tea', quantity: '50', unit: 'bags', stockLevel: 60, category: 'Tea', value: 12.99 },
    { id: '11', name: 'Coffee Beans', quantity: '500', unit: 'g', stockLevel: 30, category: 'Coffee', value: 18.99 },
    { id: '12', name: 'Sparkling Water', quantity: '6', unit: 'bottles', stockLevel: 95, category: 'Water', value: 8.99 },
  ],
  consumables: [
    { id: '13', name: 'Dish Soap', quantity: '1', unit: 'bottle', stockLevel: 40, category: 'Cleaning', value: 4.99 },
    { id: '14', name: 'Paper Towels', quantity: '8', unit: 'rolls', stockLevel: 75, category: 'Paper', value: 12.99 },
    { id: '15', name: 'Toilet Paper', quantity: '12', unit: 'rolls', stockLevel: 90, category: 'Paper', value: 15.99 },
    { id: '16', name: 'Laundry Detergent', quantity: '2', unit: 'L', stockLevel: 55, category: 'Cleaning', value: 22.99 },
  ]
};

const categoryIcons = {
  vegetables: Apple,
  groceries: Utensils,
  beverages: Coffee,
  consumables: Milk
};

export const InventoryDetails = ({ data }: InventoryDetailsProps) => {
  const [activeTab, setActiveTab] = useState('vegetables');

  const getStockColor = (level: number) => {
    if (level >= 70) return 'text-success';
    if (level >= 40) return 'text-warning';
    return 'text-destructive';
  };

  const getStockText = (level: number) => {
    if (level >= 70) return 'Well Stocked';
    if (level >= 40) return 'Running Low';
    return 'Restock Soon';
  };

  const calculateCategoryStats = (items: InventoryItem[]) => {
    const totalValue = items.reduce((sum, item) => sum + item.value, 0);
    const avgStock = items.reduce((sum, item) => sum + item.stockLevel, 0) / items.length;
    const lowStock = items.filter(item => item.stockLevel < 50).length;
    
    return { totalValue, avgStock, lowStock, totalItems: items.length };
  };

  const renderCategoryContent = (items: InventoryItem[], category: string) => {
    const stats = calculateCategoryStats(items);
    const Icon = categoryIcons[category as keyof typeof categoryIcons];

    return (
      <div className="space-y-6">
        {/* Category Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="glass-card neon-border">
            <CardContent className="p-4 text-center">
              <div className="metric-value">{stats.totalItems}</div>
              <p className="text-sm text-muted-foreground">Items</p>
            </CardContent>
          </Card>
          
          <Card className="glass-card neon-border">
            <CardContent className="p-4 text-center">
              <div className="metric-value text-success">${stats.totalValue.toFixed(2)}</div>
              <p className="text-sm text-muted-foreground">Total Value</p>
            </CardContent>
          </Card>
          
          <Card className="glass-card neon-border">
            <CardContent className="p-4 text-center">
              <div className="metric-value">{Math.round(stats.avgStock)}%</div>
              <p className="text-sm text-muted-foreground">Avg Stock</p>
            </CardContent>
          </Card>
          
          <Card className="glass-card neon-border">
            <CardContent className="p-4 text-center">
              <div className="metric-value text-warning">{stats.lowStock}</div>
              <p className="text-sm text-muted-foreground">Low Stock</p>
            </CardContent>
          </Card>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((item) => (
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
                    <span className="text-sm text-muted-foreground">Stock Level:</span>
                    <span className={`text-sm font-semibold ${getStockColor(item.stockLevel)}`}>
                      {getStockText(item.stockLevel)}
                    </span>
                  </div>
                  <Progress value={item.stockLevel} className="h-2" />
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Value:</span>
                  <span className="text-sm font-semibold text-success">
                    ${item.value.toFixed(2)}
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
          ))}
        </div>
      </div>
    );
  };

  const totalInventoryValue = Object.values(inventoryData)
    .flat()
    .reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="space-y-6">
      {/* Overall Stats */}
      <Card className="glass-card border border-accent/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-accent">
            <Package className="w-5 h-5" />
            Total Inventory Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <div className="metric-value">${totalInventoryValue.toFixed(2)}</div>
              <p className="text-sm text-muted-foreground">Total Inventory Value</p>
            </div>
            <div className="text-right">
              <div className="metric-value">{Object.values(inventoryData).flat().length}</div>
              <p className="text-sm text-muted-foreground">Total Items</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 glass-card">
          <TabsTrigger value="vegetables" className="flex items-center gap-2">
            <Apple className="w-4 h-4" />
            Vegetables
          </TabsTrigger>
          <TabsTrigger value="groceries" className="flex items-center gap-2">
            <Utensils className="w-4 h-4" />
            Groceries
          </TabsTrigger>
          <TabsTrigger value="beverages" className="flex items-center gap-2">
            <Coffee className="w-4 h-4" />
            Beverages
          </TabsTrigger>
          <TabsTrigger value="consumables" className="flex items-center gap-2">
            <Milk className="w-4 h-4" />
            Consumables
          </TabsTrigger>
        </TabsList>

        <TabsContent value="vegetables">
          {renderCategoryContent(inventoryData.vegetables, 'vegetables')}
        </TabsContent>
        <TabsContent value="groceries">
          {renderCategoryContent(inventoryData.groceries, 'groceries')}
        </TabsContent>
        <TabsContent value="beverages">
          {renderCategoryContent(inventoryData.beverages, 'beverages')}
        </TabsContent>
        <TabsContent value="consumables">
          {renderCategoryContent(inventoryData.consumables, 'consumables')}
        </TabsContent>
      </Tabs>
    </div>
  );
};