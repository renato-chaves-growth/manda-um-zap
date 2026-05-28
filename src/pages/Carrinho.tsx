import { useState, useMemo } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Check, ArrowRight, Star, Shield, Users, Zap, Clock,
  MessageCircle, Calculator, Calendar, Wallet, Instagram,
  X, Plus, ChevronLeft,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import claraAvatar      from "@/assets/avatars/ze-atendimento-v3.webp";
import otavioAvatar     from "@/assets/avatars/chico-orcamento-v3.webp";
import lucasAvatar      from "@/assets/avatars/neto-agenda-v3.webp";
import helenaAvatar     from "@/assets/avatars/dona-conta-v3.webp";
import mayaAvatar       from "@/assets/avatars/zeca-instagram-v3.webp";

// ─── Preços ───────────────────────────────────────────────────────────────────

const PRICE_MONTHLY  = 29;           // R$/agente/mês
const ANNUAL_DISC    = 0.20;         // 20% de desconto no anual
const PRICE_ANNUAL_MONTHLY = PRICE_MONTHLY * (1 - ANNUAL_DISC); // R$23,20/agente/mês

// ─── Dados dos agentes ────────────────────────────────────────────────────────

interface AgentMeta {
  id:          string;
  name:        string;
  role:        string;
  avatar:      string;
  icon:        React.ElementType;
  color:       string;
  bgColor:     string;
  description: string;
}

