import { useState, useMemo } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Check, CreditCard, Loader2, Lock, Shield, Zap, ArrowLeft, ArrowRight,
  Sparkles, User, Mail, Phone, KeyRound, Star, Users, Clock, Eye, EyeOff,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";

import claraAvatar from "@/assets/avatars/ze-atendimento-v3.webp";
import chicoAvatar from "@/assets/avatars/chico-orcamento-v3.webp";
import netoAvatar from "@/assets/avatars/neto-agenda-v3.webp";
import donaContaAvatar from "@/assets/avatars/dona-conta-v3.webp";
import zecaAvatar from "@/assets/avatars/zeca-instagram-v3.webp";

// ── Preço único ────────────────────────────────────────────────────────────
const MONTHLY_PRICE  = 89.90;
const ANNUAL_TOTAL   = Math.round(MONTHLY_PRICE * 12 * 0.85 * 100) / 100; // 916.98
const MONTHLY_EQUIV  = (ANNUAL_TOTAL / 12).toFixed(2);                     // 76.42
const ANNUAL_SAVINGS = Math.round(MONTHLY_PRICE * 12 - ANNUAL_TOTAL);      // ~162
// ───────────────────────────────────────────────────────────────────────────

const STEPS = [
  { id: 1, label: "Seus dados", icon: User },
  { id: 2, label: "Pagamento", icon: CreditCard },
  { id: 3, label: "Revisão", icon: Eye },
];

const socialProofs = [
  [
    { icon: Users, text: "847 prestadores de serviço já estão usando" },
    { icon: Clock, text: "Configuração em menos de 3 minutos" },
  ],
  [
    { icon: Shield, text: "Pagamento 100% seguro e criptografado" },
    { icon: Lock, text: "Cancele quando quiser, sem multa" },
  ],
  [
    { icon: Star, text: "Avaliação média de 4.9 ★ entre usuários" },
    { icon: Zap, text: "Seus agentes ficam online na hora" },
  ],
];

