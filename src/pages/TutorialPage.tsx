import { useParams, Link } from "react-router-dom";
import { ChevronLeft, Clock, CheckCircle2, Lightbulb, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { tutorials } from "@/data/tutorialsData";

const levelColors = {
  Iniciante: "bg-green-100 text-green-700",
  Intermediário: "bg-amber-100 text-amber-700",
  Avançado: "bg-red-100 text-red-700",
};

const TutorialPage = () => {
  const { slug } = useParams();
  const tutorial = tutorials.find((t) => t.slug === slug);

  if (!tutorial) {
    return (
      <main className="flex-1 flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-4">Tutorial não encontrado</h1>
          <Link to="/tutoriais">
            <Button variant="outline" className="gap-2">
              <ChevronLeft className="w-4 h-4" />
              Voltar aos tutoriais
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  // Get related tutorials (same category, excluding current)
  const relatedTutorials = tutorials
    .filter((t) => t.category === tutorial.category && t.id !== tutorial.id)
    .slice(0, 3);

  return (
    <main className="flex-1 bg-background">
        {/* Hero */}
        <section className="pt-28 pb-8 md:pt-32">
          <div className="container">
            <Link 
              to="/tutoriais" 
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
            >
              <ChevronLeft className="w-4 h-4" />
              Voltar aos tutoriais
            </Link>
            
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${levelColors[tutorial.level]}`}>
                  {tutorial.level}
                </span>
                <span className="text-xs text-muted-foreground">
                  {tutorial.category}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-4">
                {tutorial.title}
              </h1>
              <p className="text-lg text-muted-foreground font-light mb-6">
                {tutorial.description}
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                Duração: {tutorial.duration}
              </div>
            </div>
          </div>
        </section>

        {/* Video placeholder */}
        <section className="pb-12">
          <div className="container">
            <div className="max-w-4xl">
              <div className={`aspect-video rounded-2xl overflow-hidden bg-gradient-to-br ${tutorial.gradient} relative`}>
                {/* Pattern */}
                <div className="absolute inset-0 opacity-20">
                  <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <line x1="0" y1="20" x2="100" y2="20" stroke="white" strokeWidth="0.5" opacity="0.3" />
                    <line x1="0" y1="50" x2="100" y2="50" stroke="white" strokeWidth="0.5" opacity="0.3" />
                    <line x1="0" y1="80" x2="100" y2="80" stroke="white" strokeWidth="0.5" opacity="0.3" />
                  </svg>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-white border-b-[12px] border-b-transparent ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-lg bg-black/50 text-white text-sm flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {tutorial.duration}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Steps */}
        <section className="pb-16">
          <div className="container">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-semibold text-foreground mb-8">
                Passo a passo
              </h2>
              <div className="space-y-6">
                {tutorial.steps.map((step, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-semibold text-primary">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                      <p className="text-muted-foreground font-light mb-3">{step.description}</p>
                      {step.tip && (
                        <div className="flex gap-2 p-3 rounded-lg bg-primary/5 border border-primary/10">
                          <Lightbulb className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-foreground">
                            <span className="font-medium">Dica:</span> {step.tip}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Completion */}
        <section className="pb-16">
          <div className="container">
            <div className="max-w-3xl">
              <div className="bg-gradient-to-br from-primary/10 to-violet-500/10 rounded-2xl p-6 md:p-8 flex items-start gap-4">
                <CheckCircle2 className="w-8 h-8 text-primary flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Parabéns!
                  </h3>
                  <p className="text-muted-foreground font-light mb-4">
                    Você completou o tutorial. Agora você pode usar essa funcionalidade no seu dia a dia.
                  </p>
                  <Link to="/tutoriais">
                    <Button variant="outline" className="gap-2">
                      Ver mais tutoriais
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related tutorials */}
        {relatedTutorials.length > 0 && (
          <section className="pb-20">
            <div className="container">
              <h2 className="text-2xl font-semibold text-foreground mb-6">
                Tutoriais relacionados
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedTutorials.map((related) => (
                  <Link
                    key={related.id}
                    to={`/tutoriais/${related.slug}`}
                    className="group block"
                  >
                    <div className={`aspect-video rounded-xl overflow-hidden mb-4 bg-gradient-to-br ${related.gradient} relative`}>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-white border-b-[8px] border-b-transparent ml-0.5" />
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${levelColors[related.level]}`}>
                        {related.level}
                      </span>
                    </div>
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
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

export default TutorialPage;
