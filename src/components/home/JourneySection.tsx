import { Link } from "react-router-dom";
import { ChevronRight, MessageCircle, Calculator, Calendar, Wallet, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";

const journeySteps = [
  {
    step: 1,
    icon: MessageCircle,
    title: "Cliente entra em contato",
    description: "A Clara responde instantaneamente, entende o pedido e qualifica o lead.",
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-500/20",
    iconColor: "text-blue-500",
  },
  {
    step: 2,
    icon: Calculator,
    title: "Orçamento é gerado",
    description: "O Otávio calcula materiais, perdas e aplica sua margem configurada.",
    color: "from-blue-600 to-indigo-600",
    bgColor: "bg-indigo-500/20",
    iconColor: "text-indigo-500",
  },
  {
    step: 3,
    icon: Calendar,
    title: "Visita é agendada",
    description: "O Lucas marca a visita técnica e envia lembretes automáticos.",
    color: "from-indigo-600 to-violet-600",
    bgColor: "bg-violet-500/20",
    iconColor: "text-violet-500",
  },
  {
    step: 4,
    icon: Wallet,
    title: "Financeiro organizado",
    description: "A Helena registra o valor fechado e acompanha se o projeto deu lucro.",
    color: "from-violet-600 to-purple-600",
    bgColor: "bg-purple-500/20",
    iconColor: "text-purple-500",
  },
  {
    step: 5,
    icon: Instagram,
    title: "Divulgação contínua",
    description: "A Maya ajuda você a postar e atrair novos clientes.",
    color: "from-purple-600 to-pink-600",
    bgColor: "bg-pink-500/20",
    iconColor: "text-pink-500",
  },
];

export function JourneySection() {
  return (
    <section className="py-20 md:py-28 bg-background relative overflow-hidden">
      {/* Background blobs */}
      <div className="bg-blob bg-blob-2 opacity-15" />
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[100px] pointer-events-none" />
      
      <div className="container relative z-10">
        {/* Hero da Jornada */}
        <div className="max-w-4xl mx-auto text-center mb-16 md:mb-20">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium text-primary">Sistema Integrado de IA</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
            A jornada completa do <span className="text-gradient">prestador de serviço</span>, automatizada por agentes de IA
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Do primeiro WhatsApp com o cliente até o lucro no fim do mês.
            <br className="hidden md:block" />
            <span className="font-medium text-foreground/80">Agentes que atendem, orçam, organizam, agendam e divulgam — sozinhos ou em conjunto.</span>
          </p>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link to="/agentes">
              <Button size="lg" className="gap-2 px-8">
                Conhecer os agentes
                <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="gap-2 px-8" onClick={() => {
              document.getElementById('journey-timeline')?.scrollIntoView({ behavior: 'smooth' });
            }}>
              Ver jornada integrada
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
          
          {/* Visual: Agentes Conectados */}
          <div className="relative max-w-2xl mx-auto">
            {/* Connection lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 60" preserveAspectRatio="xMidYMid meet">
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="hsl(217, 91%, 60%)" stopOpacity="0.3" />
                  <stop offset="50%" stopColor="hsl(271, 81%, 55%)" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="hsl(330, 70%, 55%)" stopOpacity="0.3" />
                </linearGradient>
              </defs>
              <path d="M40 30 Q100 10 160 30 T280 30 T360 30" stroke="url(#lineGradient)" strokeWidth="2" fill="none" strokeDasharray="5,5" className="animate-pulse" />
            </svg>
            
            {/* Agent icons */}
            <div className="flex items-center justify-between relative z-10">
              {journeySteps.map((step, index) => (
                <div key={step.step} className="flex flex-col items-center group">
                  <div className={`w-12 h-12 md:w-14 md:h-14 ${step.bgColor} rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg`}>
                    <step.icon className={`w-6 h-6 md:w-7 md:h-7 ${step.iconColor}`} />
                  </div>
                  <span className="text-xs text-muted-foreground mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {step.title.split(' ')[0]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop Timeline */}
        <div id="journey-timeline" className="hidden lg:block max-w-6xl mx-auto mb-12 scroll-mt-20">
          {/* Progress bar */}
          <div className="relative h-2 bg-muted rounded-full mb-12">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-violet-500 to-pink-500" />
            
            {/* Step indicators */}
            <div className="absolute inset-0 flex justify-between items-center">
              {journeySteps.map((step) => (
                <div
                  key={step.step}
                  className="w-8 h-8 rounded-full bg-white border-4 border-primary flex items-center justify-center shadow-lg"
                >
                  <span className="text-xs font-bold text-primary">{step.step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Step cards */}
          <div className="grid grid-cols-5 gap-4">
            {journeySteps.map((step) => (
              <div key={step.step} className="text-center">
                <div className={`w-14 h-14 ${step.bgColor} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                  <step.icon className={`w-7 h-7 ${step.iconColor}`} />
                </div>
                <h3 className="font-bold text-foreground text-sm mb-2">{step.title}</h3>
                <p className="text-xs text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Timeline */}
        <div className="lg:hidden space-y-6 mb-12">
          {journeySteps.map((step, index) => (
            <div key={step.step} className="flex gap-4 items-start">
              <div className="relative flex flex-col items-center">
                <div className={`w-12 h-12 ${step.bgColor} rounded-xl flex items-center justify-center`}>
                  <step.icon className={`w-6 h-6 ${step.iconColor}`} />
                </div>
                {index < journeySteps.length - 1 && (
                  <div className="w-0.5 h-16 bg-gradient-to-b from-primary to-violet-500 mt-2" />
                )}
              </div>
              <div className="flex-1 pt-2">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-primary">Etapa {step.step}</span>
                </div>
                <h3 className="font-bold text-foreground mb-1">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/agentes">
            <Button size="lg" className="gap-2">
              Conhecer os agentes
              <ChevronRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
