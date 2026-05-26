import { motion } from "framer-motion";

const benefits = [
  "Clientes respondidos em segundos",
  "Orçamentos 10x mais rápidos",
  "Agenda sempre organizada",
  "Zero clientes perdidos",
  "Lucro real calculado",
  "Instagram no piloto automático",
  "+23% de conversão média",
  "Você focado no que importa",
];

// Duplicate for seamless loop
const duplicatedBenefits = [...benefits, ...benefits, ...benefits];

export function BenefitsMarquee() {
  return (
    <section className="py-8 overflow-hidden bg-gradient-to-r from-muted/10 via-muted/30 to-muted/10 border-y border-border/30">
      <div className="relative">
        {/* Gradient masks for smooth fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
        
        {/* Scrolling container */}
        <motion.div
          className="flex gap-4 items-center"
          animate={{
            x: [0, -33.33 * benefits.length * 16],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 45,
              ease: "linear",
            },
          }}
        >
          {duplicatedBenefits.map((benefit, index) => (
            <div
              key={index}
              className="shrink-0 group"
            >
              <div 
                className="px-6 py-3 rounded-full bg-white dark:bg-card/80 backdrop-blur-sm border border-border/30 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300 cursor-default"
              >
                <span className="text-sm md:text-base font-semibold text-foreground/70 group-hover:text-primary transition-colors whitespace-nowrap">
                  {benefit}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
