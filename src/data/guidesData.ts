export type GuideCategory = "Financeiro" | "Atendimento" | "Gestão" | "Marketing" | "Tecnologia";

export interface Guide {
  id: number;
  slug: string;
  title: string;
  description: string;
  pages: number;
  category: GuideCategory;
  downloadable: boolean;
  gradient: string;
  icon: string;
  content: {
    introduction: string;
    chapters: {
      title: string;
      content: string;
    }[];
    conclusion: string;
  };
}

export const guides: Guide[] = [
  {
    id: 1,
    slug: "guia-completo-precificacao",
    title: "Guia Completo de Precificação para prestação de serviçoss",
    description: "Tudo que você precisa saber para precificar seus projetos corretamente e aumentar sua margem de lucro.",
    pages: 32,
    category: "Financeiro",
    downloadable: true,
    gradient: "from-primary/80 to-violet-500/80",
    icon: "💰",
    content: {
      introduction: "A precificação correta é o coração de uma prestação de serviços lucrativa. Este guia vai te ensinar passo a passo como calcular o preço justo dos seus projetos, garantindo lucro sem perder competitividade.",
      chapters: [
        {
          title: "Capítulo 1: Os fundamentos da precificação",
          content: "Entenda os três pilares: custo dos materiais, custo da mão de obra e custos indiretos. Muitos prestadores de serviço cometem o erro de calcular apenas o material, esquecendo fatores cruciais como energia, aluguel e seu próprio salário."
        },
        {
          title: "Capítulo 2: Calculando o custo dos materiais",
          content: "Aprenda a fazer o levantamento completo de materiais para cada projeto: chapas, ferragens, acabamentos e consumíveis. Inclua uma margem de 5-10% para desperdícios."
        },
        {
          title: "Capítulo 3: Precificando sua mão de obra",
          content: "Descubra quanto vale sua hora de trabalho. Considere não apenas o tempo na bancada, mas também projeto, atendimento e instalação. Fórmula prática: (Salário desejado + Encargos) ÷ Horas trabalhadas = Valor hora."
        },
        {
          title: "Capítulo 4: Custos fixos e variáveis",
          content: "Saiba como distribuir aluguel, energia, ferramentas e manutenção entre seus projetos. Use a fórmula: Custo fixo mensal ÷ Número de projetos = Custo fixo por projeto."
        },
        {
          title: "Capítulo 5: Definindo sua margem de lucro",
          content: "A margem não é lucro, é segurança. Projetos simples: 25-35%. Projetos médios: 35-45%. Projetos complexos: 45-60%. Nunca aceite menos de 20%."
        },
        {
          title: "Capítulo 6: Impostos e tributação",
          content: "MEI, Simples Nacional ou Lucro Presumido? Entenda qual regime é melhor para sua prestação de serviços e como incluir os impostos no preço final."
        },
        {
          title: "Capítulo 7: Negociando sem perder margem",
          content: "Técnicas para negociar sem dar desconto: pacotes, condições de pagamento, prazo de entrega. O cliente quer valor, não necessariamente preço baixo."
        }
      ],
      conclusion: "Com uma precificação correta, você trabalha com tranquilidade, sabendo que cada projeto está contribuindo para o crescimento da sua prestação de serviços. Use o Otávio do MandaUmZap para automatizar esses cálculos."
    }
  },
  {
    id: 2,
    slug: "manual-atendimento-whatsapp",
    title: "Manual de Atendimento pelo WhatsApp",
    description: "Scripts, templates e boas práticas para converter mais clientes através do WhatsApp.",
    pages: 18,
    category: "Atendimento",
    downloadable: true,
    gradient: "from-violet-500/80 to-primary/80",
    icon: "💬",
    content: {
      introduction: "O WhatsApp é o principal canal de vendas para prestação de serviçoss. Neste manual, você vai encontrar scripts prontos, templates de mensagens e técnicas de atendimento que convertem curiosos em clientes.",
      chapters: [
        {
          title: "Capítulo 1: Configurando o WhatsApp Business",
          content: "Perfil profissional completo: foto, nome, descrição, endereço e horário. Configure catálogo de produtos e respostas automáticas."
        },
        {
          title: "Capítulo 2: A primeira mensagem perfeita",
          content: "Script de boas-vindas que gera confiança e coleta informações. Modelo: 'Olá! Sou [nome] da [prestação de serviços]. Obrigado pelo contato! Para te ajudar melhor, me conta: qual móvel você está procurando?'"
        },
        {
          title: "Capítulo 3: Perguntas que qualificam",
          content: "As 5 perguntas essenciais: tipo de móvel, ambiente, dimensões aproximadas, prazo desejado e orçamento disponível. Como perguntar sem parecer invasivo."
        },
        {
          title: "Capítulo 4: Enviando o orçamento",
          content: "Formato ideal do orçamento: visual, detalhado e com opções. Sempre envie em PDF profissional, nunca só texto."
        },
        {
          title: "Capítulo 5: Follow-up que não irrita",
          content: "Sequência de follow-up: 3 dias, 7 dias, 15 dias. Mensagens que reengajam sem parecer desespero."
        },
        {
          title: "Capítulo 6: Fechando a venda",
          content: "Técnicas de fechamento: urgência real, benefícios exclusivos, facilitação de pagamento. Sempre termine com um CTA claro."
        }
      ],
      conclusion: "Um bom atendimento pelo WhatsApp pode dobrar sua taxa de conversão. Com a Clara do MandaUmZap, você automatiza o primeiro atendimento e nunca perde um lead."
    }
  },
  {
    id: 3,
    slug: "checklist-organizacao-prestação de serviços",
    title: "Checklist de Organização da prestação de serviços",
    description: "Lista completa para organizar processos, documentos e rotinas da sua prestação de serviços.",
    pages: 12,
    category: "Gestão",
    downloadable: true,
    gradient: "from-primary to-violet-600/80",
    icon: "✅",
    content: {
      introduction: "Uma prestação de serviços organizada produz mais, erra menos e lucra melhor. Use este checklist para estruturar todos os processos do seu negócio.",
      chapters: [
        {
          title: "Checklist 1: Documentação básica",
          content: "☐ CNPJ ativo ☐ Alvará de funcionamento ☐ Inscrição estadual ☐ Certificado de regularidade ☐ Contrato social atualizado ☐ Licenças ambientais"
        },
        {
          title: "Checklist 2: Financeiro",
          content: "☐ Conta bancária PJ ☐ Sistema de controle financeiro ☐ Fluxo de caixa atualizado ☐ DRE mensal ☐ Reserva de emergência ☐ Contador contratado"
        },
        {
          title: "Checklist 3: Produção",
          content: "☐ Layout otimizado da oficina ☐ Manutenção preventiva das máquinas ☐ Estoque mínimo definido ☐ Fornecedores homologados ☐ Checklist de qualidade"
        },
        {
          title: "Checklist 4: Comercial",
          content: "☐ Portfólio atualizado ☐ Tabela de preços vigente ☐ Modelo de orçamento profissional ☐ Contrato de prestação de serviços ☐ Termo de entrega"
        },
        {
          title: "Checklist 5: Digital",
          content: "☐ Google Meu Negócio ☐ Instagram Business ☐ WhatsApp Business ☐ Sistema de CRM ☐ Backup de arquivos"
        }
      ],
      conclusion: "Organização não é burocracia, é eficiência. Marque cada item e transforme sua prestação de serviços em uma empresa profissional."
    }
  },
  {
    id: 4,
    slug: "guia-marketing-digital-prestadores de serviço",
    title: "Guia de Marketing Digital para prestadores de serviço",
    description: "Estratégias práticas para atrair mais clientes usando Instagram, Google e WhatsApp.",
    pages: 28,
    category: "Marketing",
    downloadable: true,
    gradient: "from-violet-600/70 to-primary/90",
    icon: "📱",
    content: {
      introduction: "O marketing digital nivelou o jogo. Uma prestação de serviços pequena pode competir com grandes empresas tendo a estratégia certa. Este guia ensina tudo que você precisa saber.",
      chapters: [
        {
          title: "Capítulo 1: Fundamentos do marketing digital",
          content: "Entenda o funil: atração (redes sociais), consideração (portfólio), conversão (WhatsApp). Cada etapa precisa de conteúdo específico."
        },
        {
          title: "Capítulo 2: Instagram que vende",
          content: "Perfil otimizado, conteúdo que engaja, hashtags estratégicas. Frequência ideal: 4 posts no feed e stories diários."
        },
        {
          title: "Capítulo 3: Google Meu Negócio",
          content: "Como aparecer no Google Maps e nas buscas locais. Peça avaliações, responda comentários, mantenha informações atualizadas."
        },
        {
          title: "Capítulo 4: WhatsApp como ferramenta de venda",
          content: "Status para divulgação, listas de transmissão, catálogo de produtos. Converta curiosos em clientes."
        },
        {
          title: "Capítulo 5: Conteúdo que atrai",
          content: "O que postar: projetos finalizados, bastidores, antes/depois, dicas rápidas, depoimentos. Calendário editorial simplificado."
        },
        {
          title: "Capítulo 6: Anúncios pagos básicos",
          content: "Quando e como investir em tráfego pago. Comece com R$10/dia focando na sua região."
        }
      ],
      conclusion: "Marketing digital é um investimento, não um custo. Com consistência, você constrói uma marca forte que atrai clientes automaticamente."
    }
  },
  {
    id: 5,
    slug: "planilha-controle-projetos",
    title: "Planilha de Controle de Projetos",
    description: "Template pronto para acompanhar todos os seus projetos, prazos e pagamentos.",
    pages: 8,
    category: "Gestão",
    downloadable: true,
    gradient: "from-primary/90 to-violet-500/70",
    icon: "📊",
    content: {
      introduction: "Controlar projetos de forma visual evita atrasos, esquecimentos e prejuízos. Esta planilha tem tudo que você precisa para manter o controle total.",
      chapters: [
        {
          title: "Aba 1: Projetos em andamento",
          content: "Campos: Cliente, Projeto, Data início, Prazo, Status, Responsável, Observações. Use cores para identificar urgências."
        },
        {
          title: "Aba 2: Cronograma de produção",
          content: "Visualize semana por semana o que precisa ser feito. Evite sobrecarga e atrasos."
        },
        {
          title: "Aba 3: Controle financeiro por projeto",
          content: "Custo previsto vs realizado. Identifique projetos que deram prejuízo e entenda o motivo."
        },
        {
          title: "Aba 4: Fornecedores e materiais",
          content: "Cadastro de fornecedores, prazos de entrega, condições de pagamento. Nunca fique sem material."
        }
      ],
      conclusion: "Uma planilha bem usada vale mais que um software caro. Mas se quiser automatizar, o MandaUmZap faz tudo isso por você."
    }
  },
  {
    id: 6,
    slug: "guia-integracao-ia",
    title: "Guia de Integração com IA",
    description: "Passo a passo para configurar todos os agentes e automatizar sua prestação de serviços.",
    pages: 24,
    category: "Tecnologia",
    downloadable: true,
    gradient: "from-primary/70 to-primary",
    icon: "🤖",
    content: {
      introduction: "A inteligência artificial do MandaUmZap pode economizar até 6 horas por dia do seu tempo. Este guia ensina como configurar cada agente para máxima eficiência.",
      chapters: [
        {
          title: "Capítulo 1: Entendendo os agentes",
          content: "Clara (atendimento), Otávio (orçamentos), Lucas (agenda), Helena (financeiro), Zeca (marketing). Cada um é especialista na sua área."
        },
        {
          title: "Capítulo 2: Configuração inicial",
          content: "Passo a passo para criar sua conta, conectar WhatsApp e fazer as configurações básicas de cada agente."
        },
        {
          title: "Capítulo 3: Personalizando a Clara",
          content: "Mensagens de boas-vindas, respostas automáticas, coleta de informações. Faça a Clara falar com a sua cara."
        },
        {
          title: "Capítulo 4: Calibrando o Otávio",
          content: "Tabela de materiais, custos de mão de obra, margens de lucro. Orçamentos precisos em segundos."
        },
        {
          title: "Capítulo 5: Organizando com o Lucas",
          content: "Sincronização de agenda, lembretes automáticos, confirmação de visitas. Nunca mais esqueça um compromisso."
        },
        {
          title: "Capítulo 6: Finanças com a Helena",
          content: "Categorias de despesa, controle de recebimentos, relatórios automáticos. Saiba seu lucro real."
        },
        {
          title: "Capítulo 7: Marketing com o Zeca",
          content: "Conexão com Instagram, estilo visual, frequência de posts. Redes sociais no piloto automático."
        }
      ],
      conclusion: "Com todos os agentes configurados, sua prestação de serviços funciona mesmo quando você não está trabalhando. Bem-vindo ao futuro."
    }
  }
];

export const guideCategories: GuideCategory[] = ["Financeiro", "Atendimento", "Gestão", "Marketing", "Tecnologia"];
