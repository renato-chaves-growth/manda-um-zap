import { Link } from "react-router-dom";
import { ChevronRight, TrendingUp, Clock, Users, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cases } from "@/data/casesData";

// Select featured cases for homepage
const featuredCases = cases.slice(0, 3);

export function CasesSection() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Background blob */}
      <div className="bg-blob bg-blob-1" style={{ top: "30%", right: "-10%" }} />
      
      <div className="container relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                Prova Social
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-light text-foreground mb-2">
              Histórias de <span className="text-gradient font-bold">Sucesso</span>
            </h2>
            <p className="text-muted-foreground font-light max-w-lg">
              prestadores de serviço reais, resultados reais. Veja como eles transformaram seus negócios.
            </p>
          </div>
          <Link to="/cases">
            <Button variant="ghost" className="gap-2 text-primary hover:text-primary/80">
              Ver todos os cases
              <ChevronRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCases.map((caseItem, index) => (
            <Card 
              key={caseItem.id} 
              className="group overflow-hidden brutalist-box brutalist-hover-lg rounded-3xl bg-card"
            >
              {/* Gradient header with metrics */}
              <div className="relative aspect-[4/3] bg-whatsapp-teal p-6 flex flex-col justify-between overflow-hidden">
                {/* Decorative pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-4 left-4 w-16 h-16 border-2 border-white rounded-full" />
                  <div className="absolute bottom-8 right-8 w-24 h-24 border-2 border-white rounded-full" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-white rounded-full" />
                </div>
                
                {/* Metrics grid */}
                <div className="relative grid grid-cols-3 gap-2 text-white">
                  <div className="text-center p-2 rounded-lg bg-white/10 backdrop-blur-sm">
                    <TrendingUp className="w-4 h-4 mx-auto mb-1 opacity-80" />
                    <div className="text-lg font-bold">{caseItem.metrics.revenue}</div>
                    <div className="text-[10px] uppercase tracking-wide opacity-70">Receita</div>
                  </div>
                  <div className="text-center p-2 rounded-lg bg-white/10 backdrop-blur-sm">
                    <Clock className="w-4 h-4 mx-auto mb-1 opacity-80" />
                    <div className="text-lg font-bold">{caseItem.metrics.time}</div>
                    <div className="text-[10px] uppercase tracking-wide opacity-70">Economia</div>
                  </div>
                  <div className="text-center p-2 rounded-lg bg-white/10 backdrop-blur-sm">
                    <Users className="w-4 h-4 mx-auto mb-1 opacity-80" />
                    <div className="text-lg font-bold">{caseItem.metrics.clients}</div>
                    <div className="text-[10px] uppercase tracking-wide opacity-70">Clientes</div>
                  </div>
                </div>

                {/* Quote icon */}
                <div className="relative flex items-end">
                  <Quote className="w-8 h-8 text-white/30" />
                </div>
              </div>

              <CardContent className="p-5">
                {/* Company and location */}
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold text-foreground">{caseItem.company}</span>
                  <span className="text-xs text-muted-foreground">{caseItem.location}</span>
                </div>
                
                {/* Testimonial */}
                <p className="text-sm text-muted-foreground line-clamp-3 mb-4 font-light italic">
                  "{caseItem.testimonial}"
                </p>

                {/* Agents used */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {caseItem.agents.slice(0, 3).map((agent, i) => (
                      <span 
                        key={i}
                        className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-primary/10 text-primary"
                      >
                        {agent}
                      </span>
                    ))}
                    {caseItem.agents.length > 3 && (
                      <span className="text-xs text-muted-foreground">+{caseItem.agents.length - 3}</span>
                    )}
                  </div>
                  <Link 
                    to={`/cases/${caseItem.slug}`}
                    className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:gap-2 transition-all"
                  >
                    Ver case
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom social proof bar */}
        <div className="mt-12 p-6 rounded-2xl bg-[#1B2B2A]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl md:text-3xl font-bold text-white">+500</div>
              <div className="text-sm text-white/70 font-light">prestadores de serviço ativos</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-white">+47%</div>
              <div className="text-sm text-white/70 font-light">Aumento médio de receita</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-white">3,5h</div>
              <div className="text-sm text-white/70 font-light">Economia média/dia</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-white">98%</div>
              <div className="text-sm text-white/70 font-light">Taxa de satisfação</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
