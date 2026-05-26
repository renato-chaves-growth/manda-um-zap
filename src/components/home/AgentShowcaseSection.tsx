import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  Check, ChevronRight, Sparkles, Mic, CheckCheck,
  Zap, Users, Clock, Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

import claraAvatar   from "@/assets/avatars/ze-atendimento-v3.webp";
import otavioAvatar  from "@/assets/avatars/chico-orcamento-v3.webp";
import lucasAvatar   from "@/assets/avatars/neto-agenda-v3.webp";
import helenaAvatar  from "@/assets/avatars/dona-conta-v3.webp";
import mayaAvatar    from "@/assets/avatars/zeca-instagram-v3.webp";

// ─── Tipos ────────────────────────────────────────────────────────────────────

interface AgentColor {
  primary: string;
  text:    string;
  bg:      string;
}

interface ChatMessage {
  id:     number;
  type:   "sent" | "received";
  content: string;
  time:   string;
  audio?: boolean;
}

interface Agent {
  id:          string;
  name:        string;
  role:        string;
  tabLabel:    string;
  tagline:     string;
  superpower:  string;
  avatar:      string;
  socialProof: string;
  stat:        { value: string; label: string };
  features:    readonly string[];
  cta:         string;
  conversation: ChatMessage[];
}

// ─── Cores por agente ─────────────────────────────────────────────────────────

const AGENT_COLORS: Record<string, AgentColor> = {
  clara:  { primary: "#1DB954", text: "text-[#1DB954]", bg: "bg-[#1DB954]" },
  otavio: { primary: "#0D9488", text: "text-[#0D9488]", bg: "bg-[#0D9488]" },
  lucas:  { primary: "#84CC16", text: "text-[#84CC16]", bg: "bg-[#84CC16]" },
  helena: { primary: "#059669", text: "text-[#059669]", bg: "bg-[#059669]" },
  maya:   { primary: "#65A30D", text: "text-[#65A30D]", bg: "bg-[#65A30D]" },
} as const;

// ─── Alturas estáticas da forma de onda (evita Math.random no render) ─────────

const WAVEFORM_HEIGHTS = [5, 9, 13, 6, 14, 10, 16, 7, 11, 4, 14, 9, 7, 15, 5, 11, 8, 13, 6, 15] as const;

// ─── Config de órbita (evita array inline no render) ──────────────────────────

const ORBIT_CONFIG = [
  { src: claraAvatar,  delay: 0,   ring: 140, duration: 25 },
  { src: otavioAvatar, delay: -5,  ring: 220, duration: 35 },
  { src: lucasAvatar,  delay: -10, ring: 300, duration: 45 },
  { src: helenaAvatar, delay: -8,  ring: 220, duration: 30 },
  { src: mayaAvatar,   delay: -3,  ring: 300, duration: 40 },
] as const;

// ─── Dados dos agentes ────────────────────────────────────────────────────────

