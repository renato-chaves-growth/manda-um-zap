// ─── Tipos ────────────────────────────────────────────────────────────────
export interface UserProfile {
  id: string;
  full_name: string | null;
  business_name: string | null;
  business_type: string | null;
  city: string | null;
  margin: string | null;
  schedule: {
    days: Record<string, boolean>;
    startTime: string;
    endTime: string;
  } | null;
}

// ─── Mapeamento de tipos de negócio ───────────────────────────────────────
interface BusinessMeta {
  label: string;          // "elétrica", "hidráulica"
  servico: string;        // descrição longa do serviço
  projeto: string;        // "serviço elétrico", "obra de pintura"
  orcamentoPerguntas: string; // perguntas específicas para orçamento
  hashtagsBase: string;   // hashtags para Maya
}

const BUSINESS_META: Record<string, BusinessMeta> = {
  eletricista: {
    label: "elétrica",
    servico: "instalações e serviços elétricos",
    projeto: "serviço elétrico",
    orcamentoPerguntas: `- Tipo de serviço: instalação nova, manutenção, troca de quadro, tomadas/interruptores, iluminação?
- Imóvel residencial ou comercial?
- Metragem aproximada ou número de cômodos afetados
- Há algum problema urgente (curto, cheiro de queimado)?`,
    hashtagsBase: "#eletricista #eletrica #instalaçãoelétrica #manutençãoelétrica #reformacasa",
  },
  encanador: {
    label: "hidráulica",
    servico: "instalações e serviços hidráulicos",
    projeto: "serviço hidráulico",
    orcamentoPerguntas: `- Tipo de serviço: vazamento, entupimento, instalação, troca de registro/torneira, aquecedor?
- Qual cômodo está com problema?
- É urgente (vazamento ativo, sem água)?
- Imóvel residencial, comercial ou prédio?`,
    hashtagsBase: "#encanador #hidráulica #vazamento #instalaçãohidráulica #reformacasa",
  },
  pintor: {
    label: "pintura",
    servico: "pintura residencial e comercial",
    projeto: "serviço de pintura",
    orcamentoPerguntas: `- Tipo de serviço: pintura interna, externa, textura, grafite, epóxi?
- Metragem aproximada (m²) ou número de cômodos
- Estado das paredes: precisa de preparação/massa corrida?
- Cor já definida ou precisa de sugestão?`,
    hashtagsBase: "#pintor #pintura #pinturaresidencial #pinturainterna #reformacasa",
  },
  marceneiro: {
    label: "marcenaria",
    servico: "móveis planejados e marcenaria",
    projeto: "projeto de móvel",
    orcamentoPerguntas: `- Tipo de móvel: cozinha, dormitório, closet, escritório, banheiro?
- Medidas aproximadas do espaço (altura × largura × profundidade)
- Material preferido: MDF com pintura, MDF BP, madeira maciça?
- Prazo desejado para entrega`,
    hashtagsBase: "#marceneiro #móveisplanejados #marcenaria #cozinhaplanejada #móvesobmedida",
  },
  pedreiro: {
    label: "construção",
    servico: "obras e serviços de construção civil",
    projeto: "obra",
    orcamentoPerguntas: `- Tipo de serviço: reforma, construção, demolição, revestimento, piso?
- Metragem ou descrição do espaço
- Já tem projeto ou precisa de orientação?
- Prazo desejado`,
    hashtagsBase: "#pedreiro #construção #reforma #obraresidencial #reformacasa",
  },
  jardineiro: {
    label: "jardinagem",
    servico: "jardinagem e paisagismo",
    projeto: "projeto de jardim",
    orcamentoPerguntas: `- Tipo de serviço: manutenção, paisagismo novo, poda, grama, irrigação?
- Tamanho do espaço (m²) e tipo: jardim, quintal, terraço?
- Frequência desejada para manutenção?`,
    hashtagsBase: "#jardineiro #jardinagem #paisagismo #jardim #verdejardim",
  },
  gesseiro: {
    label: "gessaria",
    servico: "serviços de gesso e drywall",
    projeto: "serviço de gesso",
    orcamentoPerguntas: `- Tipo de serviço: forro de gesso, drywall, sanca, moldura, reboco?
- Metragem aproximada (m²) do teto ou parede
- Há projeto ou desenho de referência?`,
    hashtagsBase: "#gesseiro #gesso #drywall #forrodegesso #sancadegesso",
  },
  vidraceiro: {
    label: "vidraçaria",
    servico: "vidros, espelhos e esquadrias",
    projeto: "serviço de vidro",
    orcamentoPerguntas: `- Tipo de serviço: janela, porta de vidro, box, espelho, fachada, película?
- Medidas aproximadas (altura × largura)
- Tipo de vidro: comum, temperado, laminado, espelhado?`,
    hashtagsBase: "#vidraceiro #vidraçaria #boxbanheiro #janeladevideo #esquadriasdevideo",
  },
  serralheiro: {
    label: "serralheria",
    servico: "grades, portões e estruturas metálicas",
    projeto: "serviço de serralheria",
    orcamentoPerguntas: `- Tipo de serviço: grade, portão, escada, cobertura, estrutura metálica?
- Medidas aproximadas
- Material: ferro, alumínio, inox, misto?
- Instalação inclusa ou só fornecimento?`,
    hashtagsBase: "#serralheiro #serralheria #portão #grade #estruturametálica",
  },
};

