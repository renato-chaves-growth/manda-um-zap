import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  Check, ChevronRight, Mic, CheckCheck,
  Zap, Clock, Shield,
  MessageCircle, Calculator, CalendarDays, Wallet, Instagram,
  type LucideIcon,
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

interface ChatMessage {
  id:      number;
  type:    "sent" | "received";
  content: string;
  time:    string;
  audio?:  boolean;
}

interface Agent {
  id:           string;
  name:         string;
  role:         string;
  icon:         LucideIcon;
  color:        string;
  lightColor:   string;
  textColor:    string;
  tagline:      string;
  superpower:   string;
  avatar:       string;
  stat:         { value: string; label: string };
  features:     readonly string[];
  cta:          string;
  conversation: ChatMessage[];
}

// ─── Alturas estáticas da forma de onda ───────────────────────────────────────
const WAVEFORM_HEIGHTS = [5, 9, 13, 6, 14, 10, 16, 7, 11, 4, 14, 9, 7, 15, 5, 11, 8, 13, 6, 15] as const;

// ─── Dados dos agentes ────────────────────────────────────────────────────────
const AGENTS: Agent[] = [
  {
    id:         "clara",
    name:       "Clara",
    role:       "Atendimento",
    icon:       MessageCircle,
    color:      "#25D366",
    lightColor: "#DCFCE7",
    textColor:  "#166534",
    tagline:    "Sua assistente 24h que nunca deixa cliente esperando.",
    superpower: "Não dorme. Não almoça. Não perde cliente.",
    avatar:     claraAvatar,
    stat:       { value: "< 1min", label: "tempo de resposta" },
    features: [
      "Responde no WhatsApp em segundos",
      "Entende áudio e texto naturalmente",
      "Filtra curiosos de clientes reais",
      "Coleta as informações do pedido",
    ],
    cta:         "Nunca mais perca cliente por demora",
    conversation: [
      { id: 1, type: "sent",     content: "Oi! Preciso instalar tomadas no meu home office", time: "14:32", audio: true },
      { id: 2, type: "received", content: "Oi! 👋 Aqui é a Clara da Silva Elétrica. Que ótimo! Quantas tomadas precisam ser instaladas?", time: "14:32" },
      { id: 3, type: "sent",     content: "Umas 4 tomadas e 2 pontos de rede, por favor", time: "14:33", audio: true },
    ],
  },
  {
    id:         "otavio",
    name:       "Otávio",
    role:       "Orçamento",
    icon:       Calculator,
    color:      "#8B5CF6",
    lightColor: "#F3E8FF",
    textColor:  "#6B21A8",
    tagline:    "Orçamentos precisos em minutos, não em horas.",
    superpower: "Não erra conta. Não esquece material. Não atrasa.",
    avatar:     otavioAvatar,
    stat:       { value: "3min", label: "pra gerar orçamento" },
    features: [
      "Calcula materiais e perdas automaticamente",
      "Aplica sua margem de lucro configurada",
      "Gera PDF profissional em minutos",
      "Histórico completo de orçamentos",
    ],
    cta:         "Pare de errar no orçamento",
    conversation: [
      { id: 1, type: "received", content: "Oi! Aqui é o Otávio da Silva Elétrica. 📋 A Clara me passou o pedido: 4 tomadas + 2 pontos de rede. Deixa eu calcular!", time: "14:35" },
      { id: 2, type: "received", content: "Calculei tudo: materiais + mão de obra. Total: R$ 420,00 com garantia. Posso enviar o detalhamento? 💰", time: "14:36" },
      { id: 3, type: "sent",     content: "Pode incluir a passagem de cabo aparente?", time: "14:37" },
    ],
  },
  {
    id:         "lucas",
    name:       "Lucas",
    role:       "Agenda",
    icon:       CalendarDays,
    color:      "#3B82F6",
    lightColor: "#DBEAFE",
    textColor:  "#1E40AF",
    tagline:    "Nunca mais esqueça ou perca uma visita técnica.",
    superpower: "Não esquece compromisso. Não fura. Não confunde horário.",
    avatar:     lucasAvatar,
    stat:       { value: "89%", label: "de comparecimento" },
    features: [
      "Agenda visitas no melhor horário",
      "Envia lembretes automáticos",
      "Reagenda sem você precisar fazer nada",
      "Confirma presença com antecedência",
    ],
    cta:         "Chega de perder visita marcada",
    conversation: [
      { id: 1, type: "received", content: "Oi! Aqui é o Lucas da Silva Elétrica. 📅 Confirmando sua visita técnica pra amanhã (quinta) às 10h. Tudo certo?", time: "18:00" },
      { id: 2, type: "sent",     content: "Opa, surgiu um imprevisto. Pode ser sexta?", time: "18:05" },
      { id: 3, type: "received", content: "Sem problemas! 😊 Tenho sexta às 9h ou às 14h. Qual prefere?", time: "18:05" },
    ],
  },
  {
    id:         "helena",
    name:       "Helena",
    role:       "Financeiro",
    icon:       Wallet,
    color:      "#F59E0B",
    lightColor: "#FEF3C7",
    textColor:  "#92400E",
    tagline:    "Saiba exatamente se você está lucrando ou não.",
    superpower: "Não perde nota. Não deixa passar parcela. Não engana.",
    avatar:     helenaAvatar,
    stat:       { value: "100%", label: "das parcelas rastreadas" },
    features: [
      "Registra entradas e pagamentos",
      "Controla saldo de cada projeto",
      "Mostra lucro real, sem enrolação",
      "Resumo mensal automático",
    ],
    cta:         "Descubra seu lucro de verdade",
    conversation: [
      { id: 1, type: "received", content: "Oi! Aqui é a Helena da Silva Elétrica. 💵 Vi que você fechou o serviço com a Marina. Valor de R$ 420,00, certo?", time: "10:00" },
      { id: 2, type: "sent",     content: "Isso, ela deu R$ 200 de entrada", time: "10:02" },
      { id: 3, type: "received", content: "Anotado! ✅ Entrada de R$ 200. Restam R$ 220. Quando ela vai pagar o restante?", time: "10:02" },
    ],
  },
  {
    id:         "maya",
    name:       "Maya",
    role:       "Divulgação",
    icon:       Instagram,
    color:      "#F97316",
    lightColor: "#FFEDD5",
    textColor:  "#9A3412",
    tagline:    "Divulgue seu trabalho sem virar digital influencer.",
    superpower: "Não trava na legenda. Não falta ideia. Não para de postar.",
    avatar:     mayaAvatar,
    stat:       { value: "3x", label: "mais engajamento" },
    features: [
      "Cria legendas prontas pra postar",
      "Sugere hashtags que funcionam",
      "Ideias de stories e reels",
      "Você posta em segundos",
    ],
    cta:         "Apareça mais sem perder tempo",
    conversation: [
      { id: 1, type: "sent",     content: "Terminei uma instalação elétrica, ficou bacana. O que posto?", time: "16:00", audio: true },
      { id: 2, type: "received", content: "Opa! Aqui é a Maya da Silva Elétrica. 📸 Manda a foto que eu crio a legenda pra você!", time: "16:01" },
      { id: 3, type: "sent",     content: "[Foto da instalação finalizada]", time: "16:02" },
    ],
  },
];

