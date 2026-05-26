import { useParams, Link } from "react-router-dom";
import { ChevronLeft, FileText, Download, ChevronRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { guides } from "@/data/guidesData";

const GuidePage = () => {
  const { slug } = useParams();
  const guide = guides.find((g) => g.slug === slug);

  if (!guide) {
    return (
      <main className="flex-1 flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-4">Guia não encontrado</h1>
          <Link to="/guias">
            <Button variant="outline" className="gap-2">
              <ChevronLeft className="w-4 h-4" />
              Voltar aos guias
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  // Get related guides (same category, excluding current)
  const relatedGuides = guides
    .filter((g) => g.category === guide.category && g.id !== guide.id)
    .slice(0, 3);

  return (
    <main className="flex-1 bg-background">
        {/* Hero */}
        <section className="pt-28 pb-8 md:pt-32">
          <div className="container">
            <Link 
              to="/guias" 
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
            >
              <ChevronLeft className="w-4 h-4" />
              Voltar aos guias
            </Link>
            
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                  {guide.category}
                </span>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <FileText className="w-3 h-3" />
                  {guide.pages} páginas
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-4">
                {guide.title}
              </h1>
              <p className="text-lg text-muted-foreground font-light mb-6">
                {guide.description}
              </p>
              {guide.downloadable && (
                <Button className="gap-2">
                  <Download className="w-4 h-4" />
                  Baixar PDF
                </Button>
              )}
            </div>
          </div>
        </section>

        {/* Cover */}
        <section className="pb-12">
          <div className="container">
            <div className="max-w-4xl">
              <div className={`aspect-[2/1] rounded-2xl overflow-hidden bg-gradient-to-br ${guide.gradient} relative`}>
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
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-8xl">{guide.icon}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="pb-12">
          <div className="container">
            <div className="max-w-3xl">
              <div className="flex items-start gap-4 p-6 bg-muted/30 rounded-2xl">
                <BookOpen className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="font-semibold text-foreground mb-2">Introdução</h2>
                  <p className="text-muted-foreground font-light">{guide.content.introduction}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Chapters */}
        <section className="pb-16">
          <div className="container">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-semibold text-foreground mb-8">
                Conteúdo
              </h2>
              <div className="space-y-8">
                {guide.content.chapters.map((chapter, index) => (
                  <div key={index} className="border-l-2 border-primary/20 pl-6">
                    <h3 className="text-xl font-semibold text-foreground mb-3">{chapter.title}</h3>
                    <div className="text-muted-foreground font-light whitespace-pre-line">
                      {chapter.content.split('\n').map((line, lineIndex) => {
                        if (line.startsWith('☐')) {
                          return (
                            <div key={lineIndex} className="flex items-start gap-2 my-1">
                              <span className="text-primary">☐</span>
                              <span>{line.replace('☐ ', '')}</span>
                            </div>
                          );
                        }
                        return <p key={lineIndex} className="my-2">{line}</p>;
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Conclusion */}
        <section className="pb-16">
          <div className="container">
            <div className="max-w-3xl">
              <div className="bg-gradient-to-br from-primary/10 to-violet-500/10 rounded-2xl p-6 md:p-8">
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  Conclusão
                </h3>
                <p className="text-muted-foreground font-light mb-6">{guide.content.conclusion}</p>
                <div className="flex flex-wrap gap-3">
                  {guide.downloadable && (
                    <Button className="gap-2">
                      <Download className="w-4 h-4" />
                      Baixar PDF
                    </Button>
                  )}
                  <Link to="/agentes">
                    <Button variant="outline" className="gap-2">
                      Conhecer agentes
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related guides */}
        {relatedGuides.length > 0 && (
          <section className="pb-20">
            <div className="container">
              <h2 className="text-2xl font-semibold text-foreground mb-6">
                Guias relacionados
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedGuides.map((related) => (
                  <Link
                    key={related.id}
                    to={`/guias/${related.slug}`}
                    className="group block"
                  >
                    <div className={`aspect-[4/3] rounded-xl overflow-hidden mb-4 bg-gradient-to-br ${related.gradient} relative`}>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-5xl group-hover:scale-110 transition-transform">{related.icon}</div>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                      {related.category}
                    </span>
                    <h3 className="font-semibold text-foreground mt-2 group-hover:text-primary transition-colors line-clamp-2">
                      {related.title}
                    </h3>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
    </main>
  );
};

export default GuidePage;
