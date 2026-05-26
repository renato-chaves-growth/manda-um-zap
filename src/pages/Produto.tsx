import { useState, useMemo } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Star, Users, Check, ArrowLeft, ShoppingCart, Sparkles, MessageSquare, Mic, Image, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// Avatar imports
import claraAvatar from "@/assets/avatars/ze-atendimento-v3.webp";
import chicoAvatar from "@/assets/avatars/chico-orcamento-v3.webp";
import netoAvatar from "@/assets/avatars/neto-agenda-v3.webp";
import donaContaAvatar from "@/assets/avatars/dona-conta-v3.webp";
import zecaAvatar from "@/assets/avatars/zeca-instagram-v3.webp";

interface Agent {
  id: string;
  name: string;
  shortName: string;
  role: string;
  avatar: string;
  color: string;
  description: string;
  longDescription: string;
  bullets: string[];
  features: { icon: React.ReactNode; title: string; description: string }[];
  rating: number;
  usersCount: number;
  reviews: {
    name: string;
    role: string;
    text: string;
    rating: number;
  }[];
}

const allAgents: Agent[] = [
  {
    id: "clara",
    name: "Clara",
    shortName: "Clara",
    role: "Agente de Atendimento",
    avatar: claraAvatar,
    color: "text-primary",
    description: "Sua assistente 24h que nunca deixa cliente esperando.",
    longDescription: "A Clara é o primeiro contato do cliente com a sua prestação de serviços. Ela responde mensagens instantaneamente, entende pedidos por áudio ou texto, faz perguntas estratégicas sobre o projeto e filtra curiosos de clientes reais. Funciona 24 horas, 7 dias por semana, enquanto você foca no que sabe fazer de melhor: produzir móveis.",
    bullets: [
      "Responde clientes automaticamente 24h por dia",
      "Entende áudio, texto e imagens",
      "Filtra curiosos de clientes reais",
      "Coleta briefing antes de passar pra você",
      "Fala como se fosse alguém da sua equipe",
    ],
    features: [
      { icon: <Clock className="w-5 h-5" />, title: "Resposta Instantânea", description: "Responde em menos de 30 segundos, mesmo de madrugada ou fim de semana." },
      { icon: <Mic className="w-5 h-5" />, title: "Entendimento de Áudio", description: "Processa áudios do WhatsApp e responde como se fosse você." },
      { icon: <MessageSquare className="w-5 h-5" />, title: "Qualificação de Leads", description: "Identifica clientes sérios e filtra quem só está olhando." },
      { icon: <Image className="w-5 h-5" />, title: "Coleta de Briefing", description: "Faz as perguntas certas para você já receber o pedido organizado." },
    ],
    rating: 4.9,
    usersCount: 847,
    reviews: [
      { name: "Roberto Silva", role: "prestador de serviço em São Paulo", text: "A Clara salvou minha prestação de serviços. Antes eu perdia cliente por não conseguir responder rápido. Agora ela responde na hora e eu só apareço para fechar!", rating: 5 },
      { name: "Carlos", role: "prestador de serviço autônomo", text: "Nunca mais perdi cliente por demorar a responder. A Clara é incrível!", rating: 5 },
      { name: "Marcos", role: "prestador de serviço há 20 anos", text: "Confesso que tinha preconceito com IA, mas a Clara me surpreendeu demais.", rating: 4 },
    ],
  },
  {
    id: "otavio",
    name: "Otávio",
    shortName: "Otávio",
    role: "Agente de Orçamento",
    avatar: chicoAvatar,
    color: "text-blue-600",
    description: "Cria orçamentos detalhados em minutos, não em horas.",
    longDescription: "O Otávio analisa o projeto, calcula a quantidade exata de MDF, ferragens e acabamentos, aplica sua margem configurada e gera um PDF profissional pronto para enviar ao cliente.",
    bullets: [
      "Calcula MDF, chapas e perdas automaticamente",
      "Consulta preços de fornecedores",
      "Aplica sua margem de lucro configurada",
      "Gera PDF profissional em segundos",
      "Histórico de todos os orçamentos",
    ],
    features: [
      { icon: <Clock className="w-5 h-5" />, title: "Orçamento em Minutos", description: "Antes demorava horas, agora são poucos minutos." },
      { icon: <Check className="w-5 h-5" />, title: "Cálculo Preciso", description: "Considera perdas de corte e aproveita melhor as chapas." },
      { icon: <MessageSquare className="w-5 h-5" />, title: "PDF Profissional", description: "Documento bonito e organizado para impressionar o cliente." },
      { icon: <Sparkles className="w-5 h-5" />, title: "Margem Automática", description: "Aplica sua margem de lucro em cada item automaticamente." },
    ],
    rating: 4.8,
    usersCount: 632,
    reviews: [
      { name: "André", role: "prestador de serviço há 15 anos", text: "Antes eu demorava 2 dias pra fazer um orçamento. Agora faço em 10 minutos.", rating: 5 },
      { name: "Paulo", role: "Dono de prestação de serviços", text: "Os cálculos são precisos e o PDF é muito profissional. Cliente fica impressionado.", rating: 5 },
      { name: "João", role: "prestador de serviço autônomo", text: "Economizo horas toda semana. Vale cada centavo.", rating: 4 },
    ],
  },
  {
    id: "lucas",
    name: "Lucas",
    shortName: "Lucas",
    role: "Agente de Agendamentos",
    avatar: netoAvatar,
    color: "text-indigo-500",
    description: "Gerencia suas visitas técnicas automaticamente.",
    longDescription: "O Lucas cuida de toda a logística das suas visitas técnicas. Ele encontra o melhor horário, envia confirmações, lembretes e lida com reagendamentos automaticamente.",
    bullets: [
      "Agenda visitas no melhor horário",
      "Envia lembretes automáticos",
      "Reagenda automaticamente se necessário",
      "Sincroniza com sua agenda pessoal",
      "Evita conflitos de horários",
    ],
    features: [
      { icon: <Clock className="w-5 h-5" />, title: "Agendamento Inteligente", description: "Encontra o melhor horário para você e o cliente." },
      { icon: <MessageSquare className="w-5 h-5" />, title: "Lembretes Automáticos", description: "Envia lembretes 24h e 2h antes da visita." },
      { icon: <Check className="w-5 h-5" />, title: "Reagendamento Fácil", description: "Cliente pode reagendar sem te incomodar." },
      { icon: <Sparkles className="w-5 h-5" />, title: "Sync com Agenda", description: "Sincroniza com Google Calendar e outros." },
    ],
    rating: 4.7,
    usersCount: 423,
    reviews: [
      { name: "Ricardo", role: "prestador de serviço", text: "Acabou a confusão de horários. Lucas cuida de tudo.", rating: 5 },
      { name: "Fernando", role: "Dono de prestação de serviços", text: "Meus clientes adoram os lembretes. Diminuiu muito as faltas.", rating: 4 },
      { name: "Luciano", role: "prestador de serviço autônomo", text: "Simples e funciona. Era o que eu precisava.", rating: 5 },
    ],
  },
  {
    id: "helena",
    name: "Helena",
    shortName: "Helena",
    role: "Agente Financeira",
    avatar: donaContaAvatar,
    color: "text-violet-500",
    description: "Controla suas finanças e mostra o lucro real.",
    longDescription: "A Helena transforma a gestão financeira da sua prestação de serviços. Ela registra tudo automaticamente, acompanha o saldo de cada projeto e mostra se você está lucrando de verdade.",
    bullets: [
      "Registra entradas e pagamentos",
      "Controla saldo de cada projeto",
      "Mostra lucro real por trabalho",
      "Alertas de contas a vencer",
      "Relatórios financeiros simples",
    ],
    features: [
      { icon: <Check className="w-5 h-5" />, title: "Controle por Projeto", description: "Sabe exatamente quanto lucrou em cada móvel." },
      { icon: <Clock className="w-5 h-5" />, title: "Alertas de Vencimento", description: "Nunca mais esquece uma conta a pagar." },
      { icon: <MessageSquare className="w-5 h-5" />, title: "Relatórios Simples", description: "Entenda suas finanças sem ser contador." },
      { icon: <Sparkles className="w-5 h-5" />, title: "Visão Geral", description: "Dashboard com tudo que você precisa saber." },
    ],
    rating: 4.8,
    usersCount: 518,
    reviews: [
      { name: "Antônio", role: "prestador de serviço há 25 anos", text: "Finalmente sei se meus projetos dão lucro. Mudou meu negócio.", rating: 5 },
      { name: "Sérgio", role: "Dono de prestação de serviços", text: "Simples de usar, mesmo pra quem não entende de planilha.", rating: 5 },
      { name: "Eduardo", role: "prestador de serviço", text: "Os alertas de conta a vencer me salvaram várias vezes.", rating: 4 },
    ],
  },
  {
    id: "maya",
    name: "Maya",
    shortName: "Maya",
    role: "Agente de Divulgação",
    avatar: zecaAvatar,
    color: "text-pink-500",
    description: "Ajuda a divulgar seu trabalho nas redes sociais.",
    longDescription: "A Maya é sua parceira de marketing digital. Ela cria legendas envolventes, sugere as melhores hashtags e dá ideias de stories e reels para você mostrar seu trabalho.",
    bullets: [
      "Cria legendas prontas para posts",
      "Sugere hashtags que funcionam",
      "Ideias de stories e reels",
      "Calendário de conteúdo",
      "Analisa o que está funcionando",
    ],
    features: [
      { icon: <MessageSquare className="w-5 h-5" />, title: "Legendas Prontas", description: "Textos criativos para seus posts em segundos." },
      { icon: <Sparkles className="w-5 h-5" />, title: "Hashtags Certeiras", description: "As melhores hashtags pro seu nicho." },
      { icon: <Image className="w-5 h-5" />, title: "Ideias de Conteúdo", description: "Sugestões de stories e reels toda semana." },
      { icon: <Clock className="w-5 h-5" />, title: "Calendário", description: "Planeje suas postagens com antecedência." },
    ],
    rating: 4.6,
    usersCount: 356,
    reviews: [
      { name: "Thiago", role: "prestador de serviço", text: "Nunca soube o que escrever. Agora tenho posts prontos todo dia.", rating: 5 },
      { name: "Gustavo", role: "prestador de serviço autônomo", text: "Minhas redes cresceram muito depois que comecei a usar.", rating: 4 },
      { name: "Fábio", role: "Dono de prestação de serviços", text: "As ideias de conteúdo são muito boas. Economizo tempo.", rating: 5 },
    ],
  },
];

