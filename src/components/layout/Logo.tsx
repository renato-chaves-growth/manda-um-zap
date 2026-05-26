import { Link } from "react-router-dom";
import logoImage from "@/assets/logo/prestador de serviço-ai-logo-v2.png";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function Logo({ className = "", size = "md" }: LogoProps) {
  const sizeClasses = {
    sm: "h-6",
    md: "h-8",
    lg: "h-10",
  };

  return (
    <Link to="/" className={`flex items-center ${className}`}>
      <img 
        src={logoImage} 
        alt="MandaUmZap" 
        className={`${sizeClasses[size]} w-auto`}
      />
    </Link>
  );
}
