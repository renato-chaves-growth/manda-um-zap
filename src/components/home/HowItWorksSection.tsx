import { motion } from "framer-motion";
import { 
  UserPlus, 
  Settings2, 
  MessageCircle,
  ArrowRight
} from "lucide-react";

const steps = [
  {
    number: "1",
    icon: UserPlus,
    title: "Comece em poucos minutos",
    description: "Cadastre sua prestação de serviços e escolha seus agentes.",
    microcopy: "Sem contrato • Sem instalação",
  },
  {
    number: "2",
    icon: Settings2,
    title: "Diga como você trabalha",
    description: "Defina margem, tipos de serviço e horários.",
    microcopy: "Você continua no controle",
  },
  {
    number: "3",
    icon: MessageCircle,
    title: "Use só pelo WhatsApp",
    description: "Cliente manda mensagem. Os agentes cuidam do resto.",
    microcopy: "Áudio ou texto • Do jeito que você já usa",
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container max-w-5xl">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="font-sans text-3xl md:text-4xl lg:text-5xl font-light text-foreground mb-4 tracking-tight">
            Como <span className="font-medium" style={{
              background: "linear-gradient(135deg, #075E54, #25D366)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>funciona</span>
          </h2>
        </motion.div>

        {/* Steps - Mobile: Stack, Desktop: Row */}
        <div className="grid gap-4 md:gap-6 md:grid-cols-3 mb-12 md:mb-16">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative"
            >
              <div className="bg-[#F9F7F5] rounded-2xl p-6 md:p-8 h-full brutalist-box brutalist-hover transition-colors duration-300">
                {/* Step number + Icon */}
                <div className="flex items-center gap-3 mb-4">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-lg"
                    style={{ backgroundColor: "#075E54" }}
                  >
                    {step.number}
                  </div>
                  <step.icon className="w-5 h-5" style={{ color: "#25D366" }} />
                </div>
                
                {/* Content */}
                <h3 className="font-sans text-lg md:text-xl font-medium text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {step.description}
                </p>
                
                {/* Microcopy */}
                <p className="text-sm font-medium" style={{ color: "#25D366" }}>
                  {step.microcopy}
                </p>
              </div>

              {/* Arrow connector (desktop only, not on last) */}
              {index < steps.length - 1 && (
                <div className="hidden md:flex absolute top-1/2 -right-3 lg:-right-4 -translate-y-1/2 z-10">
                  <ArrowRight className="w-5 h-5 text-muted-foreground/40" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Closing statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-2 px-6 py-4 rounded-2xl bg-[#EEFAE5] border border-[#25D366]/20">
            <span className="text-lg md:text-xl font-medium text-foreground">
              Mais tempo produzindo.
            </span>
            <span className="text-lg md:text-xl font-light text-muted-foreground">
              Menos tempo no celular.
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
