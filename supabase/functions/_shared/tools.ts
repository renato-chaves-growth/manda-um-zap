// ─── Definições de tools por agente (Claude Tool Use) ─────────────────────
//
// Cada tool tem: name, description (o Claude lê isso para decidir quando usar)
// e input_schema (JSON Schema do que o Claude deve preencher).
//
// Variáveis de ambiente opcionais para n8n:
//   N8N_CALENDAR_CHECK_URL   — verifica disponibilidade no Google Calendar
//   N8N_CALENDAR_CREATE_URL  — cria evento no Google Calendar
//   N8N_SUPPLIER_QUOTES_URL  — envia pedido de cotação para fornecedores
//   N8N_INSTAGRAM_SCHEDULE_URL — agenda post no Instagram

export interface ToolDefinition {
  name: string;
  description: string;
  input_schema: {
    type: "object";
    properties: Record<string, unknown>;
    required?: string[];
  };
}

// ─── Clara — Atendimento ───────────────────────────────────────────────────
const claraTools: ToolDefinition[] = [
  {
    name: "save_lead",
    description:
      "Salva os dados de um cliente interessado (lead) no sistema. " +
      "Use quando já tiver coletado: nome do cliente, serviço de interesse e urgência. " +
      "Isso garante que o prestador saiba quem entrou em contato e o que precisava.",
    input_schema: {
      type: "object",
      properties: {
        contact_name: {
          type: "string",
          description: "Nome completo ou apelido do cliente",
        },
        service_interest: {
          type: "string",
          description:
            "Descrição do serviço que o cliente precisa, ex: 'instalação de tomadas na cozinha'",
        },
        urgency: {
          type: "string",
          enum: ["urgente", "normal", "pode esperar"],
          description: "Nível de urgência declarado ou inferido pelo cliente",
        },
        notes: {
          type: "string",
          description:
            "Informações adicionais relevantes: localização, horário preferido, detalhes do problema",
        },
      },
      required: ["contact_name", "service_interest", "urgency"],
    },
  },
];

// ─── Lucas — Agendamento ───────────────────────────────────────────────────
const lucasTools: ToolDefinition[] = [
  {
    name: "check_availability",
    description:
      "Verifica os horários disponíveis na agenda para uma visita técnica. " +
      "Use ANTES de confirmar qualquer data com o cliente. " +
      "Se o n8n não estiver configurado, retorna disponibilidade genérica.",
    input_schema: {
      type: "object",
      properties: {
        preferred_date: {
          type: "string",
          description:
            "Data preferida pelo cliente. Pode ser 'YYYY-MM-DD' ou descrição como 'sexta-feira', 'semana que vem'",
        },
        preferred_period: {
          type: "string",
          enum: ["manhã", "tarde", "qualquer"],
          description: "Período preferido do dia",
        },
      },
      required: ["preferred_date"],
    },
  },
  {
    name: "create_appointment",
    description:
      "Cria um agendamento de visita técnica após o cliente confirmar data, horário e endereço. " +
      "Salva no banco de dados e, se configurado, cria evento no Google Calendar automaticamente.",
    input_schema: {
      type: "object",
      properties: {
        contact_name: {
          type: "string",
          description: "Nome do cliente",
        },
        address: {
          type: "string",
          description: "Endereço completo: rua, número, bairro, cidade",
        },
        scheduled_date: {
          type: "string",
          description: "Data no formato YYYY-MM-DD",
        },
        scheduled_time: {
          type: "string",
          description: "Horário no formato HH:MM, ex: '09:00', '14:30'",
        },
        notes: {
          type: "string",
          description: "Observações sobre o serviço ou informações de acesso ao local",
        },
      },
      required: ["contact_name", "address", "scheduled_date", "scheduled_time"],
    },
  },
];

