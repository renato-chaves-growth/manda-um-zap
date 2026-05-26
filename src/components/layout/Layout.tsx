import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { WhatsAppButton } from "./WhatsAppButton";
import { ScrollToTop } from "./ScrollToTop";

/**
 * Layout padrão do site.
 * Envolve todas as rotas com Header, Footer e botão flutuante do WhatsApp.
 */
export function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Header />
      <Outlet />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
