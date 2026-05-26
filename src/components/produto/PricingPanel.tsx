import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Check, ShoppingCart, Sparkles, ArrowRight, Package, Users } from "lucide-react";
import { motion } from "framer-motion";

interface Agent {
  id: string;
  shortName: string;
  avatar: string;
}

interface PricingPanelProps {
  agentName: string;
  individualPrice: number;
  allAgentsPrice: number;
  allAgents: Agent[];
  selectedAgentId: string;
  onSelectIndividual: () => void;
  onSelectAll: () => void;
  selectedOption: 'individual' | 'all';
}

export function PricingPanel({
  agentName,
  individualPrice,
  allAgentsPrice,
  allAgents,
  selectedAgentId,
  onSelectIndividual,
  onSelectAll,
  selectedOption,
}: PricingPanelProps) {
  const savings = (individualPrice * allAgents.length) - allAgentsPrice;

  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="bg-card rounded-2xl border border-border shadow-lg overflow-hidden"
    >
      {/* Header */}
      <div className="p-5 bg-muted/30 border-b border-border">
        <p className="text-sm text-muted-foreground mb-1">Escolha seu plano</p>
        <h3 className="text-lg font-semibold text-foreground">Como você quer começar?</h3>
      </div>

      <div className="p-5 space-y-4">
        {/* Individual option */}
        <div 
          onClick={onSelectIndividual}
          className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
            selectedOption === 'individual'
              ? 'border-primary bg-primary/5'
              : 'border-border hover:border-primary/50'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selectedOption === 'individual' ? 'border-primary bg-primary' : 'border-muted-foreground/30'
                }`}>
                  {selectedOption === 'individual' && <Check className="w-3 h-3 text-white" />}
                </div>
                <span className="font-semibold text-foreground">Só {agentName}</span>
              </div>
              <p className="text-sm text-muted-foreground ml-7">Comece com 1 agente</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-foreground">R$ {individualPrice}</p>
              <p className="text-xs text-muted-foreground">/mês</p>
            </div>
          </div>
        </div>

        {/* All agents option */}
        <div 
          onClick={onSelectAll}
          className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
            selectedOption === 'all'
              ? 'border-primary bg-primary/5'
              : 'border-border hover:border-primary/50'
          }`}
        >
          {/* Best value badge */}
          <Badge className="absolute -top-2.5 right-3 bg-gradient-to-r from-primary to-violet-500 text-white border-0 shadow-md">
            <Sparkles className="w-3 h-3 mr-1" />
            Melhor custo-benefício
          </Badge>

          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selectedOption === 'all' ? 'border-primary bg-primary' : 'border-muted-foreground/30'
                }`}>
                  {selectedOption === 'all' && <Check className="w-3 h-3 text-white" />}
                </div>
                <span className="font-semibold text-foreground">Todos os Agentes</span>
              </div>
              <p className="text-sm text-muted-foreground ml-7">Equipe completa de IA</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground line-through">R$ {individualPrice * allAgents.length}</p>
              <p className="text-2xl font-bold text-gradient">R$ {allAgentsPrice}</p>
              <p className="text-xs text-muted-foreground">/mês</p>
            </div>
          </div>

          {/* Agents preview */}
          <div className="mt-3 ml-7">
            <div className="flex items-center">
              <div className="flex -space-x-2">
                {allAgents.slice(0, 5).map((agent) => (
                  <div 
                    key={agent.id}
                    className={`w-8 h-8 rounded-full overflow-hidden border-2 border-background ${
                      agent.id === selectedAgentId ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''
                    }`}
                  >
                    <img src={agent.avatar} alt={agent.shortName} className="w-full h-full object-cover object-top" />
                  </div>
                ))}
              </div>
              <span className="ml-3 text-xs text-green-600 font-medium">
                Economia de R$ {savings}/mês
              </span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Benefits */}
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
            <span>Sem contrato, cancele quando quiser</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
            <span>Configuração em minutos</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
            <span>Suporte via WhatsApp</span>
          </div>
        </div>

        {/* CTA */}
        <Link to="/cadastro">
          <Button size="lg" className="w-full gap-2 h-12 text-base">
            <ShoppingCart className="w-5 h-5" />
            Quero começar
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>

        {/* Help link */}
        <p className="text-center text-sm text-muted-foreground">
          Precisa de ajuda? <a href="#" className="text-primary font-medium hover:underline">Fale com a gente</a>
        </p>
      </div>
    </motion.div>
  );
}
