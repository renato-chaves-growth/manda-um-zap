import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Calculator, Calendar, Wallet, Instagram, ChevronRight, Info, Crown, Zap, ArrowRight, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

// Avatar imports
import claraAvatar from "@/assets/avatars/ze-atendimento-v3.webp";
import otavioAvatar from "@/assets/avatars/chico-orcamento-v3.webp";
import lucasAvatar from "@/assets/avatars/neto-agenda-v3.webp";
import helenaAvatar from "@/assets/avatars/dona-conta-v3.webp";
import mayaAvatar from "@/assets/avatars/zeca-instagram-v3.webp";

const individualAgents = [
  {
    id: "clara",
    name: "Clara",
    role: "Atendimento no WhatsApp",
    description: "Responde clientes, entende pedidos e filtra curiosos.",
    icon: MessageCircle,
    avatar: claraAvatar,
  },
  {
    id: "otavio",
    name: "Otávio",
    role: "Orçamentos com fornecedores",
    description: "Calcula materiais, perdas e gera orçamento profissional.",
    icon: Calculator,
    avatar: otavioAvatar,
  },
  {
    id: "lucas",
    name: "Lucas",
    role: "Agenda e visitas técnicas",
    description: "Marca visitas, confirma e envia lembretes automáticos.",
    icon: Calendar,
    avatar: lucasAvatar,
  },
  {
    id: "helena",
    name: "Helena",
    role: "Financeiro e lucro real",
    description: "Controla entradas, parcelas e mostra se deu lucro.",
    icon: Wallet,
    avatar: helenaAvatar,
  },
  {
    id: "maya",
    name: "Maya",
    role: "Postagens automáticas",
    description: "Cria legendas, sugere stories e ajuda na divulgação.",
    icon: Instagram,
    avatar: mayaAvatar,
  },
];

const journeySteps = [
  { step: 1, name: "Clara", role: "Atendimento", avatar: claraAvatar },
  { step: 2, name: "Otávio", role: "Orçamento", avatar: otavioAvatar },
  { step: 3, name: "Helena", role: "Lucro", avatar: helenaAvatar },
  { step: 4, name: "Clara", role: "Envio", avatar: claraAvatar },
  { step: 5, name: "Lucas", role: "Agenda", avatar: lucasAvatar },
];

type ProductView = "individual" | "integrated";

