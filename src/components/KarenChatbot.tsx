import { useState } from "react";
import { X, Send, Bot, User } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface KarenChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

const initialMessages: Message[] = [
  {
    id: '1',
    type: 'assistant',
    content: "Hello Hanna! I'm Karen, your AI grocery assistant. I've been monitoring your smart home devices and I notice your milk expires tomorrow. Shall I add it to your shopping list?",
    timestamp: new Date()
  }
];

export const KarenChatbot = ({ isOpen, onClose }: KarenChatbotProps) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "I've analyzed your current inventory and added milk to your shopping list. Based on your family's consumption pattern, I recommend getting 2 liters this time.",
        "I notice your 5-year-old loves organic apples. The local Fresh Mart has them on sale this week. Would you like me to add them to your list?",
        "Your smart kitchen sensors show you're running low on rice. You typically buy 5kg bags - shall I add that to your next shopping trip?",
        "I've optimized your shopping route! Fresh Mart → Corner Store → SuperMart will save you 15 minutes based on current traffic.",
        "Your grocery budget is tracking well this month. You've spent $287 out of your $450 budget, leaving room for some special treats!"
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: randomResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[80vh] glass-card border-accent/30 p-0">
        <DialogHeader className="border-b border-border/30 p-4">
          <DialogTitle className="text-xl holographic-text flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-accent flex items-center justify-center animate-pulse-glow">
              <Bot className="w-4 h-4 text-accent-foreground" />
            </div>
            Karen AI Assistant
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
        
        <div className="flex flex-col h-[60vh]">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start gap-3 ${
                    message.type === 'user' ? 'flex-row-reverse' : ''
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    message.type === 'assistant' 
                      ? 'bg-gradient-accent' 
                      : 'bg-gradient-primary'
                  }`}>
                    {message.type === 'assistant' ? (
                      <Bot className="w-4 h-4 text-accent-foreground" />
                    ) : (
                      <User className="w-4 h-4 text-primary-foreground" />
                    )}
                  </div>
                  
                  <div className={`max-w-[80%] p-3 rounded-lg ${
                    message.type === 'assistant'
                      ? 'bg-gradient-surface border border-border/20'
                      : 'bg-gradient-primary text-primary-foreground'
                  }`}>
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          
          <div className="border-t border-border/30 p-4">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask Karen about your groceries..."
                className="flex-1 bg-gradient-surface border-border/30"
              />
              <Button 
                onClick={handleSendMessage}
                size="icon"
                className="bg-gradient-accent hover:opacity-80"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};