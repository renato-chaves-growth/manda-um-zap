import { useState } from "react";

const WHATSAPP_LINK = "https://wa.me/5500000000000?text=Olá! Quero começar com o MandaUmZap";

const agents = [
  { id: "clara",  name: "Clara",  role: "Atendimento", color: "#25D366", initial: "C" },
  { id: "otavio", name: "Otávio", role: "Orçamento",   color: "#8B5CF6", initial: "O" },
  { id: "lucas",  name: "Lucas",  role: "Agenda",       color: "#3B82F6", initial: "L" },
  { id: "helena", name: "Helena", role: "Financeiro",   color: "#F59E0B", initial: "H" },
  { id: "maya",   name: "Maya",   role: "Divulgação",   color: "#F97316", initial: "M" },
];

const PRICE_PER_AGENT = 29.90;

export function PricingSection() {
  const [selected, setSelected] = useState<Set<string>>(new Set(["clara"]));

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        if (next.size > 1) next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const total = selected.size * PRICE_PER_AGENT;

  return (
    <section id="precos" className="bg-white py-20 lg:py-28 border-y-2 border-black">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#F7F1E8] border-2 border-black text-xs font-bold font-sans shadow-[2px_2px_0_#000] mb-4">
            PREÇO SIMPLES
          </span>
          <h2 className="font-display font-black text-4xl lg:text-5xl text-black leading-tight">
            Monte seu time de IA.
          </h2>
          <p className="mt-4 font-sans text-gray-500 text-lg">
            <strong className="text-black">R$ 29,90</strong> por agente por mês.
            Sem taxa de setup. Sem fidelidade.
          </p>
        </div>

        {/* Interactive selector */}
        <div className="rounded-2xl border-2 border-black bg-[#F7F1E8] shadow-[6px_6px_0_#000] p-6 lg:p-8">
          <p className="font-sans font-semibold text-gray-600 text-sm mb-5">
            Selecione os agentes que você quer ativar:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {agents.map((agent) => {
              const isSelected = selected.has(agent.id);
              return (
                <button
                  key={agent.id}
                  onClick={() => toggle(agent.id)}
                  className={`relative rounded-xl border-2 p-4 text-left transition-all duration-150 cursor-pointer ${
                    isSelected
                      ? "border-black shadow-[4px_4px_0_#000] -translate-x-[2px] -translate-y-[2px]"
                      : "border-gray-300 bg-white hover:border-black hover:shadow-[2px_2px_0_#000]"
                  }`}
                  style={isSelected ? { background: agent.color } : {}}
                >
                  {/* Checkbox indicator */}
                  <div
                    className={`absolute top-3 right-3 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      isSelected ? "border-black bg-white" : "border-gray-300 bg-white"
                    }`}
                  >
                    {isSelected && (
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6l3 3 5-5" stroke={agent.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>

                  {/* Avatar */}
                  <div
                    className={`w-10 h-10 rounded-full border-2 border-black flex items-center justify-center mb-3 shadow-[2px_2px_0_#000] ${
                      isSelected ? "bg-white" : ""
                    }`}
                    style={!isSelected ? { background: agent.color } : {}}
                  >
                    <span
                      className="font-black text-base"
                      style={{ color: isSelected ? agent.color : "white" }}
                    >
                      {agent.initial}
                    </span>
                  </div>

                  <p className={`font-display font-black text-base ${isSelected ? "text-black" : "text-black"}`}>
                    {agent.name}
                  </p>
                  <p className={`font-sans text-xs mt-0.5 ${isSelected ? "text-black/70" : "text-gray-500"}`}>
                    {agent.role}
                  </p>
                  <p className={`font-sans text-xs font-bold mt-2 ${isSelected ? "text-black" : "text-gray-400"}`}>
                    R$ 29,90/mês
                  </p>
                </button>
              );
            })}
          </div>

          {/* Total + CTA */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-5 pt-6 border-t-2 border-black/20">
            <div>
              <p className="font-sans text-sm text-gray-500">
                {selected.size} agente{selected.size !== 1 ? "s" : ""} selecionado{selected.size !== 1 ? "s" : ""}
              </p>
              <p className="font-display font-black text-4xl text-black">
                R$ {total.toFixed(2).replace(".", ",")}
                <span className="text-lg font-sans font-normal text-gray-500 ml-1">/mês</span>
              </p>
              <p className="font-sans text-xs text-gray-400 mt-1">
                ≈ R$ {(total / 30).toFixed(2).replace(".", ",")} por dia · Cancele quando quiser
              </p>
            </div>

            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#25D366] border-2 border-black text-black font-bold text-base shadow-[5px_5px_0_#000] hover:shadow-none hover:translate-x-[5px] hover:translate-y-[5px] transition-all duration-150 w-full sm:w-auto justify-center"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Começar com {selected.size} agente{selected.size !== 1 ? "s" : ""}
            </a>
          </div>
        </div>

        {/* Guarantees */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: "🔒", title: "Sem contrato", desc: "Cancele a qualquer momento, sem multa." },
            { icon: "⚡", title: "Ativo em 10 min", desc: "Do cadastro ao primeiro atendimento." },
            { icon: "💬", title: "Suporte via WhatsApp", desc: "Você fala com a gente pelo WhatsApp mesmo." },
          ].map((item) => (
            <div
              key={item.title}
              className="flex items-start gap-3 p-4 rounded-xl bg-[#F7F1E8] border-2 border-black shadow-[3px_3px_0_#000]"
            >
              <span className="text-2xl">{item.icon}</span>
              <div>
                <p className="font-display font-black text-sm text-black">{item.title}</p>
                <p className="font-sans text-xs text-gray-500 mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
