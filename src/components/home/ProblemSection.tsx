import { Link } from "react-router-dom";
import { MessageCircle, Camera, Package, Calculator, CalendarCheck, Wallet, Instagram, ArrowRight, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef, useState, useEffect } from "react";

const problems = [
  {
    icon: MessageCircle,
    title: "Atender cliente no WhatsApp",
    description: "Mensagem atrás de mensagem, o dia inteiro. E ainda precisa responder rápido pra não perder.",
    color: "group-hover:bg-blue-500",
    iconColor: "group-hover:text-white text-blue-500",
  },
  {
    icon: Camera,
    title: "Pedir medidas, fotos e referências",
    description: "Ficar cobrando informação, enviar modelo de foto, explicar o que precisa... toda vez.",
    color: "group-hover:bg-blue-600",
    iconColor: "group-hover:text-white text-blue-600",
  },
  {
    icon: Package,
    title: "Orçar com fornecedor",
    description: "Pesquisar preço de material, calcular chapa, planejar corte. Dá trabalho e leva tempo.",
    color: "group-hover:bg-indigo-500",
    iconColor: "group-hover:text-white text-indigo-500",
  },
  {
    icon: Calculator,
    title: "Calcular margem no improviso",
    description: "Chuta o preço, reza pra dar lucro. Sem tempo pra calcular direito.",
    color: "group-hover:bg-violet-500",
    iconColor: "group-hover:text-white text-violet-500",
  },
  {
    icon: CalendarCheck,
    title: "Não esquecer visita técnica",
    description: "Agendar, lembrar, confirmar com o cliente. E torcer pra não dar conflito de horário.",
    color: "group-hover:bg-purple-500",
    iconColor: "group-hover:text-white text-purple-500",
  },
  {
    icon: Wallet,
    title: "Controlar entradas, parcelas e lucro",
    description: "Anotar em papel, planilha, caderno. E no fim, não sabe se o projeto deu lucro.",
    color: "group-hover:bg-pink-500",
    iconColor: "group-hover:text-white text-pink-500",
  },
  {
    icon: Instagram,
    title: "Ainda tentar postar no Instagram",
    description: "Tirar foto do móvel pronto, editar, pensar legenda... quando sobra tempo.",
    color: "group-hover:bg-rose-500",
    iconColor: "group-hover:text-white text-rose-500",
  },
];

export function ProblemSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    let scrollSpeed = 0.5;

    const animate = () => {
      if (!isPaused && scrollContainer) {
        scrollContainer.scrollLeft += scrollSpeed;
        
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
          scrollContainer.scrollLeft = 0;
        }
      }
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, [isPaused]);

  return (
    <section className="relative py-16 md:py-20 overflow-hidden">
      {/* Background blob */}
      <div className="bg-blob bg-blob-3" />
      
      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-10 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-foreground mb-4 leading-tight">
            Ser prestador de serviço hoje é fazer tudo ao mesmo tempo
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            No dia a dia da prestação de serviços, você precisa dar conta de tudo isso:
          </p>
        </div>

        <div 
          ref={scrollRef}
          className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide pb-4 -mx-6 px-6"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {problems.map((problem, index) => (
            <div
              key={index}
              className="group problem-card p-6 rounded-2xl bg-card border border-border/50 cursor-pointer flex-shrink-0 w-72 md:w-80 transition-transform duration-300 hover:scale-105"
            >
              <div className={`w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center mb-4 transition-all duration-300 ${problem.color}`}>
                <problem.icon className={`w-7 h-7 transition-colors duration-300 ${problem.iconColor}`} />
              </div>
              <h3 className="font-semibold text-lg text-foreground mb-2 group-hover:text-gradient transition-all duration-300">
                {problem.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {problem.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10 md:mt-12 space-y-6">
          <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-primary/10 to-violet-500/10 border border-primary/20">
            <ArrowRight className="w-5 h-5 text-primary" />
            <p className="text-lg font-medium">
              O <span className="text-gradient font-bold">MandaUmZap</span> assume o operacional para você focar em produzir e vender bem.
            </p>
          </div>
          
          <div>
            <Link to="/agentes">
              <Button className="gap-2">
                Conhecer os agentes
                <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
