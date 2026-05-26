import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Shield, Bell, Globe, Database, Mail } from "lucide-react";

export default function ConfiguracoesAdmin() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-foreground">Configurações</h2>
        <p className="text-sm text-muted-foreground">Configurações gerais da plataforma</p>
      </div>

      <div className="space-y-6">
        {/* General */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-muted-foreground" />
              <div>
                <CardTitle className="text-lg">Geral</CardTitle>
                <CardDescription>Informações da plataforma</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label>Nome da plataforma</Label>
                <Input defaultValue="MandaUmZap" className="mt-1" />
              </div>
              <div>
                <Label>E-mail de suporte</Label>
                <Input defaultValue="suporte@MandaUmZap" className="mt-1" />
              </div>
            </div>
            <div>
              <Label>URL do WhatsApp de suporte</Label>
              <Input defaultValue="https://wa.me/5500000000000" className="mt-1" />
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <div>
                <CardTitle className="text-lg">Notificações</CardTitle>
                <CardDescription>Alertas e e-mails automáticos</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Novo cadastro</p>
                <p className="text-xs text-muted-foreground">Receber e-mail quando um novo usuário se cadastrar</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Cancelamento</p>
                <p className="text-xs text-muted-foreground">Alertar quando um usuário cancelar o plano</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Pagamento falhou</p>
                <p className="text-xs text-muted-foreground">Alertar sobre falhas de cobrança</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Relatório semanal</p>
                <p className="text-xs text-muted-foreground">Resumo de métricas toda segunda-feira</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-muted-foreground" />
              <div>
                <CardTitle className="text-lg">Segurança</CardTitle>
                <CardDescription>Acessos e permissões administrativas</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Autenticação em dois fatores</p>
                <p className="text-xs text-muted-foreground">Exigir 2FA para acesso ao painel admin</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div>
              <Label>E-mails com acesso admin</Label>
              <Input defaultValue="admin@MandaUmZap" className="mt-1" />
              <p className="text-xs text-muted-foreground mt-1">Separe múltiplos e-mails com vírgula</p>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button size="lg">Salvar configurações</Button>
        </div>
      </div>
    </div>
  );
}
