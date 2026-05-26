import { Star } from "lucide-react";
import { useState } from "react";

const testimonialsRow1 = [
  {
    quote: "Hoje respondo cliente rápido e não perco mais orçamento.",
    author: "Carlos",
    role: "prestador de serviço autônomo",
    rating: 5,
  },
  {
    quote: "Antes demorava dias, agora faço orçamento em minutos.",
    author: "Roberto",
    role: "Dono de prestação de serviços",
    rating: 5,
  },
  {
    quote: "Finalmente sei se o projeto deu lucro.",
    author: "André",
    role: "prestador de serviço há 15 anos",
    rating: 5,
  },
  {
    quote: "Minha prestação de serviços cresceu 40% depois que comecei a usar.",
    author: "Fernando",
    role: "prestador de serviço empresário",
    rating: 5,
  },
  {
    quote: "Nunca mais perdi um cliente por demora no orçamento.",
    author: "Marcos",
    role: "prestador de serviço autônomo",
    rating: 5,
  },
];

const testimonialsRow2 = [
  {
    quote: "Agora consigo atender mais clientes sem estresse.",
    author: "José",
    role: "Dono de prestação de serviços",
    rating: 5,
  },
  {
    quote: "O controle financeiro mudou meu negócio.",
    author: "Pedro",
    role: "prestador de serviço há 20 anos",
    rating: 5,
  },
  {
    quote: "Meus clientes elogiam a rapidez no atendimento.",
    author: "Lucas",
    role: "prestador de serviço autônomo",
    rating: 5,
  },
  {
    quote: "Parei de perder dinheiro em projetos mal calculados.",
    author: "Rafael",
    role: "Dono de prestação de serviços",
    rating: 5,
  },
  {
    quote: "Finalmente tenho tempo para focar na produção.",
    author: "Thiago",
    role: "prestador de serviço empresário",
    rating: 5,
  },
];

// Stats
const totalReviews = 847;
const averageRating = 4.9;

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  rating: number;
}

function TestimonialCard({ quote, author, role, rating }: TestimonialCardProps) {
  return (
    <div className="flex-shrink-0 w-[320px] md:w-[380px] bg-white dark:bg-card rounded-2xl p-6 md:p-8 shadow-sm border border-border/30">
      {/* Stars */}
      <div className="flex items-center gap-0.5 mb-4">
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} className="w-5 h-5 text-primary fill-primary" />
        ))}
      </div>

      {/* Quote text */}
      <blockquote className="text-base md:text-lg text-foreground mb-6 leading-relaxed font-light">
        {quote}
      </blockquote>

      {/* Author */}
      <div>
        <p className="font-semibold text-foreground">{author}</p>
        <p className="text-sm text-muted-foreground">{role}</p>
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  const [isRow1Paused, setIsRow1Paused] = useState(false);
  const [isRow2Paused, setIsRow2Paused] = useState(false);

  return (
    <section className="py-16 md:py-24 overflow-hidden">
      <div className="container">
        <div className="bg-section-green rounded-3xl py-12 md:py-16 relative overflow-hidden">
          <div className="px-6 md:px-12">
            <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium text-foreground mb-4 tracking-tight">
                O que dizem os prestadores de serviço
              </h2>
              
              {/* Rating summary */}
              <div className="flex items-center justify-center gap-3">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-primary fill-primary" />
                  ))}
                </div>
                <span className="text-lg font-semibold text-foreground">{averageRating}</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground">{totalReviews} avaliações</span>
              </div>
            </div>
          </div>

          {/* Marquee container */}
          <div className="space-y-6">
            {/* Row 1 - scrolling left */}
            <div
              className="relative"
              onMouseEnter={() => setIsRow1Paused(true)}
              onMouseLeave={() => setIsRow1Paused(false)}
              onTouchStart={() => setIsRow1Paused(true)}
              onTouchEnd={() => setIsRow1Paused(false)}
            >
              <div
                className="flex gap-6 marquee-row"
                style={{
                  width: "max-content",
                  animationName: "marquee-left",
                  animationDuration: "60s",
                  animationTimingFunction: "linear",
                  animationIterationCount: "infinite",
                  animationPlayState: isRow1Paused ? "paused" : "running",
                }}
              >
                {/* Duplicate testimonials for seamless loop */}
                {[...testimonialsRow1, ...testimonialsRow1].map((testimonial, index) => (
                  <TestimonialCard key={index} {...testimonial} />
                ))}
              </div>
            </div>

            {/* Row 2 - scrolling right */}
            <div
              className="relative"
              onMouseEnter={() => setIsRow2Paused(true)}
              onMouseLeave={() => setIsRow2Paused(false)}
              onTouchStart={() => setIsRow2Paused(true)}
              onTouchEnd={() => setIsRow2Paused(false)}
            >
              <div
                className="flex gap-6 marquee-row"
                style={{
                  width: "max-content",
                  animationName: "marquee-right",
                  animationDuration: "60s",
                  animationTimingFunction: "linear",
                  animationIterationCount: "infinite",
                  animationPlayState: isRow2Paused ? "paused" : "running",
                }}
              >
                {/* Duplicate testimonials for seamless loop */}
                {[...testimonialsRow2, ...testimonialsRow2].map((testimonial, index) => (
                  <TestimonialCard key={index} {...testimonial} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
