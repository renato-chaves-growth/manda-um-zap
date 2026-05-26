const WHATSAPP_LINK = "https://wa.me/5500000000000?text=Olá! Quero começar com o MandaUmZap";

export function CTASection() {
  return (
    <section className="bg-[#075E54] py-20 lg:py-28 relative overflow-hidden">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, #ffffff22 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* Decorative circles */}
      <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full border-4 border-[#25D366]/20 pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full border-4 border-[#25D366]/10 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#25D366]/20 border-2 border-[#25D366] mb-8">
          <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
          <span className="text-[#25D366] text-xs font-bold font-sans">COMECE HOJE</span>
        </div>

        {/* Headline */}
        <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-6">
          Seu próximo cliente<br />
          <span className="text-[#25D366]">pode chegar agora.</span>
        </h2>

        {/* Sub */}
        <p className="font-sans text-white/70 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
          Sem contrato. Sem complicação. Ative a Clara hoje e comece
          a atender 24h pelo seu próprio WhatsApp.
        </p>

        {/* Price reminder */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <div className="h-px w-16 bg-white/20" />
          <span className="font-sans text-white/50 text-sm">
            A partir de{" "}
            <strong className="text-white text-base">R$&nbsp;29,90/mês</strong>
            {" "}· cancele quando quiser
          </span>
          <div className="h-px w-16 bg-white/20" />
        </div>

        {/* CTA button */}
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-[#25D366] border-2 border-black text-black font-bold text-lg shadow-[6px_6px_0_#000] hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px] transition-all duration-150"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Começar agora pelo WhatsApp
        </a>

        {/* Social proof */}
        <div className="mt-10 flex items-center justify-center gap-3">
          <div className="flex -space-x-2">
            {["E", "P", "M", "J", "R"].map((l, i) => (
              <div
                key={i}
                className="w-9 h-9 rounded-full border-2 border-[#075E54] flex items-center justify-center text-xs font-black text-black"
                style={{ background: ["#25D366","#8B5CF6","#3B82F6","#F59E0B","#F97316"][i] }}
              >
                {l}
              </div>
            ))}
          </div>
          <p className="text-white/60 text-sm font-sans">
            <strong className="text-white">+200 prestadores</strong> já atendendo no automático
          </p>
        </div>
      </div>
    </section>
  );
}
