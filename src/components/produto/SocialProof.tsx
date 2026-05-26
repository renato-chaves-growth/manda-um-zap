import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Review {
  name: string;
  role: string;
  text: string;
  rating: number;
}

interface SocialProofProps {
  reviews: Review[];
}

export function SocialProof({ reviews }: SocialProofProps) {
  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.6, duration: 0.5 }}
      className="space-y-6"
    >
      <h3 className="text-lg font-semibold text-foreground">
        O que dizem os prestadores de serviço
      </h3>

      <div className="space-y-4">
        {reviews.map((review, i) => (
          <motion.div
            key={i}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 + i * 0.15, duration: 0.4 }}
            className="p-4 rounded-xl bg-muted/50 border border-border/50"
          >
            <div className="flex items-start gap-3">
              <Avatar className="w-10 h-10 bg-primary/10">
                <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                  {review.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <div>
                    <p className="font-semibold text-foreground">{review.name}</p>
                    <p className="text-xs text-muted-foreground">{review.role}</p>
                  </div>
                  <div className="flex">
                    {[...Array(5)].map((_, j) => (
                      <Star 
                        key={j} 
                        className={`w-3 h-3 ${j < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground/30'}`} 
                      />
                    ))}
                  </div>
                </div>
                
                <p className="text-sm text-foreground/80 leading-relaxed">
                  "{review.text}"
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Trust badges */}
      <div className="flex flex-wrap gap-3 pt-2">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 text-green-600 text-xs font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
          Satisfação garantida
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
          Suporte humanizado
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 text-violet-600 text-xs font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
          Cancele quando quiser
        </div>
      </div>
    </motion.div>
  );
}
