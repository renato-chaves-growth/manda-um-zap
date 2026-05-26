import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  MessageCircle,
  Send,
  Loader2,
  User,
  LogIn,
  ShoppingCart,
  HelpCircle,
  Calculator,
  Calendar,
  Wallet,
  Instagram,
  Newspaper,
  Video,
  FileText,
  Lightbulb,
  ArrowUpRight,
  ArrowRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Logo } from "./Logo";

// ─── Constantes ───────────────────────────────────────────────────────────────

const WHATSAPP_LINK = "https://wa.me/5500000000000?text=Olá! Quero conhecer o MandaUmZap";

// ─── Dados de navegação ───────────────────────────────────────────────────────

const AGENT_LINKS = [
  { label: "Clara",   description: "Atendimento",   href: "/agente/clara",  Icon: MessageCircle },
  { label: "Otávio",  description: "Orçamentos",    href: "/agente/otavio", Icon: Calculator    },
  { label: "Lucas",   description: "Agendamentos",  href: "/agente/lucas",  Icon: Calendar      },
  { label: "Helena",  description: "Financeiro",    href: "/agente/helena", Icon: Wallet        },
  { label: "Maya",    description: "Divulgação",    href: "/agente/maya",   Icon: Instagram     },
] as const;

const PRODUCT_LINKS = [
  { label: "Todos os Agentes", href: "/agentes"            },
  { label: "Como Funciona",    href: "/como-funciona"      },
  { label: "Preços",           href: "/precos"             },
  { label: "Para Quem É",      href: "/para-quem"          },
  { label: "Marketplace",      href: "/marketplace"        },
] as const;

const CONTENT_LINKS = [
  { label: "Blog",              href: "/blog",      Icon: Newspaper  },
  { label: "Tutoriais",         href: "/tutoriais", Icon: Video      },
  { label: "Guias",             href: "/guias",     Icon: FileText   },
  { label: "Cases de Sucesso",  href: "/cases",     Icon: Lightbulb  },
] as const;

const COMPANY_LINKS = [
  { label: "Sobre Nós",  href: "/sobre",        external: false },
  { label: "Contato",    href: WHATSAPP_LINK,   external: true  },
] as const;

const ACCOUNT_LINKS = [
  { label: "Entrar",        href: "/login",                 Icon: LogIn       },
  { label: "Criar conta",   href: "/cadastro",              Icon: User        },
  { label: "Minha Conta",   href: "/minha-conta/perfil",    Icon: User        },
  { label: "Carrinho",      href: "/carrinho",              Icon: ShoppingCart },
  { label: "Ajuda",         href: "/minha-conta/ajuda",     Icon: HelpCircle  },
] as const;

const LEGAL_LINKS = [
  { label: "Termos de Uso",           href: "/termos"      },
  { label: "Política de Privacidade", href: "/privacidade" },
] as const;

// ─── Frases provocativas ──────────────────────────────────────────────────────

const PHRASES = [
  {
    question:    "Contratar um atendente por R$2.500/mês",
    alternative: "ou R$29 por um agente que nunca tira férias?",
    highlight:   "R$29",
  },
  {
    question:    "Pagar alguém pra responder WhatsApp até 18h",
    alternative: "ou ter atendimento 24/7 por R$29?",
    highlight:   "24/7",
  },
  {
    question:    "Um funcionário que erra orçamentos",
    alternative: "ou uma IA que calcula certo toda vez por R$29?",
    highlight:   "calcula certo",
  },
  {
    question:    "Perder clientes enquanto você trabalha",
    alternative: "ou fechar mais projetos no automático?",
    highlight:   "automático",
  },
  {
    question:    "Social media que cobra R$1.500/mês",
    alternative: "ou posts prontos por R$29 — até no domingo à noite?",
    highlight:   "domingo à noite",
  },
] as const;

// ─── Sub-componente: CTA provocativo ──────────────────────────────────────────

