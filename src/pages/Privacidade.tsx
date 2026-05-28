import { motion } from "framer-motion";

const PrivacidadePage = () => {
  return (
    <main className="flex-1">
      <section className="pt-24 md:pt-32 pb-12 bg-section-beige">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-4">
              Política de Privacidade
            </h1>
            <p className="text-muted-foreground text-lg">
              Última atualização: maio de 2025
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-xl font-bold text-foreground mt-8 mb-3">1. Informações que Coletamos</h2>
            <p className="text-muted-foreground mb-4">
              Coletamos informações fornecidas diretamente por você ao se cadastrar: nome, e-mail, número de WhatsApp, tipo de serviço prestado e dados de pagamento (processados por gateway seguro). Não armazenamos dados de cartão de crédito.
            </p>

            <h2 className="text-xl font-bold text-foreground mt-8 mb-3">2. Como Usamos suas Informações</h2>
            <p className="text-muted-foreground mb-4">
              Utilizamos seus dados para operar os agentes de IA, processar pagamentos, enviar notificações relacionadas ao serviço, e melhorar continuamente a plataforma. Não vendemos seus dados a terceiros.
            </p>

            <h2 className="text-xl font-bold text-foreground mt-8 mb-3">3. Dados das Conversas</h2>
            <p className="text-muted-foreground mb-4">
              As conversas processadas pelos agentes são usadas para fornecer o serviço. Mensagens são processadas em tempo real e não são armazenadas permanentemente após o processamento, exceto quando necessário para funcionalidades como histórico de agendamentos e orçamentos.
            </p>

            <h2 className="text-xl font-bold text-foreground mt-8 mb-3">4. Compartilhamento de Dados</h2>
            <p className="text-muted-foreground mb-4">
              Seus dados podem ser compartilhados com: processadores de pagamento (para cobranças), infraestrutura de nuvem (para operação do serviço) e fornecedores de IA (apenas dados necessários para processar mensagens). Todos os parceiros seguem padrões de segurança compatíveis com a LGPD.
            </p>

            <h2 className="text-xl font-bold text-foreground mt-8 mb-3">5. Segurança</h2>
            <p className="text-muted-foreground mb-4">
              Adotamos medidas técnicas e organizacionais para proteger seus dados contra acesso não autorizado, alteração, divulgação ou destruição. Todas as comunicações são criptografadas via TLS/HTTPS.
            </p>

            <h2 className="text-xl font-bold text-foreground mt-8 mb-3">6. Seus Direitos (LGPD)</h2>
            <p className="text-muted-foreground mb-4">
              Em conformidade com a Lei Geral de Proteção de Dados (LGPD), você tem direito a: acessar seus dados pessoais, corrigir informações incorretas, solicitar exclusão dos seus dados, revogar consentimento para uso de dados e obter portabilidade dos dados. Para exercer esses direitos, entre em contato via WhatsApp.
            </p>

            <h2 className="text-xl font-bold text-foreground mt-8 mb-3">7. Cookies</h2>
            <p className="text-muted-foreground mb-4">
              Utilizamos cookies essenciais para o funcionamento da plataforma e cookies analíticos (com seu consentimento) para melhorar a experiência. Você pode gerenciar as preferências de cookies nas configurações do seu navegador.
            </p>

            <h2 className="text-xl font-bold text-foreground mt-8 mb-3">8. Contato</h2>
            <p className="text-muted-foreground mb-4">
              Para questões relacionadas à privacidade dos seus dados, entre em contato pelo WhatsApp ou pelo e-mail privacidade@mandaumzap.com.br.
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default PrivacidadePage;
