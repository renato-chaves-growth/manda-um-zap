import { Link } from "react-router-dom";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function Logo({ className = "", size = "md" }: LogoProps) {
  const textSize = {
    sm: "text-base",
    md: "text-lg",
    lg: "text-xl",
  };

  const badgeSize = {
    sm: "w-5 h-5 text-[9px]",
    md: "w-6 h-6 text-[10px]",
    lg: "w-7 h-7 text-[10px]",
  };

  return (
    <Link to="/" className={`flex items-center gap-1.5 group ${className}`}>
      <span className={`font-display font-black ${textSize[size]} text-current tracking-tight`}>
        MandaUmZap
      </span>
      <span
        className={`inline-flex items-center justify-center rounded-full bg-[#25D366] border-2 border-current font-black text-black ${badgeSize[size]} group-hover:scale-110 transition-transform`}
      >
        AI
      </span>
    </Link>
  );
}
