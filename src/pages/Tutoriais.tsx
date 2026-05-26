import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Play, Clock, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { tutorials, tutorialCategories, tutorialLevels, TutorialCategory, TutorialLevel } from "@/data/tutorialsData";

const levelColors = {
  Iniciante: "bg-green-100 text-green-700",
  Intermediário: "bg-amber-100 text-amber-700",
  Avançado: "bg-red-100 text-red-700",
};

const Tutoriais = () => {
  const [selectedCategory, setSelectedCategory] = useState<TutorialCategory | "Todos">("Todos");
  const [selectedLevel, setSelectedLevel] = useState<TutorialLevel | "Todos">("Todos");

  const filteredTutorials = tutorials.filter((tutorial) => {
    const matchesCategory = selectedCategory === "Todos" || tutorial.category === selectedCategory;
    const matchesLevel = selectedLevel === "Todos" || tutorial.level === selectedLevel;
    return matchesCategory && matchesLevel;
  });

  return (
    <main className="flex-1 bg-background">
        {/* Hero */}
        <section className="pt-28 pb-12 md:pt-32 md:pb-16">
          <div className="container">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <BookOpen className="w-4 h-4" />
                Aprenda no seu ritmo
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-foreground mb-4">
                <span className="text-gradient font-bold">Tutoriais</span> práticos
              </h1>
              <p className="text-lg text-muted-foreground font-light">
                Vídeos e guias passo a passo para você dominar todas as funcionalidades do MandaUmZap
              </p>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="pb-8">
          <div className="container">
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap gap-2">
                <span className="text-sm font-medium text-muted-foreground mr-2 self-center">Categoria:</span>
                <Button
                  variant={selectedCategory === "Todos" ? "default" : "outline"}
                  size="sm"
                  className="rounded-full"
                  onClick={() => setSelectedCategory("Todos")}
                >
                  Todos
                </Button>
                {tutorialCategories.map((cat) => (
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
              <div className="flex flex-wrap gap-2">
                <span className="text-sm font-medium text-muted-foreground mr-2 self-center">Nível:</span>
                <Button
                  variant={selectedLevel === "Todos" ? "default" : "outline"}
                  size="sm"
                  className="rounded-full"
                  onClick={() => setSelectedLevel("Todos")}
                >
                  Todos
                </Button>
                {tutorialLevels.map((level) => (
                  <Button
                    key={level}
                    variant={selectedLevel === level ? "default" : "outline"}
                    size="sm"
                    className="rounded-full"
                    onClick={() => setSelectedLevel(level)}
                  >
                    {level}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Tutorials grid */}
        <section className="pb-20">
          <div className="container">
            {filteredTutorials.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Nenhum tutorial encontrado.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTutorials.map((tutorial) => (
                  <Card
                    key={tutorial.id}
                    className="group overflow-hidden border-transparent hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className={`aspect-video bg-gradient-to-br ${tutorial.gradient} relative overflow-hidden`}>
                      {/* Pattern */}
                      <div className="absolute inset-0 opacity-20">
                        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                          <line x1="0" y1="20" x2="100" y2="20" stroke="white" strokeWidth="0.5" opacity="0.3" />
                          <line x1="0" y1="50" x2="100" y2="50" stroke="white" strokeWidth="0.5" opacity="0.3" />
                          <line x1="0" y1="80" x2="100" y2="80" stroke="white" strokeWidth="0.5" opacity="0.3" />
                        </svg>
                      </div>
                      {/* Play button */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Play className="w-7 h-7 text-white fill-white ml-1" />
                        </div>
                      </div>
                      {/* Duration badge */}
                      <div className="absolute bottom-3 right-3 px-2 py-1 rounded bg-black/50 text-white text-xs flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {tutorial.duration}
                      </div>
                    </div>
                    <CardContent className="p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${levelColors[tutorial.level]}`}>
                          {tutorial.level}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {tutorial.category}
                        </span>
                      </div>
                      <h3 className="font-semibold text-lg text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {tutorial.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4 font-light">
                        {tutorial.description}
                      </p>
                      <Link
                        to={`/tutoriais/${tutorial.slug}`}
                        className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:gap-2 transition-all"
                      >
                        Assistir tutorial
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
                Não encontrou o que procura?
              </h2>
              <p className="text-muted-foreground font-light mb-6 max-w-lg mx-auto">
                Nossa equipe está pronta para ajudar você a configurar sua prestação de serviços no piloto automático.
              </p>
              <Button size="lg" className="gap-2">
                Falar com suporte
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </section>
    </main>
  );
};

export default Tutoriais;
