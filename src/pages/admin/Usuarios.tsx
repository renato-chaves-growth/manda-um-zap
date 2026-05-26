import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { 
  Search, Filter, Download, MoreHorizontal, Eye, 
  UserCheck, UserX, ChevronLeft, ChevronRight 
} from "lucide-react";

const users = [
  { id: 1, name: "Carlos Mendes", email: "carlos@prestação de serviços.com", plan: "Vender Mais", status: "active", agents: 4, joined: "12/01/2026", lastActive: "Hoje", mrr: "R$ 79" },
  { id: 2, name: "Ana Luíza Costa", email: "ana@moveis.com.br", plan: "Trabalhar", status: "active", agents: 2, joined: "05/11/2025", lastActive: "Ontem", mrr: "R$ 49" },
  { id: 3, name: "Roberto Silva", email: "roberto@wood.com", plan: "Começar", status: "cancelled", agents: 0, joined: "20/08/2025", lastActive: "15/02/2026", mrr: "R$ 0" },
  { id: 4, name: "Maria Fernanda", email: "maria@atelie.com", plan: "Tudo Automático", status: "active", agents: 5, joined: "01/09/2025", lastActive: "Hoje", mrr: "R$ 129" },
  { id: 5, name: "João Paulo Alves", email: "joao@prestador de serviço.com", plan: "Trabalhar", status: "active", agents: 2, joined: "18/12/2025", lastActive: "Hoje", mrr: "R$ 49" },
  { id: 6, name: "Fernanda Oliveira", email: "fernanda@design.com", plan: "Vender Mais", status: "overdue", agents: 4, joined: "03/10/2025", lastActive: "há 3 dias", mrr: "R$ 79" },
  { id: 7, name: "Pedro Henrique", email: "pedro@moveis.net", plan: "Começar", status: "active", agents: 1, joined: "22/02/2026", lastActive: "Ontem", mrr: "R$ 29" },
  { id: 8, name: "Luciana Santos", email: "luciana@planej.com", plan: "Trabalhar", status: "active", agents: 2, joined: "14/01/2026", lastActive: "Hoje", mrr: "R$ 49" },
];

const statusConfig: Record<string, { label: string; className: string }> = {
  active: { label: "Ativo", className: "bg-green-50 text-green-700 border-green-200" },
  cancelled: { label: "Cancelado", className: "bg-red-50 text-red-700 border-red-200" },
  overdue: { label: "Inadimplente", className: "bg-yellow-50 text-yellow-700 border-yellow-200" },
};

const planColors: Record<string, string> = {
  "Começar": "bg-slate-100 text-slate-700",
  "Trabalhar": "bg-green-100 text-green-700",
  "Vender Mais": "bg-blue-100 text-blue-700",
  "Tudo Automático": "bg-orange-100 text-orange-700",
};

export default function Usuarios() {
  const [search, setSearch] = useState("");
  
  const filtered = users.filter(u => 
    u.name.toLowerCase().includes(search.toLowerCase()) || 
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-foreground">Usuários</h2>
        <p className="text-sm text-muted-foreground">Gerencie todos os usuários da plataforma</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-4 pb-4">
            <p className="text-xs text-muted-foreground">Total</p>
            <p className="text-2xl font-bold">1.247</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4">
            <p className="text-xs text-muted-foreground">Ativos</p>
            <p className="text-2xl font-bold text-green-600">1.128</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4">
            <p className="text-xs text-muted-foreground">Inadimplentes</p>
            <p className="text-2xl font-bold text-yellow-600">47</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4">
            <p className="text-xs text-muted-foreground">Cancelados</p>
            <p className="text-2xl font-bold text-red-600">72</p>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <CardTitle className="text-lg">Lista de usuários</CardTitle>
            <div className="flex gap-2">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Buscar por nome ou email..." 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Button variant="outline" size="icon"><Filter className="w-4 h-4" /></Button>
              <Button variant="outline" size="icon"><Download className="w-4 h-4" /></Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Usuário</TableHead>
                  <TableHead>Plano</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-center">Agentes</TableHead>
                  <TableHead>MRR</TableHead>
                  <TableHead>Último acesso</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((user) => {
                  const status = statusConfig[user.status];
                  return (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium text-foreground">{user.name}</p>
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={planColors[user.plan]}>
                          {user.plan}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={status.className}>
                          {status.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">{user.agents}</TableCell>
                      <TableCell className="font-medium">{user.mrr}</TableCell>
                      <TableCell className="text-muted-foreground text-sm">{user.lastActive}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
          
          {/* Pagination */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t">
            <p className="text-sm text-muted-foreground">Mostrando 1-8 de 1.247</p>
            <div className="flex gap-1">
              <Button variant="outline" size="icon" className="h-8 w-8"><ChevronLeft className="w-4 h-4" /></Button>
              <Button variant="outline" size="sm" className="h-8 w-8 bg-primary text-primary-foreground">1</Button>
              <Button variant="outline" size="sm" className="h-8 w-8">2</Button>
              <Button variant="outline" size="sm" className="h-8 w-8">3</Button>
              <Button variant="outline" size="icon" className="h-8 w-8"><ChevronRight className="w-4 h-4" /></Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
