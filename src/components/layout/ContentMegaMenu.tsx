import { Link } from "react-router-dom";
import { 
  ChevronRight,
  Newspaper,
  Video,
  FileText,
  Lightbulb,
  Calendar
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ContentItem {
  title: string;
  slug: string;
  date: string;
}

interface ContentCategory {
  title: string;
  description: string;
  href: string;
  icon: React.ElementType;
  color: string;
  latestPost: ContentItem;
}

const contentCategories: ContentCategory[] = [
  {
    title: "Blog",
    description: "Dicas e novidades",
    href: "/blog",
    icon: Newspaper,
    color: "text-blue-500",
    latestPost: {
      title: "Como precificar um projeto de prestação de serviços sem errar",
      slug: "como-precificar-projeto-prestação de serviços",
      date: "20 Jan 2026",
    },
  },
  {
    title: "Tutoriais",
    description: "Aprenda a usar",
    href: "/tutoriais",
    icon: Video,
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
    icon: FileText,
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
    icon: Lightbulb,
    color: "text-amber-500",
    latestPost: {
      title: "Como a Móveis Santos cresceu 40% com automação",
      slug: "moveis-santos",
      date: "12 Jan 2026",
    },
  },
];

interface ContentMegaMenuProps {
  isOpen: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export function ContentMegaMenu({ isOpen, onMouseEnter, onMouseLeave }: ContentMegaMenuProps) {
  return (
    <div
      className={cn(
        "absolute top-full left-0 right-0 bg-section-beige border-b border-border/50 shadow-xl transition-all duration-300 z-50",
        isOpen 
          ? "opacity-100 translate-y-0 visible" 
          : "opacity-0 -translate-y-4 invisible pointer-events-none"
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="container py-6">
        <div className="grid grid-cols-4 gap-6">
          {contentCategories.map((category) => (
            <div key={category.href} className="group">
              {/* Category Header */}
              <Link
                to={category.href}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors"
              >
                <div className={cn("p-2.5 rounded-lg bg-muted group-hover:bg-background", category.color)}>
                  <category.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {category.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {category.description}
                  </p>
                </div>
              </Link>
              
              {/* Latest Post Preview */}
              <div className="mt-3 p-3 rounded-lg bg-muted/50 border border-border/50">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium mb-2">
                  Mais recente
                </p>
                <Link
                  to={`${category.href}/${category.latestPost.slug}`}
                  className="block group/post"
                >
                  <h4 className="text-sm font-medium text-foreground line-clamp-2 group-hover/post:text-primary transition-colors">
                    {category.latestPost.title}
                  </h4>
                  <div className="flex items-center gap-1.5 mt-2 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    {category.latestPost.date}
                  </div>
                </Link>
              </div>
              
              {/* View All Link */}
              <Link
                to={category.href}
                className="inline-flex items-center gap-1 mt-3 px-3 text-xs font-medium text-primary hover:underline"
              >
                Ver todos
                <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
