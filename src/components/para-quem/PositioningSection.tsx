import { Check, X, ThumbsUp, ThumbsDown } from "lucide-react";
import { motion } from "framer-motion";

const forWho = [
  { text: "Quer atender mais clientes sem parar a produção", emoji: "🛠️" },
  { text: "Quer orçar mais rápido e sem erro", emoji: "⚡" },
  { text: "Quer ganhar mais sem trabalhar mais horas", emoji: "💰" },
  { text: "Usa WhatsApp como principal ferramenta de trabalho", emoji: "📱" },
];

const notForWho = [
  "Não usa WhatsApp",
  "Não quer mudar nada na forma de trabalhar",
  "Prefere continuar perdendo cliente por demora",
  "Acha normal trabalhar muito e ganhar pouco",
];

export function PositioningSection() {
  return (
    <section className="py-10 md:py-14">
      <div className="container">
        <div className="max-w-5xl mx-auto">
          {/* Header centralizado */}
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-black text-foreground">
              Pra quem é o <span className="text-primary">MandaUmZap</span>?
            </h2>
          </div>
          
          {/* Layout horizontal para desktop */}
          <div className="grid lg:grid-cols-5 gap-4">
            
            {/* For who - 3 colunas (60%) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-3 p-5 md:p-6 rounded-2xl bg-[#EEFAE5] border border-primary/20"
            >
              <div className="flex items-center gap-2 mb-4">
                <ThumbsUp className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-foreground">É pra quem:</h3>
              </div>
              
              <div className="space-y-2">
                {forWho.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3 p-3 rounded-xl bg-background/80"
                  >
                    <span className="text-lg flex-shrink-0">{item.emoji}</span>
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <p className="text-sm text-foreground">{item.text}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            {/* Not for who - 2 colunas (40%) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="lg:col-span-2 p-5 md:p-6 rounded-2xl bg-muted/50 border border-border"
            >
              <div className="flex items-center gap-2 mb-4">
                <ThumbsDown className="w-5 h-5 text-muted-foreground" />
                <h3 className="font-semibold text-muted-foreground">Não é pra quem:</h3>
              </div>
              
              <div className="space-y-2">
                {notForWho.map((item, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-xl bg-background/50">
                    <X className="w-4 h-4 text-red-400 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
