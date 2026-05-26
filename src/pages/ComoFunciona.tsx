import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { 
  MessageCircle, 
  MessageSquare, 
  Users, 
  Mic, 
  Settings2, 
  TrendingUp 
} from "lucide-react";
import { Link } from "react-router-dom";

const WHATSAPP_LINK = "https://wa.me/5500000000000?text=Olá! Quero conhecer o MandaUmZap";

const steps = [
  {
    number: 1,
    icon: MessageSquare,
    title: "Você fala pelo WhatsApp",
    description: "Mande mensagem ou áudio, do jeito que você já usa todo dia.",
  },
  {
    number: 2,
    icon: Users,
    title: "Escolhe seus agentes",
    description: "Escolha quem vai te ajudar: atendimento, orçamento, agenda, financeiro ou divulgação. Comece com um agente e evolua quando quiser.",
  },
  {
    number: 3,
    icon: Mic,
    title: "Fale por áudio ou texto",
    description: "Não precisa digitar. Os agentes entendem áudio e texto normalmente.",
  },
  {
    number: 4,
    icon: Settings2,
    title: "Os agentes trabalham",
    description: "Enquanto você está na prestação de serviços, os agentes respondem clientes, fazem orçamentos e organizam sua agenda.",
  },
  {
    number: 5,
    icon: TrendingUp,
    title: "Você ganha tempo e lucra melhor",
    description: "Menos correria, mais projetos fechados e mais lucro no fim do mês.",
  },
];

const ComoFuncionaPage = () => {
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
              Entenda o processo
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-6 leading-tight">
              Trabalhar mais não significa
              <br />
              <span className="text-primary">ganhar mais</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              O MandaUmZap ajuda você a ganhar tempo, atender melhor e lucrar mais — usando apenas o WhatsApp.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {/* Vertical line */}
              <div 
                className="absolute left-8 top-8 bottom-8 w-0.5 hidden md:block"
                style={{ backgroundColor: "#E5E7EB" }}
              />
              
              <div className="space-y-6 md:space-y-8">
                {steps.map((step, index) => (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative flex gap-5 md:gap-6"
                  >
                    {/* Number badge */}
                    <div 
                      className="relative z-10 flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-2xl text-white flex items-center justify-center font-bold text-xl shadow-sm"
                      style={{ backgroundColor: "#25D366" }}
                    >
                      {step.number}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 pt-1 md:pt-2">
                      <div className="flex items-center gap-2.5 mb-1.5">
                        <step.icon 
                          className="w-5 h-5" 
                          style={{ color: "#075E54" }} 
                        />
                        <h3 className="text-lg md:text-xl font-semibold text-foreground">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Closing Statement */}
      <section className="py-12 md:py-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
             className="max-w-4xl mx-auto"
          >
            <div 
               className="rounded-3xl bg-section-beige p-8 md:p-12 text-center"
            >
              <div className="space-y-2 mb-6">
                <p className="text-lg md:text-xl font-medium text-foreground">
                  Mais clientes atendidos.
                </p>
                <p className="text-lg md:text-xl font-medium text-foreground">
                  Menos tempo no celular.
                </p>
                <p className="text-lg md:text-xl font-medium text-foreground">
                  Mais tempo produzindo.
                </p>
              </div>
              <div className="pt-4 border-t border-border/30">
                <p className="text-muted-foreground text-base md:text-lg">
                  Você cuida da produção.
                  <br />
                   <span className="font-semibold text-primary">
                    O MandaUmZap cuida do resto.
                  </span>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
       <section className="py-12 md:py-16">
         <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
             className="max-w-4xl mx-auto"
          >
             <div className="rounded-3xl bg-section-beige p-8 md:p-12 text-center">
               <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-3">
                 Simples assim. Quer experimentar?
               </h2>
               <p className="text-lg text-muted-foreground mb-8">
                 Conheça os agentes e escolha os que fazem sentido pra você.
               </p>
               <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                 <Link to="/agentes">
                   <Button size="lg" className="gap-2">
                     Conhecer os agentes
                   </Button>
                 </Link>
                 <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                   <Button
                     size="lg"
                     variant="outline"
                     className="gap-2 bg-background"
                   >
                     <MessageCircle className="w-5 h-5" />
                     Tirar dúvidas
                   </Button>
                 </a>
               </div>
             </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default ComoFuncionaPage;
