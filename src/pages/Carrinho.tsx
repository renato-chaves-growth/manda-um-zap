import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Check, ArrowRight, Star, Shield, Users, Sparkles, Zap, Clock,
  MessageCircle, Calculator, Calendar, Wallet, Instagram,
} from "lucide-react";
import { motion } from "framer-motion";

import claraAvatar   from "@/assets/avatars/ze-atendimento-v3.webp";
import chicoAvatar   from "@/assets/avatars/chico-orcamento-v3.webp";
import netoAvatar    from "@/assets/avatars/neto-agenda-v3.webp";
import donaContaAvatar from "@/assets/avatars/dona-conta-v3.webp";
import zecaAvatar    from "@/assets/avatars/zeca-instagram-v3.webp";

// ── Preço único ────────────────────────────────────────────────────────────
const MONTHLY_PRICE  = 89.90;
const ANNUAL_TOTAL   = Math.round(MONTHLY_PRICE * 12 * 0.85 * 100) / 100; // 916.98
const MONTHLY_EQUIV  = (ANNUAL_TOTAL / 12).toFixed(2);                     // 76.42
const ANNUAL_SAVINGS = Math.round(MONTHLY_PRICE * 12 - ANNUAL_TOTAL);      // ~162
// ───────────────────────────────────────────────────────────────────────────

const agents = [
  { id: "clara",   name: "Clara",   role: "Atendimento", avatar: claraAvatar,       icon: MessageCircle, color: "text-green-600",   description: "Responde clientes 24h no WhatsApp e qualifica leads." },
  { id: "otavio",  name: "Otávio",  role: "Orçamento",   avatar: chicoAvatar,       icon: Calculator,    color: "text-teal-600",    description: "Gera orçamentos detalhados com sua margem em minutos." },
  { id: "lucas",   name: "Lucas",   role: "Agendamento", avatar: netoAvatar,        icon: Calendar,      color: "text-lime-600",    description: "Agenda visitas e confirma presença automaticamente." },
  { id: "helena",  name: "Helena",  role: "Financeiro",  avatar: donaContaAvatar,   icon: Wallet,        color: "text-emerald-600", description: "Controla cobranças e acompanha pagamentos." },
  { id: "maya",    name: "Maya",    role: "Divulgação",  avatar: zecaAvatar,        icon: Instagram,     color: "text-green-700",   description: "Cria conteúdo para Instagram com seus projetos." },
];

const benefits = [
  "5 agentes de IA especializados",
  "WhatsApp integrado 24h por dia",
  "Ative ou pause cada agente quando quiser",
  "Orçamentos em PDF com sua marca",
  "Agendamento automático com lembretes",
  "Controle financeiro em tempo real",
  "Conteúdo para Instagram automático",
  "Cancele quando quiser, sem multa",
];

const Carrinho = () => {
  const navigate = useNavigate();
  const [isAnnual, setIsAnnual] = useState(false);

  const handleContinue = () => {
    navigate(`/checkout?ciclo=${isAnnual ? "annual" : "monthly"}`);
  };

  return (
    <main className="flex-1 pt-24 pb-16 bg-muted/30">
      <div className="container">
        <div className="max-w-4xl mx-auto">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              Equipe completa de IA
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Seu time de 5 agentes pronto pra trabalhar
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Uma equipe que não dorme, não tira férias e custa menos que um colaborador part-time
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-6">

            {/* ── Agentes ── */}
            <div className="lg:col-span-3 space-y-3">
              {agents.map((agent, i) => {
                const Icon = agent.icon;
                return (
                  <motion.div
                    key={agent.id}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                    className="flex items-center gap-4 p-4 rounded-2xl border border-border bg-card hover:border-primary/30 transition-all"
                  >
                    <div className="relative shrink-0">
                      <div className="w-14 h-14 rounded-xl overflow-hidden border border-border">
                        <img src={agent.avatar} alt={agent.name} className="w-full h-full object-cover object-top" />
                      </div>
                      <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-background" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <Icon className={`w-4 h-4 ${agent.color}`} />
                        <span className={`font-semibold ${agent.color}`}>{agent.name}</span>
                        <Badge variant="outline" className="text-[10px] px-1.5 py-0">{agent.role}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{agent.description}</p>
                    </div>
                    <Check className="w-4 h-4 text-primary shrink-0" />
                  </motion.div>
                );
              })}

              {/* Social proof */}
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-card border border-border/50 mt-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-7 h-7 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                      <Users className="w-3 h-3 text-muted-foreground" />
                    </div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">+1.200 prestadores de serviço</span> já usam o MandaUmZap
                </p>
                <div className="flex items-center gap-1 ml-auto">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="text-sm font-semibold">4.9</span>
                </div>
              </div>
            </div>

            {/* ── Resumo + CTA ── */}
            <div className="lg:col-span-2">
              <Card className="sticky top-24 shadow-lg border-border/50">
                <CardContent className="p-6">

                  {/* Billing toggle */}
                  <div className="flex items-center gap-1 p-1 rounded-xl bg-muted mb-5">
                    <button
                      onClick={() => setIsAnnual(false)}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${!isAnnual ? "bg-background shadow text-foreground" : "text-muted-foreground"}`}
                    >
                      Mensal
                    </button>
                    <button
                      onClick={() => setIsAnnual(true)}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all relative ${isAnnual ? "bg-background shadow text-foreground" : "text-muted-foreground"}`}
                    >
                      Anual
                      <Badge className="absolute -top-2 -right-1 bg-primary text-primary-foreground border-0 text-[10px] px-1.5">
                        −15%
                      </Badge>
                    </button>
                  </div>

                  {/* Price */}
                  <div className="text-center mb-5">
                    {isAnnual ? (
                      <>
                        <div className="flex items-baseline justify-center gap-1">
                          <span className="text-4xl font-bold text-foreground">R$ {MONTHLY_EQUIV}</span>
                          <span className="text-muted-foreground">/mês</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          R$ {ANNUAL_TOTAL.toFixed(2).replace(".", ",")} cobrado anualmente
                        </p>
                        <p className="text-xs text-primary font-medium mt-1">
                          Você economiza R$ {ANNUAL_SAVINGS}/ano
                        </p>
                      </>
                    ) : (
                      <>
                        <div className="flex items-baseline justify-center gap-1">
                          <span className="text-4xl font-bold text-foreground">
                            R$ {MONTHLY_PRICE.toFixed(2).replace(".", ",")}
                          </span>
                          <span className="text-muted-foreground">/mês</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">Cobrado mensalmente</p>
                      </>
                    )}
                  </div>

                  {/* Benefits */}
                  <ul className="space-y-2 mb-5">
                    {benefits.map((b, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span className="text-foreground">{b}</span>
                      </li>
                    ))}
                  </ul>

                  <Button size="lg" className="w-full gap-2 h-12 mb-4" onClick={handleContinue}>
                    Contratar agora
                    <ArrowRight className="w-4 h-4" />
                  </Button>

                  <div className="space-y-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Shield className="w-3 h-3 text-green-500" />
                      Pagamento 100% seguro via Stripe
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-3 h-3 text-green-500" />
                      Sem contrato — cancele quando quiser
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="w-3 h-3 text-green-500" />
                      Ative seus agentes em minutos
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3 h-3 text-green-500" />
                      Suporte pelo WhatsApp
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
