import { useEffect, useState } from "react";

const WHATSAPP_LINK = "https://wa.me/5500000000000?text=Olá! Quero conhecer o MandaUmZap";

const chatMessages = [
  { from: "client", text: "Oi! Preciso de um eletricista pra trocar o quadro de luz", time: "09:41" },
  { from: "agent", text: "Olá! 👋 Sou a Clara, assistente da *Elétrica do João*. Posso te ajudar!\n\nQual seu nome e cidade?", time: "09:41" },
  { from: "client", text: "Marcos, moro em Campinas SP", time: "09:42" },
  { from: "agent", text: "Perfeito, Marcos! 😊\n\nJá registrei seu pedido. O João vai analisar e entra em contato em até 1h.\n\n✅ Lead salvo\n✅ Campinas — atendida", time: "09:42" },
  { from: "client", text: "Que rápido! Obrigado", time: "09:43" },
  { from: "agent", text: "De nada! Qualquer dúvida é só falar aqui 🛠️", time: "09:43" },
];

function WhatsAppMockup() {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (visibleCount >= chatMessages.length) return;
    const timer = setTimeout(
      () => setVisibleCount((c) => c + 1),
      visibleCount === 0 ? 800 : 900
    );
    return () => clearTimeout(timer);
  }, [visibleCount]);

  return (
    <div className="relative mx-auto" style={{ maxWidth: 320 }}>
      {/* Phone frame */}
      <div className="relative rounded-[2.5rem] border-[3px] border-black bg-black shadow-[8px_8px_0_#000] overflow-hidden" style={{ aspectRatio: "9/18" }}>
        {/* Screen */}
        <div className="absolute inset-[3px] rounded-[2.2rem] overflow-hidden flex flex-col">
          {/* Status bar */}
          <div className="bg-[#075E54] px-4 pt-3 pb-1 flex items-center justify-between">
            <span className="text-white text-[10px] font-bold">9:41</span>
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-1 rounded-full bg-white" style={{ height: `${6 + i * 2}px` }} />
              ))}
              <div className="w-3 h-3 rounded-sm border border-white ml-1" />
            </div>
          </div>

          {/* Chat header */}
          <div className="bg-[#075E54] px-3 py-2 flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#25D366] border-2 border-white flex items-center justify-center flex-shrink-0">
              <span className="text-black font-black text-sm">C</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-bold text-sm leading-tight">Clara</p>
              <p className="text-[#25D366] text-[10px] leading-tight">● online</p>
            </div>
          </div>

          {/* Chat body */}
          <div
            className="flex-1 overflow-hidden px-2 py-2 flex flex-col gap-1.5"
            style={{ background: "#E5DDD5" }}
          >
            {chatMessages.slice(0, visibleCount).map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.from === "client" ? "justify-end" : "justify-start"} animate-fade-in`}
              >
                <div
                  className={`max-w-[85%] rounded-xl px-2.5 py-1.5 shadow-sm ${
                    msg.from === "client"
                      ? "bg-[#DCF8C6] rounded-tr-none"
                      : "bg-white rounded-tl-none"
                  }`}
                >
                  <p className="text-[11px] text-gray-900 leading-tight whitespace-pre-line">{msg.text}</p>
                  <p className="text-[9px] text-gray-400 text-right mt-0.5 leading-none">{msg.time} {msg.from === "client" ? "✓✓" : ""}</p>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {visibleCount < chatMessages.length && visibleCount % 2 === 0 && (
              <div className="flex justify-start">
                <div className="bg-white rounded-xl rounded-tl-none px-3 py-2 shadow-sm">
                  <div className="flex gap-1 items-center">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input bar */}
          <div className="bg-[#F0F0F0] px-2 py-2 flex items-center gap-2">
            <div className="flex-1 bg-white rounded-full px-3 py-1.5 text-[11px] text-gray-400 border border-gray-200">
              Mensagem
            </div>
            <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center flex-shrink-0">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Floating badges */}
      <div className="absolute -left-10 top-24 bg-white border-2 border-black rounded-xl px-3 py-2 shadow-[3px_3px_0_#000] animate-float">
        <p className="text-[11px] font-bold text-black">✅ Lead qualificado</p>
        <p className="text-[10px] text-gray-500">há 2 min</p>
      </div>
      <div className="absolute -right-8 bottom-28 bg-[#25D366] border-2 border-black rounded-xl px-3 py-2 shadow-[3px_3px_0_#000] animate-float" style={{ animationDelay: "1s" }}>
        <p className="text-[11px] font-bold text-black">24h online</p>
        <p className="text-[10px] text-black/70">sem você precisar</p>
      </div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="min-h-screen bg-[#F7F1E8] pt-20 lg:pt-0 flex items-center relative overflow-hidden">
      {/* Background dots pattern */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, #00000018 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-0 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-screen lg:py-24">
          {/* LEFT — Copy */}
          <div className="flex flex-col gap-6 order-2 lg:order-1">
            {/* Badge */}
            <div className="inline-flex w-fit items-center gap-2 px-4 py-2 rounded-full bg-white border-2 border-black shadow-[3px_3px_0_#000]">
              <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
              <span className="text-xs font-bold text-black font-sans">100% pelo WhatsApp · Sem app</span>
            </div>

            {/* Headline */}
            <h1 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl text-black leading-[0.95] tracking-tight">
              Seu negócio<br />
              atendendo<br />
              <span className="relative inline-block">
                clientes
                <span className="absolute -bottom-1 left-0 w-full h-3 bg-[#25D366] -z-10 rounded" />
              </span>
              <br />
              24h.
            </h1>

            {/* Sub */}
            <p className="font-sans text-lg text-gray-600 leading-relaxed max-w-md">
              Agentes de IA que trabalham pelo WhatsApp enquanto você está na obra.
              Atende, agenda, orça e divulga —{" "}
              <strong className="text-black">sem você precisar estar online.</strong>
            </p>

            {/* Social proof mini */}
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {["E", "P", "M", "E"].map((l, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-xs font-black text-white"
                    style={{ background: ["#25D366","#8B5CF6","#3B82F6","#F59E0B"][i] }}
                  >
                    {l}
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-600 font-sans">
                <strong className="text-black">+200 prestadores</strong> já usam
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#25D366] border-2 border-black text-black font-bold text-base shadow-[5px_5px_0_#000] hover:shadow-none hover:translate-x-[5px] hover:translate-y-[5px] transition-all duration-150"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Começar agora
              </a>
              <a
                href="#como-funciona"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white border-2 border-black text-black font-bold text-base shadow-[5px_5px_0_#000] hover:shadow-none hover:translate-x-[5px] hover:translate-y-[5px] transition-all duration-150"
              >
                Ver como funciona ↓
              </a>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {["Sem contrato", "Sem instalação", "R$29,00/agente"].map((b) => (
                <span key={b} className="px-3 py-1.5 rounded-full bg-white border-2 border-black text-xs font-bold text-black shadow-[2px_2px_0_#000]">
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* RIGHT — WhatsApp Mockup */}
          <div className="flex justify-center lg:justify-end order-1 lg:order-2 relative">
            <WhatsAppMockup />
          </div>
        </div>
      </div>
    </section>
  );
}