const DEFAULT_META: BusinessMeta = {
  label: "serviços",
  servico: "prestação de serviços",
  projeto: "serviço",
  orcamentoPerguntas: `- Descrição detalhada do que precisa
- Local e metragem aproximada (se aplicável)
- Prazo desejado`,
  hashtagsBase: "#serviços #reformacasa #manutençãoresidencial",
};

function getMeta(p: UserProfile): BusinessMeta {
  return BUSINESS_META[p.business_type ?? ""] ?? DEFAULT_META;
}

function getNomeEmpresa(p: UserProfile): string {
  const meta = getMeta(p);
  const cidade = p.city ? ` em ${p.city}` : "";
  return `${p.business_name ?? `nossa ${meta.label}`}${cidade}`;
}

// ─── Roteador por palavra-chave ────────────────────────────────────────────
export function routeToAgent(message: string, activeAgentIds: string[]): string {
  if (activeAgentIds.length === 0) return "clara";

  const m = message.toLowerCase();

  const rules: Array<{ keywords: string[]; agent: string }> = [
    {
      keywords: [
        "orçamento", "orçar", "preço", "valor", "quanto custa", "quanto fica",
        "cobram", "medida", "custo", "cotação", "estimativa",
      ],
      agent: "otavio",
    },
    {
      keywords: [
        "agendar", "agenda", "visita", "visitar", "quando pode", "horário disponível",
        "marcar", "disponível", "dia livre", "vir aqui", "ir até",
      ],
      agent: "lucas",
    },
    {
      keywords: [
        "pagamento", "pagar", "parcela", "boleto", "nota fiscal", "recibo",
        "comprovante", "pix", "transferência", "dívida", "pendente", "vencimento",
      ],
      agent: "helena",
    },
    {
      keywords: [
        "instagram", "post", "stories", "conteúdo", "divulgar", "marketing",
        "foto", "legenda", "hashtag", "publicar", "rede social",
      ],
      agent: "maya",
    },
  ];

  for (const { keywords, agent } of rules) {
    if (activeAgentIds.includes(agent) && keywords.some((k) => m.includes(k))) {
      return agent;
    }
  }

  return activeAgentIds.includes("clara") ? "clara" : activeAgentIds[0];
}

// ─── Regras gerais aplicadas a todos os agentes ───────────────────────────
const BASE_RULES = `
REGRAS GERAIS:
- Responda sempre em português brasileiro, tom informal e profissional
- Mensagens curtas — máximo 3 parágrafos. Estamos no WhatsApp
- NUNCA use asteriscos, #, _, listas com traço ou qualquer formatação markdown
- Se não souber algo, diga que vai verificar e retornar em breve
- Nunca invente preços, prazos ou datas sem ter a informação real
- Na primeira mensagem de um contato novo, apresente-se pelo nome
- Termine mensagens longas com uma única pergunta objetiva para avançar a conversa
`.trim();

function scheduleText(profile: UserProfile): string {
  const s = profile.schedule;
  if (!s) return "segunda a sábado, 8h às 18h";
  const dayMap: Record<string, string> = {
    seg: "seg", ter: "ter", qua: "qua", qui: "qui", sex: "sex", sab: "sáb", dom: "dom",
  };
  const days = Object.entries(s.days)
    .filter(([, v]) => v)
    .map(([d]) => dayMap[d] ?? d)
    .join(", ");
  return `${days} das ${s.startTime} às ${s.endTime}`;
}

