import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Receipt, MapPin, Calendar, TrendingUp, ShoppingBag } from "lucide-react";

interface PurchaseHistoryDetailsProps {
  data?: any;
}

interface Purchase {
  id: string;
  date: string;
  store: string;
  amount: number;
  items: number;
  category: string;
  paymentMethod: string;
}

const purchaseHistory: Purchase[] = [
  { id: '1', date: '2024-01-18', store: 'Fresh Mart', amount: 45.67, items: 8, category: 'Weekly Shop', paymentMethod: 'Card' },
  { id: '2', date: '2024-01-16', store: 'Corner Store', amount: 23.89, items: 5, category: 'Quick Buy', paymentMethod: 'Cash' },
  { id: '3', date: '2024-01-12', store: 'SuperMart', amount: 89.34, items: 15, category: 'Monthly Stock', paymentMethod: 'Card' },
  { id: '4', date: '2024-01-10', store: 'Fresh Mart', amount: 67.23, items: 12, category: 'Weekly Shop', paymentMethod: 'Card' },
  { id: '5', date: '2024-01-08', store: 'Organic Market', amount: 34.56, items: 6, category: 'Specialty', paymentMethod: 'Card' },
  { id: '6', date: '2024-01-05', store: 'SuperMart', amount: 78.90, items: 18, category: 'Monthly Stock', paymentMethod: 'Card' },
];

export const PurchaseHistoryDetails = ({ data }: PurchaseHistoryDetailsProps) => {
  const totalSpent = purchaseHistory.reduce((sum, purchase) => sum + purchase.amount, 0);
  const averageSpent = totalSpent / purchaseHistory.length;
  const favoriteStore = 'Fresh Mart'; // Could be calculated from data
  const totalItems = purchaseHistory.reduce((sum, purchase) => sum + purchase.items, 0);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Weekly Shop': return 'bg-primary';
      case 'Monthly Stock': return 'bg-accent';
      case 'Quick Buy': return 'bg-warning';
      case 'Specialty': return 'bg-success';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass-card neon-border">
          <CardContent className="p-4 text-center">
            <div className="metric-value">${totalSpent.toFixed(2)}</div>
            <p className="text-sm text-muted-foreground">Total Spent</p>
          </CardContent>
        </Card>
        
        <Card className="glass-card neon-border">
          <CardContent className="p-4 text-center">
            <div className="metric-value">{purchaseHistory.length}</div>
            <p className="text-sm text-muted-foreground">Shopping Trips</p>
          </CardContent>
        </Card>
        
        <Card className="glass-card neon-border">
          <CardContent className="p-4 text-center">
            <div className="metric-value">${averageSpent.toFixed(2)}</div>
            <p className="text-sm text-muted-foreground">Average Trip</p>
          </CardContent>
        </Card>
        
        <Card className="glass-card neon-border">
          <CardContent className="p-4 text-center">
            <div className="metric-value">{totalItems}</div>
            <p className="text-sm text-muted-foreground">Total Items</p>
          </CardContent>
        </Card>
      </div>

      {/* Favorite Store */}
      <Card className="glass-card border border-accent/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-accent">
            <MapPin className="w-5 h-5" />
            Favorite Store
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold holographic-text">{favoriteStore}</h3>
              <p className="text-sm text-muted-foreground">Most visited • Best prices on fresh produce</p>
            </div>
            <div className="text-right">
              <div className="metric-value text-success">4.8★</div>
              <p className="text-xs text-muted-foreground">Your Rating</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Purchase History */}
      <Card className="glass-card border border-border/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Receipt className="w-5 h-5 text-accent" />
            Recent Purchases
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {purchaseHistory.map((purchase) => (
              <div 
                key={purchase.id} 
                className="flex items-center gap-4 p-4 rounded-lg bg-gradient-surface border border-border/20 hover:border-accent/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-accent flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6 text-accent-foreground" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold">{purchase.store}</h4>
                    <Badge 
                      variant="secondary" 
                      className={`text-xs ${getCategoryColor(purchase.category)}`}
                    >
                      {purchase.category}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(purchase.date).toLocaleDateString()}
                    </div>
                    <div>{purchase.items} items</div>
                    <div>{purchase.paymentMethod}</div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-lg font-bold text-success">
                    ${purchase.amount.toFixed(2)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    ${(purchase.amount / purchase.items).toFixed(2)}/item
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Spending Trend */}
      <Card className="glass-card border border-border/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-accent" />
            This Month's Trend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-primary text-primary-foreground">
            <div>
              <p className="text-sm opacity-90">You're spending 3% more than last month</p>
              <p className="text-xs opacity-70">Mainly due to increased fresh produce purchases</p>
            </div>
            <div className="text-2xl font-bold">+3%</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};