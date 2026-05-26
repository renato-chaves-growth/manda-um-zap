import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Bot, MessageCircle, Clock, TrendingUp, Zap, BarChart3,
  ArrowUpRight
} from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  LineChart, Line
} from "recharts";

const agentUsage = [
  { agent: "Clara", messages: 48200, sessions: 12400, satisfaction: 94, color: "#22c55e" },
  { agent: "Otávio", messages: 31500, sessions: 8900, satisfaction: 91, color: "#3b82f6" },
  { agent: "Lucas", messages: 22800, sessions: 6200, satisfaction: 89, color: "#8b5cf6" },
  { agent: "Helena", messages: 18400, sessions: 5100, satisfaction: 92, color: "#f97316" },
  { agent: "Maya", messages: 15600, sessions: 4300, satisfaction: 87, color: "#ec4899" },
];

const dailyMessages = [
  { day: "Seg", messages: 3420 },
  { day: "Ter", messages: 3850 },
  { day: "Qua", messages: 4100 },
  { day: "Qui", messages: 3980 },
  { day: "Sex", messages: 4250 },
  { day: "Sáb", messages: 2100 },
  { day: "Dom", messages: 1800 },
];

const responseTime = [
  { hour: "8h", avg: 1.2 },
  { hour: "9h", avg: 1.5 },
  { hour: "10h", avg: 2.1 },
  { hour: "11h", avg: 2.8 },
  { hour: "12h", avg: 1.8 },
  { hour: "13h", avg: 1.4 },
  { hour: "14h", avg: 2.3 },
  { hour: "15h", avg: 2.6 },
  { hour: "16h", avg: 2.9 },
  { hour: "17h", avg: 2.2 },
  { hour: "18h", avg: 1.6 },
  { hour: "19h", avg: 1.3 },
];

const radarData = [
  { metric: "Satisfação", value: 92 },
  { metric: "Tempo resposta", value: 88 },
  { metric: "Resolução", value: 85 },
  { metric: "Engajamento", value: 90 },
  { metric: "Retenção", value: 78 },
  { metric: "NPS", value: 82 },
];

const topMetrics = [
  { label: "Mensagens hoje", value: "4.250", icon: MessageCircle, change: "+12%" },
  { label: "Tempo médio resposta", value: "1,8s", icon: Clock, change: "-0,3s" },
  { label: "Taxa de resolução", value: "94,2%", icon: Zap, change: "+1,8%" },
  { label: "NPS", value: "72", icon: TrendingUp, change: "+4" },
];

export default function Metricas() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-foreground">Métricas</h2>
        <p className="text-sm text-muted-foreground">Performance dos agentes e engajamento dos usuários</p>
      </div>

      {/* Top KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {topMetrics.map((kpi) => (
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
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-primary/10 text-primary">
                  <kpi.icon className="w-5 h-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Agent usage */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Uso por agente</CardTitle>
            <CardDescription>Mensagens processadas este mês</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {agentUsage.map((agent) => (
                <div key={agent.agent} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: agent.color + "20" }}>
                    <Bot className="w-5 h-5" style={{ color: agent.color }} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{agent.agent}</span>
                      <span className="text-sm text-muted-foreground">{(agent.messages / 1000).toFixed(1)}k msgs</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all"
                        style={{ 
                          width: `${(agent.messages / 48200) * 100}%`, 
                          backgroundColor: agent.color 
                        }}
                      />
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {agent.satisfaction}%
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Radar chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Saúde da plataforma</CardTitle>
            <CardDescription>Indicadores consolidados</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis dataKey="metric" fontSize={11} />
                <PolarRadiusAxis domain={[0, 100]} tick={false} />
                <Radar dataKey="value" stroke="#22c55e" fill="#22c55e" fillOpacity={0.2} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily messages */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Mensagens por dia</CardTitle>
            <CardDescription>Volume semanal</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={dailyMessages}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="day" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Bar dataKey="messages" fill="#22c55e" radius={[6,6,0,0]} name="Mensagens" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Response time */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Tempo de resposta</CardTitle>
            <CardDescription>Média por hora do dia (segundos)</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={responseTime}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="hour" fontSize={12} />
                <YAxis fontSize={12} domain={[0, 4]} unit="s" />
                <Tooltip formatter={(v: number) => [`${v}s`, "Tempo médio"]} />
                <Line type="monotone" dataKey="avg" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} name="Tempo médio" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