const INDIVIDUAL_PRICE = 29;
const TWO_AGENTS_PRICE = 49;
const ALL_AGENTS_PRICE = 79;

const Produto = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const initialAgentId = searchParams.get("agente") || "clara";
  const [selectedAgentId, setSelectedAgentId] = useState(initialAgentId);
  const [selectedAgents, setSelectedAgents] = useState<string[]>([initialAgentId]);

  const currentAgent = useMemo(() => {
    return allAgents.find(a => a.id === selectedAgentId) || allAgents[0];
  }, [selectedAgentId]);

  const otherAgents = useMemo(() => {
    return allAgents.filter(a => a.id !== selectedAgentId);
  }, [selectedAgentId]);

  const toggleAgent = (agentId: string) => {
    setSelectedAgents(prev => {
      if (prev.includes(agentId)) {
        return prev.filter(id => id !== agentId);
      }
      return [...prev, agentId];
    });
  };

  const currentPrice = useMemo(() => {
    if (selectedAgents.length >= 5) return ALL_AGENTS_PRICE;
    if (selectedAgents.length >= 2) return TWO_AGENTS_PRICE;
    return INDIVIDUAL_PRICE;
  }, [selectedAgents]);

  const handleSelectAgent = (id: string) => {
    setSelectedAgentId(id);
    if (!selectedAgents.includes(id)) {
      setSelectedAgents(prev => [...prev, id]);
    }
    navigate(`/produto?agente=${id}`, { replace: true });
  };

  return (
    <main className="flex-1 pt-20 bg-background">
        {/* Breadcrumb */}
        <div className="container py-4">
          <Link to="/agentes" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Voltar para todos os agentes
          </Link>
        </div>

        {/* Hero Section - Agent Info */}
        <section className="container pb-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
              {/* Left: Avatar */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex justify-center lg:justify-end lg:sticky lg:top-28"
              >
                <div className="relative">
                  {/* Outer glow */}
                  <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-primary/20 to-violet-500/20 blur-2xl" />
                  
                  {/* Circle avatar */}
                  <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-background shadow-2xl">
                    <img
                      src={currentAgent.avatar}
                      alt={currentAgent.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>

                  {/* Badge */}
                  <div className="absolute bottom-4 right-4">
                    <Badge className="bg-green-500/90 text-white border-0 shadow-lg gap-1.5 px-3 py-1.5">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                      </span>
                      100% seguro
                    </Badge>
                  </div>

                  {/* Response time badge */}
                  <div className="absolute top-4 right-0">
                    <div className="bg-background/95 backdrop-blur border border-border rounded-lg px-3 py-2 shadow-lg">
                      <p className="text-xs text-muted-foreground">Resposta rápida</p>
                      <p className="text-sm font-semibold text-foreground flex items-center gap-1">
                        <Check className="w-3 h-3 text-green-500" />
                        &lt;30s
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right: Info */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="space-y-6"
              >
                <div>
                  <Badge variant="secondary" className="mb-3">
                    {currentAgent.role}
                  </Badge>
                  <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
                    {currentAgent.name}
                  </h1>
                  <p className="text-xl text-primary font-medium mb-4">
                    {currentAgent.description}
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    {currentAgent.longDescription}
                  </p>
                </div>

                {/* Stats row */}
                <div className="flex flex-wrap items-center gap-6 py-4">
                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < Math.floor(currentAgent.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground/30'}`} 
                        />
                      ))}
                    </div>
                    <span className="font-semibold">{currentAgent.rating.toFixed(1)}</span>
                    <span className="text-muted-foreground text-sm">({currentAgent.reviews.length} avaliações)</span>
                  </div>

                  <Separator orientation="vertical" className="h-5" />

                  {/* Users */}
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span><strong className="text-foreground">{currentAgent.usersCount.toLocaleString('pt-BR')}</strong> prestadores de serviço usam</span>
                  </div>
                </div>

                {/* Price & CTA */}
                <div className="bg-muted/30 rounded-2xl p-6 border border-border">
                  <div className="flex items-end justify-between mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">A partir de</p>
                      <p className="text-3xl font-bold text-foreground">
                        R$ {currentPrice}
                        <span className="text-base font-normal text-muted-foreground">/mês</span>
                      </p>
                    </div>
                    {selectedAgents.length >= 2 && (
                      <Badge className="bg-green-500/10 text-green-600 border-0">
                        <Sparkles className="w-3 h-3 mr-1" />
                        {selectedAgents.length >= 5 ? 'Melhor economia' : 'Combo ativado'}
                      </Badge>
                    )}
                  </div>

                  <Button size="lg" className="w-full gap-2 h-12 text-base mb-3">
                    <ShoppingCart className="w-5 h-5" />
                    Quero começar
                  </Button>

                  <p className="text-center text-xs text-muted-foreground">
                    Sem contrato • Cancele quando quiser • Suporte via WhatsApp
                  </p>
                </div>

                {/* Quick bullets */}
                <div className="grid grid-cols-2 gap-3">
                  {currentAgent.bullets.slice(0, 4).map((bullet, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{bullet}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                  O que a {currentAgent.name} <span className="text-gradient">faz por você</span>
                </h2>
                <p className="text-muted-foreground">
                  Funcionalidades pensadas para facilitar seu dia a dia
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {currentAgent.features.map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-background rounded-xl p-6 border border-border"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof Section */}
        <section className="py-16">
          <div className="container">
            <div className="max-w-5xl mx-auto">
              <div className="grid lg:grid-cols-5 gap-8 items-start">
                {/* Left: Why choose */}
                <div className="lg:col-span-2 space-y-4">
                  <h2 className="text-2xl font-bold text-foreground">
                    Por que escolher a {currentAgent.name}?
                  </h2>
                  <ul className="space-y-3">
                    {currentAgent.bullets.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-green-500" />
                        </div>
                        <span className="text-muted-foreground">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right: Featured review */}
                <div className="lg:col-span-3">
                  <div className="bg-muted/30 rounded-2xl p-6 border border-border">
                    <div className="flex mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <p className="text-lg text-foreground italic mb-6 leading-relaxed">
                      "{currentAgent.reviews[0].text}"
                    </p>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-12 h-12">
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                          {currentAgent.reviews[0].name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-foreground">{currentAgent.reviews[0].name}</p>
                        <p className="text-sm text-muted-foreground">{currentAgent.reviews[0].role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Complementary Agents Section */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                  Complete sua equipe de IA
                </h2>
                <p className="text-muted-foreground">
                  Combine agentes e economize — quanto mais, menor o preço por agente
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {otherAgents.map((agent) => {
                  const isSelected = selectedAgents.includes(agent.id);
                  return (
                    <motion.button
                      key={agent.id}
                      onClick={() => toggleAgent(agent.id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`relative p-4 rounded-xl border-2 text-left transition-all ${
                        isSelected
                          ? 'border-primary bg-primary/5'
                          : 'border-border bg-background hover:border-primary/50'
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      )}
                      
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-background shadow">
                          <img src={agent.avatar} alt={agent.name} className="w-full h-full object-cover object-top" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{agent.name}</p>
                          <p className="text-xs text-muted-foreground">{agent.role}</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">{agent.description}</p>
                    </motion.button>
                  );
                })}
              </div>

              {/* Pricing summary */}
              <div className="mt-8 bg-background rounded-2xl p-6 border border-border">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      {selectedAgents.length} {selectedAgents.length === 1 ? 'agente selecionado' : 'agentes selecionados'}
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="flex -space-x-2">
                        {selectedAgents.slice(0, 5).map((agentId) => {
                          const agent = allAgents.find(a => a.id === agentId);
                          return agent ? (
                            <div key={agentId} className="w-8 h-8 rounded-full overflow-hidden border-2 border-background">
                              <img src={agent.avatar} alt={agent.name} className="w-full h-full object-cover object-top" />
                            </div>
                          ) : null;
                        })}
                      </div>
                      <p className="text-2xl font-bold text-foreground">
                        R$ {currentPrice}<span className="text-base font-normal text-muted-foreground">/mês</span>
                      </p>
                    </div>
                  </div>

                  <Button size="lg" className="gap-2">
                    <ShoppingCart className="w-5 h-5" />
                    Quero começar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Other Reviews */}
        <section className="py-16">
          <div className="container">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
                Mais avaliações de quem usa
              </h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                {currentAgent.reviews.slice(1).concat(allAgents[1].reviews.slice(0, 1)).map((review, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-muted/30 rounded-xl p-5 border border-border"
                  >
                    <div className="flex mb-3">
                      {[...Array(5)].map((_, j) => (
                        <Star 
                          key={j} 
                          className={`w-4 h-4 ${j < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground/30'}`} 
                        />
                      ))}
                    </div>
                    <p className="text-foreground mb-4 text-sm leading-relaxed">"{review.text}"</p>
                    <div className="flex items-center gap-2">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                          {review.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium text-foreground">{review.name}</p>
                        <p className="text-xs text-muted-foreground">{review.role}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
    </main>
  );
};

export default Produto;
