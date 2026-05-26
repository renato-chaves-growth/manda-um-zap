import { motion } from "framer-motion";
import { TrendingDown, TrendingUp, Target } from "lucide-react";

const resultItems = [
  { text: "Menos tempo no celular", icon: TrendingDown, positive: false },
  { text: "Menos correria", icon: TrendingDown, positive: false },
  { text: "Mais organização", icon: TrendingUp, positive: true },
  { text: "Mais clientes atendidos", icon: TrendingUp, positive: true },
  { text: "Mais lucro no fim do mês", icon: TrendingUp, positive: true },
];

export function PurposeSection() {
  return (
     <section className="py-10 md:py-14">
      <div className="container">
         <div className="rounded-3xl bg-section-beige p-6 md:p-10 max-w-5xl mx-auto">
          {/* Layout horizontal */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-8">
            {/* Lado esquerdo - Headline */}
            <div className="lg:w-2/5">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <Target className="w-4 h-4" />
                Propósito
              </div>
              <p className="text-muted-foreground text-sm mb-2">
                O MandaUmZap existe para uma coisa simples:
              </p>
              <h2 className="text-2xl md:text-3xl font-black text-foreground leading-tight">
                Dar mais tempo pra você produzir e{" "}
                <span className="text-primary">ajudar sua prestação de serviços a faturar mais.</span>
              </h2>
            </div>
            
            {/* Lado direito - Grid de resultados inline */}
            <div className="lg:w-3/5">
              <div className="flex flex-wrap gap-2">
                {resultItems.map((item, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className={`inline-flex items-center gap-2 px-4 py-3 rounded-xl border ${
                      item.positive 
                        ? 'bg-[#EEFAE5] border-primary/20' 
                        : 'bg-background border-border'
                    }`}
                  >
                    <item.icon className={`w-4 h-4 ${item.positive ? 'text-primary' : 'text-red-400'}`} />
                    <span className={`text-sm font-medium ${item.positive ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {item.text}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
