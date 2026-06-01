import {
  MessageCircle,
  Calculator,
  CalendarDays,
  Wallet,
  Instagram,
  type LucideIcon,
} from "lucide-react";

import claraAvatar  from "@/assets/avatars/ze-atendimento-v3.webp";
import otavioAvatar from "@/assets/avatars/chico-orcamento-v3.webp";
import lucasAvatar  from "@/assets/avatars/neto-agenda-v3.webp";
import helenaAvatar from "@/assets/avatars/dona-conta-v3.webp";
import mayaAvatar   from "@/assets/avatars/zeca-instagram-v3.webp";

interface Agent {
  id: string;
  name: string;
  role: string;
  color: string;
  lightColor: string;
  textColor: string;
  icon: LucideIcon;
  avatar: string;
  headline: string;
  deliverables: string[];
}

const agents: Agent[] = [
  {
    id: "clara",
    name: "Clara",
    role: "Atendimento",
    color: "#25D366",
    lightColor: "#DCFCE7",
    textColor: "#166534",
    icon: MessageCircle,
    avatar: claraAvatar,
    headline: "Atende, qualifica e salva cada lead automaticamente.",
    deliverables: [
      "Responde em segundos",
      "Qualifica o cliente",
      "Nunca perde uma mensagem",
    ],
  },
  {
    id: "otavio",
    name: "Otávio",
    role: "Orçamento",
    color: "#8B5CF6",
    lightColor: "#F3E8FF",
    textColor: "#6B21A8",
    icon: Calculator,
    avatar: otavioAvatar,
    headline: "Gera cotações estruturadas e compara fornecedores.",
    deliverables: [
      "Áudio ou texto → orçamento",
      "Compara fornecedores",
      "Envia o melhor preço",
    ],
  },
  {
    id: "lucas",
    name: "Lucas",
    role: "Agenda",
    color: "#3B82F6",
    lightColor: "#DBEAFE",
    textColor: "#1E40AF",
    icon: CalendarDays,
    avatar: lucasAvatar,
    headline: "Organiza visitas e confirma clientes automaticamente.",
    deliverables: [
      "Consulta sua disponibilidade",
      "Confirma 24h antes",
      "Reagenda quando precisa",
    ],
  },
  {
    id: "helena",
    name: "Helena",
    role: "Financeiro",
    color: "#F59E0B",
    lightColor: "#FEF3C7",
    textColor: "#92400E",
    icon: Wallet,
    avatar: helenaAvatar,
    headline: "Controla margem, custos e lucro real de cada projeto.",
    deliverables: [
      "Registra cada projeto",
      "Calcula margem real",
      "Mostra seu lucro mensal",
    ],
  },
  {
    id: "maya",
    name: "Maya",
    role: "Divulgação",
    color: "#F97316",
    lightColor: "#FFEDD5",
    textColor: "#9A3412",
    icon: Instagram,
    avatar: mayaAvatar,
    headline: "Cria conteúdo para Instagram a partir das suas fotos.",
    deliverables: [
      "Legenda pronta pra postar",
      "Hashtags estratégicos",
      "Horário ideal para publicar",
    ],
  },
];

