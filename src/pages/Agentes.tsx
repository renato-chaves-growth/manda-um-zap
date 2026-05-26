import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle, 
  Check, 
  ChevronRight, 
  Sparkles, 
  Star,
  Users,
  Clock,
  TrendingUp,
  Shield,
  Zap,
  ArrowRight
} from "lucide-react";

// Avatar imports - v2 photorealistic versions
import claraAvatar from "@/assets/avatars/ze-atendimento-v3.webp";
import otavioAvatar from "@/assets/avatars/chico-orcamento-v3.webp";
import lucasAvatar from "@/assets/avatars/neto-agenda-v3.webp";
import helenaAvatar from "@/assets/avatars/dona-conta-v3.webp";
import mayaAvatar from "@/assets/avatars/zeca-instagram-v3.webp";

const agents = [
  {
    id: "clara",
    name: "Clara",
    shortName: "Clara",
    stage: "Agente de Atendimento",
    avatar: claraAvatar,
    gradient: "from-[hsl(142,70%,49%)] to-[hsl(168,75%,31%)]",
    bgColor: "bg-primary",
    color: "text-primary",
    description: "Seu primeiro contato com o cliente. Responde rápido, filtra curiosos e deixa tudo pronto para você fechar.",
    shortBenefit: "Nunca mais perca cliente por demora",
    tasks: [
      "Responde clientes no WhatsApp 24h",
      "Entende pedidos por áudio ou texto",
      "Faz perguntas estratégicas sobre o projeto",
      "Filtra curiosos de clientes reais",
    ],
    stats: { value: "<30s", label: "Tempo de resposta" },
  },
  {
    id: "otavio",
    name: "Otávio",
    shortName: "Otávio",
    stage: "Agente de Orçamento",
    avatar: otavioAvatar,
    gradient: "from-[hsl(175,84%,32%)] to-[hsl(174,85%,18%)]",
    bgColor: "bg-[hsl(175,84%,32%)]",
    color: "text-[hsl(175,84%,32%)]",
    description: "Transforma pedidos em orçamentos profissionais. Calcula tudo e aplica sua margem.",
    shortBenefit: "Orçamento rápido, sem medo de errar o preço",
    tasks: [
      "Calcula MDF, chapas e perdas automaticamente",
      "Aplica a margem configurada por você",
      "Gera orçamento profissional em minutos",
      "Histórico completo de orçamentos",
    ],
    stats: { value: "5min", label: "Por orçamento" },
  },
  {
    id: "lucas",
    name: "Lucas",
    shortName: "Lucas",
    stage: "Agente de Agendamentos",
    avatar: lucasAvatar,
    gradient: "from-[hsl(84,81%,44%)] to-[hsl(85,78%,27%)]",
    bgColor: "bg-[hsl(84,81%,44%)]",
    color: "text-[hsl(84,81%,44%)]",
    description: "Cuida das suas visitas técnicas. Agenda, confirma e reagenda automaticamente.",
    shortBenefit: "Nunca mais perca visita ou passe vergonha",
    tasks: [
      "Agenda visitas no melhor horário",
      "Confirma com o cliente automaticamente",
      "Envia lembretes para você e o cliente",
      "Reagenda quando preciso, sem você fazer nada",
    ],
    stats: { value: "95%", label: "Visitas confirmadas" },
  },
  {
    id: "helena",
    name: "Helena",
    shortName: "Helena",
    stage: "Agente Financeira",
    avatar: helenaAvatar,
    gradient: "from-[hsl(160,84%,39%)] to-[hsl(160,84%,25%)]",
    bgColor: "bg-[hsl(160,84%,39%)]",
    color: "text-[hsl(160,84%,39%)]",
    description: "Controle financeiro sem complicação. Mostra se você está lucrando de verdade.",
    shortBenefit: "Saiba seu lucro real, não achismo",
    tasks: [
      "Registra valores fechados automaticamente",
      "Controla entradas e saldos pendentes",
      "Mostra lucro real de cada projeto",
      "Resumo mensal automático",
    ],
    stats: { value: "100%", label: "Precisão financeira" },
  },
  {
    id: "maya",
    name: "Maya",
    shortName: "Maya",
    stage: "Agente de Divulgação",
    avatar: mayaAvatar,
    gradient: "from-[hsl(85,78%,34%)] to-[hsl(85,78%,20%)]",
    bgColor: "bg-[hsl(85,78%,34%)]",
    color: "text-[hsl(85,78%,34%)]",
    description: "Marketing sem complicação. Cria legendas e sugere posts para você divulgar seu trabalho.",
    shortBenefit: "Divulgue sem virar influencer",
    tasks: [
      "Cria legendas prontas pra postar",
      "Sugere hashtags que funcionam",
      "Ideias de stories e reels",
      "Você posta em segundos, não horas",
    ],
    stats: { value: "+150%", label: "Engajamento médio" },
  },
];

