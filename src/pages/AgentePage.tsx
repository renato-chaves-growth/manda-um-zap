import { useState, useMemo, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
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
  MessageCircle,
  Quote,
  Users,
  Play,
  ChevronDown
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Avatar imports
import claraAvatar from "@/assets/avatars/ze-atendimento-v3.webp";
import chicoAvatar from "@/assets/avatars/chico-orcamento-v3.webp";
import netoAvatar from "@/assets/avatars/neto-agenda-v3.webp";
import donaContaAvatar from "@/assets/avatars/dona-conta-v3.webp";
import zecaAvatar from "@/assets/avatars/zeca-instagram-v3.webp";

// Types
interface AgentDetail {
  id: string;
  name: string;
  shortName: string;
  role: string;
  avatar: string;
  shortDescription: string;
  longDescription: string;
  detailedFeatures: { title: string; description: string }[];
  benefits: string[];
  howItWorks: { step: string; title: string; description: string }[];
  testimonial: {
    text: string;
    author: string;
    role: string;
    rating: number;
  };
  stats: { label: string; value: string }[];
}

// Agent Data
const agentsData: Record<string, AgentDetail> = {
  clara: {
    id: "clara",
    name: "Clara",
    shortName: "Clara",
    role: "Agente de Atendimento",
    avatar: claraAvatar,
    shortDescription: "Sua assistente 24h que nunca deixa cliente esperando.",
    longDescription: "A Clara é o primeiro contato do cliente com a sua prestação de serviços. Ela responde mensagens instantaneamente, entende pedidos por áudio ou texto, faz perguntas estratégicas sobre o projeto e filtra curiosos de clientes reais.",
    detailedFeatures: [
      { title: "Resposta Instantânea", description: "Responde em menos de 30 segundos, mesmo de madrugada ou fim de semana." },
      { title: "Entendimento de Áudio", description: "Processa áudios do WhatsApp e responde como se fosse você." },
      { title: "Qualificação de Leads", description: "Identifica clientes sérios e filtra quem só está olhando." },
      { title: "Coleta de Briefing", description: "Faz as perguntas certas para você já receber o pedido organizado." },
    ],
    benefits: [
      "Nunca mais perca cliente por demora",
      "Atenda 10x mais sem contratar ninguém",
      "Tenha tempo para focar na produção",
      "Impressione clientes com atendimento profissional",
    ],
    howItWorks: [
      { step: "1", title: "Cliente manda mensagem", description: "Pelo WhatsApp, a qualquer hora do dia ou da noite" },
      { step: "2", title: "Clara responde na hora", description: "Em menos de 30 segundos, com cordialidade e profissionalismo" },
      { step: "3", title: "Ela coleta as informações", description: "Faz as perguntas certas sobre o projeto do cliente" },
      { step: "4", title: "Você recebe o briefing pronto", description: "Só aparece pra fechar negócio quando o lead está qualificado" },
    ],
    testimonial: {
      text: "A Clara salvou minha prestação de serviços. Antes eu perdia cliente por não conseguir responder rápido. Agora ela responde na hora e eu só apareço para fechar!",
      author: "Roberto Silva",
      role: "prestador de serviço em São Paulo",
      rating: 5,
    },
    stats: [
      { label: "Tempo de resposta", value: "<30s" },
      { label: "Clientes atendidos/dia", value: "50+" },
      { label: "Taxa de conversão", value: "+40%" },
    ],
  },
  otavio: {
    id: "otavio",
    name: "Otávio",
    shortName: "Otávio",
    role: "Agente de Orçamento",
    avatar: chicoAvatar,
    shortDescription: "Orçamentos precisos em minutos, não em horas.",
    longDescription: "O Otávio transforma pedidos em orçamentos profissionais automaticamente. Ele calcula MDF, chapas, perdas e aplica sua margem de lucro configurada. Gera PDFs prontos para enviar ao cliente em minutos.",
    detailedFeatures: [
      { title: "Cálculo Automático", description: "Calcula materiais, perdas e custos sem você fazer conta." },
      { title: "Margem Configurável", description: "Define sua margem uma vez e ele aplica em todos os orçamentos." },
      { title: "PDF Profissional", description: "Gera orçamentos bonitos com sua logo, prontos para enviar." },
      { title: "Histórico Completo", description: "Consulta orçamentos anteriores para referência e reuso." },
    ],
    benefits: [
      "Orçamento pronto em minutos, não horas",
      "Nunca mais erre no preço",
      "Impressione com PDFs profissionais",
      "Saiba exatamente sua margem de lucro",
    ],
    howItWorks: [
      { step: "1", title: "Receba o pedido do cliente", description: "Com as informações coletadas pela Clara ou manualmente" },
      { step: "2", title: "Otávio calcula tudo", description: "Materiais, perdas, mão de obra e margem de lucro" },
      { step: "3", title: "PDF gerado automaticamente", description: "Com sua logo e visual profissional" },
      { step: "4", title: "Envie e feche mais vendas", description: "Cliente impressionado fecha mais rápido" },
    ],
    testimonial: {
      text: "Eu gastava 2 horas fazendo orçamento. Agora o Otávio faz em 5 minutos e ainda fica mais bonito. O cliente leva a sério quando vê o PDF.",
      author: "João prestador de serviço",
      role: "prestação de serviços JM - Belo Horizonte",
      rating: 5,
    },
    stats: [
      { label: "Tempo por orçamento", value: "5 min" },
      { label: "Precisão", value: "98%" },
      { label: "PDFs gerados", value: "1000+" },
    ],
  },
  lucas: {
    id: "lucas",
    name: "Lucas",
    shortName: "Lucas",
    role: "Agente de Agendamentos",
    avatar: netoAvatar,
    shortDescription: "Nunca mais esqueça ou perca uma visita técnica.",
    longDescription: "O Lucas cuida de toda a sua agenda de visitas técnicas. Ele agenda no melhor horário, envia lembretes automáticos para você e para o cliente, reagenda quando preciso e confirma presença.",
    detailedFeatures: [
      { title: "Agendamento Inteligente", description: "Encontra o melhor horário considerando sua rotina e localização." },
      { title: "Lembretes Automáticos", description: "Lembra você e o cliente antes da visita para evitar furos." },
      { title: "Reagendamento Fácil", description: "Cliente pode remarcar sem você precisar fazer nada." },
      { title: "Confirmação Prévia", description: "Confirma com o cliente 24h antes para evitar visitas perdidas." },
    ],
    benefits: [
      "Zero visitas esquecidas",
      "Cliente avisado e confirmado",
      "Sua agenda sempre organizada",
      "Menos viagens perdidas",
    ],
    howItWorks: [
      { step: "1", title: "Cliente quer agendar visita", description: "Pelo WhatsApp ou após fechar orçamento" },
      { step: "2", title: "Lucas oferece horários", description: "Baseado na sua disponibilidade e localização" },
      { step: "3", title: "Lembretes automáticos", description: "Você e o cliente são avisados antes" },
      { step: "4", title: "Confirmação no dia", description: "Evita viagem perdida com confirmação prévia" },
    ],
    testimonial: {
      text: "Eu vivia perdendo visita porque esquecia ou o cliente não estava. O Lucas resolve tudo. Ele confirma, lembra e reagenda sozinho.",
      author: "Carlos Eduardo",
      role: "prestador de serviço autônomo - RJ",
      rating: 5,
    },
    stats: [
      { label: "Visitas confirmadas", value: "95%" },
      { label: "Cancelamentos evitados", value: "80%" },
      { label: "Tempo economizado", value: "5h/sem" },
    ],
  },
  helena: {
    id: "helena",
    name: "Helena",
    shortName: "Helena",
    role: "Agente Financeira",
    avatar: donaContaAvatar,
    shortDescription: "Saiba exatamente se você está lucrando ou não.",
    longDescription: "A Helena é seu controle financeiro sem complicação. Ela registra valores fechados, controla entradas e saldos, mostra se o projeto deu lucro de verdade e alerta quando algo está errado.",
    detailedFeatures: [
      { title: "Registro Automático", description: "Registra fechamentos e pagamentos conforme você trabalha." },
      { title: "Controle de Saldo", description: "Sabe exatamente quanto cada cliente ainda deve." },
      { title: "Análise de Lucro", description: "Mostra se você realmente lucrou em cada projeto." },
      { title: "Alertas Inteligentes", description: "Avisa quando algo está errado nos números." },
    ],
    benefits: [
      "Saiba seu lucro real, não achismo",
      "Nunca mais esqueça cobrança",
      "Entenda quais projetos compensam",
      "Planeje com números reais",
    ],
    howItWorks: [
      { step: "1", title: "Feche um projeto", description: "Helena já registra o valor e condições de pagamento" },
      { step: "2", title: "Receba parcelas", description: "Ela controla o que entrou e o que falta" },
      { step: "3", title: "Veja seu lucro real", description: "Desconta custos e mostra se valeu a pena" },
      { step: "4", title: "Receba alertas", description: "Cobrança atrasada? Ela te avisa na hora" },
    ],
    testimonial: {
      text: "Eu achava que estava lucrando, mas quando a Helena mostrou os números, vi que alguns projetos davam prejuízo. Agora sei exatamente quanto ganho.",
      author: "Maria Fernanda",
      role: "prestação de serviços MF Design - Curitiba",
      rating: 5,
    },
    stats: [
      { label: "Cobranças recuperadas", value: "R$ 5k/mês" },
      { label: "Projetos analisados", value: "500+" },
      { label: "Precisão financeira", value: "100%" },
    ],
  },
  maya: {
    id: "maya",
    name: "Maya",
    shortName: "Maya",
    role: "Agente de Divulgação",
    avatar: zecaAvatar,
    shortDescription: "Divulgue seu trabalho sem virar digital influencer.",
    longDescription: "A Maya é sua parceira de marketing. Ela cria legendas prontas para postar, sugere hashtags que funcionam, dá ideias de stories e reels, tudo com linguagem simples.",
    detailedFeatures: [
      { title: "Legendas Prontas", description: "Manda a foto e recebe legenda pronta para copiar e colar." },
      { title: "Hashtags Estratégicas", description: "Sugere hashtags que realmente alcançam clientes na sua região." },
      { title: "Ideias de Conteúdo", description: "Sugere posts, stories e reels baseados no seu trabalho." },
      { title: "Linguagem Autêntica", description: "Escreve como prestador de serviço fala, sem parecer forçado." },
    ],
    benefits: [
      "Poste sem perder tempo pensando",
      "Apareça mais para clientes locais",
      "Marketing sem virar influencer",
      "Mais seguidores, mais orçamentos",
    ],
    howItWorks: [
      { step: "1", title: "Tire foto do móvel pronto", description: "Ou de qualquer trabalho que quer divulgar" },
      { step: "2", title: "Mande pra Maya", description: "Pelo WhatsApp mesmo, rápido e fácil" },
      { step: "3", title: "Receba legenda pronta", description: "Com hashtags e sugestões de stories" },
      { step: "4", title: "Copie, cole e publique", description: "Em menos de 2 minutos está no ar" },
    ],
    testimonial: {
      text: "Eu tinha vergonha de postar porque não sabia escrever. A Maya faz legendas que parecem que eu escrevi, só que muito melhores. Meus seguidores dobraram!",
      author: "Pedro Henrique",
      role: "prestação de serviços PH - Campinas",
      rating: 5,
    },
    stats: [
      { label: "Engajamento médio", value: "+150%" },
      { label: "Tempo por post", value: "2 min" },
      { label: "Novos seguidores", value: "+500/mês" },
    ],
  },
};

const allAgents = Object.values(agentsData);

const AgentePage = () => {
  const { agentId } = useParams<{ agentId: string }>();
  const navigate = useNavigate();
  const [selectedAgents, setSelectedAgents] = useState<string[]>([]);
  const [expandedStep, setExpandedStep] = useState<number | null>(0);

  const agent = agentId ? agentsData[agentId] : null;

  useEffect(() => {
    if (agentId && agentsData[agentId]) {
      setSelectedAgents([agentId]);
    }
  }, [agentId]);

  const toggleAgent = (id: string) => {
    setSelectedAgents((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    setSelectedAgents(allAgents.map((a) => a.id));
  };

  const pricing = useMemo(() => {
    const count = selectedAgents.length;
    if (count === 0) return { price: 0, label: "Selecione agentes", perAgent: 0 };
    return { price: count * 29, label: `${count} Agente${count > 1 ? "s" : ""}`, perAgent: 29 };
  }, [selectedAgents]);

  const handleCheckout = () => {
    if (selectedAgents.length === 0) return;
    navigate(`/carrinho?agentes=${selectedAgents.join(",")}`);
  };

  if (!agent) {
    return (
      <main className="flex-1 pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Agente não encontrado</h1>
          <Link to="/agentes">
            <Button>Ver todos os agentes</Button>
          </Link>
        </div>
      </main>
    );
  }

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

        {/* Hero Section - Clean Layout */}
        <section className="py-8 md:py-12">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
              {/* Left - Avatar */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex justify-center lg:justify-start"
              >
                <div className="relative">
                  {/* Avatar Container */}
                  <div className="w-72 h-80 md:w-80 md:h-96 lg:w-96 lg:h-[440px] rounded-3xl overflow-hidden bg-gradient-to-br from-muted to-muted/50 border border-border/50 shadow-xl">
                    <img
                      src={agent.avatar}
                      alt={agent.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  
                  {/* Active Badge */}
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-green-500 text-white border-0 shadow-lg gap-1.5 px-4 py-1.5">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                      </span>
                      IA Ativa 24/7
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
                {/* Agent Info */}
                <div>
                  <Badge variant="secondary" className="mb-3">
                    {agent.role}
                  </Badge>
                  <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
                    {agent.name}
                  </h1>
                  <p className="text-xl md:text-2xl text-muted-foreground font-light mb-4">
                    {agent.shortDescription}
                  </p>
                  <p className="text-base text-muted-foreground/80 leading-relaxed">
                    {agent.longDescription}
                  </p>
                </div>

                {/* Stats */}
                <div className="flex flex-wrap gap-6">
                  {agent.stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <p className="text-2xl md:text-3xl font-bold text-primary">{stat.value}</p>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </div>
                  ))}
                </div>

                {/* Social Proof Mini */}
                <div className="flex items-center gap-4 py-4 border-y border-border/50">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                        <Users className="w-4 h-4 text-muted-foreground" />
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
                        <span className="text-sm text-muted-foreground">A partir de</span>
                        <div className="flex items-baseline gap-1">
                          <span className="text-4xl font-bold text-foreground">R$ 29</span>
                          <span className="text-muted-foreground">/mês</span>
                        </div>
                      </div>
                      <Badge className="bg-primary/10 text-primary border-0">
                        <Sparkles className="w-3 h-3 mr-1" />
                        Mais vendido
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

                    <Button size="lg" className="w-full gap-2 h-12" onClick={handleCheckout}>
                      <ShoppingCart className="w-5 h-5" />
                      Quero começar
                      <ArrowRight className="w-4 h-4" />
                    </Button>

                    <p className="text-center text-sm text-muted-foreground mt-4">
                      ou <button onClick={() => document.getElementById('monte-seu-time')?.scrollIntoView({ behavior: 'smooth' })} className="text-primary font-medium hover:underline">monte seu time completo</button>
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* What it does - Features */}
        <section className="py-16 md:py-20 bg-muted/30">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
                O que a {agent.shortName} faz por você
              </h2>
              <p className="text-lg text-muted-foreground">
                Funcionalidades pensadas para facilitar seu dia a dia
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {agent.detailedFeatures.map((feature, index) => (
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

        {/* How it works - Interactive Steps */}
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
                Veja o passo a passo de como a {agent.shortName} trabalha por você
              </p>
            </motion.div>

            <div className="max-w-3xl mx-auto">
              <div className="space-y-4">
                {agent.howItWorks.map((step, index) => (
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

              {/* Play Demo Button */}
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

        {/* Testimonial Section */}
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
                    {[...Array(agent.testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  
                  <Quote className="w-10 h-10 text-primary/20 mb-4" />
                  
                  <p className="text-xl md:text-2xl text-foreground mb-8 italic font-light leading-relaxed">
                    "{agent.testimonial.text}"
                  </p>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-lg text-foreground">{agent.testimonial.author}</p>
                      <p className="text-muted-foreground">{agent.testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Monte seu time - Upsell */}
        <section id="monte-seu-time" className="py-16 md:py-20">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
                Monte seu <span className="text-gradient">time completo</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Quanto mais agentes, menor o preço por agente
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Agent Selection */}
              <div className="lg:col-span-2">
                <div className="grid sm:grid-cols-2 gap-4">
                  {allAgents.map((a, index) => {
                    const isSelected = selectedAgents.includes(a.id);
                    const isCurrent = a.id === agent.id;
                    return (
                      <motion.div
                        key={a.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => toggleAgent(a.id)}
                        className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                          isSelected
                            ? "border-primary bg-primary/5 shadow-md"
                            : "border-border bg-card hover:border-primary/50"
                        } ${isCurrent ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : ""}`}
                      >
                        <div
                          className={`absolute top-3 right-3 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                            isSelected ? "bg-primary border-primary" : "border-muted-foreground/30"
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 text-primary-foreground" />}
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="w-14 h-14 rounded-full overflow-hidden bg-muted flex-shrink-0 border-2 border-background shadow-sm">
                            <img src={a.avatar} alt={a.name} className="w-full h-full object-cover object-top" />
                          </div>
                          <div>
                            <h4 className={`font-semibold text-sm ${isSelected ? "text-primary" : "text-foreground"}`}>
                              {a.shortName}
                            </h4>
                            <p className="text-xs text-muted-foreground">{a.role}</p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                <div className="mt-6 text-center">
                  <Button variant="outline" onClick={selectAll} className="gap-2">
                    <Sparkles className="w-4 h-4" />
                    Selecionar todos (R$ 145/mês)
                  </Button>
                </div>
              </div>

              {/* Order Summary */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <Card className="shadow-lg sticky top-24 border-border/50">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <ShoppingCart className="w-5 h-5 text-primary" />
                      <h3 className="font-semibold">Seu plano</h3>
                    </div>

                    {selectedAgents.length === 0 ? (
                      <p className="text-muted-foreground text-sm py-4">
                        Selecione pelo menos um agente
                      </p>
                    ) : (
                      <>
                        <div className="space-y-2 mb-4">
                          {selectedAgents.map((id) => {
                            const a = agentsData[id];
                            return (
                              <div key={id} className="flex items-center gap-2 text-sm">
                                <Check className="w-4 h-4 text-primary" />
                                <span>{a.shortName}</span>
                              </div>
                            );
                          })}
                        </div>

                        <Separator className="my-4" />

                        <div className="flex justify-between items-baseline mb-4">
                          <span className="text-sm text-muted-foreground">{pricing.label}</span>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-gradient">R$ {pricing.price.toFixed(2).replace(".", ",")}</p>
                            <p className="text-xs text-muted-foreground">/mês</p>
                          </div>
                        </div>

                        <Button size="lg" className="w-full gap-2" onClick={handleCheckout}>
                          Quero começar
                          <ArrowRight className="w-4 h-4" />
                        </Button>

                        <div className="mt-4 space-y-2 text-xs text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Check className="w-3 h-3 text-green-500" />
                            Sem contrato
                          </div>
                          <div className="flex items-center gap-2">
                            <Check className="w-3 h-3 text-green-500" />
                            Suporte via WhatsApp
                          </div>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 md:py-20 bg-muted/30">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto text-center"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Pronto para ter a {agent.shortName} trabalhando pra você?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Configuração em minutos. Sem contrato. Cancele quando quiser.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" className="gap-2 h-12 px-8" onClick={handleCheckout}>
                  <Sparkles className="w-5 h-5" />
                  Quero começar
                </Button>
                <a href="https://wa.me/5500000000000" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="outline" className="gap-2 h-12 px-8">
                    <MessageCircle className="w-5 h-5" />
                    Tirar dúvidas
                  </Button>
                </a>
              </div>
            </motion.div>
          </div>
        </section>
    </main>
  );
};

export default AgentePage;
