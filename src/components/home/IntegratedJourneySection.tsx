import { Link } from "react-router-dom";
import { MessageCircle, Calculator, Wallet, Calendar, ChevronRight, Zap, Crown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Avatar imports
import claraAvatar from "@/assets/avatars/ze-atendimento-v3.webp";
import otavioAvatar from "@/assets/avatars/chico-orcamento-v3.webp";
import helenaAvatar from "@/assets/avatars/dona-conta-v3.webp";
import lucasAvatar from "@/assets/avatars/neto-agenda-v3.webp";

const journeySteps = [
  {
    step: 1,
    name: "Clara",
    role: "Atendimento e briefing",
    description: "Entende o pedido do cliente, coleta medidas e referências.",
    icon: MessageCircle,
    avatar: claraAvatar,
    color: "bg-blue-500",
    glowColor: "rgba(59, 130, 246, 0.4)",
  },
  {
    step: 2,
    name: "Otávio",
    role: "Custos reais com fornecedores",
    description: "Calcula chapas, ferragens e mão de obra com preços atualizados.",
    icon: Calculator,
    avatar: otavioAvatar,
    color: "bg-indigo-500",
    glowColor: "rgba(99, 102, 241, 0.4)",
  },
  {
    step: 3,
    name: "Helena",
    role: "Margem, prazo e lucro",
    description: "Aplica sua margem configurada e calcula o lucro do projeto.",
    icon: Wallet,
    avatar: helenaAvatar,
    color: "bg-violet-500",
    glowColor: "rgba(139, 92, 246, 0.4)",
  },
  {
    step: 4,
    name: "Clara",
    role: "Aprovação e envio ao cliente",
    description: "Envia orçamento profissional e negocia com o cliente.",
    icon: MessageCircle,
    avatar: claraAvatar,
    color: "bg-purple-500",
    glowColor: "rgba(168, 85, 247, 0.4)",
  },
  {
    step: 5,
    name: "Lucas",
    role: "Visita técnica e lembretes",
    description: "Agenda a visita, confirma e envia lembretes automáticos.",
    icon: Calendar,
    avatar: lucasAvatar,
    color: "bg-pink-500",
    glowColor: "rgba(236, 72, 153, 0.4)",
  },
];

export function IntegratedJourneySection() {
  return (
    <section className="py-20 md:py-28 bg-dark-section relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="container relative z-10">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-12 md:mb-16">
          {/* Premium badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 mb-6">
            <Crown className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-semibold text-amber-300">Jornada Integrada</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            Do WhatsApp ao lucro —{" "}
            <span className="text-gradient">automaticamente</span>
          </h2>
          <p className="text-xl md:text-2xl text-white/70">
            Ative o modo profissional e deixe os agentes trabalharem juntos.
          </p>
        </div>

        {/* Journey flow - Desktop */}
        <div className="hidden lg:block max-w-6xl mx-auto mb-12">
          <div className="relative">
            {/* Connection line */}
            <div className="absolute top-16 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-violet-500 to-pink-500 rounded-full" />
            
            {/* Steps */}
            <div className="grid grid-cols-5 gap-4">
              {journeySteps.map((step, index) => (
                <div key={step.step} className="relative flex flex-col items-center">
                  {/* Avatar with glow */}
                  <div 
                    className="relative z-10 mb-4"
                    style={{ boxShadow: `0 0 30px ${step.glowColor}` }}
                  >
                    <div className={`absolute -inset-1 ${step.color} rounded-full opacity-50 blur-sm`} />
                    <div className="relative w-20 h-20 rounded-full border-4 border-white overflow-hidden bg-white">
                      <img
                        src={step.avatar}
                        alt={step.name}
                        className="w-full h-full object-cover object-top scale-125"
                      />
                    </div>
                    {/* Step number */}
                    <div className={`absolute -bottom-1 -right-1 w-7 h-7 ${step.color} rounded-full flex items-center justify-center border-2 border-white`}>
                      <span className="text-xs font-bold text-white">{step.step}</span>
                    </div>
                  </div>

                  {/* Arrow between steps */}
                  {index < journeySteps.length - 1 && (
                    <div className="absolute top-16 -right-2 z-20">
                      <ArrowRight className="w-5 h-5 text-white/50" />
                    </div>
                  )}

                  {/* Content */}
                  <div className="text-center mt-6">
                    <h3 className="font-bold text-white text-lg mb-1">{step.name}</h3>
                    <p className="text-sm font-medium text-primary mb-2">{step.role}</p>
                    <p className="text-xs text-white/60 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Journey flow - Mobile */}
        <div className="lg:hidden space-y-6 mb-12">
          {journeySteps.map((step, index) => (
            <div key={step.step} className="flex gap-4 items-start">
              <div className="relative flex flex-col items-center">
                {/* Avatar */}
                <div 
                  className="relative"
                  style={{ boxShadow: `0 0 20px ${step.glowColor}` }}
                >
                  <div className={`absolute -inset-0.5 ${step.color} rounded-full opacity-50 blur-sm`} />
                  <div className="relative w-14 h-14 rounded-full border-3 border-white overflow-hidden bg-white">
                    <img
                      src={step.avatar}
                      alt={step.name}
                      className="w-full h-full object-cover object-top scale-125"
                    />
                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-6 h-6 ${step.color} rounded-full flex items-center justify-center border-2 border-white`}>
                    <span className="text-[10px] font-bold text-white">{step.step}</span>
                  </div>
                </div>
                {/* Connector line */}
                {index < journeySteps.length - 1 && (
                  <div className="w-0.5 h-12 bg-gradient-to-b from-primary to-violet-500 mt-2" />
                )}
              </div>
              <div className="flex-1 pt-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-white">{step.name}</h3>
                  <step.icon className="w-4 h-4 text-white/50" />
                </div>
                <p className="text-sm font-medium text-primary mb-1">{step.role}</p>
                <p className="text-sm text-white/60">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Plan label + CTA */}
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20">
            <Zap className="w-5 h-5 text-amber-400" />
            <span className="text-white font-medium">
              Disponível no plano <span className="text-gradient font-bold">Jornada Integrada</span>
            </span>
          </div>
          
          <div>
            <Link to="/precos">
              <Button size="lg" className="gap-2">
                Ver planos e preços
                <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
