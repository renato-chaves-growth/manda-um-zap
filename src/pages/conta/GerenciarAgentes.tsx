import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Loader2, ChevronRight, ChevronLeft, MessageCircle, Settings, TrendingUp, Calendar, Instagram, ShoppingCart, PartyPopper } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

import claraAvatar from "@/assets/avatars/ze-atendimento-v3.webp";
import otavioAvatar from "@/assets/avatars/chico-orcamento-v3.webp";
import lucasAvatar from "@/assets/avatars/neto-agenda-v3.webp";
import helenaAvatar from "@/assets/avatars/dona-conta-v3.webp";
import mayaAvatar from "@/assets/avatars/zeca-instagram-v3.webp";

const AGENT_META: Record<string, {
  name: string; role: string; avatar: string; color: string;
  description: string;
  defaultSettings: { key: string; label: string; description: string }[];
}> = {
  clara: {
    name: "Clara", role: "Atendimento", avatar: claraAvatar, color: "text-green-600",
    description: "Responde clientes no WhatsApp 24h por dia, tira dúvidas e qualifica leads.",
    defaultSettings: [
      { key: "auto_reply", label: "Resposta automática", description: "Responder fora do expediente" },
      { key: "qualify_leads", label: "Qualificar leads", description: "Perguntar tipo de projeto e orçamento" },
      { key: "transfer_human", label: "Transferir para humano", description: "Encaminhar casos complexos" },
    ],
  },
  otavio: {
    name: "Otávio", role: "Orçamento", avatar: otavioAvatar, color: "text-teal-600",
    description: "Cria orçamentos detalhados baseados nas informações do cliente e sua margem.",
    defaultSettings: [
      { key: "auto_margin", label: "Margem automática", description: "Usar a margem definida no perfil" },
      { key: "send_pdf", label: "Enviar PDF", description: "Gerar e enviar orçamento em PDF" },
      { key: "followup", label: "Follow-up automático", description: "Lembrar cliente após 3 dias" },
    ],
  },
  lucas: {
    name: "Lucas", role: "Agendamento", avatar: lucasAvatar, color: "text-lime-600",
    description: "Agenda visitas técnicas respeitando seus dias e horários de trabalho.",
    defaultSettings: [
      { key: "auto_confirm", label: "Confirmação automática", description: "Confirmar visita 24h antes" },
      { key: "use_schedule", label: "Usar agenda do perfil", description: "Respeitar horários configurados" },
      { key: "buffer_time", label: "Intervalo entre visitas", description: "30 min de folga entre visitas" },
    ],
  },
  helena: {
    name: "Helena", role: "Financeiro", avatar: helenaAvatar, color: "text-emerald-600",
    description: "Controla contas a receber, envia cobranças e acompanha pagamentos.",
    defaultSettings: [
      { key: "auto_charge", label: "Cobrança automática", description: "Enviar lembrete de pagamento" },
      { key: "receipts", label: "Comprovantes", description: "Solicitar comprovante ao cliente" },
    ],
  },
  maya: {
    name: "Maya", role: "Divulgação", avatar: mayaAvatar, color: "text-green-700",
    description: "Cria conteúdo para Instagram baseado nos seus projetos e serviços.",
    defaultSettings: [
      { key: "auto_post", label: "Postagem automática", description: "Publicar automaticamente" },
      { key: "stories", label: "Stories", description: "Criar stories semanais" },
    ],
  },
};

const roleIcons: Record<string, React.ElementType> = {
  Atendimento: MessageCircle, Orçamento: TrendingUp,
  Agendamento: Calendar, Financeiro: TrendingUp, Divulgação: Instagram,
};

interface AgentRow {
  id: string;
  agent_id: string;
  active: boolean;
  settings: Record<string, boolean>;
}

