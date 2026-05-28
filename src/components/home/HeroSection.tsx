import { useState, useEffect, useCallback, useMemo } from "react";
import { ArrowRight, CheckCheck, Mic, Play, Pause } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

import claraAvatar   from "@/assets/avatars/ze-atendimento-v3.webp";
import chicoAvatar   from "@/assets/avatars/chico-orcamento-v3.webp";
import netoAvatar    from "@/assets/avatars/neto-agenda-v3.webp";
import donaAvatar    from "@/assets/avatars/dona-conta-v3.webp";
import heroWatermark from "@/assets/backgrounds/hero-watermark.webp";

// ─── Tipos ────────────────────────────────────────────────────────────────────

interface TypingPhrase {
  text: string;
  tag: string;
}

interface ChatMessage {
  id: number;
  sender: "client" | "agent";
  agentName: string;
  agentAvatar: string;
  text: string;
  isAudio?: boolean;
  audioDuration?: string;
  delay: number;
}

// ─── Dados ────────────────────────────────────────────────────────────────────

const TYPING_PHRASES: TypingPhrase[] = [
  { text: "atendendo clientes 24h por dia.",        tag: "Funciona no WhatsApp"                  },
  { text: "respondendo clientes em segundos.",       tag: "Sem deixar mensagem sem resposta"       },
  { text: "gerando orçamentos automáticos.",         tag: "Áudio ou texto → orçamento pronto"     },
  { text: "economizando horas todo dia.",            tag: "Menos conversa. Mais serviço fechado."  },
  { text: "faturando mais sem trabalhar mais.",      tag: "Organização gera lucro"                 },
  { text: "com uma equipe que não para.",            tag: "24h • Sem férias • Sem atraso"          },
  { text: "funcionando sozinha no WhatsApp.",        tag: "Não é um robô. É uma equipe."           },
];

const CHAT_FLOW: ChatMessage[] = [
  { id: 1, sender: "client", agentName: "",       agentAvatar: "",          text: "Oi, preciso de um eletricista pra trocar o quadro de luz", delay: 0    },
  { id: 2, sender: "agent",  agentName: "Clara",  agentAvatar: claraAvatar, text: "Olá! 👋 Sou a Clara, assistente. Pode me contar mais?",   delay: 1200 },
  { id: 3, sender: "client", agentName: "",       agentAvatar: "",          text: "", isAudio: true, audioDuration: "0:12",                  delay: 2800 },
  { id: 4, sender: "agent",  agentName: "Otávio", agentAvatar: chicoAvatar, text: "Entendi! Calculando o orçamento...",                      delay: 4200 },
  { id: 5, sender: "agent",  agentName: "Otávio", agentAvatar: chicoAvatar, text: "", isAudio: true, audioDuration: "0:08",                  delay: 5400 },
  { id: 6, sender: "client", agentName: "",       agentAvatar: "",          text: "Fechado! Quando pode vir?",                               delay: 7000 },
  { id: 7, sender: "agent",  agentName: "Lucas",  agentAvatar: netoAvatar,  text: "Quinta às 9h está ótimo! ✅",                             delay: 8400 },
];

// Alturas estáticas para a forma de onda (evita Math.random em render)
const WAVEFORM_HEIGHTS = [4, 8, 12, 6, 14, 10, 16, 8, 12, 4, 14, 10, 8, 16, 6, 12, 8, 10, 4, 14];

// ─── Hook: efeito de digitação ────────────────────────────────────────────────

function useTypingEffect(phrases: TypingPhrase[]) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping]       = useState(true);
  const [showCursor, setShowCursor]   = useState(true);

  // Cursor piscante
  useEffect(() => {
    const id = setInterval(() => setShowCursor((v) => !v), 530);
    return () => clearInterval(id);
  }, []);

  // Digitar / apagar
  useEffect(() => {
    const target = phrases[phraseIndex].text;
    let id: ReturnType<typeof setTimeout>;

    if (isTyping) {
      if (displayText.length < target.length) {
        id = setTimeout(() => setDisplayText(target.slice(0, displayText.length + 1)), 60);
      } else {
        id = setTimeout(() => setIsTyping(false), 3000);
      }
    } else {
      if (displayText.length > 0) {
        id = setTimeout(() => setDisplayText((t) => t.slice(0, -1)), 30);
      } else {
        setPhraseIndex((i) => (i + 1) % phrases.length);
        setIsTyping(true);
      }
    }

    return () => clearTimeout(id);
  }, [displayText, isTyping, phraseIndex, phrases]);

  return { displayText, currentPhrase: phrases[phraseIndex], showCursor, phraseIndex };
}

// ─── Sub-componente: forma de onda de áudio ───────────────────────────────────

