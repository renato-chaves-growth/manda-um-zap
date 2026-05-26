import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  User, 
  CreditCard, 
  Settings, 
  Bot, 
  Calendar, 
  MessageCircle, 
  LogOut,
  ChevronRight,
  Bell,
  HelpCircle
} from "lucide-react";

// Avatar imports
import claraAvatar from "@/assets/avatars/ze-atendimento-v3.webp";
import chicoAvatar from "@/assets/avatars/chico-orcamento-v3.webp";
import netoAvatar from "@/assets/avatars/neto-agenda-v3.webp";

const activeAgents = [
  { id: "clara", name: "Clara", avatar: claraAvatar, status: "online" },
  { id: "otavio", name: "Otávio", avatar: chicoAvatar, status: "online" },
  { id: "lucas", name: "Lucas", avatar: netoAvatar, status: "online" },
];

const recentActivity = [
  { type: "message", text: "Novo cliente atendido pelo Zé", time: "Há 5 min" },
  { type: "budget", text: "Orçamento #142 criado", time: "Há 30 min" },
  { type: "schedule", text: "Visita agendada para amanhã", time: "Há 1 hora" },
  { type: "message", text: "3 mensagens respondidas", time: "Há 2 horas" },
];

const MinhaConta = () => {
  return (
    <main className="flex-1 pt-24 pb-16 bg-muted/30">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                    JC
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Olá, José Carlos!</h1>
                  <p className="text-muted-foreground">jose@prestação de serviços.com.br</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <Bell className="w-4 h-4" />
                  Notificações
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <LogOut className="w-4 h-4" />
                  Sair
                </Button>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Subscription Card */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">Sua assinatura</CardTitle>
                      <CardDescription>Plano 2 Agentes</CardDescription>
                    </div>
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                      Ativo
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50 mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Próxima cobrança</p>
                        <p className="text-lg font-semibold">R$ 59,00 em 15/02/2026</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Alterar plano
                      </Button>
                    </div>
                    
                    <h4 className="font-medium text-foreground mb-3">Agentes ativos</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {activeAgents.map((agent) => (
                        <div
                          key={agent.id}
                          className="flex items-center gap-3 p-3 rounded-xl border border-border"
                        >
                          <div className="relative">
                            <img
                              src={agent.avatar}
                              alt={agent.name}
                              className="w-10 h-10 rounded-lg object-cover"
                            />
                            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{agent.name.split(" ")[0]}</p>
                            <p className="text-xs text-green-600">Online</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Atividade recente</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivity.map((activity, i) => (
                        <div key={i} className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            {activity.type === "message" && <MessageCircle className="w-5 h-5 text-primary" />}
                            {activity.type === "budget" && <CreditCard className="w-5 h-5 text-primary" />}
                            {activity.type === "schedule" && <Calendar className="w-5 h-5 text-primary" />}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-foreground">{activity.text}</p>
                            <p className="text-xs text-muted-foreground">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Ações rápidas</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Link to="/meu-perfil">
                      <Button variant="ghost" className="w-full justify-between">
                        <span className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          Meu perfil
                        </span>
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Link to="/agentes">
                      <Button variant="ghost" className="w-full justify-between">
                        <span className="flex items-center gap-2">
                          <Bot className="w-4 h-4" />
                          Gerenciar agentes
                        </span>
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Link to="/checkout">
                      <Button variant="ghost" className="w-full justify-between">
                        <span className="flex items-center gap-2">
                          <CreditCard className="w-4 h-4" />
                          Pagamentos
                        </span>
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Button variant="ghost" className="w-full justify-between">
                      <span className="flex items-center gap-2">
                        <Settings className="w-4 h-4" />
                        Configurações
                      </span>
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" className="w-full justify-between">
                      <span className="flex items-center gap-2">
                        <HelpCircle className="w-4 h-4" />
                        Ajuda
                      </span>
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>

                {/* Stats */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Este mês</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Clientes atendidos</span>
                      <span className="text-lg font-bold text-foreground">47</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Orçamentos enviados</span>
                      <span className="text-lg font-bold text-foreground">23</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Visitas agendadas</span>
                      <span className="text-lg font-bold text-foreground">12</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Taxa de conversão</span>
                      <span className="text-lg font-bold text-green-600">52%</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
    </main>
  );
};

export default MinhaConta;
