import { Link } from "react-router-dom";
import { Check, Lock, Smartphone, Mic, RefreshCw, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const plans = [
  {
    id: "comecar",
    name: "COMEÇAR",
    price: "29",
    tagline: "Pra testar sem medo",
    description: "Ideal pra quem quer sentir como funciona, sem compromisso.",
    features: [
      "1 agente à sua escolha",
      "Atendimento direto no WhatsApp",
      "Funciona com áudio e texto",
      "Comece em poucos minutos",
    ],
    microcopy: "Sem contrato. Cancele quando quiser.",
    buttonText: "Quero começar",
    popular: false,
    premium: false,
  },
  {
    id: "trabalhar",
    name: "TRABALHAR",
    price: "49",
    tagline: "Pra usar no dia a dia",
    description: "O básico bem feito pra tocar a prestação de serviços.",
    features: [
      "Até 2 agentes à sua escolha",
      "Uso livre no WhatsApp",
      "Atendimento, orçamento ou agenda",
      "Suporte por mensagem",
    ],
    microcopy: "O plano mais usado por quem trabalha sozinho.",
    buttonText: "Usar no dia a dia",
    popular: false,
    premium: false,
  },
  {
    id: "vender-mais",
    name: "VENDER MAIS",
    price: "79",
    tagline: "Pra ganhar tempo e fechar mais serviço",
    description: "Tudo o que o prestador de serviço precisa pra vender melhor.",
    features: [
      "Todos os agentes inclusos",
      "Atendimento, orçamento, agenda, finanças e divulgação",
      "Tudo resolvido pelo WhatsApp",
      "Suporte prioritário",
    ],
    microcopy: "Economiza tempo todos os dias.",
    buttonText: "Quero vender mais",
    popular: true,
    premium: false,
  },
  {
    id: "tudo-automatico",
    name: "TUDO AUTOMÁTICO",
    price: "129",
    tagline: "Pra deixar a prestação de serviços rodando sozinha",
    description: "Os agentes trabalham juntos, do cliente ao lucro.",
    features: [
      "Todos os agentes integrados",
      "Fluxo automático completo",
      "Do primeiro contato ao financeiro",
      "Suporte VIP",
      "Novidades primeiro",
    ],
    microcopy: "Ideal pra quem quer crescer sem virar refém do WhatsApp.",
    buttonText: "Quero tudo automático",
    popular: false,
    premium: true,
  },
];

const microFeatures = [
  { icon: Lock, text: "Sem fidelidade" },
  { icon: Smartphone, text: "Tudo funciona no WhatsApp" },
  { icon: Mic, text: "Aceita áudio e texto" },
  { icon: RefreshCw, text: "Troque de plano quando quiser" },
];

export function PricingSection() {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium text-foreground mb-4 tracking-tight">
            Escolha seu plano
          </h2>
          <p className="text-lg text-muted-foreground">
            Sem contrato. Sem complicação. Cancele quando quiser.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-10">
          {plans.map((plan, index) => {
            const isHighlighted = plan.popular || plan.premium;
            const highlightColor = plan.popular ? "whatsapp" : plan.premium ? "agent-orange" : "";
            
            return (
              <Card
                key={index}
                className={cn(
                  "relative overflow-hidden flex flex-col rounded-3xl brutalist-box brutalist-hover-lg",
                  isHighlighted && plan.popular && "lg:scale-105"
                )}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 text-xs font-semibold px-3 py-1.5 rounded-bl-lg bg-whatsapp text-foreground">
                    ⭐ Recomendado
                  </div>
                )}
                {plan.premium && (
                  <div className="absolute top-0 right-0 text-xs font-semibold px-3 py-1.5 rounded-bl-lg bg-agent-orange text-foreground">
                    ✨ Ideal
                  </div>
                )}
                <CardHeader className="text-center pb-2 pt-6">
                  <CardTitle className="text-lg md:text-xl text-foreground">
                    {plan.name}
                  </CardTitle>
                  <p className="text-xs font-semibold text-muted-foreground">{plan.tagline}</p>
                  <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
                </CardHeader>
                <CardContent className="text-center flex-1 flex flex-col pt-4">
                  <div className="mb-6">
                    <span className="text-4xl md:text-5xl font-bold text-foreground">
                      R${plan.price}
                    </span>
                    <span className="text-muted-foreground">/mês</span>
                  </div>
                  <ul className="space-y-3 mb-6 text-left flex-1">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="w-5 h-5 flex-shrink-0 mt-0.5 text-whatsapp" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {/* Microcopy */}
                  <p className="text-xs text-muted-foreground mb-4 italic">
                    {plan.microcopy}
                  </p>
                  
                  <Link to="/carrinho" className="mt-auto">
                    <Button
                      className="w-full gap-2"
                    >
                      {plan.buttonText}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Micro features row */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-12 max-w-4xl mx-auto">
          {microFeatures.map((feature, index) => (
            <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
              <feature.icon className="w-4 h-4 text-whatsapp" />
              <span>{feature.text}</span>
            </div>
          ))}
        </div>

        {/* Comparison text */}
        <div className="text-center max-w-2xl mx-auto mb-10 p-6 rounded-2xl bg-muted/30">
          <p className="text-lg font-medium text-foreground mb-2">
            Quanto custa perder um orçamento por demora?
          </p>
          <p className="text-muted-foreground">
            O MandaUmZap custa menos que um café por dia.
          </p>
        </div>

        {/* CTA to Agents */}
        <div className="text-center">
          <p className="text-muted-foreground mb-4">
            Quer conhecer os agentes antes de decidir?
          </p>
          <Link to="/agentes">
            <Button variant="outline" className="gap-2">
              Ver todos os agentes
              <ChevronRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
