import { useState } from "react";
import { MessageCircle, User, CreditCard, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SmartRefrigeratorCard } from "./cards/SmartRefrigeratorCard";
import { SmartKitchenCard } from "./cards/SmartKitchenCard";
import { GroceryListCard } from "./cards/GroceryListCard";
import { PurchaseHistoryCard } from "./cards/PurchaseHistoryCard";
import { InventoryExplorerCard } from "./cards/InventoryExplorerCard";
import { DetailModal } from "./DetailModal";
import { KarenChatbot } from "./KarenChatbot";
import { SmartCart } from "./SmartCart";
import heroImage from "@/assets/hero-kitchen.jpg";

interface ModalData {
  type: 'refrigerator' | 'kitchen' | 'grocery-list' | 'history' | 'inventory' | null;
  data?: any;
}

export const GroceryDashboard = () => {
  const [modalData, setModalData] = useState<ModalData>({ type: null });
  const [isChatOpen, setIsChatOpen] = useState(false);

  const openModal = (type: ModalData['type'], data?: any) => {
    setModalData({ type, data });
  };

  const closeModal = () => {
    setModalData({ type: null });
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Hero Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-background/95" />
      
      {/* Main Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-border/30 backdrop-blur-md bg-card/20">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center">
                    <User className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold holographic-text">Welcome back, Hanna</h1>
                    <p className="text-sm text-muted-foreground">Family of 2 • Smart Home Active</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="glass-card px-4 py-2 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-accent" />
                  <span className="text-sm text-muted-foreground">Budget:</span>
                  <span className="metric-value">$450</span>
                </div>
                
                <div className="glass-card px-4 py-2 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-success" />
                  <span className="text-sm text-muted-foreground">This Month:</span>
                  <span className="metric-value">$287</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Grid */}
        <main className="container mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            <SmartRefrigeratorCard onClick={() => openModal('refrigerator')} />
            <SmartKitchenCard onClick={() => openModal('kitchen')} />
            <GroceryListCard onClick={() => openModal('grocery-list')} />
            <PurchaseHistoryCard onClick={() => openModal('history')} />
            <InventoryExplorerCard onClick={() => openModal('inventory')} />
            
            {/* AI Insights Card */}
            <Card className="glass-card floating-card-hover neon-border xl:col-span-1">
              <CardHeader>
                <CardTitle className="text-accent flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Karen's Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-gradient-surface border border-border/20">
                    <p className="text-sm text-card-foreground">
                      "Your milk expires tomorrow. I've added it to your shopping list!"
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-gradient-surface border border-border/20">
                    <p className="text-sm text-card-foreground">
                      "Based on your 5-year-old's preferences, I suggest organic apples this week."
                    </p>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full neon-border"
                    onClick={() => setIsChatOpen(true)}
                  >
                    Chat with Karen
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      {/* Floating Karen Chatbot */}
      {!isChatOpen && (
        <Button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-6 left-6 w-14 h-14 rounded-full bg-gradient-accent shadow-glow-accent animate-pulse-glow z-50"
          size="icon"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      )}

      {/* Modals */}
      <DetailModal 
        isOpen={modalData.type !== null} 
        onClose={closeModal} 
        type={modalData.type}
        data={modalData.data}
      />
      
      <KarenChatbot 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
      />
      
      <SmartCart />
    </div>
  );
};