import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, Lock, Smartphone, Mic, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

// ─── Dados ────────────────────────────────────────────────────────────────────

const PRICE_PER_AGENT = 29;

interface AgentOption {
  id:          string;
  name:        string;
  role:        string;
  color:       string;
  initial:     string;
  description: string;
}

const AGENT_OPTIONS: AgentOption[] = [
  {
    id:          "clara",
    name:        "Clara",
    role:        "Atendimento",
    color:       "#25D366",
    initial:     "C",
    description: "Responde, qualifica e salva o lead 24h",
  },
  {
    id:          "otavio",
    name:        "Otávio",
    role:        "Orçamento",
    color:       "#8B5CF6",
    initial:     "O",
    description: "Cotação estruturada com fornecedores",
  },
  {
    id:          "lucas",
    name:        "Lucas",
    role:        "Agenda",
    color:       "#3B82F6",
    initial:     "L",
    description: "Organiza visitas no Google Calendar",
  },
  {
    id:          "helena",
    name:        "Helena",
    role:        "Financeiro",
    color:       "#F59E0B",
    initial:     "H",
    description: "Controla margem e lucro do projeto",
  },
  {
    id:          "maya",
    name:        "Maya",
    role:        "Divulgação",
    color:       "#F97316",
    initial:     "M",
    description: "Cria copy e hashtags para Instagram",
  },
] as const;

interface MicroFeature {
  Icon: React.ElementType;
  text: string;
}

const MICRO_FEATURES: MicroFeature[] = [
  { Icon: Lock,       text: "Sem fidelidade"              },
  { Icon: Smartphone, text: "Tudo funciona no WhatsApp"   },
  { Icon: Mic,        text: "Aceita áudio e texto"         },
  { Icon: RefreshCw,  text: "Troque de agente quando quiser" },
] as const;

// ─── Componente ───────────────────────────────────────────────────────────────

/**
 * PricingSection — seletor interativo de agentes a R$29/agente/mês.
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
                      "relative rounded-xl border-2 p-4 text-left transition-all duration-150 cursor-pointer",
                      isSelected
                        ? "border-black shadow-[4px_4px_0_#000] -translate-x-[2px] -translate-y-[2px]"
                        : "border-border/60 bg-card hover:border-black hover:shadow-[2px_2px_0_#000]"
                    )}
                    style={isSelected ? { background: agent.color + "22" } : {}}
                    aria-pressed={isSelected}
                  >
                    {/* Checkbox */}
                    <div
                      className={cn(
                        "absolute top-3 right-3 w-5 h-5 rounded-full border-2 flex items-center justify-center",
                        isSelected ? "border-black bg-white" : "border-border bg-white"
                      )}
                    >
                      {isSelected && (
                        <Check className="w-3 h-3" style={{ color: agent.color }} aria-hidden="true" />
                      )}
                    </div>

                    {/* Avatar */}
                    <div
                      className="w-10 h-10 rounded-full border-2 border-black flex items-center justify-center mb-3 shadow-[2px_2px_0_#000]"
                      style={{ background: agent.color }}
                    >
                      <span className="font-black text-base text-white">{agent.initial}</span>
                    </div>

                    <p className="font-semibold text-sm text-foreground">{agent.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{agent.role}</p>
                    <p className="text-xs font-bold mt-2 text-foreground/70">
                      R$ 29,00/mês
                    </p>
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
