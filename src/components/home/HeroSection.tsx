import { useState, useEffect, useCallback } from "react";
import { ArrowRight, CheckCheck, Mic, Play, Pause } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

// Avatar imports
import claraAvatar from "@/assets/avatars/ze-atendimento-v3.webp";
import chicoAvatar from "@/assets/avatars/chico-orcamento-v3.webp";
import netoAvatar from "@/assets/avatars/neto-agenda-v3.webp";
import donaContaAvatar from "@/assets/avatars/dona-conta-v3.webp";

// Background watermark
import heroWatermark from "@/assets/backgrounds/hero-watermark.webp";

// Frases para o efeito de digitação
const typingPhrases = [
  { text: "atendendo clientes 24h por dia.", tag: "Funciona no WhatsApp" },
  { text: "respondendo clientes em segundos.", tag: "Sem deixar mensagem sem resposta" },
  { text: "gerando orçamentos automáticos.", tag: "Áudio ou texto → orçamento pronto" },
  { text: "economizando horas todo dia.", tag: "Menos conversa. Mais serviço fechado." },
  { text: "faturando mais sem trabalhar mais.", tag: "Organização gera lucro" },
  { text: "com uma equipe que não para.", tag: "24h • Sem férias • Sem atraso" },
  { text: "funcionando sozinha no WhatsApp.", tag: "Não é um robô. É uma equipe." },
];

// Enhanced conversation with audio messages
interface SimMessage {
  id: number;
  sender: "client" | "agent";
  agentName: string;
  agentAvatar: string;
  text: string;
  isAudio?: boolean;
  audioDuration?: string;
  delay: number;
}

const conversationFlow: SimMessage[] = [
  { id: 1, sender: "client", agentName: "", agentAvatar: "", text: "Oi, preciso de um armário pra cozinha", delay: 0 },
  { id: 2, sender: "agent", agentName: "Clara", agentAvatar: claraAvatar, text: "Olá! Me conta mais sobre o que precisa 👋", delay: 1200 },
  { id: 3, sender: "client", agentName: "", agentAvatar: "", text: "", isAudio: true, audioDuration: "0:12", delay: 2800 },
  { id: 4, sender: "agent", agentName: "Otávio", agentAvatar: chicoAvatar, text: "Entendi! Calculando o orçamento...", delay: 4200 },
  { id: 5, sender: "agent", agentName: "Otávio", agentAvatar: chicoAvatar, text: "", isAudio: true, audioDuration: "0:08", delay: 5400 },
  { id: 6, sender: "client", agentName: "", agentAvatar: "", text: "Fechado! Quando pode vir medir?", delay: 7000 },
  { id: 7, sender: "agent", agentName: "Lucas", agentAvatar: netoAvatar, text: "Quinta às 9h está ótimo! ✅", delay: 8400 },
];

// Hook para efeito de digitação
function useTypingEffect(phrases: typeof typingPhrases) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);

  const currentPhrase = phrases[currentIndex];

  useEffect(() => {
    // Cursor blinking
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isTyping) {
      // Typing
      if (displayText.length < currentPhrase.text.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentPhrase.text.slice(0, displayText.length + 1));
        }, 60); // Velocidade de digitação
      } else {
        // Finished typing, wait before deleting
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, 3000); // Pausa após digitar
      }
    } else {
      // Deleting
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 30); // Velocidade de apagar
      } else {
        // Move to next phrase
        setCurrentIndex((prev) => (prev + 1) % phrases.length);
        setIsTyping(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isTyping, currentPhrase.text, phrases.length]);

  return { displayText, currentPhrase, showCursor, currentIndex };
}

// Audio waveform component
function AudioWaveform({ isPlaying }: { isPlaying: boolean }) {
  return (
    <div className="flex items-center gap-0.5 h-5">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="w-0.5 bg-whatsapp-teal rounded-full"
          animate={isPlaying ? {
            height: [4, Math.random() * 16 + 4, 4],
          } : { height: 4 }}
          transition={{
            duration: 0.4,
            repeat: isPlaying ? Infinity : 0,
            delay: i * 0.05,
          }}
          style={{ height: 4 }}
        />
      ))}
    </div>
  );
}