function AudioWaveform({ isPlaying }: { isPlaying: boolean }) {
  return (
    <div className="flex items-center gap-0.5 h-5">
      {WAVEFORM_HEIGHTS.map((h, i) => (
        <motion.div
          key={i}
          className="w-0.5 bg-[#075E54] rounded-full"
          animate={isPlaying ? { height: [h / 2, h, h / 2] } : { height: h / 2 }}
          transition={{ duration: 0.4, repeat: isPlaying ? Infinity : 0, delay: i * 0.05 }}
          style={{ height: h / 2 }}
        />
      ))}
    </div>
  );
}

// ─── Sub-componente: bolha de áudio ──────────────────────────────────────────

interface AudioBubbleProps {
  duration: string;
  isAgent: boolean;
  agentAvatar?: string;
}

function AudioBubble({ duration, isAgent, agentAvatar }: AudioBubbleProps) {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setPlaying(true);
      const t2 = setTimeout(() => setPlaying(false), 2000);
      return () => clearTimeout(t2);
    }, 500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={`flex items-center gap-2 ${isAgent ? "flex-row" : "flex-row-reverse"}`}>
      {isAgent && agentAvatar && (
        <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
          <img src={agentAvatar} alt="" className="w-full h-full object-cover" />
        </div>
      )}
      <div
        className={`flex items-center gap-3 px-3 py-2 rounded-2xl min-w-[160px] ${
          isAgent
            ? "bg-white shadow-sm border border-border/30 rounded-bl-md"
            : "bg-[#DCF8C6] rounded-br-md"
        }`}
      >
        <button
          onClick={() => setPlaying((v) => !v)}
          className="w-8 h-8 rounded-full bg-[#075E54] text-white flex items-center justify-center flex-shrink-0"
          aria-label={playing ? "Pausar áudio" : "Reproduzir áudio"}
        >
          {playing
            ? <Pause className="w-4 h-4" />
            : <Play className="w-4 h-4 ml-0.5" />}
        </button>
        <div className="flex-1"><AudioWaveform isPlaying={playing} /></div>
        <span className="text-xs text-muted-foreground flex-shrink-0">{duration}</span>
      </div>
    </div>
  );
}

// ─── Sub-componente: mockup do WhatsApp ──────────────────────────────────────

