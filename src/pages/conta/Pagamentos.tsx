import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CreditCard, CheckCircle2, AlertCircle, ShoppingCart, Loader2, ExternalLink
} from "lucide-react";
import { useProfile } from "@/hooks/useProfile";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Pagamentos() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { profile, loading } = useProfile();
  const { toast } = useToast();
  const [activeCount, setActiveCount] = useState<number | null>(null);
  const [portalLoading, setPortalLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("agent_configs")
      .select("agent_id")
      .eq("user_id", user.id)
      .eq("active", true)
      .then(({ data }) => setActiveCount(data?.length ?? 0));
  }, [user]);

  const isPaid = profile?.plan === "paid" || profile?.plan === "pro";
  const isActive = profile?.plan_status === "active";

  const handlePortal = async () => {
    if (!user) return;
    setPortalLoading(true);
    try {
      const res = await fetch("/api/create-portal-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id }),
      });
      const data = await res.json() as { url?: string; error?: string };
      if (data.url) {
        window.location.href = data.url;
      } else {
        toast({
          title: "Não foi possível abrir o portal",
          description: data.error ?? "Tente novamente.",
          variant: "destructive",
        });
      }
    } catch {
      toast({ title: "Erro de conexão", description: "Tente novamente.", variant: "destructive" });
    } finally {
      setPortalLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-foreground">Pagamentos</h2>
        <p className="text-sm text-muted-foreground">Gerencie seu plano e assinatura</p>
      </div>

      <div className="space-y-5">
        {/* Plano atual */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">Plano atual</CardTitle>
                <CardDescription>
                  {isPaid
                    ? `${activeCount ?? "–"} agente${(activeCount ?? 0) !== 1 ? "s" : ""} ativo${(activeCount ?? 0) !== 1 ? "s" : ""}`
                    : "Plano gratuito"}
                </CardDescription>
              </div>
              {isPaid && isActive ? (
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100 gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Ativo
                </Badge>
              ) : (
                <Badge variant="outline" className="gap-1 text-muted-foreground">
                  <AlertCircle className="w-3 h-3" /> Gratuito
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {isPaid && isActive ? (
              <div className="p-4 rounded-xl bg-green-50 border border-green-200 space-y-4">
                <div>
                  <p className="text-sm font-medium text-green-800 mb-1">Assinatura ativa ✅</p>
                  <p className="text-sm text-green-700">
                    Seus agentes estão funcionando 24h pelo WhatsApp.
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 border-green-300 text-green-800 hover:bg-green-100"
                  onClick={handlePortal}
                  disabled={portalLoading}
                >
                  {portalLoading
                    ? <Loader2 className="w-4 h-4 animate-spin" />
                    : <ExternalLink className="w-4 h-4" />}
                  {portalLoading ? "Abrindo..." : "Gerenciar assinatura"}
                </Button>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-muted/50 gap-3">
                <div>
                  <p className="text-sm font-medium text-foreground">Nenhum agente ativo</p>
                  <p className="text-sm text-muted-foreground">A partir de R$29,90/agente/mês</p>
                </div>
                <Button
                  size="sm"
                  className="gap-2 bg-primary text-primary-foreground rounded-full shadow-[3px_3px_0px_#000] border border-black"
                  onClick={() => navigate("/carrinho")}
                >
                  <ShoppingCart className="w-4 h-4" />
                  Ativar agentes
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Formas de pagamento */}
        <Card>
          <CardHeader>
            <div>
              <CardTitle className="text-lg">Formas de pagamento</CardTitle>
              <CardDescription>Gerenciadas diretamente pelo Stripe</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/50">
              <div className="w-10 h-10 rounded-lg bg-background border border-border flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">Cartão cadastrado no Stripe</p>
                <p className="text-xs text-muted-foreground">Para alterar o cartão, clique em "Gerenciar assinatura"</p>
              </div>
              {isPaid && isActive && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-1 text-xs text-muted-foreground"
                  onClick={handlePortal}
                  disabled={portalLoading}
                >
                  {portalLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : <ExternalLink className="w-3 h-3" />}
                  Alterar
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Faturas */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Faturas</CardTitle>
            <CardDescription>Recibos enviados por e-mail pelo Stripe</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-4 rounded-xl bg-muted/50 text-sm text-muted-foreground text-center">
              O Stripe envia automaticamente recibos para o seu e-mail após cada cobrança.
              {isPaid && isActive && (
                <span className="block mt-2">
                  Para ver o histórico completo,{" "}
                  <button
                    className="text-primary underline underline-offset-2 font-medium"
                    onClick={handlePortal}
                    disabled={portalLoading}
                  >
                    acesse o portal do cliente
                  </button>
                  .
                </span>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
