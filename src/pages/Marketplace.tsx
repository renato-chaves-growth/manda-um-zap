import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Send, Check, Loader2, MapPin, Clock, DollarSign, Hammer, Star, Users, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Logo } from "@/components/layout/Logo";
import claraAvatar from "@/assets/avatars/ze-atendimento-v3.webp";

const tiposProjeto = [
  "Armário/Guarda-roupa",
  "Cozinha Planejada",
  "Home Office",
  "Rack/Painel TV",
  "Banheiro",
  "Closet",
  "Outro",
];

const prazos = [
  "Urgente (até 2 semanas)",
  "1 mês",
  "2-3 meses",
  "Sem pressa",
];

const estilosOpcoes = [
  "Moderno",
  "Rústico",
  "Minimalista",
  "Clássico",
  "Industrial",
  "Sem preferência",
];

const Marketplace = () => {
  const [descricao, setDescricao] = useState("");
  const [tipo, setTipo] = useState("");
  const [prazo, setPrazo] = useState("");
  const [cidade, setCidade] = useState("");
  const [orcMin, setOrcMin] = useState("");
  const [orcMax, setOrcMax] = useState("");
  const [estilos, setEstilos] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [whatsapp, setWhatsapp] = useState("");
  const [whatsappSaved, setWhatsappSaved] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const toggleEstilo = (estilo: string) => {
    setEstilos((prev) =>
      prev.includes(estilo) ? prev.filter((e) => e !== estilo) : [...prev, estilo]
    );
  };

  const handleClaraSend = () => {
    if (!descricao.trim()) return;
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const formatWhatsapp = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    if (digits.length <= 2) return digits;
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  };

  const handleSubmit = async () => {
    if (!cidade.trim() && !tipo && !descricao.trim()) {
      toast.error("Preencha pelo menos a cidade e o tipo de projeto ou descrição.");
      return;
    }
    if (!cidade.trim()) {
      toast.error("Informe sua cidade.");
      return;
    }
    if (!tipo && !descricao.trim()) {
      toast.error("Informe o tipo de projeto ou descreva o que precisa.");
      return;
    }

    setLoading(true);
    // Simula salvamento (sem Supabase por enquanto)
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setModalOpen(true);
  };

  const resetForm = () => {
    setDescricao("");
    setTipo("");
    setPrazo("");
    setCidade("");
    setOrcMin("");
    setOrcMax("");
    setEstilos([]);
    setWhatsapp("");
    setWhatsappSaved(false);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    resetForm();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleWhatsappSubmit = async () => {
    const digits = whatsapp.replace(/\D/g, "");
    if (digits.length < 10) {
      toast.error("Informe um número de WhatsApp válido.");
      return;
    }
    // Simula update
    setWhatsappSaved(true);
    toast.success("Projeto publicado! Você receberá propostas no WhatsApp.");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 w-full border-b-2 border-foreground bg-section-beige">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/marketplace" className="flex items-center gap-2">
            <Logo />
            <span className="hidden sm:inline text-sm font-semibold text-muted-foreground">
              Marketplace
            </span>
          </Link>
          <Button variant="outline" size="sm" asChild>
            <Link to="/">Sou prestador de serviço →</Link>
          </Button>
        </div>
      </header>

      {/* HERO — identidade bege com watermark */}
      <section className="relative py-16 md:py-24 px-4 overflow-hidden bg-section-beige hero-rounded-bottom">
        {/* Watermark WhatsApp */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url('/hero-watermark.webp')`,
            backgroundSize: '800px',
            backgroundRepeat: 'repeat',
            opacity: 0.1,
            filter: 'sepia(1) saturate(0.3) brightness(0.6)',
          }}
        />
        <div className="container relative z-10 mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center max-w-4xl mx-auto">
            {/* Left — texto alinhado à esquerda */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-left"
            >
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 hover:bg-primary/10">
                Powered by Clara IA
              </Badge>
              <h1 className="text-3xl md:text-5xl font-black text-foreground mb-4 leading-tight tracking-tight">
                Encontre o prestador de serviço ideal para o seu projeto
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                Descreva o que precisa e nossa IA conecta você com os melhores prestadores de serviço da sua região
              </p>
            </motion.div>
            {/* Right — rosto da Clara */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center"
            >
              <div className="relative">
                <div className="w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-primary/20 shadow-xl">
                  <img src={claraAvatar} alt="Clara — Assistente IA" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
                  Online
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CLARA CHAT */}
      <section className="px-4 pt-12 md:pt-16 pb-8 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="border-2 border-foreground shadow-[4px_4px_0px_0px_black] overflow-hidden">
            <CardHeader className="flex flex-row items-center gap-3 pb-3 border-b border-border">
              <div className="relative">
                <div className="h-10 w-10 rounded-full overflow-hidden">
                  <img src={claraAvatar} alt="Clara" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-primary border-2 border-background" />
              </div>
              <div>
                <p className="font-semibold text-foreground text-sm">Clara</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary inline-block" />
                  online
                </p>
              </div>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              {/* Clara message bubble */}
              <div className="bg-section-green rounded-2xl rounded-tl-sm p-4 max-w-[90%]">
                <p className="text-sm text-foreground">
                  Olá! Me conta o que você precisa. Pode ser simples mesmo — tipo{" "}
                  <strong>"quero um guarda-roupa planejado"</strong> ou{" "}
                  <strong>"preciso de uma cozinha sob medida"</strong>. Eu entendo tudo e
                  encontro os prestadores de serviço certos pra você.
                </p>
              </div>
              {/* Input area */}
              <div className="relative">
                <Textarea
                  
                  placeholder="Ex: Preciso de um armário planejado para quarto de casal, estilo moderno..."
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  className="min-h-[100px] pr-12 resize-none border-2 border-foreground/20 focus:border-primary rounded-xl"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleClaraSend();
                    }
                  }}
                />
                <Button
                  size="icon"
                  className="absolute bottom-3 right-3 h-8 w-8 rounded-full"
                  onClick={handleClaraSend}
                  disabled={!descricao.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      {/* FORM */}
      <section ref={formRef} className="px-4 pb-8 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="border-2 border-foreground shadow-[4px_4px_0px_0px_black]">
            <CardHeader>
              <h2 className="text-xl font-bold text-foreground">Detalhes do projeto</h2>
              <p className="text-sm text-muted-foreground">Quanto mais detalhes, melhores propostas você recebe.</p>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* Tipo de projeto */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Hammer className="h-4 w-4 text-primary" /> Tipo de projeto
                </label>
                <Select value={tipo} onValueChange={setTipo}>
                  <SelectTrigger className="border-2 border-foreground/20">
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {tiposProjeto.map((t) => (
                      <SelectItem key={t} value={t}>{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Prazo */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" /> Prazo desejado
                </label>
                <Select value={prazo} onValueChange={setPrazo}>
                  <SelectTrigger className="border-2 border-foreground/20">
                    <SelectValue placeholder="Selecione o prazo" />
                  </SelectTrigger>
                  <SelectContent>
                    {prazos.map((p) => (
                      <SelectItem key={p} value={p}>{p}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Cidade */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" /> Cidade
                </label>
                <Input
                  placeholder="Ex: São Paulo, SP"
                  value={cidade}
                  onChange={(e) => setCidade(e.target.value)}
                  className="border-2 border-foreground/20"
                />
              </div>

              {/* Orçamento */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-primary" /> Orçamento estimado
                </label>
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="R$ mínimo"
                    type="number"
                    value={orcMin}
                    onChange={(e) => setOrcMin(e.target.value)}
                    className="border-2 border-foreground/20"
                  />
                  <span className="text-sm text-muted-foreground whitespace-nowrap">até</span>
                  <Input
                    placeholder="R$ máximo"
                    type="number"
                    value={orcMax}
                    onChange={(e) => setOrcMax(e.target.value)}
                    className="border-2 border-foreground/20"
                  />
                </div>
              </div>

              {/* Estilos */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Estilo preferido</label>
                <div className="flex flex-wrap gap-2">
                  {estilosOpcoes.map((estilo) => {
                    const selected = estilos.includes(estilo);
                    return (
                      <button
                        key={estilo}
                        type="button"
                        onClick={() => toggleEstilo(estilo)}
                        className={`
                          px-4 py-2 rounded-full text-sm font-medium border-2 transition-all
                          ${selected
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-background text-foreground border-foreground/20 hover:border-foreground/40"
                          }
                        `}
                      >
                        {selected && <Check className="h-3 w-3 inline mr-1" />}
                        {estilo}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Submit */}
              <div className="pt-4 space-y-3">
                <Button
                  className="w-full text-base"
                  size="lg"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Publicando...
                    </>
                  ) : (
                    "Publicar projeto e receber propostas"
                  )}
                </Button>
                <div className="flex items-center justify-center gap-2">
                  <Badge variant="secondary" className="text-xs bg-primary/10 text-primary border-primary/20">
                    100% grátis
                  </Badge>
                </div>
                <p className="text-xs text-center text-muted-foreground">
                  Ao publicar, prestadores de serviço qualificados da sua região serão notificados
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      {/* PROVA SOCIAL */}
      <section className="px-4 pb-16 max-w-2xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: Users, label: "prestadores de serviço ativos", value: "340+" },
            { icon: Star, label: "avaliação média", value: "4.8" },
            { icon: MessageCircle, label: "tempo médio de resposta", value: "24h" },
          ].map((stat) => (
            <Card key={stat.label} className="bg-[#1B2B2A] border-0 text-center">
              <CardContent className="pt-6 pb-6">
                <stat.icon className="h-6 w-6 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-white/70">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* MODAL WHATSAPP */}
      <Dialog open={modalOpen} onOpenChange={(open) => { if (!open) handleCloseModal(); }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {whatsappSaved ? (
                <>
                  <Check className="h-5 w-5 text-primary" /> Tudo certo!
                </>
              ) : (
                "Projeto publicado com sucesso! 🎉"
              )}
            </DialogTitle>
            <DialogDescription>
              {whatsappSaved
                ? "prestadores de serviço da sua região já foram notificados. Aguarde propostas no seu WhatsApp!"
                : "Para receber as propostas dos prestadores de serviço, informe seu WhatsApp:"}
            </DialogDescription>
          </DialogHeader>
          {!whatsappSaved && (
            <div className="space-y-4 pt-2">
              <Input
                placeholder="(11) 99999-9999"
                value={whatsapp}
                onChange={(e) => setWhatsapp(formatWhatsapp(e.target.value))}
                className="border-2 border-foreground/20 text-center text-lg"
              />
              <Button className="w-full" onClick={handleWhatsappSubmit}>
                <MessageCircle className="h-4 w-4" />
                Receber propostas no WhatsApp
              </Button>
            </div>
          )}
          {whatsappSaved && (
            <div className="pt-2">
              <Button variant="outline" className="w-full" onClick={handleCloseModal}>
                Fechar
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Marketplace;
