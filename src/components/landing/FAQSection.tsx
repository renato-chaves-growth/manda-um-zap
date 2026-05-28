import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Preciso trocar meu número do WhatsApp?",
    a: "Não. O MandaUmZap conecta no mesmo número que você já usa hoje. Seus contatos continuam os mesmos. É só escanear um QR code e pronto.",
  },
  {
    q: "E se o cliente quiser falar com uma pessoa real?",
    a: "O agente identifica quando o cliente precisa de atendimento humano e te notifica imediatamente. Você assume a conversa com um clique e o histórico fica salvo.",
  },
  {
    q: "Funciona para qualquer tipo de prestador de serviço?",
    a: "Sim! Eletricistas, encanadores, pintores, pedreiros, marceneiros, paisagistas, técnicos de informática — qualquer profissional que atende clientes pelo WhatsApp.",
  },
  {
    q: "Preciso saber de tecnologia ou programação?",
    a: "Nada disso. Se você sabe usar o WhatsApp, você usa o MandaUmZap. O setup é feito em menos de 10 minutos com um formulário simples.",
  },
  {
    q: "Posso cancelar quando quiser?",
    a: "Sim, sem multa e sem burocracia. Você cancela direto no painel ou manda mensagem para nosso suporte. A cobrança é mensal.",
  },
  {
    q: "Como funciona o preço de R$ 29,00 por agente?",
    a: "Você paga apenas pelos agentes que ativar. Se quiser só a Clara para atendimento, paga R$ 29,00/mês. Se quiser Clara + Lucas (agenda), paga R$ 58,00/mês. Simples assim.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`rounded-xl border-2 border-black overflow-hidden transition-all duration-200 ${open ? "shadow-[4px_4px_0_#000]" : "shadow-[2px_2px_0_#000]"}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 p-5 bg-white hover:bg-[#F7F1E8] transition-colors text-left"
      >
        <span className="font-display font-black text-base text-black leading-snug">{q}</span>
        <ChevronDown
          size={20}
          className={`flex-shrink-0 text-[#075E54] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="px-5 pb-5 bg-white border-t border-gray-100">
          <p className="font-sans text-gray-600 leading-relaxed pt-4">{a}</p>
        </div>
      )}
    </div>
  );
}

export function FAQSection() {
  return (
    <section id="faq" className="bg-[#F7F1E8] py-20 lg:py-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white border-2 border-black text-xs font-bold font-sans shadow-[2px_2px_0_#000] mb-4">
            DÚVIDAS FREQUENTES
          </span>
          <h2 className="font-display font-black text-4xl lg:text-5xl text-black leading-tight">
            Perguntas <span className="text-[#075E54]">e respostas.</span>
          </h2>
        </div>

        {/* FAQ list */}
        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <FAQItem key={i} q={faq.q} a={faq.a} />
          ))}
        </div>

        {/* Still have questions */}
        <div className="mt-10 text-center">
          <p className="font-sans text-gray-500 mb-4">Ainda tem dúvida?</p>
          <a
            href="https://wa.me/5500000000000?text=Olá! Tenho uma dúvida sobre o MandaUmZap"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border-2 border-black text-black font-bold text-sm shadow-[4px_4px_0_#000] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-150"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#25D366">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Falar no WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
