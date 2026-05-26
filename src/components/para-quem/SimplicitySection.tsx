import { Check, X, MessageCircle, Smartphone } from "lucide-react";
import { motion } from "framer-motion";

const notThings = [
  { text: "sistema complicado", icon: "🖥️" },
  { text: "curso", icon: "📚" },
  { text: "computador", icon: "💻" },
];

const benefits = [
  { text: "Sem contrato", icon: Check },
  { text: "Sem instalação", icon: Check },
  { text: "Sem computador", icon: Check },
  { text: "A partir de R$29/mês", icon: Check },
];

export function SimplicitySection() {
  return (
    <section className="py-10 md:py-14 bg-muted/30">
      <div className="container">
        <div className="max-w-5xl mx-auto">
          {/* Layout horizontal */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-8">
            {/* Lado esquerdo - Negações inline */}
            <div className="lg:w-1/2">
              <div className="flex flex-wrap gap-2 mb-6">
                {notThings.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-background border border-border"
                  >
                    <span className="text-lg">{item.icon}</span>
                    <X className="w-4 h-4 text-red-400" />
                    <span className="text-sm text-muted-foreground line-through decoration-red-300/50">
                      {item.text}
                    </span>
                  </motion.div>
                ))}
              </div>
              
              <h2 className="text-2xl md:text-3xl font-black text-foreground mb-2">
                Você não precisa aprender nada novo.
              </h2>
              <p className="text-muted-foreground">
                Tudo funciona pelo <strong className="text-primary">WhatsApp</strong>, do jeito que você já usa.
              </p>
            </div>
            
            {/* Lado direito - Benefícios em grid compacto */}
            <div className="lg:w-1/2">
              <div className="p-6 rounded-2xl bg-[#EEFAE5] border border-primary/20">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-semibold text-foreground">100% pelo WhatsApp</span>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-2 p-3 rounded-xl bg-background/80"
                    >
                      <benefit.icon className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-sm text-foreground">{benefit.text}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
