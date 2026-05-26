import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, DollarSign, TrendingUp, Bot, ArrowUpRight, ArrowDownRight,
  UserCheck, UserX, CreditCard
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";

const kpis = [
  { label: "Usuários ativos", value: "1.247", change: "+12%", up: true, icon: Users, color: "text-blue-600 bg-blue-50" },
  { label: "Receita mensal (MRR)", value: "R$ 48.390", change: "+8,3%", up: true, icon: DollarSign, color: "text-green-600 bg-green-50" },
  { label: "Churn rate", value: "3,2%", change: "-0,5%", up: false, icon: TrendingUp, color: "text-orange-600 bg-orange-50" },
  { label: "Agentes ativos", value: "3.842", change: "+15%", up: true, icon: Bot, color: "text-purple-600 bg-purple-50" },
];

const revenueData = [
  { month: "Set", value: 32400 },
  { month: "Out", value: 35800 },
  { month: "Nov", value: 38200 },
  { month: "Dez", value: 41500 },
  { month: "Jan", value: 44100 },
  { month: "Fev", value: 46800 },
  { month: "Mar", value: 48390 },
];

const usersData = [
  { month: "Set", novos: 89, cancelados: 12 },
  { month: "Out", novos: 102, cancelados: 15 },
  { month: "Nov", novos: 115, cancelados: 11 },
  { month: "Dez", novos: 98, cancelados: 18 },
  { month: "Jan", novos: 134, cancelados: 14 },
  { month: "Fev", novos: 128, cancelados: 16 },
  { month: "Mar", novos: 142, cancelados: 13 },
];

const planDistribution = [
  { name: "Começar", value: 412, color: "#94a3b8" },
  { name: "Trabalhar", value: 387, color: "#22c55e" },
  { name: "Vender Mais", value: 298, color: "#3b82f6" },
  { name: "Tudo Automático", value: 150, color: "#f97316" },
];

const recentActivity = [
  { user: "Carlos M.", action: "Assinou plano Trabalhar", time: "há 5 min", type: "signup" },
  { user: "Ana L.", action: "Upgrade para Vender Mais", time: "há 12 min", type: "upgrade" },
  { user: "Roberto S.", action: "Cancelou assinatura", time: "há 28 min", type: "cancel" },
  { user: "Maria F.", action: "Assinou plano Começar", time: "há 45 min", type: "signup" },
  { user: "João P.", action: "Pagamento confirmado", time: "há 1h", type: "payment" },
];

const activityIcons: Record<string, { icon: typeof UserCheck; className: string }> = {
  signup: { icon: UserCheck, className: "text-green-600 bg-green-50" },
  upgrade: { icon: ArrowUpRight, className: "text-blue-600 bg-blue-50" },
  cancel: { icon: UserX, className: "text-red-600 bg-red-50" },
  payment: { icon: CreditCard, className: "text-purple-600 bg-purple-50" },
};

export default function Dashboard() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-foreground">Dashboard</h2>
        <p className="text-sm text-muted-foreground">Visão geral do negócio em tempo real</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {kpis.map((kpi) => (
          <Card key={kpi.label}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{kpi.label}</p>
                  <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
                  <div className={`flex items-center gap-1 mt-1 text-xs font-medium ${kpi.up ? "text-green-600" : "text-red-600"}`}>
                    {kpi.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {kpi.change} vs mês anterior
                  </div>
                </div>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${kpi.color}`}>
                  <kpi.icon className="w-5 h-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Revenue chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Receita mensal (MRR)</CardTitle>
            <CardDescription>Evolução dos últimos 7 meses</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" fontSize={12} />
                <YAxis fontSize={12} tickFormatter={(v) => `R$${(v/1000).toFixed(0)}k`} />
                <Tooltip formatter={(v: number) => [`R$ ${v.toLocaleString("pt-BR")}`, "Receita"]} />
                <Line type="monotone" dataKey="value" stroke="#22c55e" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Plan distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Distribuição por plano</CardTitle>
            <CardDescription>Assinantes ativos</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={planDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={80}>
                  {planDistribution.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-2">
              {planDistribution.map((plan) => (
                <div key={plan.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: plan.color }} />
                    <span className="text-muted-foreground">{plan.name}</span>
                  </div>
                  <span className="font-medium">{plan.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Users chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Novos vs Cancelados</CardTitle>
            <CardDescription>Movimentação de usuários</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={usersData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Bar dataKey="novos" fill="#22c55e" radius={[4,4,0,0]} name="Novos" />
                <Bar dataKey="cancelados" fill="#ef4444" radius={[4,4,0,0]} name="Cancelados" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent activity */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Atividade recente</CardTitle>
            <CardDescription>Últimas movimentações</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((activity, i) => {
                const config = activityIcons[activity.type];
                const Icon = config.icon;
                return (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${config.className}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">{activity.user}</p>
                      <p className="text-xs text-muted-foreground">{activity.action}</p>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</span>
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