const ALL_AGENTS: AgentMeta[] = [
  {
    id:          "clara",
    name:        "Clara",
    role:        "Atendimento",
    avatar:      claraAvatar,
    icon:        MessageCircle,
    color:       "#25D366",
    bgColor:     "bg-green-50",
    description: "Responde clientes 24h no WhatsApp e qualifica leads.",
  },
  {
    id:          "otavio",
    name:        "Otávio",
    role:        "Orçamento",
    avatar:      otavioAvatar,
    icon:        Calculator,
    color:       "#8B5CF6",
    bgColor:     "bg-violet-50",
    description: "Gera orçamentos detalhados com sua margem em minutos.",
  },
  {
    id:          "lucas",
    name:        "Lucas",
    role:        "Agendamento",
    avatar:      lucasAvatar,
    icon:        Calendar,
    color:       "#3B82F6",
    bgColor:     "bg-blue-50",
    description: "Agenda visitas e confirma presença automaticamente.",
  },
  {
    id:          "helena",
    name:        "Helena",
    role:        "Financeiro",
    avatar:      helenaAvatar,
    icon:        Wallet,
    color:       "#F59E0B",
    bgColor:     "bg-amber-50",
    description: "Controla cobranças e acompanha pagamentos.",
  },
  {
    id:          "maya",
    name:        "Maya",
    role:        "Divulgação",
    avatar:      mayaAvatar,
    icon:        Instagram,
    color:       "#F97316",
    bgColor:     "bg-orange-50",
    description: "Cria conteúdo para Instagram com seus projetos.",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const fmt = (n: number) =>
  n.toFixed(2).replace(".", ",");

// ─── Componente ───────────────────────────────────────────────────────────────

const Carrinho = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Lê agentes da URL; padrão = ["clara"] se nada passado
  const initialIds = useMemo(() => {
    const param = searchParams.get("agentes");
    if (!param) return ["clara"];
    const ids = param.split(",").filter((id) => ALL_AGENTS.some((a) => a.id === id));
    return ids.length > 0 ? ids : ["clara"];
  }, [searchParams]);

  const [selectedIds, setSelectedIds] = useState<string[]>(initialIds);
  const [isAnnual, setIsAnnual]       = useState(false);

  // Agentes no carrinho e disponíveis para upsell
  const cartAgents   = ALL_AGENTS.filter((a) => selectedIds.includes(a.id));
  const upsellAgents = ALL_AGENTS.filter((a) => !selectedIds.includes(a.id));

  // Cálculos de preço
  const monthlyTotal      = selectedIds.length * PRICE_MONTHLY;
  const annualMonthlyTotal = selectedIds.length * PRICE_ANNUAL_MONTHLY;
  const annualBilledTotal  = annualMonthlyTotal * 12;
  const annualSavings      = monthlyTotal * 12 - annualBilledTotal;

  const displayMonthly = isAnnual ? annualMonthlyTotal : monthlyTotal;

  const removeAgent = (id: string) => {
    if (selectedIds.length <= 1) return; // pelo menos 1 agente
    setSelectedIds((prev) => prev.filter((x) => x !== id));
  };

  const addAgent = (id: string) => {
    setSelectedIds((prev) => [...prev, id]);
  };

  const handleContinue = () => {
    navigate(`/checkout?agentes=${selectedIds.join(",")}&ciclo=${isAnnual ? "annual" : "monthly"}`);
  };

  return (
    <main className="flex-1 pt-24 pb-20 bg-muted/30">
      <div className="container">
        <div className="max-w-5xl mx-auto">

          {/* Breadcrumb */}
          <Link
            to="/agentes"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Voltar para agentes
          </Link>

          <div className="grid lg:grid-cols-5 gap-8">

            {/* ── Coluna esquerda ── */}
            <div className="lg:col-span-3 space-y-6">

              {/* Agentes no carrinho */}
              <div>
                <h2 className="text-lg font-semibold text-foreground mb-3">
                  Seus agentes selecionados
                </h2>

                <div className="space-y-2">
                  <AnimatePresence>
                    {cartAgents.map((agent) => {
                      const Icon = agent.icon;
                      return (
                        <motion.div
                          key={agent.id}
                          initial={{ opacity: 0, x: -16 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -16, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="flex items-center gap-4 p-4 rounded-2xl border border-border bg-card"
                        >
                          {/* Avatar */}
                          <div className="relative shrink-0">
                            <div className="w-14 h-14 rounded-xl overflow-hidden border border-border">
                              <img
                                src={agent.avatar}
                                alt={agent.name}
                                className="w-full h-full object-cover object-top"
                              />
                            </div>
                            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-background" />
                          </div>

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <Icon className="w-4 h-4 shrink-0" style={{ color: agent.color }} />
                              <span className="font-semibold" style={{ color: agent.color }}>
                                {agent.name}
                              </span>
                              <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                                {agent.role}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground">{agent.description}</p>
                          </div>

                          {/* Preço + remover */}
                          <div className="shrink-0 text-right">
                            <p className="text-sm font-semibold text-foreground">
                              R$&nbsp;{isAnnual ? fmt(PRICE_ANNUAL_MONTHLY) : "29,00"}
                              <span className="text-xs font-normal text-muted-foreground">/mês</span>
                            </p>
                            <button
                              onClick={() => removeAgent(agent.id)}
                              disabled={selectedIds.length <= 1}
                              className="mt-1 text-muted-foreground hover:text-destructive transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                              aria-label={`Remover ${agent.name}`}
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>

                {/* Subtotal linha */}
                <div className="flex justify-between items-center mt-3 px-4 py-2 rounded-xl bg-muted/50 text-sm">
                  <span className="text-muted-foreground">
                    {selectedIds.length} agente{selectedIds.length !== 1 ? "s" : ""}
                    {isAnnual ? " · cobrança anual" : " · cobrança mensal"}
                  </span>
                  <span className="font-semibold text-foreground">
                    R$&nbsp;{fmt(displayMonthly)}/mês
                  </span>
                </div>
              </div>

              {/* ── Upsell: agentes complementares ── */}
              {upsellAgents.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <h2 className="text-base font-semibold text-foreground">
                      Potencialize seu time
                    </h2>
                    <Badge variant="secondary" className="text-[10px]">
                      recomendado
                    </Badge>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3">
                    <AnimatePresence>
                      {upsellAgents.map((agent, i) => {
                        const Icon = agent.icon;
                        return (
                          <motion.div
                            key={agent.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ delay: i * 0.05 }}
                            className="flex items-center gap-3 p-3 rounded-2xl border border-dashed border-border bg-card/60 hover:border-primary/40 hover:bg-card transition-all group"
                          >
                            {/* Mini avatar */}
                            <div className="w-12 h-12 rounded-xl overflow-hidden border border-border shrink-0">
                              <img
                                src={agent.avatar}
                                alt={agent.name}
                                className="w-full h-full object-cover object-top"
                              />
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1.5 mb-0.5">
                                <Icon className="w-3.5 h-3.5 shrink-0" style={{ color: agent.color }} />
                                <span className="text-sm font-semibold" style={{ color: agent.color }}>
                                  {agent.name}
                                </span>
                              </div>
                              <p className="text-xs text-muted-foreground leading-tight line-clamp-1">
                                {agent.description}
                              </p>
                              <p className="text-xs font-semibold text-muted-foreground mt-0.5">
                                +R$&nbsp;{isAnnual ? fmt(PRICE_ANNUAL_MONTHLY) : "29,00"}/mês
                              </p>
                            </div>

                            <button
                              onClick={() => addAgent(agent.id)}
                              className="shrink-0 w-8 h-8 rounded-full border-2 border-primary/40 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all"
                              aria-label={`Adicionar ${agent.name}`}
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  </div>
                </div>
              )}

              {/* Social proof */}
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-card border border-border/50">
                <div className="flex -space-x-2">
                  {[claraAvatar, otavioAvatar, lucasAvatar, helenaAvatar].map((src, i) => (
                    <div key={i} className="w-7 h-7 rounded-full border-2 border-background overflow-hidden">
                      <img src={src} alt="" className="w-full h-full object-cover object-top" />
                    </div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">+1.200 prestadores</span> já usam o MandaUmZap
                </p>
                <div className="flex items-center gap-1 ml-auto">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="text-sm font-semibold">4.9</span>
                </div>
              </div>

            </div>

            {/* ── Coluna direita — resumo ── */}
            <div className="lg:col-span-2">
              <Card className="sticky top-24 shadow-lg border-border/50">
                <CardContent className="p-6">

                  {/* Toggle mensal / anual */}
                  <div className="flex items-center gap-1 p-1 rounded-xl bg-muted mb-5">
                    <button
                      onClick={() => setIsAnnual(false)}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                        !isAnnual ? "bg-background shadow text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      Mensal
                    </button>
                    <button
                      onClick={() => setIsAnnual(true)}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all relative ${
                        isAnnual ? "bg-background shadow text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      Anual
                      <Badge className="absolute -top-2.5 -right-1 bg-primary text-primary-foreground border-0 text-[10px] px-1.5 py-0.5">
                        −20%
                      </Badge>
                    </button>
                  </div>

                  {/* Preço */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={isAnnual ? "annual" : "monthly"}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.15 }}
                      className="text-center mb-5"
                    >
                      {isAnnual ? (
                        <>
                          <div className="flex items-baseline justify-center gap-1">
                            <span className="text-4xl font-bold text-foreground">
                              R$&nbsp;{fmt(annualMonthlyTotal)}
                            </span>
                            <span className="text-muted-foreground">/mês</span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            R$&nbsp;{fmt(annualBilledTotal)} cobrado anualmente
                          </p>
                          <p className="text-xs font-semibold mt-1" style={{ color: "#25D366" }}>
                            Você economiza R$&nbsp;{fmt(annualSavings)}/ano
                          </p>
                        </>
                      ) : (
                        <>
                          <div className="flex items-baseline justify-center gap-1">
                            <span className="text-4xl font-bold text-foreground">
                              R$&nbsp;{fmt(monthlyTotal)}
                            </span>
                            <span className="text-muted-foreground">/mês</span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {selectedIds.length} agente{selectedIds.length !== 1 ? "s" : ""} × R$&nbsp;29,00
                          </p>
                          {selectedIds.length > 0 && (
                            <p className="text-xs text-muted-foreground mt-1">
                              Mude para anual e economize R$&nbsp;{fmt(annualSavings)}/ano
                            </p>
                          )}
                        </>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  {/* Lista de agentes no resumo */}
                  <ul className="space-y-2 mb-5">
                    {cartAgents.map((agent) => (
                      <li key={agent.id} className="flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4 shrink-0" style={{ color: agent.color }} />
                        <span className="text-foreground">{agent.name}</span>
                        <span className="text-muted-foreground text-xs ml-auto">{agent.role}</span>
                      </li>
                    ))}
                    <li className="flex items-center gap-2 text-sm text-muted-foreground pt-1 border-t border-border/50">
                      <Check className="w-4 h-4 shrink-0 text-primary" />
                      Sem contrato — cancele quando quiser
                    </li>
                    <li className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 shrink-0 text-primary" />
                      Ative ou pause qualquer agente
                    </li>
                  </ul>

                  <Button
                    size="lg"
                    className="w-full gap-2 h-12 mb-4"
                    onClick={handleContinue}
                  >
                    Contratar agora
                    <ArrowRight className="w-4 h-4" />
                  </Button>

                  <div className="space-y-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Shield className="w-3 h-3 text-green-500" />
                      Pagamento 100% seguro via Stripe
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="w-3 h-3 text-green-500" />
                      Ative seus agentes em minutos
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3 h-3 text-green-500" />
                      Suporte pelo WhatsApp
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-3 h-3 text-green-500" />
                      +1.200 prestadores já ativos
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
};

export default Carrinho;
