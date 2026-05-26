import { Link } from "react-router-dom";
import { 
  Calculator, 
  Calendar, 
  Wallet, 
  Instagram, 
  ChevronRight,
  MessageCircle,
  GraduationCap,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MenuItem {
  title: string;
  description: string;
  href: string;
  icon: React.ElementType;
  color: string;
}

const agentItems: MenuItem[] = [
  {
    title: "Clara",
    description: "Atendimento",
    href: "/agente/clara",
    icon: MessageCircle,
    color: "text-blue-500",
  },
  {
    title: "Otávio",
    description: "Orçamento",
    href: "/agente/otavio",
    icon: Calculator,
    color: "text-indigo-500",
  },
  {
    title: "Lucas",
    description: "Agendamentos",
    href: "/agente/lucas",
    icon: Calendar,
    color: "text-violet-500",
  },
  {
    title: "Helena",
    description: "Financeiro",
    href: "/agente/helena",
    icon: Wallet,
    color: "text-purple-500",
  },
  {
    title: "Maya",
    description: "Divulgação",
    href: "/agente/maya",
    icon: Instagram,
    color: "text-pink-500",
  },
];

const productItems: MenuItem[] = [
  {
    title: "Jornada Integrada",
    description: "Todos os agentes conectados",
    href: "/jornada-integrada",
    icon: Sparkles,
    color: "text-primary",
  },
];

interface MegaMenuProps {
  isOpen: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export function MegaMenu({ isOpen, onMouseEnter, onMouseLeave }: MegaMenuProps) {
  return (
    <div
      className={cn(
        "absolute top-full left-0 right-0 bg-section-beige border-b border-border/50 shadow-xl transition-all duration-300 z-50",
        isOpen 
          ? "opacity-100 translate-y-0 visible" 
          : "opacity-0 -translate-y-4 invisible pointer-events-none"
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="container py-5">
        <div className="grid grid-cols-3 gap-8">
          {/* Agentes Column */}
          <div>
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
              <GraduationCap className="w-3.5 h-3.5" />
              Nossos Agentes
            </h3>
            <div className="space-y-0.5">
              {agentItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-muted transition-colors group"
                >
                  <div className={cn("p-1.5 rounded-md bg-muted group-hover:bg-background", item.color)}>
                    <item.icon className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                      {item.title}
                    </p>
                    <span className="text-xs text-muted-foreground">
                      {item.description}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
            <Link
              to="/agentes"
              className="inline-flex items-center gap-1 mt-3 px-2.5 text-xs font-medium text-primary hover:underline"
            >
              Ver todos os agentes
              <ChevronRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Produtos Column */}
          <div className="border-l border-border pl-8">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              Produtos
            </h3>
            <div className="space-y-0.5">
              {productItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-muted transition-colors group"
                >
                  <div className={cn("p-1.5 rounded-md bg-muted group-hover:bg-background", item.color)}>
                    <item.icon className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                      {item.title}
                    </p>
                    <span className="text-xs text-muted-foreground">
                      {item.description}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* CTA Column */}
          <div className="border-l border-border pl-8">
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-5">
              <h3 className="text-base font-semibold text-foreground mb-1">
                Pronto para começar?
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Automatize sua prestação de serviços hoje.
              </p>
              <Link
                to="/agentes"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
              >
                Escolher agentes
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="mt-4 p-4 border border-border rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Precisa de ajuda?</p>
              <a
                href="https://wa.me/5500000000000?text=Olá! Preciso de ajuda"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-primary hover:underline"
              >
                Fale conosco no WhatsApp →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
