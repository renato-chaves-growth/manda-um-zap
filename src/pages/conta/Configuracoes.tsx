import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Bell, Moon, Globe, Shield, Smartphone, Mail, 
  MessageCircle, Volume2, Eye
} from "lucide-react";

export default function Configuracoes() {
  const [notifications, setNotifications] = useState({
    whatsapp: true,
    email: true,
    newClient: true,
    budgetApproved: true,
    scheduleReminder: true,
    weeklyReport: false,
  });

  const [preferences, setPreferences] = useState({
    darkMode: false,
    sounds: true,
    compactView: false,
  });

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-foreground">Configurações</h2>
        <p className="text-sm text-muted-foreground">Personalize sua experiência</p>
      </div>

      <div className="space-y-5">
        {/* Notificações */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notificações
            </CardTitle>
            <CardDescription>Escolha como quer ser avisado</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1 mb-4">
              <Label className="text-sm font-medium text-foreground">Canais</Label>
              <p className="text-xs text-muted-foreground">Por onde você quer receber avisos</p>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
              <div className="flex items-center gap-3">
                <MessageCircle className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-foreground">WhatsApp</p>
                  <p className="text-xs text-muted-foreground">Avisos direto no seu WhatsApp</p>
                </div>
              </div>
              <Switch checked={notifications.whatsapp} onCheckedChange={(v) => setNotifications({ ...notifications, whatsapp: v })} />
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">E-mail</p>
                  <p className="text-xs text-muted-foreground">Resumos e alertas importantes</p>
                </div>
              </div>
              <Switch checked={notifications.email} onCheckedChange={(v) => setNotifications({ ...notifications, email: v })} />
            </div>

            <div className="border-t border-border pt-4 mt-4">
              <Label className="text-sm font-medium text-foreground block mb-3">O que notificar</Label>

              {[
                { key: "newClient" as const, label: "Novo cliente", desc: "Quando um novo cliente entrar em contato" },
                { key: "budgetApproved" as const, label: "Orçamento aprovado", desc: "Quando o cliente aprovar um orçamento" },
                { key: "scheduleReminder" as const, label: "Lembrete de visita", desc: "Lembrar de visitas agendadas" },
                { key: "weeklyReport" as const, label: "Relatório semanal", desc: "Resumo da semana por e-mail" },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between py-3">
                  <div>
                    <p className="text-sm text-foreground">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                  <Switch
                    checked={notifications[item.key]}
                    onCheckedChange={(v) => setNotifications({ ...notifications, [item.key]: v })}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Aparência */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Aparência
            </CardTitle>
            <CardDescription>Visual e experiência</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
              <div className="flex items-center gap-3">
                <Moon className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-foreground">Modo escuro</p>
                  <p className="text-xs text-muted-foreground">Em breve</p>
                </div>
              </div>
              <Switch disabled checked={preferences.darkMode} />
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
              <div className="flex items-center gap-3">
                <Volume2 className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-foreground">Sons</p>
                  <p className="text-xs text-muted-foreground">Avisos sonoros de notificações</p>
                </div>
              </div>
              <Switch checked={preferences.sounds} onCheckedChange={(v) => setPreferences({ ...preferences, sounds: v })} />
            </div>
          </CardContent>
        </Card>

        {/* Privacidade */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Privacidade e dados
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start gap-2">
              <Globe className="w-4 h-4" />
              Termos de uso
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2">
              <Shield className="w-4 h-4" />
              Política de privacidade
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2 text-destructive hover:text-destructive">
              <Smartphone className="w-4 h-4" />
              Solicitar exclusão de dados
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
