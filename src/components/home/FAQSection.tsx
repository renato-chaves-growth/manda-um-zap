import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// ─── Tipos ────────────────────────────────────────────────────────────────────

interface FaqItem {
  question: string;
  answer:   string;
}

// ─── Dados ────────────────────────────────────────────────────────────────────

const FAQS_LEFT: FaqItem[] = [
  {
    question: "Preciso saber usar computador?",
    answer:   "Não. É tudo pelo WhatsApp. Se você sabe mandar mensagem ou áudio, você já sabe usar o MandaUmZap.",
  },
  {
    question: "Funciona por áudio?",
    answer:   "Sim! Você pode falar por áudio normalmente. Os agentes entendem e respondem de forma prática.",
  },
  {
    question: "Posso escolher só um agente?",
    answer:   "Sim. Você pode começar com apenas um agente e ir adicionando conforme sua necessidade.",
  },
  {
    question: "Isso substitui vendedor?",
    answer:   "Não. O MandaUmZap ajuda você a trabalhar melhor. Ele organiza, responde rápido e economiza seu tempo — mas você continua no controle.",
  },
  {
    question: "Tem contrato?",
    answer:   "Não. Você paga mês a mês e cancela quando quiser. Sem burocracia.",
  },
] as const;

const FAQS_RIGHT: FaqItem[] = [
  {
    question: "Como funciona o pagamento?",
    answer:   "Você pode pagar com cartão de crédito, Pix ou boleto. O valor é cobrado mensalmente e você pode cancelar a qualquer momento.",
  },
  {
    question: "Posso testar antes de comprar?",
    answer:   "Sim! Oferecemos um período de teste gratuito de 7 dias para você conhecer todos os agentes e ver como funcionam na prática.",
  },
  {
    question: "Quantas mensagens posso enviar?",
    answer:   "Não há limite de mensagens. Use quantas vezes precisar durante o mês. Nossos agentes estão disponíveis 24 horas por dia, 7 dias por semana.",
  },
  {
    question: "Funciona em qualquer celular?",
    answer:   "Sim! Como tudo é feito pelo WhatsApp, funciona em qualquer celular Android ou iPhone, sem precisar instalar nada adicional.",
  },
  {
    question: "Os agentes entendem sobre prestação de serviços?",
    answer:   "Sim! Nossos agentes foram treinados especificamente para o mercado de prestação de serviços. Eles entendem termos técnicos, materiais, acabamentos e todo o fluxo do seu negócio.",
  },
] as const;

// ─── Componente ───────────────────────────────────────────────────────────────

/**
 * FAQSection — accordion de 10 perguntas frequentes em dois blocos lado a lado.
 */
export function FAQSection() {
  return (
    <section className="py-16 md:py-24" aria-labelledby="faq-heading">
      <div className="container">
        <div className="bg-[#1B2B2A] rounded-3xl relative overflow-hidden p-8 md:p-12 lg:p-16">

          {/* Cabeçalho */}
          <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
            <h2
              id="faq-heading"
              className="text-2xl md:text-3xl lg:text-4xl font-black text-white mb-4 tracking-tight"
            >
              Perguntas frequentes
            </h2>
            <p className="text-lg text-white/70">
              Tire suas dúvidas sobre o MandaUmZap
            </p>
          </div>

          {/* Colunas de FAQ */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">

            {/* Coluna esquerda */}
            <Accordion type="single" collapsible className="w-full space-y-4">
              {FAQS_LEFT.map((faq, index) => (
                <AccordionItem
                  key={`left-${index}`}
                  value={`left-${index}`}
                  className="bg-white/10 hover:bg-white/15 rounded-xl px-6 border border-white/15 transition-colors"
                >
                  <AccordionTrigger className="text-left text-base md:text-lg font-medium hover:no-underline py-5 text-white">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-white/70 pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            {/* Coluna direita */}
            <Accordion type="single" collapsible className="w-full space-y-4">
              {FAQS_RIGHT.map((faq, index) => (
                <AccordionItem
                  key={`right-${index}`}
                  value={`right-${index}`}
                  className="bg-white/10 hover:bg-white/15 rounded-xl px-6 border border-white/15 transition-colors"
                >
                  <AccordionTrigger className="text-left text-base md:text-lg font-medium hover:no-underline py-5 text-white">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-white/70 pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

          </div>
        </div>
      </div>
    </section>
  );
}
