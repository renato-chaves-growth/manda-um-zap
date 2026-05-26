import { Users, Zap, Link2 } from "lucide-react";

// Avatar imports
import claraAvatar from "@/assets/avatars/ze-atendimento-v3.webp";
import otavioAvatar from "@/assets/avatars/chico-orcamento-v3.webp";
import lucasAvatar from "@/assets/avatars/neto-agenda-v3.webp";
import helenaAvatar from "@/assets/avatars/dona-conta-v3.webp";
import mayaAvatar from "@/assets/avatars/zeca-instagram-v3.webp";

const agentAvatars = [
  { name: "Clara", avatar: claraAvatar },
  { name: "Otávio", avatar: otavioAvatar },
  { name: "Lucas", avatar: lucasAvatar },
  { name: "Helena", avatar: helenaAvatar },
  { name: "Maya", avatar: mayaAvatar },
];

export function ConceptSection() {
  return (
    <section className="py-12 md:py-16">
      <div className="container">
        <div className="bg-section-beige rounded-3xl relative overflow-hidden p-8 md:p-12 lg:p-16 brutalist-outline">
          {/* Background decoration - subtle primary tints */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary/3 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Users className="w-4 h-4" />
            O conceito
          </div>
          
          {/* Title - Pipefy light weight style with gradient accent */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-6 leading-tight tracking-tight">
            Não é um robô.{" "}
            <span className="text-gradient font-black">É uma equipe.</span>
          </h2>
          
          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-12 max-w-3xl mx-auto">
            O <strong className="text-foreground">MandaUmZap</strong> funciona como uma equipe de agentes de IA especializados.
            Cada agente cuida de uma parte da prestação de serviços.{" "}
            <span className="text-primary font-medium">
              Você pode usar agentes separados ou ativar o modo integrado, onde eles trabalham juntos na jornada completa.
            </span>
          </p>

          {/* Visual: Connected agents - cleaner style with primary colors only */}
          <div className="relative max-w-3xl mx-auto">
            {/* Connection lines SVG - primary color gradient */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 600 120" preserveAspectRatio="xMidYMid meet">
              <defs>
                <linearGradient id="conceptLineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="hsl(217, 91%, 60%)" stopOpacity="0.3" />
                  <stop offset="50%" stopColor="hsl(217, 91%, 50%)" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="hsl(217, 91%, 60%)" stopOpacity="0.3" />
                </linearGradient>
              </defs>
              {/* Main connection line */}
              <path 
                d="M60 60 Q150 30 240 60 T420 60 T540 60" 
                stroke="url(#conceptLineGradient)" 
                strokeWidth="3" 
                fill="none" 
                strokeDasharray="8,4"
                className="animate-pulse"
              />
              {/* Additional connecting arcs */}
              <path 
                d="M120 60 Q180 90 240 60" 
                stroke="url(#conceptLineGradient)" 
                strokeWidth="2" 
                fill="none" 
                opacity="0.4"
              />
              <path 
                d="M360 60 Q420 90 480 60" 
                stroke="url(#conceptLineGradient)" 
                strokeWidth="2" 
                fill="none" 
                opacity="0.4"
              />
            </svg>

            {/* Agent avatars - unified primary style */}
            <div className="flex items-center justify-between relative z-10 px-4">
              {agentAvatars.map((agent, index) => (
                <div key={agent.name} className="flex flex-col items-center group">
                  <div className="relative">
                    {/* Glow ring - primary color only */}
                    <div className="absolute -inset-1 bg-primary rounded-full opacity-20 blur-sm group-hover:opacity-40 transition-opacity" />
                    {/* Avatar */}
                    <div className="relative w-14 h-14 md:w-20 md:h-20 rounded-full border-3 border-white shadow-lg overflow-hidden bg-white ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all">
                      <img
                        src={agent.avatar}
                        alt={agent.name}
                        className="w-full h-full object-cover object-top scale-125"
                      />
                    </div>
                    {/* Connection indicator - primary color */}
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center border-2 border-white">
                      <Link2 className="w-2.5 h-2.5 text-primary-foreground" />
                    </div>
                  </div>
                  <span className="text-xs md:text-sm font-medium text-foreground mt-3">{agent.name}</span>
                </div>
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
