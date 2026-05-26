import { Badge } from "@/components/ui/badge";
import { Star, Users, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

interface AgentHeroProps {
  name: string;
  role: string;
  avatar: string;
  color: string;
  rating: number;
  usersCount: number;
}

export function AgentHero({ name, role, avatar, color, rating, usersCount }: AgentHeroProps) {
  return (
    <div className="flex flex-col items-center text-center">
      {/* Avatar with glow effect */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative mb-6"
      >
        {/* Outer glow ring */}
        <div 
          className="absolute -inset-3 rounded-full opacity-30 blur-xl"
          style={{ background: `linear-gradient(135deg, hsl(var(--primary)), hsl(262 83% 58%))` }}
        />
        
        {/* Rotating gradient ring */}
        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary via-violet-500 to-primary animate-spin" style={{ animationDuration: '8s' }} />
        
        {/* White border */}
        <div className="relative w-40 h-40 md:w-52 md:h-52 rounded-full bg-background p-1">
          <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-muted to-muted/50">
            <img
              src={avatar}
              alt={name}
              className="w-full h-full object-cover object-top"
            />
          </div>
        </div>

        {/* Active badge */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
          <Badge className="bg-green-500/90 text-white border-0 shadow-lg gap-1.5 px-3 py-1">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            IA Ativa
          </Badge>
        </div>
      </motion.div>

      {/* Name and role */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <h1 className={`text-3xl md:text-4xl font-bold mb-2 ${color}`}>{name}</h1>
        <p className="text-lg text-muted-foreground mb-4">{role}</p>
      </motion.div>

      {/* Stats */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="flex items-center gap-6 text-sm"
      >
        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground/30'}`} 
              />
            ))}
          </div>
          <span className="font-semibold text-foreground">{rating.toFixed(1)}</span>
        </div>

        <div className="w-px h-4 bg-border" />

        {/* Users count */}
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Users className="w-4 h-4" />
          <span><strong className="text-foreground">{usersCount.toLocaleString('pt-BR')}</strong> prestadores de serviço usam</span>
        </div>

        <div className="w-px h-4 bg-border hidden md:block" />

        {/* Verified */}
        <div className="items-center gap-1.5 text-green-600 hidden md:flex">
          <CheckCircle2 className="w-4 h-4" />
          <span className="font-medium">Verificado</span>
        </div>
      </motion.div>
    </div>
  );
}
