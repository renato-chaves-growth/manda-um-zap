import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, MessageCircle, ChevronDown, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MegaMenu } from "./MegaMenu";
import { ContentMegaMenu } from "./ContentMegaMenu";
import { Logo } from "./Logo";

const WHATSAPP_LINK = "https://wa.me/5500000000000?text=Olá! Quero conhecer o MandaUmZap";

const navLinks = [
  { href: "/como-funciona", label: "Como Funciona" },
  { href: "/para-quem", label: "Para Quem É" },
  { href: "/precos", label: "Preços" },
  { href: "/sobre", label: "Sobre" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSolutionMenuOpen, setIsSolutionMenuOpen] = useState(false);
  const [isContentMenuOpen, setIsContentMenuOpen] = useState(false);
  const location = useLocation();
  const solutionMenuTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const contentMenuTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSolutionMenuOpen(false);
    setIsContentMenuOpen(false);
  }, [location.pathname]);

  const handleSolutionMenuEnter = () => {
    if (solutionMenuTimeoutRef.current) {
      clearTimeout(solutionMenuTimeoutRef.current);
      solutionMenuTimeoutRef.current = null;
    }
    setIsContentMenuOpen(false);
    setIsSolutionMenuOpen(true);
  };

  const handleSolutionMenuLeave = () => {
    solutionMenuTimeoutRef.current = setTimeout(() => {
      setIsSolutionMenuOpen(false);
    }, 150);
  };

  const handleContentMenuEnter = () => {
    if (contentMenuTimeoutRef.current) {
      clearTimeout(contentMenuTimeoutRef.current);
      contentMenuTimeoutRef.current = null;
    }
    setIsSolutionMenuOpen(false);
    setIsContentMenuOpen(true);
  };

  const handleContentMenuLeave = () => {
    contentMenuTimeoutRef.current = setTimeout(() => {
      setIsContentMenuOpen(false);
    }, 150);
  };

  // Check if any mega menu is open
  const isAnyMenuOpen = isSolutionMenuOpen || isContentMenuOpen;

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-section-beige"
    >
      <div className="container">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Logo size="lg" />

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {/* Soluções Mega Menu Trigger */}
            <div
              onMouseEnter={handleSolutionMenuEnter}
              onMouseLeave={handleSolutionMenuLeave}
              className="relative py-2"
            >
              <button
                className={cn(
                  "flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                  isSolutionMenuOpen
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                Soluções
                <ChevronDown className={cn("w-4 h-4 transition-transform", isSolutionMenuOpen && "rotate-180")} />
              </button>
              {isSolutionMenuOpen && (
                <div className="absolute top-full left-0 right-0 h-4" />
              )}
            </div>

            {/* Conteúdo Mega Menu Trigger */}
            <div
              onMouseEnter={handleContentMenuEnter}
              onMouseLeave={handleContentMenuLeave}
              className="relative py-2"
            >
              <button
                className={cn(
                  "flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                  isContentMenuOpen
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                Conteúdo
                <ChevronDown className={cn("w-4 h-4 transition-transform", isContentMenuOpen && "rotate-180")} />
              </button>
              {isContentMenuOpen && (
                <div className="absolute top-full left-0 right-0 h-4" />
              )}
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                  location.pathname === link.href
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" size="sm" className="gap-2">
                <User className="w-4 h-4" />
                Entrar
              </Button>
            </Link>
            <Link to="/cadastro">
              <Button className="gap-2">
                Criar conta gratuita
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Soluções Mega Menu */}
      <MegaMenu
        isOpen={isSolutionMenuOpen}
        onMouseEnter={handleSolutionMenuEnter}
        onMouseLeave={handleSolutionMenuLeave}
      />

      {/* Conteúdo Mega Menu */}
      <ContentMegaMenu
        isOpen={isContentMenuOpen}
        onMouseEnter={handleContentMenuEnter}
        onMouseLeave={handleContentMenuLeave}
      />

      {/* Mobile Menu */}
      <div
        className={cn(
          "lg:hidden absolute top-full left-0 right-0 bg-section-beige border-b border-border shadow-lg transition-all duration-300",
          isMobileMenuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        )}
      >
        <div className="container py-6">
          <nav className="flex flex-col gap-2">
            <Link
              to="/agentes"
              className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-muted transition-colors"
            >
              <span className="font-medium">Agentes</span>
              <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
            </Link>
            <Link
              to="/blog"
              className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-muted transition-colors"
            >
              <span className="font-medium">Conteúdo</span>
              <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
            </Link>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "px-4 py-3 rounded-lg transition-colors",
                  location.pathname === link.href
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-muted"
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-border my-2" />
            <Link
              to="/login"
              className="px-4 py-3 rounded-lg hover:bg-muted transition-colors"
            >
              Entrar
            </Link>
            <Link
              to="/cadastro"
              className="px-4 py-3 rounded-lg hover:bg-muted transition-colors"
            >
              Criar conta
            </Link>
          </nav>
          <div className="mt-4 pt-4 border-t border-border">
            <Link to="/cadastro">
              <Button className="w-full gap-2">
                Criar conta gratuita
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
