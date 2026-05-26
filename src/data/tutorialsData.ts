export type TutorialLevel = "Iniciante" | "Intermediário" | "Avançado";
export type TutorialCategory = "Atendimento" | "Orçamento" | "Agenda" | "Financeiro" | "Marketing" | "Configuração";

export interface Tutorial {
  id: number;
  slug: string;
  title: string;
  description: string;
  duration: string;
  level: TutorialLevel;
  category: TutorialCategory;
  gradient: string;
  videoUrl?: string;
  steps: {
    title: string;
    description: string;
    tip?: string;
  }[];
}

export const tutorials: Tutorial[] = [
  {
    id: 1,
    slug: "configurar-clara-atendimento",
    title: "Como configurar a Clara para atendimento automático",
    description: "Aprenda a configurar sua assistente de atendimento em poucos minutos.",
    duration: "12 min",
    level: "Iniciante",
    category: "Atendimento",
    gradient: "from-primary/80 to-violet-500/80",
    steps: [
      {
        title: "Acesse o painel de configurações",
        description: "No menu principal, clique em 'Agentes' e depois em 'Clara'. Você verá todas as opções de personalização disponíveis.",
        tip: "Mantenha seu WhatsApp Business conectado para que a Clara possa atender."
      },
      {
        title: "Configure a mensagem de boas-vindas",
        description: "Defina a primeira mensagem que seus clientes receberão ao entrar em contato. Use um tom amigável e profissional.",
        tip: "Inclua seu nome ou o nome da prestação de serviços na saudação."
      },
      {
        title: "Defina os horários de atendimento",
        description: "Configure os horários em que a Clara deve atender automaticamente. Fora desse horário, ela informará que você retornará.",
      },
      {
        title: "Configure respostas para perguntas frequentes",
        description: "Adicione respostas prontas para as dúvidas mais comuns: prazo de entrega, formas de pagamento, área de atendimento.",
        tip: "Quanto mais respostas configurar, melhor será o atendimento automático."
      },
      {
        title: "Ative a coleta de informações",
        description: "Configure a Clara para coletar nome, telefone, tipo de móvel e dimensões antes de criar um orçamento.",
      },
      {
        title: "Teste o atendimento",
        description: "Envie uma mensagem de teste para verificar se tudo está funcionando corretamente.",
        tip: "Peça para um amigo testar também e dar feedback."
      }
    ]
  },
  {
    id: 2,
    slug: "criar-orcamento-otavio",
    title: "Criando orçamentos automáticos com o Otávio",
    description: "Configure tabelas de preços e deixe o Otávio fazer os cálculos por você.",
    duration: "18 min",
    level: "Intermediário",
    category: "Orçamento",
    gradient: "from-violet-500/80 to-primary/80",
    steps: [
      {
        title: "Configure sua tabela de materiais",
        description: "Cadastre os materiais que você usa com frequência: MDF, ferragens, acabamentos. Inclua o preço atualizado de cada um.",
        tip: "Atualize os preços mensalmente para manter os orçamentos precisos."
      },
      {
        title: "Defina o custo da mão de obra",
        description: "Configure o valor da sua hora de trabalho ou de cada serviço específico (corte, montagem, instalação).",
      },
      {
        title: "Configure as margens de lucro",
        description: "Defina margens diferentes para cada tipo de projeto: móveis simples, médios e complexos.",
        tip: "Projetos mais complexos devem ter margens maiores."
      },
      {
        title: "Cadastre modelos de móveis",
        description: "Crie templates para os móveis mais pedidos: armário de cozinha, guarda-roupa, painel de TV.",
      },
      {
        title: "Conecte com a Clara",
        description: "Configure para que a Clara envie automaticamente os orçamentos calculados pelo Otávio.",
        tip: "Os clientes ficam impressionados com a rapidez!"
      },
      {
        title: "Personalize o layout do orçamento",
        description: "Adicione sua logo, dados de contato e condições de pagamento ao modelo de orçamento.",
      }
    ]
  },
  {
    id: 3,
    slug: "agenda-lucas",
    title: "Organizando sua agenda com o Lucas",
    description: "Nunca mais perca uma visita ou compromisso com seu assistente de agenda.",
    duration: "10 min",
    level: "Iniciante",
    category: "Agenda",
    gradient: "from-primary to-violet-600/80",
    steps: [
      {
        title: "Conecte sua agenda",
        description: "Sincronize o Lucas com o Google Agenda ou outro calendário que você já usa.",
        tip: "A sincronização é automática e em tempo real."
      },
      {
        title: "Configure os tipos de compromisso",
        description: "Defina categorias: visita técnica, medição, instalação, reunião.",
      },
      {
        title: "Defina sua disponibilidade",
        description: "Configure os dias e horários em que você pode agendar visitas.",
        tip: "Deixe tempo entre os compromissos para deslocamento."
      },
      {
        title: "Configure lembretes automáticos",
        description: "O Lucas pode enviar lembretes aos clientes um dia antes e uma hora antes do compromisso.",
      },
      {
        title: "Ative a reagendamento automático",
        description: "Permita que clientes reagendem diretamente com o Lucas, sem precisar falar com você.",
      }
    ]
  },
  {
    id: 4,
    slug: "controle-financeiro-helena",
    title: "Controle financeiro completo com a Helena",
    description: "Acompanhe receitas, despesas e lucro real da sua prestação de serviços.",
    duration: "22 min",
    level: "Avançado",
    category: "Financeiro",
    gradient: "from-violet-600/70 to-primary/90",
    steps: [
      {
        title: "Configure suas categorias de despesa",
        description: "Crie categorias para organizar seus gastos: materiais, aluguel, energia, manutenção, impostos.",
        tip: "Categorias bem definidas facilitam a análise financeira."
      },
      {
        title: "Cadastre suas contas fixas",
        description: "Adicione as despesas recorrentes: aluguel, energia, internet, financiamentos.",
      },
      {
        title: "Configure a integração bancária",
        description: "Conecte sua conta bancária para importar transações automaticamente.",
        tip: "Isso economiza horas de lançamentos manuais."
      },
      {
        title: "Vincule receitas aos projetos",
        description: "Associe cada pagamento recebido ao projeto correspondente para saber o lucro real de cada trabalho.",
      },
      {
        title: "Configure alertas de vencimento",
        description: "A Helena pode avisar quando contas estão próximas do vencimento.",
      },
      {
        title: "Gere relatórios mensais",
        description: "Configure a geração automática de relatórios financeiros todo mês.",
        tip: "Reserve 30 minutos por mês para analisar os relatórios."
      }
    ]
  },
  {
    id: 5,
    slug: "instagram-automatico-zeca",
    title: "Automatizando seu Instagram com o Zeca",
    description: "Crie posts profissionais e mantenha suas redes sempre atualizadas.",
    duration: "15 min",
    level: "Intermediário",
    category: "Marketing",
    gradient: "from-primary/90 to-violet-500/70",
    steps: [
      {
        title: "Conecte sua conta do Instagram",
        description: "Vincule seu perfil do Instagram Business ao Zeca.",
        tip: "Certifique-se de que sua conta é comercial."
      },
      {
        title: "Configure o estilo visual",
        description: "Defina as cores, fontes e estilo que o Zeca deve usar nos posts.",
      },
      {
        title: "Adicione fotos dos seus projetos",
        description: "Faça upload das fotos dos seus móveis finalizados.",
        tip: "Fotos com boa iluminação geram mais engajamento."
      },
      {
        title: "Configure a frequência de posts",
        description: "Defina quantos posts por semana o Zeca deve criar.",
      },
      {
        title: "Revise e aprove os posts",
        description: "O Zeca cria os posts e você aprova antes da publicação.",
        tip: "Você mantém o controle total do que é publicado."
      }
    ]
  },
  {
    id: 6,
    slug: "integrar-whatsapp",
    title: "Integrando o WhatsApp Business à sua conta",
    description: "Passo a passo para conectar seu WhatsApp e começar a atender.",
    duration: "8 min",
    level: "Iniciante",
    category: "Configuração",
    gradient: "from-primary/70 to-primary",
    steps: [
      {
        title: "Baixe o WhatsApp Business",
        description: "Se ainda não tem, baixe o WhatsApp Business na loja de aplicativos.",
        tip: "É gratuito e separado do WhatsApp pessoal."
      },
      {
        title: "Configure o perfil comercial",
        description: "Adicione nome da empresa, descrição, endereço e horário de funcionamento.",
      },
      {
        title: "Acesse as configurações de integração",
        description: "No painel do MandaUmZap, vá em Configurações > Integrações > WhatsApp.",
      },
      {
        title: "Escaneie o QR Code",
        description: "Use o WhatsApp Business para escanear o código exibido na tela.",
        tip: "Mantenha o celular conectado à internet."
      },
      {
        title: "Teste a conexão",
        description: "Envie uma mensagem de teste para confirmar que tudo está funcionando.",
      }
    ]
  },
  {
    id: 7,
    slug: "configurar-pagamentos",
    title: "Configurando formas de pagamento",
    description: "Aprenda a configurar as opções de pagamento que você aceita.",
    duration: "10 min",
    level: "Iniciante",
    category: "Configuração",
    gradient: "from-violet-500/70 to-primary/80",
    steps: [
      {
        title: "Acesse as configurações de pagamento",
        description: "No painel, vá em Configurações > Pagamentos.",
      },
      {
        title: "Cadastre suas formas de pagamento",
        description: "Adicione: PIX, transferência, cartão, boleto, parcelamento.",
        tip: "Quanto mais opções, mais vendas você fecha."
      },
      {
        title: "Configure condições especiais",
        description: "Defina descontos para pagamento à vista ou condições de parcelamento.",
      },
      {
        title: "Adicione suas chaves PIX",
        description: "Cadastre suas chaves PIX para facilitar o recebimento.",
      },
      {
        title: "Configure no orçamento",
        description: "As formas de pagamento aparecerão automaticamente nos orçamentos do Otávio.",
      }
    ]
  },
  {
    id: 8,
    slug: "primeiro-atendimento-ia",
    title: "Seu primeiro atendimento com IA",
    description: "Guia para realizar seu primeiro atendimento automatizado.",
    duration: "6 min",
    level: "Iniciante",
    category: "Atendimento",
    gradient: "from-primary/80 to-violet-600/80",
    steps: [
      {
        title: "Verifique as configurações",
        description: "Confirme que a Clara está ativa e o WhatsApp está conectado.",
      },
      {
        title: "Envie uma mensagem de teste",
        description: "De outro número, envie uma mensagem para seu WhatsApp Business.",
        tip: "Peça para um amigo ou familiar testar."
      },
      {
        title: "Observe a resposta automática",
        description: "Veja como a Clara responde e coleta informações.",
      },
      {
        title: "Acompanhe no painel",
        description: "Todas as conversas aparecem no painel para você acompanhar.",
      },
      {
        title: "Ajuste se necessário",
        description: "Com base no teste, ajuste as respostas e configurações.",
        tip: "Os primeiros ajustes são normais, faz parte do processo."
      }
    ]
  }
];

export const tutorialCategories: TutorialCategory[] = ["Atendimento", "Orçamento", "Agenda", "Financeiro", "Marketing", "Configuração"];
export const tutorialLevels: TutorialLevel[] = ["Iniciante", "Intermediário", "Avançado"];
