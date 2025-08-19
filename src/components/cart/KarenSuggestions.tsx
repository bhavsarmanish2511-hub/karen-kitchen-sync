import { useState } from "react";
import { Sparkles, RefreshCw, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

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

interface KarenSuggestionsProps {
  suggestions: SuggestionItem[];
  replacements: ReplacementSuggestion[];
  onAddSuggestion: (suggestion: SuggestionItem) => void;
  onReplaceItem: (replacement: ReplacementSuggestion) => void;
  onDismissReplacement: (originalId: string) => void;
}

export const KarenSuggestions = ({ 
  suggestions, 
  replacements, 
  onAddSuggestion, 
  onReplaceItem,
  onDismissReplacement 
}: KarenSuggestionsProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showReplacements, setShowReplacements] = useState(true);

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'text-destructive';
      case 'medium': return 'text-warning';
      default: return 'text-accent';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'missing': return '🚨';
      case 'replacement': return '🔄';
      case 'upgrade': return '⬆️';
      case 'health': return '💊';
      case 'seasonal': return '🌟';
      default: return '💡';
    }
  };

  return (
    <div className="border-t border-border/20 pt-4 space-y-3">
      {/* Karen's AI Presence */}
      <div className="flex items-center gap-2 p-2 rounded-lg bg-gradient-primary/10 border border-primary/30">
        <div className="w-8 h-8 rounded-full bg-gradient-accent flex items-center justify-center animate-pulse-glow">
          <Sparkles className="w-4 h-4 text-primary-foreground" />
        </div>
        <div>
          <p className="text-xs font-medium text-card-foreground">Karen AI Assistant</p>
          <p className="text-xs text-muted-foreground">Analyzing your needs...</p>
        </div>
      </div>

      {/* Quick Replacements */}
      {replacements.length > 0 && showReplacements && (
        <div className="space-y-2 animate-fade-in">
          <h4 className="text-sm font-medium text-accent flex items-center gap-2">
            <RefreshCw className="w-4 h-4" />
            Smart Replacements
          </h4>
          {replacements.map((replacement) => (
            <Card key={replacement.originalId} className="p-3 bg-gradient-primary/5 border border-primary/20 animate-scale-in">
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">
                  Replace <span className="text-card-foreground font-medium">{replacement.originalName}</span> with:
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{replacement.replacement.icon}</span>
                    <div>
                      <p className="text-sm font-medium text-card-foreground">{replacement.replacement.name}</p>
                      <p className="text-xs text-accent">${replacement.replacement.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="outline"
                      className="neon-border text-xs px-2"
                      onClick={() => onReplaceItem(replacement)}
                    >
                      Replace
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-xs px-2"
                      onClick={() => onDismissReplacement(replacement.originalId)}
                    >
                      Keep
                    </Button>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">{replacement.reason}</p>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Regular Suggestions */}
      <Button
        variant="ghost"
        className="w-full justify-between text-accent hover:text-accent-foreground"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span className="flex items-center gap-2">
          <Sparkles className="w-4 h-4" />
          Karen's Suggestions
        </span>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-xs">
            {suggestions.length}
          </Badge>
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </Button>

      {isExpanded && (
        <div className="space-y-2 animate-fade-in">
          {suggestions.map((suggestion) => (
            <div key={suggestion.id} className="p-3 rounded-lg bg-gradient-primary/10 border border-primary/20 animate-scale-in">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg animate-pulse-glow">{suggestion.icon}</span>
                  <span className="text-xs">{getTypeIcon(suggestion.type)}</span>
                  <div>
                    <p className="text-sm font-medium text-card-foreground">{suggestion.name}</p>
                    <p className="text-xs text-muted-foreground">{suggestion.reason}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-xs text-accent font-medium">${suggestion.price.toFixed(2)}</p>
                      <Badge variant="outline" className={`text-xs ${getUrgencyColor(suggestion.urgency)}`}>
                        {suggestion.urgency}
                      </Badge>
                    </div>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="neon-border text-xs hover:bg-gradient-accent/20"
                  onClick={() => onAddSuggestion(suggestion)}
                >
                  Add
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};