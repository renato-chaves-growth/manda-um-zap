import { Link } from "react-router-dom";
import { ChevronRight, Bot, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

// Avatar imports - v2 versions
import claraAvatar from "@/assets/avatars/ze-atendimento-v3.webp";
import otavioAvatar from "@/assets/avatars/chico-orcamento-v3.webp";
import lucasAvatar from "@/assets/avatars/neto-agenda-v3.webp";
import helenaAvatar from "@/assets/avatars/dona-conta-v3.webp";
import mayaAvatar from "@/assets/avatars/zeca-instagram-v3.webp";

const agents = [
  {
    id: "clara",
    name: "Clara",
    role: "Agente de Atendimento",
    avatar: claraAvatar,
    stage: 1,
    gradient: "from-blue-400 to-blue-600",
    glowColor: "rgba(59, 130, 246, 0.5)",
    tasks: [
      "Responde clientes no WhatsApp",
      "Entende pedidos por áudio ou texto",
      "Filtra curiosos de clientes reais",
    ],
    benefit: "Você não perde cliente por demora.",
  },
  {
    id: "otavio",
    name: "Otávio",
    role: "Agente de Orçamento",
    avatar: otavioAvatar,
    stage: 2,
    gradient: "from-blue-500 to-indigo-600",
    glowColor: "rgba(99, 102, 241, 0.5)",
    tasks: [
      "Calcula MDF, chapas e perdas",
      "Aplica sua margem configurada",
      "Gera orçamento profissional em minutos",
    ],
    benefit: "Orçamento rápido, sem medo de errar.",
  },
  {
    id: "lucas",
    name: "Lucas",
    role: "Agente de Agendamentos",
    avatar: lucasAvatar,
    stage: 3,
    gradient: "from-indigo-500 to-violet-600",
    glowColor: "rgba(139, 92, 246, 0.5)",
    tasks: [
      "Agenda visitas técnicas",
      "Confirma e envia lembretes",
      "Reagenda automaticamente",
    ],
    benefit: "Você não perde visita nem passa vergonha.",
  },
  {
    id: "helena",
    name: "Helena",
    role: "Agente Financeira",
    avatar: helenaAvatar,
    stage: 4,
    gradient: "from-violet-500 to-purple-600",
    glowColor: "rgba(168, 85, 247, 0.5)",
    tasks: [
      "Registra valores fechados",
      "Controla entradas e saldos",
      "Mostra se o projeto deu lucro",
    ],
    benefit: "Você sabe se ganhou dinheiro de verdade.",
  },
  {
    id: "maya",
    name: "Maya",
    role: "Agente de Divulgação",
    avatar: mayaAvatar,
    stage: 5,
    gradient: "from-purple-500 to-pink-600",
    glowColor: "rgba(236, 72, 153, 0.5)",
    tasks: [
      "Cria legendas para posts",
      "Sugere stories e hashtags",
      "Ajuda você a divulgar sem perder tempo",
    ],
    benefit: "Você divulga sem virar influencer.",
  },
];

export function AgentsPreviewSection() {
  return (
    <section className="py-20 md:py-28 bg-dark-section">
      <div className="container">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary mb-6">
            <Bot className="w-4 h-4" />
            <span className="text-sm font-medium">Agentes de IA</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Um ajudante para cada etapa da sua <span className="text-gradient">jornada</span>
          </h2>
          <p className="text-lg md:text-xl text-white/70">
            Assistentes inteligentes especializados, cada um cuidando de uma parte do seu dia a dia — todos dentro do WhatsApp.
          </p>
        </div>

        {/* Journey indicator */}
        <div className="flex justify-center items-center gap-2 mb-12">
          <span className="text-sm text-white/50">Atendimento</span>
          <div className="w-32 md:w-48 h-1 rounded-full bg-gradient-to-r from-blue-500 via-violet-500 to-pink-500" />
          <span className="text-sm text-white/50">Divulgação</span>
        </div>

        {/* Story-style cards with AI effect */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 mb-12">
          {agents.map((agent) => (
            <div
              key={agent.id}
              className="story-card relative aspect-[3/5] rounded-3xl overflow-hidden cursor-pointer group transition-transform duration-300 hover:scale-[1.02]"
              style={{
                boxShadow: `0 0 30px ${agent.glowColor}, 0 0 60px ${agent.glowColor}`,
              }}
            >
              {/* Animated gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${agent.gradient}`} />
              
              {/* AI scan lines effect */}
              <div className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)',
                }}
              />
              
              {/* Stage number */}
              <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <span className="text-sm font-bold text-white">{agent.stage}</span>
              </div>

              {/* AI badge with glow */}
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
                <span className="text-xs font-bold text-white tracking-wider">AI</span>
              </div>

              {/* Avatar face with AI glow ring */}
              <div className="absolute inset-x-0 top-10 flex justify-center">
                <div 
                  className="relative w-28 h-28 md:w-32 md:h-32 rounded-full"
                  style={{
                    boxShadow: `0 0 20px ${agent.glowColor}, 0 0 40px ${agent.glowColor}`,
                  }}
                >
                  {/* Rotating AI ring */}
                  <div 
                    className="absolute -inset-1 rounded-full animate-spin-slow"
                    style={{
                      background: `conic-gradient(from 0deg, transparent, ${agent.glowColor}, transparent, ${agent.glowColor}, transparent)`,
                      animationDuration: '4s',
                    }}
                  />
                  {/* White inner circle */}
                  <div className="absolute inset-0.5 rounded-full bg-white overflow-hidden">
                    <img
                      src={agent.avatar}
                      alt={agent.name}
                      className="w-full h-full object-cover object-top scale-125"
                    />
                  </div>
                </div>
              </div>

              {/* Basic info (always visible) */}
              <div className="absolute bottom-0 inset-x-0 p-4 pt-6 text-center bg-gradient-to-t from-black/70 via-black/40 to-transparent">
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/10 backdrop-blur-sm mb-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-[10px] font-medium text-white/80 uppercase tracking-wider">IA Ativa</span>
                </div>
                <h3 className="font-bold text-xl md:text-2xl text-white mb-0.5 drop-shadow-lg">
                  {agent.name}
                </h3>
                <p className="text-sm text-white/80 drop-shadow">
                  {agent.role}
                </p>
              </div>

              {/* Hover overlay with details */}
              <div className="story-overlay absolute inset-0 bg-black/85 backdrop-blur-sm flex flex-col justify-end p-5">
                <h3 className="font-bold text-white text-lg mb-1">{agent.name}</h3>
                <p className="text-sm text-white/60 mb-4">{agent.role}</p>
                
                <ul className="space-y-2 mb-4">
                  {agent.tasks.map((task, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white/90">{task}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-3 border-t border-white/20">
                  <p className="text-sm font-medium text-gradient">{agent.benefit}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/agentes">
            <Button size="lg" variant="secondary" className="gap-2">
              Conheça os agentes em detalhe
              <ChevronRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
