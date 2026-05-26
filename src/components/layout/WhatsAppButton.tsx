import { MessageCircle } from "lucide-react";

const WHATSAPP_LINK = "https://wa.me/5500000000000?text=Olá! Quero conhecer o MandaUmZap";

export function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-whatsapp hover:bg-whatsapp/90 text-whatsapp-foreground p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 animate-float"
      aria-label="Falar no WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
    </a>
  );
}
