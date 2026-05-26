import { Button } from "@/components/ui/button";
import { MessageCircle, Zap, CheckCircle, Rocket } from "lucide-react";
import { motion } from "framer-motion";

const WHATSAPP_ACTIVATION_LINK =
  "https://wa.me/5500000000000?text=Quero%20ativar%20meu%20teste%20do%20MandaUmZap";

const steps = [
  {
    icon: Zap,
    emoji: "⚡",
    text: "Cadastro feito em 40 segundos",
  },
  {
    icon: CheckCircle,
    emoji: "🟢",
    text: "Configuração pelo WhatsApp leva 3 minutos",
  },
  {
    icon: Rocket,
    emoji: "🚀",
    text: "Comece agora",
  },
];

const CadastroSucesso = () => {
  return (
    <main className="flex-1 pt-24 md:pt-32 pb-16 flex items-center justify-center bg-background">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-lg mx-auto text-center"
          >
            {/* Success checkmark */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 rounded-full bg-whatsapp/10 flex items-center justify-center mx-auto mb-8"
            >
              <CheckCircle className="w-10 h-10 text-whatsapp" />
            </motion.div>

            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Seu time está
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg, #075E54, #25D366)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                quase pronto.
              </span>
            </h1>

            <p className="text-lg text-muted-foreground mb-8">
              Agora vamos para o WhatsApp finalizar sua configuração.
              <br />
              É lá que o MandaUmZap vai funcionar.
            </p>

            {/* Steps */}
            <div className="space-y-4 mb-10">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.15 }}
                  className="flex items-center gap-4 bg-card rounded-xl p-4 border border-border/50 text-left"
                >
                  <span className="text-xl flex-shrink-0">{step.emoji}</span>
                  <span className="text-sm font-medium text-foreground">{step.text}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <a
                href={WHATSAPP_ACTIVATION_LINK}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  className="gap-3 h-14 px-10 text-lg"
                >
                  <MessageCircle className="w-6 h-6" />
                  Continuar no WhatsApp
                </Button>
              </a>
            </motion.div>
          </motion.div>
        </div>
    </main>
  );
};

export default CadastroSucesso;
