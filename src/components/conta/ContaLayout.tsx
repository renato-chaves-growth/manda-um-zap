import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, Bot, CreditCard, Settings, HelpCircle, LogOut, Bell, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/contexts/AuthContext";
import { useProfile } from "@/hooks/useProfile";

const navItems = [
  { to: "/minha-conta/perfil", label: "Perfil", icon: User },
  { to: "/minha-conta/agentes", label: "Agentes", icon: Bot },
  { to: "/minha-conta/pagamentos", label: "Pagamentos", icon: CreditCard },
  { to: "/minha-conta/configuracoes", label: "Configurações", icon: Settings },
  { to: "/minha-conta/ajuda", label: "Ajuda", icon: HelpCircle },
];

const planLabels: Record<string, string> = {
  free: "Grátis",
  paid: "Pro",
  pro: "Pro",
  // legado
  comecar: "Começar", trabalhar: "Trabalhar",
  vender_mais: "Vender Mais", tudo_automatico: "Tudo Automático",
};

export function ContaLayout() {
  const isMobile = useIsMobile();
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { profile } = useProfile();

  const displayName = profile?.full_name || user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Usuário";
  const initials = displayName.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase();
  const planLabel = planLabels[profile?.plan || "free"] || "Grátis";

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <main className="flex-1 pt-20 pb-16 bg-muted/30 min-h-screen">
      <div className="container">
        {/* Header do usuário */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12">
              <AvatarImage src={user?.user_metadata?.avatar_url} />
              <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-foreground">Olá, {displayName.split(" ")[0]}!</h1>
                <Badge variant="outline" className="text-[10px] text-primary border-primary/30">
                  {planLabel}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Bell className="w-4 h-4" />
              <span className="hidden sm:inline">Notificações</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-2 text-destructive hover:text-destructive"
              onClick={handleSignOut}
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sair</span>
            </Button>
          </div>
        </div>

        {/* Mobile: tab bar horizontal */}
        {isMobile && (
          <div className="flex gap-1 overflow-x-auto pb-4 mb-2 scrollbar-hide -mx-4 px-4">
            {navItems.map((item) => {
              const isActive = location.pathname === item.to;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all shrink-0",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-background border border-border text-muted-foreground hover:text-foreground"
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </NavLink>
              );
            })}
          </div>
        )}

        <div className="flex gap-6">
          {/* Desktop sidebar */}
          {!isMobile && (
            <aside className="w-64 shrink-0">
              <div className="sticky top-24 space-y-1 bg-background rounded-2xl border border-border p-3">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.to;
                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all group",
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="flex-1">{item.label}</span>
                      <ChevronRight className={cn(
                        "w-4 h-4 transition-transform",
                        isActive ? "text-primary" : "text-muted-foreground/50 group-hover:text-muted-foreground"
                      )} />
                    </NavLink>
                  );
                })}
              </div>
            </aside>
          )}

          <div className="flex-1 min-w-0">
            <Outlet />
          </div>
        </div>
      </div>
    </main>
  );
}