// ─── Card do agente (selecionável) ────────────────────────────────────────────

interface AgentCardProps {
  agent:    Agent;
  isActive: boolean;
  onClick:  () => void;
}

function AgentCard({ agent, isActive, onClick }: AgentCardProps) {
  const Icon = agent.icon;
  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative flex flex-col text-left transition-all duration-300 rounded-2xl overflow-hidden border-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        isActive
          ? "border-black shadow-[5px_5px_0_#000] -translate-x-[2px] -translate-y-[2px]"
          : "border-border/40 bg-card hover:border-black hover:shadow-[3px_3px_0_#000] hover:-translate-x-[1px] hover:-translate-y-[1px]"
      )}
      aria-pressed={isActive}
    >
      {/* Foto */}
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "4/5" }}>
        <img
          src={agent.avatar}
          alt={agent.name}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/70 to-transparent" />

        {/* Ícone funcional */}
        <div
          className="absolute top-2.5 left-2.5 w-8 h-8 rounded-full border-2 border-white/80 flex items-center justify-center shadow-md"
          style={{ background: agent.color }}
        >
          <Icon className="w-4 h-4 text-white" strokeWidth={2.5} />
        </div>

        {/* Nome + badge 24h */}
        <div className="absolute bottom-0 inset-x-0 px-3 pb-2.5 flex items-end justify-between gap-1">
          <span className="font-display font-black text-lg text-white drop-shadow leading-tight">
            {agent.name}
          </span>
          <span className="flex items-center gap-1 bg-black/60 backdrop-blur-sm rounded-full px-2 py-0.5 border border-white/20">
            <span className={cn("w-1.5 h-1.5 rounded-full", isActive ? "bg-[#25D366] animate-pulse" : "bg-white/60")} />
            <span className="text-[10px] font-bold text-white leading-none">24h</span>
          </span>
        </div>

        {/* Selected overlay */}
        {isActive && (
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{ background: agent.color }}
          />
        )}
      </div>

      {/* Info abaixo da foto */}
      <div className="p-3 flex flex-col gap-2 bg-card flex-1">
        {/* Role tag */}
        <span
          className="self-start px-2 py-0.5 rounded-full text-[10px] font-bold border border-black/20"
          style={{ background: agent.lightColor, color: agent.textColor }}
        >
          {agent.role}
        </span>

        {/* Superpower */}
        <p className="font-sans text-[11px] text-muted-foreground leading-snug line-clamp-2">
          {agent.superpower}
        </p>
      </div>
    </button>
  );
}

