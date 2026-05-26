import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Check,
  ArrowRight,
  Star,
  ChevronLeft,
  Sparkles,
  ShoppingCart,
  Users,
  Play,
  ChevronDown,
  Quote,
  MessageCircle,
  Calculator,
  Calendar,
  Wallet,
  Instagram,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Avatar imports
import claraAvatar from "@/assets/avatars/ze-atendimento-v3.webp";
import chicoAvatar from "@/assets/avatars/chico-orcamento-v3.webp";
import netoAvatar from "@/assets/avatars/neto-agenda-v3.webp";
import donaContaAvatar from "@/assets/avatars/dona-conta-v3.webp";
import zecaAvatar from "@/assets/avatars/zeca-instagram-v3.webp";

const agents = [
  { id: "clara", name: "Clara", role: "Atendimento", avatar: claraAvatar, icon: MessageCircle, color: "#1DB954" },
  { id: "otavio", name: "Otávio", role: "Orçamento", avatar: chicoAvatar, icon: Calculator, color: "#0D9488" },
  { id: "lucas", name: "Lucas", role: "Agendamento", avatar: netoAvatar, icon: Calendar, color: "#84CC16" },
  { id: "helena", name: "Helena", role: "Financeiro", avatar: donaContaAvatar, icon: Wallet, color: "#059669" },
  { id: "maya", name: "Maya", role: "Divulgação", avatar: zecaAvatar, icon: Instagram, color: "#65A30D" },
];

const detailedFeatures = [
  { title: "Atendimento 24h", description: "Clara responde seus clientes instantaneamente, filtra curiosos e coleta briefing completo." },
  { title: "Orçamento em Minutos", description: "Otávio calcula materiais, aplica sua margem e gera PDF profissional automaticamente." },
  { title: "Agenda Inteligente", description: "Lucas agenda visitas, envia lembretes e confirma presença sem você fazer nada." },
  { title: "Financeiro Simples", description: "Helena registra pagamentos, controla saldos e mostra seu lucro real por projeto." },
  { title: "Marketing Fácil", description: "Maya cria legendas, sugere hashtags e dá ideias de conteúdo para suas redes." },
  { title: "Tudo Conectado", description: "Os agentes conversam entre si. Clara passa o briefing pro Otávio, que gera o orçamento pro Lucas agendar." },
];

const howItWorks = [
  { step: "1", title: "Cliente manda mensagem no WhatsApp", description: "A Clara responde na hora, entende o pedido e faz as perguntas certas sobre o projeto." },
  { step: "2", title: "Orçamento gerado automaticamente", description: "O Otávio recebe o briefing da Clara, calcula materiais e gera um PDF profissional com sua margem." },
  { step: "3", title: "Helena registra o fechamento", description: "Quando o cliente aprova, Helena já registra valores e condições de pagamento." },
  { step: "4", title: "Clara confirma e Lucas agenda", description: "Clara avisa o cliente e Lucas agenda a visita técnica no melhor horário, com lembretes automáticos." },
];

