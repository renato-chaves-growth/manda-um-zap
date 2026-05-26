import { Star } from "lucide-react";
import { useState } from "react";

// ─── Tipos ────────────────────────────────────────────────────────────────────

interface Testimonial {
  quote:  string;
  author: string;
  role:   string;
  rating: number;
}

// ─── Dados ────────────────────────────────────────────────────────────────────

const TESTIMONIALS_ROW_1: Testimonial[] = [
  { quote: "Hoje respondo cliente rápido e não perco mais orçamento.",          author: "Carlos",   role: "prestador de serviço autônomo",    rating: 5 },
  { quote: "Antes demorava dias, agora faço orçamento em minutos.",             author: "Roberto",  role: "Dono de prestação de serviços",    rating: 5 },
  { quote: "Finalmente sei se o projeto deu lucro.",                            author: "André",    role: "prestador de serviço há 15 anos",  rating: 5 },
  { quote: "Minha prestação de serviços cresceu 40% depois que comecei a usar.",author: "Fernando", role: "prestador de serviço empresário",  rating: 5 },
  { quote: "Nunca mais perdi um cliente por demora no orçamento.",              author: "Marcos",   role: "prestador de serviço autônomo",    rating: 5 },
] as const;

const TESTIMONIALS_ROW_2: Testimonial[] = [
  { quote: "Agora consigo atender mais clientes sem estresse.",           author: "José",   role: "Dono de prestação de serviços",   rating: 5 },
  { quote: "O controle financeiro mudou meu negócio.",                   author: "Pedro",  role: "prestador de serviço há 20 anos", rating: 5 },
  { quote: "Meus clientes elogiam a rapidez no atendimento.",            author: "Lucas",  role: "prestador de serviço autônomo",   rating: 5 },
  { quote: "Parei de perder dinheiro em projetos mal calculados.",       author: "Rafael", role: "Dono de prestação de serviços",   rating: 5 },
  { quote: "Finalmente tenho tempo para focar na produção.",             author: "Thiago", role: "prestador de serviço empresário", rating: 5 },
] as const;

const TOTAL_REVIEWS  = 847;
const AVERAGE_RATING = 4.9;

// ─── Sub-componente: card de depoimento ──────────────────────────────────────

function TestimonialCard({ quote, author, role, rating }: Testimonial) {
  return (
    <figure className="flex-shrink-0 w-[320px] md:w-[380px] bg-white dark:bg-card rounded-2xl p-6 md:p-8 shadow-sm border border-border/30">
      {/* Estrelas */}
      <div className="flex items-center gap-0.5 mb-4" aria-label={`${rating} estrelas`}>
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} className="w-5 h-5 text-primary fill-primary" aria-hidden="true" />
        ))}
      </div>

      {/* Citação */}
      <blockquote className="text-base md:text-lg text-foreground mb-6 leading-relaxed font-light">
        {quote}
      </blockquote>

      {/* Autor */}
      <figcaption>
        <p className="font-semibold text-foreground">{author}</p>
        <p className="text-sm text-muted-foreground">{role}</p>
      </figcaption>
    </figure>
  );
}

// ─── Componente principal ─────────────────────────────────────────────────────

/**
 * TestimonialsSection — faixa de depoimentos em marquee duplo (linha 1 → esquerda, linha 2 → direita).
 * Pausa na interação do usuário (hover/touch).
 */
export function TestimonialsSection() {
  const [row1Paused, setRow1Paused] = useState(false);
  const [row2Paused, setRow2Paused] = useState(false);

  return (
    <section className="py-16 md:py-24 overflow-hidden" aria-labelledby="testimonials-heading">
      <div className="container">
        <div className="bg-section-green rounded-3xl py-12 md:py-16 relative overflow-hidden">
          <div className="px-6 md:px-12">
            <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
              <h2
                id="testimonials-heading"
                className="text-2xl md:text-3xl lg:text-4xl font-medium text-foreground mb-4 tracking-tight"
              >
                O que dizem os prestadores de serviço
              </h2>

              {/* Resumo de avaliação */}
              <div className="flex items-center justify-center gap-3">
                <div className="flex items-center gap-1" aria-label="5 estrelas">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-primary fill-primary" aria-hidden="true" />
                  ))}
                </div>
                <span className="text-lg font-semibold text-foreground">{AVERAGE_RATING}</span>
                <span className="text-muted-foreground" aria-hidden="true">•</span>
                <span className="text-muted-foreground">{TOTAL_REVIEWS} avaliações</span>
              </div>
            </div>
          </div>

          {/* Container das duas faixas */}
          <div className="space-y-6" aria-label="Depoimentos de clientes">

            {/* Faixa 1 — desloca para a esquerda */}
            <div
              className="relative"
              onMouseEnter={() => setRow1Paused(true)}
              onMouseLeave={() => setRow1Paused(false)}
              onTouchStart={() => setRow1Paused(true)}
              onTouchEnd={() => setRow1Paused(false)}
            >
              <div
                className="flex gap-6 marquee-row"
                style={{
                  width:                   "max-content",
                  animationName:           "marquee-left",
                  animationDuration:       "60s",
                  animationTimingFunction: "linear",
                  animationIterationCount: "infinite",
                  animationPlayState:      row1Paused ? "paused" : "running",
                }}
              >
                {/* Duplica para loop contínuo */}
                {[...TESTIMONIALS_ROW_1, ...TESTIMONIALS_ROW_1].map((t, i) => (
                  <TestimonialCard key={`row1-${i}`} {...t} />
                ))}
              </div>
            </div>

            {/* Faixa 2 — desloca para a direita */}
            <div
              className="relative"
              onMouseEnter={() => setRow2Paused(true)}
              onMouseLeave={() => setRow2Paused(false)}
              onTouchStart={() => setRow2Paused(true)}
              onTouchEnd={() => setRow2Paused(false)}
            >
              <div
                className="flex gap-6 marquee-row"
                style={{
                  width:                   "max-content",
                  animationName:           "marquee-right",
                  animationDuration:       "60s",
                  animationTimingFunction: "linear",
                  animationIterationCount: "infinite",
                  animationPlayState:      row2Paused ? "paused" : "running",
                }}
              >
                {/* Duplica para loop contínuo */}
                {[...TESTIMONIALS_ROW_2, ...TESTIMONIALS_ROW_2].map((t, i) => (
                  <TestimonialCard key={`row2-${i}`} {...t} />
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
