import { Link } from "react-router-dom";
import { ChevronRight, Newspaper, Video, FileText, Lightbulb, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Tipos ────────────────────────────────────────────────────────────────────

interface ContentCategory {
  title: string;
  description: string;
  href: string;
  Icon: React.ElementType;
  color: string;
  latestPost: {
    title: string;
    slug: string;
    date: string;
  };
}

// ─── Dados ────────────────────────────────────────────────────────────────────

const CATEGORIES: ContentCategory[] = [
  {
    title: "Blog",
    description: "Dicas e novidades",
    href: "/blog",
    Icon: Newspaper,
    color: "text-blue-500",
    latestPost: {
      title: "Como precificar um projeto de prestação de serviços sem errar",
      slug: "como-precificar-projeto-prestacao-de-servicos",
      date: "20 Jan 2026",
    },
  },
  {
    title: "Tutoriais",
    description: "Aprenda a usar",
    href: "/tutoriais",
    Icon: Video,
    color: "text-indigo-500",
    latestPost: {
      title: "Primeiros passos com a Clara (Atendimento)",
      slug: "primeiros-passos-clara",
      date: "18 Jan 2026",
    },
  },
  {
    title: "Guias",
    description: "Materiais práticos",
    href: "/guias",
    Icon: FileText,
    color: "text-violet-500",
    latestPost: {
      title: "Checklist: 10 passos para precificar corretamente",
      slug: "checklist-precificacao",
      date: "15 Jan 2026",
    },
  },
  {
    title: "Cases",
    description: "Histórias de sucesso",
    href: "/cases",
    Icon: Lightbulb,
    color: "text-amber-500",
    latestPost: {
      title: "Como a Móveis Santos cresceu 40% com automação",
      slug: "moveis-santos",
      date: "12 Jan 2026",
    },
  },
];

// ─── Componente ───────────────────────────────────────────────────────────────

interface ContentMegaMenuProps {
  isOpen: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export function ContentMegaMenu({ isOpen, onMouseEnter, onMouseLeave }: ContentMegaMenuProps) {
  return (
    <div
      role="region"
      aria-label="Menu de conteúdo"
      className={cn(
        "absolute top-full left-0 right-0 bg-section-beige border-b border-border/50 shadow-xl z-50 transition-all duration-300",
        isOpen ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-4 invisible pointer-events-none"
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="container py-6">
        <div className="grid grid-cols-4 gap-6">
          {CATEGORIES.map(({ title, description, href, Icon, color, latestPost }) => (
            <div key={href} className="group">

              {/* Cabeçalho da categoria */}
              <Link
                to={href}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors"
              >
                <span className={cn("p-2.5 rounded-lg bg-muted group-hover:bg-background", color)}>
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block font-semibold text-foreground group-hover:text-primary transition-colors">
                    {title}
                  </span>
                  <span className="text-xs text-muted-foreground">{description}</span>
                </span>
              </Link>

              {/* Post mais recente */}
              <div className="mt-3 p-3 rounded-lg bg-muted/50 border border-border/50">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium mb-2">
                  Mais recente
                </p>
                <Link
                  to={`${href}/${latestPost.slug}`}
                  className="block group/post"
                >
                  <h4 className="text-sm font-medium text-foreground line-clamp-2 group-hover/post:text-primary transition-colors">
                    {latestPost.title}
                  </h4>
                  <div className="flex items-center gap-1.5 mt-2 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" aria-hidden="true" />
                    {latestPost.date}
                  </div>
                </Link>
              </div>

              {/* Ver todos */}
              <Link
                to={href}
                className="inline-flex items-center gap-1 mt-3 px-3 text-xs font-medium text-primary hover:underline"
              >
                Ver todos
                <ChevronRight className="w-3 h-3" aria-hidden="true" />
              </Link>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