// ─── Chat WhatsApp ────────────────────────────────────────────────────────────

interface WhatsAppChatProps {
  agent:           Agent;
  visibleMessages: number[];
}

function WhatsAppChat({ agent, visibleMessages }: WhatsAppChatProps) {
  return (
    <div className="rounded-[2rem] overflow-hidden border-2 border-black shadow-[6px_6px_0_#000]">
      {/* Header */}
      <div className="px-4 py-3 flex items-center gap-3" style={{ backgroundColor: "#075E54" }}>
        <div className="w-10 h-10 rounded-full overflow-hidden bg-white/20 border-2 border-white/30">
          <img src={agent.avatar} alt={agent.name} className="w-full h-full object-cover object-top" />
        </div>
        <div className="flex-1">
          <p className="text-white font-semibold text-sm">{agent.name}</p>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green-300 animate-pulse" />
            <p className="text-white/70 text-xs">online agora</p>
          </div>
        </div>
      </div>

      {/* Mensagens */}
      <div
        className="h-[240px] overflow-y-auto p-4 space-y-3"
        style={{ backgroundColor: "#ECE5DD" }}
        aria-live="polite"
      >
        {agent.conversation.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              "flex transition-all duration-500",
              msg.type === "sent" ? "justify-end" : "justify-start",
              visibleMessages.includes(msg.id)
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            )}
          >
            <div className={cn(
              "max-w-[85%] rounded-lg px-3 py-2 shadow-sm",
              msg.type === "sent"
                ? "bg-[#DCF8C6] rounded-tr-none"
                : "bg-white rounded-tl-none"
            )}>
              {msg.audio && (
                <div className="flex items-center gap-2 mb-1">
                  <Mic className="w-4 h-4 text-[#075E54]" />
                  <div className="flex gap-0.5">
                    {WAVEFORM_HEIGHTS.map((h, i) => (
                      <div key={i} className="w-0.5 bg-[#075E54]/60 rounded-full" style={{ height: h }} />
                    ))}
                  </div>
                </div>
              )}
              <p className="text-sm text-foreground/90">{msg.content}</p>
              <div className="flex items-center justify-end gap-1 mt-1">
                <span className="text-[10px] text-muted-foreground">{msg.time}</span>
                {msg.type === "sent" && <CheckCheck className="w-3 h-3 text-[#53bdeb]" />}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input decorativo */}
      <div className="bg-[#F0F0F0] px-3 py-2 flex items-center gap-2">
        <div className="flex-1 bg-white rounded-full px-4 py-2">
          <span className="text-muted-foreground text-sm">Mensagem</span>
        </div>
        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#075E54]">
          <Mic className="w-5 h-5 text-white" />
        </div>
      </div>
    </div>
  );
}

// ─── Componente principal ─────────────────────────────────────────────────────

