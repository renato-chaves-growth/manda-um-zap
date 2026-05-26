import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ChevronRight, ChevronLeft, Sparkles,
  Check, AlertCircle, TrendingUp, Star,
} from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";

// ─── Tipos ────────────────────────────────────────────────────────────────────

type ResponseType = "yes" | "sometimes" | "no" | null;

interface PainResponse {
  title:       string;
  description: string;
}

interface PainQuestion {
  question:         string;
  yesResponse:      PainResponse;
  sometimesResponse: PainResponse;
  noResponse:       PainResponse;
  agent:            string;
  testimonial: {
    name:   string;
    role:   string;
    quote:  string;
    rating: number;
  };
}

// ─── Dados ────────────────────────────────────────────────────────────────────

const PAIN_QUESTIONS: PainQuestion[] = [
  {
    question: "Cliente manda mensagem e você demora pra responder?",
    yesResponse: {
      title:       "A Clara responde em 3 segundos",
      description: "24h por dia, 7 dias por semana. Nunca mais perca cliente por demora.",
    },
    sometimesResponse: {
      title:       "Mesmo às vezes já é problema",
      description: "Cada mensagem não respondida é um cliente que pode ir pro concorrente. A Clara garante resposta imediata.",
    },
    noResponse: {
      title:       "Ótimo! Mas pode ser ainda melhor",
      description: "Imagina responder instantaneamente enquanto você produz? A Clara faz isso por você.",
    },
    agent: "Clara",
    testimonial: {
      name:   "Roberto M.",
      role:   "prestador de serviço há 12 anos",
      quote:  "Agora respondo cliente até de madrugada sem perder o sono!",
      rating: 5,
    },
  },
  {
    question: "Já perdeu cliente porque demorou no orçamento?",
    yesResponse: {
      title:       "O Otávio calcula na hora",
      description: "Orçamento enviado em segundos, com margem de lucro garantida. Zero erro de conta.",
    },
    sometimesResponse: {
      title:       "Uma vez já é prejuízo",
      description: "Cada orçamento atrasado é dinheiro perdido. O Otávio elimina esse risco.",
    },
    noResponse: {
      title:       "E se você pudesse orçar 10x mais rápido?",
      description: "Mais orçamentos = mais vendas. O Otávio multiplica sua capacidade de vender.",
    },
    agent: "Otávio",
    testimonial: {
      name:   "Carlos S.",
      role:   "Dono de prestação de serviços",
      quote:  "Mandei 3x mais orçamentos no mesmo tempo. Fechei mais!",
      rating: 5,
    },
  },
  {
    question: "Já esqueceu visita técnica marcada?",
    yesResponse: {
      title:       "O Lucas nunca esquece",
      description: "Agenda sincronizada, lembretes automáticos para você e o cliente. Sem furos.",
    },
    sometimesResponse: {
      title:       "Uma visita perdida = cliente perdido",
      description: "O Lucas gerencia sua agenda e garante que você nunca mais passe vergonha.",
    },
    noResponse: {
      title:       "E se sua agenda se organizasse sozinha?",
      description: "O Lucas marca, confirma e lembra. Você só aparece e vende.",
    },
    agent: "Lucas",
    testimonial: {
      name:   "Marcos P.",
      role:   "prestador de serviço autônomo",
      quote:  "Nunca mais perdi visita. O cliente até elogia a organização!",
      rating: 5,
    },
  },
  {
    question: "Não sabe exatamente o lucro de cada projeto?",
    yesResponse: {
      title:       "A Helena te dá visão completa",
      description: "Relatórios em tempo real, cobranças automáticas, lucro calculado por projeto.",
    },
    sometimesResponse: {
      title:       "Às vezes não é certeza",
      description: "A Helena te dá visão completa: entradas, parcelas, lucro real. Sem achismo.",
    },
    noResponse: {
      title:       "Perfeito! A Helena mantém assim",
      description: "Continue com controle total. A Helena automatiza o que você já faz bem.",
    },
    agent: "Helena",
    testimonial: {
      name:   "André L.",
      role:   "prestador de serviço há 8 anos",
      quote:  "Descobri que estava perdendo 15% de lucro. Agora sei tudo!",
      rating: 5,
    },
  },
  {
    question: "Não consegue postar no Instagram toda semana?",
    yesResponse: {
      title:       "A Maya mantém seu feed vivo",
      description: "Posts prontos com suas fotos, legendas que vendem. Sua marca sempre presente.",
    },
    sometimesResponse: {
      title:       "Constância é o segredo",
      description: "A Maya garante presença constante. Você foca em produzir, ela em divulgar.",
    },
    noResponse: {
      title:       "Ótimo! A Maya potencializa",
      description: "Com posts profissionais e estratégicos, você atrai ainda mais clientes.",
    },
    agent: "Maya",
    testimonial: {
      name:   "Felipe R.",
      role:   "prestador de serviço designer",
      quote:  "Meu Instagram cresceu 200% em 3 meses. Só posto as fotos!",
      rating: 5,
    },
  },
  {
    question: "Tem dificuldade em cobrar clientes inadimplentes?",
    yesResponse: {
      title:       "A Helena cobra por você",
      description: "Lembretes automáticos de pagamento, controle de parcelas e relatório de inadimplência.",
    },
    sometimesResponse: {
      title:       "Cobrança é sempre chato",
      description: "A Helena envia lembretes educados e automáticos. Você não precisa ter essa conversa.",
    },
    noResponse: {
      title:       "A Helena facilita ainda mais",
      description: "Automatize cobranças e tenha tempo para o que realmente importa: produzir.",
    },
    agent: "Helena",
    testimonial: {
      name:   "João V.",
      role:   "Dono de prestação de serviços",
      quote:  "Reduzi inadimplência em 80%. Os lembretes funcionam demais!",
      rating: 5,
    },
  },
] as const;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getResponseData(item: PainQuestion, type: ResponseType): PainResponse | null {
  switch (type) {
    case "yes":       return item.yesResponse;
    case "sometimes": return item.sometimesResponse;
    case "no":        return item.noResponse;
    default:          return null;
  }
}