function ProvocativeCTA() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % PHRASES.length), 8000);
    return () => clearInterval(id);
  }, []);

  const phrase = PHRASES[index];

  /** Destaca a palavra-chave dentro do texto alternativo */
  function withHighlight(text: string, keyword: string) {
    const parts = text.split(keyword);
    return parts.map((part, i) => (
      <span key={i}>
        {part}
        {i < parts.length - 1 && (
          <span className="text-gradient font-bold">{keyword}</span>
        )}
      </span>
    ));
  }

  return (
    <div className="container py-20 md:py-28">
      <div className="max-w-4xl mx-auto text-center">

        {/* Indicadores de progresso */}
        <div className="flex items-center justify-center gap-2 mb-8" role="tablist" aria-label="Frases">
          {PHRASES.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === index}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index ? "w-8 bg-primary" : "w-1.5 bg-primary/20 hover:bg-primary/40"
              }`}
              aria-label={`Frase ${i + 1}`}
            />
          ))}
        </div>

        {/* Frase rotativa */}
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-light text-muted-foreground leading-relaxed mb-3">
              {phrase.question}
            </h3>
            <p className="text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground leading-relaxed">
              {withHighlight(phrase.alternative, phrase.highlight)}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Botão CTA */}
        <Button asChild size="lg" className="gap-3 text-lg px-8 py-6 mb-8">
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
            Começar por R$29
            <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </a>
        </Button>

        {/* Selos de confiança */}
        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground list-none">
          {["Sem contrato", "Cancela quando quiser", "Suporte via WhatsApp"].map((text) => (
            <li key={text} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" aria-hidden="true" />
              {text}
            </li>
          ))}
        </ul>

      </div>
    </div>
  );
}

// ─── Sub-componente: Formulário de newsletter ─────────────────────────────────

function Newsletter() {
  const [name,    setName]    = useState("");
  const [email,   setEmail]   = useState("");
  const [phone,   setPhone]   = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      toast({ title: "Preencha todos os campos", variant: "destructive" });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({ title: "Cadastro realizado!", description: "Em breve você receberá novidades." });
      setName(""); setEmail(""); setPhone("");
    }, 1500);
  };

  return (
    <div className="container pb-16">
      <div className="max-w-3xl mx-auto bg-background rounded-2xl p-8 border border-border shadow-sm">
        <div className="text-center mb-6">
          <h4 className="text-xl font-bold text-foreground mb-2">Receba dicas gratuitas</h4>
          <p className="text-muted-foreground">
            Conteúdo exclusivo para prestadores de serviço que querem crescer
          </p>
        </div>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Input
            type="text"
            placeholder="Seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-muted/50 border-border"
            aria-label="Seu nome"
          />
          <Input
            type="email"
            placeholder="Seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-muted/50 border-border"
            aria-label="Seu e-mail"
          />
          <Input
            type="tel"
            placeholder="Seu telefone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="bg-muted/50 border-border"
            aria-label="Seu telefone"
          />
          <Button type="submit" disabled={loading} className="gap-2">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><span>Cadastrar</span><Send className="w-4 h-4" /></>}
          </Button>
        </form>
      </div>
    </div>
  );
}

// ─── Componente principal ─────────────────────────────────────────────────────

export function Footer() {
  return (
    <footer className="bg-section-green text-foreground">
      <ProvocativeCTA />
      <Newsletter />

      {/* Seção escura com links */}
      <div className="bg-[#1B2B2A] text-white rounded-t-[40px] md:rounded-t-[60px]">
        <div className="container py-16">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-6">

            {/* Marca */}
            <div className="col-span-2 md:col-span-3 lg:col-span-1">
              <Logo size="lg" inverted className="mb-4" />
              <p className="text-sm text-white/60 mb-4 max-w-xs">
                Inteligência prática para quem vive de prestação de serviços.
              </p>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-[#25D366] hover:text-[#25D366]/80 transition-colors"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                Fale conosco
                <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
              </a>
            </div>

            {/* Agentes */}
            <FooterColumn title="Agentes IA">
              {AGENT_LINKS.map(({ label, description, href, Icon }) => (
                <li key={href}>
                  <Link
                    to={href}
                    className="text-sm text-white/60 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <Icon className="w-3.5 h-3.5 text-white/40 group-hover:text-white" aria-hidden="true" />
                    <span>{label}</span>
                    <span className="text-xs text-white/30">· {description}</span>
                  </Link>
                </li>
              ))}
            </FooterColumn>

            {/* Produto */}
            <FooterColumn title="Produto">
              {PRODUCT_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link to={href} className="text-sm text-white/60 hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </FooterColumn>

            {/* Conteúdo + Empresa */}
            <div>
              <FooterHeading>Conteúdo</FooterHeading>
              <ul className="space-y-2.5 mb-6">
                {CONTENT_LINKS.map(({ label, href, Icon }) => (
                  <li key={href}>
                    <Link
                      to={href}
                      className="text-sm text-white/60 hover:text-white transition-colors flex items-center gap-2 group"
                    >
                      <Icon className="w-3.5 h-3.5 text-white/40 group-hover:text-white" aria-hidden="true" />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>

              <FooterHeading>Empresa</FooterHeading>
              <ul className="space-y-2.5">
                {COMPANY_LINKS.map(({ label, href, external }) => (
                  <li key={href}>
                    {external ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-white/60 hover:text-white transition-colors"
                      >
                        {label}
                      </a>
                    ) : (
                      <Link to={href} className="text-sm text-white/60 hover:text-white transition-colors">
                        {label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Sua Conta */}
            <FooterColumn title="Sua Conta">
              {ACCOUNT_LINKS.map(({ label, href, Icon }) => (
                <li key={href}>
                  <Link to={href} className="text-sm text-white/60 hover:text-white transition-colors flex items-center gap-2">
                    <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                    {label}
                  </Link>
                </li>
              ))}
            </FooterColumn>

            {/* Legal */}
            <FooterColumn title="Legal">
              {LEGAL_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link to={href} className="text-sm text-white/60 hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </FooterColumn>

          </div>
        </div>

        {/* Rodapé inferior */}
        <div className="container py-6 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-white/50">
              © {new Date().getFullYear()} MandaUmZap — Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-4">
              <Link to="/admin" className="text-xs text-white/30 hover:text-white/60 transition-colors">
                Admin
              </Link>
              <span className="text-sm text-white/50">
                Feito com <span className="text-red-400" aria-label="amor">❤️</span> para prestadores de serviço brasileiros
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Helpers internos ─────────────────────────────────────────────────────────

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="font-semibold mb-4 text-white text-sm uppercase tracking-wider">
      {children}
    </h4>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <FooterHeading>{title}</FooterHeading>
      <ul className="space-y-2.5">{children}</ul>
    </div>
  );
}
