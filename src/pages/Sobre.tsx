import { Button } from "@/components/ui/button";
import { MessageCircle, Target, Compass, Eye, ChevronRight, Check, Heart, Clock, Brain, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const WHATSAPP_LINK = "https://wa.me/5500000000000?text=Olá! Quero conhecer o MandaUmZap";

const values = [
  {
    icon: Target,
    title: "Propósito",
    description: "Simplificar a vida de quem vive da prestação de serviços. A prestação de serviços já é difícil o suficiente. Nossa missão é tirar o peso do atendimento, dos orçamentos, da agenda e do controle financeiro.",
  },
  {
    icon: Compass,
    title: "Missão",
    description: "Usar tecnologia simples para ajudar o prestador de serviço a trabalhar melhor, ganhar mais, perder menos tempo com burocracia e atender mais clientes sem parar a produção.",
  },
  {
    icon: Eye,
    title: "Visão",
    description: "Ser o principal assistente digital do prestador de serviço no Brasil — presente em toda prestação de serviços que quer crescer, sem perder a simplicidade.",
  },
];

const missionPoints = [
  { text: "Trabalhar melhor", emoji: "🛠️" },
  { text: "Ganhar mais", emoji: "💰" },
  { text: "Perder menos tempo com burocracia", emoji: "⏱️" },
  { text: "Atender mais clientes sem parar a produção", emoji: "📈" },
];

const assistantBenefits = [
  { icon: Clock, text: "Não tira férias" },
  { icon: Brain, text: "Não esquece" },
  { icon: Zap, text: "Trabalha 24h por dia" },
  { icon: Heart, text: "Não dorme" },
];

const ctaBenefits = [
  "Sem contrato",
  "Cancela quando quiser",
  "Suporte pelo WhatsApp",
];

const SobrePage = () => {
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
            <div className="max-w-4xl mx-auto text-center">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm md:text-base text-muted-foreground mb-4"
              >
                Sobre o MandaUmZap
              </motion.p>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-6 leading-tight"
              >
                Nascemos para ajudar quem trabalha duro
                <br />
                <span className="text-primary">construindo móveis — não planilhas.</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto"
              >
                O MandaUmZap nasceu da vontade de facilitar a vida de quem vive da prestação de serviços.
                De quem passa o dia produzindo, resolvendo problema, atendendo cliente e ainda precisa cuidar de tudo sozinho.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Belief Statement */}
        <section className="py-10 md:py-14">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                <div className="lg:w-1/2">
                  <h2 className="text-2xl md:text-3xl font-black text-foreground mb-4">
                    Acreditamos que <span className="text-primary">tecnologia boa</span> é aquela que some.
                  </h2>
                </div>
                <div className="lg:w-1/2">
                  <div className="space-y-3">
                    <p className="text-muted-foreground flex items-center gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0" />
                      Que ajuda sem atrapalhar.
                    </p>
                    <p className="text-muted-foreground flex items-center gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0" />
                      Que resolve sem complicar.
                    </p>
                    <p className="text-muted-foreground flex items-center gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0" />
                      Que funciona onde você já está.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values - Horizontal Cards */}
         <section className="py-10 md:py-14">
          <div className="container">
             <div className="rounded-3xl bg-section-beige p-6 md:p-10 max-w-5xl mx-auto">
               <div className="grid md:grid-cols-3 gap-4">
              {values.map((value, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="p-5 rounded-2xl bg-background border border-border hover:border-primary/20 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              ))}
               </div>
            </div>
          </div>
        </section>

        {/* Mission Points - Split Layout */}
        <section className="py-10 md:py-14">
          <div className="container">
            <div className="max-w-5xl mx-auto">
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                <div className="lg:w-2/5">
                  <h2 className="text-2xl md:text-3xl font-black text-foreground mb-4">
                    Nossa missão é usar <span className="text-primary">tecnologia simples</span> para ajudar o prestador de serviço a:
                  </h2>
                  <p className="text-muted-foreground text-sm">
                    Tudo isso sem sistema complicado, sem computador e sem mudar a rotina.
                  </p>
                </div>
                <div className="lg:w-3/5">
                  <div className="grid sm:grid-cols-2 gap-3">
                    {missionPoints.map((point, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-3 p-4 rounded-xl bg-[#EEFAE5] border border-primary/10"
                      >
                        <span className="text-2xl">{point.emoji}</span>
                        <span className="font-medium text-foreground">{point.text}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why We Created - Story */}
         <section className="py-10 md:py-14">
          <div className="container">
             <div className="rounded-3xl bg-section-beige p-6 md:p-10 max-w-5xl mx-auto">
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                <div className="lg:w-1/2">
                  <h2 className="text-2xl md:text-3xl font-black text-foreground mb-6">
                    Por que criamos o <span className="text-primary">MandaUmZap</span>?
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      Conhecemos prestadores de serviço que são <strong className="text-foreground">verdadeiros artistas</strong> no que fazem. Criam móveis incríveis. Transformam projetos em realidade. Entregam qualidade de verdade.
                    </p>
                    <p>
                      Mas esses mesmos profissionais acabam perdendo cliente por demora no WhatsApp, errando orçamento por falta de tempo, esquecendo visitas, ou trabalhando muito sem saber exatamente quanto estão lucrando.
                    </p>
                  </div>
                </div>
                <div className="lg:w-1/2 flex flex-col justify-center">
                  <div className="p-6 rounded-2xl bg-background border-2 border-primary/20">
                    <p className="text-xl md:text-2xl font-bold text-foreground mb-3">
                      O problema nunca foi a prestação de serviços.
                    </p>
                    <p className="text-xl md:text-2xl font-bold text-primary">
                      O problema é fazer tudo sozinho.
                    </p>
                    <div className="mt-4 pt-4 border-t border-border">
                      <p className="text-sm text-muted-foreground">
                        Foi por isso que criamos o MandaUmZap.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How We Think Tech */}
        <section className="py-10 md:py-14">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-black text-foreground mb-6">
                Como pensamos a <span className="text-primary">tecnologia</span>
              </h2>
              <div className="p-6 md:p-8 rounded-2xl bg-[#EEFAE5] border border-primary/20 mb-6">
                <p className="text-lg md:text-xl text-foreground mb-4">
                  Criamos assistentes inteligentes que funcionam onde o prestador de serviço já está:
                  <strong className="text-primary"> no WhatsApp.</strong>
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <span className="px-4 py-2 rounded-full bg-background text-sm font-medium text-muted-foreground">
                    Sem app novo
                  </span>
                  <span className="px-4 py-2 rounded-full bg-background text-sm font-medium text-muted-foreground">
                    Sem sistema complicado
                  </span>
                  <span className="px-4 py-2 rounded-full bg-background text-sm font-medium text-muted-foreground">
                    Sem curva de aprendizado
                  </span>
                </div>
              </div>
              <p className="text-muted-foreground">
                É só falar por texto ou áudio — e os assistentes cuidam do resto.
              </p>
            </div>
          </div>
        </section>

        {/* In Few Words - Assistant Benefits */}
         <section className="py-10 md:py-14">
          <div className="container">
             <div className="rounded-3xl bg-section-beige p-6 md:p-10 max-w-5xl mx-auto">
              <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                <div className="lg:w-1/2">
                  <h2 className="text-2xl md:text-3xl font-black text-foreground mb-4">
                    Em poucas palavras
                  </h2>
                  <p className="text-xl md:text-2xl font-bold text-foreground">
                    O MandaUmZap é o <span className="text-primary">braço direito</span> do prestador de serviço.
                  </p>
                </div>
                <div className="lg:w-1/2">
                  <div className="grid grid-cols-2 gap-3">
                    {assistantBenefits.map((benefit, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-3 p-4 rounded-xl bg-background border border-border"
                      >
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <benefit.icon className="w-5 h-5 text-primary" />
                        </div>
                        <span className="text-sm font-medium text-foreground">{benefit.text}</span>
                      </motion.div>
                    ))}
                  </div>
                  <p className="text-center text-sm text-muted-foreground mt-4">
                    Para que você possa produzir mais, com menos correria e mais lucro.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Final */}
         <section className="py-12 md:py-16">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
               className="rounded-3xl bg-section-beige p-6 md:p-10 max-w-4xl mx-auto"
            >
              <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                <div className="lg:w-1/2 text-center lg:text-left">
                  <h2 className="text-2xl md:text-3xl font-black text-foreground mb-2">
                    Feito para quem vive da prestação de serviços.
                  </h2>
                  <p className="text-xl text-primary font-medium mb-6">
                    Do jeito que o prestador de serviço trabalha.
                  </p>
                  <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                    {ctaBenefits.map((benefit, index) => (
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
    </main>
  );
};

export default SobrePage;
