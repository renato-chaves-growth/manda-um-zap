import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, TrendingUp, Clock, Users, Star, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cases, caseRegions, CaseRegion } from "@/data/casesData";

const Cases = () => {
  const [selectedRegion, setSelectedRegion] = useState<CaseRegion | "Todos">("Todos");

  const filteredCases = cases.filter((c) => {
    return selectedRegion === "Todos" || c.region === selectedRegion;
  });

  const featuredCase = filteredCases.find((c) => c.featured);
  const regularCases = filteredCases.filter((c) => !c.featured);

  return (
    <main className="flex-1 bg-background">
        {/* Hero */}
        <section className="pt-28 pb-12 md:pt-32 md:pb-16">
          <div className="container">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Star className="w-4 h-4" />
                Histórias de sucesso
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-foreground mb-4">
                <span className="text-gradient font-bold">Cases</span> de prestação de serviçoss
              </h1>
              <p className="text-lg text-muted-foreground font-light">
                Conheça as histórias de prestadores de serviço que transformaram seus negócios com o MandaUmZap
              </p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="pb-12">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-muted/30 rounded-2xl p-6 text-center">
                <p className="text-3xl font-bold text-primary mb-1">847+</p>
                <p className="text-sm text-muted-foreground">prestação de serviçoss ativas</p>
              </div>
              <div className="bg-muted/30 rounded-2xl p-6 text-center">
                <p className="text-3xl font-bold text-primary mb-1">+45%</p>
                <p className="text-sm text-muted-foreground">Aumento médio de receita</p>
              </div>
              <div className="bg-muted/30 rounded-2xl p-6 text-center">
                <p className="text-3xl font-bold text-primary mb-1">3.5h</p>
                <p className="text-sm text-muted-foreground">Economizadas por dia</p>
              </div>
              <div className="bg-muted/30 rounded-2xl p-6 text-center">
                <p className="text-3xl font-bold text-primary mb-1">4.9</p>
                <p className="text-sm text-muted-foreground">Avaliação média</p>
              </div>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="pb-8">
          <div className="container">
            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-medium text-muted-foreground mr-2 self-center">Região:</span>
              <Button
                variant={selectedRegion === "Todos" ? "default" : "outline"}
                size="sm"
                className="rounded-full"
                onClick={() => setSelectedRegion("Todos")}
              >
                Todos
              </Button>
              {caseRegions.map((region) => (
                <Button
                  key={region}
                  variant={selectedRegion === region ? "default" : "outline"}
                  size="sm"
                  className="rounded-full"
                  onClick={() => setSelectedRegion(region)}
                >
                  {region}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured case */}
        {featuredCase && selectedRegion === "Todos" && (
          <section className="pb-12">
            <div className="container">
              <Card className="overflow-hidden border-transparent hover:shadow-xl transition-all duration-300">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className={`aspect-[4/3] md:aspect-auto bg-gradient-to-br ${featuredCase.gradient} relative overflow-hidden p-8 flex flex-col justify-end min-h-[320px]`}>
                    {/* Pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <circle cx="80" cy="20" r="30" fill="white" />
                        <circle cx="20" cy="80" r="20" fill="white" />
                      </svg>
                    </div>
                    <div className="relative z-10">
                      <Quote className="w-10 h-10 text-white/50 mb-4" />
                      <p className="text-white text-xl font-light leading-relaxed">
                        "{featuredCase.testimonial}"
                      </p>
                    </div>
                  </div>
                  <CardContent className="p-6 md:p-8 flex flex-col justify-center">
                    <span className="text-xs text-muted-foreground mb-2">Case em destaque</span>
                    <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-1">
                      {featuredCase.company}
                    </h2>
                    <p className="text-muted-foreground mb-6">
                      {featuredCase.owner} • {featuredCase.location}
                    </p>
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="text-center p-3 bg-muted/30 rounded-xl">
                        <TrendingUp className="w-5 h-5 text-primary mx-auto mb-1" />
                        <p className="text-lg font-bold text-foreground">{featuredCase.metrics.revenue}</p>
                        <p className="text-xs text-muted-foreground">receita</p>
                      </div>
                      <div className="text-center p-3 bg-muted/30 rounded-xl">
                        <Clock className="w-5 h-5 text-primary mx-auto mb-1" />
                        <p className="text-lg font-bold text-foreground">{featuredCase.metrics.time}</p>
                        <p className="text-xs text-muted-foreground">economizadas</p>
                      </div>
                      <div className="text-center p-3 bg-muted/30 rounded-xl">
                        <Users className="w-5 h-5 text-primary mx-auto mb-1" />
                        <p className="text-lg font-bold text-foreground">{featuredCase.metrics.clients}</p>
                        <p className="text-xs text-muted-foreground">novos clientes</p>
                      </div>
                    </div>
                    <Link to={`/cases/${featuredCase.slug}`}>
                      <Button className="gap-2 w-fit">
                        Ver case completo
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </div>
              </Card>
            </div>
          </section>
        )}

        {/* Cases grid */}
        <section className="pb-20">
          <div className="container">
            {filteredCases.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Nenhum case encontrado.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(selectedRegion === "Todos" ? regularCases : filteredCases).map((caseItem) => (
                  <Card
                    key={caseItem.id}
                    className="group overflow-hidden border-transparent hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className={`aspect-video bg-gradient-to-br ${caseItem.gradient} relative overflow-hidden p-5 flex items-end`}>
                      {/* Pattern */}
                      <div className="absolute inset-0 opacity-10">
                        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                          <circle cx="80" cy="20" r="25" fill="white" />
                        </svg>
                      </div>
                      <Quote className="w-8 h-8 text-white/40" />
                    </div>
                    <CardContent className="p-5">
                      <h3 className="font-semibold text-lg text-foreground mb-1 group-hover:text-primary transition-colors">
                        {caseItem.company}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {caseItem.owner} • {caseItem.location}
                      </p>
                      <p className="text-sm text-foreground font-light mb-4 line-clamp-2 italic">
                        "{caseItem.testimonial}"
                      </p>
                      <div className="flex items-center gap-4 text-sm mb-4">
                        <div className="flex items-center gap-1 text-primary">
                          <TrendingUp className="w-4 h-4" />
                          <span className="font-semibold">{caseItem.metrics.revenue}</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span>{caseItem.metrics.time}</span>
                        </div>
                      </div>
                      <Link
                        to={`/cases/${caseItem.slug}`}
                        className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:gap-2 transition-all"
                      >
                        Ver case
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="pb-20">
          <div className="container">
            <div className="bg-gradient-to-br from-primary/10 to-violet-500/10 rounded-3xl p-8 md:p-12 text-center">
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
                Quer ser o próximo case de sucesso?
              </h2>
              <p className="text-muted-foreground font-light mb-6 max-w-lg mx-auto">
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
        </section>
    </main>
  );
};

export default Cases;