const JornadaIntegrada = () => {
  const navigate = useNavigate();
  const [expandedStep, setExpandedStep] = useState<number | null>(0);

  return (
    <main className="flex-1 pt-20 md:pt-24 bg-background">
      {/* Breadcrumb */}
      <div className="container py-4">
        <Link
          to="/agentes"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
        >
          <ChevronLeft className="w-4 h-4" />
          Voltar para todos os agentes
        </Link>
      </div>

      {/* Hero Section */}
      <section className="py-8 md:py-12">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            {/* Left - Agents Grid */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center lg:justify-start"
            >
              <div className="relative">
                {/* Agents arranged in a pattern */}
                <div className="grid grid-cols-3 gap-3 w-72 md:w-80 lg:w-96">
                  {agents.slice(0, 3).map((agent) => (
                    <div key={agent.id} className="w-full aspect-square rounded-2xl overflow-hidden border-2 border-background shadow-lg">
                      <img src={agent.avatar} alt={agent.name} className="w-full h-full object-cover object-top" />
                    </div>
                  ))}
                  <div className="col-span-3 grid grid-cols-2 gap-3">
                    {agents.slice(3).map((agent) => (
                      <div key={agent.id} className="w-full aspect-[4/3] rounded-2xl overflow-hidden border-2 border-background shadow-lg">
                        <img src={agent.avatar} alt={agent.name} className="w-full h-full object-cover object-top" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Badge */}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-amber-500 text-white border-0 shadow-lg gap-1.5 px-4 py-1.5">
                    <Sparkles className="w-3 h-3" />
                    5 agentes trabalhando juntos
                  </Badge>
                </div>
              </div>
            </motion.div>

            {/* Right - Info & Pricing */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-6"
            >
              <div>
                <Badge variant="secondary" className="mb-3">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Produto Principal
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
                  Jornada Integrada
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground font-light mb-4">
                  Todos os agentes conectados numa única equipe de IA.
                </p>
                <p className="text-base text-muted-foreground/80 leading-relaxed">
                  Do primeiro contato do cliente até o pós-venda, a Jornada Integrada cuida de tudo automaticamente. 
                  Clara atende, Otávio orçamenta, Helena controla o financeiro, Lucas agenda e Maya divulga — tudo conectado, sem retrabalho.
                </p>
              </div>

              {/* Agents row */}
              <div className="flex flex-wrap gap-3">
                {agents.map((agent) => (
                  <Link
                    key={agent.id}
                    to={`/agente/${agent.id}`}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border/50 bg-card hover:border-primary/50 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full overflow-hidden">
                      <img src={agent.avatar} alt={agent.name} className="w-full h-full object-cover object-top" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{agent.name}</p>
                      <p className="text-xs text-muted-foreground">{agent.role}</p>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Social Proof */}
              <div className="flex items-center gap-4 py-4 border-y border-border/50">
                <div className="flex -space-x-2">
                  {agents.map((a) => (
                    <div key={a.id} className="w-8 h-8 rounded-full overflow-hidden border-2 border-background">
                      <img src={a.avatar} alt={a.name} className="w-full h-full object-cover object-top" />
                    </div>
                  ))}
                </div>
                <div className="text-sm">
                  <span className="font-semibold text-foreground">+1.200 prestadores de serviço</span>
                  <span className="text-muted-foreground"> já usam</span>
                </div>
                <div className="flex items-center gap-1 ml-auto">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="font-semibold">4.9</span>
                </div>
              </div>

              {/* Pricing Card */}
              <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
                <CardContent className="p-6">
                  <div className="flex items-baseline justify-between mb-4">
                    <div>
                      <span className="text-sm text-muted-foreground">Todos os 5 agentes por</span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-sm text-muted-foreground line-through">R$ 195</span>
                        <span className="text-4xl font-bold text-foreground">R$ 129</span>
                        <span className="text-muted-foreground">/mês</span>
                      </div>
                    </div>
                    <Badge className="bg-green-500/10 text-green-600 border-0">
                      Economia de R$ 66
                    </Badge>
                  </div>

                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-green-500" />
                      <span>Sem contrato, cancele quando quiser</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-green-500" />
                      <span>Configuração em minutos</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-green-500" />
                      <span>Suporte via WhatsApp</span>
                    </div>
                  </div>

                  <Button size="lg" className="w-full gap-2 h-12" onClick={() => navigate("/carrinho?jornada=true")}>
                    <ShoppingCart className="w-5 h-5" />
                    Quero começar
                    <ArrowRight className="w-4 h-4" />
                  </Button>

                  <p className="text-center text-xs text-muted-foreground mt-3">
                    ou <Link to="/agentes" className="text-primary font-medium hover:underline">escolha agentes individuais</Link>
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
              O que sua equipe de IA faz por você
            </h2>
            <p className="text-lg text-muted-foreground">
              5 agentes especializados, todos conectados
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {detailedFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full border-border/50 hover:shadow-lg hover:border-primary/30 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <Check className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 md:py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
              Como funciona na prática
            </h2>
            <p className="text-lg text-muted-foreground">
              Veja como os agentes trabalham juntos pela sua prestação de serviços
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              {howItWorks.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <button
                    onClick={() => setExpandedStep(expandedStep === index ? null : index)}
                    className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-300 ${
                      expandedStep === index
                        ? 'border-primary bg-primary/5 shadow-lg'
                        : 'border-border bg-card hover:border-primary/50 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold transition-colors ${
                        expandedStep === index
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {step.step}
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-semibold text-lg ${
                          expandedStep === index ? 'text-primary' : 'text-foreground'
                        }`}>
                          {step.title}
                        </h3>
                        {expandedStep !== index && (
                          <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                            {step.description}
                          </p>
                        )}
                      </div>
                      <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${
                        expandedStep === index ? 'rotate-180' : ''
                      }`} />
                    </div>

                    <AnimatePresence>
                      {expandedStep === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <p className="text-muted-foreground mt-4 pl-16">
                            {step.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mt-8"
            >
              <Button variant="outline" size="lg" className="gap-2">
                <Play className="w-4 h-4" />
                Ver demonstração
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <Card className="border-border/50 shadow-xl overflow-hidden">
              <CardContent className="p-8 md:p-12">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <Quote className="w-10 h-10 text-primary/20 mb-4" />

                <p className="text-xl md:text-2xl text-foreground mb-8 italic font-light leading-relaxed">
                  "Antes eu fazia tudo sozinho — responder cliente, fazer orçamento, cobrar, agendar visita. Agora tenho uma equipe inteira que trabalha 24h. Meu faturamento aumentou 40% em 3 meses."
                </p>

                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-lg text-foreground">Roberto Silva</p>
                    <p className="text-muted-foreground">prestador de serviço em São Paulo</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Pronto para ter sua equipe completa de IA?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Configuração em minutos. Sem contrato. Cancele quando quiser.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2 h-12" onClick={() => navigate("/carrinho?jornada=true")}>
                Quero começar
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Link to="/agentes">
                <Button size="lg" variant="outline" className="gap-2 h-12 w-full">
                  Ver agentes individuais
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default JornadaIntegrada;