const testimonials = [
  {
    text: "A Clara salvou minha prestação de serviços. Antes eu perdia cliente por não conseguir responder rápido. Agora ela responde na hora!",
    author: "Roberto Silva",
    role: "prestador de serviço em São Paulo",
    rating: 5,
  },
  {
    text: "Eu gastava 2 horas fazendo orçamento. Com o Otávio, faço em 5 minutos e fica profissional.",
    author: "João prestador de serviço",
    role: "prestação de serviços JM - BH",
    rating: 5,
  },
  {
    text: "Finalmente sei quanto estou lucrando de verdade. A Helena mudou minha visão do negócio.",
    author: "Maria Fernanda",
    role: "prestação de serviços MF Design",
    rating: 5,
  },
];

const stats = [
  { icon: Users, value: "500+", label: "prestadores de serviço usando" },
  { icon: Clock, value: "10h/sem", label: "Tempo economizado" },
  { icon: TrendingUp, value: "+40%", label: "Mais projetos fechados" },
  { icon: Shield, value: "100%", label: "Seguro e confiável" },
];

const AgentesPage = () => {
  return (
    <main className="flex-1">
        {/* Hero Section — padrão páginas internas */}
        <section className="bg-section-green pt-24 md:pt-32 pb-12 md:pb-20 relative overflow-hidden">
          <div className="container relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
                <Sparkles className="w-3 h-3 mr-1" />
                5 agentes especializados
              </Badge>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6">
                <span className="text-foreground">Conheça os </span>
                <span className="text-primary">Agentes</span>
                <br />
                <span className="text-foreground">que vão transformar sua prestação de serviços</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Cada agente cuida de uma parte do seu negócio. Você cuida do que sabe fazer de melhor: <strong className="text-foreground">prestação de serviços</strong>.
              </p>
              
              {/* Journey indicator */}
              <div className="flex flex-col items-center gap-3 mb-10">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-muted-foreground">Atendimento</span>
                  <div className="w-40 md:w-64 h-2 rounded-full bg-gradient-to-r from-primary via-[hsl(168,75%,31%)] to-[hsl(85,78%,34%)]" />
                  <span className="text-sm font-medium text-muted-foreground">Divulgação</span>
                </div>
                <p className="text-sm text-muted-foreground">A jornada completa do seu cliente</p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" className="gap-2" onClick={() => document.getElementById('agents-grid')?.scrollIntoView({ behavior: 'smooth' })}>
                  <Sparkles className="w-5 h-5" />
                  Escolher meus agentes
                  <ChevronRight className="w-4 h-4" />
                </Button>
                <a href="https://wa.me/5500000000000?text=Olá! Quero saber mais sobre os agentes" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="outline" className="gap-2">
                    <MessageCircle className="w-5 h-5" />
                    Tirar dúvidas
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-8 md:py-12 bg-muted/30 border-y border-border">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Agents Grid */}
        <section id="agents-grid" className="py-16 md:py-24">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="text-foreground">Escolha os agentes ideais para </span>
                <span className="text-primary">seu negócio</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Clique em cada agente para ver detalhes completos, avaliações e como ele pode ajudar você.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {agents.map((agent, index) => (
                <Link key={agent.id} to={`/agente/${agent.id}`} className="group">
                  <Card className="h-full border-border/50 hover:border-primary/50 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
                    {/* Header with gradient */}
                    <div className={`bg-gradient-to-br ${agent.gradient} p-6 text-white relative`}>
                      <div className="absolute top-3 right-3">
                        <Badge className="bg-white/20 text-white border-white/30 text-xs">
                          Etapa {index + 1}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-20 rounded-2xl bg-white/20 overflow-hidden flex-shrink-0 group-hover:scale-105 transition-transform">
                          <img
                            src={agent.avatar}
                            alt={agent.name}
                            className="w-full h-full object-cover object-top"
                          />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold whitespace-nowrap">{agent.name}</h3>
                          <p className="text-white/80 text-sm">{agent.stage}</p>
                        </div>
                      </div>

                      {/* Stat badge */}
                      <div className="mt-4 inline-flex items-center gap-2 bg-white/20 rounded-full px-3 py-1.5">
                        <Zap className="w-4 h-4" />
                        <span className="text-sm font-medium">{agent.stats.value}</span>
                        <span className="text-xs opacity-80">{agent.stats.label}</span>
                      </div>
                    </div>

                    <CardContent className="p-6 flex flex-col flex-1">
                      <p className="text-muted-foreground mb-4">
                        {agent.description}
                      </p>

                      {/* Tasks */}
                      <ul className="space-y-2 mb-6">
                        {agent.tasks.slice(0, 3).map((task, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <Check className={`w-4 h-4 ${agent.color} flex-shrink-0 mt-0.5`} />
                            <span className="text-sm text-foreground/80">{task}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Spacer to push benefit + CTA to bottom */}
                      <div className="mt-auto">
                        {/* Benefit highlight */}
                        <div className="p-3 rounded-lg bg-primary/5 border border-primary/10 mb-4">
                          <p className="text-sm font-medium text-primary flex items-center gap-2">
                            <Sparkles className="w-4 h-4" />
                            {agent.shortBenefit}
                          </p>
                        </div>

                        {/* CTA */}
                        <Button 
                          variant="outline" 
                          className="w-full gap-2"
                        >
                          Ver detalhes do {agent.shortName}
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}

              {/* Jornada do prestador de serviço */}
              <Link to="/jornada-integrada" className="group md:col-span-2 lg:col-span-1">
                <Card className="h-full border-2 border-[hsl(38,92%,50%)] hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
                  {/* Header with gradient — same pattern as agent cards */}
                  <div className="bg-gradient-to-br from-[hsl(38,92%,50%)] to-[hsl(32,95%,44%)] p-6 text-white relative">
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-white/20 text-white border-white/30 text-xs">
                        Completo
                      </Badge>
                    </div>

                    <div className="flex items-center gap-4">
                      {/* Stacked agent avatars — same height as individual cards (w-20 h-20) */}
                      <div className="flex -space-x-3 flex-shrink-0">
                        {[claraAvatar, otavioAvatar, lucasAvatar, helenaAvatar, mayaAvatar].map((avatar, i) => (
                          <div key={i} className="w-11 h-20 rounded-2xl border-2 border-white overflow-hidden group-hover:scale-105 transition-transform bg-white/20">
                            <img src={avatar} alt="" className="w-full h-full object-cover object-top" />
                          </div>
                        ))}
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-xl font-bold leading-tight">Jornada do<br />prestador de serviço</h3>
                        <p className="text-white/80 text-sm">5 agentes integrados</p>
                      </div>
                    </div>

                    <div className="mt-4 inline-flex items-center gap-2 bg-white/20 rounded-full px-3 py-1.5">
                      <Zap className="w-4 h-4" />
                      <span className="text-sm font-medium">100%</span>
                      <span className="text-xs opacity-80">Automação total</span>
                    </div>
                  </div>

                  <CardContent className="p-6 flex flex-col flex-1">
                    <p className="text-muted-foreground mb-4">
                      Todos os 5 agentes trabalhando juntos, do primeiro contato à divulgação.
                    </p>

                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[hsl(38,92%,50%)] flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground/80">Atendimento + Orçamento automáticos</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[hsl(38,92%,50%)] flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground/80">Agendamento e financeiro integrados</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[hsl(38,92%,50%)] flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground/80">Marketing com conteúdo pronto</span>
                      </li>
                    </ul>

                    <div className="mt-auto">
                      <div className="p-3 rounded-lg bg-[hsl(38,92%,50%)]/5 border border-[hsl(38,92%,50%)]/10 mb-4">
                        <p className="text-sm font-medium text-[hsl(38,92%,50%)] flex items-center gap-2">
                          <Sparkles className="w-4 h-4" />
                          Economia de R$ 66/mês vs. individual
                        </p>
                      </div>

                      <Button 
                        variant="outline" 
                        className="w-full gap-2"
                      >
                        Ver detalhes da Jornada
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 md:py-20 bg-section-beige">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="text-foreground">O que nossos clientes </span>
                <span className="text-primary">dizem</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                prestadores de serviço reais contando suas experiências
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="border-border/50">
                  <CardContent className="p-6">
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                      ))}
                    </div>
                    <p className="text-foreground mb-4 italic">
                      "{testimonial.text}"
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Users className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground text-sm">{testimonial.author}</p>
                        <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Comparison */}
        <section className="py-16 md:py-20">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  <span className="text-foreground">Quanto mais agentes, </span>
                  <span className="text-primary">melhor o preço</span>
                </h2>
                <p className="text-lg text-muted-foreground">
                  Monte o time ideal para sua prestação de serviços. Sem contrato, sem complicação.
                </p>
              </div>

              <div className="grid md:grid-cols-4 gap-5">
                {/* Começar */}
                <Card className="border-border/50">
                  <CardContent className="p-6 text-center">
                    <p className="text-sm text-muted-foreground mb-1 font-medium">Começar</p>
                    <p className="text-xs text-muted-foreground mb-3">1 Agente</p>
                    <div className="flex items-baseline justify-center gap-1 mb-4">
                      <span className="text-3xl font-bold text-foreground">R$ 29</span>
                      <span className="text-muted-foreground text-sm">/mês</span>
                    </div>
                    <Link to="/precos">
                      <Button variant="outline" className="w-full text-sm">Escolher agente</Button>
                    </Link>
                  </CardContent>
                </Card>

                {/* Trabalhar */}
                <Card className="border-border/50">
                  <CardContent className="p-6 text-center">
                    <p className="text-sm text-muted-foreground mb-1 font-medium">Trabalhar</p>
                    <p className="text-xs text-muted-foreground mb-3">Até 2 Agentes</p>
                    <div className="flex items-baseline justify-center gap-1 mb-4">
                      <span className="text-3xl font-bold text-foreground">R$ 49</span>
                      <span className="text-muted-foreground text-sm">/mês</span>
                    </div>
                    <Link to="/precos">
                      <Button variant="outline" className="w-full text-sm">Escolher agentes</Button>
                    </Link>
                  </CardContent>
                </Card>

                {/* Vender Mais — Recomendado */}
                <Card className="border-2 border-primary relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-bl-lg">
                    Recomendado
                  </div>
                  <CardContent className="p-6 text-center">
                    <p className="text-sm text-primary mb-1 font-semibold">Vender Mais</p>
                    <p className="text-xs text-muted-foreground mb-3">Todos os Agentes</p>
                    <div className="flex items-baseline justify-center gap-1 mb-4">
                      <span className="text-3xl font-bold text-primary">R$ 79</span>
                      <span className="text-muted-foreground text-sm">/mês</span>
                    </div>
                    <Link to="/precos">
                      <Button className="w-full gap-2 text-sm">
                        <Sparkles className="w-4 h-4" />
                        Quero todos
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                {/* Tudo Automático */}
                <Card className="border-2 border-[hsl(38,92%,50%)] relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-[hsl(38,92%,50%)] text-white text-xs font-medium px-3 py-1 rounded-bl-lg">
                    Ideal
                  </div>
                  <CardContent className="p-6 text-center">
                    <p className="text-sm text-[hsl(38,92%,50%)] mb-1 font-semibold">Tudo Automático</p>
                    <p className="text-xs text-muted-foreground mb-3">Agentes Integrados</p>
                    <div className="flex items-baseline justify-center gap-1 mb-4">
                      <span className="text-3xl font-bold text-[hsl(38,92%,50%)]">R$ 129</span>
                      <span className="text-muted-foreground text-sm">/mês</span>
                    </div>
                    <Link to="/precos">
                      <Button variant="outline" className="w-full text-sm">
                        Automatizar tudo
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-8 text-center">
                <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" />
                    Sem contrato
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" />
                    Cancele quando quiser
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" />
                    Suporte via WhatsApp
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" />
                    Configuração em minutos
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

    </main>
  );
};

export default AgentesPage;
