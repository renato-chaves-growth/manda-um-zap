import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, MessageCircle, BookOpen, Video, ChevronRight, 
  HelpCircle, Phone, Mail, ExternalLink
} from "lucide-react";

const faqItems = [
  { q: "Como alterar meu plano?", a: "Vá em Pagamentos e clique em 'Alterar plano'. Você pode fazer upgrade ou downgrade a qualquer momento." },
  { q: "Como adicionar um novo agente?", a: "Na página de Agentes, agentes inativos podem ser adicionados ao seu plano com um clique." },
  { q: "Posso pausar minha assinatura?", a: "Sim! Entre em contato pelo WhatsApp e solicitamos a pausa por até 30 dias." },
  { q: "Como os dados do WhatsApp chegam aqui?", a: "Quando você completa o onboarding no WhatsApp, os dados são automaticamente sincronizados com o seu perfil." },
  { q: "Como trocar minha senha?", a: "Vá em Perfil > Segurança e clique em 'Alterar'. Você precisará da senha atual." },
  { q: "Posso ter mais de 3 vendedores?", a: "No plano atual o limite é 3. Planos superiores permitem mais vendedores." },
];

const helpResources = [
  { title: "Central de Ajuda", description: "Artigos e tutoriais completos", icon: BookOpen, link: "#" },
  { title: "Vídeos tutoriais", description: "Aprenda assistindo", icon: Video, link: "#" },
  { title: "Novidades", description: "Veja o que há de novo", icon: ExternalLink, link: "#" },
];

export default function Ajuda() {
  const [search, setSearch] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const filtered = faqItems.filter(item =>
    item.q.toLowerCase().includes(search.toLowerCase()) ||
    item.a.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-foreground">Ajuda</h2>
        <p className="text-sm text-muted-foreground">Encontre respostas ou fale com a gente</p>
      </div>

      <div className="space-y-5">
        {/* Busca */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Buscar dúvida..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 h-12 text-base rounded-xl"
          />
        </div>

        {/* Contato rápido */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-foreground text-sm">Falar pelo WhatsApp</p>
                <p className="text-xs text-muted-foreground">Resposta em até 5 min</p>
              </div>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground text-sm">Enviar e-mail</p>
                <p className="text-xs text-muted-foreground">suporte@MandaUmZap</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* FAQ */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <HelpCircle className="w-5 h-5" />
              Perguntas frequentes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {filtered.map((item, i) => (
              <div key={i} className="rounded-xl border border-border overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
                >
                  <span className="text-sm font-medium text-foreground pr-4">{item.q}</span>
                  <ChevronRight className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform ${openFaq === i ? "rotate-90" : ""}`} />
                </button>
                {openFaq === i && (
                  <div className="px-4 pb-4">
                    <p className="text-sm text-muted-foreground">{item.a}</p>
                  </div>
                )}
              </div>
            ))}
            {filtered.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-6">
                Nenhum resultado encontrado. Tente outro termo ou fale com a gente.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Recursos */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recursos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {helpResources.map((res, i) => (
              <a key={i} href={res.link} className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/50 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                  <res.icon className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{res.title}</p>
                  <p className="text-xs text-muted-foreground">{res.description}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </a>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
