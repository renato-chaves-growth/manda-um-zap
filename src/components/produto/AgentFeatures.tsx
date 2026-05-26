import { Check, Zap } from "lucide-react";
import { motion } from "framer-motion";

interface AgentFeaturesProps {
  description: string;
  bullets: string[];
  howItWorks: string[];
  color: string;
}

export function AgentFeatures({ description, bullets, howItWorks, color }: AgentFeaturesProps) {
  return (
    <motion.div 
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      className="space-y-8"
    >
      {/* Description */}
      <div>
        <p className="text-lg md:text-xl text-foreground/80 leading-relaxed">
          {description}
        </p>
      </div>

      {/* What it does */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Zap className={`w-5 h-5 ${color}`} />
          O que faz
        </h3>
        <ul className="grid gap-3">
          {bullets.map((bullet, i) => (
            <motion.li 
              key={i}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 + i * 0.1, duration: 0.3 }}
              className="flex items-start gap-3"
            >
              <div className={`mt-0.5 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0`}>
                <Check className={`w-3 h-3 ${color}`} />
              </div>
              <span className="text-foreground/80">{bullet}</span>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* How it works */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <div className={`w-5 h-5 rounded-full ${color.replace('text-', 'bg-')}/20 flex items-center justify-center`}>
            <span className={`text-xs font-bold ${color}`}>?</span>
          </div>
          Como funciona
        </h3>
        <div className="grid gap-3">
          {howItWorks.map((step, i) => (
            <motion.div
              key={i}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.7 + i * 0.1, duration: 0.3 }}
              className="flex items-start gap-3"
            >
              <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold text-muted-foreground">{i + 1}</span>
              </div>
              <span className="text-foreground/80">{step}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
