import { PricingSection } from "@/components/home";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronRight, MessageCircle, Check, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const PrecosPage = () => {
  return (
    <main className="flex-1">
        {/* Hero */}
        <section className="pt-24 md:pt-32 pb-12 md:pb-16 bg-section-beige relative overflow-hidden hero-rounded-bottom">
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `url('/hero-watermark.webp')`,
              backgroundSize: '800px',
              backgroundRepeat: 'repeat',
              opacity: 0.1,
              filter: 'sepia(1) saturate(0.3) brightness(0.6)',
            }}
          />
          <div className="container relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto text-center"
            >
              <p className="text-sm md:text-base text-muted-foreground mb-4">
                Nossos planos
              </p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-6 leading-tight">
                Preços simples e justos
                <br />
                <span className="text-primary">sem surpresa</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-6 max-w-2xl mx-auto">
                Escolha o plano ideal para a sua prestação de serviços. Sem contrato. Tudo pelo WhatsApp.
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-whatsapp/10 text-whatsapp font-medium">
                <MessageCircle className="w-5 h-5" />
                <span>Se funciona no WhatsApp, funciona pra você.</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Pricing Cards */}
        <PricingSection />

         {/* Value comparison */}
         <section className="py-12 md:py-16">
          <div className="container">
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="max-w-4xl mx-auto"
             >
               <div className="rounded-3xl bg-section-beige p-8 md:p-12 text-center">
                 <h2 className="text-2xl md:text-3xl font-black text-foreground mb-4">
                   Quanto custa perder um cliente por demora?
                 </h2>
                 <p className="text-lg text-muted-foreground mb-8">
                   O MandaUmZap custa menos que um café por dia
                   <br className="hidden md:block" />
                   — e pode te devolver horas de trabalho toda semana.
                 </p>
                 
                 <p className="text-muted-foreground mb-4">
                   👉 Quer conhecer os agentes antes de decidir?
                 </p>
                 <Link to="/agentes">
                   <Button variant="outline" className="gap-2 bg-background">
                     Ver todos os agentes
                     <ChevronRight className="w-4 h-4" />
                   </Button>
                 </Link>
               </div>
             </motion.div>
          </div>
        </section>

        {/* Benefits section */}
         <section className="py-12 md:py-16">
          <div className="container">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-10">
                Sem complicação. Do jeito que o prestador de serviço gosta.
              </h2>
              
              <div className="grid sm:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-section-green text-center">
                  <div className="w-12 h-12 rounded-full bg-whatsapp/20 flex items-center justify-center mx-auto mb-4">
                    <Check className="w-6 h-6 text-whatsapp" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">Sem contrato</h3>
                  <p className="text-sm text-muted-foreground">
                    Pague só enquanto fizer sentido.
                  </p>
                </div>
                
                <div className="p-6 rounded-2xl bg-section-green text-center">
                  <div className="w-12 h-12 rounded-full bg-whatsapp/20 flex items-center justify-center mx-auto mb-4">
                    <Check className="w-6 h-6 text-whatsapp" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">Cancele quando quiser</h3>
                  <p className="text-sm text-muted-foreground">
                    Sem multa, sem conversa difícil.
                  </p>
                </div>
                
                <div className="p-6 rounded-2xl bg-section-green text-center">
                  <div className="w-12 h-12 rounded-full bg-whatsapp/20 flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="w-6 h-6 text-whatsapp" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">Suporte no WhatsApp</h3>
                  <p className="text-sm text-muted-foreground">
                    Falou, respondeu.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Final CTA */}
         <section className="py-16 md:py-20">
          <div className="container">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
               className="max-w-4xl mx-auto"
            >
               <div className="rounded-3xl bg-section-beige p-8 md:p-12 text-center">
                 <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-6">
                   Trabalhe com mais lucro.
                   <br />
                   Com menos correria.
                 </h2>
                 <p className="text-lg text-muted-foreground mb-8">
                   E sem largar a prestação de serviços pra responder mensagem.
                 </p>
                 
                  <Link to="/carrinho">
                    <Button size="lg" className="gap-2">
                      Quero começar
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
               </div>
            </motion.div>
          </div>
        </section>
    </main>
  );
};

export default PrecosPage;
