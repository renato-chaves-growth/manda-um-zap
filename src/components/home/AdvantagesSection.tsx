import { TrendingUp, Clock, Wallet, Users, Target, Zap, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";

const advantages = [
  {
    icon: Clock,
    title: "Economize até 4h por dia",
    description: "Pare de perder tempo respondendo as mesmas perguntas. Os agentes fazem isso por você.",
  },
  {
    icon: Wallet,
    title: "Aumente seu faturamento",
    description: "Mais tempo livre para focar no que importa: entregar móveis de qualidade.",
  },
  {
    icon: Users,
    title: "Nunca perca um cliente",
    description: "Respostas instantâneas 24/7. Seu cliente não vai esperar e nem procurar a concorrência.",
  },
  {
    icon: Target,
    title: "Orçamentos precisos",
    description: "Calcule materiais, perdas e margem de lucro automaticamente. Sem errar na conta.",
  },
  {
    icon: Zap,
    title: "Fácil de usar",
    description: "Tudo pelo WhatsApp. Se você sabe mandar áudio, já sabe usar o MandaUmZap.",
  },
  {
    icon: TrendingUp,
    title: "Cresça com organização",
    description: "Controle financeiro, agenda de visitas e marketing. Tudo no mesmo lugar.",
  },
];

export function AdvantagesSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    skipSnaps: false,
    dragFree: true,
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
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="bg-section-green rounded-3xl relative overflow-hidden p-8 md:p-12 lg:p-16">
          {/* Background - subtle primary tints */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/3 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="relative z-10">
            {/* Header with arrows */}
            <div className="flex items-start justify-between mb-8 md:mb-12">
              <div className="max-w-2xl">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-foreground mb-4 tracking-tight">
                  Por que prestadores de serviço estão <span className="text-gradient font-semibold">escolhendo</span> o MandaUmZap?
                </h2>
                <p className="text-lg md:text-xl text-muted-foreground">
                  Vantagens que fazem diferença no seu dia a dia
                </p>
              </div>
              
              {/* Navigation arrows - desktop only */}
              <div className="hidden md:flex items-center gap-2 mt-4">
                <button
                  onClick={scrollPrev}
                  disabled={!canScrollPrev}
                  className="w-10 h-10 rounded-full border border-border bg-white dark:bg-card flex items-center justify-center hover:border-primary/50 hover:bg-primary/5 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                  aria-label="Anterior"
                >
                  <ChevronLeft className="w-5 h-5 text-foreground" />
                </button>
                <button
                  onClick={scrollNext}
                  disabled={!canScrollNext}
                  className="w-10 h-10 rounded-full border border-border bg-white dark:bg-card flex items-center justify-center hover:border-primary/50 hover:bg-primary/5 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                  aria-label="Próximo"
                >
                  <ChevronRight className="w-5 h-5 text-foreground" />
                </button>
              </div>
            </div>

            {/* Carousel */}
            <div className="overflow-hidden -mx-2 touch-pan-y" ref={emblaRef}>
              <div className="flex">
                {advantages.map((item, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-[85%] sm:w-[45%] lg:w-[32%] px-2"
                  >
                    <div className="group p-6 rounded-2xl bg-white dark:bg-card border border-border/50 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 h-full">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                        <item.icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-bold text-foreground mb-2">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile hint */}
            <p className="text-sm text-muted-foreground/60 mt-4 md:hidden text-center">
              Deslize para ver mais →
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
