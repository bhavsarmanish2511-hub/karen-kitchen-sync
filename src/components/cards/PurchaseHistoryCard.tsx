import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Receipt, TrendingUp, MapPin, Calendar } from "lucide-react";

interface PurchaseHistoryCardProps {
  onClick: () => void;
}

export const PurchaseHistoryCard = ({ onClick }: PurchaseHistoryCardProps) => {
  return (
    <Card 
      className="glass-card floating-card-hover neon-border cursor-pointer group"
      onClick={onClick}
    >
      <CardHeader>
        <CardTitle className="text-primary flex items-center gap-2">
          <Receipt className="w-5 h-5" />
          Purchase History
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-2">
            <div className="text-center">
              <div className="metric-value">$287</div>
              <p className="text-xs text-muted-foreground">This Month</p>
            </div>
            <div className="text-center">
              <div className="metric-value">12</div>
              <p className="text-xs text-muted-foreground">Trips</p>
            </div>
            <div className="text-center">
              <div className="metric-value flex items-center justify-center gap-1">
                <TrendingUp className="w-3 h-3" />
                3%
              </div>
              <p className="text-xs text-muted-foreground">vs Last Month</p>
            </div>
          </div>

          {/* Recent Purchases */}
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 rounded-lg bg-gradient-surface">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-accent" />
                <span className="text-sm">Yesterday</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-success">$45.67</div>
                <div className="text-xs text-muted-foreground">Fresh Mart</div>
              </div>
            </div>

            <div className="flex items-center justify-between p-2 rounded-lg bg-gradient-surface">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-accent" />
                <span className="text-sm">3 days ago</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-success">$23.89</div>
                <div className="text-xs text-muted-foreground">Corner Store</div>
              </div>
            </div>

            <div className="flex items-center justify-between p-2 rounded-lg bg-gradient-surface">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-accent" />
                <span className="text-sm">1 week ago</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-success">$89.34</div>
                <div className="text-xs text-muted-foreground">SuperMart</div>
              </div>
            </div>
          </div>

          {/* Favorite Store */}
          <div className="flex items-center justify-center gap-2 p-2 rounded-lg bg-gradient-primary text-primary-foreground">
            <MapPin className="w-4 h-4" />
            <span className="text-sm font-medium">Favorite: Fresh Mart</span>
          </div>

          <div className="text-xs text-accent text-center group-hover:animate-pulse">
            Click to view detailed transactions →
          </div>
        </div>
      </CardContent>
    </Card>
  );
};