// ─── Otávio — Orçamento ────────────────────────────────────────────────────
const otavioTools: ToolDefinition[] = [
  {
    name: "save_quote_request",
    description:
      "Registra um pedido de orçamento com todos os dados coletados. " +
      "Use quando tiver reunido as informações essenciais: tipo de serviço, medidas/detalhes e urgência. " +
      "O prestador verá o pedido no painel e poderá elaborar o orçamento.",
    input_schema: {
      type: "object",
      properties: {
        contact_name: {
          type: "string",
          description: "Nome do cliente",
        },
        service_type: {
          type: "string",
          description: "Tipo de serviço, ex: 'instalação elétrica', 'pintura de sala'",
        },
        details: {
          type: "object",
          description:
            "Objeto com todos os detalhes coletados. Inclua as respostas de cada pergunta feita, " +
            "ex: { 'tipo': 'manutenção', 'local': 'cozinha', 'metragem': '12m²', 'urgencia_descricao': 'curto no disjuntor' }",
          additionalProperties: true,
        },
        urgency: {
          type: "string",
          enum: ["urgente", "normal", "sem pressa"],
          description: "Urgência do orçamento",
        },
      },
      required: ["contact_name", "service_type", "details"],
    },
  },
  {
    name: "request_supplier_quotes",
    description:
      "Solicita cotação de materiais para fornecedores cadastrados via n8n. " +
      "Use após salvar o pedido de orçamento quando o serviço exigir compra de materiais. " +
      "Requer N8N_SUPPLIER_QUOTES_URL configurado; caso contrário, registra a solicitação para contato manual.",
    input_schema: {
      type: "object",
      properties: {
        quote_id: {
          type: "string",
          description: "ID do orçamento salvo (retornado por save_quote_request)",
        },
        materials_description: {
          type: "string",
          description:
            "Lista de materiais necessários com quantidades aproximadas, " +
            "ex: 'Disjuntor 30A (2 unid), cabo 2.5mm (10m), tomadas 20A (4 unid)'",
        },
      },
      required: ["quote_id", "materials_description"],
    },
  },
];

// ─── Helena — Financeiro ───────────────────────────────────────────────────
const helenaTools: ToolDefinition[] = [
  {
    name: "get_financial_entries",
    description:
      "Busca lançamentos financeiros (receitas e despesas) para responder perguntas sobre pagamentos. " +
      "Use quando o cliente perguntar sobre status de pagamento, valores pendentes ou histórico.",
    input_schema: {
      type: "object",
      properties: {
        contact_name: {
          type: "string",
          description: "Nome do cliente para filtrar (deixe vazio para buscar todos)",
        },
        status: {
          type: "string",
          enum: ["pendente", "pago", "todos"],
          description: "Filtrar por status do pagamento",
        },
      },
      required: ["status"],
    },
  },
  {
    name: "register_financial_entry",
    description:
      "Registra um novo lançamento financeiro: receita de serviço realizado ou despesa de material/projeto. " +
      "Use quando o cliente confirmar pagamento, quando registrar um novo serviço ou quando lançar uma despesa.",
    input_schema: {
      type: "object",
      properties: {
        contact_name: {
          type: "string",
          description: "Nome do cliente ou fornecedor",
        },
        description: {
          type: "string",
          description: "Descrição clara do serviço ou despesa",
        },
        amount: {
          type: "number",
          description: "Valor em reais (número, sem R$)",
        },
        entry_type: {
          type: "string",
          enum: ["receita", "despesa"],
          description: "'receita' para pagamentos recebidos/a receber; 'despesa' para custos",
        },
        payment_method: {
          type: "string",
          enum: ["pix", "transferencia", "cartao", "dinheiro", "outro"],
          description: "Forma de pagamento",
        },
        due_date: {
          type: "string",
          description: "Data de vencimento no formato YYYY-MM-DD (opcional)",
        },
        notes: {
          type: "string",
          description: "Observações adicionais",
        },
      },
      required: ["description", "amount", "entry_type"],
    },
  },
];

// ─── Maya — Divulgação ─────────────────────────────────────────────────────
const mayaTools: ToolDefinition[] = [
  {
    name: "save_content",
    description:
      "Salva o conteúdo criado (legenda + hashtags) na fila do Instagram para revisão e publicação. " +
      "Use SEMPRE após criar uma legenda para que o prestador possa ver e publicar no painel. " +
      "Se N8N_INSTAGRAM_SCHEDULE_URL estiver configurado, agenda automaticamente.",
    input_schema: {
      type: "object",
      properties: {
        caption: {
          type: "string",
          description: "Legenda completa do post, formatada para WhatsApp (sem markdown)",
        },
        hashtags: {
          type: "string",
          description: "Hashtags separadas por espaço, ex: '#eletricista #reformacasa #sãopaulo'",
        },
        post_type: {
          type: "string",
          enum: ["feed", "story", "reels"],
          description: "Tipo de publicação no Instagram",
        },
        suggested_time: {
          type: "string",
          description: "Horário sugerido para publicar, ex: 'terça 19h', 'quinta 12h'",
        },
      },
      required: ["caption", "hashtags"],
    },
  },
];

// ─── Mapeamento agente → tools ─────────────────────────────────────────────
const AGENT_TOOLS: Record<string, ToolDefinition[]> = {
  clara:  claraTools,
  lucas:  lucasTools,
  otavio: otavioTools,
  helena: helenaTools,
  maya:   mayaTools,
};

export function getToolsForAgent(agentId: string): ToolDefinition[] {
  return AGENT_TOOLS[agentId] ?? [];
}
