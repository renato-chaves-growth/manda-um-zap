import { Link } from "react-router-dom";
import { ChevronRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BlogPlaceholder } from "./BlogPlaceholder";

// ─── Tipos ────────────────────────────────────────────────────────────────────

type BlogCategory = "Orçamento" | "Atendimento" | "Tecnologia";

interface BlogPost {
  id:       number;
  slug:     string;
  title:    string;
  excerpt:  string;
  date:     string;
  category: BlogCategory;
}

// ─── Dados ────────────────────────────────────────────────────────────────────

/**
 * IMPORTANTE: slugs devem ser URL-safe — sem espaços ou caracteres especiais.
 */
const BLOG_POSTS: BlogPost[] = [
  {
    id:       1,
    slug:     "como-precificar-projeto-prestacao-de-servicos",
    title:    "Como precificar um projeto de prestação de serviços sem errar",
    excerpt:  "Aprenda a calcular custos, margem e tempo de forma simples e profissional.",
    date:     "20 Jan 2026",
    category: "Orçamento",
  },
  {
    id:       2,
    slug:     "whatsapp-para-prestadores-de-servico",
    title:    "WhatsApp para prestadores de serviço: como usar sem perder tempo",
    excerpt:  "Dicas práticas para atender clientes pelo WhatsApp de forma organizada.",
    date:     "15 Jan 2026",
    category: "Atendimento",
  },
  {
    id:       3,
    slug:     "inteligencia-artificial-prestacao-de-servicos",
    title:    "Inteligência artificial na prestação de serviços: o que já é possível",
    excerpt:  "Descubra como a IA pode ajudar no dia a dia da sua prestação de serviços.",
    date:     "10 Jan 2026",
    category: "Tecnologia",
  },
] as const;

// ─── Componente ───────────────────────────────────────────────────────────────

/**
 * BlogSection — 3 artigos recentes do blog com thumbnail, categoria e data.
 */
export function BlogSection() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden" aria-labelledby="blog-heading">
      {/* Blob de fundo */}
      <div
        className="bg-blob bg-blob-2"
        style={{ top: "50%", transform: "translateY(-50%)" }}
        aria-hidden="true"
      />

      <div className="container relative z-10">
        {/* Cabeçalho */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <h2
              id="blog-heading"
              className="text-2xl md:text-3xl lg:text-4xl font-light text-foreground mb-2"
            >
              Blog <span className="text-gradient font-bold">MandaUmZap</span>
            </h2>
            <p className="text-muted-foreground font-light">
              Dicas práticas para sua prestação de serviços crescer
            </p>
          </div>

          <Link to="/blog">
            <Button variant="ghost" className="gap-2 text-primary hover:text-primary/80">
              Ver todos os artigos
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </Button>
          </Link>
        </div>

        {/* Grid de posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BLOG_POSTS.map((post) => (
            <Card
              key={post.id}
              className="group overflow-hidden brutalist-box brutalist-hover-lg rounded-3xl bg-card"
            >
              {/* Thumbnail */}
              <div className="aspect-[4/3] overflow-hidden">
                <BlogPlaceholder
                  category={post.category}
                  className="transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <CardContent className="p-5">
                {/* Categoria + data */}
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" aria-hidden="true" />
                    <time dateTime={post.date}>{post.date}</time>
                  </div>
                </div>

                {/* Título */}
                <h3 className="font-semibold text-lg text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>

                {/* Resumo */}
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4 font-light">
                  {post.excerpt}
                </p>

                <Link
                  to={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:gap-2 transition-all"
                  aria-label={`Ler artigo: ${post.title}`}
                >
                  Ler mais
                  <ChevronRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