export function ProductsComparisonSection() {
  const [activeView, setActiveView] = useState<ProductView>("individual");

  return (
    <section className="py-10 md:py-14 bg-background">
      <div className="container">
        {/* Toggle Buttons - clean style */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex items-center gap-3 p-1.5 rounded-2xl bg-muted/30 border border-border/30">
            <motion.button
              onClick={() => setActiveView("individual")}
              className={`relative flex items-center gap-2.5 px-5 py-3 rounded-xl font-medium text-sm transition-all duration-300 ${
                activeView === "individual"
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {activeView === "individual" && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-white dark:bg-card rounded-xl shadow-lg border border-primary/20"
                  style={{
                    boxShadow: "0 4px 20px -4px hsl(217 91% 60% / 0.15)",
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <div className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
                  activeView === "individual" ? "bg-primary" : "bg-muted-foreground/40"
                }`} />
                <Users className="w-4 h-4" />
                Agentes Individuais
              </span>
            </motion.button>

            <span className="text-muted-foreground/50 text-sm font-medium">ou</span>

            <motion.button
              onClick={() => setActiveView("integrated")}
              className={`relative flex items-center gap-2.5 px-5 py-3 rounded-xl font-medium text-sm transition-all duration-300 ${
                activeView === "integrated"
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {activeView === "integrated" && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-white dark:bg-card rounded-xl shadow-lg border border-primary/20"
                  style={{
                    boxShadow: "0 4px 20px -4px hsl(217 91% 60% / 0.15)",
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Jornada Integrada
              </span>
            </motion.button>
          </div>
        </div>

        {/* Content Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* LEFT CARD - Individual Agents */}
          <motion.div 
            className={`relative bg-white dark:bg-card rounded-3xl brutalist-outline p-8 md:p-10 transition-all duration-500 cursor-pointer ${
              activeView === "individual" 
                ? "shadow-xl shadow-primary/5" 
                : "opacity-60 hover:opacity-80"
            }`}
            onClick={() => setActiveView("individual")}
            animate={{
              scale: activeView === "individual" ? 1 : 0.98,
            }}
            transition={{ duration: 0.3 }}
          >
            {/* Background blob - subtle primary */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-primary/3 rounded-full blur-[80px] pointer-events-none transition-opacity duration-500 ${
              activeView === "individual" ? "opacity-100" : "opacity-30"
            }`} />
            
            <div className="relative z-10">
              {/* Header */}
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-medium text-foreground mb-2 tracking-tight">
                  Agentes <span className="text-gradient font-semibold">Individuais</span>
                </h2>
                <p className="text-muted-foreground">
                  Use só o que você precisa, quando quiser.
                </p>
              </div>

              {/* Agent cards - compact grid */}
              <AnimatePresence>
                {activeView === "individual" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  >
                    <div className="space-y-3 mb-6">
                      {individualAgents.map((agent, index) => (
                        <motion.div
                          key={agent.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <Link
                            to={`/agente/${agent.id}`}
                            className="group relative flex items-center gap-3 bg-muted/30 hover:bg-muted/50 rounded-xl p-3 border border-border/30 hover:border-primary/30 transition-all duration-300 hover:shadow-sm"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div className="relative flex-shrink-0 z-10">
                              <div className="absolute -inset-0.5 bg-primary rounded-full opacity-0 group-hover:opacity-30 blur-sm transition-all duration-300" />
                              <div className="relative w-10 h-10 rounded-full border-2 border-white shadow-sm overflow-hidden bg-white ring-1 ring-primary/10 group-hover:ring-primary/30 transition-colors">
                                <img
                                  src={agent.avatar}
                                  alt={agent.name}
                                  className="w-full h-full object-cover object-top scale-125"
                                />
                              </div>
                            </div>

                            <div className="flex-1 min-w-0 z-10">
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors duration-300">
                                  {agent.name}
                                </h3>
                                <div className="w-5 h-5 rounded-md bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                                  <agent.icon className="w-3 h-3 text-primary" />
                                </div>
                              </div>
                              <p className="text-xs text-muted-foreground truncate">{agent.role}</p>
                            </div>

                            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300 flex-shrink-0 z-10" />
                          </Link>
                        </motion.div>
                      ))}
                    </div>

                    <div className="flex items-start gap-2 p-3 rounded-lg bg-muted/30 border border-border/30 mb-6">
                      <Info className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-muted-foreground">
                        <strong className="text-foreground">Funcionam de forma independente.</strong>{" "}
                        Contrate apenas um ou combine vários.
                      </p>
                    </div>

                    <Link to="/agentes" onClick={(e) => e.stopPropagation()}>
                      <Button 
                        variant="outline" 
                        className="gap-2 group/btn hover:border-primary hover:bg-primary/5 transition-all duration-300"
                      >
                        Ver todos os agentes
                        <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Collapsed state preview */}
              {activeView !== "individual" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2"
                >
                  <div className="flex -space-x-2">
                    {individualAgents.slice(0, 4).map((agent) => (
                      <div key={agent.id} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-white shadow-sm">
                        <img src={agent.avatar} alt={agent.name} className="w-full h-full object-cover object-top scale-125" />
                      </div>
                    ))}
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground">
                      +1
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">Clique para expandir</span>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* RIGHT CARD - Integrated Journey - Using primary-dark */}
          <motion.div 
            className={`relative bg-primary-dark rounded-3xl brutalist-outline p-8 md:p-10 overflow-hidden cursor-pointer transition-all duration-500 ${
              activeView === "integrated" 
                ? "shadow-xl" 
                : "opacity-60 hover:opacity-80"
            }`}
            onClick={() => setActiveView("integrated")}
            animate={{
              scale: activeView === "integrated" ? 1 : 0.98,
            }}
            transition={{ duration: 0.3 }}
          >
            {/* Background effects - primary colors only */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
              <div className={`absolute top-1/4 right-1/4 w-48 h-48 bg-primary/15 rounded-full blur-[60px] transition-opacity duration-500 ${
                activeView === "integrated" ? "opacity-100" : "opacity-30"
              }`} />
              <div className={`absolute bottom-1/4 left-1/4 w-48 h-48 bg-primary/10 rounded-full blur-[60px] transition-opacity duration-500 ${
                activeView === "integrated" ? "opacity-100" : "opacity-30"
              }`} />
            </div>

            <div className="relative z-10">
              {/* Header */}
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/20 border border-primary/30 mb-4">
                  <Crown className="w-3.5 h-3.5 text-primary" />
                  <span className="text-xs font-semibold text-primary-foreground">Jornada Integrada</span>
                </div>
                
                <h2 className="text-2xl md:text-3xl font-medium text-primary-dark-foreground mb-2 leading-tight tracking-tight">
                  Do WhatsApp ao lucro —{" "}
                  <span className="text-gradient-light font-semibold">automaticamente</span>
                </h2>
                <p className="text-primary-dark-foreground/70">
                  Ative o modo profissional e deixe os agentes trabalharem juntos.
                </p>
              </div>

              <AnimatePresence>
                {activeView === "integrated" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  >
                    {/* Journey flow - unified primary color */}
                    <div className="relative mb-8">
                      <div className="absolute top-7 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/30 via-primary to-primary/30 rounded-full" />
                      
                      <div className="flex justify-between relative z-10">
                        {journeySteps.map((step, index) => (
                          <motion.div 
                            key={step.step} 
                            className="flex flex-col items-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.08 }}
                          >
                            <div 
                              className="relative mb-2"
                              style={{ boxShadow: "0 0 20px hsl(217 91% 60% / 0.3)" }}
                            >
                              <div className="absolute -inset-0.5 bg-primary rounded-full opacity-50 blur-sm" />
                              <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full border-3 border-white overflow-hidden bg-white">
                                <img
                                  src={step.avatar}
                                  alt={step.name}
                                  className="w-full h-full object-cover object-top scale-125"
                                />
                              </div>
                              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center border-2 border-white">
                                <span className="text-[9px] font-bold text-primary-foreground">{step.step}</span>
                              </div>
                            </div>
                            
                            <span className="text-xs font-medium text-primary-dark-foreground">{step.name}</span>
                            <span className="text-[10px] text-primary-dark-foreground/50">{step.role}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-primary-dark-foreground/60 leading-relaxed mb-8">
                      Cliente entra no WhatsApp → orçamento calculado → margem aplicada → proposta enviada → visita agendada.{" "}
                      <span className="text-primary-dark-foreground font-medium">Tudo automático.</span>
                    </p>

                    {/* Plan label + CTA */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 border border-primary/20">
                        <Zap className="w-4 h-4 text-primary" />
                        <span className="text-sm text-primary-dark-foreground font-medium">
                          Plano <span className="text-primary font-bold">Jornada Integrada</span>
                        </span>
                      </div>
                      
                      <Link to="/precos" onClick={(e) => e.stopPropagation()}>
                        <Button 
                          className="gap-2 shadow-lg hover:shadow-primary/25 transition-all duration-300 group/btn"
                        >
                          Ver planos e preços
                          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Collapsed state preview */}
              {activeView !== "integrated" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-3"
                >
                  <div className="flex -space-x-2">
                    {journeySteps.slice(0, 4).map((step) => (
                      <div key={step.step} className="w-8 h-8 rounded-full border-2 border-white/50 overflow-hidden bg-white">
                        <img src={step.avatar} alt={step.name} className="w-full h-full object-cover object-top scale-125" />
                      </div>
                    ))}
                  </div>
                  <span className="text-sm text-primary-dark-foreground/60">Clique para expandir</span>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
