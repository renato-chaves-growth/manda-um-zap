export type CaseRegion = "Sul" | "Sudeste" | "Centro-Oeste" | "Nordeste" | "Norte";

export interface CaseStudy {
  id: number;
  slug: string;
  company: string;
  location: string;
  region: CaseRegion;
  owner: string;
  testimonial: string;
  metrics: {
    revenue: string;
    time: string;
    clients: string;
  };
  gradient: string;
  featured?: boolean;
  agents: string[];
  story: {
    before: string;
    challenge: string;
    solution: string;
    results: string;
    quote: string;
  };
}

export const cases: CaseStudy[] = [
  {
    id: 1,
    slug: "prestação de serviços-silva-porto-alegre",
    company: "prestação de serviços Silva",
    location: "Porto Alegre, RS",
    region: "Sul",
    owner: "Carlos Silva",
    testimonial: "Antes eu perdia horas respondendo WhatsApp. Agora a Clara faz isso enquanto eu trabalho na oficina.",
    metrics: {
      revenue: "+45%",
      time: "4h/dia",
      clients: "+32",
    },
    gradient: "from-whatsapp-teal via-whatsapp to-emerald-400",
    featured: true,
    agents: ["Clara", "Otávio"],
    story: {
      before: "Carlos trabalhava sozinho há 15 anos. Com o crescimento das redes sociais, o volume de mensagens no WhatsApp aumentou, mas ele não conseguia responder a todos. Muitos clientes desistiam antes mesmo de receber um orçamento.",
      challenge: "O principal desafio era equilibrar o trabalho na bancada com o atendimento. Carlos chegava a perder 3-4 orçamentos por semana simplesmente por não responder a tempo.",
      solution: "Carlos ativou a Clara para atendimento automático e o Otávio para criar orçamentos instantâneos. Agora, quando um cliente manda mensagem, recebe resposta imediata e, em poucos minutos, um orçamento completo.",
      results: "Em 6 meses, a receita aumentou 45%. Carlos atende 32 clientes a mais por mês sem trabalhar mais horas. O tempo livre ele usa para projetos mais elaborados, que têm margem maior.",
      quote: "Antes eu perdia clientes por não responder. Agora perco por estar com a agenda cheia. É outro nível."
    }
  },
  {
    id: 2,
    slug: "moveis-planejados-bh",
    company: "Móveis Planejados BH",
    location: "Belo Horizonte, MG",
    region: "Sudeste",
    owner: "Roberto Almeida",
    testimonial: "O Otávio revolucionou meus orçamentos. Antes eu errava nas contas e perdia dinheiro sem perceber.",
    metrics: {
      revenue: "+38%",
      time: "3h/dia",
      clients: "+28",
    },
    gradient: "from-emerald-500 via-whatsapp to-whatsapp-teal",
    agents: ["Otávio", "Helena"],
    story: {
      before: "Roberto tinha dificuldade com números. Seus orçamentos eram feitos 'no olho', e muitas vezes ele descobria no final do projeto que tinha trabalhado com margem zero ou até prejuízo.",
      challenge: "Criar orçamentos precisos que garantissem lucro sem perder competitividade. Roberto não tinha tempo para planilhas complexas.",
      solution: "Com o Otávio calculando automaticamente custos, mão de obra e margem, e a Helena acompanhando o financeiro de cada projeto, Roberto finalmente tem clareza sobre seus números.",
      results: "A margem média de lucro subiu de 18% para 32%. Roberto economiza 3 horas por dia que antes gastava fazendo contas. Agora aceita apenas projetos que valem a pena.",
      quote: "Pela primeira vez em 20 anos de profissão, sei exatamente quanto ganho em cada projeto."
    }
  },
  {
    id: 3,
    slug: "art-moveis-curitiba",
    company: "Art Móveis",
    location: "Curitiba, PR",
    region: "Sul",
    owner: "Fernanda Costa",
    testimonial: "Com a Helena controlando minhas finanças, finalmente sei quanto lucro de verdade em cada projeto.",
    metrics: {
      revenue: "+52%",
      time: "5h/dia",
      clients: "+41",
    },
    gradient: "from-whatsapp to-emerald-500",
    agents: ["Helena", "Clara", "Lucas"],
    story: {
      before: "Fernanda herdou a prestação de serviços do pai e, apesar de ser excelente projetista, nunca teve controle financeiro. As contas pessoais se misturavam com as da empresa.",
      challenge: "Separar as finanças, entender o lucro real e organizar o fluxo de caixa para poder investir no crescimento.",
      solution: "A Helena organizou todas as categorias de despesa, separou contas pessoais e empresariais, e passou a gerar relatórios mensais automáticos. Clara e Lucas ajudaram a organizar atendimento e agenda.",
      results: "Fernanda descobriu que alguns tipos de projeto davam prejuízo. Ao parar de aceitá-los e focar nos lucrativos, aumentou a receita em 52% trabalhando menos.",
      quote: "Achava que trabalhava muito e ganhava pouco. Na verdade, trabalhava nos projetos errados."
    }
  },
  {
    id: 4,
    slug: "design-moveis-sp",
    company: "Design Móveis SP",
    location: "São Paulo, SP",
    region: "Sudeste",
    owner: "Marcos Santos",
    testimonial: "O Lucas nunca esquece uma visita. Minha agenda ficou impecável e os clientes percebem a diferença.",
    metrics: {
      revenue: "+35%",
      time: "2h/dia",
      clients: "+25",
    },
    gradient: "from-whatsapp-teal to-whatsapp",
    agents: ["Lucas", "Clara"],
    story: {
      before: "Marcos atendia em toda São Paulo e vivia esquecendo compromissos. Já perdeu clientes por chegar no horário errado ou simplesmente não aparecer.",
      challenge: "Gerenciar uma agenda complexa com visitas em diferentes regiões da cidade, lembrando de confirmar com os clientes.",
      solution: "O Lucas organiza toda a agenda, otimiza as rotas de visita por região, e envia lembretes automáticos aos clientes um dia antes e uma hora antes.",
      results: "Zero visitas perdidas nos últimos 8 meses. Clientes elogiam a organização e Marcos otimizou o tempo de deslocamento, cabendo mais visitas por dia.",
      quote: "Meus clientes me perguntam como eu sou tão organizado. Só eu sei que é o Lucas fazendo tudo."
    }
  },
  {
    id: 5,
    slug: "moveis-rusticos-floripa",
    company: "Móveis Rústicos",
    location: "Florianópolis, SC",
    region: "Sul",
    owner: "Ana Paula",
    testimonial: "O Zeca transformou meu Instagram. Agora recebo pedidos de orçamento todos os dias pelas redes.",
    metrics: {
      revenue: "+67%",
      time: "3h/dia",
      clients: "+48",
    },
    gradient: "from-emerald-400 via-whatsapp to-whatsapp-teal",
    agents: ["Zeca", "Clara"],
    story: {
      before: "Ana Paula fazia móveis lindos, mas ninguém conhecia seu trabalho. Ela não tinha tempo nem conhecimento para cuidar das redes sociais.",
      challenge: "Construir presença digital profissional sem gastar horas produzindo conteúdo nem dinheiro contratando agência.",
      solution: "O Zeca passou a criar e publicar posts automaticamente, usando as fotos dos projetos de Ana Paula. A Clara responde os interessados que chegam pelo Instagram.",
      results: "De 500 para 8.000 seguidores em 10 meses. 60% dos novos clientes chegam pelas redes sociais. Ana Paula virou referência em móveis rústicos na região.",
      quote: "Nunca imaginei que meu Instagram seria meu principal vendedor. E o melhor: não gasto tempo nenhum com isso."
    }
  },
  {
    id: 6,
    slug: "prestação de serviços-moderna-rj",
    company: "prestação de serviços Moderna",
    location: "Rio de Janeiro, RJ",
    region: "Sudeste",
    owner: "João Pedro",
    testimonial: "Contratei o time completo e minha prestação de serviços mudou de patamar. É como ter 5 funcionários que nunca faltam.",
    metrics: {
      revenue: "+82%",
      time: "6h/dia",
      clients: "+55",
    },
    gradient: "from-whatsapp via-emerald-500 to-whatsapp-teal",
    agents: ["Clara", "Otávio", "Lucas", "Helena", "Zeca"],
    story: {
      before: "João Pedro tinha uma prestação de serviços com 3 funcionários, mas ele ainda fazia tudo: atendimento, orçamentos, agenda, financeiro e marketing. Estava esgotado.",
      challenge: "Delegar tarefas administrativas para focar na produção e na gestão estratégica do negócio.",
      solution: "Ativou os 5 agentes do MandaUmZap. Cada um assumiu uma área: atendimento (Clara), orçamentos (Otávio), agenda (Lucas), financeiro (Helena) e marketing (Zeca).",
      results: "João Pedro agora trabalha 6 horas a menos por dia. A receita cresceu 82% porque ele pode focar em projetos premium e em fechar grandes contratos.",
      quote: "Hoje sou empresário, não funcionário da minha própria empresa. Essa foi a maior transformação."
    }
  },
  {
    id: 7,
    slug: "moveis-sob-medida-goiania",
    company: "Móveis Sob Medida GO",
    location: "Goiânia, GO",
    region: "Centro-Oeste",
    owner: "Pedro Henrique",
    testimonial: "Saí de 8 projetos por mês para 22. E ainda trabalho menos horas que antes.",
    metrics: {
      revenue: "+175%",
      time: "4h/dia",
      clients: "+14",
    },
    gradient: "from-emerald-500 to-whatsapp",
    agents: ["Clara", "Otávio", "Helena"],
    story: {
      before: "Pedro Henrique tinha talento mas não conseguia escalar. Cada novo cliente significava mais trabalho administrativo.",
      challenge: "Aumentar o volume de projetos sem proporcionalmente aumentar o trabalho não-produtivo.",
      solution: "Clara qualifica os leads, Otávio fecha orçamentos rapidamente, e Helena mantém o controle financeiro. Pedro foca 100% na produção.",
      results: "Saltou de 8 para 22 projetos mensais. Contratou mais um prestador de serviço e está pensando em abrir uma filial.",
      quote: "Antes eu era um ótimo prestador de serviço que administrava mal. Agora sou um empresário com uma equipe de IA."
    }
  },
  {
    id: 8,
    slug: "prestação de serviços-nordeste-salvador",
    company: "prestação de serviços Nordeste",
    location: "Salvador, BA",
    region: "Nordeste",
    owner: "Maria Clara",
    testimonial: "No Nordeste, relação pessoal é tudo. A Clara atende com meu jeitinho, os clientes nem percebem que é IA.",
    metrics: {
      revenue: "+43%",
      time: "3h/dia",
      clients: "+36",
    },
    gradient: "from-whatsapp-teal to-emerald-400",
    agents: ["Clara", "Lucas"],
    story: {
      before: "Maria Clara tinha medo de que a automação fizesse seu atendimento parecer frio e impessoal, algo que seus clientes nordestinos rejeitariam.",
      challenge: "Automatizar sem perder o calor humano que é marca registrada do atendimento baiano.",
      solution: "Personalizou a Clara com expressões regionais, gírias locais e um tom caloroso. Os clientes se sentem acolhidos desde a primeira mensagem.",
      results: "Taxa de conversão aumentou 40%. Clientes elogiam o atendimento 'de primeira'. Maria Clara tem mais tempo para visitas presenciais, onde brilha.",
      quote: "Achei que IA era coisa fria. A Clara é mais simpática que muito vendedor que conheço."
    }
  }
];

export const caseRegions: CaseRegion[] = ["Sul", "Sudeste", "Centro-Oeste", "Nordeste", "Norte"];