const AGENTS: Agent[] = [
  {
    id:          "clara",
    name:        "Clara",
    role:        "Assistente de Atendimento",
    tabLabel:    "Atende",
    tagline:     "Sua assistente 24h que nunca deixa cliente esperando.",
    superpower:  "Não dorme. Não almoça. Não perde cliente.",
    avatar:      claraAvatar,
    socialProof: "+800 prestadores de serviço usam",
    stat:        { value: "< 1min", label: "tempo de resposta" },
    features: [
      "Responde no WhatsApp em segundos",
      "Entende áudio e texto naturalmente",
      "Filtra curiosos de clientes reais",
      "Coleta todas as informações do pedido",
    ],
    cta:          "Nunca mais perca cliente por demora",
    conversation: [
      { id: 1, type: "sent",     content: "Oi! Preciso instalar tomadas no meu home office", time: "14:32", audio: true },
      { id: 2, type: "received", content: "Oi! 👋 Aqui é a Clara da Silva Elétrica. Que ótimo! Quantas tomadas precisam ser instaladas?", time: "14:32" },
      { id: 3, type: "sent",     content: "Umas 4 tomadas e 2 pontos de rede, por favor", time: "14:33", audio: true },
    ],
  },
  {
    id:          "otavio",
    name:        "Otávio",
    role:        "Assistente de Orçamento",
    tabLabel:    "Orça",
    tagline:     "Orçamentos precisos em minutos, não em horas.",
    superpower:  "Não erra conta. Não esquece material. Não atrasa.",
    avatar:      otavioAvatar,
    socialProof: "+600 orçamentos/mês",
    stat:        { value: "3min", label: "pra gerar orçamento" },
    features: [
      "Calcula materiais e perdas automaticamente",
      "Aplica sua margem de lucro configurada",
      "Gera PDF profissional em minutos",
      "Histórico completo de orçamentos",
    ],
    cta:          "Pare de errar no orçamento",
    conversation: [
      { id: 1, type: "received", content: "Oi! Aqui é o Otávio da Silva Elétrica. 📋 A Clara me passou o pedido: 4 tomadas + 2 pontos de rede. Deixa eu calcular!", time: "14:35" },
      { id: 2, type: "received", content: "Calculei tudo: materiais + mão de obra. Total: R$ 420,00 com garantia. Posso enviar o detalhamento? 💰", time: "14:36" },
      { id: 3, type: "sent",     content: "Pode incluir a passagem de cabo aparente?", time: "14:37" },
    ],
  },
  {
    id:          "lucas",
    name:        "Lucas",
    role:        "Assistente de Agenda",
    tabLabel:    "Agenda",
    tagline:     "Nunca mais esqueça ou perca uma visita técnica.",
    superpower:  "Não esquece compromisso. Não fura. Não confunde horário.",
    avatar:      lucasAvatar,
    socialProof: "+400 visitas agendadas",
    stat:        { value: "89%", label: "de comparecimento" },
    features: [
      "Agenda visitas no melhor horário",
      "Envia lembretes automáticos",
      "Reagenda sem você precisar fazer nada",
      "Confirma presença com antecedência",
    ],
    cta:          "Chega de perder visita marcada",
    conversation: [
      { id: 1, type: "received", content: "Oi! Aqui é o Lucas da Silva Elétrica. 📅 Confirmando sua visita técnica pra amanhã (quinta) às 10h. Tudo certo?", time: "18:00" },
      { id: 2, type: "sent",     content: "Opa, surgiu um imprevisto. Pode ser sexta?", time: "18:05" },
      { id: 3, type: "received", content: "Sem problemas! 😊 Tenho sexta às 9h ou às 14h. Qual prefere?", time: "18:05" },
    ],
  },
  {
    id:          "helena",
    name:        "Helena",
    role:        "Assistente Financeira",
    tabLabel:    "Finanças",
    tagline:     "Saiba exatamente se você está lucrando ou não.",
    superpower:  "Não perde nota. Não deixa passar parcela. Não engana.",
    avatar:      helenaAvatar,
    socialProof: "+300 prestadores de serviço controlam",
    stat:        { value: "100%", label: "das parcelas rastreadas" },
    features: [
      "Registra entradas e pagamentos",
      "Controla saldo de cada projeto",
      "Mostra lucro real, sem enrolação",
      "Resumo mensal automático",
    ],
    cta:          "Descubra seu lucro de verdade",
    conversation: [
      { id: 1, type: "received", content: "Oi! Aqui é a Helena da Silva Elétrica. 💵 Vi que você fechou o serviço com a Marina. Valor de R$ 420,00, certo?", time: "10:00" },
      { id: 2, type: "sent",     content: "Isso, ela deu R$ 200 de entrada", time: "10:02" },
      { id: 3, type: "received", content: "Anotado! ✅ Entrada de R$ 200. Restam R$ 220. Quando ela vai pagar o restante?", time: "10:02" },
    ],
  },
  {
    id:          "maya",
    name:        "Maya",
    role:        "Assistente de Divulgação",
    tabLabel:    "Divulga",
    tagline:     "Divulgue seu trabalho sem virar digital influencer.",
    superpower:  "Não trava na legenda. Não falta ideia. Não para de postar.",
    avatar:      mayaAvatar,
    socialProof: "+500 posts criados",
    stat:        { value: "3x", label: "mais engajamento" },
    features: [
      "Cria legendas prontas pra postar",
      "Sugere hashtags que funcionam",
      "Ideias de stories e reels",
      "Você posta em segundos",
    ],
    cta:          "Apareça mais sem perder tempo",
    conversation: [
      { id: 1, type: "sent",     content: "Terminei uma instalação elétrica, ficou bacana. O que posto?", time: "16:00", audio: true },
      { id: 2, type: "received", content: "Opa! Aqui é a Maya da Silva Elétrica. 📸 Manda a foto que eu crio a legenda pra você!", time: "16:01" },
      { id: 3, type: "sent",     content: "[Foto da instalação finalizada]", time: "16:02" },
    ],
  },
];

