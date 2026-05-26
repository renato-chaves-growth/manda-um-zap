import { useAnimatedCounter } from "@/hooks/useAnimatedCounter";

const stats = [
  {
    end: 500,
    suffix: "+",
    label: "prestadores de serviço ativos",
  },
  {
    end: 15000,
    suffix: "+",
    label: "Orçamentos gerados",
  },
  {
    end: 98,
    suffix: "%",
    label: "Taxa de satisfação",
  },
  {
    end: 4,
    suffix: "h",
    label: "Economizadas por dia",
  },
];

function AnimatedStat({ end, suffix, label }: { end: number; suffix: string; label: string }) {
  const { count, elementRef } = useAnimatedCounter({ end, duration: 2000 });
  
  return (
    <div className="text-center p-5 md:p-6 rounded-2xl bg-white/10 border border-white/20" ref={elementRef}>
      <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
        {count.toLocaleString('pt-BR')}<span className="text-white/80">{suffix}</span>
      </div>
      <p className="text-white/70 text-sm md:text-base">{label}</p>
    </div>
  );
}

export function NumbersSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="bg-[#1B2B2A] rounded-3xl relative overflow-hidden p-8 md:p-12 lg:p-16">
          {/* Background decoration */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px]" />
            <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] bg-white/5 rounded-full blur-[80px]" />
          </div>
          
          <div className="relative z-10">
            <div className="max-w-3xl mx-auto text-center mb-10">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-white mb-3 tracking-tight">
                Números que comprovam resultados
              </h2>
              <p className="text-base md:text-lg text-white/70">
                Junte-se aos prestadores de serviço que já estão transformando seus negócios
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
              {stats.map((stat, index) => (
                <AnimatedStat key={index} {...stat} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
