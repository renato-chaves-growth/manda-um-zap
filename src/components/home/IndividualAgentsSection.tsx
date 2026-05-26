import { Link } from "react-router-dom";
import { MessageCircle, Calculator, Calendar, Wallet, Instagram, ChevronRight, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

// Avatar imports
import claraAvatar from "@/assets/avatars/ze-atendimento-v3.webp";
import otavioAvatar from "@/assets/avatars/chico-orcamento-v3.webp";
import lucasAvatar from "@/assets/avatars/neto-agenda-v3.webp";
import helenaAvatar from "@/assets/avatars/dona-conta-v3.webp";
import mayaAvatar from "@/assets/avatars/zeca-instagram-v3.webp";

const agents = [
  {
    id: "clara",
    name: "Clara",
    role: "Atendimento no WhatsApp",
    description: "Responde clientes, entende pedidos e filtra curiosos.",
    icon: MessageCircle,
    avatar: claraAvatar,
    gradient: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-500/10",
    iconColor: "text-blue-500",
  },
  {
    id: "otavio",
    name: "Otávio",
    role: "Orçamentos com fornecedores",
    description: "Calcula materiais, perdas e gera orçamento profissional.",
    icon: Calculator,
    avatar: otavioAvatar,
    gradient: "from-indigo-500 to-indigo-600",
    bgColor: "bg-indigo-500/10",
    iconColor: "text-indigo-500",
  },
  {
    id: "lucas",
    name: "Lucas",
    role: "Agenda e visitas técnicas",
    description: "Marca visitas, confirma e envia lembretes automáticos.",
    icon: Calendar,
    avatar: lucasAvatar,
    gradient: "from-violet-500 to-violet-600",
    bgColor: "bg-violet-500/10",
    iconColor: "text-violet-500",
  },
  {
    id: "helena",
    name: "Helena",
    role: "Financeiro e lucro real",
    description: "Controla entradas, parcelas e mostra se deu lucro.",
    icon: Wallet,
    avatar: helenaAvatar,
    gradient: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-500/10",
    iconColor: "text-purple-500",
  },
  {
    id: "maya",
    name: "Maya",
    role: "Postagens automáticas",
    description: "Cria legendas, sugere stories e ajuda na divulgação.",
    icon: Instagram,
    avatar: mayaAvatar,
    gradient: "from-pink-500 to-pink-600",
    bgColor: "bg-pink-500/10",
    iconColor: "text-pink-500",
  },
];

export function IndividualAgentsSection() {
  return (
    <section className="py-20 md:py-28 bg-background relative overflow-hidden">
      {/* Background blob */}
      <div className="bg-blob bg-blob-2 opacity-10" />
      
      <div className="container relative z-10">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-4">
            Agentes <span className="text-gradient font-black">Individuais</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground">
            Use só o que você precisa, quando quiser.
          </p>
        </div>

        {/* Agent cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-10">
          {agents.map((agent) => (
            <Link
              key={agent.id}
              to={`/agente/${agent.id}`}
              onClick={() => window.scrollTo(0, 0)}
              className="group bg-card rounded-2xl p-6 brutalist-box brutalist-hover transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <div className={`absolute -inset-1 bg-gradient-to-br ${agent.gradient} rounded-full opacity-30 blur-sm group-hover:opacity-50 transition-opacity`} />
                  <div className="relative w-16 h-16 rounded-full border-2 border-white shadow-md overflow-hidden bg-white">
                    <img
                      src={agent.avatar}
                      alt={agent.name}
                      className="w-full h-full object-cover object-top scale-125"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                      {agent.name}
                    </h3>
                    <div className={`w-6 h-6 rounded-lg ${agent.bgColor} flex items-center justify-center`}>
                      <agent.icon className={`w-3.5 h-3.5 ${agent.iconColor}`} />
                    </div>
                  </div>
                  <p className="text-sm font-medium text-primary mb-2">{agent.role}</p>
                  <p className="text-sm text-muted-foreground">{agent.description}</p>
                </div>

                {/* Arrow */}
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
              </div>
            </Link>
          ))}
        </div>

        {/* Note */}
        <div className="max-w-2xl mx-auto">
          <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/50 border border-border/50">
            <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Os agentes funcionam de forma independente.</strong>{" "}
                Você pode contratar apenas um ou combinar vários, sem precisar de todos.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <Link to="/agentes">
            <Button size="lg" variant="outline" className="gap-2">
              Ver todos os agentes
              <ChevronRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
