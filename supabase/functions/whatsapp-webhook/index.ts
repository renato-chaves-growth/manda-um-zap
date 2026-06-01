import Anthropic from "https://esm.sh/@anthropic-ai/sdk@0.27.3";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { routeToAgent, AGENT_PROMPTS, UserProfile } from "../_shared/agents.ts";
import { getToolsForAgent } from "../_shared/tools.ts";
import { executeTool, ToolContext } from "../_shared/tool-executor.ts";

// ─── Clientes ──────────────────────────────────────────────────────────────
const anthropic = new Anthropic({ apiKey: Deno.env.get("ANTHROPIC_API_KEY")! });

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

// claude-3-5-haiku-20241022  → rápido e barato (padrão)
// claude-sonnet-4-5          → mais inteligente para conversas complexas
const CLAUDE_MODEL = "claude-3-5-haiku-20241022";

// Quantas mensagens de histórico enviar ao Claude
const HISTORY_LIMIT = 20;

// Limite de iterações do agentic loop (evita loops infinitos)
const MAX_TOOL_ITERATIONS = 5;

// ─── Tipos Z-API ───────────────────────────────────────────────────────────
interface ZAPIWebhook {
  instanceId: string;
  phone: string;       // "5511999999999"
  fromMe: boolean;
  senderName?: string;
  chatName?: string;
  type: string;        // "ReceivedCallback" = mensagem recebida
  text?: { message: string };
}