// Audio message bubble component
function AudioBubble({ 
  duration, 
  isAgent,
  agentAvatar 
}: { 
  duration: string; 
  isAgent: boolean;
  agentAvatar?: string;
}) {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPlaying(true);
      setTimeout(() => setIsPlaying(false), 2000);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`flex items-center gap-2 ${isAgent ? 'flex-row' : 'flex-row-reverse'}`}>
      {isAgent && agentAvatar && (
        <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
          <img src={agentAvatar} alt="" className="w-full h-full object-cover" />
        </div>
      )}
      <div
        className={`flex items-center gap-3 px-3 py-2 rounded-2xl min-w-[160px] ${
          isAgent
            ? "bg-white shadow-sm border border-border/30 rounded-bl-md"
            : "bg-chat-bubble-outgoing rounded-br-md"
        }`}
      >
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
            isAgent ? "bg-whatsapp-teal text-white" : "bg-whatsapp-teal/80 text-white"
          }`}
          aria-label={isPlaying ? "Pausar áudio" : "Reproduzir áudio"}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
        </button>
        <div className="flex-1">
          <AudioWaveform isPlaying={isPlaying} />
        </div>
        <span className="text-xs text-muted-foreground flex-shrink-0">{duration}</span>
      </div>
    </div>
  );
}

export function HeroSection() {
  const { displayText, currentPhrase, showCursor, currentIndex } = useTypingEffect(typingPhrases);
  const [visibleMessages, setVisibleMessages] = useState<number[]>([]);
  const [conversationCycle, setConversationCycle] = useState(0);

  // Conversation animation
  const startConversation = useCallback(() => {
    setVisibleMessages([]);
    conversationFlow.forEach((msg) => {
      setTimeout(() => {
        setVisibleMessages((prev) => [...prev, msg.id]);
      }, msg.delay);
    });
    
    setTimeout(() => {
      setConversationCycle((prev) => prev + 1);
    }, 12000);
  }, []);

  useEffect(() => {
    startConversation();
  }, [conversationCycle, startConversation]);

  return (
    <section className="relative pt-28 pb-10 md:pt-32 md:pb-16 overflow-hidden bg-section-beige">
      {/* Watermark background - estilo WhatsApp */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url(${heroWatermark})`,
          backgroundSize: '800px',
          backgroundRepeat: 'repeat',
          opacity: 0.1,
          filter: 'sepia(1) saturate(0.3) brightness(0.6)',
        }}
      />
      {/* Fade at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none z-[1]" />
      
      <div className="container relative z-10 px-4 md:px-6 mx-auto">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-center">
          {/* Left side - Text content */}
          <div className="text-center lg:text-left order-1">
            {/* WhatsApp badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 text-sm font-medium text-whatsapp-teal mb-8"
            >
              <Mic className="w-4 h-4" />
              100% WhatsApp · Texto ou áudio
            </motion.div>

            {/* Headline fixa + Frase digitada */}
            <div className="mb-8">
              {/* Texto fixo */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="font-sans text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-foreground leading-[1.15] tracking-tighter"
              >
                Sua prestação de serviços
              </motion.h1>
              
              {/* Frase digitada em verde - altura fixa para 2 linhas */}
              <div className="h-[88px] md:h-[104px] lg:h-[130px] flex items-start justify-center lg:justify-start">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="font-sans text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black leading-[1.15] tracking-tighter text-center lg:text-left max-w-[280px] sm:max-w-none text-foreground"
                >
                  {displayText}
                  <span 
                    className={`inline-block w-[3px] h-[0.9em] ml-1 align-middle transition-opacity duration-100 bg-foreground ${showCursor ? 'opacity-100' : 'opacity-0'}`}
                  />
                </motion.p>
              </div>

              {/* Tag discreta */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4"
                >
                  <span className="inline-flex items-center gap-2 text-muted-foreground text-sm font-medium">
                    {currentPhrase.tag}
                  </span>
                </motion.div>
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
                <Button size="lg" className="gap-2 text-base px-8 py-6 font-medium">
                  Quero começar
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/agentes">
                <Button variant="outline" size="lg" className="gap-2 text-base px-8 py-6 font-medium">
                  Conheça mais
                </Button>
              </Link>
            </motion.div>

            {/* Progress dots */}
            <div className="flex justify-center lg:justify-start gap-1.5">
              {typingPhrases.map((_, index) => (
                <div
                  key={index}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    index === currentIndex 
                      ? "bg-whatsapp w-6" 
                      : "bg-whatsapp/30 w-1.5"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Right side - WhatsApp simulation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="order-2"
          >
            <div className="relative max-w-[300px] sm:max-w-[360px] mx-auto lg:mx-0 lg:ml-auto">
              {/* Phone mockup */}
              <div className="relative bg-white rounded-[2rem] shadow-xl shadow-primary/10 overflow-hidden border border-primary/10">
                {/* Status bar */}
                <div className="bg-whatsapp-teal px-4 py-1.5 flex items-center justify-center">
                  <span className="text-xs font-medium text-white/90">9:41</span>
                </div>

                {/* Chat header */}
                <div className="bg-whatsapp-teal px-4 py-3 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-white/20 flex items-center justify-center border-2 border-white/30">
                    <img src={claraAvatar} alt="Clara" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-semibold text-sm">Equipe MandaUmZap</p>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-whatsapp animate-pulse" />
                      <p className="text-white/80 text-xs">online</p>
                    </div>
                  </div>
                </div>

                {/* Chat area */}
                <div className="h-[340px] overflow-hidden p-3 space-y-2 bg-chat-bg">
                  <AnimatePresence>
                    {conversationFlow.map((msg) => (
                      <motion.div
                        key={`${msg.id}-${conversationCycle}`}
                        initial={{ opacity: 0, y: 15, scale: 0.95 }}
                        animate={visibleMessages.includes(msg.id) ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 15, scale: 0.95 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className={`flex ${msg.sender === "client" ? "justify-end" : "justify-start"}`}
                      >
                        {msg.isAudio ? (
                          <AudioBubble 
                            duration={msg.audioDuration || "0:00"} 
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
                                  ? "bg-chat-bubble-outgoing rounded-br-sm"
                                  : "bg-chat-bubble-incoming rounded-bl-sm shadow-sm"
                              }`}
                            >
                              <p className="text-sm text-foreground leading-relaxed">{msg.text}</p>
                              <p className="text-[10px] text-muted-foreground text-right mt-0.5 flex items-center justify-end gap-1">
                                11:45
                                {msg.sender === "client" && <CheckCheck className="w-3 h-3 text-primary" />}
                              </p>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Input area */}
                <div className="bg-chat-bg px-2 py-2 flex items-center gap-2 border-t border-border/20">
                  <div className="flex-1 bg-white rounded-full px-4 py-2 flex items-center">
                    <span className="text-muted-foreground text-sm">Mensagem</span>
                  </div>
                  <motion.div 
                    className="w-10 h-10 bg-whatsapp rounded-full flex items-center justify-center shadow-sm cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Mic className="w-5 h-5 text-white" />
                  </motion.div>
                </div>
              </div>

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.3 }}
                className="absolute -bottom-3 right-4 px-4 py-2 bg-white rounded-full shadow-lg border border-whatsapp/30 flex items-center gap-2"
              >
                <span className="bg-whatsapp text-whatsapp-foreground text-xs font-bold px-2 py-0.5 rounded">WhatsApp</span>
                <span className="text-sm font-medium text-foreground">Áudio ou texto</span>
              </motion.div>

              {/* Floating avatars */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -left-4 top-16 z-20"
              >
                <div className="w-12 h-12 rounded-full border-3 border-white shadow-lg overflow-hidden bg-white ring-2 ring-whatsapp/30">
                  <img src={chicoAvatar} alt="Otávio" className="w-full h-full object-cover" />
                </div>
              </motion.div>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -right-4 top-32 z-20"
              >
                <div className="w-11 h-11 rounded-full border-3 border-white shadow-lg overflow-hidden bg-white ring-2 ring-whatsapp/30">
                  <img src={netoAvatar} alt="Lucas" className="w-full h-full object-cover" />
                </div>
              </motion.div>
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -left-2 bottom-28 z-20"
              >
                <div className="w-10 h-10 rounded-full border-3 border-white shadow-lg overflow-hidden bg-white ring-2 ring-whatsapp/30">
                  <img src={donaContaAvatar} alt="Helena" className="w-full h-full object-cover" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}