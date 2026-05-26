import { Link } from "react-router-dom";
import { ChevronRight, TrendingUp, Clock, Users, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cases } from "@/data/casesData";

// ─── Dados ────────────────────────────────────────────────────────────────────

/** 3 primeiros cases para exibição na home */
const FEATURED_CASES = cases.slice(0, 3);

/** Métricas de prova social exibidas no rodapé da seção */
const SOCIAL_PROOF = [
  { value: "+500", label: "prestadores de serviço ativos" },
  { value: "+47%", label: "Aumento médio de receita"      },
  { value: "3,5h", label: "Economia média/dia"            },
  { value: "98%",  label: "Taxa de satisfação"            },
] as const;

// ─── Componente principal ─────────────────────────────────────────────────────

/**
 * CasesSection — exibe 3 cases de sucesso em destaque + barra de métricas.
 */
export function CasesSection() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden" aria-labelledby="cases-heading">
      {/* Blob de fundo */}
      <div className="bg-blob bg-blob-1" style={{ top: "30%", right: "-10%" }} aria-hidden="true" />

      <div className="container relative z-10">
        {/* Cabeçalho */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                Prova Social
              </span>
            </div>
            <h2
              id="cases-heading"
              className="text-2xl md:text-3xl lg:text-4xl font-light text-foreground mb-2"
            >
              Histórias de <span className="text-gradient font-bold">Sucesso</span>
            </h2>
            <p className="text-muted-foreground font-light max-w-lg">
              Prestadores de serviço reais, resultados reais. Veja como eles transformaram seus negócios.
            </p>
          </div>

          <Link to="/cases">
            <Button variant="ghost" className="gap-2 text-primary hover:text-primary/80">
              Ver todos os cases
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </Button>
          </Link>
        </div>

        {/* Grid de cases */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURED_CASES.map((caseItem) => (
            <Card
              key={caseItem.id}
              className="group overflow-hidden brutalist-box brutalist-hover-lg rounded-3xl bg-card"
            >
              {/* Header com métricas */}
              <div className="relative aspect-[4/3] bg-whatsapp-teal p-6 flex flex-col justify-between overflow-hidden">
                {/* Padrão decorativo */}
                <div className="absolute inset-0 opacity-10" aria-hidden="true">
                  <div className="absolute top-4 left-4 w-16 h-16 border-2 border-white rounded-full" />
                  <div className="absolute bottom-8 right-8 w-24 h-24 border-2 border-white rounded-full" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-white rounded-full" />
                </div>

                {/* Grid de métricas */}
                <div className="relative grid grid-cols-3 gap-2 text-white">
                  <div className="text-center p-2 rounded-lg bg-white/10 backdrop-blur-sm">
                    <TrendingUp className="w-4 h-4 mx-auto mb-1 opacity-80" aria-hidden="true" />
                    <div className="text-lg font-bold">{caseItem.metrics.revenue}</div>
                    <div className="text-[10px] uppercase tracking-wide opacity-70">Receita</div>
                  </div>
                  <div className="text-center p-2 rounded-lg bg-white/10 backdrop-blur-sm">
                    <Clock className="w-4 h-4 mx-auto mb-1 opacity-80" aria-hidden="true" />
                    <div className="text-lg font-bold">{caseItem.metrics.time}</div>
                    <div className="text-[10px] uppercase tracking-wide opacity-70">Economia</div>
                  </div>
                  <div className="text-center p-2 rounded-lg bg-white/10 backdrop-blur-sm">
                    <Users className="w-4 h-4 mx-auto mb-1 opacity-80" aria-hidden="true" />
                    <div className="text-lg font-bold">{caseItem.metrics.clients}</div>
                    <div className="text-[10px] uppercase tracking-wide opacity-70">Clientes</div>
                  </div>
                </div>

                <div className="relative flex items-end">
                  <Quote className="w-8 h-8 text-white/30" aria-hidden="true" />
                </div>
              </div>

              {/* Conteúdo do card */}
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold text-foreground">{caseItem.company}</span>
                  <span className="text-xs text-muted-foreground">{caseItem.location}</span>
                </div>

                <p className="text-sm text-muted-foreground line-clamp-3 mb-4 font-light italic">
                  "{caseItem.testimonial}"
                </p>

                {/* Agentes usados + link */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1" aria-label="Agentes utilizados">
                    {caseItem.agents.slice(0, 3).map((agent, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-primary/10 text-primary"
                      >
                        {agent}
                      </span>
                    ))}
                    {caseItem.agents.length > 3 && (
                      <span className="text-xs text-muted-foreground">
                        +{caseItem.agents.length - 3}
                      </span>
                    )}
                  </div>

                  <Link
                    to={`/cases/${caseItem.slug}`}
                    className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:gap-2 transition-all"
                  >
                    Ver case
                    <ChevronRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Barra de prova social */}
        <div className="mt-12 p-6 rounded-2xl bg-[#1B2B2A]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {SOCIAL_PROOF.map(({ value, label }) => (
              <div key={label}>
                <div className="text-2xl md:text-3xl font-bold text-white">{value}</div>
                <div className="text-sm text-white/70 font-light">{label}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