// ─── Envia mensagem via Z-API ──────────────────────────────────────────────
async function sendWhatsApp(
  instanceId: string,
  instanceToken: string,
  to: string,
  text: string
) {
  const clientToken = Deno.env.get("ZAPI_CLIENT_TOKEN");
  const url = `https://api.z-api.io/instances/${instanceId}/token/${instanceToken}/send-text`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(clientToken ? { "Client-Token": clientToken } : {}),
    },
    body: JSON.stringify({ phone: to, message: text }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Z-API ${res.status}: ${err}`);
  }
}

// ─── Agentic loop com Tool Use ─────────────────────────────────────────────
// Chama Claude com as tools disponíveis para o agente.
// Se Claude quiser usar uma tool, executa e continua o loop até uma resposta final.
async function runAgentLoop(
  systemPrompt: string,
  agentId: string,
  historyMessages: Array<{ role: "user" | "assistant"; content: string }>,
  userMessage: string,
  toolContext: ToolContext
): Promise<string> {

  const tools = getToolsForAgent(agentId);

  // Monta o array de mensagens para o Claude.
  // O histórico é texto puro; adicionamos a mensagem atual do usuário.
  // deno-lint-ignore no-explicit-any
  let messages: any[] = [
    ...historyMessages,
    { role: "user", content: userMessage },
  ];

  let iterations = 0;

  while (iterations < MAX_TOOL_ITERATIONS) {
    iterations++;

    const response = await anthropic.messages.create({
      model:      CLAUDE_MODEL,
      max_tokens: 1024,
      system:     systemPrompt,
      tools:      tools.length > 0 ? tools : undefined,
      messages,
    });

    // ── Resposta final de texto ────────────────────────────
    if (response.stop_reason === "end_turn") {
      const textBlock = response.content.find((b) => b.type === "text");
      return textBlock?.type === "text"
        ? textBlock.text.trim()
        : "Desculpe, não consegui processar sua mensagem. Tente novamente.";
    }

    // ── Claude quer usar tools ─────────────────────────────
    if (response.stop_reason === "tool_use") {
      // Adiciona a resposta do assistente (com tool_use blocks) ao histórico do loop
      messages = [...messages, { role: "assistant", content: response.content }];

      // Executa cada tool call e coleta os resultados
      // deno-lint-ignore no-explicit-any
      const toolResults: any[] = [];

      for (const block of response.content) {
        if (block.type !== "tool_use") continue;

        let result: Record<string, unknown>;
        try {
          result = await executeTool(block.name, block.input as Record<string, unknown>, toolContext);
        } catch (e) {
          console.error(`[tool] Erro ao executar ${block.name}:`, e);
          result = { error: `Erro ao executar a ação: ${String(e)}` };
        }

        toolResults.push({
          type:        "tool_result",
          tool_use_id: block.id,
          content:     JSON.stringify(result),
        });
      }

      // Adiciona resultados das tools como mensagem do "user" (padrão da API)
      messages = [...messages, { role: "user", content: toolResults }];
      continue;
    }

    // ── Outros stop_reason (max_tokens, stop_sequence) ────
    // Tenta extrair qualquer texto gerado até o momento
    const textBlock = response.content.find((b) => b.type === "text");
    if (textBlock?.type === "text" && textBlock.text.trim()) {
      return textBlock.text.trim();
    }

    break;
  }

  return "Desculpe, não consegui processar sua mensagem no momento. Tente novamente em instantes.";
}

// ─── Handler principal ─────────────────────────────────────────────────────
Deno.serve(async (req) => {
  // Z-API faz GET para validar o endpoint ao configurar o webhook
  if (req.method === "GET") {
    return new Response("ok", { status: 200 });
  }

  let body: ZAPIWebhook;
  try {
    body = await req.json();
  } catch {
    return new Response("invalid json", { status: 400 });
  }

  // Só processar mensagens recebidas de texto
  if (body.type !== "ReceivedCallback") {
    return new Response("ignored", { status: 200 });
  }

  // Ignorar mensagens enviadas pelo próprio número
  if (body.fromMe) {
    return new Response("ignored", { status: 200 });
  }

  const instanceId   = body.instanceId;
  const fromPhone    = body.phone;
  const messageText  = body.text?.message ?? "";
  const contactName  = body.senderName ?? body.chatName ?? fromPhone;

  // Ignorar mensagens sem texto (áudio, imagem, sticker, etc.)
  if (!messageText || !fromPhone) {
    return new Response("no text", { status: 200 });
  }

  try {
    // 1. Buscar o perfil do prestador dono desta instância Z-API
    const { data: profile, error: profileErr } = await supabase
      .from("profiles")
      .select(
        "id, full_name, business_name, business_type, city, margin, schedule, whatsapp_token"
      )
      .eq("whatsapp_instance", instanceId)
      .single();

    if (profileErr || !profile) {
      console.error("Instância Z-API não encontrada:", instanceId);
      return new Response("instance not found", { status: 200 });
    }

    if (!profile.whatsapp_token) {
      console.error("whatsapp_token não configurado para:", profile.id);
      return new Response("token not configured", { status: 200 });
    }

    // 2. Buscar agentes ativos do prestador
    const { data: agentConfigs } = await supabase
      .from("agent_configs")
      .select("agent_id")
      .eq("user_id", profile.id)
      .eq("active", true);

    const activeAgentIds = (agentConfigs ?? []).map(
      (a: { agent_id: string }) => a.agent_id
    );

    // 3. Rotear para o agente correto por palavra-chave
    const agentId = routeToAgent(messageText, activeAgentIds);

    // 4. Buscar histórico recente (memória da conversa)
    const { data: history } = await supabase
      .from("conversations")
      .select("role, content")
      .eq("user_id", profile.id)
      .eq("contact_phone", fromPhone)
      .order("created_at", { ascending: true })
      .limit(HISTORY_LIMIT);

    const historyMessages: Array<{ role: "user" | "assistant"; content: string }> =
      (history ?? []).map((h: { role: string; content: string }) => ({
        role:    h.role as "user" | "assistant",
        content: h.content,
      }));

    // 5. Salvar mensagem do cliente no banco
    await supabase.from("conversations").insert({
      user_id:       profile.id,
      contact_phone: fromPhone,
      contact_name:  contactName,
      agent_id:      agentId,
      role:          "user",
      content:       messageText,
    });

    // 6. Montar system prompt do agente
    const systemPrompt =
      AGENT_PROMPTS[agentId]?.(profile as UserProfile) ??
      AGENT_PROMPTS.clara(profile as UserProfile);

    // 7. Contexto para execução das tools
    const toolContext: ToolContext = {
      userId:       profile.id,
      contactPhone: fromPhone,
      contactName,
      supabase,
    };

    // 8. Rodar o agentic loop (pode usar tools internamente)
    const replyText = await runAgentLoop(
      systemPrompt,
      agentId,
      historyMessages,
      messageText,
      toolContext
    );

    // 9. Salvar resposta do agente no banco (apenas texto final)
    await supabase.from("conversations").insert({
      user_id:       profile.id,
      contact_phone: fromPhone,
      contact_name:  contactName,
      agent_id:      agentId,
      role:          "assistant",
      content:       replyText,
    });

    // 10. Enviar resposta no WhatsApp
    await sendWhatsApp(instanceId, profile.whatsapp_token, fromPhone, replyText);

    console.log(`[${agentId}] → ${fromPhone}: ${replyText.slice(0, 100)}...`);

    return new Response(JSON.stringify({ ok: true, agent: agentId }), {
      headers: { "Content-Type": "application/json" },
    });

  } catch (err) {
    const msg = err instanceof Error ? err.message : "unknown error";
    console.error("whatsapp-webhook error:", msg);
    // Sempre retornar 200 para Z-API não fazer retry infinito
    return new Response(JSON.stringify({ ok: false, error: msg }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
});
