import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// ─── Contexto passado para cada execução ──────────────────────────────────
export interface ToolContext {
  userId: string;
  contactPhone: string;
  contactName: string;
  // deno-lint-ignore no-explicit-any
  supabase: ReturnType<typeof createClient<any>>;
}

// ─── Executa uma tool call e retorna resultado como objeto ─────────────────
export async function executeTool(
  toolName: string,
  // deno-lint-ignore no-explicit-any
  input: Record<string, any>,
  ctx: ToolContext
): Promise<Record<string, unknown>> {

  console.log(`[tool] ${toolName}`, JSON.stringify(input));

  switch (toolName) {

    // ════════════════════════════════════════════════════════
    // CLARA — Atendimento
    // ════════════════════════════════════════════════════════

    case "save_lead": {
      const { data, error } = await ctx.supabase
        .from("leads")
        .insert({
          user_id:          ctx.userId,
          contact_phone:    ctx.contactPhone,
          contact_name:     input.contact_name ?? ctx.contactName,
          service_interest: input.service_interest,
          urgency:          input.urgency,
          notes:            input.notes ?? null,
          status:           "novo",
        })
        .select("id")
        .single();

      if (error) {
        console.error("[tool] save_lead error:", error.message);
        return { success: false, error: error.message };
      }

      return {
        success: true,
        lead_id: data.id,
        message: "Lead registrado com sucesso. O prestador será notificado.",
      };
    }

    // ════════════════════════════════════════════════════════
    // LUCAS — Agendamento
    // ════════════════════════════════════════════════════════

    case "check_availability": {
      const n8nUrl = Deno.env.get("N8N_CALENDAR_CHECK_URL");

      if (!n8nUrl) {
        // Sem n8n: resposta genérica baseada no horário de funcionamento do perfil
        return {
          available: true,
          slots: [
            `${input.preferred_date} — manhã (8h–12h)`,
            `${input.preferred_date} — tarde (13h–17h)`,
          ],
          message:
            "Temos disponibilidade nessa data. Confirme o período preferido e o endereço completo.",
          integration_note:
            "Integração Google Calendar não configurada — verificação é manual pelo prestador.",
        };
      }

      try {
        const res = await fetch(n8nUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...input, userId: ctx.userId }),
        });
        return await res.json();
      } catch (e) {
        console.error("[tool] check_availability n8n error:", e);
        return {
          available: true,
          message: "Temos disponibilidade. Confirme o período preferido.",
        };
      }
    }

    case "create_appointment": {
      // Monta timestamp
      let scheduledAt: string | null = null;
      try {
        scheduledAt = new Date(
          `${input.scheduled_date}T${input.scheduled_time}:00`
        ).toISOString();
      } catch {
        // mantém null
      }

      const { data, error } = await ctx.supabase
        .from("appointments")
        .insert({
          user_id:       ctx.userId,
          contact_phone: ctx.contactPhone,
          contact_name:  input.contact_name ?? ctx.contactName,
          address:       input.address,
          scheduled_at:  scheduledAt,
          notes:         input.notes ?? null,
          status:        "agendado",
        })
        .select("id")
        .single();

      if (error) {
        console.error("[tool] create_appointment error:", error.message);
        return { success: false, error: error.message };
      }

      // Tenta criar evento no Google Calendar via n8n (opcional)
      const n8nUrl = Deno.env.get("N8N_CALENDAR_CREATE_URL");
      let googleEventId: string | null = null;

      if (n8nUrl) {
        try {
          const calRes = await fetch(n8nUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userId:        ctx.userId,
              appointmentId: data.id,
              contactName:   input.contact_name ?? ctx.contactName,
              contactPhone:  ctx.contactPhone,
              address:       input.address,
              scheduledAt,
              notes:         input.notes ?? null,
            }),
          });
          const calData = await calRes.json();
          if (calData.eventId) {
            googleEventId = calData.eventId;
            await ctx.supabase
              .from("appointments")
              .update({ google_event_id: calData.eventId })
              .eq("id", data.id);
          }
        } catch (e) {
          console.error("[tool] create_appointment n8n error:", e);
        }
      }

      return {
        success:          true,
        appointment_id:   data.id,
        scheduled_at:     scheduledAt,
        google_event_id:  googleEventId,
        message:          googleEventId
          ? "Visita agendada e adicionada ao Google Calendar."
          : "Visita agendada com sucesso.",
      };
    }

    // ════════════════════════════════════════════════════════
    // OTÁVIO — Orçamento
    // ════════════════════════════════════════════════════════

    case "save_quote_request": {
      const { data, error } = await ctx.supabase
        .from("quotes")
        .insert({
          user_id:       ctx.userId,
          contact_phone: ctx.contactPhone,
          contact_name:  input.contact_name ?? ctx.contactName,
          service_type:  input.service_type,
          details:       input.details,
          urgency:       input.urgency ?? "normal",
          status:        "pendente",
        })
        .select("id")
        .single();

      if (error) {
        console.error("[tool] save_quote_request error:", error.message);
        return { success: false, error: error.message };
      }

      return {
        success:  true,
        quote_id: data.id,
        message:  "Pedido de orçamento registrado. O prestador elaborará a proposta em breve.",
      };
    }

    case "request_supplier_quotes": {
      const n8nUrl = Deno.env.get("N8N_SUPPLIER_QUOTES_URL");

      if (!n8nUrl) {
        return {
          success: false,
          message:
            "Solicitação registrada. O prestador entrará em contato com os fornecedores manualmente.",
          integration_note: "N8N_SUPPLIER_QUOTES_URL não configurado.",
        };
      }

      try {
        const res = await fetch(n8nUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...input, userId: ctx.userId }),
        });
        return await res.json();
      } catch (e) {
        console.error("[tool] request_supplier_quotes n8n error:", e);
        return { success: false, error: String(e) };
      }
    }

    // ════════════════════════════════════════════════════════
    // HELENA — Financeiro
    // ════════════════════════════════════════════════════════

    case "get_financial_entries": {
      let query = ctx.supabase
        .from("financial_entries")
        .select("id, description, amount, entry_type, payment_method, status, due_date, contact_name")
        .eq("user_id", ctx.userId)
        .order("created_at", { ascending: false })
        .limit(15);

      if (input.contact_name) {
        query = query.ilike("contact_name", `%${input.contact_name}%`);
      }
      if (input.status && input.status !== "todos") {
        query = query.eq("status", input.status);
      }

      const { data, error } = await query;
      if (error) {
        console.error("[tool] get_financial_entries error:", error.message);
        return { success: false, error: error.message };
      }

      return {
        success: true,
        entries: data ?? [],
        count:   data?.length ?? 0,
      };
    }

    case "register_financial_entry": {
      const { data, error } = await ctx.supabase
        .from("financial_entries")
        .insert({
          user_id:        ctx.userId,
          contact_phone:  ctx.contactPhone,
          contact_name:   input.contact_name ?? ctx.contactName,
          description:    input.description,
          amount:         input.amount,
          entry_type:     input.entry_type,
          payment_method: input.payment_method ?? null,
          due_date:       input.due_date ?? null,
          notes:          input.notes ?? null,
          status:         "pendente",
        })
        .select("id")
        .single();

      if (error) {
        console.error("[tool] register_financial_entry error:", error.message);
        return { success: false, error: error.message };
      }

      return {
        success:  true,
        entry_id: data.id,
        message:  `Lançamento de ${input.entry_type} registrado: R$ ${input.amount}`,
      };
    }

    // ════════════════════════════════════════════════════════
    // MAYA — Divulgação
    // ════════════════════════════════════════════════════════

    case "save_content": {
      const { data, error } = await ctx.supabase
        .from("instagram_queue")
        .insert({
          user_id:   ctx.userId,
          caption:   input.caption,
          hashtags:  input.hashtags,
          post_type: input.post_type ?? "feed",
          status:    "rascunho",
        })
        .select("id")
        .single();

      if (error) {
        console.error("[tool] save_content error:", error.message);
        return { success: false, error: error.message };
      }

      // Tenta agendar no Instagram via n8n (opcional)
      const n8nUrl = Deno.env.get("N8N_INSTAGRAM_SCHEDULE_URL");
      if (n8nUrl && input.suggested_time) {
        try {
          await fetch(n8nUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userId:        ctx.userId,
              contentId:     data.id,
              caption:       input.caption,
              hashtags:      input.hashtags,
              suggestedTime: input.suggested_time,
            }),
          });
          await ctx.supabase
            .from("instagram_queue")
            .update({ status: "agendado" })
            .eq("id", data.id);
        } catch (e) {
          console.error("[tool] save_content n8n error:", e);
        }
      }

      return {
        success:    true,
        content_id: data.id,
        message:
          "Conteúdo salvo na fila do Instagram. Você pode revisar e publicar pelo painel.",
      };
    }

    default:
      console.warn("[tool] Tool desconhecida:", toolName);
      return { error: `Tool "${toolName}" não reconhecida` };
  }
}