export default function GerenciarAgentes() {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [agents, setAgents] = useState<AgentRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);

  // Toast de sucesso após pagamento
  useEffect(() => {
    if (searchParams.get("pagamento") === "sucesso") {
      toast({
        title: "🎉 Pagamento realizado!",
        description: "Seus agentes foram ativados e já estão prontos para trabalhar.",
      });
      // Remove o query param sem recarregar a página
      navigate("/minha-conta/agentes", { replace: true });
    }
  }, [searchParams, toast, navigate]);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("agent_configs")
      .select("*")
      .eq("user_id", user.id)
      .then(({ data, error }) => {
        if (!error && data) {
          setAgents(data.map((row) => ({ ...row, settings: row.settings || {} })));
        }
        setLoading(false);
      });
  }, [user]);

  const toggleSetting = async (agentId: string, key: string) => {
    const agent = agents.find((a) => a.agent_id === agentId);
    if (!agent) return;
    const newSettings = { ...agent.settings, [key]: !agent.settings[key] };
    setAgents((prev) => prev.map((a) => a.agent_id === agentId ? { ...a, settings: newSettings } : a));
    setSaving(agentId);
    const { error } = await supabase.from("agent_configs").update({ settings: newSettings }).eq("id", agent.id);
    setSaving(null);
    if (error) toast({ title: "Erro ao salvar configuração", variant: "destructive" });
  };

  const toggleActive = async (agentId: string) => {
    const agent = agents.find((a) => a.agent_id === agentId);
    if (!agent) return;
    const newActive = !agent.active;
    setAgents((prev) => prev.map((a) => a.agent_id === agentId ? { ...a, active: newActive } : a));
    setSaving(agentId);
    const { error } = await supabase.from("agent_configs").update({ active: newActive }).eq("id", agent.id);
    setSaving(null);
    if (error) {
      toast({ title: "Erro ao atualizar agente", variant: "destructive" });
      setAgents((prev) => prev.map((a) => a.agent_id === agentId ? { ...a, active: !newActive } : a));
    } else {
      const meta = AGENT_META[agentId];
      toast({ title: newActive ? `${meta?.name} ativada!` : `${meta?.name} desativada` });
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center py-16"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;
  }

  const selectedRow = agents.find((a) => a.agent_id === selectedAgent);
  const selectedMeta = selectedAgent ? AGENT_META[selectedAgent] : null;

  if (selectedAgent && selectedRow && selectedMeta) {
    return (
      <div>
        <button onClick={() => setSelectedAgent(null)} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
          <ChevronLeft className="w-4 h-4" />Voltar para agentes
        </button>
        <div className="flex items-center gap-4 mb-6">
          <div className="relative">
            <img src={selectedMeta.avatar} alt={selectedMeta.name} className="w-16 h-16 rounded-2xl object-cover object-top border-2 border-border" />
            {selectedRow.active && <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background" />}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h2 className={`text-xl font-bold ${selectedMeta.color}`}>{selectedMeta.name}</h2>
              <Badge variant={selectedRow.active ? "default" : "secondary"} className={selectedRow.active ? "bg-green-100 text-green-700 hover:bg-green-100" : ""}>
                {selectedRow.active ? "Ativo" : "Inativo"}
              </Badge>
              {saving === selectedAgent && <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />}
            </div>
            <p className="text-sm text-muted-foreground">{selectedMeta.role}</p>
          </div>
          <Switch checked={selectedRow.active} onCheckedChange={() => toggleActive(selectedAgent)} />
        </div>
        <p className="text-sm text-muted-foreground mb-6">{selectedMeta.description}</p>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2"><Settings className="w-5 h-5" />Configurações</CardTitle>
            <CardDescription>Ajuste o comportamento do agente</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedMeta.defaultSettings.map((setting) => (
              <div key={setting.key} className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                <div>
                  <p className="font-medium text-sm text-foreground">{setting.label}</p>
                  <p className="text-xs text-muted-foreground">{setting.description}</p>
                </div>
                <Switch checked={!!selectedRow.settings[setting.key]} onCheckedChange={() => toggleSetting(selectedAgent, setting.key)} disabled={saving === selectedAgent} />
              </div>
            ))}
          </CardContent>
        </Card>
        {!selectedRow.active && (
          <div className="mt-6 p-4 rounded-xl bg-muted/50 border border-dashed border-border text-center">
            <p className="text-sm text-muted-foreground mb-3">Ative este agente para começar a usar.</p>
            <Button size="sm" onClick={() => toggleActive(selectedAgent)}>Ativar agente</Button>
          </div>
        )}
      </div>
    );
  }

  const activeCount = agents.filter((a) => a.active).length;
  const inactiveIds = agents.filter((a) => !a.active).map((a) => a.agent_id);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-foreground">Seus Agentes</h2>
          <p className="text-sm text-muted-foreground">
            {activeCount > 0
              ? `${activeCount} agente${activeCount > 1 ? "s" : ""} ativo${activeCount > 1 ? "s" : ""}`
              : "Nenhum agente ativo ainda"}
          </p>
        </div>
        {inactiveIds.length > 0 && (
          <Button
            size="sm"
            className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full shadow-[3px_3px_0px_#000] border border-black"
            onClick={() => navigate(`/carrinho?agentes=${inactiveIds.join(",")}`)}
          >
            <ShoppingCart className="w-4 h-4" />
            Ativar mais agentes
          </Button>
        )}
      </div>

      <div className="space-y-3">
        {agents.map((row) => {
          const meta = AGENT_META[row.agent_id];
          if (!meta) return null;
          const RoleIcon = roleIcons[meta.role] || Settings;
          return (
            <Card
              key={row.agent_id}
              className={`transition-all hover:shadow-md ${row.active ? "cursor-pointer" : "border-dashed"}`}
              onClick={() => row.active && setSelectedAgent(row.agent_id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="relative shrink-0">
                    <img
                      src={meta.avatar}
                      alt={meta.name}
                      className={`w-14 h-14 rounded-xl object-cover object-top ${!row.active ? "grayscale opacity-50" : ""}`}
                    />
                    {row.active && <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-background" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className={`font-semibold ${row.active ? meta.color : "text-muted-foreground"}`}>{meta.name}</h3>
                      <Badge variant="outline" className="text-[10px]"><RoleIcon className="w-3 h-3 mr-1" />{meta.role}</Badge>
                      {saving === row.agent_id && <Loader2 className="w-3 h-3 animate-spin text-muted-foreground" />}
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{meta.description}</p>
                  </div>
                  {row.active ? (
                    <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0" />
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      className="shrink-0 gap-1 text-xs border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/carrinho?agentes=${row.agent_id}`);
                      }}
                    >
                      <ShoppingCart className="w-3 h-3" />
                      R$29,90/mês
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {activeCount === 0 && (
        <div className="mt-6 p-6 rounded-2xl border-2 border-dashed border-border text-center">
          <PartyPopper className="w-10 h-10 mx-auto mb-3 text-muted-foreground/50" />
          <p className="font-medium text-foreground mb-1">Nenhum agente ativo</p>
          <p className="text-sm text-muted-foreground mb-4">Escolha os agentes que vão trabalhar para você 24h pelo WhatsApp.</p>
          <Button
            onClick={() => navigate("/carrinho")}
            className="gap-2 bg-primary text-primary-foreground rounded-full shadow-[3px_3px_0px_#000] border border-black"
          >
            <ShoppingCart className="w-4 h-4" />
            Ver agentes disponíveis
          </Button>
        </div>
      )}
    </div>
  );
}