function ResponseIcon({ type }: { type: ResponseType }) {
  switch (type) {
    case "yes":       return <AlertCircle className="w-5 h-5 text-destructive" />;
    case "sometimes": return <TrendingUp  className="w-5 h-5 text-amber-500"   />;
    case "no":        return <Check       className="w-5 h-5 text-primary"     />;
    default:          return null;
  }
}

// ─── Sub-componente: card de pergunta ─────────────────────────────────────────

function QuestionCard({ item }: { item: PainQuestion }) {
  const [response, setResponse] = useState<ResponseType>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  /** Fecha o estado de resposta ao clicar fora do card */
  useEffect(() => {
    if (!response) return;

    const onClickOutside = (e: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        setResponse(null);
      }
    };

    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [response]);

  const responseData = getResponseData(item, response);

  return (
    <div
      ref={cardRef}
      className="relative overflow-hidden rounded-2xl bg-card brutalist-outline transition-all duration-300 h-full"
    >
      {/* Pergunta */}
      <div className="p-5 pb-4 border-b border-border/30">
        <p className="text-base md:text-lg font-medium text-foreground leading-snug">
          {item.question}
        </p>
      </div>

      {/* Botões de resposta ou conteúdo de resposta */}
      <AnimatePresence mode="wait">
        {!response ? (
          <motion.div
            key="buttons"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="p-4 flex flex-wrap gap-2"
          >
            <button
              onClick={() => setResponse("yes")}
              className="flex-1 min-w-[80px] px-4 py-2.5 rounded-xl bg-destructive/10 text-destructive font-medium text-sm hover:bg-destructive/20 transition-colors"
            >
              Sim 😓
            </button>
            <button
              onClick={() => setResponse("sometimes")}
              className="flex-1 min-w-[80px] px-4 py-2.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 font-medium text-sm hover:bg-amber-500/20 transition-colors"
            >
              Às vezes
            </button>
            <button
              onClick={() => setResponse("no")}
              className="flex-1 min-w-[80px] px-4 py-2.5 rounded-xl bg-primary/10 text-primary font-medium text-sm hover:bg-primary/20 transition-colors"
            >
              Não 😊
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="response"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="p-5"
          >
            {/* Conteúdo da resposta */}
            <div className="flex items-start gap-3 mb-4">
              <div className="flex-shrink-0 mt-0.5">
                <ResponseIcon type={response} />
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">{responseData?.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{responseData?.description}</p>
              </div>
            </div>

            {/* Depoimento */}
            <div className="bg-muted/50 rounded-xl p-3 mb-4">
              <div className="flex items-center gap-1 mb-1.5" aria-label={`${item.testimonial.rating} estrelas`}>
                {Array.from({ length: item.testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" aria-hidden="true" />
                ))}
              </div>
              <p className="text-sm text-foreground italic mb-2">"{item.testimonial.quote}"</p>
              <p className="text-xs text-muted-foreground">
                <span className="font-medium text-foreground">{item.testimonial.name}</span>
                {" · "}
                {item.testimonial.role}
              </p>
            </div>

            {/* Agente + botão refazer */}
            <div className="flex items-center justify-between pt-3 border-t border-border/30">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <Sparkles className="w-3 h-3 text-primary" aria-hidden="true" />
                </div>
                <span className="text-sm font-semibold text-primary">{item.agent}</span>
                <span className="text-xs text-muted-foreground/60">resolve isso</span>
              </div>
              <button
                onClick={() => setResponse(null)}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Responder novamente"
              >
                Refazer
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Componente principal ─────────────────────────────────────────────────────

/**
 * PainSolutionSection — carrossel de perguntas sobre as dores do prestador.
 * O usuário responde e recebe uma solução personalizada de um agente.
 */
export function PainSolutionSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align:      "start",
    loop:       false,
    skipSnaps:  false,
    dragFree:   true,
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit",  onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit",  onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section className="py-16 md:py-24" aria-labelledby="pain-heading">
      <div className="container">
        <div className="bg-section-beige rounded-3xl relative overflow-hidden p-8 md:p-12 lg:p-16 brutalist-outline">

          {/* Decoração de fundo */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-primary/3 blur-[100px]" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[100px]" />
          </div>

          <div className="relative z-10">
            {/* Cabeçalho + setas */}
            <div className="flex items-start justify-between mb-8 md:mb-10">
              <div className="max-w-2xl">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
                >
                  <Sparkles className="w-4 h-4" aria-hidden="true" />
                  Responda e descubra
                </motion.div>

                <motion.h2
                  id="pain-heading"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-4 tracking-tight"
                >
                  Isso acontece com <span className="text-gradient font-black">você</span>?
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-lg md:text-xl text-muted-foreground"
                >
                  Responda honestamente e veja como podemos ajudar.
                </motion.p>
              </div>

              {/* Setas de navegação — apenas desktop */}
              <div className="hidden md:flex items-center gap-2 mt-4">
                <button
                  onClick={scrollPrev}
                  disabled={!canScrollPrev}
                  aria-label="Pergunta anterior"
                  className="w-10 h-10 rounded-full border border-border bg-white dark:bg-card flex items-center justify-center hover:border-primary/50 hover:bg-primary/5 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-5 h-5 text-foreground" aria-hidden="true" />
                </button>
                <button
                  onClick={scrollNext}
                  disabled={!canScrollNext}
                  aria-label="Próxima pergunta"
                  className="w-10 h-10 rounded-full border border-border bg-white dark:bg-card flex items-center justify-center hover:border-primary/50 hover:bg-primary/5 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-5 h-5 text-foreground" aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Carrossel */}
            <div
              className="overflow-hidden -mx-2 mb-10 touch-pan-y"
              ref={emblaRef}
              aria-label="Perguntas sobre suas dores"
            >
              <div className="flex">
                {PAIN_QUESTIONS.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05, duration: 0.4 }}
                    className="flex-shrink-0 w-[85%] sm:w-[48%] lg:w-[32%] px-2"
                  >
                    <QuestionCard item={item} />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Dica mobile */}
            <p className="text-sm text-muted-foreground/60 mb-6 md:hidden text-center" aria-hidden="true">
              Deslize para ver mais →
            </p>

            {/* CTA de resumo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <p className="text-muted-foreground mb-4">
                Cada "sim" é uma oportunidade de vender mais e trabalhar menos.
              </p>
              <Link to="/agentes">
                <Button size="lg" className="gap-2">
                  Conhecer os agentes
                  <ChevronRight className="w-4 h-4" aria-hidden="true" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