function WhatsAppMockup() {
  const [visibleIds, setVisibleIds] = useState<number[]>([]);
  const [cycle, setCycle]           = useState(0);

  const startConversation = useCallback(() => {
    setVisibleIds([]);
    CHAT_FLOW.forEach(({ id, delay }) => {
      setTimeout(() => setVisibleIds((prev) => [...prev, id]), delay);
    });
    setTimeout(() => setCycle((c) => c + 1), 12000);
  }, []);

  useEffect(() => { startConversation(); }, [cycle, startConversation]);

  return (
    <div className="relative max-w-[300px] sm:max-w-[360px] mx-auto lg:mx-0 lg:ml-auto">
      {/* Frame do telefone */}
      <div className="relative bg-white rounded-[2rem] shadow-xl shadow-primary/10 overflow-hidden border border-primary/10">

        {/* Barra de status */}
        <div className="bg-[#075E54] px-4 py-1.5 flex items-center justify-center">
          <span className="text-xs font-medium text-white/90">9:41</span>
        </div>

        {/* Cabeçalho do chat */}
        <div className="bg-[#075E54] px-4 py-3 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-white/20 flex-shrink-0 border-2 border-white/30">
            <img src={claraAvatar} alt="Clara" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1">
            <p className="text-white font-semibold text-sm">Equipe MandaUmZap</p>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
              <p className="text-white/80 text-xs">online</p>
            </div>
          </div>
        </div>

        {/* Área de conversa */}
        <div className="h-[340px] overflow-hidden p-3 space-y-2" style={{ background: "#E5DDD5" }}>
          <AnimatePresence>
            {CHAT_FLOW.map((msg) => (
              <motion.div
                key={`${msg.id}-${cycle}`}
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={
                  visibleIds.includes(msg.id)
                    ? { opacity: 1, y: 0, scale: 1 }
                    : { opacity: 0, y: 15, scale: 0.95 }
                }
                transition={{ duration: 0.3, ease: "easeOut" }}
                className={`flex ${msg.sender === "client" ? "justify-end" : "justify-start"}`}
              >
                {msg.isAudio ? (
                  <AudioBubble
                    duration={msg.audioDuration!}
                    isAgent={msg.sender === "agent"}
                    agentAvatar={msg.agentAvatar}
                  />
                ) : (
                  <div className="flex items-end gap-1.5">
                    {msg.sender === "agent" && msg.agentAvatar && (
                      <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0 mb-1">
                        <img src={msg.agentAvatar} alt={msg.agentName} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div
                      className={`max-w-[75%] rounded-lg px-3 py-2 ${
                        msg.sender === "client"
                          ? "bg-[#DCF8C6] rounded-br-sm"
                          : "bg-white rounded-bl-sm shadow-sm"
                      }`}
                    >
                      <p className="text-sm text-foreground leading-relaxed">{msg.text}</p>
                      <p className="text-[10px] text-muted-foreground text-right mt-0.5 flex items-center justify-end gap-1">
                        11:45
                        {msg.sender === "client" && (
                          <CheckCheck className="w-3 h-3 text-primary" />
                        )}
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Barra de input */}
        <div className="bg-[#F0F0F0] px-2 py-2 flex items-center gap-2">
          <div className="flex-1 bg-white rounded-full px-3 py-1.5 text-sm text-muted-foreground border border-gray-200">
            Mensagem
          </div>
          <motion.div
            className="w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center shadow-sm cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Mic className="w-5 h-5 text-white" />
          </motion.div>
        </div>
      </div>

      {/* Badge: lead qualificado */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute -bottom-3 right-4 px-4 py-2 bg-white rounded-full shadow-lg border border-[#25D366]/30 flex items-center gap-2"
      >
        <span className="bg-[#25D366] text-white text-xs font-bold px-2 py-0.5 rounded">WhatsApp</span>
        <span className="text-sm font-medium text-foreground">Áudio ou texto</span>
      </motion.div>

      {/* Avatares flutuantes */}
      {([
        { src: chicoAvatar, alt: "Otávio", top: "top-16",  left: "-left-4",  size: "w-12 h-12", y: [0, -8, 0], dur: 3     },
        { src: netoAvatar,  alt: "Lucas",  top: "top-32",  left: "-right-4", size: "w-11 h-11", y: [0,  8, 0], dur: 3.5   },
        { src: donaAvatar,  alt: "Helena", top: "bottom-28",left: "-left-2", size: "w-10 h-10", y: [0, -6, 0], dur: 4     },
      ] as const).map(({ src, alt, top, left, size, y, dur }) => (
        <motion.div
          key={alt}
          animate={{ y }}
          transition={{ duration: dur, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute ${top} ${left} z-20`}
        >
          <div className={`${size} rounded-full border-2 border-white shadow-lg overflow-hidden bg-white ring-2 ring-[#25D366]/30`}>
            <img src={src} alt={alt} className="w-full h-full object-cover" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Componente principal ─────────────────────────────────────────────────────

export function HeroSection() {
  const { displayText, currentPhrase, showCursor, phraseIndex } = useTypingEffect(TYPING_PHRASES);

  return (
    <section className="relative pt-28 pb-10 md:pt-32 md:pb-16 overflow-hidden bg-section-beige">

      {/* Marca d'água de fundo */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url(${heroWatermark})`,
          backgroundSize: "800px",
          backgroundRepeat: "repeat",
          opacity: 0.1,
          filter: "sepia(1) saturate(0.3) brightness(0.6)",
        }}
        aria-hidden="true"
      />
      {/* Fade inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none z-[1]" aria-hidden="true" />

      <div className="container relative z-10 px-4 md:px-6 mx-auto">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-center">

          {/* Coluna esquerda — texto */}
          <div className="text-center lg:text-left order-1">

            {/* Badge WhatsApp */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 text-sm font-medium text-[#075E54] mb-8"
            >
              <Mic className="w-4 h-4" aria-hidden="true" />
              100% WhatsApp · Texto ou áudio
            </motion.p>

            {/* Título + frase animada */}
            <div className="mb-8">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="font-sans text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold text-foreground leading-[1.15] tracking-tighter"
              >
                Sua prestação de serviços
              </motion.h1>

              {/* Área fixa para a frase digitada */}
              <div className="h-[88px] md:h-[104px] lg:h-[140px] flex items-start justify-center lg:justify-start">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="font-sans text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold leading-[1.15] tracking-tighter text-foreground"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  {displayText}
                  <span
                    className={`inline-block w-[3px] h-[0.9em] ml-1 align-middle bg-foreground transition-opacity duration-100 ${
                      showCursor ? "opacity-100" : "opacity-0"
                    }`}
                    aria-hidden="true"
                  />
                </motion.p>
              </div>

              {/* Tag da frase atual */}
              <AnimatePresence mode="wait">
                <motion.p
                  key={phraseIndex}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 text-muted-foreground text-sm font-medium"
                >
                  {currentPhrase.tag}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-6"
            >
              <Link to="/carrinho">
                <Button size="lg" className="gap-2 text-base px-8 py-6 font-medium w-full sm:w-auto">
                  Quero começar
                  <ArrowRight className="w-5 h-5" aria-hidden="true" />
                </Button>
              </Link>
              <Link to="/agentes">
                <Button variant="outline" size="lg" className="gap-2 text-base px-8 py-6 font-medium w-full sm:w-auto">
                  Conheça mais
                </Button>
              </Link>
            </motion.div>

            {/* Indicadores de progresso */}
            <div className="flex justify-center lg:justify-start gap-1.5" role="tablist" aria-label="Frases">
              {TYPING_PHRASES.map((_, i) => (
                <div
                  key={i}
                  role="tab"
                  aria-selected={i === phraseIndex}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i === phraseIndex ? "bg-[#25D366] w-6" : "bg-[#25D366]/30 w-1.5"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Coluna direita — mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="order-2"
          >
            <WhatsAppMockup />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
