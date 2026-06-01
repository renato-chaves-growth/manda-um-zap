import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Camera, Loader2, Save, User, Building2, MapPin, Users,
  Calendar, Clock, TrendingUp, Instagram, Lock, Mail, Phone,
  ChevronDown, ChevronUp, Pencil, Check, MessageCircle, Zap
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useProfile } from "@/hooks/useProfile";
import { supabase } from "@/lib/supabase";

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

const ProfileSection = ({
  title, description, icon: Icon, badge, children, defaultOpen = true
}: {
  title: string; description: string; icon: React.ElementType;
  badge?: string; children: React.ReactNode; defaultOpen?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <Card>
      <CardHeader className="cursor-pointer select-none" onClick={() => setIsOpen(!isOpen)}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Icon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <CardTitle className="text-lg">{title}</CardTitle>
                {badge && <Badge variant="secondary" className="text-[10px]">{badge}</Badge>}
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
  { key: "seg", label: "Seg" }, { key: "ter", label: "Ter" }, { key: "qua", label: "Qua" },
  { key: "qui", label: "Qui" }, { key: "sex", label: "Sex" }, { key: "sab", label: "Sáb" }, { key: "dom", label: "Dom" },
];

const BUSINESS_TYPES = [
  { value: "eletricista",  label: "Eletricista",   emoji: "⚡" },
  { value: "encanador",    label: "Encanador",      emoji: "🔧" },
  { value: "pintor",       label: "Pintor",          emoji: "🖌️" },
  { value: "marceneiro",   label: "Marceneiro",     emoji: "🪚" },
  { value: "pedreiro",     label: "Pedreiro",       emoji: "🧱" },
  { value: "jardineiro",   label: "Jardineiro",     emoji: "🌿" },
  { value: "gesseiro",     label: "Gesseiro",       emoji: "🏗️" },
  { value: "vidraceiro",   label: "Vidraceiro",     emoji: "🪟" },
  { value: "serralheiro",  label: "Serralheiro",    emoji: "⚙️" },
  { value: "outro",        label: "Outro",           emoji: "🛠️" },
];

const MARGIN_OPTIONS = [
  { value: "baixa", label: "Baixa (até 20%)", description: "Foco em volume" },
  { value: "media", label: "Média (20-40%)", description: "Equilíbrio" },
  { value: "alta", label: "Alta (40-60%)", description: "Projetos premium" },
  { value: "custom", label: "Personalizada", description: "Definir manualmente" },
];

export default function Perfil() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  const { profile, loading, updateProfile } = useProfile();

  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [bio, setBio] = useState("");
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [instagram, setInstagram] = useState("");
  const [margin, setMargin] = useState("media");
  const [customMargin, setCustomMargin] = useState("");
  const [schedule, setSchedule] = useState({
    days: { seg: true, ter: true, qua: true, qui: true, sex: true, sab: true, dom: false } as Record<string, boolean>,
    startTime: "08:00", endTime: "18:00",
  });
  const [businessType, setBusinessType] = useState("outro");
  const [whatsappInstance, setWhatsappInstance] = useState(""); // Z-API instanceId
  const [whatsappToken, setWhatsappToken] = useState("");       // Z-API instanceToken
  const [passwordData, setPasswordData] = useState({ current: "", new: "", confirm: "" });
  const [showPassword, setShowPassword] = useState(false);

  // Preencher com dados reais do Supabase
  useEffect(() => {
    if (!profile) return;
    setName(profile.full_name || "");
    setWhatsapp(profile.whatsapp || "");
    setBusinessName(profile.business_name || "");
    setCity(profile.city || "");
    setInstagram(profile.instagram || "");
    setBio(profile.bio || "");
    if (profile.business_type) setBusinessType(profile.business_type);
    if (profile.margin) setMargin(profile.margin);
    if (profile.schedule) setSchedule(profile.schedule);
    setWhatsappInstance(profile.whatsapp_instance || "");
    setWhatsappToken(profile.whatsapp_token || "");
  }, [profile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { error } = await updateProfile({
      full_name: name,
      whatsapp,
      business_name: businessName,
      business_type: businessType,
      city,
      instagram,
      bio,
      margin: margin === "custom" ? `custom:${customMargin}` : margin,
      schedule,
      whatsapp_instance: whatsappInstance || null,
      whatsapp_token: whatsappToken || null,
    });

    setIsLoading(false);

    if (error) {
      toast({ title: "Erro ao salvar", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Perfil atualizado!", description: "Suas informações foram salvas." });
    }
  };

  const handlePasswordChange = async () => {
    if (passwordData.new !== passwordData.confirm) {
      toast({ title: "As senhas não coincidem", variant: "destructive" });
      return;
    }
    if (passwordData.new.length < 6) {
      toast({ title: "A nova senha deve ter pelo menos 6 caracteres", variant: "destructive" });
      return;
    }

    const { error } = await supabase.auth.updateUser({ password: passwordData.new });

    if (error) {
      toast({ title: "Erro ao alterar senha", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Senha alterada com sucesso!" });
      setPasswordData({ current: "", new: "", confirm: "" });
      setShowPassword(false);
    }
  };

  const initials = (profile?.full_name || user?.email || "U")
    .split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-foreground">Meu Perfil</h2>
        <p className="text-sm text-muted-foreground">Gerencie suas informações pessoais e da prestação de serviços</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Avatar & Basic Info */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <div className="relative shrink-0">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={user?.user_metadata?.avatar_url} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-xl">{initials}</AvatarFallback>
                </Avatar>
                <button type="button" className="absolute bottom-0 right-0 w-7 h-7 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors">
                  <Camera className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="flex-1 space-y-4 w-full">
                <EditableField label="Nome completo" icon={User} value={name} onChange={setName} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <EditableField label="E-mail" icon={Mail} value={user?.email || ""} type="email" disabled onChange={() => {}} hint="Entre em contato para alterar" />
                  <EditableField label="WhatsApp" icon={Phone} value={whatsapp} onChange={setWhatsapp} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Identidade */}
        <ProfileSection title="Identidade da prestação de serviços" description="Dados do seu negócio" icon={Building2}>
          <div className="space-y-5">
            {/* Tipo de serviço */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Tipo de serviço</Label>
              <div className="flex flex-wrap gap-2">
                {BUSINESS_TYPES.map((bt) => (
                  <button
                    key={bt.value}
                    type="button"
                    onClick={() => setBusinessType(bt.value)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium border transition-all ${
                      businessType === bt.value
                        ? "bg-primary text-primary-foreground border-primary shadow-[2px_2px_0px_#000]"
                        : "bg-background border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                    }`}
                  >
                    <span>{bt.emoji}</span>
                    {bt.label}
                  </button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                Usado pelos agentes para personalizar respostas e linguagem
              </p>
            </div>

            <EditableField label="Nome da prestação de serviços" icon={Building2} value={businessName} onChange={setBusinessName} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <EditableField label="Cidade" icon={MapPin} value={city} onChange={setCity} />
              <EditableField label="Região" icon={MapPin} value={region} onChange={setRegion} />
            </div>
          </div>
        </ProfileSection>

        {/* Agenda */}
        <ProfileSection title="Agenda de Trabalho" description="Dias e horários de funcionamento" icon={Calendar} badge="WhatsApp">
          <div className="space-y-6">
            <div>
              <Label className="text-sm font-medium mb-3 block">Dias de trabalho</Label>
              <div className="flex flex-wrap gap-2">
                {DAYS_OF_WEEK.map((day) => (
                  <button key={day.key} type="button"
                    onClick={() => setSchedule({ ...schedule, days: { ...schedule.days, [day.key]: !schedule.days[day.key] } })}
                    className={`w-11 h-11 rounded-xl text-sm font-medium transition-all ${schedule.days[day.key] ? "bg-primary text-primary-foreground shadow-md" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
                  >{day.label}</button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="flex items-center gap-2 text-sm"><Clock className="w-4 h-4 text-primary/70" />Início</Label>
                <Input type="time" value={schedule.startTime} onChange={(e) => setSchedule({ ...schedule, startTime: e.target.value })} />
              </div>
              <div className="space-y-1.5">
                <Label className="flex items-center gap-2 text-sm"><Clock className="w-4 h-4 text-primary/70" />Fim</Label>
                <Input type="time" value={schedule.endTime} onChange={(e) => setSchedule({ ...schedule, endTime: e.target.value })} />
              </div>
            </div>
          </div>
        </ProfileSection>

        {/* Financeiro */}
        <ProfileSection title="Financeiro" description="Margem para orçamentos" icon={TrendingUp} badge="WhatsApp">
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {MARGIN_OPTIONS.map((option) => (
                <button key={option.value} type="button" onClick={() => setMargin(option.value)}
                  className={`p-4 rounded-xl border text-left transition-all ${margin === option.value ? "border-primary bg-primary/5 shadow-sm" : "border-border hover:border-primary/30"}`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-foreground">{option.label}</span>
                    {margin === option.value && <Check className="w-4 h-4 text-primary" />}
                  </div>
                  <span className="text-xs text-muted-foreground">{option.description}</span>
                </button>
              ))}
            </div>
            {margin === "custom" && (
              <div className="space-y-1.5">
                <Label className="text-sm">Margem personalizada (%)</Label>
                <Input type="number" placeholder="Ex: 35" value={customMargin} onChange={(e) => setCustomMargin(e.target.value)} min="0" max="100" />
              </div>
            )}
          </div>
        </ProfileSection>

        {/* Divulgação */}
        <ProfileSection title="Divulgação" description="Redes sociais conectadas" icon={Instagram} badge="WhatsApp">
          <EditableField label="Instagram" icon={Instagram} value={instagram} onChange={setInstagram} hint="Usado pelo agente Maya para criar conteúdo" />
        </ProfileSection>

        {/* Conexão WhatsApp via Z-API */}
        <ProfileSection title="Conectar WhatsApp" description="Integração via Z-API para os agentes de IA" icon={MessageCircle} defaultOpen={false}>
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 text-sm">
              <div className="flex items-center gap-2 font-medium text-foreground mb-2">
                <Zap className="w-4 h-4 text-primary" />
                Como conectar (Z-API)
              </div>
              <ol className="list-decimal list-inside space-y-1.5 text-muted-foreground text-xs">
                <li>Acesse <span className="font-medium text-foreground">app.z-api.io</span> e crie uma nova instância</li>
                <li>Escaneie o QR Code com o WhatsApp da prestação de serviços</li>
                <li>Copie o <span className="font-medium text-foreground">Instance ID</span> e o <span className="font-medium text-foreground">Instance Token</span></li>
                <li>Cole os dados abaixo e salve o perfil</li>
                <li>Na Z-API, configure o webhook com a URL abaixo em <span className="font-medium text-foreground">On message received</span></li>
              </ol>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <EditableField
                label="Instance ID"
                icon={MessageCircle}
                value={whatsappInstance}
                onChange={setWhatsappInstance}
                hint="Ex: 3C5A1234B6789 — encontrado nas configurações da instância"
              />
              <EditableField
                label="Instance Token"
                icon={Lock}
                value={whatsappToken}
                onChange={setWhatsappToken}
                hint="Token da instância — mantenha em sigilo"
              />
            </div>

            <div className="p-3 rounded-lg bg-muted/50 border border-border">
              <p className="text-xs font-medium text-foreground mb-1">URL do Webhook (copie para a Z-API):</p>
              <p className="text-xs text-muted-foreground font-mono break-all select-all">
                https://ppopzfpgzfifywgagcpu.supabase.co/functions/v1/whatsapp-webhook
              </p>
            </div>

            {whatsappInstance && whatsappToken && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-green-50 border border-green-200 text-xs text-green-700">
                <Check className="w-4 h-4 shrink-0" />
                Dados preenchidos. Salve o perfil e configure o webhook na Z-API para ativar.
              </div>
            )}
          </div>
        </ProfileSection>

        {/* Bio */}
        <ProfileSection title="Sobre você" description="Breve descrição da prestação de serviços" icon={Pencil} defaultOpen={false}>
          <Textarea rows={3} value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Conte sobre sua prestação de serviços..." />
        </ProfileSection>

        {/* Segurança */}
        <ProfileSection title="Segurança" description="Senha e autenticação" icon={Lock} defaultOpen={false}>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
              <div>
                <p className="font-medium text-foreground">Alterar senha</p>
                <p className="text-sm text-muted-foreground">Mude sua senha de acesso</p>
              </div>
              <Button type="button" variant="outline" size="sm" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? "Cancelar" : "Alterar"}
              </Button>
            </div>
            {showPassword && (
              <div className="space-y-4 p-4 rounded-xl border border-border">
                <div className="space-y-1.5"><Label>Nova senha</Label><Input type="password" value={passwordData.new} onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })} /></div>
                <div className="space-y-1.5"><Label>Confirmar nova senha</Label><Input type="password" value={passwordData.confirm} onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })} /></div>
                <Button type="button" onClick={handlePasswordChange} size="sm">Confirmar alteração</Button>
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

        <div className="flex flex-col sm:flex-row justify-end gap-3">
          <Button type="button" variant="outline">Cancelar</Button>
          <Button type="submit" disabled={isLoading} className="gap-2">
            {isLoading ? <><Loader2 className="w-4 h-4 animate-spin" />Salvando...</> : <><Save className="w-4 h-4" />Salvar alterações</>}
          </Button>
        </div>
      </form>
    </div>
  );
}
