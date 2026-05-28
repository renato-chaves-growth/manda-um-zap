import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, Lock, Smartphone, Mic, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

import claraAvatar   from "@/assets/avatars/ze-atendimento-v3.webp";
import otavioAvatar  from "@/assets/avatars/chico-orcamento-v3.webp";
import lucasAvatar   from "@/assets/avatars/neto-agenda-v3.webp";
import helenaAvatar  from "@/assets/avatars/dona-conta-v3.webp";
import mayaAvatar    from "@/assets/avatars/zeca-instagram-v3.webp";

// ─── Dados ────────────────────────────────────────────────────────────────────

const PRICE_PER_AGENT = 29;

interface AgentOption {
  id:      string;
  name:    string;
  role:    string;
  color:   string;
  avatar:  string;
}

const AGENT_OPTIONS: AgentOption[] = [
  { id: "clara",  name: "Clara",  role: "Atendimento", color: "#25D366", avatar: claraAvatar  },
  { id: "otavio", name: "Otávio", role: "Orçamento",   color: "#8B5CF6", avatar: otavioAvatar },
  { id: "lucas",  name: "Lucas",  role: "Agenda",      color: "#3B82F6", avatar: lucasAvatar  },
  { id: "helena", name: "Helena", role: "Financeiro",  color: "#F59E0B", avatar: helenaAvatar },
  { id: "maya",   name: "Maya",   role: "Divulgação",  color: "#F97316", avatar: mayaAvatar   },
] as const;

interface MicroFeature {
  Icon: React.ElementType;
  text: string;
}

const MICRO_FEATURES: MicroFeature[] = [
  { Icon: Lock,       text: "Sem fidelidade"                },
  { Icon: Smartphone, text: "Tudo funciona no WhatsApp"     },
  { Icon: Mic,        text: "Aceita áudio e texto"           },
  { Icon: RefreshCw,  text: "Troque de agente quando quiser" },
] as const;

// ─── Componente ───────────────────────────────────────────────────────────────

/**
 * PricingSection — seletor interativo de agentes a R$29/agente/mês com fotos reais.
 */
export function PricingSection() {
  const [selected, setSelected] = useState<Set<string>>(new Set(["clara"]));

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        if (next.size > 1) next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const total = selected.size * PRICE_PER_AGENT;

  return (
    <section className="py-20 md:py-28 bg-background" aria-labelledby="pricing-heading">
      <div className="container">

        {/* Cabeçalho */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-12 md:mb-16"
        >
          <h2
            id="pricing-heading"
            className="text-2xl md:text-3xl lg:text-4xl font-medium text-foreground mb-4 tracking-tight"
          >
            Monte seu time de agentes
          </h2>
          <p className="text-lg text-muted-foreground">
            <span className="font-semibold text-foreground">R$&nbsp;29,00</span> por agente por mês.
            Ative apenas os que precisar. Sem contrato.
          </p>
        </motion.div>

        {/* Seletor interativo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="max-w-5xl mx-auto"
        >
          <div className="rounded-2xl border-2 border-black bg-section-beige shadow-[6px_6px_0_#000] p-6 lg:p-8 mb-8">
            <p className="text-sm font-semibold text-muted-foreground mb-5">
              Selecione os agentes que você quer ativar:
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {AGENT_OPTIONS.map((agent, index) => {
                const isSelected = selected.has(agent.id);
                return (
                  <motion.button
                    key={agent.id}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.06 }}
                    onClick={() => toggle(agent.id)}
                    className={cn(
                      "relative rounded-xl border-2 p-0 text-left transition-all duration-150 cursor-pointer overflow-hidden flex flex-col",
                      isSelected
                        ? "border-black shadow-[4px_4px_0_#000] -translate-x-[2px] -translate-y-[2px]"
                        : "border-border/60 bg-card hover:border-black hover:shadow-[2px_2px_0_#000]"
                    )}
                    aria-pressed={isSelected}
                  >
                    {/* Foto do agente */}
                    <div className="relative w-full aspect-[3/2] overflow-hidden">
                      <img
                        src={agent.avatar}
                        alt={agent.name}
                        className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                      />
                      {/* Overlay colorido quando selecionado */}
                      {isSelected && (
                        <div
                          className="absolute inset-0 opacity-20"
                          style={{ background: agent.color }}
                        />
                      )}
                      {/* Checkbox */}
                      <div
                        className={cn(
                          "absolute top-2 right-2 w-6 h-6 rounded-full border-2 flex items-center justify-center shadow-sm",
                          isSelected ? "border-black bg-white" : "border-white/80 bg-white/60"
                        )}
                      >
                        {isSelected && (
                          <Check className="w-3.5 h-3.5" style={{ color: agent.color }} aria-hidden="true" />
                        )}
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-3 flex-1 flex flex-col gap-1">
                      <p className="font-semibold text-sm text-foreground leading-tight">{agent.name}</p>
                      <p className="text-xs text-muted-foreground">{agent.role}</p>
                      <p
                        className="text-xs font-bold mt-auto pt-1"
                        style={{ color: agent.color }}
                      >
                        R$ 29,00/mês
                      </p>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Total + CTA */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-5 pt-6 border-t-2 border-black/10">
              <div>
                <p className="text-sm text-muted-foreground">
                  {selected.size} agente{selected.size !== 1 ? "s" : ""} selecionado{selected.size !== 1 ? "s" : ""}
                </p>
                <p className="text-4xl font-bold text-foreground mt-1">
                  R$&nbsp;{total},00
                  <span className="text-lg font-normal text-muted-foreground ml-1">/mês</span>
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  ≈ R$&nbsp;{(total / 30).toFixed(2).replace(".", ",")} por dia · Cancele quando quiser
                </p>
              </div>

              <Link to="/carrinho" className="w-full sm:w-auto">
                <Button size="lg" className="w-full gap-2 rounded-full shadow-[5px_5px_0_#000] hover:shadow-none hover:translate-x-[5px] hover:translate-y-[5px] transition-all duration-150">
                  Começar com {selected.size} agente{selected.size !== 1 ? "s" : ""}
                </Button>
              </Link>
            </div>
          </div>

          {/* Micro-features de confiança */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4 md:gap-8 mb-10"
          >
            {MICRO_FEATURES.map(({ Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Icon className="w-4 h-4 text-whatsapp" aria-hidden="true" />
                <span>{text}</span>
              </div>
            ))}
          </motion.div>

          {/* Comparação de valor */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto p-6 rounded-2xl bg-muted/30"
          >
            <p className="text-lg font-medium text-foreground mb-2">
              Quanto custa perder um orçamento por demora?
            </p>
            <p className="text-muted-foreground">
              Um agente MandaUmZap custa menos que um café por dia.
            </p>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
