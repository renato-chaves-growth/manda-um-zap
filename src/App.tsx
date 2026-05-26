import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { Layout } from "@/components/layout/Layout";
import { ContaLayout } from "@/components/conta/ContaLayout";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import Index from "./pages/Index";
import Agentes from "./pages/Agentes";
import AgentePage from "./pages/AgentePage";
import ComoFunciona from "./pages/ComoFunciona";
import Precos from "./pages/Precos";
import ParaQuem from "./pages/ParaQuem";
import Sobre from "./pages/Sobre";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import CadastroSucesso from "./pages/CadastroSucesso";
import Carrinho from "./pages/Carrinho";
import Checkout from "./pages/Checkout";
import CompraSucesso from "./pages/CompraSucesso";
import Produto from "./pages/Produto";
import JornadaIntegrada from "./pages/JornadaIntegrada";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Tutoriais from "./pages/Tutoriais";
import TutorialPage from "./pages/TutorialPage";
import Guias from "./pages/Guias";
import GuidePage from "./pages/GuidePage";
import Cases from "./pages/Cases";
import CasePage from "./pages/CasePage";
import NotFound from "./pages/NotFound";
import Marketplace from "./pages/Marketplace";

// Conta sub-pages
import Perfil from "./pages/conta/Perfil";
import GerenciarAgentes from "./pages/conta/GerenciarAgentes";
import Pagamentos from "./pages/conta/Pagamentos";
import Configuracoes from "./pages/conta/Configuracoes";
import Ajuda from "./pages/conta/Ajuda";

// Admin pages
import { AdminLayout } from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminUsuarios from "./pages/admin/Usuarios";
import AdminReceita from "./pages/admin/Receita";
import AdminMetricas from "./pages/admin/Metricas";
import AdminConfiguracoes from "./pages/admin/ConfiguracoesAdmin";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Index />} />
              <Route path="/agentes" element={<Agentes />} />
              <Route path="/agente/:agentId" element={<AgentePage />} />
              <Route path="/como-funciona" element={<ComoFunciona />} />
              <Route path="/precos" element={<Precos />} />
              <Route path="/para-quem" element={<ParaQuem />} />
              <Route path="/sobre" element={<Sobre />} />
              <Route path="/login" element={<Login />} />
              <Route path="/cadastro" element={<Cadastro />} />
              <Route path="/cadastro-sucesso" element={<CadastroSucesso />} />
              <Route path="/produto" element={<Produto />} />
              <Route path="/jornada-integrada" element={<JornadaIntegrada />} />
              <Route path="/carrinho" element={<Carrinho />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/compra-sucesso" element={<CompraSucesso />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/tutoriais" element={<Tutoriais />} />
              <Route path="/tutoriais/:slug" element={<TutorialPage />} />
              <Route path="/guias" element={<Guias />} />
              <Route path="/guias/:slug" element={<GuidePage />} />
              <Route path="/cases" element={<Cases />} />
              <Route path="/cases/:slug" element={<CasePage />} />

              {/* Área logada — protegida */}
              <Route
                path="/minha-conta"
                element={
                  <ProtectedRoute>
                    <ContaLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate to="/minha-conta/perfil" replace />} />
                <Route path="perfil" element={<Perfil />} />
                <Route path="agentes" element={<GerenciarAgentes />} />
                <Route path="pagamentos" element={<Pagamentos />} />
                <Route path="configuracoes" element={<Configuracoes />} />
                <Route path="ajuda" element={<Ajuda />} />
              </Route>

              {/* Admin — protegido + só admin */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute adminOnly>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="usuarios" element={<AdminUsuarios />} />
                <Route path="receita" element={<AdminReceita />} />
                <Route path="metricas" element={<AdminMetricas />} />
                <Route path="configuracoes" element={<AdminConfiguracoes />} />
              </Route>
            </Route>
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
