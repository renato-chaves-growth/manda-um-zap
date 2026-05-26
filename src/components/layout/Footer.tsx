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
  ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Logo } from "./Logo";

const WHATSAPP_LINK = "https://wa.me/5500000000000?text=Olá! Quero conhecer o MandaUmZap";

const agentLinks = [
  { label: "Clara", description: "Atendimento", href: "/agente/clara", icon: MessageCircle },
  { label: "Otávio", description: "Orçamentos", href: "/agente/otavio", icon: Calculator },
  { label: "Lucas", description: "Agendamentos", href: "/agente/lucas", icon: Calendar },
  { label: "Helena", description: "Financeiro", href: "/agente/helena", icon: Wallet },
  { label: "Maya", description: "Divulgação", href: "/agente/maya", icon: Instagram },
];

const productLinks = [
  { label: "Todos os Agentes", href: "/agentes" },
  { label: "Como Funciona", href: "/como-funciona" },
  { label: "Preços", href: "/precos" },
  { label: "Para Quem É", href: "/para-quem" },
  { label: "Marketplace", href: "/marketplace" },
];

const contentLinks = [
  { label: "Blog", href: "/blog", icon: Newspaper },
  { label: "Tutoriais", href: "/tutoriais", icon: Video },
  { label: "Guias", href: "/guias", icon: FileText },
  { label: "Cases de Sucesso", href: "/cases", icon: Lightbulb },
];

const companyLinks = [
  { label: "Sobre Nós", href: "/sobre" },
  { label: "Contato", href: WHATSAPP_LINK, external: true },
];

const accountLinks = [
  { label: "Entrar", href: "/login", icon: LogIn },
  { label: "Criar conta", href: "/cadastro", icon: User },
  { label: "Minha Conta", href: "/minha-conta/perfil", icon: User },
  { label: "Carrinho", href: "/carrinho", icon: ShoppingCart },
  { label: "Checkout", href: "/checkout", icon: ShoppingCart },
  { label: "Ajuda", href: "/minha-conta/ajuda", icon: HelpCircle },
];

const legalLinks = [
  { label: "Termos de Uso", href: "/termos" },
  { label: "Política de Privacidade", href: "/privacidade" },
];

// Provocative rotating phrases for CTA
const provocativePhrases = [
  {
    question: "Contratar um atendente por R$2.500/mês",
    alternative: "ou R$29 por um agente que nunca tira férias?",
    highlight: "R$29",
  },
  {
    question: "Pagar alguém pra responder WhatsApp até 18h",
    alternative: "ou ter atendimento 24/7 por R$29?",
    highlight: "24/7",
  },
  {
    question: "Um funcionário que erra orçamentos",
    alternative: "ou uma IA que calcula certo toda vez por R$29?",
    highlight: "calcula certo",
  },
  {
    question: "Perder clientes enquanto você trabalha",
    alternative: "ou fechar mais projetos no automático?",
    highlight: "automático",
  },
  {
    question: "Social media que cobra R$1.500/mês",
    alternative: "ou posts prontos por R$29 — até no domingo à noite?",
    highlight: "domingo à noite",
  },
];