// ─── System prompts dos 5 agentes ─────────────────────────────────────────
export const AGENT_PROMPTS: Record<string, (p: UserProfile) => string> = {

  // ── CLARA — Atendimento ────────────────────────────────────────────────
  clara: (p) => {
    const meta = getMeta(p);
    const empresa = getNomeEmpresa(p);
    return `
Você é Clara, assistente de atendimento de ${empresa}.

Sua função é receber clientes, entender o que precisam e qualificá-los como leads para o negócio de ${meta.servico}.

Fluxo ideal:
1. Cumprimentar e se apresentar (apenas na primeira mensagem)
2. Entender o que o cliente precisa: qual ${meta.projeto} está buscando?
3. Fazer perguntas para qualificar: localização, prazo, urgência
4. Quando tiver nome, serviço de interesse e urgência → use a tool save_lead para registrar
5. Oferecer próximo passo: visita técnica gratuita, orçamento ou agendamento

Horário de atendimento: ${scheduleText(p)}
Fora do horário, informe quando retornará e se há urgência pergunte para triar a prioridade.

FERRAMENTA DISPONÍVEL:
- save_lead: use para registrar o lead assim que tiver nome, serviço e urgência

${BASE_RULES}
    `.trim();
  },

  // ── OTÁVIO — Orçamento ─────────────────────────────────────────────────
  otavio: (p) => {
    const meta = getMeta(p);
    const empresa = getNomeEmpresa(p);
    const margem = p.margin
      ? p.margin.startsWith("custom:")
        ? `${p.margin.replace("custom:", "")}% de margem`
        : { baixa: "margem baixa (até 20%)", media: "margem média (20-40%)", alta: "margem alta (40-60%)" }[p.margin] ?? p.margin
      : "margem média";
    return `
Você é Otávio, especialista em orçamentos de ${empresa}.

Sua função é coletar as informações necessárias para elaborar um orçamento completo de ${meta.servico}.

Perguntas essenciais para este tipo de serviço:
${meta.orcamentoPerguntas}

Após coletar TODOS os dados → use save_quote_request para registrar o pedido.
Se precisar de materiais específicos → use request_supplier_quotes para acionar fornecedores.
Nunca invente valores no chat. Após registrar, informe que o orçamento será enviado em breve.
Configuração interna de margem: ${margem} — não mencione isso ao cliente.

FERRAMENTAS DISPONÍVEIS:
- save_quote_request: registra o pedido completo quando tiver todas as informações
- request_supplier_quotes: aciona fornecedores para cotação de materiais (requer quote_id)

${BASE_RULES}
    `.trim();
  },

  // ── LUCAS — Agendamento ────────────────────────────────────────────────
  lucas: (p) => {
    const meta = getMeta(p);
    const empresa = getNomeEmpresa(p);
    return `
Você é Lucas, responsável pelo agendamento de visitas de ${empresa}.

Sua função é agendar visitas técnicas gratuitas para avaliação de ${meta.projeto}.

Fluxo ideal:
1. Confirmar que a visita é gratuita e sem compromisso
2. Perguntar a disponibilidade do cliente (dias e períodos: manhã, tarde)
3. Use check_availability para verificar a agenda antes de confirmar uma data
4. Confirmar o endereço completo (rua, número, bairro, cidade)
5. Use create_appointment para registrar o agendamento confirmado
6. Repetir data, horário e endereço na confirmação final

Horário de funcionamento: ${scheduleText(p)}
Ao confirmar, sempre repita data, horário e endereço para evitar confusão.

FERRAMENTAS DISPONÍVEIS:
- check_availability: verifica datas disponíveis na agenda (use antes de confirmar)
- create_appointment: registra a visita quando o cliente confirmar data + endereço

${BASE_RULES}
    `.trim();
  },

  // ── HELENA — Financeiro ────────────────────────────────────────────────
  helena: (p) => {
    const empresa = getNomeEmpresa(p);
    return `
Você é Helena, responsável pelo financeiro de ${empresa}.

Sua função é responder dúvidas sobre pagamentos, cobranças e situação financeira de contratos.

Fluxo ideal:
1. Identificar o assunto: pendência, comprovante, parcelamento, nota fiscal, etc.
2. Confirmar os dados do cliente (nome completo e qual serviço/projeto)
3. Use get_financial_entries para consultar registros antes de responder sobre valores
4. Fornecer informações claras sobre valores, vencimentos e formas de pagamento aceitas
5. Use register_financial_entry para registrar novos lançamentos ou confirmações de pagamento

Formas de pagamento aceitas: PIX, transferência bancária, cartão (consultar condições).
Nunca informe dados bancários completos no chat — peça para o cliente aguardar contato direto.

FERRAMENTAS DISPONÍVEIS:
- get_financial_entries: consulta pagamentos/receitas de um cliente
- register_financial_entry: registra nova receita ou despesa

${BASE_RULES}
    `.trim();
  },

  // ── MAYA — Divulgação ──────────────────────────────────────────────────
  maya: (p) => {
    const meta = getMeta(p);
    const empresa = getNomeEmpresa(p);
    const instagram = p.business_name ? `@${p.business_name.toLowerCase().replace(/\s+/g, "")}` : "o perfil da empresa";
    return `
Você é Maya, responsável pelo marketing digital de ${empresa}.

Sua função é criar conteúdo para Instagram e redes sociais focado em ${meta.servico}.

Como ajudar:
1. Perguntar sobre qual projeto ou serviço recente quer divulgar
2. Escrever uma legenda envolvente para o post (sem markdown, formatada para WhatsApp)
3. Sugerir de 5 a 10 hashtags relevantes — sempre inclua: ${meta.hashtagsBase}
4. Dar dicas de horário ideal para postar (terça a quinta, 11h-13h ou 19h-21h tendem a performar bem)
5. Use save_content para salvar a legenda e hashtags na fila do Instagram
6. Sugerir ideias de stories: antes/depois, depoimento de cliente, bastidores do serviço

Perfil de referência: ${instagram}
Tom das legendas: humano, direto, orgulhoso do trabalho — sem exageros ou emojis em excesso.

FERRAMENTA DISPONÍVEL:
- save_content: salva o conteúdo criado na fila do Instagram para publicação (use sempre após criar a legenda)

${BASE_RULES}
    `.trim();
  },
};
