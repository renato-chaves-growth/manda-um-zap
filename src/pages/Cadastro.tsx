import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Lock, User, Phone, Mail, Loader2, ArrowRight, Star, Zap, CalendarCheck, DollarSign, Headphones } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";

const valueBlocks = [
  { icon: Headphones, emoji: "🟢", title: "Funcionários que não descansam", description: "Seu atendimento responde na hora, mesmo quando você está ocupado." },
  { icon: Zap, emoji: "📐", title: "Orçamento mais inteligente", description: "Compare preços e negocie melhor com seus fornecedores." },
  { icon: CalendarCheck, emoji: "📅", title: "Agenda sem furos", description: "Confirmação automática de visitas e lembretes." },
  { icon: DollarSign, emoji: "💰", title: "Dinheiro na ponta do lápis", description: "Saiba quanto está ganhando de verdade." },
];

const testimonials = [
  "Agora eu respondo cliente na hora.",
  "Já economizei no primeiro orçamento.",
  "Não perdi mais visita.",
];

const Cadastro = () => {
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !whatsapp.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      toast({ title: "Preencha todos os campos", variant: "destructive" });
      return;
    }

    if (password.length < 6) {
      toast({ title: "Senha muito curta", description: "Mínimo 6 caracteres.", variant: "destructive" });
      return;
    }

    if (password !== confirmPassword) {
      toast({ title: "Senhas não conferem", description: "A confirmação de senha deve ser igual à senha.", variant: "destructive" });
      return;
    }

    setIsLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
          whatsapp,
        },
      },
    });

    setIsLoading(false);

    if (error) {
      toast({
        title: "Erro ao criar conta",
        description: error.message === "User already registered"
          ? "Já existe uma conta com esse e-mail."
          : error.message,
        variant: "destructive",
      });
      return;
    }

    navigate("/cadastro-sucesso");
  };

  const handleGoogleSignup = async () => {
    setIsGoogleLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/minha-conta` },
    });
    if (error) {
      setIsGoogleLoading(false);
      toast({ title: "Erro ao entrar com Google", description: error.message, variant: "destructive" });
    }
  };

  return (
    <main className="flex-1 pt-20 md:pt-24 bg-background">
      <section className="py-12 md:py-16 bg-[#E8F5E9]">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center lg:text-left lg:pt-8"
            >
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-4 leading-tight">
                Seu time digital
                <br />
                <span style={{ background: "linear-gradient(135deg, #075E54, #25D366)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  começa agora.
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-4">
                Atendimento, orçamento, agenda e financeiro organizados para sua prestação de serviços — direto pelo WhatsApp.
              </p>
              <p className="text-sm text-muted-foreground/80">
                Sem sistema complicado. Sem curva de aprendizado.<br />
                Você cria a conta agora e finaliza pelo WhatsApp em 3 minutos.
              </p>
              <div className="hidden lg:grid grid-cols-2 gap-4 mt-8">
                {valueBlocks.map((block, index) => (
                  <div key={index} className="flex items-start gap-3 text-left">
                    <span className="text-xl mt-0.5">{block.emoji}</span>
                    <div>
                      <h3 className="font-semibold text-foreground text-sm">{block.title}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">{block.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="bg-card rounded-2xl border border-border shadow-xl p-6 md:p-8">
                <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6 text-center">
                  Crie sua conta gratuita
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input id="name" type="text" placeholder="Seu nome" value={name} onChange={(e) => setName(e.target.value)} className="pl-10" required maxLength={100} />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="whatsapp">WhatsApp</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input id="whatsapp" type="tel" placeholder="(00) 00000-0000" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} className="pl-10" required maxLength={20} />
                    </div>
                    <p className="text-xs text-muted-foreground pl-1">Esse será o número onde seus clientes vão falar com sua prestação de serviços.</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input id="email" type="email" placeholder="seu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10" required maxLength={255} autoComplete="email" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Senha</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input id="password" type={showPassword ? "text" : "password"} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10 pr-10" required minLength={6} autoComplete="new-password" />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmar senha</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className={`pl-10 pr-10 ${confirmPassword && password !== confirmPassword ? "border-red-400 focus-visible:ring-red-400" : confirmPassword && password === confirmPassword ? "border-green-500 focus-visible:ring-green-500" : ""}`}
                        required
                        minLength={6}
                        autoComplete="new-password"
                      />
                      <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {confirmPassword && password !== confirmPassword && (
                      <p className="text-xs text-red-500">Senhas não conferem</p>
                    )}
                    {confirmPassword && password === confirmPassword && (
                      <p className="text-xs text-green-600">✓ Senhas conferem</p>
                    )}
                  </div>

                  <Button
                    variant="outline"
                    className="w-full gap-2"
                    type="button"
                    onClick={handleGoogleSignup}
                    disabled={isGoogleLoading}
                  >
                    {isGoogleLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                      <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                      </svg>
                    )}
                    Entrar com Google
                  </Button>

                  <p className="text-center text-xs text-muted-foreground flex items-center justify-center gap-1">
                    <Lock className="w-3 h-3" />
                    Seus dados estão seguros.
                  </p>

                  <Button type="submit" size="lg" className="w-full gap-2 h-12 text-base" disabled={isLoading}>
                    {isLoading ? (
                      <><Loader2 className="w-4 h-4 animate-spin" />Criando conta...</>
                    ) : (
                      <>Criar conta gratuita<ArrowRight className="w-4 h-4" /></>
                    )}
                  </Button>
                </form>

                <p className="text-center text-sm text-muted-foreground mt-4">
                  Mais duas informações e já podemos começar.<br />
                  <span className="font-medium text-foreground">Sua prestação de serviços vai decolar. 🚀</span>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-muted/30 lg:hidden">
        <div className="container">
          <div className="grid sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {valueBlocks.map((block, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="bg-card rounded-2xl p-6 border border-border/50 text-center">
                <span className="text-2xl mb-3 block">{block.emoji}</span>
                <h3 className="font-semibold text-foreground mb-2 text-sm">{block.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{block.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto text-center">
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-8">
              prestadores de serviço já estão organizando suas prestação de serviçoss com IA.
            </h2>
            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              {testimonials.map((text, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="bg-card rounded-xl p-5 border border-border/50">
                  <div className="flex gap-0.5 justify-center mb-3">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />)}
                  </div>
                  <p className="text-sm text-foreground italic">"{text}"</p>
                </motion.div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">Teste grátis. Sem compromisso.</p>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Cadastro;
