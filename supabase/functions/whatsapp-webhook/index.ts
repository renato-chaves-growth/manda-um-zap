import Anthropic from "https://esm.sh/@anthropic-ai/sdk@0.27.3";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { routeToAgent, AGENT_PROMPTS, UserProfile } from "../_shared/agents.ts";

// ─── Clientes ──────────────────────────────────────────────────────────────
const anthropic = new Anthropic({ apiKey: Deno.env.get("ANTHROPIC_API_KEY")! });

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

// Claude model — troque por "claude-sonnet-4-5" para respostas mais elaboradas
const CLAUDE_MODEL = "claude-3-5-haiku-20241022";

// Quantas mensagens anteriores enviar ao Claude (memória da conversa)
const HISTORY_LIMIT = 20;

// ─── Tipos Z-API ───────────────────────────────────────────────────────────
interface ZAPIWebhook {
  instanceId: string;
  phone: string;          // ex: "5511999999999"
  fromMe: boolean;
  senderName?: string;
  chatName?: string;
  type: string;           // "ReceivedCallback" = mensagem recebida
  text?: { message: string };
  // image, audio, document, etc. — ignorados por enquanto
}

// ─── Envia mensagem de texto via Z-API ────────────────────────────────────
async function sendWhatsApp(instanceId: string, instanceToken: string, to: string, text: string) {
  const clientToken = Deno.env.get("ZAPI_CLIENT_TOKEN"); // token de segurança da conta (opcional)

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

// ─── Handler principal ─────────────────────────────────────────────────────
Deno.serve(async (req) => {
  // Z-API faz GET para verificar o endpoint ao configurar o webhook
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

  // Ignorar mensagens enviadas pelo próprio bot
  if (body.fromMe) {
    return new Response("ignored", { status: 200 });
  }

  const instanceId  = body.instanceId;
  const fromPhone   = body.phone;
  const messageText = body.text?.message ?? "";
  const contactName = body.senderName ?? body.chatName ?? fromPhone;

  // Ignorar mensagens sem texto (áudio, imagem, sticker, etc.)
  if (!messageText || !fromPhone) {
    return new Response("no text", { status: 200 });
  }

  try {
    // 1. Buscar o marceneiro dono dessa instância Z-API
    const { data: profile, error: profileErr } = await supabase
      .from("profiles")
      .select("id, full_name, business_name, business_type, city, margin, schedule, whatsapp_token")
      .eq("whatsapp_instance", instanceId)
      .single();

    if (profileErr || !profile) {
      console.error("Instância Z-API não encontrada:", instanceId);
      return new Response("instance not found", { status: 200 }); // 200 p/ Z-API não retentar
    }

    if (!profile.whatsapp_token) {
      console.error("whatsapp_token não configurado para:", profile.id);
      return new Response("token not configured", { status: 200 });
    }

    // 2. Buscar agentes ativos do marceneiro
    const { data: agentConfigs } = await supabase
      .from("agent_configs")
      .select("agent_id")
      .eq("user_id", profile.id)
      .eq("active", true);

    const activeAgentIds = (agentConfigs ?? []).map((a: { agent_id: string }) => a.agent_id);

    // 3. Rotear para o agente correto por palavra-chave
    const agentId = routeToAgent(messageText, activeAgentIds);

    // 4. Buscar histórico recente da conversa (memória)
    const { data: history } = await supabase
      .from("conversations")
      .select("role, content")
      .eq("user_id", profile.id)
      .eq("contact_phone", fromPhone)
      .order("created_at", { ascending: true })
      .limit(HISTORY_LIMIT);

    // 5. Salvar mensagem do cliente no banco
    await supabase.from("conversations").insert({
      user_id:       profile.id,
      contact_phone: fromPhone,
      contact_name:  contactName,
      agent_id:      agentId,
      role:          "user",
      content:       messageText,
    });

    // 6. Montar system prompt do agente com dados do perfil
    const systemPrompt = AGENT_PROMPTS[agentId]?.(profile as UserProfile)
      ?? AGENT_PROMPTS.clara(profile as UserProfile);

    // 7. Montar histórico para o Claude
    const claudeMessages: { role: "user" | "assistant"; content: string }[] = [
      ...(history ?? []).map((h: { role: string; content: string }) => ({
        role: h.role as "user" | "assistant",
        content: h.content,
      })),
      { role: "user", content: messageText },
    ];

    // 8. Chamar Claude API
    const completion = await anthropic.messages.create({
      model:      CLAUDE_MODEL,
      max_tokens: 512,
      system:     systemPrompt,
      messages:   claudeMessages,
    });

    const replyText = completion.content[0].type === "text"
      ? completion.content[0].text.trim()
      : "Desculpe, não consegui processar sua mensagem. Tente novamente em instantes.";

    // 9. Salvar resposta do agente no banco
    await supabase.from("conversations").insert({
      user_id:       profile.id,
      contact_phone: fromPhone,
      contact_name:  contactName,
      agent_id:      agentId,
      role:          "assistant",
      content:       replyText,
    });

    // 10. Enviar resposta no WhatsApp via Z-API
    await sendWhatsApp(instanceId, profile.whatsapp_token, fromPhone, replyText);

    console.log(`[${agentId}] → ${fromPhone}: ${replyText.slice(0, 80)}...`);

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
