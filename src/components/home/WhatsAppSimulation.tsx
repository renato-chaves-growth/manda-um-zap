import { useState, useEffect, useCallback } from "react";
import { CheckCheck, Mic, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Avatar imports - AI-style realistic portraits
import claraAvatar from "@/assets/avatars/ze-atendimento-v3.webp";
import chicoAvatar from "@/assets/avatars/chico-orcamento-v3.webp";
import netoAvatar from "@/assets/avatars/neto-agenda-v3.webp";
import donaContaAvatar from "@/assets/avatars/dona-conta-v3.webp";
import zecaAvatar from "@/assets/avatars/zeca-instagram-v3.webp";

interface Message {
  id: number;
  type: "sent" | "received";
  content: string;
  time: string;
  audio?: boolean;
  agent?: string;
}

interface AgentData {
  id: string;
  name: string;
  shortName: string;
  role: string;
  description: string;
  avatar: string;
  color: string;
  bgColor: string;
  bullets: string[];
  cta: string;
  conversation: Message[];
}

const agents: AgentData[] = [
  {
    id: "clara",
    name: "Clara",
    shortName: "Atende",
    role: "Agente de Atendimento",
    description: "Seu assistente 24h que nunca deixa cliente esperando.",
    avatar: claraAvatar,
    color: "text-[#1DB954]",
    bgColor: "bg-[#1DB954]",
    bullets: [
      "Responde no WhatsApp em segundos",
      "Entende áudio e texto naturalmente",
      "Filtra curiosos de clientes reais",
      "Coleta todas as informações do pedido",
    ],
    cta: "Nunca mais perca cliente por demora",
    conversation: [
      { id: 1, type: "sent", content: "Oi, tudo bem? Preciso de um armário pra cozinha", time: "14:32", audio: true },
      { id: 2, type: "received", content: "Oi! 👋 Aqui é a Clara da prestação de serviços Silva. Que legal que você quer um armário pra cozinha! Pode me contar mais sobre o que precisa?", time: "14:32" },
      { id: 3, type: "sent", content: "Quero um armário aéreo, 2 metros de largura, MDF branco", time: "14:33", audio: true },
      { id: 4, type: "received", content: "Perfeito! Anotado: armário aéreo, 2m de largura, MDF branco. Vou passar pro Otávio calcular o orçamento. Qual o melhor horário pra visita técnica?", time: "14:33" },
      { id: 5, type: "sent", content: "Pode ser quinta de manhã?", time: "14:34" },
      { id: 6, type: "received", content: "Quinta às 9h está ótimo! ✅ Vou confirmar com você na quarta. O orçamento estimado ficou em R$ 1.450!", time: "14:34" },
    ],
  },
  {
    id: "otavio",
    name: "Otávio",
    shortName: "Orça",
    role: "Agente de Orçamento",
    description: "Orçamentos precisos em minutos, não em horas.",
    avatar: chicoAvatar,
    color: "text-[#0D9488]",
    bgColor: "bg-[#0D9488]",
    bullets: [
      "Calcula MDF, chapas e perdas automaticamente",
      "Aplica sua margem de lucro configurada",
      "Gera PDF profissional em minutos",
      "Histórico completo de orçamentos",
    ],
    cta: "Pare de errar no orçamento",
    conversation: [
      { id: 1, type: "received", content: "Oi! Aqui é o Otávio da prestação de serviços Silva. 📋 A Clara me passou seu projeto do armário aéreo. Deixa eu calcular direitinho pra você!", time: "14:35" },
      { id: 2, type: "received", content: "Calculei tudo: 2m² de MDF branco 15mm, 8 dobradiças, puxadores e mão de obra. Total: R$ 1.450,00 💰", time: "14:36" },
      { id: 3, type: "sent", content: "Inclui a instalação?", time: "14:37" },
      { id: 4, type: "received", content: "Inclui sim! Instalação + garantia de 1 ano. Posso te mandar o orçamento detalhado em PDF?", time: "14:37" },
      { id: 5, type: "sent", content: "Manda sim!", time: "14:38" },
      { id: 6, type: "received", content: "Pronto! 📄 Enviei o PDF com todos os detalhes. Qualquer dúvida é só chamar!", time: "14:38" },
    ],
  },
  {
    id: "lucas",
    name: "Lucas",
    shortName: "Agenda",
    role: "Agente de Agendamentos",
    description: "Nunca mais esqueça ou perca uma visita técnica.",
    avatar: netoAvatar,
    color: "text-[#84CC16]",
    bgColor: "bg-[#84CC16]",
    bullets: [
      "Agenda visitas no melhor horário",
      "Envia lembretes automáticos",
      "Reagenda sem você precisar fazer nada",
      "Confirma presença com antecedência",
    ],
    cta: "Chega de perder visita marcada",
    conversation: [
      { id: 1, type: "received", content: "Oi! Aqui é o Lucas da prestação de serviços Silva. 📅 Tô confirmando sua visita técnica pra amanhã (quinta) às 9h. Tudo certo?", time: "18:00" },
      { id: 2, type: "sent", content: "Opa, surgiu um imprevisto. Pode ser sexta?", time: "18:05" },
      { id: 3, type: "received", content: "Sem problemas! 😊 Tenho sexta às 10h ou às 14h. Qual prefere?", time: "18:05" },
      { id: 4, type: "sent", content: "14h tá perfeito", time: "18:06" },
      { id: 5, type: "received", content: "Agendado! ✅ Sexta às 14h. Vou te lembrar na quinta à noite. O endereço continua Rua das Flores, 123?", time: "18:06" },
      { id: 6, type: "sent", content: "Isso mesmo!", time: "18:07" },
    ],
  },
  {
    id: "helena",
    name: "Helena",
    shortName: "Finanças",
    role: "Agente Financeira",
    description: "Saiba exatamente se você está lucrando ou não.",
    avatar: donaContaAvatar,
    color: "text-[#059669]",
    bgColor: "bg-[#059669]",
    bullets: [
      "Registra entradas e pagamentos",
      "Controla saldo de cada projeto",
      "Mostra lucro real, sem enrolação",
      "Resumo mensal automático",
    ],
    cta: "Descubra seu lucro de verdade",
    conversation: [
      { id: 1, type: "received", content: "Oi! Aqui é a Helena da prestação de serviços Silva. 💵 Vi que você fechou o armário com a Maria. Valor de R$ 1.450, certo?", time: "10:00" },
      { id: 2, type: "sent", content: "Isso, ela deu R$ 500 de entrada", time: "10:02" },
      { id: 3, type: "received", content: "Anotado! ✅ Entrada de R$ 500. Restam R$ 950. Quando ela vai pagar o restante?", time: "10:02" },
      { id: 4, type: "sent", content: "Na entrega, semana que vem", time: "10:03" },
      { id: 5, type: "received", content: "Perfeito! 📊 Seu resumo do mês: 3 projetos fechados, R$ 4.200 entrada, R$ 2.100 pendente. Lucro estimado: R$ 1.890!", time: "10:03" },
      { id: 6, type: "sent", content: "Boa! Finalmente sei se tô lucrando 😅", time: "10:04" },
    ],
  },
  {
    id: "maya",
    name: "Maya",
    shortName: "Divulga",
    role: "Agente de Divulgação",
    description: "Divulgue seu trabalho sem virar digital influencer.",
    avatar: zecaAvatar,
    color: "text-[#65A30D]",
    bgColor: "bg-[#65A30D]",
    bullets: [
      "Cria legendas prontas pra postar",
      "Sugere hashtags que funcionam",
      "Ideias de stories e reels",
      "Você posta em segundos",
    ],
    cta: "Apareça mais sem perder tempo",
    conversation: [
      { id: 1, type: "sent", content: "Terminei esse armário aqui, ficou bonito. O que posto?", time: "16:00", audio: true },
      { id: 2, type: "received", content: "Opa! Aqui é a Maya da prestação de serviços Silva. 📸 Manda a foto que eu crio a legenda pra você!", time: "16:01" },
      { id: 3, type: "sent", content: "[Foto do armário branco na cozinha]", time: "16:02" },
      { id: 4, type: "received", content: "Que lindo! ✨ Sugestão de legenda: 'Armário aéreo em MDF branco, feito sob medida pra cozinha da cliente. Cada detalhe pensado pra aproveitar melhor o espaço! 🪵✨'", time: "16:03" },
      { id: 5, type: "received", content: "Hashtags: #prestação de serviços #movelplanejado #cozinhasob medida #mdfbranco #prestador de serviço", time: "16:03" },
      { id: 6, type: "sent", content: "Perfeito, vou postar agora!", time: "16:04" },
    ],
  },
  {
    id: "jornada",
    name: "Jornada Integrada",
    shortName: "Jornada",
    role: "Todos os agentes trabalhando juntos",
    description: "Do primeiro contato ao lucro — automaticamente. Os agentes se comunicam entre si.",
    avatar: claraAvatar,
    color: "text-[#F59E0B]",
    bgColor: "bg-gradient-to-r from-[#F59E0B] to-[#D97706]",
    bullets: [
      "Clara atende e coleta o pedido",
      "Otávio calcula o orçamento automaticamente",
      "Helena garante sua margem de lucro",
      "Lucas agenda a visita técnica",
      "Maya divulga o projeto finalizado",
    ],
    cta: "Ativar modo profissional",
    conversation: [
      { id: 1, type: "sent", content: "Oi, preciso de um armário pra cozinha, 2 metros, MDF branco", time: "09:00", audio: true },
      { id: 2, type: "received", content: "Oi! 👋 Aqui é a Clara da prestação de serviços Silva. Perfeito! Anotei: armário aéreo 2m, MDF branco. Já vou passar pro Otávio calcular o orçamento!", time: "09:00", agent: "Clara" },
      { id: 3, type: "received", content: "Oi! Sou o Otávio. 📋 Calculei: 2m² MDF 15mm + ferragens + mão de obra. Passando pra Helena conferir a margem...", time: "09:01", agent: "Otávio" },
      { id: 4, type: "received", content: "Oi! Helena aqui. 💰 Conferi os números: custo R$ 980, venda R$ 1.450, lucro de R$ 470 (32%). Aprovado! Clara, pode enviar.", time: "09:01", agent: "Helena" },
      { id: 5, type: "received", content: "Pronto! 📄 Seu orçamento: R$ 1.450 com instalação e 1 ano de garantia. Aceita? Posso já agendar a visita técnica!", time: "09:02", agent: "Clara" },
      { id: 6, type: "sent", content: "Aceito! Pode agendar pra quinta", time: "09:03" },
      { id: 7, type: "received", content: "Aqui é o Lucas! 📅 Agendado: quinta às 9h. Vou te lembrar na quarta. Quando finalizar, a Maya já prepara a divulgação! ✨", time: "09:03", agent: "Lucas" },
    ],
  },
];

export function WhatsAppSimulation() {
  const [activeAgent, setActiveAgent] = useState<string>("clara");
  const [visibleMessages, setVisibleMessages] = useState<number[]>([]);

  const currentAgent = agents.find(a => a.id === activeAgent) || agents[0];

  const resetAnimation = useCallback(() => {
    setVisibleMessages([]);
    currentAgent.conversation.forEach((message, index) => {
      setTimeout(() => {
        setVisibleMessages((prev) => [...prev, message.id]);
      }, index * 800 + 300);
    });
  }, [currentAgent]);

  useEffect(() => {
    resetAnimation();
  }, [activeAgent, resetAnimation]);

  return (
    <section className="py-20 md:py-28 bg-background relative overflow-hidden">
      {/* Background blobs */}
      <div className="bg-blob bg-blob-1 opacity-20" />
      <div className="bg-blob bg-blob-3 opacity-15" />
      
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Veja como funciona na <span className="text-gradient">prática</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            Clique em cada agente e veja exemplos de conversas reais
          </p>
        </div>

        {/* Agent tabs */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10 max-w-4xl mx-auto">
          {agents.map((agent) => (
            <button
              key={agent.id}
              onClick={() => setActiveAgent(agent.id)}
              className={`px-4 py-2 md:px-5 md:py-2.5 rounded-full font-medium text-sm md:text-base transition-all duration-300 whitespace-nowrap ${
                agent.id === "jornada"
                  ? activeAgent === agent.id
                    ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg scale-105 ring-2 ring-amber-300"
                    : "bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 hover:from-amber-200 hover:to-orange-200 ring-1 ring-amber-300"
                  : activeAgent === agent.id
                    ? `${agent.bgColor} text-white shadow-lg scale-105`
                    : "bg-muted hover:bg-muted/80 text-muted-foreground"
              }`}
            >
              {agent.id === "jornada" ? (
                <span className="flex items-center gap-2">
                  <span>✨</span>
                  {agent.shortName}
                </span>
              ) : (
                agent.shortName
              )}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-[1fr_auto_1fr] gap-4 lg:gap-8 items-stretch max-w-6xl mx-auto">
          {/* Agent info - left column */}
          <div className="order-3 lg:order-1 flex flex-col justify-center text-center lg:text-left">
            <h3 className={`text-2xl md:text-3xl font-bold mb-2 ${currentAgent.color} whitespace-nowrap`}>
              {currentAgent.name}
            </h3>
            <p className="text-muted-foreground font-medium mb-3 text-lg">
              {currentAgent.role}
            </p>
            <p className="text-foreground/80 text-lg leading-relaxed mb-6">
              {currentAgent.description}
            </p>

            {/* Bullet points */}
            <ul className="space-y-3 mb-8">
              {currentAgent.bullets.map((bullet, index) => (
                <li key={index} className="flex items-start gap-3 justify-center lg:justify-start">
                  <div className={`w-5 h-5 rounded-full ${currentAgent.bgColor} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-foreground font-medium text-left">{bullet}</span>
                </li>
              ))}
            </ul>

            {/* CTA - Goes to individual agent page or pricing for jornada */}
            <Link to={activeAgent === "jornada" ? "/precos" : `/agente/${currentAgent.id}`}>
              <Button 
                size="lg" 
                className={`${
                  activeAgent === "jornada" 
                    ? "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600" 
                    : currentAgent.bgColor + " hover:opacity-90"
                } text-white gap-2 w-full lg:w-auto shadow-lg`}
              >
                {currentAgent.cta}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          {/* Phone mockup - center */}
          <div className="order-1 lg:order-2">
            <div className="max-w-xs mx-auto">
              <div className="relative">
                {/* Phone frame - softer border */}
                <div className="bg-muted/60 rounded-[2.5rem] p-2 brutalist-box-lg">
                  {/* Screen */}
                  <div className="bg-background rounded-[2rem] overflow-hidden">
                    {/* WhatsApp header */}
                    <div className={`${activeAgent === "jornada" ? "bg-gradient-to-r from-amber-500 to-orange-500" : currentAgent.bgColor} px-4 py-3 flex items-center gap-3`}>
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-white/20">
                        <img src={currentAgent.avatar} alt={currentAgent.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-semibold text-sm truncate">
                          {activeAgent === "jornada" ? "prestação de serviços Silva" : currentAgent.name}
                        </p>
                        <p className="text-white/70 text-xs">
                          {activeAgent === "jornada" ? "5 agentes ativos" : "online"}
                        </p>
                      </div>
                    </div>

                    {/* Chat background */}
                    <div 
                      className="h-[380px] overflow-y-auto p-4 space-y-3"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e5ddd5' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        backgroundColor: '#ECE5DD',
                      }}
                    >
                      {currentAgent.conversation.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.type === "sent" ? "justify-end" : "justify-start"} transition-all duration-300 ${
                            visibleMessages.includes(message.id)
                              ? "opacity-100 translate-y-0"
                              : "opacity-0 translate-y-4"
                          }`}
                        >
                          <div
                            className={`max-w-[80%] rounded-lg px-3 py-2 shadow-sm ${
                              message.type === "sent"
                                ? "bg-[#DCF8C6] rounded-tr-none"
                                : "bg-white rounded-tl-none"
                            }`}
                          >
                            {message.agent && activeAgent === "jornada" && (
                              <p className="text-xs font-semibold text-primary mb-1">{message.agent}</p>
                            )}
                            {message.audio && (
                              <div className="flex items-center gap-2 mb-1">
                                <Mic className="w-4 h-4 text-[#075E54]" />
                                <div className="flex gap-0.5">
                                  {[...Array(15)].map((_, i) => (
                                    <div
                                      key={i}
                                      className="w-0.5 bg-[#075E54]/60 rounded-full"
                                      style={{ height: Math.random() * 12 + 4 }}
                                    />
                                  ))}
                                </div>
                              </div>
                            )}
                            <p className="text-sm text-foreground/90">{message.content}</p>
                            <div className="flex items-center justify-end gap-1 mt-1">
                              <span className="text-[10px] text-muted-foreground">{message.time}</span>
                              {message.type === "sent" && (
                                <CheckCheck className="w-3 h-3 text-[#53bdeb]" />
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Input area */}
                    <div className="bg-[#F0F0F0] px-3 py-2 flex items-center gap-2">
                      <div className="flex-1 bg-white rounded-full px-4 py-2">
                        <span className="text-muted-foreground text-sm">Mensagem</span>
                      </div>
                      <div className={`w-10 h-10 ${currentAgent.bgColor} rounded-full flex items-center justify-center`}>
                        <Mic className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Agent avatar - right column with Instagram story style */}
          <div className="order-2 lg:order-3 hidden lg:flex justify-center items-center">
            {activeAgent === "jornada" ? (
              /* Multi-agent cluster for Jornada Integrada */
              <div className="relative w-[320px] h-[320px] flex items-center justify-center">
                {/* Central connecting glow */}
                <div className="absolute w-[200px] h-[200px] rounded-full bg-gradient-to-r from-amber-400/30 to-orange-400/30 blur-2xl animate-pulse" />
                
                {/* Agent avatars in circular arrangement */}
                {agents.slice(0, 5).map((agent, index) => {
                  const angle = (index * 72 - 90) * (Math.PI / 180); // 5 agents, 72 degrees apart, starting from top
                  const radius = 110;
                  const x = Math.cos(angle) * radius;
                  const y = Math.sin(angle) * radius;
                  
                  return (
                    <div
                      key={agent.id}
                      className="absolute transition-all duration-700 ease-out"
                      style={{
                        transform: `translate(${x}px, ${y}px)`,
                        animationDelay: `${index * 150}ms`,
                      }}
                    >
                      {/* Individual avatar with gradient ring */}
                      <div 
                        className="relative group animate-fade-in"
                        style={{ animationDelay: `${index * 150}ms` }}
                      >
                        {/* Floating animation */}
                        <div 
                          className="animate-pulse"
                          style={{ 
                            animation: `pulse 3s ease-in-out infinite`,
                            animationDelay: `${index * 0.4}s`
                          }}
                        >
                          {/* Gradient ring */}
                          <div 
                            className="w-[72px] h-[72px] rounded-full p-[3px] shadow-lg transition-transform duration-300 hover:scale-110"
                            style={{
                              background: index === 0 ? 'conic-gradient(from 0deg, #3b82f6, #60a5fa, #3b82f6)' :
                                         index === 1 ? 'conic-gradient(from 0deg, #2563eb, #3b82f6, #2563eb)' :
                                         index === 2 ? 'conic-gradient(from 0deg, #6366f1, #818cf8, #6366f1)' :
                                         index === 3 ? 'conic-gradient(from 0deg, #8b5cf6, #a78bfa, #8b5cf6)' :
                                                       'conic-gradient(from 0deg, #ec4899, #f472b6, #ec4899)',
                            }}
                          >
                            <div className="w-full h-full rounded-full bg-white p-[2px]">
                              <div className="w-full h-full rounded-full overflow-hidden">
                                <img
                                  src={agent.avatar}
                                  alt={agent.name}
                                  className="w-full h-full object-cover object-top scale-110"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Name tooltip on hover */}
                        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                          <span className="text-xs font-medium text-foreground bg-background/90 px-2 py-1 rounded-full shadow-sm">
                            {agent.shortName}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
                
                {/* Center logo/icon */}
                <div className="absolute w-16 h-16 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center shadow-xl z-10">
                  <span className="text-2xl">✨</span>
                </div>
                
                {/* Connecting lines animation */}
                <svg className="absolute w-full h-full pointer-events-none opacity-20" viewBox="0 0 320 320">
                  {agents.slice(0, 5).map((_, index) => {
                    const angle = (index * 72 - 90) * (Math.PI / 180);
                    const x = 160 + Math.cos(angle) * 110;
                    const y = 160 + Math.sin(angle) * 110;
                    return (
                      <line
                        key={index}
                        x1="160"
                        y1="160"
                        x2={x}
                        y2={y}
                        stroke="url(#lineGradient)"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                        className="animate-pulse"
                        style={{ animationDelay: `${index * 0.2}s` }}
                      />
                    );
                  })}
                  <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f59e0b" />
                      <stop offset="100%" stopColor="#ea580c" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            ) : (
              /* Single agent avatar for individual agents */
              <div className="relative flex items-center justify-center">
                {/* Agent-colored gradient ring */}
                <div 
                  className={`w-[300px] h-[300px] rounded-full p-[5px] ${currentAgent.bgColor} shadow-lg`}
                  style={{
                    opacity: 0.9,
                  }}
                >
                  {/* White border inner circle */}
                  <div className="w-full h-full rounded-full bg-white p-[5px] shadow-inner">
                    {/* Avatar circle */}
                    <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-muted to-muted/50">
                      <img
                        src={currentAgent.avatar}
                        alt={currentAgent.name}
                        className="w-full h-full object-cover object-top scale-110 transition-all duration-500"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Pulsing glow effect behind */}
                <div 
                  className={`absolute w-[340px] h-[340px] rounded-full blur-3xl opacity-30 -z-10 ${currentAgent.bgColor} animate-pulse`}
                />
              </div>
            )}
          </div>
        </div>

        <div className="max-w-2xl mx-auto mt-12 text-center">
          <p className="text-muted-foreground text-lg">
            <span className="font-semibold text-foreground">Funciona por áudio ou texto.</span>{" "}
            Cada agente fala em nome da sua prestação de serviços, como se fosse parte da sua equipe.
          </p>
        </div>
      </div>
    </section>
  );
}