function ProvocativeCTA({ whatsappLink }: { whatsappLink: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % provocativePhrases.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const currentPhrase = provocativePhrases[currentIndex];

  return (
    <div className="container py-20 md:py-28">
      <div className="max-w-4xl mx-auto text-center">
        {/* Progress dots */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {provocativePhrases.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? "w-8 bg-whatsapp" 
                  : "w-1.5 bg-primary/20 hover:bg-primary/40"
              }`}
              aria-label={`Frase ${index + 1}`}
            />
          ))}
        </div>

        {/* Rotating provocative text */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-light text-muted-foreground leading-relaxed mb-3">
              {currentPhrase.question}
            </h3>
            <p className="text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground leading-relaxed">
              {currentPhrase.alternative.split(currentPhrase.highlight).map((part, i, arr) => (
                <span key={i}>
                  {part}
                  {i < arr.length - 1 && (
                    <span className="text-gradient font-bold">{currentPhrase.highlight}</span>
                  )}
                </span>
              ))}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Button
            asChild
            size="lg"
            className="gap-3 text-lg px-8 py-6"
          >
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Começar por R$29
              <ArrowRight className="w-5 h-5" />
            </a>
          </Button>
        </motion.div>

        {/* Trust indicators - clean inline */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-whatsapp" />
            Sem contrato
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-whatsapp" />
            Cancela quando quiser
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-whatsapp" />
            Suporte via WhatsApp
          </span>
        </div>
      </div>
    </div>
  );
}

export function Footer() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !phone) {
      toast({
        title: "Preencha todos os campos",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Cadastro realizado!",
        description: "Em breve você receberá novidades.",
      });
      setName("");
      setEmail("");
      setPhone("");
    }, 1500);
  };

  return (
    <footer className="bg-section-green text-foreground">
      {/* CTA Section - Clean & Provocative */}
      <ProvocativeCTA whatsappLink={WHATSAPP_LINK} />

      {/* Newsletter form */}
      <div className="container pb-16">
        <div className="max-w-3xl mx-auto bg-background rounded-2xl p-8 border border-border shadow-sm">
          <div className="text-center mb-6">
            <h4 className="text-xl font-bold text-foreground mb-2">Receba dicas gratuitas</h4>
            <p className="text-muted-foreground">Conteúdo exclusivo para prestadores de serviço que querem crescer</p>
          </div>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Input
              type="text"
              placeholder="Seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-muted/50 border-border"
            />
            <Input
              type="email"
              placeholder="Seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-muted/50 border-border"
            />
            <Input
              type="tel"
              placeholder="Seu telefone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="bg-muted/50 border-border"
            />
            <Button 
              type="submit" 
              disabled={isLoading}
              className="gap-2"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  Cadastrar
                  <Send className="w-4 h-4" />
                </>
              )}
            </Button>
          </form>
        </div>
      </div>

      {/* Main Footer Links - Dark section like WhatsApp */}
      <div className="bg-[#1B2B2A] text-white rounded-t-[40px] md:rounded-t-[60px]">
        <div className="container py-16">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-6">
            {/* Brand Column */}
            <div className="col-span-2 md:col-span-3 lg:col-span-1">
              <Logo size="lg" className="mb-4 brightness-0 invert" />
              <p className="text-sm text-white/60 mb-4 max-w-xs">
                Inteligência prática para quem vive de prestação de serviços.
              </p>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-whatsapp hover:text-whatsapp/80 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Fale conosco
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>

            {/* Agents Column */}
            <div>
              <h4 className="font-semibold mb-4 text-white text-sm uppercase tracking-wider">
                Agentes IA
              </h4>
              <ul className="space-y-2.5">
                {agentLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-sm text-white/60 hover:text-white transition-colors flex items-center gap-2 group"
                    >
                      <link.icon className="w-3.5 h-3.5 text-white/40 group-hover:text-white" />
                      <span>{link.label}</span>
                      <span className="text-xs text-white/30">· {link.description}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Product Column */}
            <div>
              <h4 className="font-semibold mb-4 text-white text-sm uppercase tracking-wider">
                Produto
              </h4>
              <ul className="space-y-2.5">
                {productLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-sm text-white/60 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Content Column */}
            <div>
              <h4 className="font-semibold mb-4 text-white text-sm uppercase tracking-wider">
                Conteúdo
              </h4>
              <ul className="space-y-2.5">
                {contentLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-sm text-white/60 hover:text-white transition-colors flex items-center gap-2 group"
                    >
                      <link.icon className="w-3.5 h-3.5 text-white/40 group-hover:text-white" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              
              {/* Company links under content */}
              <h4 className="font-semibold mt-6 mb-4 text-white text-sm uppercase tracking-wider">
                Empresa
              </h4>
              <ul className="space-y-2.5">
                {companyLinks.map((link) => (
                  <li key={link.href}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-white/60 hover:text-white transition-colors"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        className="text-sm text-white/60 hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Account Column */}
            <div>
              <h4 className="font-semibold mb-4 text-white text-sm uppercase tracking-wider">
                Sua Conta
              </h4>
              <ul className="space-y-2.5">
                {accountLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-sm text-white/60 hover:text-white transition-colors flex items-center gap-2"
                    >
                      {link.icon && <link.icon className="w-3.5 h-3.5" />}
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Column */}
            <div>
              <h4 className="font-semibold mb-4 text-white text-sm uppercase tracking-wider">
                Legal
              </h4>
              <ul className="space-y-2.5">
                {legalLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-sm text-white/60 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
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
                Feito com <span className="text-red-500">❤️</span> para prestadores de serviço brasileiros
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
