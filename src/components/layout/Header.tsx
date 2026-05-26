import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { MegaMenu } from "./MegaMenu";
import { ContentMegaMenu } from "./ContentMegaMenu";

// ─── Dados ────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { href: "/como-funciona", label: "Como Funciona" },
  { href: "/para-quem",     label: "Para Quem É"   },
  { href: "/precos",        label: "Preços"         },
  { href: "/sobre",         label: "Sobre"          },
] as const;

// ─── Hook: atraso para fechar mega menu ──────────────────────────────────────

function useDelayedClose(delay = 150) {
  const [isOpen, setIsOpen] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const open = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsOpen(true);
  };

  const close = () => {
    timerRef.current = setTimeout(() => setIsOpen(false), delay);
  };

  const cancelClose = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  return { isOpen, open, close, cancelClose };
}

// ─── Componente ───────────────────────────────────────────────────────────────

export function Header() {
  const [scrolled, setScrolled]         = useState(false);
  const [mobileOpen, setMobileOpen]     = useState(false);
  const location                        = useLocation();

  const solutions = useDelayedClose();
  const content   = useDelayedClose();

  // Fecha menus ao trocar de rota
  useEffect(() => {
    setMobileOpen(false);
    solutions.close();
    content.close();
  }, [location.pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  // Detecta scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Abre soluções e fecha conteúdo (e vice-versa)
  const openSolutions = () => { content.close(); content.cancelClose(); solutions.open(); };
  const openContent   = () => { solutions.close(); solutions.cancelClose(); content.open(); };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-section-beige">
      <div className="container">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <Logo size="lg" />

          {/* Nav desktop */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Navegação principal">

            {/* Dropdown: Soluções */}
            <div
              onMouseEnter={openSolutions}
              onMouseLeave={solutions.close}
              className="relative py-2"
            >
              <button
                aria-expanded={solutions.isOpen}
                aria-haspopup="true"
                className={cn(
                  "flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                  solutions.isOpen
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                Soluções
                <ChevronDown
                  className={cn("w-4 h-4 transition-transform duration-200", solutions.isOpen && "rotate-180")}
                  aria-hidden="true"
                />
              </button>
            </div>

            {/* Dropdown: Conteúdo */}
            <div
              onMouseEnter={openContent}
              onMouseLeave={content.close}
              className="relative py-2"
            >
              <button
                aria-expanded={content.isOpen}
                aria-haspopup="true"
                className={cn(
                  "flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                  content.isOpen
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                Conteúdo
                <ChevronDown
                  className={cn("w-4 h-4 transition-transform duration-200", content.isOpen && "rotate-180")}
                  aria-hidden="true"
                />
              </button>
            </div>

            {/* Links simples */}
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                to={href}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                  location.pathname === href
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* CTAs desktop */}
          <div className="hidden lg:flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" size="sm" className="gap-2">
                <User className="w-4 h-4" aria-hidden="true" />
                Entrar
              </Button>
            </Link>
            <Link to="/cadastro">
              <Button size="sm">Criar conta gratuita</Button>
            </Link>
          </div>

          {/* Botão menu mobile */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mega menus */}
      <MegaMenu
        isOpen={solutions.isOpen}
        onMouseEnter={() => { solutions.cancelClose(); }}
        onMouseLeave={solutions.close}
      />
      <ContentMegaMenu
        isOpen={content.isOpen}
        onMouseEnter={() => { content.cancelClose(); }}
        onMouseLeave={content.close}
      />

      {/* Menu mobile */}
      <div
        className={cn(
          "lg:hidden absolute top-full left-0 right-0 bg-section-beige border-b border-border shadow-lg transition-all duration-300",
          mobileOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
        )}
        aria-hidden={!mobileOpen}
      >
        <div className="container py-6">
          <nav className="flex flex-col gap-2" aria-label="Menu mobile">
            <Link
              to="/agentes"
              className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-muted transition-colors"
            >
              <span className="font-medium">Agentes</span>
              <ChevronDown className="w-4 h-4 -rotate-90" aria-hidden="true" />
            </Link>
            <Link
              to="/blog"
              className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-muted transition-colors"
            >
              <span className="font-medium">Conteúdo</span>
              <ChevronDown className="w-4 h-4 -rotate-90" aria-hidden="true" />
            </Link>

            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                to={href}
                className={cn(
                  "px-4 py-3 rounded-lg transition-colors",
                  location.pathname === href ? "bg-primary/10 text-primary" : "hover:bg-muted"
                )}
              >
                {label}
              </Link>
            ))}

            <div className="border-t border-border my-2" />

            <Link to="/login" className="px-4 py-3 rounded-lg hover:bg-muted transition-colors">
              Entrar
            </Link>
            <Link to="/cadastro" className="px-4 py-3 rounded-lg hover:bg-muted transition-colors">
              Criar conta
            </Link>
          </nav>

          <div className="mt-4 pt-4 border-t border-border">
            <Link to="/cadastro">
              <Button className="w-full">Criar conta gratuita</Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
