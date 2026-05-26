import { Link } from "react-router-dom";

const WHATSAPP_LINK = "https://wa.me/5500000000000?text=Olá! Quero conhecer o MandaUmZap";

const agentLinks = [
  { label: "Clara", sub: "Atendimento", href: "/agente/clara" },
  { label: "Otávio", sub: "Orçamento", href: "/agente/otavio" },
  { label: "Lucas", sub: "Agenda", href: "/agente/lucas" },
  { label: "Helena", sub: "Financeiro", href: "/agente/helena" },
  { label: "Maya", sub: "Divulgação", href: "/agente/maya" },
];

export function LandingFooter() {
  return (
    <footer className="bg-[#0D1117] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            {/* Logo */}
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-[#25D366] border-2 border-black flex items-center justify-center shadow-[2px_2px_0_#25D366]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="black">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <div>
                <span className="font-display font-black text-xl text-white">MandaUmZap</span>
                <span className="ml-1.5 text-[10px] font-bold bg-[#25D366] text-black px-1.5 py-0.5 rounded-full">AI</span>
              </div>
            </div>

            <p className="font-sans text-sm text-white/50 leading-relaxed mb-5 max-w-xs">
              Agentes de IA pelo WhatsApp para prestadores de serviço. Sem app, sem instalação.
            </p>

            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#25D366] border-2 border-black text-black font-bold text-xs shadow-[3px_3px_0_#25D366] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all duration-150"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              100% pelo WhatsApp
            </a>
          </div>

          {/* Agentes */}
          <div>
            <h4 className="font-sans font-bold text-xs uppercase tracking-widest text-white/40 mb-5">
              Agentes IA
            </h4>
            <ul className="space-y-3">
              {agentLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="font-sans text-sm text-white/60 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <span>{link.label}</span>
                    <span className="text-white/30 text-xs group-hover:text-white/50 transition-colors">
                      · {link.sub}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Produto */}
          <div>
            <h4 className="font-sans font-bold text-xs uppercase tracking-widest text-white/40 mb-5">
              Produto
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Como funciona", href: "#como-funciona" },
                { label: "Preços", href: "#precos" },
                { label: "FAQ", href: "#faq" },
                { label: "Criar conta", href: "/cadastro" },
                { label: "Entrar", href: "/login" },
              ].map((link) => (
                <li key={link.label}>
                  {link.href.startsWith("#") ? (
                    <a
                      href={link.href}
                      className="font-sans text-sm text-white/60 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      to={link.href}
                      className="font-sans text-sm text-white/60 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Para quem + Legal */}
          <div>
            <h4 className="font-sans font-bold text-xs uppercase tracking-widest text-white/40 mb-5">
              Para quem é
            </h4>
            <ul className="space-y-3 mb-8">
              {["Eletricistas", "Encanadores", "Pintores", "Pedreiros", "Marceneiros", "Paisagistas"].map((item) => (
                <li key={item}>
                  <span className="font-sans text-sm text-white/60">{item}</span>
                </li>
              ))}
            </ul>

            <h4 className="font-sans font-bold text-xs uppercase tracking-widest text-white/40 mb-5">
              Legal
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Termos de Uso", href: "/termos" },
                { label: "Privacidade", href: "/privacidade" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="font-sans text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-sans text-xs text-white/30">
            © {new Date().getFullYear()} MandaUmZap — Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
            <span className="font-sans text-xs text-white/40">
              Feito para prestadores de serviço brasileiros
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
