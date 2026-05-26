import { Link } from "react-router-dom";

interface LogoProps {
  /** Classes adicionais no wrapper */
  className?: string;
  /** Tamanho do texto */
  size?: "sm" | "md" | "lg";
  /** Inverte para fundos escuros */
  inverted?: boolean;
}

const textSizes = { sm: "text-base", md: "text-lg", lg: "text-xl" } as const;
const badgeSizes = { sm: "w-5 h-5 text-[9px]", md: "w-6 h-6 text-[10px]", lg: "w-7 h-7 text-xs" } as const;

export function Logo({ className = "", size = "md", inverted = false }: LogoProps) {
  return (
    <Link
      to="/"
      className={`inline-flex items-center gap-1.5 group select-none ${className}`}
      aria-label="MandaUmZap — início"
    >
      <span
        className={`font-display font-black tracking-tight ${textSizes[size]} ${
          inverted ? "text-white" : "text-foreground"
        }`}
      >
        MandaUmZap
      </span>
      <span
        className={`inline-flex items-center justify-center rounded-full bg-[#25D366] border-2 ${
          inverted ? "border-white/30" : "border-black/10"
        } font-black text-black leading-none group-hover:scale-110 transition-transform ${badgeSizes[size]}`}
      >
        AI
      </span>
    </Link>
  );
}
