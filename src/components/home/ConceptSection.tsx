import { Users, Link2 } from "lucide-react";
import { motion } from "framer-motion";

import claraAvatar   from "@/assets/avatars/ze-atendimento-v3.webp";
import otavioAvatar  from "@/assets/avatars/chico-orcamento-v3.webp";
import lucasAvatar   from "@/assets/avatars/neto-agenda-v3.webp";
import helenaAvatar  from "@/assets/avatars/dona-conta-v3.webp";
import mayaAvatar    from "@/assets/avatars/zeca-instagram-v3.webp";

// ─── Dados ────────────────────────────────────────────────────────────────────

const AGENT_AVATARS = [
  { name: "Clara",  avatar: claraAvatar  },
  { name: "Otávio", avatar: otavioAvatar },
  { name: "Lucas",  avatar: lucasAvatar  },
  { name: "Helena", avatar: helenaAvatar },
  { name: "Maya",   avatar: mayaAvatar   },
] as const;

// ─── Componente ───────────────────────────────────────────────────────────────

/**
 * ConceptSection — explica o conceito do MandaUmZap como equipe integrada.
 * Visualiza os 5 agentes conectados por uma linha SVG animada.
 */
export function ConceptSection() {
  return (
    <section className="py-12 md:py-16" aria-labelledby="concept-heading">
      <div className="container">
        <div className="bg-section-beige rounded-3xl relative overflow-hidden p-8 md:p-12 lg:p-16 brutalist-outline">

          {/* Decoração de fundo */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary/3 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto text-center">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
            >
              <Users className="w-4 h-4" aria-hidden="true" />
              O conceito
            </motion.div>

            {/* Título */}
            <motion.h2
              id="concept-heading"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-6 leading-tight tracking-tight"
            >
              Não é um robô.{" "}
              <span className="text-gradient font-black">É uma equipe.</span>
            </motion.h2>

            {/* Descrição */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-12 max-w-3xl mx-auto"
            >
              O <strong className="text-foreground">MandaUmZap</strong> funciona como uma equipe de agentes de IA especializados.
              Cada agente cuida de uma parte da prestação de serviços.{" "}
              <span className="text-primary font-medium">
                Você pode usar agentes separados ou ativar o modo integrado, onde eles trabalham juntos na jornada completa.
              </span>
            </motion.p>

            {/* Visual: avatares conectados */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="relative max-w-3xl mx-auto"
            >
              {/* Linhas de conexão SVG */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 600 120"
                preserveAspectRatio="xMidYMid meet"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="conceptLineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%"   stopColor="#25D366" stopOpacity="0.2" />
                    <stop offset="50%"  stopColor="#25D366" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#25D366" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
                {/* Linha principal */}
                <path
                  d="M60 60 Q150 30 240 60 T420 60 T540 60"
                  stroke="url(#conceptLineGradient)"
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray="8,4"
                  className="animate-pulse"
                />
                {/* Arcos secundários */}
                <path d="M120 60 Q180 90 240 60" stroke="url(#conceptLineGradient)" strokeWidth="2" fill="none" opacity="0.4" />
                <path d="M360 60 Q420 90 480 60" stroke="url(#conceptLineGradient)" strokeWidth="2" fill="none" opacity="0.4" />
              </svg>

              {/* Avatares dos agentes */}
              <div className="flex items-center justify-between relative z-10 px-4">
                {AGENT_AVATARS.map((agent, index) => (
                  <motion.div
                    key={agent.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.08 }}
                    className="flex flex-col items-center group"
                  >
                    <div className="relative">
                      {/* Anel de brilho */}
                      <div className="absolute -inset-1 bg-primary rounded-full opacity-20 blur-sm group-hover:opacity-40 transition-opacity" aria-hidden="true" />

                      {/* Avatar */}
                      <div className="relative w-14 h-14 md:w-20 md:h-20 rounded-full border-3 border-white shadow-lg overflow-hidden bg-white ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all">
                        <img
                          src={agent.avatar}
                          alt={agent.name}
                          className="w-full h-full object-cover object-top scale-125"
                        />
                      </div>

                      {/* Indicador de conexão */}
                      <div
                        className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center border-2 border-white"
                        aria-hidden="true"
                      >
                        <Link2 className="w-2.5 h-2.5 text-primary-foreground" />
                      </div>
                    </div>

                    <span className="text-xs md:text-sm font-medium text-foreground mt-3">
                      {agent.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
