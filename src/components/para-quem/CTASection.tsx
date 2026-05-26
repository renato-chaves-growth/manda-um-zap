import { Button } from "@/components/ui/button";
import { MessageCircle, ChevronRight, Check, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const WHATSAPP_LINK = "https://wa.me/5500000000000?text=Olá! Quero conhecer o MandaUmZap";

const benefits = [
  "Sem contrato",
  "Cancela quando quiser",
  "Suporte pelo WhatsApp",
];

export function CTASection() {
  return (
     <section className="py-12 md:py-16">
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
           className="rounded-3xl bg-section-beige p-6 md:p-10 max-w-4xl mx-auto"
        >
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* Lado esquerdo - Texto */}
            <div className="lg:w-1/2 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <Sparkles className="w-4 h-4" />
                Comece agora
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-foreground mb-4">
                Se você é prestador de serviço e usa WhatsApp,{" "}
                <span className="text-primary">isso é pra você.</span>
              </h2>
              <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-6">
                {benefits.map((benefit, index) => (
                  <span 
                    key={index}
                    className="inline-flex items-center gap-1.5 text-sm text-muted-foreground"
                  >
                    <Check className="w-4 h-4 text-primary" />
                    {benefit}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Lado direito - CTAs */}
            <div className="lg:w-1/2 flex flex-col sm:flex-row lg:flex-col gap-3 w-full max-w-sm">
              <Link to="/como-funciona" className="w-full">
                <Button size="lg" className="w-full gap-2">
                  Ver como funciona
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </Link>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="w-full">
                <Button size="lg" variant="outline" className="w-full gap-2 bg-background">
                  <MessageCircle className="w-5 h-5" />
                  Tirar dúvidas
                </Button>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