export function AgentsSection() {
  return (
    <section id="agentes" className="bg-[#F7F1E8] py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white border-2 border-black text-xs font-bold font-sans shadow-[2px_2px_0_#000] mb-4">
            5 AGENTES ESPECIALIZADOS
          </span>
          <h2 className="font-display font-black text-4xl lg:text-5xl text-black leading-tight">
            Conheça seu time de IA.
          </h2>
          <p className="mt-4 font-sans text-gray-500 text-lg max-w-xl mx-auto">
            Cada agente cuida de uma parte do seu negócio —{" "}
            <strong className="text-black">sem precisar de você</strong>.
          </p>
        </div>

        {/* 24/7 banner */}
        <div className="mb-12 rounded-2xl bg-[#075E54] border-2 border-black shadow-[5px_5px_0_#000] px-6 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-center sm:text-left">
            {/* Pulse dot */}
            <span className="relative flex h-3 w-3 flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#25D366]" />
            </span>
            <p className="font-sans text-white">
              <strong className="font-black text-[#25D366]">
                Trabalham 24h por dia, 7 dias por semana.
              </strong>{" "}
              <span className="text-white/80">
                Sem folga. Sem feriado. Sem atraso. Sem "tô ocupado agora".
              </span>
            </p>
          </div>
        </div>

        {/* Agent cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {agents.map((agent) => {
            const Icon = agent.icon;
            return (
              <div
                key={agent.id}
                className="group rounded-2xl border-2 border-black bg-white shadow-[5px_5px_0_#000] hover:shadow-[8px_8px_0_#000] hover:-translate-x-[3px] hover:-translate-y-[3px] transition-all duration-200 overflow-hidden flex flex-col"
              >
                {/* Photo area */}
                <div className="relative w-full overflow-hidden" style={{ aspectRatio: "4/5" }}>
                  <img
                    src={agent.avatar}
                    alt={agent.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Gradient overlay at bottom of photo */}
                  <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/70 to-transparent" />

                  {/* Function icon badge — top left */}
                  <div
                    className="absolute top-3 left-3 w-8 h-8 rounded-full border-2 border-black flex items-center justify-center shadow-[2px_2px_0_#000]"
                    style={{ background: agent.color }}
                  >
                    <Icon className="w-4 h-4 text-white" strokeWidth={2.5} />
                  </div>

                  {/* Name overlay at bottom of photo */}
                  <div className="absolute bottom-0 inset-x-0 px-4 pb-3 flex items-end justify-between gap-2">
                    <div>
                      <h3 className="font-display font-black text-xl text-white leading-tight drop-shadow">
                        {agent.name}
                      </h3>
                    </div>
                    {/* 24h badge */}
                    <div className="flex items-center gap-1 bg-black/60 backdrop-blur-sm text-white rounded-full px-2.5 py-1 border border-white/20 flex-shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] inline-block" />
                      <span className="text-[10px] font-bold leading-none">24h</span>
                    </div>
                  </div>
                </div>

                {/* Card body */}
                <div className="p-4 flex flex-col gap-3 flex-1">

                  {/* Role tag */}
                  <span
                    className="self-start px-2.5 py-0.5 rounded-full text-[11px] font-bold border-2 border-black shadow-[1px_1px_0_#000]"
                    style={{ background: agent.lightColor, color: agent.textColor }}
                  >
                    {agent.role}
                  </span>

                  {/* Headline */}
                  <p className="font-sans text-sm text-gray-600 leading-snug">
                    {agent.headline}
                  </p>

                  {/* Deliverables */}
                  <ul className="flex flex-col gap-1.5 flex-1">
                    {agent.deliverables.map((item) => (
                      <li key={item} className="flex items-center gap-2 font-sans text-xs text-gray-700">
                        <span
                          className="w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center border border-black/10"
                          style={{ background: agent.lightColor }}
                        >
                          <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                            <path
                              d="M2 5l2.5 2.5 4-4"
                              stroke={agent.color}
                              strokeWidth="1.8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* Price pill */}
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
            );
          })}
        </div>

        {/* Bottom row */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 rounded-2xl bg-white border-2 border-black shadow-[4px_4px_0_#000] px-6 py-5">
          <div className="flex flex-col sm:flex-row items-center gap-6 text-sm font-sans text-gray-600">
            {[
              { icon: "🛑", text: "Não dormem" },
              { icon: "📅", text: "Não tiram folga" },
              { icon: "⚡", text: "Respondem em segundos" },
              { icon: "💬", text: "Direto no WhatsApp" },
            ].map((item) => (
              <span key={item.text} className="flex items-center gap-1.5">
                <span>{item.icon}</span>
                <strong className="text-black font-semibold">{item.text}</strong>
              </span>
            ))}
          </div>
          <a
            href="#precos"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#25D366] border-2 border-black text-black font-bold text-sm shadow-[4px_4px_0_#000] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-150 flex-shrink-0 whitespace-nowrap"
          >
            Ativar agentes →
          </a>
        </div>
      </div>
    </section>
  );
}
