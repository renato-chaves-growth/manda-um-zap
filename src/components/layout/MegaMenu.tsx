import { Link } from "react-router-dom";
import {
  Calculator,
  Calendar,
  Wallet,
  Instagram,
  ChevronRight,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Tipos ────────────────────────────────────────────────────────────────────

interface AgentItem {
  name: string;
  role: string;
  href: string;
  Icon: React.ElementType;
  color: string;
}

// ─── Dados ────────────────────────────────────────────────────────────────────

const WHATSAPP_HELP = "https://wa.me/5500000000000?text=Olá! Preciso de ajuda";

const AGENTS: AgentItem[] = [
  { name: "Clara",  role: "Atendimento",   href: "/agente/clara",  Icon: MessageCircle, color: "text-blue-500"   },
  { name: "Otávio", role: "Orçamento",     href: "/agente/otavio", Icon: Calculator,    color: "text-indigo-500" },
  { name: "Lucas",  role: "Agendamentos",  href: "/agente/lucas",  Icon: Calendar,      color: "text-violet-500" },
  { name: "Helena", role: "Financeiro",    href: "/agente/helena", Icon: Wallet,        color: "text-purple-500" },
  { name: "Maya",   role: "Divulgação",    href: "/agente/maya",   Icon: Instagram,     color: "text-pink-500"   },
];

// ─── Componente ───────────────────────────────────────────────────────────────

interface MegaMenuProps {
  isOpen: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export function MegaMenu({ isOpen, onMouseEnter, onMouseLeave }: MegaMenuProps) {
  return (
    <div
      role="region"
      aria-label="Menu de soluções"
      className={cn(
        "absolute top-full left-0 right-0 bg-section-beige border-b border-border/50 shadow-xl z-50 transition-all duration-300",
        isOpen ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-4 invisible pointer-events-none"
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="container py-5">
        <div className="grid grid-cols-2 gap-8">

          {/* Coluna — Agentes */}
          <div>
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              Nossos Agentes
            </h3>

            <ul className="space-y-0.5">
              {AGENTS.map(({ name, role, href, Icon, color }) => (
                <li key={href}>
                  <Link
                    to={href}
                    className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-muted transition-colors group"
                  >
                    <span className={cn("p-1.5 rounded-md bg-muted group-hover:bg-background", color)}>
                      <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                        {name}
                      </span>
                      <span className="text-xs text-muted-foreground">{role}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              to="/agentes"
              className="inline-flex items-center gap-1 mt-3 px-2.5 text-xs font-medium text-primary hover:underline"
            >
              Ver todos os agentes
              <ChevronRight className="w-3 h-3" aria-hidden="true" />
            </Link>
          </div>

          {/* Coluna — CTA */}
          <div className="border-l border-border pl-8 space-y-3">
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-5">
              <h3 className="text-base font-semibold text-foreground mb-1">Pronto para começar?</h3>
              <p className="text-sm text-muted-foreground mb-4">Automatize sua prestação de serviços hoje.</p>
              <Link
                to="/agentes"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
              >
                Escolher agentes
                <ChevronRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="p-4 border border-border rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Precisa de ajuda?</p>
              <a
                href={WHATSAPP_HELP}
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
