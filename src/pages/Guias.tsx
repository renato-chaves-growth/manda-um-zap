import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, FileText, Download, BookMarked } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { guides, guideCategories, GuideCategory } from "@/data/guidesData";

const Guias = () => {
  const [selectedCategory, setSelectedCategory] = useState<GuideCategory | "Todos">("Todos");

  const filteredGuides = guides.filter((guide) => {
    return selectedCategory === "Todos" || guide.category === selectedCategory;
  });

  return (
    <main className="flex-1 bg-background">
        {/* Hero */}
        <section className="pt-28 pb-12 md:pt-32 md:pb-16">
          <div className="container">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <BookMarked className="w-4 h-4" />
                Materiais exclusivos
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-foreground mb-4">
                <span className="text-gradient font-bold">Guias</span> e materiais
              </h1>
              <p className="text-lg text-muted-foreground font-light">
                E-books, planilhas e checklists para você baixar e usar na sua prestação de serviços
              </p>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="pb-8">
          <div className="container">
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === "Todos" ? "default" : "outline"}
                size="sm"
                className="rounded-full"
                onClick={() => setSelectedCategory("Todos")}
              >
                Todos
              </Button>
              {guideCategories.map((cat) => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? "default" : "outline"}
                  size="sm"
                  className="rounded-full"
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Guides grid */}
        <section className="pb-20">
          <div className="container">
            {filteredGuides.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Nenhum guia encontrado.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredGuides.map((guide) => (
                  <Card
                    key={guide.id}
                    className="group overflow-hidden border-transparent hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className={`aspect-[4/3] bg-gradient-to-br ${guide.gradient} relative overflow-hidden`}>
                      {/* Pattern */}
                      <div className="absolute inset-0 opacity-10">
                        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                          {Array.from({ length: 6 }).map((_, row) =>
                            Array.from({ length: 6 }).map((_, col) => (
                              <circle
                                key={`${row}-${col}`}
                                cx={10 + col * 18}
                                cy={10 + row * 18}
                                r="1.5"
                                fill="white"
                                opacity="0.5"
                              />
                            ))
                          )}
                        </svg>
                      </div>
                      {/* Icon */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-6xl">{guide.icon}</div>
                      </div>
                      {/* Pages badge */}
                      <div className="absolute bottom-3 right-3 px-2 py-1 rounded bg-white/20 backdrop-blur-sm text-white text-xs flex items-center gap-1">
                        <FileText className="w-3 h-3" />
                        {guide.pages} páginas
                      </div>
                    </div>
                    <CardContent className="p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                          {guide.category}
                        </span>
                        {guide.downloadable && (
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Download className="w-3 h-3" />
                            PDF
                          </span>
                        )}
                      </div>
                      <h3 className="font-semibold text-lg text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {guide.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4 font-light">
                        {guide.description}
                      </p>
                      <Link
                        to={`/guias/${guide.slug}`}
                        className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:gap-2 transition-all"
                      >
                        Ver guia
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="pb-20">
          <div className="container">
            <div className="bg-gradient-to-br from-primary/10 to-violet-500/10 rounded-3xl p-8 md:p-12 text-center">
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
                Receba novos materiais por e-mail
              </h2>
              <p className="text-muted-foreground font-light mb-6 max-w-lg mx-auto">
                Cadastre-se para ser o primeiro a receber nossos novos guias e planilhas.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Seu melhor e-mail"
                  className="flex-1 px-4 py-3 rounded-lg border border-border bg-background text-sm"
                />
                <Button size="lg" className="gap-2">
                  Cadastrar
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>
    </main>
  );
};

export default Guias;