// ─── Sub-componente: abas de navegação ────────────────────────────────────────

interface AgentTabsProps {
  agents:   Agent[];
  activeId: string;
  onSelect: (id: string) => void;
}

function AgentTabs({ agents, activeId, onSelect }: AgentTabsProps) {
  return (
    <div className="flex flex-wrap justify-center gap-1.5 md:gap-0 mb-0" role="tablist" aria-label="Selecionar agente">
      {agents.map((agent) => {
        const isActive = activeId === agent.id;
        const color    = AGENT_COLORS[agent.id];

        return (
          <button
            key={agent.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onSelect(agent.id)}
            className={cn(
              "relative px-5 md:px-7 py-3 md:py-3.5 text-sm md:text-base font-semibold transition-all duration-300",
              "rounded-full md:rounded-t-2xl md:rounded-b-none",
              isActive ? "text-foreground z-10" : "text-muted-foreground hover:text-foreground"
            )}
            style={isActive ? { backgroundColor: `${color.primary}15` } : undefined}
          >
            {agent.tabLabel}

            {isActive && (
              <motion.div
                layoutId="activeTabLine"
                className="absolute bottom-0 left-3 right-3 h-[3px] rounded-full"
                style={{ backgroundColor: color.primary }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

// ─── Sub-componente: painel de informações do agente ──────────────────────────

interface AgentInfoPanelProps {
  agent: Agent;
  color: AgentColor;
}

function AgentInfoPanel({ agent, color }: AgentInfoPanelProps) {
  return (
    <div className="order-2 lg:order-1 space-y-5 text-center lg:text-left">
      {/* Nome e role */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        <h3 className={cn("text-3xl md:text-4xl font-black mb-1", color.text)}>
          {agent.name}
        </h3>
        <p className="text-muted-foreground font-medium text-lg">{agent.role}</p>
      </motion.div>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="text-foreground/80 text-lg leading-relaxed"
      >
        {agent.tagline}
      </motion.p>

      {/* Superpoder */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-border/60 bg-background/60"
      >
        <Zap className={cn("w-4 h-4 flex-shrink-0", color.text)} aria-hidden="true" />
        <span className="text-sm font-bold text-foreground">{agent.superpower}</span>
      </motion.div>

      {/* Features */}
      <ul className="space-y-3">
        {agent.features.map((feature, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 + i * 0.07 }}
            className="flex items-start gap-3 justify-center lg:justify-start"
          >
            <div className={cn("w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5", color.bg)}>
              <Check className="w-3 h-3 text-white" aria-hidden="true" />
            </div>
            <span className="text-foreground/80 text-left">{feature}</span>
          </motion.li>
        ))}
      </ul>

      {/* Social proof + estatística */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex flex-wrap items-center gap-4 justify-center lg:justify-start"
      >
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="w-4 h-4" aria-hidden="true" />
          <span className="font-medium">{agent.socialProof}</span>
        </div>
        <div className="w-px h-4 bg-border hidden sm:block" aria-hidden="true" />
        <div className="flex items-center gap-2 text-sm">
          <span className={cn("font-black text-base", color.text)}>{agent.stat.value}</span>
          <span className="text-muted-foreground">{agent.stat.label}</span>
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
        className="pt-2 flex justify-center lg:justify-start"
      >
        <Link to={`/agente/${agent.id}`}>
          <Button
            size="lg"
            className="gap-2 font-bold text-sm sm:text-base"
            style={{ backgroundColor: color.primary, color: "#fff" }}
          >
            {agent.cta}
            <ChevronRight className="w-4 h-4" aria-hidden="true" />
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}

// ─── Sub-componente: chat WhatsApp ────────────────────────────────────────────

interface WhatsAppChatProps {
  agent:           Agent;
  visibleMessages: number[];
}

function WhatsAppChat({ agent, visibleMessages }: WhatsAppChatProps) {
  return (
    <div className="rounded-[2.5rem] p-[2px] border border-border/40 shadow-float bg-background/50">
      <div className="bg-background rounded-[2.4rem] overflow-hidden">

        {/* Cabeçalho */}
        <div className="px-4 py-3 flex items-center gap-3" style={{ backgroundColor: "#075E54" }}>
          <div className="w-10 h-10 rounded-full overflow-hidden bg-white/20">
            <img src={agent.avatar} alt={agent.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1">
            <p className="text-white font-semibold text-sm truncate">{agent.name}</p>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-green-300 animate-pulse" aria-hidden="true" />
              <p className="text-white/70 text-xs">online agora</p>
            </div>
          </div>
        </div>

        {/* Corpo do chat */}
        <div
          className="h-[280px] overflow-y-auto p-4 space-y-3"
          style={{ backgroundColor: "#ECE5DD" }}
          aria-live="polite"
          aria-label="Conversa de exemplo"
        >
          {agent.conversation.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex transition-all duration-500",
                message.type === "sent" ? "justify-end" : "justify-start",
                visibleMessages.includes(message.id)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              )}
            >
              <div className={cn(
                "max-w-[85%] rounded-lg px-3 py-2 shadow-sm",
                message.type === "sent"
                  ? "bg-[#DCF8C6] rounded-tr-none"
                  : "bg-white rounded-tl-none"
              )}>
                {/* Áudio simulado */}
                {message.audio && (
                  <div className="flex items-center gap-2 mb-1" aria-label="Mensagem de áudio">
                    <Mic className="w-4 h-4 text-[#075E54]" aria-hidden="true" />
                    <div className="flex gap-0.5" aria-hidden="true">
                      {WAVEFORM_HEIGHTS.map((h, i) => (
                        <div
                          key={i}
                          className="w-0.5 bg-[#075E54]/60 rounded-full"
                          style={{ height: h }}
                        />
                      ))}
                    </div>
                  </div>
                )}

                <p className="text-sm text-foreground/90">{message.content}</p>

                <div className="flex items-center justify-end gap-1 mt-1">
                  <span className="text-[10px] text-muted-foreground">{message.time}</span>
                  {message.type === "sent" && (
                    <CheckCheck className="w-3 h-3 text-[#53bdeb]" aria-label="Lido" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input decorativo */}
        <div className="bg-[#F0F0F0] px-3 py-2 flex items-center gap-2" aria-hidden="true">
          <div className="flex-1 bg-white rounded-full px-4 py-2">
            <span className="text-muted-foreground text-sm">Mensagem</span>
          </div>
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#075E54]">
            <Mic className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Sub-componente: foto do agente ──────────────────────────────────────────

interface AgentPhotoProps {
  agent: Agent;
  color: AgentColor;
}

function AgentPhoto({ agent, color }: AgentPhotoProps) {
  return (
    <div
      className="w-[260px] h-[300px] rounded-3xl p-[3px] shadow-sm relative border border-border/40"
      style={{ background: `linear-gradient(145deg, ${color.primary}30, ${color.primary}10)` }}
    >
      <div className="w-full h-full rounded-[20px] overflow-hidden bg-section-beige">
        <img
          src={agent.avatar}
          alt={agent.name}
          className="w-full h-full object-cover object-top"
        />
      </div>

      {/* Badge IA Ativa */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, type: "spring" }}
        className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-background shadow-sm border border-border/50 flex items-center gap-2"
      >
        <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" aria-hidden="true" />
        <span className="text-xs font-bold text-foreground">IA Ativa 24/7</span>
      </motion.div>
    </div>
  );
}

// ─── Componente principal ─────────────────────────────────────────────────────

/**
 * AgentShowcaseSection — apresenta os 5 agentes IA individualmente
 * com navegação por abas, chat WhatsApp animado e foto do agente.
 */
export function AgentShowcaseSection() {
  const [activeAgent, setActiveAgent]         = useState("clara");
  const [visibleMessages, setVisibleMessages] = useState<number[]>([]);

  const currentAgent = AGENTS.find((a) => a.id === activeAgent) ?? AGENTS[0];
  const colors       = AGENT_COLORS[activeAgent];

  /** Reinicia a animação de entrada das mensagens ao trocar de agente */
  const resetAnimation = useCallback(() => {
    setVisibleMessages([]);
    currentAgent.conversation.forEach((message, index) => {
      setTimeout(() => {
        setVisibleMessages((prev) => [...prev, message.id]);
      }, index * 600 + 300);
    });
  }, [currentAgent]);

  useEffect(() => {
    resetAnimation();
  }, [activeAgent, resetAnimation]);

  return (
    <section
      className="py-16 md:py-24 bg-background relative overflow-hidden"
      aria-labelledby="agents-heading"
    >
      <div className="container relative z-10">

        {/* Cabeçalho */}
        <div className="max-w-3xl mx-auto text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Clock className="w-4 h-4 text-primary" aria-hidden="true" />
            <span className="text-sm font-medium text-primary">Funcionários que trabalham 24h por dia</span>
          </div>

          <h2
            id="agents-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4"
          >
            Conheça sua <span className="text-gradient">nova equipe</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            Assistentes de IA que não dormem, não tiram férias e custam menos que um café por dia.
          </p>
        </div>

        {/* Abas de navegação */}
        <AgentTabs agents={AGENTS} activeId={activeAgent} onSelect={setActiveAgent} />

        {/* Cartão de conteúdo com animação por agente */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeAgent}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative rounded-3xl overflow-hidden border border-border/60 mx-1"
            style={{ boxShadow: `0 2px 40px -8px ${colors.primary}15` }}
          >
            {/* Decoração de fundo com avatares em órbita */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="absolute -inset-20 rounded-full bg-primary/5 blur-3xl" />
                <div className="absolute -inset-[140px] rounded-full border border-border/15" />
                <div className="absolute -inset-[220px] rounded-full border border-border/10" />
                <div className="absolute -inset-[300px] rounded-full border border-border/5"  />

                {ORBIT_CONFIG.map((orb, i) => (
                  <motion.div
                    key={i}
                    className="absolute top-1/2 left-1/2"
                    animate={{ rotate: 360 }}
                    transition={{ duration: orb.duration, repeat: Infinity, ease: "linear", delay: orb.delay }}
                    style={{
                      width:       orb.ring * 2,
                      height:      orb.ring * 2,
                      marginLeft: -orb.ring,
                      marginTop:  -orb.ring,
                    }}
                  >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <div className="w-10 h-10 rounded-full border-2 border-background shadow-sm overflow-hidden opacity-30">
                        <img src={orb.src} alt="" className="w-full h-full object-cover object-top" />
                      </div>
                    </div>
                  </motion.div>
                ))}

                <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-lg opacity-20">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            {/* Conteúdo principal */}
            <div className="bg-section-beige/80 backdrop-blur-sm p-4 md:p-10 lg:p-12 relative">
              <div className="grid lg:grid-cols-[1fr_auto_1fr] gap-8 lg:gap-10 items-center max-w-6xl mx-auto">

                {/* Coluna esquerda — info do agente */}
                <AgentInfoPanel agent={currentAgent} color={colors} />

                {/* Avatar mobile */}
                <div className="order-1 lg:hidden flex justify-center">
                  <motion.div
                    key={`mobile-${activeAgent}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1, duration: 0.4, type: "spring" }}
                    className="relative"
                  >
                    <div
                      className="w-[200px] h-[230px] rounded-3xl p-[3px] shadow-sm relative border border-border/40"
                      style={{ background: `linear-gradient(145deg, ${colors.primary}30, ${colors.primary}10)` }}
                    >
                      <div className="w-full h-full rounded-[20px] overflow-hidden bg-section-beige">
                        <img
                          src={currentAgent.avatar}
                          alt={currentAgent.name}
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, type: "spring" }}
                        className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-background shadow-sm border border-border/50 flex items-center gap-2"
                      >
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" aria-hidden="true" />
                        <span className="text-xs font-bold text-foreground">IA Ativa 24/7</span>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>

                {/* Coluna central — chat WhatsApp (desktop) */}
                <div className="hidden lg:block order-2">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1, duration: 0.4 }}
                    className="max-w-xs mx-auto"
                  >
                    <WhatsAppChat
                      agent={currentAgent}
                      visibleMessages={visibleMessages}
                    />
                  </motion.div>
                </div>

                {/* Coluna direita — foto do agente (desktop) */}
                <div className="order-3 hidden lg:flex justify-center items-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
                    className="relative flex items-center justify-center"
                  >
                    <AgentPhoto agent={currentAgent} color={colors} />
                  </motion.div>
                </div>

              </div>

              {/* Rodapé de confiança */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-8 pt-6 border-t border-border/30 flex flex-wrap items-center justify-center gap-6 md:gap-10 text-sm text-muted-foreground"
              >
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary" aria-hidden="true" />
                  <span>Sem contrato de fidelidade</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" aria-hidden="true" />
                  <span>Funciona 24h, 7 dias por semana</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-primary" aria-hidden="true" />
                  <span>Mais barato que um café por dia</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Tagline inferior */}
        <div className="max-w-2xl mx-auto mt-8 text-center">
          <p className="text-muted-foreground text-lg">
            <span className="font-semibold text-foreground">Funciona por áudio ou texto.</span>{" "}
            Cada assistente fala em nome do seu negócio, como se fosse parte da sua equipe.
          </p>
        </div>

      </div>
    </section>
  );
}
