import { TrendingUp, Clock, Wallet, Users, Target, Zap, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";

// ─── Tipos ────────────────────────────────────────────────────────────────────

interface Advantage {
  Icon:        React.ElementType;
  title:       string;
  description: string;
}

// ─── Dados ────────────────────────────────────────────────────────────────────

const ADVANTAGES: Advantage[] = [
  {
    Icon:        Clock,
    title:       "Economize até 4h por dia",
    description: "Pare de perder tempo respondendo as mesmas perguntas. Os agentes fazem isso por você.",
  },
  {
    Icon:        Wallet,
    title:       "Aumente seu faturamento",
    description: "Mais tempo livre para focar no que importa: entregar serviços de qualidade e fechar mais contratos.",
  },
  {
    Icon:        Users,
    title:       "Nunca perca um cliente",
    description: "Respostas instantâneas 24/7. Seu cliente não vai esperar e nem procurar a concorrência.",
  },
  {
    Icon:        Target,
    title:       "Orçamentos precisos",
    description: "Calcule materiais, perdas e margem de lucro automaticamente. Sem errar na conta.",
  },
  {
    Icon:        Zap,
    title:       "Fácil de usar",
    description: "Tudo pelo WhatsApp. Se você sabe mandar áudio, já sabe usar o MandaUmZap.",
  },
  {
    Icon:        TrendingUp,
    title:       "Cresça com organização",
    description: "Controle financeiro, agenda de visitas e marketing. Tudo no mesmo lugar.",
  },
] as const;

// ─── Componente principal ─────────────────────────────────────────────────────

/**
 * AdvantagesSection — carrossel de 6 vantagens competitivas do MandaUmZap.
 */
export function AdvantagesSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align:     "start",
    loop:      false,
    skipSnaps: false,
    dragFree:  true,
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
    <section className="py-16 md:py-24" aria-labelledby="advantages-heading">
      <div className="container">
        <div className="bg-section-green rounded-3xl relative overflow-hidden p-8 md:p-12 lg:p-16">

          {/* Decoração de fundo */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/3 rounded-full blur-[120px] pointer-events-none" aria-hidden="true" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" aria-hidden="true" />

          <div className="relative z-10">
            {/* Cabeçalho + setas */}
            <div className="flex items-start justify-between mb-8 md:mb-12">
              <div className="max-w-2xl">
                <h2
                  id="advantages-heading"
                  className="text-3xl md:text-4xl lg:text-5xl font-medium text-foreground mb-4 tracking-tight"
                >
                  Por que prestadores de serviço estão{" "}
                  <span className="text-gradient font-semibold">escolhendo</span> o MandaUmZap?
                </h2>
                <p className="text-lg md:text-xl text-muted-foreground">
                  Vantagens que fazem diferença no seu dia a dia
                </p>
              </div>

              {/* Setas — apenas desktop */}
              <div className="hidden md:flex items-center gap-2 mt-4">
                <button
                  onClick={scrollPrev}
                  disabled={!canScrollPrev}
                  aria-label="Vantagem anterior"
                  className="w-10 h-10 rounded-full border border-border bg-white dark:bg-card flex items-center justify-center hover:border-primary/50 hover:bg-primary/5 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-5 h-5 text-foreground" aria-hidden="true" />
                </button>
                <button
                  onClick={scrollNext}
                  disabled={!canScrollNext}
                  aria-label="Próxima vantagem"
                  className="w-10 h-10 rounded-full border border-border bg-white dark:bg-card flex items-center justify-center hover:border-primary/50 hover:bg-primary/5 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-5 h-5 text-foreground" aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Carrossel */}
            <div
              className="overflow-hidden -mx-2 touch-pan-y"
              ref={emblaRef}
              aria-label="Vantagens do MandaUmZap"
            >
              <div className="flex">
                {ADVANTAGES.map(({ Icon, title, description }) => (
                  <div
                    key={title}
                    className="flex-shrink-0 w-[85%] sm:w-[45%] lg:w-[32%] px-2"
                  >
                    <div className="group p-6 rounded-2xl bg-white dark:bg-card border border-border/50 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 h-full">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                        <Icon className="w-6 h-6 text-primary" aria-hidden="true" />
                      </div>
                      <h3 className="text-lg font-bold text-foreground mb-2">{title}</h3>
                      <p className="text-muted-foreground">{description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dica mobile */}
            <p className="text-sm text-muted-foreground/60 mt-4 md:hidden text-center" aria-hidden="true">
              Deslize para ver mais →
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
