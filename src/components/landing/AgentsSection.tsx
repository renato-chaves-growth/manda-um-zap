const agents = [
  {
    id: "clara",
    name: "Clara",
    role: "Atendimento",
    emoji: "🟢",
    color: "#25D366",
    lightColor: "#DCFCE7",
    textColor: "#166534",
    desc: "Responde imediatamente, coleta dados do cliente e salva o lead qualificado para você.",
    integrations: ["WhatsApp", "Supabase"],
  },
  {
    id: "otavio",
    name: "Otávio",
    role: "Orçamento",
    emoji: "🟣",
    color: "#8B5CF6",
    lightColor: "#F3E8FF",
    textColor: "#6B21A8",
    desc: "Envia cotações para fornecedores, compara preços e te manda o melhor resultado.",
    integrations: ["WhatsApp", "Planilha"],
  },
  {
    id: "lucas",
    name: "Lucas",
    role: "Agenda",
    emoji: "🔵",
    color: "#3B82F6",
    lightColor: "#DBEAFE",
    textColor: "#1E40AF",
    desc: "Consulta sua disponibilidade, confirma visitas 24h antes e reagenda quando necessário.",
    integrations: ["Google Calendar", "WhatsApp"],
  },
  {
    id: "helena",
    name: "Helena",
    role: "Financeiro",
    emoji: "🟡",
    color: "#F59E0B",
    lightColor: "#FEF3C7",
    textColor: "#92400E",
    desc: "Registra projetos, calcula margem real e mostra seu lucro mensal atualizado.",
    integrations: ["Supabase"],
  },
  {
    id: "maya",
    name: "Maya",
    role: "Divulgação",
    emoji: "🟠",
    color: "#F97316",
    lightColor: "#FFEDD5",
    textColor: "#9A3412",
    desc: "Recebe sua foto, gera legenda, hashtags e sugere o melhor horário pra postar.",
    integrations: ["Instagram", "IA"],
  },
];

export function AgentsSection() {
  return (
    <section id="agentes" className="bg-[#F7F1E8] py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white border-2 border-black text-xs font-bold font-sans shadow-[2px_2px_0_#000] mb-4">
            5 AGENTES ESPECIALIZADOS
          </span>
          <h2 className="font-display font-black text-4xl lg:text-5xl text-black leading-tight">
            Conheça seu time de IA.
          </h2>
          <p className="mt-4 font-sans text-gray-500 text-lg max-w-lg mx-auto">
            Cada agente é especializado em uma parte do seu negócio.
            Ative apenas os que você precisa.
          </p>
        </div>

        {/* Agent cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {agents.map((agent) => (
            <div
              key={agent.id}
              className="group rounded-2xl border-2 border-black bg-white shadow-[5px_5px_0_#000] hover:shadow-[8px_8px_0_#000] hover:-translate-x-[3px] hover:-translate-y-[3px] transition-all duration-200 overflow-hidden flex flex-col"
            >
              {/* Color top bar */}
              <div
                className="h-2 w-full"
                style={{ background: agent.color }}
              />

              <div className="p-5 flex flex-col gap-4 flex-1">
                {/* Avatar */}
                <div className="flex items-start justify-between">
                  <div
                    className="w-12 h-12 rounded-full border-2 border-black flex items-center justify-center text-xl font-black shadow-[2px_2px_0_#000]"
                    style={{ background: agent.color }}
                  >
                    <span className="text-white font-black text-lg">{agent.name[0]}</span>
                  </div>
                  <span
                    className="px-2.5 py-1 rounded-full text-xs font-bold border-2 border-black shadow-[2px_2px_0_#000]"
                    style={{ background: agent.lightColor, color: agent.textColor }}
                  >
                    {agent.role}
                  </span>
                </div>

                {/* Name */}
                <div>
                  <h3 className="font-display font-black text-xl text-black">{agent.name}</h3>
                  <p className="font-sans text-sm text-gray-600 leading-relaxed mt-1.5">
                    {agent.desc}
                  </p>
                </div>

                {/* Integrations */}
                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {agent.integrations.map((intg) => (
                    <span
                      key={intg}
                      className="px-2 py-0.5 rounded-full bg-gray-100 border border-gray-300 text-[10px] font-semibold text-gray-600"
                    >
                      {intg}
                    </span>
                  ))}
                </div>

                {/* Price */}
                <div className="pt-3 border-t-2 border-dashed border-black/20">
                  <div
                    className="flex items-center justify-center gap-1 py-2 rounded-xl border-2 border-black shadow-[2px_2px_0_#000]"
                    style={{ background: agent.color }}
                  >
                    <span className="text-xs font-black text-black">R$ 29,00</span>
                    <span className="text-[10px] font-semibold text-black/70">/mês</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <p className="font-sans text-gray-600 text-center">
            <strong className="text-black">Ative apenas os que precisar.</strong>{" "}
            Comece com 1 agente e expanda quando quiser.
          </p>
          <a
            href="#precos"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#25D366] border-2 border-black text-black font-bold text-sm shadow-[4px_4px_0_#000] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-150 flex-shrink-0"
          >
            Ver preços →
          </a>
        </div>
      </div>
    </section>
  );
}