const Checkout = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const { user } = useAuth();

  const isAnnual = searchParams.get("ciclo") === "annual";

  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "pix">(isAnnual ? "pix" : "card");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  // userId created during checkout (when user wasn't already logged in)
  const [checkoutUserId, setCheckoutUserId] = useState<string | null>(null);

  // Form state
  const [form, setForm] = useState({
    name: "", email: "", phone: "", password: "", confirmPassword: "",
    cardNumber: "", expiry: "", cvv: "", cardName: "",
  });

  const updateForm = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const pricing = useMemo(() => {
    if (paymentMethod === "card") {
      return {
        label: "Mensal",
        price: MONTHLY_PRICE.toFixed(2).replace(".", ","),
        period: "/mês",
        total: MONTHLY_PRICE,
        totalLabel: "Cobrado mensalmente no cartão",
        savings: 0,
      };
    }
    return {
      label: "Anual via PIX",
      price: MONTHLY_EQUIV.replace(".", ","),
      period: "/mês",
      total: ANNUAL_TOTAL,
      totalLabel: `R$ ${ANNUAL_TOTAL.toFixed(2).replace(".", ",")} cobrado anualmente`,
      savings: ANNUAL_SAVINGS,
    };
  }, [paymentMethod]);

  const canAdvance = () => {
    if (step === 1) {
      if (user) return true; // already logged in
      return !!(form.name && form.email && form.phone && form.password.length >= 6 && form.password === form.confirmPassword);
    }
    return true;
  };

  const handleNext = async () => {
    if (step === 1 && !user) {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: { data: { full_name: form.name, whatsapp: form.phone } },
      });
      setIsLoading(false);
      if (error) {
        toast({ title: "Erro ao criar conta", description: error.message, variant: "destructive" });
        return;
      }
      if (data.user) setCheckoutUserId(data.user.id);
    }
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
    const activeUserId = user?.id ?? checkoutUserId;
    const activeUserEmail = user?.email ?? form.email;

    if (!activeUserId) {
      toast({ title: "Erro", description: "Sessão expirada. Volte ao passo 1.", variant: "destructive" });
      setStep(1);
      return;
    }

    setIsLoading(true);

    const paymentType = paymentMethod === "pix" ? "annual" : "monthly";
    const siteUrl = window.location.origin;

    const { data, error } = await supabase.functions.invoke("create-checkout-session", {
      body: {
        paymentType,
        userId: activeUserId,
        userEmail: activeUserEmail,
        successUrl: `${siteUrl}/compra-sucesso?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${siteUrl}/checkout?${searchParams.toString()}`,
      },
    });

    setIsLoading(false);

    if (error || !data?.url) {
      toast({
        title: "Erro ao processar pagamento",
        description: error?.message ?? "Tente novamente em instantes.",
        variant: "destructive",
      });
      return;
    }

    window.location.href = data.url;
  };

  const progressPercent = ((step) / STEPS.length) * 100;

  return (
    <main className="flex-1 pt-24 pb-16 bg-muted/30 min-h-screen">
      <div className="container">
        <div className="max-w-5xl mx-auto">
          {/* Back link */}
          <Link
            to="/carrinho"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao carrinho
          </Link>

          {/* Mobile: Horizontal progress */}
          {isMobile && <MobileProgress step={step} progressPercent={progressPercent} />}

          <div className="flex gap-8">
            {/* Desktop: Vertical progress sidebar */}
            {!isMobile && (
              <div className="w-56 flex-shrink-0">
                <DesktopProgress step={step} />
              </div>
            )}

            {/* Main content */}
            <div className="flex-1 min-w-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                >
                  {step === 1 && (
                    <StepPersonalData
                      form={form}
                      updateForm={updateForm}
                      showPassword={showPassword}
                      setShowPassword={setShowPassword}
                      loggedInEmail={user?.email}
                      loggedInName={user?.user_metadata?.full_name}
                    />
                  )}
                  {step === 2 && (
                    <StepPayment
                      paymentMethod={paymentMethod}
                      setPaymentMethod={setPaymentMethod}
                      pricing={pricing}
                    />
                  )}
                  {step === 3 && (
                    <StepReview
                      form={form}
                      paymentMethod={paymentMethod}
                      pricing={pricing}
                    />
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Social proof */}
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                {socialProofs[step - 1].map((proof, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-xs text-muted-foreground bg-card rounded-lg px-3 py-2 border border-border/50"
                  >
                    <proof.icon className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                    <span>{proof.text}</span>
                  </div>
                ))}
              </div>

              {/* Navigation buttons */}
              <div className="flex items-center justify-between mt-8">
                <Button
                  variant="ghost"
                  onClick={handleBack}
                  disabled={step === 1}
                  className={step === 1 ? "invisible" : ""}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Voltar
                </Button>

                {step < 3 ? (
                  <Button onClick={handleNext} disabled={!canAdvance()} size="lg">
                    Continuar
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button onClick={handleSubmit} disabled={isLoading || !canAdvance()} size="lg">
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Processando...
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4 mr-2" />
                        {paymentMethod === "card"
                          ? `Assinar por R$ ${pricing.price}/mês`
                          : `Pagar R$ ${pricing.total} via PIX`}
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>

            {/* Desktop: Order summary sidebar */}
            {!isMobile && (
              <div className="w-64 flex-shrink-0">
                <OrderSummary pricing={pricing} paymentMethod={paymentMethod} />
              </div>
            )}
          </div>

          {/* Mobile: Collapsible summary */}
          {isMobile && (
            <div className="mt-8">
              <OrderSummary pricing={pricing} paymentMethod={paymentMethod} />
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

/* ─── Desktop Vertical Progress ─── */
function DesktopProgress({ step }: { step: number }) {
  return (
    <div className="sticky top-28">
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-5 top-5 bottom-5 w-0.5 bg-border" />
        <div
          className="absolute left-5 top-5 w-0.5 bg-primary transition-all duration-500"
          style={{ height: `${((step - 1) / (STEPS.length - 1)) * 100}%` }}
        />

        <div className="space-y-12 relative">
          {STEPS.map((s) => {
            const isCompleted = step > s.id;
            const isCurrent = step === s.id;
            const Icon = s.icon;

            return (
              <div key={s.id} className="flex items-center gap-4">
                <div
                  className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                    isCompleted
                      ? "bg-primary border-primary"
                      : isCurrent
                      ? "bg-primary/10 border-primary"
                      : "bg-card border-border"
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4 text-primary-foreground" />
                  ) : (
                    <Icon
                      className={`w-4 h-4 ${isCurrent ? "text-primary" : "text-muted-foreground"}`}
                    />
                  )}
                </div>
                <div>
                  <p
                    className={`text-sm font-medium ${
                      isCurrent ? "text-foreground" : isCompleted ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {s.label}
                  </p>
                  <p className="text-xs text-muted-foreground">Passo {s.id} de {STEPS.length}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ─── Mobile Horizontal Progress ─── */
function MobileProgress({ step, progressPercent }: { step: number; progressPercent: number }) {
  return (
    <div className="mb-6">
      {/* Progress bar */}
      <div className="w-full h-1.5 bg-border rounded-full overflow-hidden mb-4">
        <motion.div
          className="h-full bg-primary rounded-full"
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>
      <div className="flex justify-between">
        {STEPS.map((s) => {
          const isCompleted = step > s.id;
          const isCurrent = step === s.id;
          return (
            <div key={s.id} className="flex flex-col items-center gap-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${
                  isCompleted
                    ? "bg-primary border-primary"
                    : isCurrent
                    ? "bg-primary/10 border-primary"
                    : "bg-card border-border"
                }`}
              >
                {isCompleted ? (
                  <Check className="w-3.5 h-3.5 text-primary-foreground" />
                ) : (
                  <s.icon className={`w-3.5 h-3.5 ${isCurrent ? "text-primary" : "text-muted-foreground"}`} />
                )}
              </div>
              <span className={`text-[10px] ${isCurrent ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                {s.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Step 1: Personal Data ─── */
function StepPersonalData({
  form,
  updateForm,
  showPassword,
  setShowPassword,
  loggedInEmail,
  loggedInName,
}: {
  form: Record<string, string>;
  updateForm: (f: string, v: string) => void;
  showPassword: boolean;
  setShowPassword: (v: boolean) => void;
  loggedInEmail?: string;
  loggedInName?: string;
}) {
  if (loggedInEmail) {
    return (
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-bold text-foreground mb-1">Sua conta</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Você já está logado. Clique em "Continuar" para ir ao pagamento.
          </p>
          <div className="flex items-center gap-4 p-4 rounded-xl bg-primary/5 border border-primary/20">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div>
              {loggedInName && <p className="font-medium text-foreground">{loggedInName}</p>}
              <p className="text-sm text-muted-foreground">{loggedInEmail}</p>
            </div>
            <Check className="w-5 h-5 text-primary ml-auto" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-bold text-foreground mb-1">Crie sua conta</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Só o essencial para você começar. Leva 30 segundos.
        </p>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome completo</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="name"
                value={form.name}
                onChange={(e) => updateForm("name", e.target.value)}
                placeholder="Seu nome"
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => updateForm("email", e.target.value)}
                placeholder="seu@email.com"
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">WhatsApp</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="phone"
                type="tel"
                value={form.phone}
                onChange={(e) => updateForm("phone", e.target.value)}
                placeholder="(00) 00000-0000"
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <div className="relative">
              <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={(e) => updateForm("password", e.target.value)}
                placeholder="Mínimo 6 caracteres"
                className="pl-10 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-xs text-muted-foreground">Você usará essa senha para acessar sua conta</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirme sua senha</Label>
            <div className="relative">
              <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                value={form.confirmPassword}
                onChange={(e) => updateForm("confirmPassword", e.target.value)}
                placeholder="Repita sua senha"
                className="pl-10 pr-10"
              />
            </div>
            {form.confirmPassword && form.password !== form.confirmPassword && (
              <p className="text-xs text-destructive">As senhas não coincidem</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/* ─── Step 2: Payment ─── */
function StepPayment({
  paymentMethod,
  setPaymentMethod,
  pricing,
}: {
  paymentMethod: "card" | "pix";
  setPaymentMethod: (v: "card" | "pix") => void;
  pricing: any;
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-bold text-foreground mb-1">Como quer pagar?</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Escolha a melhor opção. Seu pagamento será processado com segurança pelo Stripe.
        </p>

        <RadioGroup
          value={paymentMethod}
          onValueChange={(v) => setPaymentMethod(v as "card" | "pix")}
        >
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div
              className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                paymentMethod === "card" ? "border-primary bg-primary/5" : "border-border"
              }`}
              onClick={() => setPaymentMethod("card")}
            >
              <RadioGroupItem value="card" id="card" />
              <CreditCard className="w-5 h-5 text-muted-foreground" />
              <div>
                <Label htmlFor="card" className="cursor-pointer font-medium">
                  Cartão
                </Label>
                <p className="text-xs text-muted-foreground">Mensal · R$ {MONTHLY_PRICE.toFixed(2).replace(".", ",")}/mês</p>
              </div>
            </div>
            <div
              className={`relative flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                paymentMethod === "pix" ? "border-primary bg-primary/5" : "border-border"
              }`}
              onClick={() => setPaymentMethod("pix")}
            >
              <RadioGroupItem value="pix" id="pix" />
              <Zap className="w-5 h-5 text-muted-foreground" />
              <div>
                <Label htmlFor="pix" className="cursor-pointer font-medium">
                  PIX
                </Label>
                <p className="text-xs text-muted-foreground">Anual · R$ {pricing.price}/mês</p>
              </div>
              <Badge className="absolute -top-2 -right-2 bg-primary text-primary-foreground border-0 text-xs">
                -15%
              </Badge>
            </div>
          </div>
        </RadioGroup>

        <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/50 border border-border/50">
          <Shield className="w-5 h-5 text-primary mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-medium text-foreground">Pagamento 100% seguro via Stripe</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {paymentMethod === "card"
                ? "Seus dados do cartão são inseridos diretamente no Stripe — não tocam nosso servidor."
                : `QR Code PIX gerado no checkout seguro. Você economiza R$ ${pricing.savings} no plano anual.`}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/* ─── Step 3: Review ─── */
function StepReview({
  form,
  paymentMethod,
  pricing,
}: {
  form: Record<string, string>;
  paymentMethod: "card" | "pix";
  pricing: any;
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-bold text-foreground mb-1">Tudo certo? Vamos lá!</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Confira os detalhes antes de confirmar.
        </p>

        {/* Account info */}
        <div className="rounded-xl bg-muted/50 p-4 mb-4">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Sua conta</p>
          <div className="space-y-1 text-sm">
            <p><span className="text-muted-foreground">Nome:</span> {form.name}</p>
            <p><span className="text-muted-foreground">E-mail:</span> {form.email}</p>
            <p><span className="text-muted-foreground">WhatsApp:</span> {form.phone}</p>
          </div>
        </div>

        {/* Plano */}
        <div className="rounded-xl bg-muted/50 p-4 mb-4">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Plano</p>
          <div className="flex items-center gap-2 text-sm">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="font-medium">MandaUmZap — 5 agentes completos</span>
          </div>
        </div>

        {/* Payment summary */}
        <div className="rounded-xl bg-muted/50 p-4">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Pagamento</p>
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-muted-foreground">
              {paymentMethod === "card" ? "Cartão · Mensal" : "PIX · Anual"}
            </span>
            <span className="font-bold text-lg text-foreground">
              R$ {pricing.price}<span className="text-sm font-normal text-muted-foreground">/mês</span>
            </span>
          </div>
          <p className="text-xs text-muted-foreground">{pricing.totalLabel}</p>
          {pricing.savings > 0 && (
            <p className="text-xs text-primary font-medium mt-1">
              Economia de R$ {pricing.savings}/ano
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

/* ─── Order Summary Sidebar ─── */
function OrderSummary({
  pricing,
  paymentMethod,
}: {
  pricing: any;
  paymentMethod: string;
}) {
  return (
    <Card className="sticky top-28">
      <CardContent className="p-5">
        <h3 className="font-bold text-sm mb-3 uppercase tracking-wider text-muted-foreground">Resumo</h3>

        <div className="flex items-center gap-2 text-sm mb-3">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="font-medium">5 agentes completos</span>
        </div>

        <Separator className="my-3" />

        <div className="space-y-1.5 text-sm mb-3">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Mensal</span>
            <span>R$ {MONTHLY_PRICE.toFixed(2).replace(".", ",")}</span>
          </div>
          {pricing.savings > 0 && (
            <div className="flex justify-between text-primary text-xs">
              <span>Desconto PIX anual</span>
              <span>- R$ {pricing.savings}</span>
            </div>
          )}
        </div>

        <Separator className="my-3" />

        <div className="flex justify-between items-baseline">
          <span className="font-semibold text-sm">Total</span>
          <div className="text-right">
            <p className="text-xl font-bold text-primary">R$ {pricing.price}</p>
            <p className="text-[10px] text-muted-foreground">{pricing.period}</p>
          </div>
        </div>
        <p className="text-[10px] text-muted-foreground mt-1">{pricing.totalLabel}</p>

        <Separator className="my-3" />

        <div className="space-y-1.5">
          {[
            { icon: Shield, text: "Pagamento seguro" },
            { icon: Check, text: "Cancele quando quiser" },
            { icon: Zap, text: "Online em minutos" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <item.icon className="w-3 h-3 text-primary flex-shrink-0" />
              {item.text}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default Checkout;
