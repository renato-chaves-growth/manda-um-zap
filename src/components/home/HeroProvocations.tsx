import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Clock, Calculator, Calendar, Wallet, Users } from "lucide-react";

interface Provocation {
  id: number;
  pain: string;
  solution: string;
  icon: React.ElementType;
}

const provocations: Provocation[] = [
  {
    id: 1,
    pain: "Atendente por R$2.000/mês",
    solution: "R$29 e nunca tira férias",
    icon: Users,
  },
  {
    id: 2,
    pain: "Responder WhatsApp até meia-noite",
    solution: "Atendimento 24/7 automático",
    icon: Clock,
  },
  {
    id: 3,
    pain: "Perder cliente no domingo",
    solution: "Nunca mais perder venda",
    icon: MessageSquare,
  },
  {
    id: 4,
    pain: "Calcular orçamento na oficina",
    solution: "O cliente já recebe na hora",
    icon: Calculator,
  },
  {
    id: 5,
    pain: "Agenda de papel e post-it",
    solution: "Agendamento direto no WhatsApp",
    icon: Calendar,
  },
  {
    id: 6,
    pain: "Esquecer de cobrar o cliente",
    solution: "Cobrança automática sem constrangimento",
    icon: Wallet,
  },
  {
    id: 7,
    pain: "Ligar pro fornecedor pra pedir preço",
    solution: "O agente pede pra você",
    icon: Users,
  },
];

export function HeroProvocations() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % provocations.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const current = provocations[currentIndex];
  const Icon = current.icon;

  return (
    <div className="w-full">
      {/* Desktop version - inline comparison */}
      <div className="hidden md:block">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="flex items-center justify-center lg:justify-start gap-3 text-base"
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-destructive/10 border border-destructive/20">
              <span className="text-destructive line-through font-medium">{current.pain}</span>
            </div>
            <span className="text-muted-foreground font-medium">ou</span>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-whatsapp/10 border border-whatsapp/30">
              <Icon className="w-4 h-4 text-whatsapp-teal" />
              <span className="text-whatsapp-teal font-semibold">{current.solution}</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Mobile version - stacked cards */}
      <div className="md:hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-border/50 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-whatsapp/10 flex items-center justify-center">
                <Icon className="w-5 h-5 text-whatsapp-teal" />
              </div>
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Por que mudar?
              </span>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-destructive/60" />
                <span className="text-sm text-destructive line-through">{current.pain}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-whatsapp" />
                <span className="text-sm text-whatsapp-teal font-semibold">{current.solution}</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Progress dots */}
        <div className="flex justify-center gap-1.5 mt-3">
          {provocations.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? "bg-whatsapp w-6" 
                  : "bg-border hover:bg-muted-foreground/30"
              }`}
              aria-label={`Provocação ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* WhatsApp emphasis tagline */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center lg:text-left text-sm text-muted-foreground mt-4 flex items-center justify-center lg:justify-start gap-2"
      >
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-whatsapp/10 text-whatsapp-teal font-medium text-xs">
          100% WhatsApp
        </span>
        <span>Sem app. Sem site. Só conversa.</span>
      </motion.p>
    </div>
  );
}