export function AgentShowcaseSection() {
  const [activeId, setActiveId]             = useState("clara");
  const [visibleMessages, setVisibleMessages] = useState<number[]>([]);

  const active = AGENTS.find((a) => a.id === activeId) ?? AGENTS[0];

  const resetChat = useCallback(() => {
    setVisibleMessages([]);
    active.conversation.forEach((msg, i) => {
      setTimeout(() => setVisibleMessages((p) => [...p, msg.id]), i * 600 + 300);
    });
  }, [active]);

  useEffect(() => { resetChat(); }, [activeId, resetChat]);

  return (
    <section className="py-16 md:py-24 bg-section-beige" aria-labelledby="agents-heading">
      <div className="container">

        {/* Cabeçalho */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Clock className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Trabalham 24h por dia, 7 dias por semana</span>
          </div>
          <h2 id="agents-heading" className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Conheça sua <span className="text-gradient">nova equipe</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Clique em cada agente para ver uma conversa real pelo WhatsApp.{" "}
            <strong className="text-foreground">Sem dormir. Sem folga. Sem feriado.</strong>
          </p>
        </div>

        {/* 5 cards de agente */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-10">
          {AGENTS.map((agent) => (
            <AgentCard
              key={agent.id}
              agent={agent}
              isActive={activeId === agent.id}
              onClick={() => setActiveId(agent.id)}
            />
          ))}
        </div>

        {/* Painel do agente ativo */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeId}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="rounded-3xl border border-border/60 overflow-hidden"
            style={{ boxShadow: `0 4px 40px -8px ${active.color}25` }}
          >
            <div className="bg-background/80 backdrop-blur-sm p-6 md:p-10">
              <div className="grid lg:grid-cols-[1fr_auto_1fr] gap-8 lg:gap-12 items-start max-w-6xl mx-auto">

                {/* Coluna esquerda — info */}
                <div className="space-y-5">
                  {/* Nome, role, superpower */}
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-3xl md:text-4xl font-black" style={{ color: active.color }}>
                        {active.name}
                      </h3>
                      <span
                        className="px-3 py-1 rounded-full text-xs font-bold border"
                        style={{ background: active.lightColor, color: active.textColor, borderColor: `${active.color}40` }}
                      >
                        {active.role}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-lg">{active.tagline}</p>
                  </div>

                  {/* Superpower badge */}
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/5 border border-border/60">
                    <Zap className="w-4 h-4 flex-shrink-0" style={{ color: active.color }} />
                    <span className="text-sm font-bold text-foreground">{active.superpower}</span>
                  </div>

                  {/* Features */}
                  <ul className="space-y-2.5">
                    {active.features.map((f, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + i * 0.07 }}
                        className="flex items-center gap-3"
                      >
                        <div
                          className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ background: active.lightColor }}
                        >
                          <Check className="w-3 h-3" style={{ color: active.color }} />
                        </div>
                        <span className="text-foreground/80">{f}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* Stat + CTA */}
                  <div className="flex flex-wrap items-center gap-4 pt-1">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground bg-foreground/5 rounded-full px-3 py-1.5">
                      <span className="font-black text-base" style={{ color: active.color }}>{active.stat.value}</span>
                      <span>{active.stat.label}</span>
                    </div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45 }}
                  >
                    <Link to={`/agente/${active.id}`}>
                      <Button
                        size="lg"
                        className="gap-2 font-bold rounded-full shadow-[4px_4px_0_#000] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-150"
                        style={{ backgroundColor: active.color, color: "#fff" }}
                      >
                        {active.cta}
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </motion.div>
                </div>

                {/* Coluna central — chat (desktop) */}
                <div className="hidden lg:block w-[300px]">
                  <WhatsAppChat agent={active} visibleMessages={visibleMessages} />
                </div>

                {/* Coluna direita — foto grande */}
                <div className="hidden lg:flex justify-center items-start">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.15, type: "spring", stiffness: 200 }}
                    className="relative"
                  >
                    <div
                      className="w-[260px] h-[320px] rounded-3xl overflow-hidden border-2 border-black shadow-[6px_6px_0_#000]"
                    >
                      <img
                        src={active.avatar}
                        alt={active.name}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    {/* Badge ativo */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5, type: "spring" }}
                      className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-background shadow-md border-2 border-black flex items-center gap-2 whitespace-nowrap"
                    >
                      <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-xs font-bold text-foreground">IA Ativa 24/7</span>
                    </motion.div>
                  </motion.div>
                </div>

              </div>

              {/* Rodapé de confiança */}
              <div className="mt-8 pt-6 border-t border-border/30 flex flex-wrap items-center justify-center gap-6 md:gap-10 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary" />
                  <span>Sem contrato de fidelidade</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>Funciona 24h, 7 dias por semana</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-primary" />
                  <span>Mais barato que um café por dia</span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
