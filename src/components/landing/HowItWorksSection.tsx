const steps = [
  {
    num: "01",
    title: "Cadastre seus dados",
    desc: "Nome do negócio, WhatsApp e informações básicas. Leva menos de 5 minutos.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
    ),
    color: "#25D366",
  },
  {
    num: "02",
    title: "Conecte o WhatsApp",
    desc: "Escaneie um QR code. Seus agentes ficam disponíveis no mesmo número que você já usa.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
    color: "#075E54",
  },
  {
    num: "03",
    title: "Seus agentes já estão trabalhando",
    desc: "Clientes chegam, os agentes atendem, qualificam e te mandam o resumo. Você foca no serviço.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 1 0 10 10"/>
        <path d="m9 12 2 2 4-4"/>
      </svg>
    ),
    color: "#25D366",
  },
];

export function HowItWorksSection() {
  return (
    <section id="como-funciona" className="bg-white py-20 lg:py-28 border-y-2 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#F7F1E8] border-2 border-black text-xs font-bold font-sans shadow-[2px_2px_0_#000] mb-4">
            SIMPLES ASSIM
          </span>
          <h2 className="font-display font-black text-4xl lg:text-5xl text-black leading-tight">
            Três passos.<br />
            <span className="text-[#075E54]">Zero complicação.</span>
          </h2>
          <p className="mt-4 font-sans text-gray-500 text-lg max-w-md mx-auto">
            Sem técnico. Sem configuração complexa. Sem precisar aprender nada novo.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((step, i) => (
            <div key={i} className="relative">
              {/* Connector arrow between cards (hidden on mobile) */}
              {i < steps.length - 1 && (
                <div className="hidden md:flex absolute top-10 -right-4 z-10 w-8 h-8 items-center justify-center">
                  <span className="text-2xl font-black text-black">→</span>
                </div>
              )}

              <div
                className="rounded-2xl border-2 border-black bg-[#F7F1E8] p-8 shadow-[5px_5px_0_#000] hover:shadow-[8px_8px_0_#000] hover:-translate-x-[3px] hover:-translate-y-[3px] transition-all duration-200 h-full flex flex-col gap-5"
              >
                {/* Number */}
                <div className="flex items-center justify-between">
                  <span
                    className="text-6xl font-black leading-none"
                    style={{ color: step.color }}
                  >
                    {step.num}
                  </span>
                  <div
                    className="w-14 h-14 rounded-xl border-2 border-black flex items-center justify-center shadow-[2px_2px_0_#000]"
                    style={{ background: step.color, color: "black" }}
                  >
                    {step.icon}
                  </div>
                </div>

                {/* Text */}
                <div>
                  <h3 className="font-display font-black text-xl text-black mb-2 leading-tight">
                    {step.title}
                  </h3>
                  <p className="font-sans text-gray-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-[#075E54] border-2 border-black shadow-[4px_4px_0_#000]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#25D366">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
            </svg>
            <span className="font-sans text-white font-semibold text-sm">
              Do cadastro ao primeiro atendimento em menos de <strong className="text-[#25D366]">10 minutos</strong>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
