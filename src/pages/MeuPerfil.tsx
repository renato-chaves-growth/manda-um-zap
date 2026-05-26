import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { 
  Camera, Loader2, Save, User, Building2, MapPin, Users, 
  Calendar, Clock, TrendingUp, Instagram, Lock, Mail, Phone,
  ChevronDown, ChevronUp, Pencil, Check, X
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Editable field component
const EditableField = ({ 
  label, value, icon: Icon, onChange, type = "text", disabled = false, hint = "" 
}: { 
  label: string; value: string; icon: React.ElementType; onChange: (v: string) => void; 
  type?: string; disabled?: boolean; hint?: string;
}) => (
  <div className="space-y-1.5">
    <Label className="flex items-center gap-2 text-sm font-medium">
      <Icon className="w-4 h-4 text-primary/70" />
      {label}
      {disabled && (
        <Badge variant="outline" className="text-[10px] px-1.5 py-0 font-normal text-muted-foreground">
          Não editável
        </Badge>
      )}
    </Label>
    <Input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className={disabled ? "bg-muted/50 text-muted-foreground cursor-not-allowed" : ""}
    />
    {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
  </div>
);

// Section wrapper with collapse
const ProfileSection = ({ 
  title, description, icon: Icon, badge, children, defaultOpen = true 
}: { 
  title: string; description: string; icon: React.ElementType; 
  badge?: string; children: React.ReactNode; defaultOpen?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  return (
    <Card>
      <CardHeader 
        className="cursor-pointer select-none" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Icon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <CardTitle className="text-lg">{title}</CardTitle>
                {badge && (
                  <Badge variant="secondary" className="text-[10px]">{badge}</Badge>
                )}
              </div>
              <CardDescription>{description}</CardDescription>
            </div>
          </div>
          {isOpen ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
        </div>
      </CardHeader>
      {isOpen && <CardContent>{children}</CardContent>}
    </Card>
  );
};

const DAYS_OF_WEEK = [
  { key: "seg", label: "Seg" },
  { key: "ter", label: "Ter" },
  { key: "qua", label: "Qua" },
  { key: "qui", label: "Qui" },
  { key: "sex", label: "Sex" },
  { key: "sab", label: "Sáb" },
  { key: "dom", label: "Dom" },
];

const MARGIN_OPTIONS = [
  { value: "baixa", label: "Baixa (até 20%)", description: "Foco em volume" },
  { value: "media", label: "Média (20-40%)", description: "Equilíbrio" },
  { value: "alta", label: "Alta (40-60%)", description: "Projetos premium" },
  { value: "custom", label: "Personalizada", description: "Definir manualmente" },
];

const MeuPerfil = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Personal info
  const [profile, setProfile] = useState({
    name: "José Carlos Silva",
    email: "jose@prestação de serviços.com.br",
    phone: "(11) 99999-9999",
    bio: "prestador de serviço há 15 anos, especializado em móveis planejados residenciais.",
  });

  // Block 1 — Identidade
  const [identity, setIdentity] = useState({
    companyName: "prestação de serviços do Zé",
    city: "São Paulo",
    region: "Zona Sul - SP",
  });

  // Block 2 — Orçamento
  const [sellers, setSellers] = useState([
    { name: "Carlos", active: true },
    { name: "Ana", active: true },
    { name: "", active: false },
  ]);

  // Block 3 — Agenda
  const [schedule, setSchedule] = useState({
    days: { seg: true, ter: true, qua: true, qui: true, sex: true, sab: true, dom: false } as Record<string, boolean>,
    startTime: "08:00",
    endTime: "18:00",
  });

  // Block 4 — Financeiro
  const [financial, setFinancial] = useState({
    margin: "media",
    customMargin: "",
  });

  // Block 5 — Divulgação
  const [marketing, setMarketing] = useState({
    instagram: "@prestação de serviços.doze",
  });

  // Password
  const [passwordData, setPasswordData] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Perfil atualizado!",
        description: "Todas as suas informações foram salvas com sucesso.",
      });
    }, 1500);
  };

  const handlePasswordChange = () => {
    if (passwordData.new !== passwordData.confirm) {
      toast({ title: "As senhas não coincidem", variant: "destructive" });
      return;
    }
    if (passwordData.new.length < 6) {
      toast({ title: "A nova senha deve ter pelo menos 6 caracteres", variant: "destructive" });
      return;
    }
    toast({ title: "Senha alterada com sucesso!" });
    setPasswordData({ current: "", new: "", confirm: "" });
    setShowPassword(false);
  };

  const updateSeller = (index: number, name: string) => {
    const updated = [...sellers];
    updated[index] = { ...updated[index], name, active: name.length > 0 };
    setSellers(updated);
  };

  return (
    <main className="flex-1 pt-24 pb-16 bg-muted/30">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                Meu Perfil
              </h1>
              <p className="text-muted-foreground mt-1">
                Gerencie suas informações pessoais e configurações da prestação de serviços
              </p>
            </div>
            <Badge variant="outline" className="self-start flex items-center gap-1.5 px-3 py-1.5">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              Conta ativa
            </Badge>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Avatar & Basic Info */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col sm:flex-row items-start gap-6">
                  <div className="relative shrink-0">
                    <Avatar className="w-24 h-24">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                        JC
                      </AvatarFallback>
                    </Avatar>
                    <button
                      type="button"
                      className="absolute bottom-0 right-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors"
                    >
                      <Camera className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex-1 space-y-4 w-full">
                    <EditableField
                      label="Nome completo"
                      icon={User}
                      value={profile.name}
                      onChange={(v) => setProfile({ ...profile, name: v })}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <EditableField
                        label="E-mail"
                        icon={Mail}
                        value={profile.email}
                        type="email"
                        disabled
                        onChange={() => {}}
                        hint="Entre em contato para alterar seu e-mail"
                      />
                      <EditableField
                        label="WhatsApp"
                        icon={Phone}
                        value={profile.phone}
                        onChange={(v) => setProfile({ ...profile, phone: v })}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Block 1 — Identidade */}
            <ProfileSection
              title="Identidade da prestação de serviços"
              description="Dados capturados no onboarding via WhatsApp"
              icon={Building2}
              badge="Bloco 1"
            >
              <div className="space-y-4">
                <EditableField
                  label="Nome da prestação de serviços"
                  icon={Building2}
                  value={identity.companyName}
                  onChange={(v) => setIdentity({ ...identity, companyName: v })}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <EditableField
                    label="Cidade"
                    icon={MapPin}
                    value={identity.city}
                    onChange={(v) => setIdentity({ ...identity, city: v })}
                  />
                  <EditableField
                    label="Região"
                    icon={MapPin}
                    value={identity.region}
                    onChange={(v) => setIdentity({ ...identity, region: v })}
                  />
                </div>
              </div>
            </ProfileSection>

            {/* Block 2 — Orçamento (Vendedores) */}
            <ProfileSection
              title="Equipe de Vendas"
              description="Vendedores cadastrados para orçamentos"
              icon={Users}
              badge="Bloco 2"
            >
              <div className="space-y-3">
                {sellers.map((seller, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      seller.active ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                    }`}>
                      {i + 1}
                    </div>
                    <Input
                      placeholder={`Vendedor ${i + 1}`}
                      value={seller.name}
                      onChange={(e) => updateSeller(i, e.target.value)}
                      className="flex-1"
                    />
                    {seller.active && (
                      <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                        <Check className="w-3 h-3 mr-1" />
                        Ativo
                      </Badge>
                    )}
                  </div>
                ))}
                <p className="text-xs text-muted-foreground">Máximo de 3 vendedores por plano</p>
              </div>
            </ProfileSection>

            {/* Block 3 — Agenda */}
            <ProfileSection
              title="Agenda de Trabalho"
              description="Dias e horários de funcionamento"
              icon={Calendar}
              badge="Bloco 3"
            >
              <div className="space-y-6">
                <div>
                  <Label className="text-sm font-medium mb-3 block">Dias de trabalho</Label>
                  <div className="flex flex-wrap gap-2">
                    {DAYS_OF_WEEK.map((day) => (
                      <button
                        key={day.key}
                        type="button"
                        onClick={() => setSchedule({
                          ...schedule,
                          days: { ...schedule.days, [day.key]: !schedule.days[day.key] }
                        })}
                        className={`w-12 h-12 rounded-xl text-sm font-medium transition-all ${
                          schedule.days[day.key]
                            ? "bg-primary text-primary-foreground shadow-md"
                            : "bg-muted text-muted-foreground hover:bg-muted/80"
                        }`}
                      >
                        {day.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-primary/70" />
                      Início do expediente
                    </Label>
                    <Input
                      type="time"
                      value={schedule.startTime}
                      onChange={(e) => setSchedule({ ...schedule, startTime: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-primary/70" />
                      Fim do expediente
                    </Label>
                    <Input
                      type="time"
                      value={schedule.endTime}
                      onChange={(e) => setSchedule({ ...schedule, endTime: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </ProfileSection>

            {/* Block 4 — Financeiro */}
            <ProfileSection
              title="Financeiro"
              description="Margem desejada para orçamentos"
              icon={TrendingUp}
              badge="Bloco 4"
            >
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {MARGIN_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setFinancial({ ...financial, margin: option.value })}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        financial.margin === option.value
                          ? "border-primary bg-primary/5 shadow-sm"
                          : "border-border hover:border-primary/30"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-foreground">{option.label}</span>
                        {financial.margin === option.value && (
                          <Check className="w-4 h-4 text-primary" />
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground">{option.description}</span>
                    </button>
                  ))}
                </div>
                {financial.margin === "custom" && (
                  <div className="space-y-1.5">
                    <Label className="text-sm">Margem personalizada (%)</Label>
                    <Input
                      type="number"
                      placeholder="Ex: 35"
                      value={financial.customMargin}
                      onChange={(e) => setFinancial({ ...financial, customMargin: e.target.value })}
                      min="0"
                      max="100"
                    />
                  </div>
                )}
              </div>
            </ProfileSection>

            {/* Block 5 — Divulgação */}
            <ProfileSection
              title="Divulgação"
              description="Redes sociais conectadas"
              icon={Instagram}
              badge="Bloco 5"
            >
              <EditableField
                label="Instagram"
                icon={Instagram}
                value={marketing.instagram}
                onChange={(v) => setMarketing({ ...marketing, instagram: v })}
                hint="Usado pelo agente Maya para criar conteúdo"
              />
            </ProfileSection>

            {/* Bio */}
            <ProfileSection
              title="Sobre você"
              description="Uma breve descrição sobre sua prestação de serviços"
              icon={Pencil}
              defaultOpen={false}
            >
              <Textarea
                rows={3}
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                placeholder="Conte um pouco sobre sua prestação de serviços..."
              />
            </ProfileSection>

            {/* Security */}
            <ProfileSection
              title="Segurança"
              description="Senha e autenticação"
              icon={Lock}
              defaultOpen={false}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                  <div>
                    <p className="font-medium text-foreground">Alterar senha</p>
                    <p className="text-sm text-muted-foreground">Última alteração há 3 meses</p>
                  </div>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Cancelar" : "Alterar"}
                  </Button>
                </div>

                {showPassword && (
                  <div className="space-y-4 p-4 rounded-xl border border-border">
                    <div className="space-y-1.5">
                      <Label>Senha atual</Label>
                      <Input
                        type="password"
                        value={passwordData.current}
                        onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label>Nova senha</Label>
                      <Input
                        type="password"
                        value={passwordData.new}
                        onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label>Confirmar nova senha</Label>
                      <Input
                        type="password"
                        value={passwordData.confirm}
                        onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
                      />
                    </div>
                    <Button type="button" onClick={handlePasswordChange} size="sm">
                      Confirmar alteração
                    </Button>
                  </div>
                )}

                <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                  <div>
                    <p className="font-medium text-foreground">Autenticação em dois fatores</p>
                    <p className="text-sm text-muted-foreground">Camada extra de segurança</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </ProfileSection>

            <Separator />

            {/* Save */}
            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline">
                Cancelar
              </Button>
              <Button type="submit" disabled={isLoading} className="gap-2">
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Salvar alterações
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default MeuPerfil;
