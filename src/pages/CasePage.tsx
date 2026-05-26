import { useParams, Link } from "react-router-dom";
import { ChevronLeft, TrendingUp, Clock, Users, Quote, ChevronRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cases } from "@/data/casesData";

const CasePage = () => {
  const { slug } = useParams();
  const caseStudy = cases.find((c) => c.slug === slug);

  if (!caseStudy) {
    return (
      <main className="flex-1 flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-4">Case não encontrado</h1>
          <Link to="/cases">
            <Button variant="outline" className="gap-2">
              <ChevronLeft className="w-4 h-4" />
              Voltar aos cases
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  // Get related cases (same region, excluding current)
  const relatedCases = cases
    .filter((c) => c.region === caseStudy.region && c.id !== caseStudy.id)
    .slice(0, 3);

  return (
    <main className="flex-1 bg-background">
        {/* Hero */}
        <section className="pt-28 pb-8 md:pt-32">
          <div className="container">
            <Link 
              to="/cases" 
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
            >
              <ChevronLeft className="w-4 h-4" />
              Voltar aos cases
            </Link>
            
            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-2">
                {caseStudy.company}
              </h1>
              <p className="text-lg text-muted-foreground font-light mb-6">
                {caseStudy.owner} • {caseStudy.location}
              </p>
              <div className="flex flex-wrap gap-2">
                {caseStudy.agents.map((agent) => (
                  <span 
                    key={agent}
                    className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary"
                  >
                    {agent}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Quote hero */}
        <section className="pb-12">
          <div className="container">
            <div className="max-w-4xl">
              <div className={`rounded-2xl overflow-hidden bg-gradient-to-br ${caseStudy.gradient} relative p-8 md:p-12`}>
                {/* Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <circle cx="80" cy="20" r="30" fill="white" />
                    <circle cx="20" cy="80" r="20" fill="white" />
                  </svg>
                </div>
                <div className="relative z-10">
                  <Quote className="w-12 h-12 text-white/50 mb-6" />
                  <p className="text-white text-2xl md:text-3xl font-light leading-relaxed mb-6">
                    "{caseStudy.story.quote}"
                  </p>
                  <p className="text-white/80">
                    — {caseStudy.owner}, {caseStudy.company}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Metrics */}
        <section className="pb-12">
          <div className="container">
            <div className="max-w-4xl">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-6 bg-muted/30 rounded-2xl">
                  <TrendingUp className="w-8 h-8 text-primary mx-auto mb-2" />
                  <p className="text-3xl font-bold text-foreground">{caseStudy.metrics.revenue}</p>
                  <p className="text-sm text-muted-foreground">aumento de receita</p>
                </div>
                <div className="text-center p-6 bg-muted/30 rounded-2xl">
                  <Clock className="w-8 h-8 text-primary mx-auto mb-2" />
                  <p className="text-3xl font-bold text-foreground">{caseStudy.metrics.time}</p>
                  <p className="text-sm text-muted-foreground">economizadas</p>
                </div>
                <div className="text-center p-6 bg-muted/30 rounded-2xl">
                  <Users className="w-8 h-8 text-primary mx-auto mb-2" />
                  <p className="text-3xl font-bold text-foreground">{caseStudy.metrics.clients}</p>
                  <p className="text-sm text-muted-foreground">novos clientes</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="pb-16">
          <div className="container">
            <div className="max-w-3xl space-y-12">
              {/* Before */}
              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-bold">1</span>
                  Antes do MandaUmZap
                </h2>
                <p className="text-muted-foreground font-light text-lg pl-11">
                  {caseStudy.story.before}
                </p>
              </div>

              {/* Challenge */}
              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-bold">2</span>
                  O desafio
                </h2>
                <p className="text-muted-foreground font-light text-lg pl-11">
                  {caseStudy.story.challenge}
                </p>
              </div>

              {/* Solution */}
              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">3</span>
                  A solução
                </h2>
                <div className="pl-11">
                  <p className="text-muted-foreground font-light text-lg mb-4">
                    {caseStudy.story.solution}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {caseStudy.agents.map((agent) => (
                      <span 
                        key={agent}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-full bg-primary/10 text-primary"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        {agent}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Results */}
              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">4</span>
                  Os resultados
                </h2>
                <p className="text-muted-foreground font-light text-lg pl-11">
                  {caseStudy.story.results}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="pb-16">
          <div className="container">
            <div className="max-w-3xl">
              <div className="bg-gradient-to-br from-primary/10 to-violet-500/10 rounded-2xl p-6 md:p-8 text-center">
                <h3 className="text-2xl font-semibold text-foreground mb-3">
                  Quer resultados como esses?
                </h3>
                <p className="text-muted-foreground font-light mb-6">
                  Comece hoje mesmo e transforme sua prestação de serviços com a ajuda da inteligência artificial.
                </p>
                <Link to="/carrinho">
                  <Button size="lg" className="gap-2">
                    Quero começar
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Related cases */}
        {relatedCases.length > 0 && (
          <section className="pb-20">
            <div className="container">
              <h2 className="text-2xl font-semibold text-foreground mb-6">
                Outros cases da região {caseStudy.region}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedCases.map((related) => (
                  <Link
                    key={related.id}
                    to={`/cases/${related.slug}`}
                    className="group block"
                  >
                    <div className={`aspect-video rounded-xl overflow-hidden mb-4 bg-gradient-to-br ${related.gradient} relative p-5 flex items-end`}>
                      <Quote className="w-8 h-8 text-white/40" />
                    </div>
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {related.company}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {related.location}
                    </p>
                    <div className="flex items-center gap-2 mt-2 text-primary text-sm font-medium">
                      <TrendingUp className="w-4 h-4" />
                      {related.metrics.revenue}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
    </main>
  );
};

export default CasePage;
