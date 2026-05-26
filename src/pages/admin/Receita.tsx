import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  DollarSign, TrendingUp, TrendingDown, ArrowUpRight, 
  ArrowDownRight, Percent, Users, CreditCard
} from "lucide-react";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, PieChart, Pie, Cell 
} from "recharts";

const revenueKPIs = [
  { label: "MRR Atual", value: "R$ 48.390", change: "+8,3%", up: true, icon: DollarSign },
  { label: "ARR Projetado", value: "R$ 580.680", change: "+8,3%", up: true, icon: TrendingUp },
  { label: "Ticket Médio", value: "R$ 58,40", change: "+3,1%", up: true, icon: CreditCard },
  { label: "LTV Médio", value: "R$ 702", change: "+5,8%", up: true, icon: Users },
];

const mrrHistory = [
  { month: "Abr/25", mrr: 18200, newMrr: 3200, churnMrr: 800 },
  { month: "Mai/25", mrr: 21400, newMrr: 4100, churnMrr: 900 },
  { month: "Jun/25", mrr: 24800, newMrr: 4500, churnMrr: 1100 },
  { month: "Jul/25", mrr: 28100, newMrr: 4800, churnMrr: 1500 },
  { month: "Ago/25", mrr: 31500, newMrr: 5200, churnMrr: 1800 },
  { month: "Set/25", mrr: 34900, newMrr: 5600, churnMrr: 2200 },
  { month: "Out/25", mrr: 37800, newMrr: 5100, churnMrr: 2200 },
  { month: "Nov/25", mrr: 40200, newMrr: 4800, churnMrr: 2400 },
  { month: "Dez/25", mrr: 42500, newMrr: 4900, churnMrr: 2600 },
  { month: "Jan/26", mrr: 44100, newMrr: 4200, churnMrr: 2600 },
  { month: "Fev/26", mrr: 46800, newMrr: 5100, churnMrr: 2400 },
  { month: "Mar/26", mrr: 48390, newMrr: 4200, churnMrr: 2610 },
];

const revenueByPlan = [
  { plan: "Começar", revenue: 11948, users: 412, ticket: 29, color: "#94a3b8" },
  { plan: "Trabalhar", revenue: 18963, users: 387, ticket: 49, color: "#22c55e" },
  { plan: "Vender Mais", revenue: 23542, users: 298, ticket: 79, color: "#3b82f6" },
  { plan: "Tudo Automático", revenue: 19350, users: 150, ticket: 129, color: "#f97316" },
];

const cohortRetention = [
  { cohort: "Set/25", m1: 100, m2: 87, m3: 79, m4: 74, m5: 71, m6: 68 },
  { cohort: "Out/25", m1: 100, m2: 89, m3: 82, m4: 76, m5: 73 },
  { cohort: "Nov/25", m1: 100, m2: 91, m3: 84, m4: 78 },
  { cohort: "Dez/25", m1: 100, m2: 88, m3: 81 },
  { cohort: "Jan/26", m1: 100, m2: 90 },
  { cohort: "Fev/26", m1: 100 },
];

export default function Receita() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-foreground">Receita</h2>
        <p className="text-sm text-muted-foreground">Análise financeira detalhada do negócio</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {revenueKPIs.map((kpi) => (
          <Card key={kpi.label}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{kpi.label}</p>
                  <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
                  <div className="flex items-center gap-1 mt-1 text-xs font-medium text-green-600">
                    <ArrowUpRight className="w-3 h-3" />
                    {kpi.change}
                  </div>
                </div>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-green-50 text-green-600">
                  <kpi.icon className="w-5 h-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* MRR evolution */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Evolução do MRR</CardTitle>
          <CardDescription>Receita recorrente mensal — últimos 12 meses</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={mrrHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" fontSize={11} />
              <YAxis fontSize={11} tickFormatter={(v) => `R$${(v/1000).toFixed(0)}k`} />
              <Tooltip formatter={(v: number) => [`R$ ${v.toLocaleString("pt-BR")}`, ""]} />
              <Area type="monotone" dataKey="mrr" stroke="#22c55e" fill="#22c55e" fillOpacity={0.15} strokeWidth={2} name="MRR" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Revenue by plan */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Receita por plano</CardTitle>
            <CardDescription>Distribuição mensal</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={revenueByPlan} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis type="number" fontSize={11} tickFormatter={(v) => `R$${(v/1000).toFixed(0)}k`} />
                <YAxis type="category" dataKey="plan" fontSize={12} width={110} />
                <Tooltip formatter={(v: number) => [`R$ ${v.toLocaleString("pt-BR")}`, "Receita"]} />
                <Bar dataKey="revenue" radius={[0,6,6,0]} name="Receita">
                  {revenueByPlan.map((entry) => (
                    <Cell key={entry.plan} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* New MRR vs Churn MRR */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Novo MRR vs Churn MRR</CardTitle>
            <CardDescription>Expansão vs perda de receita</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={mrrHistory.slice(-6)}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" fontSize={11} />
                <YAxis fontSize={11} tickFormatter={(v) => `R$${(v/1000).toFixed(0)}k`} />
                <Tooltip formatter={(v: number) => [`R$ ${v.toLocaleString("pt-BR")}`, ""]} />
                <Bar dataKey="newMrr" fill="#22c55e" radius={[4,4,0,0]} name="Novo MRR" />
                <Bar dataKey="churnMrr" fill="#ef4444" radius={[4,4,0,0]} name="Churn MRR" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Cohort retention table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Retenção por Cohort</CardTitle>
          <CardDescription>% de usuários retidos por mês desde a aquisição</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 pr-4 font-medium text-muted-foreground">Cohort</th>
                  <th className="text-center py-2 px-3 font-medium text-muted-foreground">Mês 1</th>
                  <th className="text-center py-2 px-3 font-medium text-muted-foreground">Mês 2</th>
                  <th className="text-center py-2 px-3 font-medium text-muted-foreground">Mês 3</th>
                  <th className="text-center py-2 px-3 font-medium text-muted-foreground">Mês 4</th>
                  <th className="text-center py-2 px-3 font-medium text-muted-foreground">Mês 5</th>
                  <th className="text-center py-2 px-3 font-medium text-muted-foreground">Mês 6</th>
                </tr>
              </thead>
              <tbody>
                {cohortRetention.map((row) => (
                  <tr key={row.cohort} className="border-b last:border-0">
                    <td className="py-2 pr-4 font-medium">{row.cohort}</td>
                    {[row.m1, row.m2, row.m3, row.m4, row.m5, row.m6].map((val, i) => (
                      <td key={i} className="text-center py-2 px-3">
                        {val !== undefined ? (
                          <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                            val >= 80 ? "bg-green-100 text-green-700" :
                            val >= 60 ? "bg-yellow-100 text-yellow-700" :
                            "bg-red-100 text-red-700"
                          }`}>
                            {val}%
                          </span>
                        ) : (
                          <span className="text-muted-foreground/30">—</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
