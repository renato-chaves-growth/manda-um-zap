import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  CreditCard, Download, CheckCircle2, Clock, AlertCircle, 
  ChevronRight, Plus, Trash2
} from "lucide-react";

const currentPlan = {
  name: "Plano 2 Agentes",
  price: "R$ 59,00",
  nextBilling: "15/03/2026",
  status: "active" as const,
};

const paymentMethods = [
  { id: "1", type: "credit", brand: "Visa", last4: "4242", expiry: "12/27", isDefault: true },
  { id: "2", type: "credit", brand: "Mastercard", last4: "8888", expiry: "06/26", isDefault: false },
];

const invoices = [
  { id: "INV-142", date: "15/02/2026", amount: "R$ 59,00", status: "paid" as const },
  { id: "INV-141", date: "15/01/2026", amount: "R$ 59,00", status: "paid" as const },
  { id: "INV-140", date: "15/12/2025", amount: "R$ 59,00", status: "paid" as const },
  { id: "INV-139", date: "15/11/2025", amount: "R$ 29,00", status: "paid" as const },
  { id: "INV-138", date: "15/10/2025", amount: "R$ 29,00", status: "paid" as const },
];

const statusConfig = {
  paid: { label: "Pago", icon: CheckCircle2, className: "text-green-600 bg-green-50 border-green-200" },
  pending: { label: "Pendente", icon: Clock, className: "text-yellow-600 bg-yellow-50 border-yellow-200" },
  failed: { label: "Falhou", icon: AlertCircle, className: "text-red-600 bg-red-50 border-red-200" },
};

export default function Pagamentos() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-foreground">Pagamentos</h2>
        <p className="text-sm text-muted-foreground">Gerencie seu plano, formas de pagamento e faturas</p>
      </div>

      <div className="space-y-5">
        {/* Plano atual */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">Plano atual</CardTitle>
                <CardDescription>{currentPlan.name}</CardDescription>
              </div>
              <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Ativo</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-muted/50 gap-3">
              <div>
                <p className="text-sm text-muted-foreground">Próxima cobrança</p>
                <p className="text-lg font-semibold text-foreground">{currentPlan.price} em {currentPlan.nextBilling}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Alterar plano</Button>
                <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">Cancelar</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Formas de pagamento */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">Formas de pagamento</CardTitle>
                <CardDescription>Cartões cadastrados</CardDescription>
              </div>
              <Button size="sm" variant="outline" className="gap-2">
                <Plus className="w-4 h-4" />
                Adicionar
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {paymentMethods.map((method) => (
              <div key={method.id} className="flex items-center gap-4 p-4 rounded-xl border border-border">
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-foreground">{method.brand} •••• {method.last4}</p>
                    {method.isDefault && <Badge variant="outline" className="text-[10px]">Principal</Badge>}
                  </div>
                  <p className="text-xs text-muted-foreground">Expira em {method.expiry}</p>
                </div>
                <div className="flex gap-1">
                  {!method.isDefault && (
                    <Button variant="ghost" size="sm" className="text-xs">Tornar principal</Button>
                  )}
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive h-8 w-8">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Histórico de faturas */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Histórico de faturas</CardTitle>
            <CardDescription>Suas últimas cobranças</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {invoices.map((invoice) => {
                const status = statusConfig[invoice.status];
                const StatusIcon = status.icon;
                return (
                  <div key={invoice.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/50 transition-colors">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-foreground">{invoice.id}</p>
                        <Badge variant="outline" className={`text-[10px] ${status.className}`}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {status.label}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{invoice.date}</p>
                    </div>
                    <p className="text-sm font-semibold text-foreground">{invoice.amount}</p>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
