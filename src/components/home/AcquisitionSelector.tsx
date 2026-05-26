import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Users, 
  Zap, 
  ChevronRight, 
  CheckCircle2, 
  Sparkles,
  MessageCircle,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

const WHATSAPP_LINK = "https://wa.me/5500000000000?text=Olá! Quero conhecer o MandaUmZap";

interface AcquisitionOption {
  id: "individual" | "integrated";
  icon: React.ElementType;
  title: string;
  subtitle: string;
  price: string;
  priceNote: string;
  features: string[];
  cta: string;
  ctaLink: string;
  highlight?: boolean;
}

const acquisitionOptions: AcquisitionOption[] = [
  {
    id: "individual",
    icon: Users,
    title: "Agentes Individuais",
    subtitle: "Monte sua equipe do seu jeito",
    price: "A partir de R$ 49",
    priceNote: "/mês por agente",
    features: [
      "Escolha quantos agentes precisar",
      "Cada agente resolve uma dor específica",
      "Ative ou pause quando quiser",
      "Ideal para começar pequeno",
    ],
    cta: "Conhecer agentes",
    ctaLink: "/agentes",
  },
  {
    id: "integrated",
    icon: Zap,
    title: "Jornada Integrada",
    subtitle: "Automação completa do cliente ao lucro",
    price: "R$ 129",
    priceNote: "/mês · tudo incluso",
    features: [
      "Todos os 5 agentes trabalhando juntos",
      "Fluxo automatizado de ponta a ponta",
      "Do primeiro contato até o pagamento",
      "Modo profissional para escalar",
    ],
    cta: "Quero automatizar tudo",
    ctaLink: "/checkout?plan=integrated",
    highlight: true,
  },
];

export function AcquisitionSelector() {
  const [expanded, setExpanded] = useState(false);
  const [selectedOption, setSelectedOption] = useState<"individual" | "integrated" | null>(null);

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Initial collapsed state - Chat bubble style */}
      <AnimatePresence mode="wait">
        {!expanded ? (
          <motion.div
            key="collapsed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            {/* Floating bot indicator */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="absolute -top-3 left-1/2 -translate-x-1/2 z-10"
            >
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-lg border border-border">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm font-medium text-foreground">Assistente online</span>
              </div>
            </motion.div>

            {/* Chat bubble */}
            <motion.button
              onClick={() => setExpanded(true)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full mt-4 p-6 md:p-8 rounded-3xl bg-white shadow-2xl shadow-primary/20 border-2 border-primary/20 hover:border-primary/40 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-violet-500 flex items-center justify-center shadow-lg">
                    <Sparkles className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="text-lg md:text-xl font-semibold text-foreground">
                      Como você quer usar o MandaUmZap?
                    </p>
                    <p className="text-muted-foreground">
                      Clique para descobrir o modelo ideal para você
                    </p>
                  </div>
                </div>
                <motion.div 
                  className="hidden sm:flex items-center gap-2 text-primary font-medium"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <span>Escolher</span>
                  <ChevronRight className="w-5 h-5" />
                </motion.div>
              </div>
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="expanded"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, type: "spring", stiffness: 100 }}
            className="relative"
          >
            {/* Expanded container */}
            <div className="rounded-3xl bg-white shadow-2xl shadow-primary/25 border border-border overflow-hidden">
              {/* Header */}
              <div className="p-6 bg-gradient-to-r from-primary to-violet-500 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Escolha seu modelo</h3>
                      <p className="text-white/80 text-sm">Qual combina com seu momento?</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setExpanded(false);
                      setSelectedOption(null);
                    }}
                    className="text-white/60 hover:text-white transition-colors text-sm"
                  >
                    Fechar
                  </button>
                </div>
              </div>

              {/* Options grid */}
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-4">
                  {acquisitionOptions.map((option, index) => {
                    const Icon = option.icon;
                    const isSelected = selectedOption === option.id;
                    
                    return (
                      <motion.div
                        key={option.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 + 0.2 }}
                      >
                        <motion.button
                          onClick={() => setSelectedOption(option.id)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`w-full text-left p-5 rounded-2xl border-2 transition-all ${
                            isSelected
                              ? option.highlight
                                ? "border-amber-400 bg-amber-50"
                                : "border-primary bg-primary/5"
                              : "border-border hover:border-primary/40 bg-card"
                          }`}
                        >
                          <div className="flex items-start gap-4">
                            <div
                              className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                                option.highlight
                                  ? "bg-gradient-to-br from-amber-400 to-amber-500"
                                  : "bg-gradient-to-br from-primary to-violet-500"
                              }`}
                            >
                              <Icon className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <h4 className="font-semibold text-foreground">{option.title}</h4>
                                {option.highlight && (
                                  <span className="px-2 py-0.5 rounded-full bg-amber-400 text-amber-900 text-xs font-medium">
                                    POPULAR
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">
                                {option.subtitle}
                              </p>
                              <div className="mt-3">
                                <span className="text-xl font-bold text-foreground">
                                  {option.price}
                                </span>
                                <span className="text-sm text-muted-foreground ml-1">
                                  {option.priceNote}
                                </span>
                              </div>
                            </div>
                            {isSelected && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="shrink-0"
                              >
                                <CheckCircle2 className={`w-6 h-6 ${option.highlight ? "text-amber-500" : "text-primary"}`} />
                              </motion.div>
                            )}
                          </div>
                        </motion.button>

                        {/* Expanded details */}
                        <AnimatePresence>
                          {isSelected && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="pt-4 px-2 space-y-3">
                                {option.features.map((feature, i) => (
                                  <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="flex items-center gap-2 text-sm"
                                  >
                                    <CheckCircle2 className={`w-4 h-4 shrink-0 ${option.highlight ? "text-amber-500" : "text-primary"}`} />
                                    <span className="text-foreground">{feature}</span>
                                  </motion.div>
                                ))}
                                
                                <div className="pt-3 flex flex-col sm:flex-row gap-2">
                                  <Link to={option.ctaLink} className="flex-1">
                                    <Button
                                      className={`w-full gap-2 ${
                                        option.highlight
                                          ? "bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-amber-950"
                                          : ""
                                      }`}
                                    >
                                      {option.cta}
                                      <ArrowRight className="w-4 h-4" />
                                    </Button>
                                  </Link>
                                  <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                                    <Button variant="outline" className="w-full sm:w-auto gap-2">
                                      <MessageCircle className="w-4 h-4" />
                                      Tirar dúvidas
                                    </Button>
                                  </a>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Quick comparison */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-6 pt-6 border-t border-border"
                >
                  <p className="text-center text-sm text-muted-foreground">
                    💡 <span className="font-medium">Dica:</span> Comece com agentes individuais e evolua para a jornada integrada quando precisar escalar.
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
