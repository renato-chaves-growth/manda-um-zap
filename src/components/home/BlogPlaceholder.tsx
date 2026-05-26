import { Calculator, MessageCircle, Sparkles, Calendar, TrendingUp, Users, Megaphone } from "lucide-react";

interface BlogPlaceholderProps {
  category: "Orçamento" | "Atendimento" | "Tecnologia" | "Gestão" | "Vendas" | "Agenda" | "Marketing";
  className?: string;
}

const categoryConfig = {
  "Orçamento": {
    icon: Calculator,
    pattern: "circles",
  },
  "Atendimento": {
    icon: MessageCircle,
    pattern: "dots",
  },
  "Tecnologia": {
    icon: Sparkles,
    pattern: "lines",
  },
  "Gestão": {
    icon: TrendingUp,
    pattern: "grid",
  },
  "Vendas": {
    icon: Users,
    pattern: "circles",
  },
  "Agenda": {
    icon: Calendar,
    pattern: "dots",
  },
  "Marketing": {
    icon: Megaphone,
    pattern: "lines",
  },
};

export function BlogPlaceholder({ category, className = "" }: BlogPlaceholderProps) {
  const config = categoryConfig[category] || categoryConfig["Tecnologia"];
  const Icon = config.icon;

  return (
    <div 
      className={`relative w-full h-full bg-whatsapp-teal overflow-hidden ${className}`}
    >
      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-20">
        {config.pattern === "circles" && (
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <circle cx="20" cy="20" r="15" fill="white" opacity="0.3" />
            <circle cx="80" cy="30" r="8" fill="white" opacity="0.2" />
            <circle cx="60" cy="70" r="20" fill="white" opacity="0.25" />
            <circle cx="10" cy="80" r="10" fill="white" opacity="0.2" />
          </svg>
        )}
        {config.pattern === "dots" && (
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {Array.from({ length: 8 }).map((_, row) =>
              Array.from({ length: 8 }).map((_, col) => (
                <circle
                  key={`${row}-${col}`}
                  cx={10 + col * 12}
                  cy={10 + row * 12}
                  r="1.5"
                  fill="white"
                  opacity="0.4"
                />
              ))
            )}
          </svg>
        )}
        {config.pattern === "lines" && (
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <line x1="0" y1="20" x2="100" y2="20" stroke="white" strokeWidth="0.5" opacity="0.3" />
            <line x1="0" y1="40" x2="100" y2="40" stroke="white" strokeWidth="0.5" opacity="0.3" />
            <line x1="0" y1="60" x2="100" y2="60" stroke="white" strokeWidth="0.5" opacity="0.3" />
            <line x1="0" y1="80" x2="100" y2="80" stroke="white" strokeWidth="0.5" opacity="0.3" />
            <line x1="20" y1="0" x2="20" y2="100" stroke="white" strokeWidth="0.5" opacity="0.2" />
            <line x1="50" y1="0" x2="50" y2="100" stroke="white" strokeWidth="0.5" opacity="0.2" />
            <line x1="80" y1="0" x2="80" y2="100" stroke="white" strokeWidth="0.5" opacity="0.2" />
          </svg>
        )}
        {config.pattern === "grid" && (
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {Array.from({ length: 5 }).map((_, i) => (
              <line
                key={`h-${i}`}
                x1="0"
                y1={20 + i * 20}
                x2="100"
                y2={20 + i * 20}
                stroke="white"
                strokeWidth="0.3"
                opacity="0.3"
              />
            ))}
            {Array.from({ length: 5 }).map((_, i) => (
              <line
                key={`v-${i}`}
                x1={20 + i * 20}
                y1="0"
                x2={20 + i * 20}
                y2="100"
                stroke="white"
                strokeWidth="0.3"
                opacity="0.3"
              />
            ))}
          </svg>
        )}
      </div>

      {/* Decorative shapes */}
      <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-white/10 blur-xl" />
      <div className="absolute bottom-6 left-6 w-20 h-20 rounded-full bg-white/10 blur-xl" />

      {/* Icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-5">
          <Icon className="w-10 h-10 text-white" strokeWidth={1.5} />
        </div>
      </div>
    </div>
  );
}
