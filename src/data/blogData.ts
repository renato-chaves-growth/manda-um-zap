export type BlogCategory = "Orçamento" | "Atendimento" | "Tecnologia" | "Gestão" | "Vendas" | "Marketing";

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category: BlogCategory;
  featured?: boolean;
  author: {
    name: string;
    role: string;
  };
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "como-precificar-projeto-prestação de serviços",
    title: "Como precificar um projeto de prestação de serviços sem errar",
    excerpt: "Aprenda a calcular custos, margem e tempo de forma simples e profissional. Neste guia completo, você vai descobrir as melhores práticas do mercado.",
    content: `
## Por que precificar corretamente é essencial?

A precificação correta é a diferença entre uma prestação de serviços lucrativa e uma que apenas sobrevive. Muitos prestadores de serviço cometem o erro de calcular apenas o custo dos materiais, esquecendo de fatores cruciais como mão de obra, tempo de projeto e margem de lucro.

## Os 5 pilares da precificação

### 1. Custo dos Materiais
Faça um levantamento completo de todos os materiais que serão utilizados:
- MDF, compensado, madeira maciça
- Ferragens (dobradiças, corrediças, puxadores)
- Acabamentos (fitas de borda, verniz, tinta)
- Cola, parafusos e outros consumíveis

### 2. Custo da Mão de Obra
Calcule quantas horas você e sua equipe vão dedicar ao projeto:
- Tempo de corte e montagem
- Tempo de acabamento
- Tempo de instalação

### 3. Custos Fixos
Não esqueça de incluir uma parcela dos custos fixos:
- Aluguel da oficina
- Energia elétrica
- Manutenção de equipamentos
- Internet e telefone

### 4. Margem de Lucro
A margem de lucro deve ser calculada sobre o custo total:
- Projetos simples: 25-35%
- Projetos médios: 35-45%
- Projetos complexos: 45-60%

### 5. Impostos
Lembre-se de incluir os impostos no seu preço final.

## Fórmula prática

**Preço Final = (Materiais + Mão de Obra + Custos Fixos) × (1 + Margem) × (1 + Impostos)**

## Dica do Otávio

Com o assistente de orçamentos do MandaUmZap, você pode automatizar esses cálculos. Basta informar o tipo de móvel, dimensões e acabamentos, e o Otávio calcula tudo para você em segundos.
    `,
    date: "20 Jan 2026",
    readTime: "8 min",
    category: "Orçamento",
    featured: true,
    author: {
      name: "Equipe MandaUmZap",
      role: "Especialistas em prestação de serviços"
    }
  },
  {
    id: 2,
    slug: "whatsapp-para-prestadores de serviço",
    title: "WhatsApp para prestadores de serviço: como usar sem perder tempo",
    excerpt: "Dicas práticas para atender clientes pelo WhatsApp de forma organizada e profissional.",
    content: `
## O desafio do WhatsApp na prestação de serviços

O WhatsApp se tornou o principal canal de comunicação para prestadores de serviço. Mas sem organização, ele pode consumir horas do seu dia produtivo.

## Problemas comuns

- Mensagens não respondidas que viram clientes perdidos
- Dificuldade em encontrar conversas antigas
- Confusão entre orçamentos e projetos
- Clientes impacientes com demora nas respostas

## 7 dicas para organizar seu WhatsApp

### 1. Use o WhatsApp Business
O WhatsApp Business oferece recursos profissionais gratuitos como catálogo de produtos, respostas automáticas e etiquetas.

### 2. Crie respostas rápidas
Configure mensagens prontas para perguntas frequentes:
- Horário de funcionamento
- Prazo médio de entrega
- Lista de documentos para orçamento

### 3. Use etiquetas
Organize suas conversas com etiquetas coloridas:
- 🟢 Novo contato
- 🟡 Aguardando orçamento
- 🔵 Projeto aprovado
- 🟣 Em produção
- ⚪ Entregue

### 4. Defina horários de resposta
Não precisa responder imediatamente. Defina janelas de tempo para checar mensagens.

### 5. Peça informações completas
Crie uma mensagem padrão pedindo todas as informações necessárias de uma vez.

### 6. Use listas de transmissão
Para avisar vários clientes sobre promoções ou novidades.

### 7. Automatize com a Clara
A Clara do MandaUmZap pode responder seus clientes 24 horas por dia, tirando dúvidas básicas e coletando informações para orçamento.
    `,
    date: "15 Jan 2026",
    readTime: "5 min",
    category: "Atendimento",
    author: {
      name: "Equipe MandaUmZap",
      role: "Especialistas em prestação de serviços"
    }
  },
  {
    id: 3,
    slug: "inteligencia-artificial-prestação de serviços",
    title: "Inteligência artificial na prestação de serviços: o que já é possível",
    excerpt: "Descubra como a IA pode ajudar no dia a dia da sua prestação de serviços e aumentar sua produtividade.",
    content: `
## A revolução silenciosa da IA

A inteligência artificial não é mais coisa de filme. Ela já está presente no dia a dia de milhares de prestação de serviçoss brasileiras, automatizando tarefas e aumentando a produtividade.

## O que a IA pode fazer hoje

### Atendimento automatizado
Assistentes de IA podem responder clientes pelo WhatsApp, tirar dúvidas sobre preços e prazos, e coletar informações para orçamentos.

### Criação de orçamentos
Sistemas inteligentes podem calcular custos de materiais, mão de obra e margem de lucro automaticamente.

### Gestão de agenda
A IA pode organizar sua agenda de visitas, enviar lembretes aos clientes e remarcar compromissos.

### Controle financeiro
Assistentes podem registrar receitas e despesas, gerar relatórios e alertar sobre contas a vencer.

### Marketing digital
A IA pode criar posts para redes sociais, sugerir legendas e até gerar imagens de projetos.

## O MandaUmZap na prática

O MandaUmZap reúne 5 assistentes especializados que trabalham juntos para automatizar sua prestação de serviços:

- **Clara** - Atendimento 24h pelo WhatsApp
- **Otávio** - Orçamentos automáticos
- **Lucas** - Gestão de agenda
- **Helena** - Controle financeiro
- **Zeca** - Marketing no Instagram

## O futuro da prestação de serviços

Em breve, a IA poderá:
- Gerar projetos 3D a partir de descrições
- Otimizar cortes de chapas automaticamente
- Prever demanda e sugerir estoque ideal
- Identificar tendências de mercado

O prestador de serviço que adotar a tecnologia hoje estará à frente da concorrência amanhã.
    `,
    date: "10 Jan 2026",
    readTime: "6 min",
    category: "Tecnologia",
    author: {
      name: "Equipe MandaUmZap",
      role: "Especialistas em prestação de serviços"
    }
  },
  {
    id: 4,
    slug: "gestao-financeira-prestação de serviços",
    title: "Gestão financeira para prestação de serviçoss: o guia definitivo",
    excerpt: "Controle seu fluxo de caixa, margem de lucro e custos de forma simples e eficiente.",
    content: `
## Por que sua prestação de serviços precisa de gestão financeira?

Muitos prestadores de serviço são excelentes técnicos, mas têm dificuldade com números. O resultado? Trabalham muito, mas no final do mês não sabem se tiveram lucro ou prejuízo.

## Os 3 pilares da saúde financeira

### 1. Fluxo de Caixa
Saiba exatamente quanto entra e quanto sai:
- Registre todas as receitas
- Registre todas as despesas
- Acompanhe diariamente

### 2. Margem de Lucro Real
Calcule o lucro real de cada projeto:
- Custo total do projeto
- Valor cobrado do cliente
- Lucro líquido (descontando impostos)

### 3. Reserva de Emergência
Tenha pelo menos 3 meses de custos fixos guardados para imprevistos.

## Erros comuns que destroem prestação de serviçoss

### Misturar contas pessoais com as da empresa
Defina um pró-labore fixo e trate o dinheiro da empresa separadamente.

### Não considerar o próprio salário
Você precisa se pagar! Inclua seu salário nos custos do projeto.

### Depender de um único cliente grande
Diversifique sua carteira para não ficar vulnerável.

### Não reservar dinheiro para impostos
Separe uma porcentagem de cada projeto para impostos.

## A Helena pode ajudar

A Helena, assistente financeira do MandaUmZap, registra todas as suas transações automaticamente, gera relatórios mensais e alerta sobre contas a vencer.
    `,
    date: "5 Jan 2026",
    readTime: "10 min",
    category: "Gestão",
    author: {
      name: "Equipe MandaUmZap",
      role: "Especialistas em prestação de serviços"
    }
  },
  {
    id: 5,
    slug: "como-vender-mais-prestação de serviços",
    title: "Como vender mais na sua prestação de serviços em 2026",
    excerpt: "Estratégias comprovadas para aumentar suas vendas e conquistar mais clientes.",
    content: `
## O cenário do mercado em 2026

O mercado de móveis planejados continua aquecido, mas a concorrência também aumentou. Para se destacar, você precisa de estratégias inteligentes.

## 10 estratégias para vender mais

### 1. Presença digital forte
Tenha perfis atualizados no Instagram e Google Meu Negócio.

### 2. Portfólio visual
Fotografe todos os seus projetos com boa iluminação.

### 3. Depoimentos de clientes
Peça avaliações e depoimentos em vídeo.

### 4. Resposta rápida
Quem responde primeiro, vende mais. Use automação.

### 5. Orçamentos profissionais
Envie orçamentos detalhados e visualmente atraentes.

### 6. Follow-up estruturado
Não desista após o primeiro contato. Faça follow-up.

### 7. Indicações
Crie um programa de indicações com recompensas.

### 8. Parcerias
Faça parcerias com arquitetos, designers e construtoras.

### 9. Especialização
Seja conhecido por algo específico (cozinhas, closets, etc).

### 10. Pós-venda
Acompanhe o cliente após a entrega. Clientes satisfeitos voltam.

## Automatize para crescer

Com o MandaUmZap, você pode automatizar atendimento, orçamentos e follow-up, liberando tempo para focar no que realmente importa: criar móveis incríveis.
    `,
    date: "1 Jan 2026",
    readTime: "7 min",
    category: "Vendas",
    author: {
      name: "Equipe MandaUmZap",
      role: "Especialistas em prestação de serviços"
    }
  },
  {
    id: 6,
    slug: "ferramentas-essenciais-prestador de serviço",
    title: "Ferramentas essenciais para o prestador de serviço moderno",
    excerpt: "Conheça as ferramentas físicas e digitais que todo prestador de serviço precisa ter.",
    content: `
## Ferramentas físicas indispensáveis

### Corte
- Serra circular de bancada
- Serra tico-tico
- Tupia (manual e de bancada)
- Esquadrejadeira

### Montagem
- Furadeira/parafusadeira
- Grampos de pressão
- Martelo de borracha
- Nível a laser

### Acabamento
- Lixadeira orbital
- Compressor e pistola de pintura
- Plaina elétrica

## Ferramentas digitais essenciais

### Projeto
- SketchUp ou Promob
- AutoCAD (para projetos técnicos)

### Gestão
- Planilhas ou ERP simples
- Aplicativo de notas
- Calendário digital

### Marketing
- Canva para artes
- Instagram para portfólio
- Google Meu Negócio

### Automação
- MandaUmZap para atendimento, orçamentos e gestão

## Investimento x Retorno

Não economize em ferramentas que aumentam sua produtividade. Uma boa ferramenta se paga rapidamente pelo tempo que economiza.

## A ferramenta mais poderosa

A ferramenta mais poderosa do prestador de serviço moderno é a automação. Com o MandaUmZap, você ganha horas por dia que antes eram perdidas com tarefas repetitivas.
    `,
    date: "28 Dez 2025",
    readTime: "6 min",
    category: "Tecnologia",
    author: {
      name: "Equipe MandaUmZap",
      role: "Especialistas em prestação de serviços"
    }
  },
  {
    id: 7,
    slug: "instagram-para-prestadores de serviço-guia-completo",
    title: "Instagram para prestadores de serviço: guia completo 2026",
    excerpt: "Aprenda a usar o Instagram para atrair clientes e mostrar seus projetos de forma profissional.",
    content: `
## Por que o Instagram é essencial?

O Instagram é a principal vitrine digital para prestadores de serviço. É onde seus clientes buscam inspiração e avaliam seu trabalho antes de entrar em contato.

## Configurando seu perfil

### Bio otimizada
- Nome: Seu nome + "prestação de serviços"
- Username: fácil de lembrar e digitar
- Bio: O que você faz + Cidade + CTA
- Link: WhatsApp ou site

### Destaques organizados
- Portfólio por ambiente (cozinha, quarto, etc)
- Processo de trabalho
- Depoimentos
- Antes e depois

## Conteúdo que converte

### Tipos de posts
- Projetos finalizados (fotos profissionais)
- Antes e depois
- Bastidores da oficina
- Dicas rápidas
- Depoimentos de clientes

### Frequência ideal
- Feed: 3-4 posts por semana
- Stories: diários
- Reels: 2-3 por semana

## O Zeca pode ajudar

O Zeca, assistente de marketing do MandaUmZap, cria posts e legendas automaticamente, sugere hashtags e mantém seu perfil sempre atualizado.
    `,
    date: "22 Dez 2025",
    readTime: "9 min",
    category: "Marketing",
    author: {
      name: "Equipe MandaUmZap",
      role: "Especialistas em prestação de serviços"
    }
  },
  {
    id: 8,
    slug: "como-fidelizar-clientes-prestação de serviços",
    title: "Como fidelizar clientes na prestação de serviços",
    excerpt: "Estratégias para transformar clientes únicos em compradores recorrentes e promotores da sua marca.",
    content: `
## O valor de um cliente fidelizado

Conquistar um novo cliente custa 5 a 7 vezes mais do que manter um existente. Clientes fiéis compram mais, indicam mais e reclamam menos.

## Estratégias de fidelização

### Durante o projeto
- Comunicação transparente sobre prazos
- Atualizações regulares com fotos
- Cumprimento do combinado

### Na entrega
- Instalação impecável
- Limpeza do ambiente
- Explicação sobre uso e manutenção

### Pós-venda
- Contato após 30 dias
- Assistência técnica ágil
- Lembrança em datas especiais

## Programa de indicações

Crie um programa simples:
- Cliente indica → ganha desconto no próximo projeto
- Indicado fecha → ambos ganham bônus

## A Helena registra tudo

Com a Helena do MandaUmZap, você mantém o histórico completo de cada cliente, facilitando o acompanhamento e o pós-venda personalizado.
    `,
    date: "18 Dez 2025",
    readTime: "5 min",
    category: "Vendas",
    author: {
      name: "Equipe MandaUmZap",
      role: "Especialistas em prestação de serviços"
    }
  }
];

export const categories: BlogCategory[] = ["Orçamento", "Atendimento", "Tecnologia", "Gestão", "Vendas", "Marketing"];
